import type { GameGenValue } from '@/helpers';

export const movesByGeneration: { genValue: GameGenValue; offset: number; limit: number }[] = [
  {
    genValue: 'generation-i',
    offset: 0,
    limit: 165,
  },
  {
    genValue: 'generation-ii',
    offset: 165,
    limit: 86,
  },
  {
    genValue: 'generation-iii',
    offset: 251,
    limit: 103,
  },
  {
    genValue: 'generation-iv',
    offset: 354,
    limit: 113,
  },
  {
    genValue: 'generation-v',
    offset: 467,
    limit: 92,
  },
  {
    genValue: 'generation-vi',
    offset: 559,
    limit: 62,
  },
  {
    genValue: 'generation-vii',
    offset: 621,
    limit: 121,
  },
];
