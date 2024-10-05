// types
import type { EvolutionChain as EvoChainType, PokemonSpecies } from 'pokenode-ts';
// helpers
import { fadeInUpVariant } from '@/animations';
import { useEvolutionChain } from '@/hooks';
// components
import Evolution from './Evolution';
import { motion } from 'framer-motion';
import { capitalize, Grid2, Typography, type Grid2Props } from '@mui/material';
import Loading from '@/components/Loading';

interface EvolutionChainProps extends Grid2Props {
  pokemonSpecies: PokemonSpecies;
  evolutionChain: EvoChainType;
}

const EvolutionChain = ({
  pokemonSpecies,
  evolutionChain,
  ...rest
}: EvolutionChainProps): JSX.Element => {
  // data
  const { data, isLoading } = useEvolutionChain(evolutionChain, pokemonSpecies);

  return (
    <Grid2
      container
      gap={4}
      width="100%"
      direction="column"
      overflow="hidden
    "
      {...rest}
    >
      <Typography variant="sectionTitle">Evolution Chain</Typography>
      {isLoading ? (
        <Loading height="100%" $iconWidth={{ xxs: '20%', xs: '15%', md: '10%', lg: '5%' }} />
      ) : (
        data && (
          <>
            <Grid2
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              size={12}
              gap={4}
            >
              <Evolution noArrow species={data.firstEvolution} style={{ width: 'auto' }} />
              {data.secondEvolution.length > 0 && (
                <Grid2
                  alignItems="stretch"
                  justifyContent="space-evenly"
                  gap={4}
                  pb={2}
                  px={2}
                  width="100%"
                  sx={{
                    overflow: data.firstEvolution?.name === 'eevee' ? 'scroll hidden' : 'visible',
                  }}
                >
                  {data.secondEvolution.map(({ species, evolutionDetails, thirdEvolution }) => (
                    <Grid2
                      key={`second-evo-container-${species.id}`}
                      gap={2}
                      flexDirection="column"
                      flexBasis="100%"
                      minWidth="auto"
                    >
                      <Evolution
                        species={species}
                        evolutionDetails={evolutionDetails}
                        key="second-evo"
                      />
                      {thirdEvolution.length > 0 && (
                        <Grid2 justifyContent="space-evenly" gap={2}>
                          {thirdEvolution.map(({ species, evolutionDetails }) => (
                            <Evolution
                              key={`third-evo-${species.id}`}
                              species={species}
                              evolutionDetails={evolutionDetails}
                            />
                          ))}
                        </Grid2>
                      )}
                    </Grid2>
                  ))}
                </Grid2>
              )}
            </Grid2>
            {!data.secondEvolution.length && (
              <Typography
                variant="sectionMessage"
                component={motion.p}
                initial="hidden"
                animate="show"
                variants={fadeInUpVariant}
                key="no-evolutions"
              >
                {`${capitalize(pokemonSpecies.name)} does not evolve.`}
              </Typography>
            )}
          </>
        )
      )}
    </Grid2>
  );
};

export default EvolutionChain;
