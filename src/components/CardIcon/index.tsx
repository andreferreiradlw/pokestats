import { ImgHTMLAttributes } from 'react';
// icons
import Colorless from 'public/static/energyIcons/colorless.png';
import Dark from 'public/static/energyIcons/dark.png';
import Dragon from 'public/static/energyIcons/dragon.png';
import Electric from 'public/static/energyIcons/electric.png';
import Fairy from 'public/static/energyIcons/fairy.png';
import Fighting from 'public/static/energyIcons/fighting.png';
import Fire from 'public/static/energyIcons/fire.png';
import Grass from 'public/static/energyIcons/grass.png';
import Metal from 'public/static/energyIcons/metal.png';
import Psychic from 'public/static/energyIcons/psychic.png';
import Water from 'public/static/energyIcons/water.png';

const energyTypes = {
  colorless: Colorless,
  darkness: Dark,
  dragon: Dragon,
  lightning: Electric,
  fairy: Fairy,
  fighting: Fighting,
  fire: Fire,
  grass: Grass,
  metal: Metal,
  psychic: Psychic,
  water: Water,
};

interface CardIconProps extends ImgHTMLAttributes<HTMLImageElement> {
  cardType: string;
}

const CardIcon = ({ cardType, ...rest }: CardIconProps): JSX.Element => {
  let Icon = energyTypes[cardType.toLowerCase()];

  if (!Icon) return null;

  return <img alt="" src={Icon.src} {...rest} />;
};

export default CardIcon;
