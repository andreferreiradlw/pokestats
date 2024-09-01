export interface Game {
  label: string;
  value: string;
  group: string;
  generation: string;
  genValue: string;
  genGroups: string[];
  moveGroups: string[];
}

export type GameVersions = Game[];

const gameVersions: GameVersions = [
  {
    label: 'Red',
    value: 'red',
    group: 'red-blue',
    generation: 'Generation I',
    genValue: 'generation-i',
    genGroups: ['red-blue', 'yellow'],
    moveGroups: ['red-blue', 'yellow'],
  },
  {
    label: 'Blue',
    value: 'blue',
    group: 'red-blue',
    generation: 'Generation I',
    genValue: 'generation-i',
    genGroups: ['red-blue', 'yellow'],
    moveGroups: ['red-blue', 'yellow'],
  },
  {
    label: 'Yellow',
    value: 'yellow',
    group: 'yellow',
    generation: 'Generation I',
    genValue: 'generation-i',
    genGroups: ['red-blue', 'yellow'],
    moveGroups: ['red-blue', 'yellow'],
  },
  {
    label: 'Gold',
    value: 'gold',
    group: 'gold-silver',
    generation: 'Generation II',
    genValue: 'generation-ii',
    genGroups: ['gold-silver', 'crystal'],
    moveGroups: ['gold-silver', 'crystal'],
  },
  {
    label: 'Silver',
    value: 'silver',
    group: 'gold-silver',
    generation: 'Generation II',
    genValue: 'generation-ii',
    genGroups: ['gold-silver', 'crystal'],
    moveGroups: ['gold-silver', 'crystal'],
  },
  {
    label: 'Crystal',
    value: 'crystal',
    group: 'crystal',
    generation: 'Generation II',
    genValue: 'generation-ii',
    genGroups: ['gold-silver', 'crystal'],
    moveGroups: ['gold-silver', 'crystal'],
  },
  {
    label: 'Ruby',
    value: 'ruby',
    group: 'ruby-sapphire',
    generation: 'Generation III',
    genValue: 'generation-iii',
    genGroups: ['ruby-sapphire', 'emerald'],
    moveGroups: ['ruby-sapphire', 'emerald', 'firered-leafgreen'],
  },
  {
    label: 'Sapphire',
    value: 'sapphire',
    group: 'ruby-sapphire',
    generation: 'Generation III',
    genValue: 'generation-iii',
    genGroups: ['ruby-sapphire', 'emerald'],
    moveGroups: ['ruby-sapphire', 'emerald', 'firered-leafgreen'],
  },
  {
    label: 'Emerald',
    value: 'emerald',
    group: 'emerald',
    generation: 'Generation III',
    genValue: 'generation-iii',
    genGroups: ['ruby-sapphire', 'emerald'],
    moveGroups: ['ruby-sapphire', 'emerald', 'firered-leafgreen'],
  },
  {
    label: 'Fire Red',
    value: 'firered',
    group: 'firered-leafgreen',
    generation: 'Generation III',
    genValue: 'generation-iii',
    genGroups: ['firered-leafgreen'],
    moveGroups: ['ruby-sapphire', 'emerald', 'firered-leafgreen'],
  },
  {
    label: 'Leaf Green',
    value: 'leafgreen',
    group: 'firered-leafgreen',
    generation: 'Generation III',
    genValue: 'generation-iii',
    genGroups: ['firered-leafgreen'],
    moveGroups: ['ruby-sapphire', 'emerald', 'firered-leafgreen'],
  },
  {
    label: 'Diamond',
    value: 'diamond',
    group: 'diamond-pearl',
    generation: 'Generation IV',
    genValue: 'generation-iv',
    genGroups: ['diamond-pearl', 'platinum', 'heartgold-soulsilver'],
    moveGroups: ['diamond-pearl', 'platinum', 'heartgold-soulsilver'],
  },
  {
    label: 'Pearl',
    value: 'pearl',
    group: 'diamond-pearl',
    generation: 'Generation IV',
    genValue: 'generation-iv',
    genGroups: ['diamond-pearl', 'platinum', 'heartgold-soulsilver'],
    moveGroups: ['diamond-pearl', 'platinum', 'heartgold-soulsilver'],
  },
  {
    label: 'Platinum',
    value: 'platinum',
    group: 'platinum',
    generation: 'Generation IV',
    genValue: 'generation-iv',
    genGroups: ['diamond-pearl', 'platinum', 'heartgold-soulsilver'],
    moveGroups: ['diamond-pearl', 'platinum', 'heartgold-soulsilver'],
  },
  {
    label: 'Heart Gold',
    value: 'heartgold',
    group: 'heartgold-soulsilver',
    generation: 'Generation IV',
    genValue: 'generation-iv',
    genGroups: ['diamond-pearl', 'platinum', 'heartgold-soulsilver'],
    moveGroups: ['diamond-pearl', 'platinum', 'heartgold-soulsilver'],
  },
  {
    label: 'Soul Silver',
    value: 'soulsilver',
    group: 'heartgold-soulsilver',
    generation: 'Generation IV',
    genValue: 'generation-iv',
    genGroups: ['diamond-pearl', 'platinum', 'heartgold-soulsilver'],
    moveGroups: ['diamond-pearl', 'platinum', 'heartgold-soulsilver'],
  },
  {
    label: 'Black',
    value: 'black',
    group: 'black-white',
    generation: 'Generation V',
    genValue: 'generation-v',
    genGroups: ['black-white', 'black-2-white-2'],
    moveGroups: ['black-white', 'black-2-white-2'],
  },
  {
    label: 'White',
    value: 'white',
    group: 'black-white',
    generation: 'Generation V',
    genValue: 'generation-v',
    genGroups: ['black-white', 'black-2-white-2'],
    moveGroups: ['black-white', 'black-2-white-2'],
  },
  {
    label: 'Black 2',
    value: 'black-2',
    group: 'black-2-white-2',
    generation: 'Generation V',
    genValue: 'generation-v',
    genGroups: ['black-white', 'black-2-white-2'],
    moveGroups: ['black-white', 'black-2-white-2'],
  },
  {
    label: 'White 2',
    value: 'white-2',
    group: 'black-2-white-2',
    generation: 'Generation V',
    genValue: 'generation-v',
    genGroups: ['black-white', 'black-2-white-2'],
    moveGroups: ['black-white', 'black-2-white-2'],
  },
  {
    label: 'X',
    value: 'x',
    group: 'x-y',
    generation: 'Generation VI',
    genValue: 'generation-vi',
    genGroups: ['x-y', 'omega-ruby-alpha-sapphire'],
    moveGroups: ['x-y', 'omega-ruby-alpha-sapphire'],
  },
  {
    label: 'Y',
    value: 'y',
    group: 'x-y',
    generation: 'Generation VI',
    genValue: 'generation-vi',
    genGroups: ['x-y', 'omega-ruby-alpha-sapphire'],
    moveGroups: ['x-y', 'omega-ruby-alpha-sapphire'],
  },
  {
    label: 'Omega Ruby',
    value: 'omega-ruby',
    group: 'omega-ruby-alpha-sapphire',
    generation: 'Generation VI',
    genValue: 'generation-vi',
    genGroups: ['x-y', 'omega-ruby-alpha-sapphire'],
    moveGroups: ['x-y', 'omega-ruby-alpha-sapphire'],
  },
  {
    label: 'Alpha Sapphire',
    value: 'alpha-sapphire',
    group: 'omega-ruby-alpha-sapphire',
    generation: 'Generation VI',
    genValue: 'generation-vi',
    genGroups: ['x-y', 'omega-ruby-alpha-sapphire'],
    moveGroups: ['x-y', 'omega-ruby-alpha-sapphire'],
  },
  {
    label: 'Sun',
    value: 'sun',
    group: 'sun-moon',
    generation: 'Generation VII',
    genValue: 'generation-vii',
    genGroups: ['sun-moon', 'ultra-sun-ultra-moon', 'lets-go-pikachu-lets-go-eevee'],
    moveGroups: ['sun-moon', 'ultra-sun-ultra-moon'],
  },
  {
    label: 'Moon',
    value: 'moon',
    group: 'sun-moon',
    generation: 'Generation VII',
    genValue: 'generation-vii',
    genGroups: ['sun-moon', 'ultra-sun-ultra-moon', 'lets-go-pikachu-lets-go-eevee'],
    moveGroups: ['sun-moon', 'ultra-sun-ultra-moon'],
  },
  {
    label: 'Ultra Sun',
    value: 'ultra-sun',
    group: 'ultra-sun-ultra-moon',
    generation: 'Generation VII',
    genValue: 'generation-vii',
    genGroups: ['sun-moon', 'ultra-sun-ultra-moon', 'lets-go-pikachu-lets-go-eevee'],
    moveGroups: ['sun-moon', 'ultra-sun-ultra-moon'],
  },
  {
    label: 'Ultra Moon',
    value: 'ultra-moon',
    group: 'ultra-sun-ultra-moon',
    generation: 'Generation VII',
    genValue: 'generation-vii',
    genGroups: ['sun-moon', 'ultra-sun-ultra-moon', 'lets-go-pikachu-lets-go-eevee'],
    moveGroups: ['sun-moon', 'ultra-sun-ultra-moon'],
  },
  {
    label: "Let's Go Pikachu",
    value: 'lets-go-pikachu',
    group: 'lets-go-pikachu-lets-go-eevee',
    generation: 'Generation VII',
    genValue: 'generation-vii',
    genGroups: ['sun-moon', 'ultra-sun-ultra-moon', 'lets-go-pikachu-lets-go-eevee'],
    moveGroups: ['lets-go-pikachu-lets-go-eevee'],
  },
  {
    label: "Let's Go Eevee",
    value: 'lets-go-eevee',
    group: 'lets-go-pikachu-lets-go-eevee',
    generation: 'Generation VII',
    genValue: 'generation-vii',
    genGroups: ['sun-moon', 'ultra-sun-ultra-moon', 'lets-go-pikachu-lets-go-eevee'],
    moveGroups: ['lets-go-pikachu-lets-go-eevee'],
  },
  {
    label: 'Sword',
    value: 'sword',
    group: 'sword-shield',
    generation: 'Generation VIII',
    genValue: 'generation-viii',
    genGroups: ['sword-shield'],
    moveGroups: ['sword-shield'],
  },
  {
    label: 'Shield',
    value: 'shield',
    group: 'sword-shield',
    generation: 'Generation VIII',
    genValue: 'generation-viii',
    genGroups: ['sword-shield'],
    moveGroups: ['sword-shield'],
  },
  {
    label: 'Legends: Arceus',
    value: 'legends-arceus',
    group: 'scarlet-violet',
    generation: 'Generation VIII',
    genValue: 'generation-viii',
    genGroups: ['scarlet-violet'],
    moveGroups: ['scarlet-violet'],
  },
  // {
  //   label: 'Scarlet',
  //   value: 'scarlet',
  //   group: 'scarlet-violet',
  //   generation: 'Generation IX',
  //   genValue: 'generation-ix',
  // genGroups: ['scarlet-violet'],
  // },
  // {
  //   label: 'Violet',
  //   value: 'violet',
  //   group: 'scarlet-violet',
  //   generation: 'Generation IX',
  //   genValue: 'generation-ix',
  // genGroups: ['scarlet-violet'],
  // },
];

const generationOptions = [
  { value: 'all', label: 'All' },
  {
    value: 'generation-i',
    label: 'Generation I',
  },
  {
    value: 'generation-ii',
    label: 'Generation II',
  },
  {
    value: 'generation-iii',
    label: 'Generation III',
  },
  {
    value: 'generation-iv',
    label: 'Generation IV',
  },
  {
    value: 'generation-v',
    label: 'Generation V',
  },
  {
    value: 'generation-vi',
    label: 'Generation VI',
  },
  {
    value: 'generation-vii',
    label: 'Generation VII',
  },
  {
    value: 'generation-viii',
    label: 'Generation VIII',
  },
];

const generations = [
  {
    value: 'generation-i',
    label: 'Generation I',
    gameVersion: 'yellow',
  },
  {
    value: 'generation-ii',
    label: 'Generation II',
    gameVersion: 'crystal',
  },
  {
    value: 'generation-iii',
    label: 'Generation III',
    gameVersion: 'leafgreen',
  },
  {
    value: 'generation-iv',
    label: 'Generation IV',
    gameVersion: 'soulsilver',
  },
  {
    value: 'generation-v',
    label: 'Generation V',
    gameVersion: 'black',
  },
  {
    value: 'generation-vi',
    label: 'Generation VI',
    gameVersion: 'alpha-sapphire',
  },
  {
    value: 'generation-vii',
    label: 'Generation VII',
    gameVersion: 'sun',
  },
  {
    value: 'generation-viii',
    label: 'Generation VIII',
    gameVersion: 'sword',
  },
  {
    value: 'generation-viii',
    label: 'Generation VIII',
    gameVersion: 'legends-arceus',
  },
  {
    value: 'generation-ix',
    label: 'Generation IX',
    gameVersion: 'scarlet',
  },
];

const mapIdToGeneration = (id: number): string => {
  if (id <= 151) {
    return 'generation-i';
  } else if (id > 151 && id <= 251) {
    return 'generation-ii';
  } else if (id > 251 && id <= 386) {
    return 'generation-iii';
  } else if (id > 386 && id <= 493) {
    return 'generation-iv';
  } else if (id > 483 && id <= 649) {
    return 'generation-v';
  } else if (id > 649 && id <= 721) {
    return 'generation-vi';
  } else if (id > 721 && id <= 809) {
    return 'generation-vii';
  } else if (id > 809 && id <= 905) {
    return 'generation-viii';
  } else if (id > 905 && id <= 1008) {
    return 'generation-ix';
  } else {
    return 'all';
  }
};

const checkIfArceus = (pokemonId: number): boolean => pokemonId > 898 && pokemonId <= 905;

const mapVersionToGroup = (currentVersion: string): Game['group'] =>
  gameVersions.filter(version => version.value === currentVersion).map(version => version.group)[0];

const mapGeneration = (generationValue: string) =>
  generationValue ? generations.find(gen => gen.value === generationValue)?.label : '';

const mapGenerationToGame = (value: string, pokemonId: number): Game['value'] => {
  const genGames = gameVersions.filter(gen => gen.genValue === value);

  if (checkIfArceus(pokemonId)) {
    return genGames[2].value;
  } else {
    return genGames[0].value;
  }
};

const checkIfEarlierGen = (newGen: string, currGen: string): boolean => {
  const versionValues = gameVersions.map(version => version.value);

  return versionValues.indexOf(newGen) > versionValues.indexOf(currGen);
};

const mapGroupToGeneration = (groupName: string): Game['generation'] | undefined =>
  gameVersions.find(version => version.group === groupName)?.generation;

const mapGroupToGenerationValue = (groupName: string): Game['genValue'] | undefined =>
  gameVersions.find(version => version.group === groupName)?.genValue;

const listGamesByGen = (generation: string): Game[] =>
  gameVersions.filter(game => game.genValue === generation);

const listGamesByGroup = (group: string): Game['label'][] =>
  gameVersions.filter(game => game.group === group).map(currGame => currGame.label);

const listGenGroupsByGroup = (genGroup: string): Game['genGroups'] | undefined =>
  gameVersions.find(version => version.group === genGroup)?.genGroups;

const listMoveGroupsByGroup = (moveGroup: string): Game['genGroups'] | undefined =>
  gameVersions.find(version => version.group === moveGroup)?.moveGroups;

export {
  gameVersions,
  generationOptions,
  generations,
  mapIdToGeneration,
  mapVersionToGroup,
  mapGeneration,
  mapGenerationToGame,
  checkIfEarlierGen,
  checkIfArceus,
  mapGroupToGeneration,
  mapGroupToGenerationValue,
  listGamesByGen,
  listGamesByGroup,
  listGenGroupsByGroup,
  listMoveGroupsByGroup,
};
