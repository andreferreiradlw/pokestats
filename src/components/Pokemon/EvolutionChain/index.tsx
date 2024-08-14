// types
import type { EvolutionChain as EvoChainType, PokemonSpecies } from 'pokenode-ts';
// helpers
import { fadeInUpVariant } from '@/helpers';
// components
import Evolution from './Evolution';
import { motion } from 'framer-motion';
// styles
import { useEvolutionChain } from '@/hooks';
import { capitalize, Grid, GridProps, Typography } from '@mui/material';
import Loading from '@/components/Loading';

interface EvolutionChainProps extends GridProps {
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
    <Grid container gap="1em" {...rest}>
      <Typography variant="sectionTitle">Evolution Chain</Typography>
      {isLoading ? (
        <Loading flexheight="100%" $iconWidth={{ xxs: '20%', xs: '15%', md: '10%', lg: '5%' }} />
      ) : (
        <>
          <Grid
            item
            container
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            width="100%"
            gap="1em"
          >
            <Evolution noArrow species={data.firstEvolution} style={{ width: 'auto' }} />
            {data.secondEvolution.length > 0 && (
              <Grid
                item
                flexDirection="row"
                alignItems="stretch"
                justifyContent="space-evenly"
                gap="1em"
                maxWidth="100%"
                width="100%"
                pb={1}
                sx={{
                  overflow: data.firstEvolution.name === 'eevee' ? 'scroll hidden' : 'visible',
                }}
              >
                {data.secondEvolution.map(({ species, evolutionDetails, thirdEvolution }) => (
                  <Grid item key="second-evo-container" gap="1em">
                    <Evolution
                      species={species}
                      evolutionDetails={evolutionDetails}
                      key="second-evo"
                    />
                    {thirdEvolution.length > 0 && (
                      <Grid flexDirection="row" justifyContent="space-evenly" gap="1em">
                        {thirdEvolution.map(({ species, evolutionDetails }) => (
                          <Evolution
                            key="third-evo"
                            species={species}
                            evolutionDetails={evolutionDetails}
                          />
                        ))}
                      </Grid>
                    )}
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
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
    </Grid>
  );
};

export default EvolutionChain;
