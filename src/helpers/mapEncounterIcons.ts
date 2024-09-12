import type { GameGenValue } from './gameVersion';

const mapGen1Icons = (methodName: string, pokemonName: string, areaKey: string): string => {
  const baseUrl =
    'https://raw.githubusercontent.com/andreferreiradlw/pokestats_media/main/assets/icons/generation-i';

  // Consolidate all icons into a single lookup object for faster access
  const icons: Record<string, string> = {
    // Special icons
    'special:pokeflute':
      'https://raw.githubusercontent.com/msikma/pokesprite/master/items/key-item/poke-flute.png',

    // Method-specific icons
    'method:walk': `${baseUrl}/walk.png`,
    'method:surf': `${baseUrl}/surf.png`,
    'method:good-rod': `${baseUrl}/rod.png`,
    'method:super-rod': `${baseUrl}/rod.png`,
    'method:old-rod': `${baseUrl}/rod.png`,

    // "Only-one" specific icons
    'only-one:legendary': `${baseUrl}/legendary.png`,
    'only-one:mewtwo': `${baseUrl}/monster.png`,
    'only-one:default': `${baseUrl}/only_one.png`,

    // Gift-specific icons
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

  // Attempt to find a match in icons
  const combinedKey = `${methodName}:${pokemonName}`;
  const giftIconKey = `gift:${pokemonName}:${areaKey}`;
  const defaultGiftIconKey = `gift:${pokemonName}:default`;

  // Return the appropriate icon or default fallback
  return (
    icons[`special:${methodName}`] ||
    icons[`method:${methodName}`] ||
    (methodName === 'only-one' && icons[combinedKey]) ||
    (methodName === 'only-one' && icons[`only-one:default`]) ||
    icons[giftIconKey] ||
    icons[defaultGiftIconKey] ||
    icons[combinedKey] ||
    `${baseUrl}/walk.png`
  );
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
  const baseUrl = `https://raw.githubusercontent.com/andreferreiradlw/pokestats_media/main/assets/icons/generation-iii/${regionName}`;

  // Consolidate all icons into one object for faster lookup
  const icons: Record<string, string> = {
    // Method-specific icons
    walk: `${baseUrl}/grass.png`,
    surf: `${baseUrl}/surf.png`,
    'good-rod': `${baseUrl}/rod.png`,
    'super-rod': `${baseUrl}/rod-female.png`,
    'old-rod': `${baseUrl}/rod.png`,
    gift: `${baseUrl}/gift.png`,
    'gift-egg': `${baseUrl}/gift-egg.png`,
    seaweed: `${baseUrl}/seaweed.png`,
    'rock-smash': `${baseUrl}/boulder.png`,
    'wailmer-pail': `${baseUrl}/pokeflute.png`,

    // Roaming and only-one specific icons
    'roaming-grass:latias': `${baseUrl}/latias.png`,
    'roaming-grass:suicune': `${baseUrl}/suicune.png`,
    'roaming-grass:raikou': `${baseUrl}/raikou.png`,
    'roaming-grass:entei': `${baseUrl}/entei.png`,
    'roaming-water:latias': `${baseUrl}/latias.png`,
    'only-one:latias': `${baseUrl}/latias.png`,
    'only-one:kyogre': `${baseUrl}/kyogre.png`,
    'only-one:groudon': `${baseUrl}/groudon.png`,
    'only-one:rayquaza': `${baseUrl}/rayquaza.png`,
    'only-one:registeel': `${baseUrl}/registeel.png`,
    'only-one:regirock': `${baseUrl}/regirock.png`,
    'only-one:regice': `${baseUrl}/regice.png`,
    'only-one:zapdos': `${baseUrl}/zapdos.png`,
    'only-one:mewtwo': `${baseUrl}/mewtwo.png`,
    'only-one:moltres': `${baseUrl}/moltres.png`,
    'only-one:articuno': `${baseUrl}/articuno.png`,
    'only-one:lugia': `${baseUrl}/lugia.png`,
    'pokeflute:snorlax': `${baseUrl}/pokeflute.png`,

    // Special case for Deoxys by region
    'only-one:deoxys:kanto': `${baseUrl}/pokeball.png`,
    'only-one:deoxys:hoenn': `${baseUrl}/deoxys.png`,
  };

  // Generate the combined key for lookup
  const combinedKey = `${methodName}:${pokemonName}`;
  const deoxysKey = `${combinedKey}:${regionName}`;

  // Return the appropriate icon or default fallback
  return icons[deoxysKey] || icons[combinedKey] || icons[methodName] || `${baseUrl}/walk.png`;
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
