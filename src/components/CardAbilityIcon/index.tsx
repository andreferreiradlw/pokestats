import { ImgHTMLAttributes } from 'react';
// icons
import PokeBody from 'public/static/cardAbilityIcons/pokebody.png';
import Ability from 'public/static/cardAbilityIcons/ability.png';
import PokePower from 'public/static/cardAbilityIcons/pokepower.png';

const abilityTypes = {
  'poké-power': PokePower,
  'poké-body': PokeBody,
  ability: Ability,
};

interface CardIconProps extends ImgHTMLAttributes<HTMLImageElement> {
  cardAbility: string;
}

const CardAbilityIcon = ({ cardAbility, ...rest }: CardIconProps): JSX.Element => {
  console.log('ability', cardAbility.toLowerCase());
  let Icon = abilityTypes[cardAbility.toLowerCase()];

  if (!Icon) return null;

  return <img alt={cardAbility} src={Icon.src} {...rest} />;
};

export default CardAbilityIcon;
