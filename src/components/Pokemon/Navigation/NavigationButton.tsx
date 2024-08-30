// helpers
import { removeDash, prefixId } from '@/helpers';
// animations
import { hoverVariant } from '@/animations';
// components
import { BtnContainer, BtnAnchor, Title, Arrow, PokemonID, PokemonName } from './StyledNavigation';
import ImageNext from '@/components/ImageNext';

export interface NavigationButtonProps {
  pokemonName: string;
  pokemonId: number;
  direction: 'left' | 'right';
  handleClick: () => void;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
  pokemonName,
  pokemonId,
  direction,
  handleClick,
}) => (
  <BtnContainer
    whileHover="hover"
    whileTap="tap"
    variants={hoverVariant}
    key={`${direction}-pokemon-${pokemonName}`}
  >
    <BtnAnchor href={`/pokemon/${pokemonName}`} onClick={handleClick} direction={direction}>
      <Arrow direction={direction}>
        <ImageNext
          src={`https://raw.githubusercontent.com/andreferreiradlw/pokestats_media/main/assets/images/${prefixId(
            direction === 'left' ? pokemonId - 1 : pokemonId + 1,
          )}.png`}
          alt={pokemonName}
          key={`navigation-${direction}-${pokemonName}`}
          width="100"
        />
      </Arrow>
      <Title>
        <PokemonID>{`#${direction === 'left' ? pokemonId - 1 : pokemonId + 1}`}</PokemonID>
        <PokemonName>{removeDash(pokemonName)}</PokemonName>
      </Title>
    </BtnAnchor>
  </BtnContainer>
);

export default NavigationButton;
