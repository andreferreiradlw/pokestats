// types
import type { PokestatsPokemonPageProps } from '@/pages/pokemon/[pokemonId]';
import type { BoxProps } from '@/components/Box';
// helpers
import { fadeInUpVariant } from '@/helpers';
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
  const { chainId, firstEvolution, secondEvolution } = evolutionChain;

  return (
    <Box flexgap="1em" {...rest}>
      <SectionTitle>Evolution Chain</SectionTitle>
      <BoxWrapper
        flexdirection="column"
        flexjustify="center"
        flexalign="center"
        width="100%"
        flexgap="1em"
      >
        <Evolution noArrow species={firstEvolution} width="auto" />
        {secondEvolution.length > 0 && (
          <Box
            flexdirection="row"
            flexalign="stretch"
            flexjustify="flex-start"
            flexgap="1em"
            style={{
              overflow: 'hidden',
              overflowX: firstEvolution.name === 'eevee' ? 'scroll' : 'hidden',
            }}
          >
            {secondEvolution.map(({ species, evolutionDetails, thirdEvolution }, i) => (
              <Box key={`second-evo-container-${i}-${chainId}`} flexgap="1em">
                <Evolution
                  species={species}
                  evolutionDetails={evolutionDetails}
                  key={`second-evo-${i}-${chainId}`}
                />
                {thirdEvolution.length > 0 && (
                  <Box flexdirection="row" flexjustify="space-evenly" flexgap="1em">
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
      {!secondEvolution.length && (
        <SectionMessage
          initial="hidden"
          animate="show"
          variants={fadeInUpVariant}
          key={`no-evo-${chainId}`}
        >
          {`${pokemonName} does not evolve.`}
        </SectionMessage>
      )}
    </Box>
  );
};

export default EvolutionChain;
