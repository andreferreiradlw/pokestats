import { useMemo } from 'react';
// types
import type { BoxProps } from '@/components/Box';
import type { PokemonSpecies, EvolutionDetail } from 'pokenode-ts';
// helpers
import { removeDash, mapGeneration, fadeInUpVariant } from '@/helpers';
// components
import Link from 'next/link';
import BoxWrapper from '@/components/Box/StyledBox';
import Image from '@/components/Image';
import EvolutionDetails from './EvolutionDetails';
// styles
import { PokeBox, NumberId, PokeName } from '@/components/BaseStyles';
import { EvoArrow, PokeGen } from './StyledEvolution';

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
  // memo
  const generationName = useMemo(() => mapGeneration(generation?.name), [generation]);

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
        <BoxWrapper
          width="auto"
          $flexgrow
          flexdirection="column"
          flexgap="1em"
          flexwrap="nowrap"
          flexjustify="center"
          flexalign="center"
        >
          {evolutionDetails.map((currDetails, i) => (
            <EvolutionDetails key={`evo-details-${i}`} details={currDetails} />
          ))}
          <EvoArrow />
        </BoxWrapper>
      )}
      {/** Pokemon box with image and types */}
      <Link as={`/pokemon/${name}`} href="/pokemon/[pokemonId]" passHref>
        <PokeBox
          $dark
          whileHover="hover"
          whileTap="tap"
          variants={fadeInUpVariant}
          key={`evolution-${name}`}
        >
          <Image
            alt={name}
            key={`evolution-img-${name}-${id}`}
            src={`https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${id
              .toString()
              .padStart(3, '0')}.png`}
            width="115"
            height="115"
            lazy={false}
          />
          <NumberId>{`#${id}`}</NumberId>
          <PokeName>{removeDash(name)}</PokeName>
          {generation?.name && <PokeGen>{generationName}</PokeGen>}
        </PokeBox>
      </Link>
    </BoxWrapper>
  );
};

export default Evolution;
