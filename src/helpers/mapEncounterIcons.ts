import type { GameGenValue } from './gameVersion';

const mapGen1Icons = (methodName: string, pokemonName: string, areaKey: string): string => {
  const baseUrl =
    'https://raw.githubusercontent.com/andreferreiradlw/pokestats_media/main/assets/icons/generation-i';

  // Consolidate all icons into a single lookup object for faster access
  const icons: Record<string, string> = {
    'special:pokeflute':
      'https://raw.githubusercontent.com/msikma/pokesprite/master/items/key-item/poke-flute.png',
    'method:walk': `${baseUrl}/walk.png`,
    'method:surf': `${baseUrl}/surf.png`,
    'method:good-rod': `${baseUrl}/rod.png`,
    'method:super-rod': `${baseUrl}/rod.png`,
    'method:old-rod': `${baseUrl}/rod.png`,
    'only-one:legendary': `${baseUrl}/legendary.png`,
    'only-one:mewtwo': `${baseUrl}/monster.png`,
    'only-one:default': `${baseUrl}/only_one.png`,
    'gift:bulbasaur:cerulean-city': `${baseUrl}/female_trainer.png`,
    'gift:bulbasaur:default': `${baseUrl}/professor_oak.png`,
    'gift:charmander:kanto-route-24': `${baseUrl}/male_trainer.png`,
    'gift:charmander:default': `${baseUrl}/professor_oak.png`,
    'gift:squirtle:vermilion-city': `${baseUrl}/officer_jenny.png`,
    'gift:squirtle:default': `${baseUrl}/professor_oak.png`,
    'gift:pikachu': `${baseUrl}/professor_oak.png`,
    'gift:magikarp': `${baseUrl}/magikarp_salesman.png`,
    'gift:omanyte': `${baseUrl}/super_nerd.png`,
    'gift:kabuto': `${baseUrl}/super_nerd.png`,
    'gift:aerodactyl': `${baseUrl}/museum_scientist.png`,
    'gift:hitmonlee': `${baseUrl}/karate_trainer.png`,
    'gift:hitmonchan': `${baseUrl}/karate_trainer.png`,
    'gift:eevee:saffron-city': `${baseUrl}/karate_trainer.png`,
    'gift:eevee:default': `${baseUrl}/only_one.png`,
    'gift:lapras': `${baseUrl}/silphco_employee.png`,
  };

  // Special URL handling
  if (icons[`special:${methodName}`]) return icons[`special:${methodName}`];

  // Method-based icon handling
  if (icons[`method:${methodName}`]) return icons[`method:${methodName}`];

  // "Only-one" method handling
  if (methodName === 'only-one') {
    if (['articuno', 'moltres', 'zapdos'].includes(pokemonName)) return icons['only-one:legendary'];
    if (pokemonName === 'mewtwo') return icons['only-one:mewtwo'];
    return icons['only-one:default'];
  }

  // Gift method handling
  if (methodName === 'gift') {
    const giftIconKey = `gift:${pokemonName}:${areaKey}`;
    const defaultGiftIconKey = `gift:${pokemonName}:default`;
    return (
      icons[giftIconKey] ||
      icons[defaultGiftIconKey] ||
      icons[`gift:${pokemonName}`] ||
      icons['only-one:default']
    );
  }

  // Default fallback
  return `${baseUrl}/walk.png`;
};

const mapGen2Icons = (methodName: string, pokemonName: string): string => {
  const baseUrl = `https://raw.githubusercontent.com/andreferreiradlw/pokestats_media/main/assets/icons/generation-ii`;

  // Consolidate all icons into a single lookup object for faster access
  const icons: Record<string, string> = {
    walk: `${baseUrl}/grass.png`,
    surf: `${baseUrl}/surf.png`,
    'good-rod': `${baseUrl}/rod.png`,
    'super-rod': `${baseUrl}/rod-female.png`,
    'old-rod': `${baseUrl}/rod.png`,
    headbutt: `${baseUrl}/headbutt.png`,
    gift: `${baseUrl}/gift.png`,
    'gift-egg': `${baseUrl}/gift-egg.png`,
    'squirt-bottle': `${baseUrl}/squirt-bottle.png`,
    'rock-smash': `${baseUrl}/boulder.png`,
    'pokeflute:snorlax': `${baseUrl}/snorlax.png`,
    'roaming-grass:raikou': `${baseUrl}/raikou-gif.png`,
    'roaming-grass:entei': `${baseUrl}/entei-gif.png`,
    'roaming-grass:suicune': `${baseUrl}/suicune-gif.png`,
    'only-one:suicune': `${baseUrl}/suicune-gif.png`,
    'only-one:ho-oh': `${baseUrl}/ho-oh-gif.png`,
    'only-one:lugia': `${baseUrl}/lugia.png`,
    'only-one:celebi': `${baseUrl}/celebi.png`,
  };

  // Attempt to find a match for specific combinations
  const combinedKey = `${methodName}:${pokemonName}`;

  if (icons[combinedKey]) return icons[combinedKey];

  // Return method-specific icon or default fallback
  return icons[methodName] || `${baseUrl}/walk.png`;
};

const mapGen3Icons = (methodName: string, pokemonName: string, regionName: string): string => {
  const baseUrl = `https://raw.githubusercontent.com/andreferreiradlw/pokestats_media/main/assets/icons/generation-ii/${regionName}`;

  // Consolidate all icons into one object for faster lookup
  const icons: Record<string, string> = {
    walk: `${baseUrl}/grass.png`,
    surf: `${baseUrl}/surf.png`,
    'good-rod': `${baseUrl}/rod.png`,
    'super-rod': `${baseUrl}/rod-female.png`,
    'old-rod': `${baseUrl}/rod.png`,
    gift: `${baseUrl}/gift.png`,
    seaweed: `${baseUrl}/seaweed.png`,
    'rock-smash': `${baseUrl}/boulder.png`,
    'roaming-grass:latias': `${baseUrl}/latias.png`,
    'roaming-water:latias': `${baseUrl}/latias.png`,
    'only-one:latias': `${baseUrl}/latias.png`,
    'only-one:kyogre': `${baseUrl}/kyogre.png`,
    'only-one:groudon': `${baseUrl}/groudon.png`,
    'only-one:rayquaza': `${baseUrl}/rayquaza.png`,
    'only-one:registeel': `${baseUrl}/registeel.png`,
    'only-one:regirock': `${baseUrl}/regirock.png`,
    'only-one:regice': `${baseUrl}/regice.png`,
    'only-one:deoxys': `${baseUrl}/deoxys.png`,
  };

  // Attempt to find a match for specific combinations
  const combinedKey = `${methodName}:${pokemonName}`;

  if (icons[combinedKey]) return icons[combinedKey];

  // Return method-specific icon or default fallback
  return icons[methodName] || `${baseUrl}/walk.png`;
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

  if (generation === 'generation-iii') {
    return mapGen3Icons(methodName, pokemonName, regionName);
  }

  return '';
};
