const gameVersions = [
  {
    label: 'Red',
    value: 'red',
    group: 'red-blue',
    generation: 'Generation I',
    genValue: 'generation-i',
  },
  {
    label: 'Blue',
    value: 'blue',
    group: 'red-blue',
    generation: 'Generation I',
    genValue: 'generation-i',
  },
  {
    label: 'Yellow',
    value: 'yellow',
    group: 'yellow',
    generation: 'Generation I',
    genValue: 'generation-i',
  },
  {
    label: 'Gold',
    value: 'gold',
    group: 'gold-silver',
    generation: 'Generation II',
    genValue: 'generation-ii',
  },
  {
    label: 'Silver',
    value: 'silver',
    group: 'gold-silver',
    generation: 'Generation II',
    genValue: 'generation-ii',
  },
  {
    label: 'Crystal',
    value: 'crystal',
    group: 'crystal',
    generation: 'Generation II',
    genValue: 'generation-ii',
  },
  {
    label: 'Ruby',
    value: 'ruby',
    group: 'ruby-sapphire',
    generation: 'Generation III',
    genValue: 'generation-iii',
  },
  {
    label: 'Sapphire',
    value: 'sapphire',
    group: 'ruby-sapphire',
    generation: 'Generation III',
    genValue: 'generation-iii',
  },
  {
    label: 'Emerald',
    value: 'emerald',
    group: 'emerald',
    generation: 'Generation III',
    genValue: 'generation-iii',
  },
  {
    label: 'Fire Red',
    value: 'firered',
    group: 'firered-leafgreen',
    generation: 'Generation III',
    genValue: 'generation-iii',
  },
  {
    label: 'Leaf Green',
    value: 'leafgreen',
    group: 'firered-leafgreen',
    generation: 'Generation III',
    genValue: 'generation-iii',
  },
  {
    label: 'Diamond',
    value: 'diamond',
    group: 'diamond-pearl',
    generation: 'Generation IV',
    genValue: 'generation-iv',
  },
  {
    label: 'Pearl',
    value: 'pearl',
    group: 'diamond-pearl',
    generation: 'Generation IV',
    genValue: 'generation-iv',
  },
  {
    label: 'Platinum',
    value: 'platinum',
    group: 'platinum',
    generation: 'Generation IV',
    genValue: 'generation-iv',
  },
  {
    label: 'Heart Gold',
    value: 'heartgold',
    group: 'heartgold-soulsilver',
    generation: 'Generation IV',
    genValue: 'generation-iv',
  },
  {
    label: 'Soul Silver',
    value: 'soulsilver',
    group: 'heartgold-soulsilver',
    generation: 'Generation IV',
    genValue: 'generation-iv',
  },
  {
    label: 'Black',
    value: 'black',
    group: 'black-white',
    generation: 'Generation V',
    genValue: 'generation-v',
  },
  {
    label: 'White',
    value: 'white',
    group: 'black-white',
    generation: 'Generation V',
    genValue: 'generation-v',
  },
  {
    label: 'Black 2',
    value: 'black-2',
    group: 'black-2-white-2',
    generation: 'Generation V',
    genValue: 'generation-v',
  },
  {
    label: 'White 2',
    value: 'white-2',
    group: 'black-2-white-2',
    generation: 'Generation V',
    genValue: 'generation-v',
  },
  { label: 'X', value: 'x', group: 'x-y', generation: 'Generation VI', genValue: 'generation-vi' },
  { label: 'Y', value: 'y', group: 'x-y', generation: 'Generation VI', genValue: 'generation-vi' },
  {
    label: 'Omega Ruby',
    value: 'omega-ruby',
    group: 'omega-ruby-alpha-sapphire',
    generation: 'Generation VI',
    genValue: 'generation-vi',
  },
  {
    label: 'Alpha Sapphire',
    value: 'alpha-sapphire',
    group: 'omega-ruby-alpha-sapphire',
    generation: 'Generation VI',
    genValue: 'generation-vi',
  },
  {
    label: 'Sun',
    value: 'sun',
    group: 'sun-moon',
    generation: 'Generation VII',
    genValue: 'generation-vii',
  },
  {
    label: 'Moon',
    value: 'moon',
    group: 'sun-moon',
    generation: 'Generation VII',
    genValue: 'generation-vii',
  },
  {
    label: 'Ultra Sun',
    value: 'ultra-sun',
    group: 'ultra-sun-ultra-moon',
    generation: 'Generation VII',
    genValue: 'generation-vii',
  },
  {
    label: 'Ultra Moon',
    value: 'ultra-moon',
    group: 'ultra-sun-ultra-moon',
    generation: 'Generation VII',
    genValue: 'generation-vii',
  },
  {
    label: "Let's Go Pikachu",
    value: 'lets-go-pikachu',
    group: 'lets-go-pikachu-lets-go-eevee',
    generation: 'Generation VII',
    genValue: 'generation-vii',
  },
  {
    label: "Let's Go Eevee",
    value: 'lets-go-eevee',
    group: 'lets-go-pikachu-lets-go-eevee',
    generation: 'Generation VII',
    genValue: 'generation-vii',
  },
  {
    label: 'Sword',
    value: 'sword',
    group: 'sword-shield',
    generation: 'Generation VIII',
    genValue: 'generation-viii',
  },
  {
    label: 'Shield',
    value: 'shield',
    group: 'sword-shield',
    generation: 'Generation VIII',
    genValue: 'generation-viii',
  },
  {
    label: 'Scarlet',
    value: 'scarlet',
    group: 'scarlet-violet',
    generation: 'Generation IX',
    genValue: 'generation-ix',
  },
  {
    label: 'Violet',
    value: 'violet',
    group: 'scarlet-violet',
    generation: 'Generation IX',
    genValue: 'generation-ix',
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
  // {
  //   value: 'generation-ix',
  //   label: 'Generation IX',
  //   gameVersion: 'scarlet',
  // },
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
    return 'generation-viii';
  } else {
    return 'all';
  }
};

const mapVersionToGroup = (currentVersion: string): string =>
  gameVersions.filter(version => version.value === currentVersion).map(version => version.group)[0];

const mapGeneration = (generationValue: string): string =>
  generations
    .filter(gen => gen.value === generationValue)
    .map(generation => generation.label)
    .toString();

const mapGenerationToGame = (value: string): string =>
  generations
    .filter(gen => gen.value === value)
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
