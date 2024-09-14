import type { GameGenValue } from './gameVersion';

const mapGen1Icons = (methodName: string, pokemonName: string, areaKey: string): string => {
  const baseUrl =
    'https://raw.githubusercontent.com/andreferreiradlw/pokestats_media/main/assets/icons/generation-i';

  const icons: Record<string, string> = {
    // Special icons
    'special:pokeflute':
      'https://raw.githubusercontent.com/msikma/pokesprite/master/items/key-item/poke-flute.png',

    // Method-specific icons
    'method:walk': `${baseUrl}/walk.png`,
    'method:surf': `${baseUrl}/surf.png`,
    'method:old-rod': `${baseUrl}/rod.png`,
    'method:good-rod': `${baseUrl}/rod.png`,
    'method:super-rod': `${baseUrl}/rod.png`,

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
    (methodName === 'only-one' && icons['only-one:default']) ||
    icons[giftIconKey] ||
    icons[defaultGiftIconKey] ||
    icons[combinedKey] ||
    `${baseUrl}/walk.png`
  );
};

const mapGen2Icons = (methodName: string, pokemonName: string): string => {
  const baseUrl =
    'https://raw.githubusercontent.com/andreferreiradlw/pokestats_media/main/assets/icons/generation-ii';

  const icons: Record<string, string> = {
    walk: `${baseUrl}/grass.png`,
    surf: `${baseUrl}/surf.png`,
    'old-rod': `${baseUrl}/rod.png`,
    'good-rod': `${baseUrl}/rod.png`,
    'super-rod': `${baseUrl}/rod-female.png`,
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

  const icons: Record<string, string> = {
    // Method-specific icons
    walk: `${baseUrl}/grass.png`,
    surf: `${baseUrl}/surf.png`,
    'old-rod': `${baseUrl}/rod.png`,
    'good-rod': `${baseUrl}/rod.png`,
    'super-rod': `${baseUrl}/rod-female.png`,
    gift: `${baseUrl}/gift.png`,
    'gift-egg': `${baseUrl}/gift-egg.png`,
    seaweed: `${baseUrl}/seaweed.png`,
    'rock-smash': `${baseUrl}/boulder.png`,
    'wailmer-pail': `${baseUrl}/pokeflute.png`,

    // Roaming and only-one specific icons
    'roaming-grass:latias': `${baseUrl}/latias.png`,
    'roaming-grass:latios': `${baseUrl}/latios.png`,
    'roaming-grass:suicune': `${baseUrl}/suicune.png`,
    'roaming-grass:raikou': `${baseUrl}/raikou.png`,
    'roaming-grass:entei': `${baseUrl}/entei.png`,
    'roaming-water:latias': `${baseUrl}/latias.png`,
    'roaming-water:latios': `${baseUrl}/latios.png`,
    'only-one:latias': `${baseUrl}/latias.png`,
    'only-one:latios': `${baseUrl}/latios.png`,
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

const mapGen4Icons = (methodName: string, pokemonName: string, regionName: string): string => {
  const baseUrl = `https://raw.githubusercontent.com/andreferreiradlw/pokestats_media/main/assets/icons/generation-iv/${regionName}`;

  const icons: Record<string, string> = {
    // Method-specific icons
    walk: `${baseUrl}/grass.png`,
    surf: `${baseUrl}/surf.png`,
    'old-rod': `${baseUrl}/rod.png`,
    'good-rod': `${baseUrl}/rod.png`,
    'super-rod': `${baseUrl}/rod.png`,
    'rock-smash': `${baseUrl}/boulder.png`,
    gift: `${baseUrl}/gift.png`,
    'gift-egg': `${baseUrl}/gift-egg.png`,

    // Roaming and only-one specific icons
    'roaming-grass:cresselia': `${baseUrl}/cresselia.png`,
    'roaming-grass:mesprit': `${baseUrl}/mesprit.png`,
    'roaming-grass:latios': `${baseUrl}/latios.png`,
    'roaming-grass:latias': `${baseUrl}/latias.png`,
    'roaming-grass:moltres': `${baseUrl}/moltres.png`,
    'roaming-grass:zapdos': `${baseUrl}/zapdos.png`,
    'roaming-grass:articuno': `${baseUrl}/articuno.png`,
    'roaming-grass:raikou': `${baseUrl}/raikou.png`,
    'roaming-grass:entei': `${baseUrl}/entei.png`,
    'roaming-water:moltres': `${baseUrl}/moltres.png`,
    'roaming-water:zapdos': `${baseUrl}/zapdos.png`,
    'roaming-water:cresselia': `${baseUrl}/cresselia.png`,
    'roaming-water:mesprit': `${baseUrl}/mesprit.png`,
    'roaming-water:articuno': `${baseUrl}/articuno.png`,
    'only-one:shaymin': `${baseUrl}/shaymin.png`,
    'only-one:darkray': `${baseUrl}/darkrai.png`,
    'only-one:regigigas': `${baseUrl}/regigigas.png`,
    'only-one:palkia': `${baseUrl}/palkia.png`,
    'only-one:giratina': `${baseUrl}/giratina.png`,
    'only-one:heatran': `${baseUrl}/heatran.png`,
    'only-one:dialga': `${baseUrl}/dialga.png`,
    'only-one:azelf': `${baseUrl}/azelf.png`,
    'only-one:uxie': `${baseUrl}/uxie.png`,
    'only-one:arceus': `${baseUrl}/arceus.png`,
    'only-one:electrode': `${baseUrl}/electrode.png`,
    'only-one:lugia': `${baseUrl}/lugia.png`,
    'only-one:moltres': `${baseUrl}/moltres.png`,
    'only-one:zapdos': `${baseUrl}/zapdos.png`,
    'only-one:articuno': `${baseUrl}/articuno.png`,
    'only-one:koffing': `${baseUrl}/koffing.png`,
    'only-one:geodude': `${baseUrl}/geodude.png`,
    'only-one:mewtwo': `${baseUrl}/mewtwo.png`,
    'only-one:kyogre': `${baseUrl}/kyogre.png`,
    'only-one:groudon': `${baseUrl}/groudon.png`,
    'only-one:suicune': `${baseUrl}/suicune.png`,
    'only-one:rayquaza': `${baseUrl}/rayquaza.png`,
    'only-one:rotom': `${baseUrl}/rotom.png`,
    'pokeflute:snorlax': `${baseUrl}/snorlax.png`,
  };

  // Generate the combined key for lookup
  const combinedKey = `${methodName}:${pokemonName}`;

  // Return the appropriate icon or default fallback
  return icons[combinedKey] || icons[methodName] || `${baseUrl}/walk.png`;
};

const mapGen5Icons = (methodName: string): string => {
  const baseUrl =
    'https://raw.githubusercontent.com/andreferreiradlw/pokestats_media/main/assets/icons/generation-v';

  const icons: Record<string, string> = {
    walk: `${baseUrl}/walk-grass.png`,
    surf: `${baseUrl}/surf.png`,
    'super-rod': `${baseUrl}/rod.png`,
    'super-rod-spots': `${baseUrl}/splash.png`,
    'surf-spots': `${baseUrl}/splash.png`,
    'grass-spots': `${baseUrl}/grass.png`,
    'dark-grass': `${baseUrl}/dark-grass.png`,
    gift: `${baseUrl}/gift.png`,
    'gift-egg': `${baseUrl}/gift-egg.png`,
    'cave-spots': `${baseUrl}/cave.png`,
    'bridge-spots': `${baseUrl}/shadow.png`,
  };

  // Return the appropriate icon or default fallback
  return icons[methodName] || `${baseUrl}/walk.png`;
};

const mapGen6Icons = (methodName: string): string => {
  const baseUrl =
    'https://raw.githubusercontent.com/andreferreiradlw/pokestats_media/main/assets/icons/generation-vii';

  const icons: Record<string, string> = {
    walk: `${baseUrl}/walk.png`,
    surf: `${baseUrl}/surf.png`,
    'rock-smash': `${baseUrl}/boulder.png`,
    'good-rod': `${baseUrl}/rod.png`,
    'super-rod': `${baseUrl}/rod.png`,
    gift: `${baseUrl}/gift.png`,
    'gift-egg': `${baseUrl}/gift-egg.png`,
    'rough-terrain': `${baseUrl}/tall-grass.png`,
    'yellow-flowers': `${baseUrl}/yellow-flowers.png`,
    'purple-flowers': `${baseUrl}/purple-flowers.png`,
    'red-flowers': `${baseUrl}/red-flowers.png`,
  };

  // Return the appropriate icon or default fallback
  return icons[methodName] || `${baseUrl}/walk.png`;
};

const mapGen7Icons = (methodName: string, regionName: string): string => {
  const baseUrl = `https://raw.githubusercontent.com/andreferreiradlw/pokestats_media/main/assets/icons/generation-vi/${regionName}`;

  const icons: Record<string, string> = {
    walk: `${baseUrl}/walk.png`,
    surf: `${baseUrl}/surf.png`,
    'good-rod': `${baseUrl}/rod.png`,
    'super-rod': `${baseUrl}/rod.png`,
    gift: `${baseUrl}/gift.png`,
    'sos-encounter': `${baseUrl}/sos.png`,
    'bubbling-spots': `${baseUrl}/splash.png`,

    // Only-one specific icons
    'only-one:guzzlord': `${baseUrl}/guzzlord.png`,
    'only-one:necrozma': `${baseUrl}/necrozma.png`,
    'only-one:kartana': `${baseUrl}/kartana.png`,
    'only-one:celesteela': `${baseUrl}/celesteela.png`,
    'only-one:xurkitree': `${baseUrl}/xurkitree.png`,
    'only-one:pheromosa': `${baseUrl}/pheromosa.png`,
    'only-one:buzzwole': `${baseUrl}/buzzwole.png`,
    'only-one:lunala': `${baseUrl}/lunala.png`,
    'only-one:solgaleo': `${baseUrl}/solgaleo.png`,
    'only-one:tapu-fini': `${baseUrl}/tapu-fini.png`,
    'only-one:tapu-bulu': `${baseUrl}/tapu-bulu.png`,
    'only-one:tapu-lele': `${baseUrl}/tapu-lele.png`,
    'only-one:tapu-koko': `${baseUrl}/tapu-koko.png`,
  };

  // Return the appropriate icon or default fallback
  return icons[methodName] || `${baseUrl}/walk.png`;
};

export const mapEncounterMethodIcons = (
  methodName: string,
  pokemonName: string,
  areaKey: string,
  generation: GameGenValue,
  regionName: string,
): string => {
  if (generation === 'generation-i') {
    return mapGen1Icons(methodName, pokemonName, areaKey);
  }

  if (generation === 'generation-ii') {
    return mapGen2Icons(methodName, pokemonName);
  }

  if (generation === 'generation-iii') {
    return mapGen3Icons(methodName, pokemonName, regionName);
  }

  if (generation === 'generation-iv') {
    return mapGen4Icons(methodName, pokemonName, regionName);
  }

  if (generation === 'generation-v') {
    return mapGen5Icons(methodName);
  }

  if (generation === 'generation-vi') {
    return mapGen6Icons(methodName);
  }

  if (generation === 'generation-vii') {
    return mapGen7Icons(methodName, pokemonName);
  }

  return 'https://raw.githubusercontent.com/andreferreiradlw/pokestats_media/main/assets/icons/generation-vi/walk.png';
};
