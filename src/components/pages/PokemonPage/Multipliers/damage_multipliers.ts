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

const damageCategories = {
  no_damage: 0,
  quarter_damage: 0.25,
  half_damage: 0.5,
  double_damage: 2,
  quadruple_damage: 4,
} as const;

type DamageCategory = keyof typeof damageCategories;
type MultiplierMap = Record<Type['name'], number>;

const updateMultiplierMap = (
  map: MultiplierMap,
  types: Type['name'][],
  multiplier: number,
): void => {
  types.forEach(type => {
    map[type] = (map[type] || 1) * multiplier;
  });
};

const categorizeMultipliers = (map: MultiplierMap): Record<DamageCategory, Type['name'][]> => {
  const categorized: Record<DamageCategory, Type['name'][]> = {
    no_damage: [],
    quarter_damage: [],
    half_damage: [],
    double_damage: [],
    quadruple_damage: [],
  };

  Object.entries(map).forEach(([type, value]) => {
    for (const [category, multiplier] of Object.entries(damageCategories)) {
      if (value === multiplier) {
        categorized[category as DamageCategory].push(type as Type['name']);
        break;
      }
    }
  });

  return categorized;
};

const getMultipliers = (types: Type['name'][]): MultipliersRes => {
  const attackMultipliers: MultiplierMap = {};
  const defenseMultipliers: MultiplierMap = {};

  types.forEach(type => {
    // @ts-expect-error: cannot update json types
    const damageRelations = type_relations[type];
    if (!damageRelations) return;

    updateMultiplierMap(attackMultipliers, damageRelations.attack.zero, damageCategories.no_damage);
    updateMultiplierMap(
      attackMultipliers,
      damageRelations.attack.half,
      damageCategories.half_damage,
    );
    updateMultiplierMap(
      attackMultipliers,
      damageRelations.attack.double,
      damageCategories.double_damage,
    );

    updateMultiplierMap(
      defenseMultipliers,
      damageRelations.defense.zero,
      damageCategories.no_damage,
    );
    updateMultiplierMap(
      defenseMultipliers,
      damageRelations.defense.half,
      damageCategories.half_damage,
    );
    updateMultiplierMap(
      defenseMultipliers,
      damageRelations.defense.double,
      damageCategories.double_damage,
    );
  });

  return {
    attack: categorizeMultipliers(attackMultipliers),
    defense: categorizeMultipliers(defenseMultipliers),
  };
};

export default getMultipliers;
