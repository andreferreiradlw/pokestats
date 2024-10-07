import { useMemo } from 'react';
// types
import type { PokemonSpecies, EvolutionDetail } from 'pokenode-ts';
import type { HTMLMotionProps } from '@/client';
// helpers
import { findEnglishName, removeDash } from '@/helpers';
import { fadeInUpVariant } from '@/animations';
// components
import PokemonBox from '@/components/PokemonBox';
import EvolutionDetails from '../EvolutionDetails';
import { EvolutionContainer, EvoDetailsContainer, EvoArrow } from './StyledEvolution';

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
  const pokemonName = useMemo(
    () => (species && findEnglishName(species?.names)) || removeDash(species?.name),
    [species],
  );

  if (!species) return null;

  // data
  const { id, name, generation, varieties } = species;

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
