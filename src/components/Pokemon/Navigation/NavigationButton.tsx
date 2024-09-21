// helpers
import { removeDash, formatPokemonId } from '@/helpers';
// animations
import { hoverVariant } from '@/animations';
// components
import { BtnContainer, BtnAnchor, Title, Arrow } from './StyledNavigation';
import { Typography } from '@mui/material';
import ImageNextV2 from '@/components/ImageNextV2';

export interface NavigationButtonProps {
  pokemonName: string;
  pokemonId: number;
  direction: 'left' | 'right';
  handleClick: () => void;
}

const NavigationButton = ({
  pokemonName,
  pokemonId,
  direction,
  handleClick,
}: NavigationButtonProps): JSX.Element => (
  <BtnContainer
    initial="rest"
    whileHover="hover"
    whileTap="tap"
    variants={hoverVariant}
    key={`${direction}-pokemon-${pokemonName}`}
  >
    <BtnAnchor href={`/pokemon/${pokemonName}`} onClick={handleClick} direction={direction}>
      <Arrow direction={direction}>
        <ImageNextV2
          imageUrl={`https://raw.githubusercontent.com/andreferreiradlw/pokestats_media/main/assets/images/${formatPokemonId(
            direction === 'left' ? pokemonId - 1 : pokemonId + 1,
          )}.png`}
          alt={pokemonName}
          customKey={`navigation-${direction}-${pokemonName}`}
          width="100%"
          zIndex={1}
        />
      </Arrow>
      <Title>
        <Typography
          variant="h4"
          component="span"
        >{`#${direction === 'left' ? pokemonId - 1 : pokemonId + 1}`}</Typography>
        <Typography textTransform="capitalize" variant="subtitle2" component="span">
          {removeDash(pokemonName)}
        </Typography>
      </Title>
    </BtnAnchor>
  </BtnContainer>
);

export default NavigationButton;
