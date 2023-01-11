import { version } from 'os';

const gameVersions = [
  {
    name: 'Red',
    value: 'red',
    group: 'red-blue',
    generation: 'Generation I',
    genValue: 'generation-i',
  },
  {
    name: 'Blue',
    value: 'blue',
    group: 'red-blue',
    generation: 'Generation I',
    genValue: 'generation-i',
  },
  {
    name: 'Yellow',
    value: 'yellow',
    group: 'yellow',
    generation: 'Generation I',
    genValue: 'generation-i',
  },
  {
    name: 'Gold',
    value: 'gold',
    group: 'gold-silver',
    generation: 'Generation II',
    genValue: 'generation-ii',
  },
  {
    name: 'Silver',
    value: 'silver',
    group: 'gold-silver',
    generation: 'Generation II',
    genValue: 'generation-ii',
  },
  {
    name: 'Crystal',
    value: 'crystal',
    group: 'crystal',
    generation: 'Generation II',
    genValue: 'generation-ii',
  },
  {
    name: 'Ruby',
    value: 'ruby',
    group: 'ruby-sapphire',
    generation: 'Generation III',
    genValue: 'generation-iii',
  },
  {
    name: 'Sapphire',
    value: 'sapphire',
    group: 'ruby-sapphire',
    generation: 'Generation III',
    genValue: 'generation-iii',
  },
  {
    name: 'Emerald',
    value: 'emerald',
    group: 'emerald',
    generation: 'Generation III',
    genValue: 'generation-iii',
  },
  {
    name: 'Fire Red',
    value: 'firered',
    group: 'firered-leafgreen',
    generation: 'Generation III',
    genValue: 'generation-iii',
  },
  {
    name: 'Leaf Green',
    value: 'leafgreen',
    group: 'firered-leafgreen',
    generation: 'Generation III',
    genValue: 'generation-iii',
  },
  {
    name: 'Diamond',
    value: 'diamond',
    group: 'diamond-pearl',
    generation: 'Generation IV',
    genValue: 'generation-iv',
  },
  {
    name: 'Pearl',
    value: 'pearl',
    group: 'diamond-pearl',
    generation: 'Generation IV',
    genValue: 'generation-iv',
  },
  {
    name: 'Platinum',
    value: 'platinum',
    group: 'platinum',
    generation: 'Generation IV',
    genValue: 'generation-iv',
  },
  {
    name: 'Heart Gold',
    value: 'heartgold',
    group: 'heartgold-soulsilver',
    generation: 'Generation IV',
    genValue: 'generation-iv',
  },
  {
    name: 'Soul Silver',
    value: 'soulsilver',
    group: 'heartgold-soulsilver',
    generation: 'Generation IV',
    genValue: 'generation-iv',
  },
  {
    name: 'Black',
    value: 'black',
    group: 'black-white',
    generation: 'Generation V',
    genValue: 'generation-v',
  },
  {
    name: 'White',
    value: 'white',
    group: 'black-white',
    generation: 'Generation V',
    genValue: 'generation-v',
  },
  {
    name: 'Black 2',
    value: 'black-2',
    group: 'black-2-white-2',
    generation: 'Generation V',
    genValue: 'generation-v',
  },
  {
    name: 'White 2',
    value: 'white-2',
    group: 'black-2-white-2',
    generation: 'Generation V',
    genValue: 'generation-v',
  },
  { name: 'X', value: 'x', group: 'x-y', generation: 'Generation VI', genValue: 'generation-vi' },
  { name: 'Y', value: 'y', group: 'x-y', generation: 'Generation VI', genValue: 'generation-vi' },
  {
    name: 'Omega Ruby',
    value: 'omega-ruby',
    group: 'omega-ruby-alpha-sapphire',
    generation: 'Generation VI',
    genValue: 'generation-vi',
  },
  {
    name: 'Alpha Sapphire',
    value: 'alpha-sapphire',
    group: 'omega-ruby-alpha-sapphire',
    generation: 'Generation VI',
    genValue: 'generation-vi',
  },
  {
    name: 'Sun',
    value: 'sun',
    group: 'sun-moon',
    generation: 'Generation VII',
    genValue: 'generation-vii',
  },
  {
    name: 'Moon',
    value: 'moon',
    group: 'sun-moon',
    generation: 'Generation VII',
    genValue: 'generation-vii',
  },
  {
    name: 'Ultra Sun',
    value: 'ultra-sun',
    group: 'ultra-sun-ultra-moon',
    generation: 'Generation VII',
    genValue: 'generation-vii',
  },
  {
    name: 'Ultra Moon',
    value: 'ultra-moon',
    group: 'ultra-sun-ultra-moon',
    generation: 'Generation VII',
    genValue: 'generation-vii',
  },
  {
    name: "Let's Go Pikachu",
    value: 'lets-go-pikachu',
    group: 'lets-go-pikachu-lets-go-eevee',
    generation: 'Generation VII',
    genValue: 'generation-vii',
  },
  {
    name: "Let's Go Eevee",
    value: 'lets-go-eevee',
    group: 'lets-go-pikachu-lets-go-eevee',
    generation: 'Generation VII',
    genValue: 'generation-vii',
  },
  /** 
  {
    name: 'Sword',
    value: 'sword',
    group: 'sword-shield',
    generation: 'Generation VIII',
    genValue: 'generation-viii',
  },
  {
    name: 'Shield',
    value: 'shield',
    group: 'sword-shield',
    generation: 'Generation VIII',
    genValue: 'generation-viii',
  },
  */
];

const generations = [
  {
    genValue: 'generation-i',
    genDescription: 'Generation I',
    gameVersion: 'yellow',
  },
  {
    genValue: 'generation-ii',
    genDescription: 'Generation II',
    gameVersion: 'crystal',
  },
  {
    genValue: 'generation-iii',
    genDescription: 'Generation III',
    gameVersion: 'leafgreen',
  },
  {
    genValue: 'generation-iv',
    genDescription: 'Generation IV',
    gameVersion: 'soulsilver',
  },
  {
    genValue: 'generation-v',
    genDescription: 'Generation V',
    gameVersion: 'black',
  },
  {
    genValue: 'generation-vi',
    genDescription: 'Generation VI',
    gameVersion: 'alpha-sapphire',
  },
  {
    genValue: 'generation-vii',
    genDescription: 'Generation VII',
    gameVersion: 'sun',
  },
  {
    genValue: 'generation-viii',
    genDescription: 'Generation VIII',
    gameVersion: 'sword',
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
  } /** else if (id > 809 && id <= 898) {
    return 'generation-viii'
  } */ else {
    return 'all';
  }
};

const mapVersionToGroup = (currentVersion: string): string[] =>
  gameVersions.filter(version => version.value === currentVersion).map(version => version.group);

const mapGeneration = (generationValue: string): string =>
  generations
    .filter(gen => gen.genValue === generationValue)
    .map(generation => generation.genDescription)
    .toString();

const mapGenerationToGame = (value: string): string =>
  generations
    .filter(gen => gen.genValue === value)
    .map(generation => generation.gameVersion)
    .toString();

const checkIfEarlierGen = (newGen: string, currGen: string): boolean => {
  const versionValues = gameVersions.map(version => version.value);

  return versionValues.indexOf(newGen) > versionValues.indexOf(currGen);
};

export {
  gameVersions,
  generations,
  mapIdToGeneration,
  mapVersionToGroup,
  mapGeneration,
  mapGenerationToGame,
  checkIfEarlierGen,
};
