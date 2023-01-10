// types
import type { PokestatsPokemonPageProps } from '@/pages/pokemon/[pokemonId]';
import type { BoxProps } from '@/components/Box';
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
  evolutionChain: PokestatsPokemonPageProps['evolutionChain'];
}

const EvolutionChain = ({
  pokemonName,
  evolutionChain,
  ...rest
}: EvolutionChainProps): JSX.Element => {
  // data
  const { chainId, firstEvolution, secondEvolution, thirdEvolution } = evolutionChain;

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
          <Evolution noArrow species={firstEvolution} width="auto" />
          {secondEvolution.length > 0 && (
            <Box
              flexdirection={{ xxs: 'row', lg: 'column' }}
              flexwrap={{ xxs: 'wrap', lg: 'nowrap' }}
              screensizes={9.6}
              flexgap="1em"
            >
              {secondEvolution.map(({ species, evolutionDetails }, i) => (
                <Box
                  flexdirection={{ xxs: 'column', lg: 'row' }}
                  flexalign={{ xxs: 'flex-end', lg: 'center' }}
                  key={`second-evo-container-${i}-${chainId}`}
                  width={{ xxs: '200px', lg: '100%' }}
                  flexgap="1em"
                >
                  <Evolution
                    species={species}
                    evolutionDetails={evolutionDetails}
                    key={`second-evo-${i}-${chainId}`}
                  />
                  {thirdEvolution.length > 0 && (
                    <Box
                      flexdirection={{ xxs: 'row', lg: 'column' }}
                      flexalign="center"
                      flexgap="1em"
                    >
                      {thirdEvolution.map(({ species, evolutionDetails }, x) => (
                        <Evolution
                          key={`third-evo-${x}-${chainId}`}
                          species={species}
                          evolutionDetails={evolutionDetails}
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
      {!secondEvolution.length && !thirdEvolution.length && (
        <SectionMessage
          initial="hidden"
          animate="show"
          variants={fadeInUpVariant}
          key={`no-evo-${chainId}`}
        >
          {`${removeDash(pokemonName)} does not evolve.`}
        </SectionMessage>
      )}
    </Box>
  );
};

export default EvolutionChain;
