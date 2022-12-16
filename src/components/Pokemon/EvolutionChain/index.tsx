// types
import type { BoxProps } from '@/components/Box';
import type { EvolutionChain as EvolutionChainType } from 'pokenode-ts';
// helpers
import { AnimatePresence } from 'framer-motion';
import { fadeInUpVariant } from '@/helpers/animations';
// components
import Box from '@/components/Box';
import BoxWrapper from '@/components/Box/StyledBox';
import Evolution from './Evolution';
// styles
import { SectionTitle, SectionMessage } from '@/components/BaseStyles';

interface EvolutionChainProps extends BoxProps {
  evolutionChain: EvolutionChainType;
}

const EvolutionChain = ({ evolutionChain, ...rest }: EvolutionChainProps): JSX.Element => {
  // data
  const { chain, id: chainId } = evolutionChain;

  return (
    <Box align={{ xxs: 'center', lg: 'flex-start' }} {...rest}>
      <SectionTitle>Evolution Chain</SectionTitle>
      <AnimatePresence>
        <BoxWrapper
          direction={{ xxs: 'column', lg: 'row' }}
          justify="center"
          align="center"
          width="100%"
        >
          <Evolution noArrow species={chain.species} width="auto" />
          {chain.evolves_to.length > 0 && (
            <Box
              direction={{ xxs: 'row', lg: 'column' }}
              $flexWrap={{ xxs: 'wrap', lg: 'nowrap' }}
              sizes={9.6}
            >
              {chain.evolves_to.map((firstEvo, i) => (
                <Box
                  direction={{ xxs: 'column', lg: 'row' }}
                  align={{ xxs: 'flex-end', lg: 'center' }}
                  key={`first-evo-box-${i}-${chainId}`}
                  width={{ xxs: '200px', lg: '100%' }}
                >
                  <Evolution
                    species={firstEvo.species}
                    evolutionDetails={firstEvo.evolution_details}
                    key={`first-evo-${i}-${chainId}`}
                  />
                  {firstEvo.evolves_to.length > 0 && (
                    <Box
                      direction={{ xxs: 'row', lg: 'column' }}
                      align={{ xxs: 'flex-end', lg: 'center' }}
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
          This Pokémon does not evolve.
        </SectionMessage>
      )}
    </Box>
  );
};

export default EvolutionChain;
