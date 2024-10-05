export type GameLabel =
  | 'Red'
  | 'Blue'
  | 'Yellow'
  | 'Gold'
  | 'Silver'
  | 'Crystal'
  | 'Ruby'
  | 'Sapphire'
  | 'Emerald'
  | 'Fire Red'
  | 'Leaf Green'
  | 'Diamond'
  | 'Pearl'
  | 'Platinum'
  | 'Heart Gold'
  | 'Soul Silver'
  | 'Black'
  | 'White'
  | 'Black 2'
  | 'White 2'
  | 'X'
  | 'Y'
  | 'Omega Ruby'
  | 'Alpha Sapphire'
  | 'Sun'
  | 'Moon'
  | 'Ultra Sun'
  | 'Ultra Moon'
  | "Let's Go Pikachu"
  | "Let's Go Eevee"
  | 'Sword'
  | 'Shield'
  | 'Legends: Arceus'
  | 'Scarlet'
  | 'Violet';

// Define types for the `value` property
export type GameValue =
  | 'red'
  | 'blue'
  | 'yellow'
  | 'gold'
  | 'silver'
  | 'crystal'
  | 'ruby'
  | 'sapphire'
  | 'emerald'
  | 'firered'
  | 'leafgreen'
  | 'diamond'
  | 'pearl'
  | 'platinum'
  | 'heartgold'
  | 'soulsilver'
  | 'black'
  | 'white'
  | 'black-2'
  | 'white-2'
  | 'x'
  | 'y'
  | 'omega-ruby'
  | 'alpha-sapphire'
  | 'sun'
  | 'moon'
  | 'ultra-sun'
  | 'ultra-moon'
  | 'lets-go-pikachu'
  | 'lets-go-eevee'
  | 'sword'
  | 'shield'
  | 'legends-arceus'
  | 'scarlet'
  | 'violet';

// Define types for the `group` property
export type GameGroup =
  | 'red-blue'
  | 'yellow'
  | 'gold-silver'
  | 'crystal'
  | 'ruby-sapphire'
  | 'emerald'
  | 'firered-leafgreen'
  | 'diamond-pearl'
  | 'platinum'
  | 'heartgold-soulsilver'
  | 'black-white'
  | 'black-2-white-2'
  | 'x-y'
  | 'omega-ruby-alpha-sapphire'
  | 'sun-moon'
  | 'ultra-sun-ultra-moon'
  | 'lets-go-pikachu-lets-go-eevee'
  | 'sword-shield'
  | 'scarlet-violet';

// Define types for the `generation` property
export type GameGeneration =
  | 'Generation I'
  | 'Generation II'
  | 'Generation III'
  | 'Generation IV'
  | 'Generation V'
  | 'Generation VI'
  | 'Generation VII'
  | 'Generation VIII'
  | 'Generation IX';

// Define types for the `genValue` property
export type GameGenValue =
  | 'generation-i'
  | 'generation-ii'
  | 'generation-iii'
  | 'generation-iv'
  | 'generation-v'
  | 'generation-vi'
  | 'generation-vii'
  | 'generation-viii'
  | 'generation-ix';

// Define types for the `genGroups` and `moveGroups` properties as arrays of `GameGroup`
export type GameGenGroups = GameGroup[];
export type GameMoveGroups = GameGroup[];

export enum MoveLearnMethod {
  LevelUp = 'level-up',
  Egg = 'egg',
  Tutor = 'tutor',
  Machine = 'machine',
  LightBallEgg = 'light-ball-egg',
  FormChange = 'form-change',
  ZygardeCube = 'zygarde-cube',
}

export enum MoveLearnMethodLabel {
  LevelUp = 'Level Up',
  Breeding = 'Breeding',
  Tutor = 'Tutor',
  Machines = 'Machines',
  LightBallEgg = 'Light Ball Egg',
  FormChange = 'Form Change',
  ZygardeCube = 'Zygarde Cube',
}

interface MoveLearnMethodOption {
  value: MoveLearnMethod;
  label: MoveLearnMethodLabel;
}

// Use the defined types in the `Game` interface
export interface Game {
  label: GameLabel;
  value: GameValue;
  group: GameGroup;
  generation: GameGeneration;
  genValue: GameGenValue;
  genGroups: GameGenGroups;
  moveGroups: GameMoveGroups;
  pokedexes: string[];
  moveLearnMethods: MoveLearnMethodOption[];
}

// Define the type for a list of games
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
    pokedexes: ['kanto'],
    moveLearnMethods: [
      {
        value: MoveLearnMethod.LevelUp,
        label: MoveLearnMethodLabel.LevelUp,
      },
      {
        value: MoveLearnMethod.Machine,
        label: MoveLearnMethodLabel.Machines,
      },
    ],
  },
  {
    label: 'Blue',
    value: 'blue',
    group: 'red-blue',
    generation: 'Generation I',
    genValue: 'generation-i',
    genGroups: ['red-blue', 'yellow'],
    moveGroups: ['red-blue', 'yellow'],
    pokedexes: ['kanto'],
    moveLearnMethods: [
      {
        value: MoveLearnMethod.LevelUp,
        label: MoveLearnMethodLabel.LevelUp,
      },
      {
        value: MoveLearnMethod.Machine,
        label: MoveLearnMethodLabel.Machines,
      },
    ],
  },
  {
    label: 'Yellow',
    value: 'yellow',
    group: 'yellow',
    generation: 'Generation I',
    genValue: 'generation-i',
    genGroups: ['red-blue', 'yellow'],
    moveGroups: ['red-blue', 'yellow'],
    pokedexes: ['kanto'],
    moveLearnMethods: [
      {
        value: MoveLearnMethod.LevelUp,
        label: MoveLearnMethodLabel.LevelUp,
      },
      {
        value: MoveLearnMethod.Machine,
        label: MoveLearnMethodLabel.Machines,
      },
    ],
  },
  {
    label: 'Gold',
    value: 'gold',
    group: 'gold-silver',
    generation: 'Generation II',
    genValue: 'generation-ii',
    genGroups: ['gold-silver', 'crystal'],
    moveGroups: ['gold-silver', 'crystal'],
    pokedexes: ['original-johto'],
    moveLearnMethods: [
      {
        value: MoveLearnMethod.LevelUp,
        label: MoveLearnMethodLabel.LevelUp,
      },
      {
        value: MoveLearnMethod.Egg,
        label: MoveLearnMethodLabel.Breeding,
      },
      {
        value: MoveLearnMethod.Machine,
        label: MoveLearnMethodLabel.Machines,
      },
    ],
  },
  {
    label: 'Silver',
    value: 'silver',
    group: 'gold-silver',
    generation: 'Generation II',
    genValue: 'generation-ii',
    genGroups: ['gold-silver', 'crystal'],
    moveGroups: ['gold-silver', 'crystal'],
    pokedexes: ['original-johto'],
    moveLearnMethods: [
      {
        value: MoveLearnMethod.LevelUp,
        label: MoveLearnMethodLabel.LevelUp,
      },
      {
        value: MoveLearnMethod.Egg,
        label: MoveLearnMethodLabel.Breeding,
      },
      {
        value: MoveLearnMethod.Machine,
        label: MoveLearnMethodLabel.Machines,
      },
    ],
  },
  {
    label: 'Crystal',
    value: 'crystal',
    group: 'crystal',
    generation: 'Generation II',
    genValue: 'generation-ii',
    genGroups: ['gold-silver', 'crystal'],
    moveGroups: ['gold-silver', 'crystal'],
    pokedexes: ['original-johto'],
    moveLearnMethods: [
      {
        value: MoveLearnMethod.LevelUp,
        label: MoveLearnMethodLabel.LevelUp,
      },
      {
        value: MoveLearnMethod.Egg,
        label: MoveLearnMethodLabel.Breeding,
      },
      {
        value: MoveLearnMethod.Tutor,
        label: MoveLearnMethodLabel.Tutor,
      },
      {
        value: MoveLearnMethod.Machine,
        label: MoveLearnMethodLabel.Machines,
      },
    ],
  },
  {
    label: 'Ruby',
    value: 'ruby',
    group: 'ruby-sapphire',
    generation: 'Generation III',
    genValue: 'generation-iii',
    genGroups: ['ruby-sapphire', 'emerald'],
    moveGroups: ['ruby-sapphire', 'emerald', 'firered-leafgreen'],
    pokedexes: ['hoenn'],
    moveLearnMethods: [
      {
        value: MoveLearnMethod.LevelUp,
        label: MoveLearnMethodLabel.LevelUp,
      },
      {
        value: MoveLearnMethod.Egg,
        label: MoveLearnMethodLabel.Breeding,
      },
      {
        value: MoveLearnMethod.Machine,
        label: MoveLearnMethodLabel.Machines,
      },
    ],
  },
  {
    label: 'Sapphire',
    value: 'sapphire',
    group: 'ruby-sapphire',
    generation: 'Generation III',
    genValue: 'generation-iii',
    genGroups: ['ruby-sapphire', 'emerald'],
    moveGroups: ['ruby-sapphire', 'emerald', 'firered-leafgreen'],
    pokedexes: ['hoenn'],
    moveLearnMethods: [
      {
        value: MoveLearnMethod.LevelUp,
        label: MoveLearnMethodLabel.LevelUp,
      },
      {
        value: MoveLearnMethod.Egg,
        label: MoveLearnMethodLabel.Breeding,
      },
      {
        value: MoveLearnMethod.Machine,
        label: MoveLearnMethodLabel.Machines,
      },
    ],
  },
  {
    label: 'Emerald',
    value: 'emerald',
    group: 'emerald',
    generation: 'Generation III',
    genValue: 'generation-iii',
    genGroups: ['ruby-sapphire', 'emerald'],
    moveGroups: ['ruby-sapphire', 'emerald', 'firered-leafgreen'],
    pokedexes: ['hoenn'],
    moveLearnMethods: [
      {
        value: MoveLearnMethod.LevelUp,
        label: MoveLearnMethodLabel.LevelUp,
      },
      {
        value: MoveLearnMethod.Egg,
        label: MoveLearnMethodLabel.Breeding,
      },
      {
        value: MoveLearnMethod.Tutor,
        label: MoveLearnMethodLabel.Tutor,
      },
      {
        value: MoveLearnMethod.Machine,
        label: MoveLearnMethodLabel.Machines,
      },
      {
        value: MoveLearnMethod.LightBallEgg,
        label: MoveLearnMethodLabel.LightBallEgg,
      },
    ],
  },
  {
    label: 'Fire Red',
    value: 'firered',
    group: 'firered-leafgreen',
    generation: 'Generation III',
    genValue: 'generation-iii',
    genGroups: ['firered-leafgreen'],
    moveGroups: ['ruby-sapphire', 'emerald', 'firered-leafgreen'],
    pokedexes: ['kanto'],
    moveLearnMethods: [
      {
        value: MoveLearnMethod.LevelUp,
        label: MoveLearnMethodLabel.LevelUp,
      },
      {
        value: MoveLearnMethod.Egg,
        label: MoveLearnMethodLabel.Breeding,
      },
      {
        value: MoveLearnMethod.Tutor,
        label: MoveLearnMethodLabel.Tutor,
      },
      {
        value: MoveLearnMethod.Machine,
        label: MoveLearnMethodLabel.Machines,
      },
    ],
  },
  {
    label: 'Leaf Green',
    value: 'leafgreen',
    group: 'firered-leafgreen',
    generation: 'Generation III',
    genValue: 'generation-iii',
    genGroups: ['firered-leafgreen'],
    moveGroups: ['ruby-sapphire', 'emerald', 'firered-leafgreen'],
    pokedexes: ['kanto'],
    moveLearnMethods: [
      {
        value: MoveLearnMethod.LevelUp,
        label: MoveLearnMethodLabel.LevelUp,
      },
      {
        value: MoveLearnMethod.Egg,
        label: MoveLearnMethodLabel.Breeding,
      },
      {
        value: MoveLearnMethod.Tutor,
        label: MoveLearnMethodLabel.Tutor,
      },
      {
        value: MoveLearnMethod.Machine,
        label: MoveLearnMethodLabel.Machines,
      },
    ],
  },
  {
    label: 'Diamond',
    value: 'diamond',
    group: 'diamond-pearl',
    generation: 'Generation IV',
    genValue: 'generation-iv',
    genGroups: ['diamond-pearl', 'platinum', 'heartgold-soulsilver'],
    moveGroups: ['diamond-pearl', 'platinum', 'heartgold-soulsilver'],
    pokedexes: ['original-sinnoh'],
    moveLearnMethods: [
      {
        value: MoveLearnMethod.LevelUp,
        label: MoveLearnMethodLabel.LevelUp,
      },
      {
        value: MoveLearnMethod.Egg,
        label: MoveLearnMethodLabel.Breeding,
      },
      {
        value: MoveLearnMethod.Tutor,
        label: MoveLearnMethodLabel.Tutor,
      },
      {
        value: MoveLearnMethod.Machine,
        label: MoveLearnMethodLabel.Machines,
      },
      {
        value: MoveLearnMethod.LightBallEgg,
        label: MoveLearnMethodLabel.LightBallEgg,
      },
    ],
  },
  {
    label: 'Pearl',
    value: 'pearl',
    group: 'diamond-pearl',
    generation: 'Generation IV',
    genValue: 'generation-iv',
    genGroups: ['diamond-pearl', 'platinum', 'heartgold-soulsilver'],
    moveGroups: ['diamond-pearl', 'platinum', 'heartgold-soulsilver'],
    pokedexes: ['original-sinnoh'],
    moveLearnMethods: [
      {
        value: MoveLearnMethod.LevelUp,
        label: MoveLearnMethodLabel.LevelUp,
      },
      {
        value: MoveLearnMethod.Egg,
        label: MoveLearnMethodLabel.Breeding,
      },
      {
        value: MoveLearnMethod.Tutor,
        label: MoveLearnMethodLabel.Tutor,
      },
      {
        value: MoveLearnMethod.Machine,
        label: MoveLearnMethodLabel.Machines,
      },
      {
        value: MoveLearnMethod.LightBallEgg,
        label: MoveLearnMethodLabel.LightBallEgg,
      },
    ],
  },
  {
    label: 'Platinum',
    value: 'platinum',
    group: 'platinum',
    generation: 'Generation IV',
    genValue: 'generation-iv',
    genGroups: ['diamond-pearl', 'platinum', 'heartgold-soulsilver'],
    moveGroups: ['diamond-pearl', 'platinum', 'heartgold-soulsilver'],
    pokedexes: ['extended-sinnoh'],
    moveLearnMethods: [
      {
        value: MoveLearnMethod.LevelUp,
        label: MoveLearnMethodLabel.LevelUp,
      },
      {
        value: MoveLearnMethod.Egg,
        label: MoveLearnMethodLabel.Breeding,
      },
      {
        value: MoveLearnMethod.Tutor,
        label: MoveLearnMethodLabel.Tutor,
      },
      {
        value: MoveLearnMethod.Machine,
        label: MoveLearnMethodLabel.Machines,
      },
      {
        value: MoveLearnMethod.LightBallEgg,
        label: MoveLearnMethodLabel.LightBallEgg,
      },
      {
        value: MoveLearnMethod.FormChange,
        label: MoveLearnMethodLabel.FormChange,
      },
    ],
  },
  {
    label: 'Heart Gold',
    value: 'heartgold',
    group: 'heartgold-soulsilver',
    generation: 'Generation IV',
    genValue: 'generation-iv',
    genGroups: ['diamond-pearl', 'platinum', 'heartgold-soulsilver'],
    moveGroups: ['diamond-pearl', 'platinum', 'heartgold-soulsilver'],
    pokedexes: ['updated-johto'],
    moveLearnMethods: [
      {
        value: MoveLearnMethod.LevelUp,
        label: MoveLearnMethodLabel.LevelUp,
      },
      {
        value: MoveLearnMethod.Egg,
        label: MoveLearnMethodLabel.Breeding,
      },
      {
        value: MoveLearnMethod.Tutor,
        label: MoveLearnMethodLabel.Tutor,
      },
      {
        value: MoveLearnMethod.Machine,
        label: MoveLearnMethodLabel.Machines,
      },
      {
        value: MoveLearnMethod.LightBallEgg,
        label: MoveLearnMethodLabel.LightBallEgg,
      },
      {
        value: MoveLearnMethod.FormChange,
        label: MoveLearnMethodLabel.FormChange,
      },
    ],
  },
  {
    label: 'Soul Silver',
    value: 'soulsilver',
    group: 'heartgold-soulsilver',
    generation: 'Generation IV',
    genValue: 'generation-iv',
    genGroups: ['diamond-pearl', 'platinum', 'heartgold-soulsilver'],
    moveGroups: ['diamond-pearl', 'platinum', 'heartgold-soulsilver'],
    pokedexes: ['updated-johto'],
    moveLearnMethods: [
      {
        value: MoveLearnMethod.LevelUp,
        label: MoveLearnMethodLabel.LevelUp,
      },
      {
        value: MoveLearnMethod.Egg,
        label: MoveLearnMethodLabel.Breeding,
      },
      {
        value: MoveLearnMethod.Tutor,
        label: MoveLearnMethodLabel.Tutor,
      },
      {
        value: MoveLearnMethod.Machine,
        label: MoveLearnMethodLabel.Machines,
      },
      {
        value: MoveLearnMethod.LightBallEgg,
        label: MoveLearnMethodLabel.LightBallEgg,
      },
      {
        value: MoveLearnMethod.FormChange,
        label: MoveLearnMethodLabel.FormChange,
      },
    ],
  },
  {
    label: 'Black',
    value: 'black',
    group: 'black-white',
    generation: 'Generation V',
    genValue: 'generation-v',
    genGroups: ['black-white', 'black-2-white-2'],
    moveGroups: ['black-white', 'black-2-white-2'],
    pokedexes: ['original-unova'],
    moveLearnMethods: [
      {
        value: MoveLearnMethod.LevelUp,
        label: MoveLearnMethodLabel.LevelUp,
      },
      {
        value: MoveLearnMethod.Egg,
        label: MoveLearnMethodLabel.Breeding,
      },
      {
        value: MoveLearnMethod.Tutor,
        label: MoveLearnMethodLabel.Tutor,
      },
      {
        value: MoveLearnMethod.Machine,
        label: MoveLearnMethodLabel.Machines,
      },
      {
        value: MoveLearnMethod.LightBallEgg,
        label: MoveLearnMethodLabel.LightBallEgg,
      },
      {
        value: MoveLearnMethod.FormChange,
        label: MoveLearnMethodLabel.FormChange,
      },
    ],
  },
  {
    label: 'White',
    value: 'white',
    group: 'black-white',
    generation: 'Generation V',
    genValue: 'generation-v',
    genGroups: ['black-white', 'black-2-white-2'],
    moveGroups: ['black-white', 'black-2-white-2'],
    pokedexes: ['original-unova'],
    moveLearnMethods: [
      {
        value: MoveLearnMethod.LevelUp,
        label: MoveLearnMethodLabel.LevelUp,
      },
      {
        value: MoveLearnMethod.Egg,
        label: MoveLearnMethodLabel.Breeding,
      },
      {
        value: MoveLearnMethod.Tutor,
        label: MoveLearnMethodLabel.Tutor,
      },
      {
        value: MoveLearnMethod.Machine,
        label: MoveLearnMethodLabel.Machines,
      },
      {
        value: MoveLearnMethod.LightBallEgg,
        label: MoveLearnMethodLabel.LightBallEgg,
      },
      {
        value: MoveLearnMethod.FormChange,
        label: MoveLearnMethodLabel.FormChange,
      },
    ],
  },
  {
    label: 'Black 2',
    value: 'black-2',
    group: 'black-2-white-2',
    generation: 'Generation V',
    genValue: 'generation-v',
    genGroups: ['black-white', 'black-2-white-2'],
    moveGroups: ['black-white', 'black-2-white-2'],
    pokedexes: ['updated-unova'],
    moveLearnMethods: [
      {
        value: MoveLearnMethod.LevelUp,
        label: MoveLearnMethodLabel.LevelUp,
      },
      {
        value: MoveLearnMethod.Egg,
        label: MoveLearnMethodLabel.Breeding,
      },
      {
        value: MoveLearnMethod.Tutor,
        label: MoveLearnMethodLabel.Tutor,
      },
      {
        value: MoveLearnMethod.Machine,
        label: MoveLearnMethodLabel.Machines,
      },
      {
        value: MoveLearnMethod.LightBallEgg,
        label: MoveLearnMethodLabel.LightBallEgg,
      },
      {
        value: MoveLearnMethod.FormChange,
        label: MoveLearnMethodLabel.FormChange,
      },
    ],
  },
  {
    label: 'White 2',
    value: 'white-2',
    group: 'black-2-white-2',
    generation: 'Generation V',
    genValue: 'generation-v',
    genGroups: ['black-white', 'black-2-white-2'],
    moveGroups: ['black-white', 'black-2-white-2'],
    pokedexes: ['updated-unova'],
    moveLearnMethods: [
      {
        value: MoveLearnMethod.LevelUp,
        label: MoveLearnMethodLabel.LevelUp,
      },
      {
        value: MoveLearnMethod.Egg,
        label: MoveLearnMethodLabel.Breeding,
      },
      {
        value: MoveLearnMethod.Tutor,
        label: MoveLearnMethodLabel.Tutor,
      },
      {
        value: MoveLearnMethod.Machine,
        label: MoveLearnMethodLabel.Machines,
      },
      {
        value: MoveLearnMethod.LightBallEgg,
        label: MoveLearnMethodLabel.LightBallEgg,
      },
      {
        value: MoveLearnMethod.FormChange,
        label: MoveLearnMethodLabel.FormChange,
      },
    ],
  },
  {
    label: 'X',
    value: 'x',
    group: 'x-y',
    generation: 'Generation VI',
    genValue: 'generation-vi',
    genGroups: ['x-y', 'omega-ruby-alpha-sapphire'],
    moveGroups: ['x-y', 'omega-ruby-alpha-sapphire'],
    pokedexes: ['kalos-central', 'kalos-coastal', 'kalos-mountain'],
    moveLearnMethods: [
      {
        value: MoveLearnMethod.LevelUp,
        label: MoveLearnMethodLabel.LevelUp,
      },
      {
        value: MoveLearnMethod.Egg,
        label: MoveLearnMethodLabel.Breeding,
      },
      {
        value: MoveLearnMethod.Tutor,
        label: MoveLearnMethodLabel.Tutor,
      },
      {
        value: MoveLearnMethod.Machine,
        label: MoveLearnMethodLabel.Machines,
      },
      {
        value: MoveLearnMethod.LightBallEgg,
        label: MoveLearnMethodLabel.LightBallEgg,
      },
      {
        value: MoveLearnMethod.FormChange,
        label: MoveLearnMethodLabel.FormChange,
      },
    ],
  },
  {
    label: 'Y',
    value: 'y',
    group: 'x-y',
    generation: 'Generation VI',
    genValue: 'generation-vi',
    genGroups: ['x-y', 'omega-ruby-alpha-sapphire'],
    moveGroups: ['x-y', 'omega-ruby-alpha-sapphire'],
    pokedexes: ['kalos-central', 'kalos-coastal', 'kalos-mountain'],
    moveLearnMethods: [
      {
        value: MoveLearnMethod.LevelUp,
        label: MoveLearnMethodLabel.LevelUp,
      },
      {
        value: MoveLearnMethod.Egg,
        label: MoveLearnMethodLabel.Breeding,
      },
      {
        value: MoveLearnMethod.Tutor,
        label: MoveLearnMethodLabel.Tutor,
      },
      {
        value: MoveLearnMethod.Machine,
        label: MoveLearnMethodLabel.Machines,
      },
      {
        value: MoveLearnMethod.LightBallEgg,
        label: MoveLearnMethodLabel.LightBallEgg,
      },
      {
        value: MoveLearnMethod.FormChange,
        label: MoveLearnMethodLabel.FormChange,
      },
    ],
  },
  {
    label: 'Omega Ruby',
    value: 'omega-ruby',
    group: 'omega-ruby-alpha-sapphire',
    generation: 'Generation VI',
    genValue: 'generation-vi',
    genGroups: ['x-y', 'omega-ruby-alpha-sapphire'],
    moveGroups: ['x-y', 'omega-ruby-alpha-sapphire'],
    pokedexes: ['updated-hoenn'],
    moveLearnMethods: [
      {
        value: MoveLearnMethod.LevelUp,
        label: MoveLearnMethodLabel.LevelUp,
      },
      {
        value: MoveLearnMethod.Egg,
        label: MoveLearnMethodLabel.Breeding,
      },
      {
        value: MoveLearnMethod.Tutor,
        label: MoveLearnMethodLabel.Tutor,
      },
      {
        value: MoveLearnMethod.Machine,
        label: MoveLearnMethodLabel.Machines,
      },
      {
        value: MoveLearnMethod.LightBallEgg,
        label: MoveLearnMethodLabel.LightBallEgg,
      },
      {
        value: MoveLearnMethod.FormChange,
        label: MoveLearnMethodLabel.FormChange,
      },
    ],
  },
  {
    label: 'Alpha Sapphire',
    value: 'alpha-sapphire',
    group: 'omega-ruby-alpha-sapphire',
    generation: 'Generation VI',
    genValue: 'generation-vi',
    genGroups: ['x-y', 'omega-ruby-alpha-sapphire'],
    moveGroups: ['x-y', 'omega-ruby-alpha-sapphire'],
    pokedexes: ['updated-hoenn'],
    moveLearnMethods: [
      {
        value: MoveLearnMethod.LevelUp,
        label: MoveLearnMethodLabel.LevelUp,
      },
      {
        value: MoveLearnMethod.Egg,
        label: MoveLearnMethodLabel.Breeding,
      },
      {
        value: MoveLearnMethod.Tutor,
        label: MoveLearnMethodLabel.Tutor,
      },
      {
        value: MoveLearnMethod.Machine,
        label: MoveLearnMethodLabel.Machines,
      },
      {
        value: MoveLearnMethod.LightBallEgg,
        label: MoveLearnMethodLabel.LightBallEgg,
      },
      {
        value: MoveLearnMethod.FormChange,
        label: MoveLearnMethodLabel.FormChange,
      },
    ],
  },
  {
    label: 'Sun',
    value: 'sun',
    group: 'sun-moon',
    generation: 'Generation VII',
    genValue: 'generation-vii',
    genGroups: ['sun-moon', 'ultra-sun-ultra-moon', 'lets-go-pikachu-lets-go-eevee'],
    moveGroups: ['sun-moon', 'ultra-sun-ultra-moon'],
    pokedexes: ['original-alola'],
    moveLearnMethods: [
      {
        value: MoveLearnMethod.LevelUp,
        label: MoveLearnMethodLabel.LevelUp,
      },
      {
        value: MoveLearnMethod.Egg,
        label: MoveLearnMethodLabel.Breeding,
      },
      {
        value: MoveLearnMethod.Tutor,
        label: MoveLearnMethodLabel.Tutor,
      },
      {
        value: MoveLearnMethod.Machine,
        label: MoveLearnMethodLabel.Machines,
      },
      {
        value: MoveLearnMethod.LightBallEgg,
        label: MoveLearnMethodLabel.LightBallEgg,
      },
      {
        value: MoveLearnMethod.FormChange,
        label: MoveLearnMethodLabel.FormChange,
      },
      {
        value: MoveLearnMethod.ZygardeCube,
        label: MoveLearnMethodLabel.ZygardeCube,
      },
    ],
  },
  {
    label: 'Moon',
    value: 'moon',
    group: 'sun-moon',
    generation: 'Generation VII',
    genValue: 'generation-vii',
    genGroups: ['sun-moon', 'ultra-sun-ultra-moon', 'lets-go-pikachu-lets-go-eevee'],
    moveGroups: ['sun-moon', 'ultra-sun-ultra-moon'],
    pokedexes: ['original-alola'],
    moveLearnMethods: [
      {
        value: MoveLearnMethod.LevelUp,
        label: MoveLearnMethodLabel.LevelUp,
      },
      {
        value: MoveLearnMethod.Egg,
        label: MoveLearnMethodLabel.Breeding,
      },
      {
        value: MoveLearnMethod.Tutor,
        label: MoveLearnMethodLabel.Tutor,
      },
      {
        value: MoveLearnMethod.Machine,
        label: MoveLearnMethodLabel.Machines,
      },
      {
        value: MoveLearnMethod.LightBallEgg,
        label: MoveLearnMethodLabel.LightBallEgg,
      },
      {
        value: MoveLearnMethod.FormChange,
        label: MoveLearnMethodLabel.FormChange,
      },
      {
        value: MoveLearnMethod.ZygardeCube,
        label: MoveLearnMethodLabel.ZygardeCube,
      },
    ],
  },
  {
    label: 'Ultra Sun',
    value: 'ultra-sun',
    group: 'ultra-sun-ultra-moon',
    generation: 'Generation VII',
    genValue: 'generation-vii',
    genGroups: ['sun-moon', 'ultra-sun-ultra-moon', 'lets-go-pikachu-lets-go-eevee'],
    moveGroups: ['sun-moon', 'ultra-sun-ultra-moon'],
    pokedexes: ['updated-alola'],
    moveLearnMethods: [
      {
        value: MoveLearnMethod.LevelUp,
        label: MoveLearnMethodLabel.LevelUp,
      },
      {
        value: MoveLearnMethod.Egg,
        label: MoveLearnMethodLabel.Breeding,
      },
      {
        value: MoveLearnMethod.Tutor,
        label: MoveLearnMethodLabel.Tutor,
      },
      {
        value: MoveLearnMethod.Machine,
        label: MoveLearnMethodLabel.Machines,
      },
      {
        value: MoveLearnMethod.LightBallEgg,
        label: MoveLearnMethodLabel.LightBallEgg,
      },
      {
        value: MoveLearnMethod.FormChange,
        label: MoveLearnMethodLabel.FormChange,
      },
      {
        value: MoveLearnMethod.ZygardeCube,
        label: MoveLearnMethodLabel.ZygardeCube,
      },
    ],
  },
  {
    label: 'Ultra Moon',
    value: 'ultra-moon',
    group: 'ultra-sun-ultra-moon',
    generation: 'Generation VII',
    genValue: 'generation-vii',
    genGroups: ['sun-moon', 'ultra-sun-ultra-moon', 'lets-go-pikachu-lets-go-eevee'],
    moveGroups: ['sun-moon', 'ultra-sun-ultra-moon'],
    pokedexes: ['updated-alola'],
    moveLearnMethods: [
      {
        value: MoveLearnMethod.LevelUp,
        label: MoveLearnMethodLabel.LevelUp,
      },
      {
        value: MoveLearnMethod.Egg,
        label: MoveLearnMethodLabel.Breeding,
      },
      {
        value: MoveLearnMethod.Tutor,
        label: MoveLearnMethodLabel.Tutor,
      },
      {
        value: MoveLearnMethod.Machine,
        label: MoveLearnMethodLabel.Machines,
      },
      {
        value: MoveLearnMethod.LightBallEgg,
        label: MoveLearnMethodLabel.LightBallEgg,
      },
      {
        value: MoveLearnMethod.FormChange,
        label: MoveLearnMethodLabel.FormChange,
      },
      {
        value: MoveLearnMethod.ZygardeCube,
        label: MoveLearnMethodLabel.ZygardeCube,
      },
    ],
  },
  {
    label: "Let's Go Pikachu",
    value: 'lets-go-pikachu',
    group: 'lets-go-pikachu-lets-go-eevee',
    generation: 'Generation VII',
    genValue: 'generation-vii',
    genGroups: ['sun-moon', 'ultra-sun-ultra-moon', 'lets-go-pikachu-lets-go-eevee'],
    moveGroups: ['lets-go-pikachu-lets-go-eevee'],
    pokedexes: ['lets-go-kanto'],
    moveLearnMethods: [
      {
        value: MoveLearnMethod.LevelUp,
        label: MoveLearnMethodLabel.LevelUp,
      },
      {
        value: MoveLearnMethod.Tutor,
        label: MoveLearnMethodLabel.Tutor,
      },
      {
        value: MoveLearnMethod.Machine,
        label: MoveLearnMethodLabel.Machines,
      },
    ],
  },
  {
    label: "Let's Go Eevee",
    value: 'lets-go-eevee',
    group: 'lets-go-pikachu-lets-go-eevee',
    generation: 'Generation VII',
    genValue: 'generation-vii',
    genGroups: ['sun-moon', 'ultra-sun-ultra-moon', 'lets-go-pikachu-lets-go-eevee'],
    moveGroups: ['lets-go-pikachu-lets-go-eevee'],
    pokedexes: ['lets-go-kanto'],
    moveLearnMethods: [
      {
        value: MoveLearnMethod.LevelUp,
        label: MoveLearnMethodLabel.LevelUp,
      },
      {
        value: MoveLearnMethod.Tutor,
        label: MoveLearnMethodLabel.Tutor,
      },
      {
        value: MoveLearnMethod.Machine,
        label: MoveLearnMethodLabel.Machines,
      },
    ],
  },
  {
    label: 'Sword',
    value: 'sword',
    group: 'sword-shield',
    generation: 'Generation VIII',
    genValue: 'generation-viii',
    genGroups: ['sword-shield'],
    moveGroups: ['sword-shield'],
    pokedexes: ['galar'],
    moveLearnMethods: [
      {
        value: MoveLearnMethod.LevelUp,
        label: MoveLearnMethodLabel.LevelUp,
      },
      {
        value: MoveLearnMethod.Egg,
        label: MoveLearnMethodLabel.Breeding,
      },
      {
        value: MoveLearnMethod.Tutor,
        label: MoveLearnMethodLabel.Tutor,
      },
      {
        value: MoveLearnMethod.Machine,
        label: MoveLearnMethodLabel.Machines,
      },
      {
        value: MoveLearnMethod.FormChange,
        label: MoveLearnMethodLabel.FormChange,
      },
    ],
  },
  {
    label: 'Shield',
    value: 'shield',
    group: 'sword-shield',
    generation: 'Generation VIII',
    genValue: 'generation-viii',
    genGroups: ['sword-shield'],
    moveGroups: ['sword-shield'],
    pokedexes: ['galar'],
    moveLearnMethods: [
      {
        value: MoveLearnMethod.LevelUp,
        label: MoveLearnMethodLabel.LevelUp,
      },
      {
        value: MoveLearnMethod.Egg,
        label: MoveLearnMethodLabel.Breeding,
      },
      {
        value: MoveLearnMethod.Tutor,
        label: MoveLearnMethodLabel.Tutor,
      },
      {
        value: MoveLearnMethod.Machine,
        label: MoveLearnMethodLabel.Machines,
      },
      {
        value: MoveLearnMethod.FormChange,
        label: MoveLearnMethodLabel.FormChange,
      },
    ],
  },
  {
    label: 'Legends: Arceus',
    value: 'legends-arceus',
    group: 'scarlet-violet',
    generation: 'Generation VIII',
    genValue: 'generation-viii',
    genGroups: ['scarlet-violet'],
    moveGroups: ['scarlet-violet'],
    pokedexes: ['hisui'],
    moveLearnMethods: [
      {
        value: MoveLearnMethod.LevelUp,
        label: MoveLearnMethodLabel.LevelUp,
      },
      {
        value: MoveLearnMethod.Tutor,
        label: MoveLearnMethodLabel.Tutor,
      },
      {
        value: MoveLearnMethod.Machine,
        label: MoveLearnMethodLabel.Machines,
      },
    ],
  },
  {
    label: 'Scarlet',
    value: 'scarlet',
    group: 'scarlet-violet',
    generation: 'Generation IX',
    genValue: 'generation-ix',
    genGroups: ['scarlet-violet'],
    moveGroups: ['scarlet-violet'],
    pokedexes: ['paldea'],
    moveLearnMethods: [
      {
        value: MoveLearnMethod.LevelUp,
        label: MoveLearnMethodLabel.LevelUp,
      },
      {
        value: MoveLearnMethod.Tutor,
        label: MoveLearnMethodLabel.Tutor,
      },
      {
        value: MoveLearnMethod.Machine,
        label: MoveLearnMethodLabel.Machines,
      },
    ],
  },
  {
    label: 'Violet',
    value: 'violet',
    group: 'scarlet-violet',
    generation: 'Generation IX',
    genValue: 'generation-ix',
    genGroups: ['scarlet-violet'],
    moveGroups: ['scarlet-violet'],
    pokedexes: ['paldea'],
    moveLearnMethods: [
      {
        value: MoveLearnMethod.LevelUp,
        label: MoveLearnMethodLabel.LevelUp,
      },
      {
        value: MoveLearnMethod.Tutor,
        label: MoveLearnMethodLabel.Tutor,
      },
      {
        value: MoveLearnMethod.Machine,
        label: MoveLearnMethodLabel.Machines,
      },
    ],
  },
];

export interface GenerationOption {
  value: 'all' | GameGenValue;
  label: string;
}

const generationOptions: GenerationOption[] = [
  { value: 'all', label: 'All' },
  { value: 'generation-i', label: 'Generation I' },
  { value: 'generation-ii', label: 'Generation II' },
  { value: 'generation-iii', label: 'Generation III' },
  { value: 'generation-iv', label: 'Generation IV' },
  { value: 'generation-v', label: 'Generation V' },
  { value: 'generation-vi', label: 'Generation VI' },
  { value: 'generation-vii', label: 'Generation VII' },
  { value: 'generation-viii', label: 'Generation VIII' },
  { value: 'generation-ix', label: 'Generation IX' },
];

interface GenerationEntry {
  value: GameGenValue;
  label: GameGeneration;
  gameVersion: GameValue;
}

const generations: GenerationEntry[] = [
  { value: 'generation-i', label: 'Generation I', gameVersion: 'yellow' },
  { value: 'generation-ii', label: 'Generation II', gameVersion: 'crystal' },
  { value: 'generation-iii', label: 'Generation III', gameVersion: 'leafgreen' },
  { value: 'generation-iv', label: 'Generation IV', gameVersion: 'soulsilver' },
  { value: 'generation-v', label: 'Generation V', gameVersion: 'black' },
  { value: 'generation-vi', label: 'Generation VI', gameVersion: 'alpha-sapphire' },
  { value: 'generation-vii', label: 'Generation VII', gameVersion: 'sun' },
  { value: 'generation-viii', label: 'Generation VIII', gameVersion: 'sword' },
  { value: 'generation-viii', label: 'Generation VIII', gameVersion: 'legends-arceus' },
  { value: 'generation-ix', label: 'Generation IX', gameVersion: 'scarlet' },
];

// Function to map an ID to its generation
const mapIdToGeneration = (id: number): GameGenValue | 'all' => {
  if (id <= 151) return 'generation-i';
  if (id > 151 && id <= 251) return 'generation-ii';
  if (id > 251 && id <= 386) return 'generation-iii';
  if (id > 386 && id <= 493) return 'generation-iv';
  if (id > 493 && id <= 649) return 'generation-v';
  if (id > 649 && id <= 721) return 'generation-vi';
  if (id > 721 && id <= 809) return 'generation-vii';
  if (id > 809 && id <= 905) return 'generation-viii';
  if (id > 905 && id <= 1025) return 'generation-ix';
  return 'all';
};

// Function to map a version to its group
const mapVersionToGroup = (currentVersion: GameValue): GameGroup =>
  gameVersions.find(version => version.value === currentVersion)?.group as GameGroup;

// Function to map a generation value to its label
const mapGeneration = (generationValue: GameGenValue): string =>
  generationValue ? (generations.find(gen => gen.value === generationValue)?.label ?? '') : '';

// Function to map a group to its generation
const mapGroupToGeneration = (groupName: GameGroup): GameGeneration | undefined =>
  gameVersions.find(version => version.group === groupName)?.generation;

// Function to map a game value to its generation value
const mapGameValueToGenerationValue = (gameValue: GameValue): GameGenValue | undefined =>
  gameVersions.find(({ value }) => value === gameValue)?.genValue;

// Function to list games by group
const listGamesByGroup = (group: GameGroup): GameLabel[] =>
  gameVersions.filter(game => game.group === group).map(currGame => currGame.label);

// Function to list games by generation
const listGamesByGeneration = (generation: GameGenValue): GameValue[] =>
  gameVersions.filter(game => game.genValue === generation).map(currGame => currGame.value);

// Function to list gen groups by group
const listGenGroupsByGroup = (genGroup: GameGroup): GameGenGroups | undefined =>
  gameVersions.find(version => version.group === genGroup)?.genGroups;

// Function to list move groups by group
const listMoveGroupsByGroup = (moveGroup: GameGroup): GameMoveGroups | undefined =>
  gameVersions.find(version => version.group === moveGroup)?.moveGroups;

export {
  gameVersions,
  generationOptions,
  generations,
  mapIdToGeneration,
  mapVersionToGroup,
  mapGeneration,
  mapGroupToGeneration,
  mapGameValueToGenerationValue,
  listGamesByGroup,
  listGamesByGeneration,
  listGenGroupsByGroup,
  listMoveGroupsByGroup,
};
