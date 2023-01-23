// types
import type { BoxProps } from '@/components/Box';
import type { PokemonSpecies, EvolutionDetail } from 'pokenode-ts';
// helpers
import { fadeInUpVariant, findEnglishName } from '@/helpers';
import { EvolutionContainer, EvoDetailsContainer, EvoArrow } from './StyledEvolution';
// components
import PokemonBox from '@/components/PokemonBox';
import EvolutionDetails from './EvolutionDetails';

export interface EvolutionProps extends BoxProps {
  noArrow?: boolean;
  species: PokemonSpecies;
  evolutionDetails?: EvolutionDetail[];
}

const Evolution = ({
  noArrow = false,
  species,
  evolutionDetails,
  ...rest
}: EvolutionProps): JSX.Element => {
  // data
  const { id, name, generation, varieties, names } = species;

  const pokemonName = findEnglishName(names);

  return (
    <EvolutionContainer
      flexdirection="column"
      flexalign="center"
      flexjustify="space-between"
      flexgap="1em"
      initial="hidden"
      animate="show"
      variants={fadeInUpVariant}
      key={`evo-details-container-${name}`}
      {...rest}
    >
      {!noArrow && (
        <EvoDetailsContainer width="auto" flexgap="1em" flexjustify="space-between">
          {/* <EvoArrow /> */}
          <EvolutionDetails details={evolutionDetails} />
          <EvoArrow />
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
