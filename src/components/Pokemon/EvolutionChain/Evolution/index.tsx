// types
import type { PokemonSpecies, EvolutionDetail } from 'pokenode-ts';
// helpers
import { findEnglishName } from '@/helpers';
import { fadeInUpVariant } from '@/animations';
import { EvolutionContainer, EvoDetailsContainer, EvoArrow } from './StyledEvolution';
// components
import PokemonBox from '@/components/PokemonBox';
import EvolutionDetails from '../EvolutionDetails';
import type { HTMLMotionProps } from 'framer-motion';

export interface EvolutionProps extends HTMLMotionProps<'div'> {
  noArrow?: boolean;
  species?: PokemonSpecies;
  evolutionDetails?: EvolutionDetail[];
}

const Evolution = ({
  noArrow = false,
  species,
  evolutionDetails,
  ...rest
}: EvolutionProps): JSX.Element | null => {
  if (!species) return null;
  // data
  const { id, name, generation, varieties, names } = species;

  const pokemonName = findEnglishName(names) || '';

  return (
    <EvolutionContainer
      initial="hidden"
      animate="show"
      variants={fadeInUpVariant}
      key={`evo-details-container-${name}`}
      {...rest}
    >
      {!noArrow && (
        <EvoDetailsContainer>
          <EvolutionDetails details={evolutionDetails} />
          <EvoArrow fontSize="large" className="evo-arrow" />
        </EvoDetailsContainer>
      )}
      <PokemonBox
        pokemonId={id}
        pokemonGen={generation?.name}
        nameFormat={false}
        pokemonName={pokemonName}
        defaultVarietyName={varieties[0].pokemon.name}
      />
    </EvolutionContainer>
  );
};

export default Evolution;
