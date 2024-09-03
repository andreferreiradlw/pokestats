import { Theme } from '@mui/material';
import dynamic from 'next/dynamic';

// icons
const Bug = dynamic(() => import('public/static/typeIcons/bug.svg'));
const Dark = dynamic(() => import('public/static/typeIcons/dark.svg'));
const Dragon = dynamic(() => import('public/static/typeIcons/dragon.svg'));
const Electric = dynamic(() => import('public/static/typeIcons/electric.svg'));
const Fairy = dynamic(() => import('public/static/typeIcons/fairy.svg'));
const Fighting = dynamic(() => import('public/static/typeIcons/fighting.svg'));
const Fire = dynamic(() => import('public/static/typeIcons/fire.svg'));
const Flying = dynamic(() => import('public/static/typeIcons/flying.svg'));
const Ghost = dynamic(() => import('public/static/typeIcons/ghost.svg'));
const Grass = dynamic(() => import('public/static/typeIcons/grass.svg'));
const Ground = dynamic(() => import('public/static/typeIcons/ground.svg'));
const Ice = dynamic(() => import('public/static/typeIcons/ice.svg'));
const Normal = dynamic(() => import('public/static/typeIcons/normal.svg'));
const Poison = dynamic(() => import('public/static/typeIcons/poison.svg'));
const Psychic = dynamic(() => import('public/static/typeIcons/psychic.svg'));
const Rock = dynamic(() => import('public/static/typeIcons/rock.svg'));
const Shadow = dynamic(() => import('public/static/typeIcons/shadow.svg'));
const Steel = dynamic(() => import('public/static/typeIcons/steel.svg'));
const Unknown = dynamic(() => import('public/static/typeIcons/unknown.svg'));
const Water = dynamic(() => import('public/static/typeIcons/water.svg'));

const iconTypes = {
  bug: Bug,
  dark: Dark,
  dragon: Dragon,
  electric: Electric,
  fairy: Fairy,
  fighting: Fighting,
  fire: Fire,
  flying: Flying,
  ghost: Ghost,
  grass: Grass,
  ground: Ground,
  ice: Ice,
  normal: Normal,
  poison: Poison,
  psychic: Psychic,
  rock: Rock,
  shadow: Shadow,
  steel: Steel,
  unknown: Unknown,
  water: Water,
};

interface TypeIconProps {
  type: keyof Theme['palette']['types'];
}

const TypeIcon = ({ type, ...rest }: TypeIconProps): JSX.Element | null => {
  const Icon = iconTypes[type];

  if (!Icon) return null;

  return <Icon {...rest} />;
};

export default TypeIcon;
