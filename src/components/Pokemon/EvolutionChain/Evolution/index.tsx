// types
import type { BoxProps } from '@/components/Box';
import type { PokemonSpecies, EvolutionDetail } from 'pokenode-ts';
// helpers
import { fadeInUpVariant } from '@/helpers';
import { EvoArrow } from './StyledEvolution';
// components
import Box from '@/components/Box';
import BoxWrapper from '@/components/Box/StyledBox';
import PokemonBox from '@/components/PokemonBox';
import EvolutionDetails from './EvolutionDetails';

interface EvolutionProps extends BoxProps {
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
  const { id, name, generation } = species;

  return (
    <BoxWrapper
      flexdirection={{ xxs: 'column', lg: 'row' }}
      flexalign="center"
      flexgap="1em"
      width={{ xxs: 'auto', lg: '100%' }}
      initial="hidden"
      animate="show"
      variants={fadeInUpVariant}
      key={`evo-details-container-${name}`}
      {...rest}
    >
      {/** Arrow with evolution details */}
      {!noArrow && (
        <Box
          width="auto"
          $flexgrow
          flexdirection={{ xxs: 'column', lg: 'row' }}
          flexgap="1em"
          flexwrap="nowrap"
          flexjustify="center"
          flexalign="center"
        >
          <EvoArrow />
          <EvolutionDetails details={evolutionDetails} />

          {/* {evolutionDetails?.map((currDetails, i) => (
              <EvolutionDetails key={`evo-details-${i}`} details={currDetails} />
            ))} */}

          <EvoArrow />
        </Box>
      )}
      {/** Pokemon box with image and types */}
      <PokemonBox pokemonId={id} pokemonName={name} pokemonGen={generation?.name} />
    </BoxWrapper>
  );
};

export default Evolution;
