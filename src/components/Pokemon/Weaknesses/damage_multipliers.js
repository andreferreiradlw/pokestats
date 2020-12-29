import type_relations from './type_relations.json'

export default function getMultipliers(types) {
  let multipliers = {
    defense: {},
    attack: {},
  }
  types.forEach(type => {
    const damage_relations = type_relations[type]
    let no_damage_to = damage_relations.attack.zero
    let no_damage_from = damage_relations.defense.zero
    let half_damage_to = damage_relations.attack.half
    let half_damage_from = damage_relations.defense.half
    let double_damage_to = damage_relations.attack.double
    let double_damage_from = damage_relations.defense.double

    no_damage_to.forEach(type => {
      if (multipliers.attack.hasOwnProperty(type)) {
        multipliers.attack[type] = multipliers.attack[type] * 0
      } else {
        multipliers.attack[type] = 0
      }
    })

    no_damage_from.forEach(type => {
      if (multipliers.defense.hasOwnProperty(type)) {
        multipliers.defense[type] = multipliers.defense[type] * 0
      } else {
        multipliers.defense[type] = 0
      }
    })

    half_damage_to.forEach(type => {
      if (multipliers.attack.hasOwnProperty(type)) {
        multipliers.attack[type] = multipliers.attack[type] * 0.5
      } else {
        multipliers.attack[type] = 0.5
      }
    })

    half_damage_from.forEach(type => {
      if (multipliers.defense.hasOwnProperty(type)) {
        multipliers.defense[type] = multipliers.defense[type] * 0.5
      } else {
        multipliers.defense[type] = 0.5
      }
    })

    double_damage_to.forEach(type => {
      if (multipliers.attack.hasOwnProperty(type)) {
        multipliers.attack[type] = multipliers.attack[type] * 2
      } else {
        multipliers.attack[type] = 2
      }
    })

    double_damage_from.forEach(type => {
      if (multipliers.defense.hasOwnProperty(type)) {
        multipliers.defense[type] = multipliers.defense[type] * 2
      } else {
        multipliers.defense[type] = 2
      }
    })
  })
  // remove x1.0 multipliers
  for (const [key, value] of Object.entries(multipliers.attack)) {
    if (value === 1) {
      delete multipliers.attack[key]
    }
  }

  for (const [key, value] of Object.entries(multipliers.defense)) {
    if (value === 1) {
      delete multipliers.defense[key]
    }
  }

  return multipliers
}
