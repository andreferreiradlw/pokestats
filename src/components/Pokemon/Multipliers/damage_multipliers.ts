import type { Type } from 'pokenode-ts';
import type_relations from './type_relations.json';

export interface MultipliersRes {
  defense: {
    no_damage: Type['name'][];
    quarter_damage: Type['name'][];
    half_damage: Type['name'][];
    double_damage: Type['name'][];
    quadruple_damage: Type['name'][];
  };
  attack: {
    no_damage: Type['name'][];
    quarter_damage: Type['name'][];
    half_damage: Type['name'][];
    double_damage: Type['name'][];
    quadruple_damage: Type['name'][];
  };
}

const getMultipliers = (types: Type['name'][]): MultipliersRes => {
  let multipliers = {
    defense: {},
    attack: {},
  };

  types.forEach(type => {
    const damage_relations = type_relations[type];
    let no_damage_to = damage_relations.attack.zero as Type['name'][];
    let no_damage_from = damage_relations.defense.zero as Type['name'][];
    let half_damage_to = damage_relations.attack.half as Type['name'][];
    let half_damage_from = damage_relations.defense.half as Type['name'][];
    let double_damage_to = damage_relations.attack.double as Type['name'][];
    let double_damage_from = damage_relations.defense.double as Type['name'][];

    no_damage_to.forEach(type => {
      if (Object.prototype.hasOwnProperty.call(multipliers.attack, type)) {
        multipliers.attack[type] = multipliers.attack[type] * 0;
      } else {
        multipliers.attack[type] = 0;
      }
    });

    no_damage_from.forEach(type => {
      if (Object.prototype.hasOwnProperty.call(multipliers.defense, type)) {
        multipliers.defense[type] = multipliers.defense[type] * 0;
      } else {
        multipliers.defense[type] = 0;
      }
    });

    half_damage_to.forEach(type => {
      if (Object.prototype.hasOwnProperty.call(multipliers.attack, type)) {
        multipliers.attack[type] = multipliers.attack[type] * 0.5;
      } else {
        multipliers.attack[type] = 0.5;
      }
    });

    half_damage_from.forEach(type => {
      if (Object.prototype.hasOwnProperty.call(multipliers.defense, type)) {
        multipliers.defense[type] = multipliers.defense[type] * 0.5;
      } else {
        multipliers.defense[type] = 0.5;
      }
    });

    double_damage_to.forEach(type => {
      if (Object.prototype.hasOwnProperty.call(multipliers.attack, type)) {
        multipliers.attack[type] = multipliers.attack[type] * 2;
      } else {
        multipliers.attack[type] = 2;
      }
    });

    double_damage_from.forEach(type => {
      if (Object.prototype.hasOwnProperty.call(multipliers.defense, type)) {
        multipliers.defense[type] = multipliers.defense[type] * 2;
      } else {
        multipliers.defense[type] = 2;
      }
    });
  });

  // remove x1.0 and sort multipliers by name
  let multipliersObj = {
    defense: {
      no_damage: [],
      quarter_damage: [],
      half_damage: [],
      double_damage: [],
      quadruple_damage: [],
    },
    attack: {
      no_damage: [],
      quarter_damage: [],
      half_damage: [],
      double_damage: [],
      quadruple_damage: [],
    },
  };

  // attack
  for (const [key, value] of Object.entries(multipliers.attack)) {
    if (value === 0) {
      multipliersObj.attack.no_damage.push(key);
    } else if (value === 0.25) {
      multipliersObj.attack.quarter_damage.push(key);
    } else if (value === 0.5) {
      multipliersObj.attack.half_damage.push(key);
    } else if (value === 2) {
      multipliersObj.attack.double_damage.push(key);
    } else if (value === 4) {
      multipliersObj.attack.quadruple_damage.push(key);
    }
  }

  // defense
  for (const [key, value] of Object.entries(multipliers.defense)) {
    if (value === 0) {
      multipliersObj.defense.no_damage.push(key);
    } else if (value === 0.25) {
      multipliersObj.defense.quarter_damage.push(key);
    } else if (value === 0.5) {
      multipliersObj.defense.half_damage.push(key);
    } else if (value === 2) {
      multipliersObj.defense.double_damage.push(key);
    } else if (value === 4) {
      multipliersObj.defense.quadruple_damage.push(key);
    }
  }

  return multipliersObj;
};

export default getMultipliers;
