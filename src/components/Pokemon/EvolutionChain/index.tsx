// types
import type { EvolutionChain as EvoChainType, PokemonSpecies } from 'pokenode-ts';
// helpers
import { fadeInUpVariant } from '@/helpers';
// components
import Evolution from './Evolution';
import { motion } from 'framer-motion';
// styles
import { useEvolutionChain } from '@/hooks';
import { capitalize, Grid2, Grid2Props, Typography } from '@mui/material';
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
    <Grid2 container gap="1em" width="100%" direction="column" {...rest}>
      <Typography variant="sectionTitle">Evolution Chain</Typography>
      {isLoading ? (
        <Loading flexheight="100%" $iconWidth={{ xxs: '20%', xs: '15%', md: '10%', lg: '5%' }} />
      ) : (
        <>
          <Grid2
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            size={12}
            gap="1em"
          >
            <Evolution noArrow species={data.firstEvolution} style={{ width: 'auto' }} />
            {data.secondEvolution.length > 0 && (
              <Grid2
                alignItems="stretch"
                justifyContent="space-evenly"
                gap="1em"
                maxWidth="100%"
                size={12}
                pb={1}
                sx={{
                  overflow: data.firstEvolution.name === 'eevee' ? 'scroll hidden' : 'visible',
                }}
              >
                {data.secondEvolution.map(({ species, evolutionDetails, thirdEvolution }) => (
                  <Grid2 key="second-evo-container" gap="1em" flexDirection="column">
                    <Evolution
                      species={species}
                      evolutionDetails={evolutionDetails}
                      key="second-evo"
                    />
                    {thirdEvolution.length > 0 && (
                      <Grid2 justifyContent="space-evenly" gap="1em">
                        {thirdEvolution.map(({ species, evolutionDetails }) => (
                          <Evolution
                            key="third-evo"
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
      )}
    </Grid2>
  );
};

export default EvolutionChain;
