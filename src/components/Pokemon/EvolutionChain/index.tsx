// types
import type { BoxProps } from '@/components/Box';
import type { EvolutionChain as EvolutionChainType } from 'pokenode-ts';
// helpers
import { AnimatePresence } from 'framer-motion';
import { fadeInUpVariant } from '@/helpers/animations';
import { removeDash } from '@/helpers/typography';
// components
import Box from '@/components/Box';
import BoxWrapper from '@/components/Box/StyledBox';
import Evolution from './Evolution';
// styles
import { SectionTitle, SectionMessage } from '@/components/BaseStyles';

interface EvolutionChainProps extends BoxProps {
  pokemonName: string;
  evolutionChain: EvolutionChainType;
}

const EvolutionChain = ({
  pokemonName,
  evolutionChain,
  ...rest
}: EvolutionChainProps): JSX.Element => {
  // data
  const { chain, id: chainId } = evolutionChain;

  return (
    <Box flexalign={{ xxs: 'center', lg: 'flex-start' }} flexgap="1em" {...rest}>
      <SectionTitle>Evolution Chain</SectionTitle>
      <AnimatePresence>
        <BoxWrapper
          flexdirection={{ xxs: 'column', lg: 'row' }}
          flexjustify="center"
          flexalign="center"
          width="100%"
          flexgap="1em"
        >
          <Evolution noArrow species={chain.species} width="auto" />
          {chain.evolves_to.length > 0 && (
            <Box
              flexdirection={{ xxs: 'row', lg: 'column' }}
              flexwrap={{ xxs: 'wrap', lg: 'nowrap' }}
              screensizes={9.6}
              flexgap="1em"
            >
              {chain.evolves_to.map((firstEvo, i) => (
                <Box
                  flexdirection={{ xxs: 'column', lg: 'row' }}
                  flexalign={{ xxs: 'flex-end', lg: 'center' }}
                  key={`first-evo-box-${i}-${chainId}`}
                  width={{ xxs: '200px', lg: '100%' }}
                  flexgap="1em"
                >
                  <Evolution
                    species={firstEvo.species}
                    evolutionDetails={firstEvo.evolution_details}
                    key={`first-evo-${i}-${chainId}`}
                  />
                  {firstEvo.evolves_to.length > 0 && (
                    <Box
                      flexdirection={{ xxs: 'row', lg: 'column' }}
                      flexalign="center"
                      flexgap="1em"
                    >
                      {firstEvo.evolves_to.map((secondEvo, x) => (
                        <Evolution
                          key={`second-evo-${x}-${chainId}`}
                          species={secondEvo.species}
                          evolutionDetails={secondEvo.evolution_details}
                        />
                      ))}
                    </Box>
                  )}
                </Box>
              ))}
            </Box>
          )}
        </BoxWrapper>
      </AnimatePresence>
      {!chain.evolves_to?.length && (
        <SectionMessage
          initial="hidden"
          animate="show"
          variants={fadeInUpVariant}
          key={`no-pokemon-evolution-${chainId}`}
        >
          {`${removeDash(pokemonName)} does not evolve.`}
        </SectionMessage>
      )}
    </Box>
  );
};

export default EvolutionChain;
