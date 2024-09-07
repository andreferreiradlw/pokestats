const mapGen1Icons = (methodName: string, pokemonName: string, areaKey: string): string => {
  // Define base URL for icons
  const baseUrl =
    'https://raw.githubusercontent.com/andreferreiradlw/pokestats_media/main/assets/icons/generation-i';

  // Define types for special URLs, method icons, and area-specific icons
  interface SpecialUrls {
    [key: string]: string;
  }

  interface MethodIcons {
    [key: string]: string;
  }

  interface AreaIcons {
    [key: string]: string;
  }

  interface GiftPokemonAreas {
    [pokemonName: string]: string | AreaIcons;
  }

  // Define special URLs and method icons
  const specialUrls: SpecialUrls = {
    pokeflute:
      'https://raw.githubusercontent.com/msikma/pokesprite/master/items/key-item/poke-flute.png',
  };

  const methodIcons: MethodIcons = {
    walk: `${baseUrl}/walk.png`,
    surf: `${baseUrl}/surf.png`,
    'good-rod': `${baseUrl}/rod.png`,
    'super-rod': `${baseUrl}/rod.png`,
    'old-rod': `${baseUrl}/rod.png`,
  };

  // Define legendary Pokémon and gift Pokémon by area
  const legendaryPokemon: string[] = ['articuno', 'moltres', 'zapdos'];

  const giftPokemonByArea: GiftPokemonAreas = {
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

  // Check for special URLs
  if (methodName in specialUrls) {
    return specialUrls[methodName];
  }

  // Check for method-based icons
  if (methodName in methodIcons) {
    return methodIcons[methodName];
  }

  // Handle "only-one" method with specific logic
  if (methodName === 'only-one') {
    if (legendaryPokemon.includes(pokemonName)) {
      return `${baseUrl}/legendary.png`;
    }
    if (pokemonName === 'mewtwo') {
      return `${baseUrl}/monster.png`;
    }
    return `${baseUrl}/only_one.png`;
  }

  // Handle "gift" method with specific logic
  if (methodName === 'gift') {
    const pokemonAreas = giftPokemonByArea[pokemonName];
    if (typeof pokemonAreas === 'string') return pokemonAreas; // Return direct URL

    if (pokemonAreas && areaKey in pokemonAreas) {
      return pokemonAreas[areaKey];
    }
    return pokemonAreas?.['default'] || `${baseUrl}/only_one.png`;
  }

  // Default fallback
  return `${baseUrl}/only_one.png`;
};

export const mapEncounterMethodIcons = (
  methodName: string,
  pokemonName: string,
  areaKey: string,
  generation: string,
): string => {
  if (generation === 'generation-i') {
    return mapGen1Icons(methodName, pokemonName, areaKey);
  }
  return '';
};
