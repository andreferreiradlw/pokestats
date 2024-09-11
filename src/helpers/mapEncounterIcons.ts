import type { GameGenValue } from './gameVersion';

const mapGen1Icons = (methodName: string, pokemonName: string, areaKey: string): string => {
  const baseUrl =
    'https://raw.githubusercontent.com/andreferreiradlw/pokestats_media/main/assets/icons/generation-i';

  const specialUrls: Record<string, string> = {
    pokeflute:
      'https://raw.githubusercontent.com/msikma/pokesprite/master/items/key-item/poke-flute.png',
  };

  if (specialUrls[methodName]) return specialUrls[methodName];

  const methodIcons: Record<string, string> = {
    walk: `${baseUrl}/walk.png`,
    surf: `${baseUrl}/surf.png`,
    'good-rod': `${baseUrl}/rod.png`,
    'super-rod': `${baseUrl}/rod.png`,
    'old-rod': `${baseUrl}/rod.png`,
  };

  if (methodIcons[methodName]) return methodIcons[methodName];

  const legendaryPokemon = ['articuno', 'moltres', 'zapdos'];

  if (methodName === 'only-one') {
    return legendaryPokemon.includes(pokemonName)
      ? `${baseUrl}/legendary.png`
      : pokemonName === 'mewtwo'
        ? `${baseUrl}/monster.png`
        : `${baseUrl}/only_one.png`;
  }

  const giftPokemonByArea: Record<string, string | Record<string, string>> = {
    bulbasaur: {
      'cerulean-city': `${baseUrl}/female_trainer.png`,
      default: `${baseUrl}/professor_oak.png`,
    },
    charmander: {
      'kanto-route-24': `${baseUrl}/male_trainer.png`,
      default: `${baseUrl}/professor_oak.png`,
    },
    squirtle: {
      'vermilion-city': `${baseUrl}/officer_jenny.png`,
      default: `${baseUrl}/professor_oak.png`,
    },
    pikachu: `${baseUrl}/professor_oak.png`,
    magikarp: `${baseUrl}/magikarp_salesman.png`,
    omanyte: `${baseUrl}/super_nerd.png`,
    kabuto: `${baseUrl}/super_nerd.png`,
    aerodactyl: `${baseUrl}/museum_scientist.png`,
    hitmonlee: `${baseUrl}/karate_trainer.png`,
    hitmonchan: `${baseUrl}/karate_trainer.png`,
    eevee: {
      'saffron-city': `${baseUrl}/karate_trainer.png`,
      default: `${baseUrl}/only_one.png`,
    },
    lapras: `${baseUrl}/silphco_employee.png`,
  };

  if (methodName === 'gift') {
    const pokemonAreas = giftPokemonByArea[pokemonName];

    if (typeof pokemonAreas === 'string') return pokemonAreas;

    return pokemonAreas?.[areaKey] || pokemonAreas?.['default'] || `${baseUrl}/only_one.png`;
  }

  return `${baseUrl}/walk.png`;
};

const mapGen2Icons = (methodName: string, pokemonName: string): string => {
  const baseUrl = `https://raw.githubusercontent.com/andreferreiradlw/pokestats_media/main/assets/icons/generation-ii`;

  // Handle special cases for pokeflute
  if (methodName === 'pokeflute' && pokemonName === 'snorlax') return `${baseUrl}/snorlax.png`;

  const specialCases: Record<string, string> = {
    headbutt: `${baseUrl}/headbutt.png`,
    gift: `${baseUrl}/gift.png`,
    'gift-egg': `${baseUrl}/gift-egg.png`,
    'squirt-bottle': `${baseUrl}/squirt-bottle.png`,
    'rock-smash': `${baseUrl}/boulder.png`,
  };

  // Handle special cases directly
  if (specialCases[methodName]) return specialCases[methodName];

  const roamingGrassIcons: Record<string, string> = {
    raikou: `${baseUrl}/raikou-gif.png`,
    entei: `${baseUrl}/entei-gif.png`,
    suicune: `${baseUrl}/suicune-gif.png`,
  };

  // Handle roaming grass cases
  if (methodName === 'roaming-grass' && roamingGrassIcons[pokemonName])
    return roamingGrassIcons[pokemonName];

  const onlyOneIcons: Record<string, string> = {
    suicune: `${baseUrl}/suicune-gif.png`,
    'ho-oh': `${baseUrl}/ho-oh-gif.png`,
  };

  // Handle "only-one" method cases
  if (methodName === 'only-one' && onlyOneIcons[pokemonName]) return onlyOneIcons[pokemonName];

  const methodIcons: Record<string, string> = {
    walk: `${baseUrl}/grass.png`,
    surf: `${baseUrl}/surf.png`,
    'good-rod': `${baseUrl}/rod.png`,
    'super-rod': `${baseUrl}/rod-female.png`,
    'old-rod': `${baseUrl}/rod.png`,
  };

  // Handle method-based icons
  if (methodIcons[methodName]) return methodIcons[methodName];

  // Default fallback
  return `${baseUrl}/walk.png`;
};

const mapGen3Icons = (methodName: string, pokemonName: string, regionName: string): string => {
  // Define base URL for icons
  const baseUrl = `https://raw.githubusercontent.com/andreferreiradlw/pokestats_media/main/assets/icons/generation-ii/${regionName}`;
};

export const mapEncounterMethodIcons = (
  methodName: string,
  pokemonName: string,
  areaKey: string,
  generation: GameGenValue,
  regionName: string,
): string => {
  console.log('map icon', methodName, pokemonName, areaKey, generation);

  if (generation === 'generation-i') {
    return mapGen1Icons(methodName, pokemonName, areaKey);
  }

  if (generation === 'generation-ii') {
    return mapGen2Icons(methodName, pokemonName);
  }

  if (generation === 'generation-ii') {
    return mapGen3Icons(methodName, pokemonName, regionName);
  }

  return '';
};
