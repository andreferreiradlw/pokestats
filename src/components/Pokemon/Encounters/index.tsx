import { useContext, useMemo } from 'react';
// helpers
import { usePokemonEncounters } from '@/hooks';
import { GameVersionContext } from '@/context';
// types
import type { LocationAreaEncounter, PokemonSpecies } from 'pokenode-ts';
// components
import { Grid2, Typography, type Grid2Props } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { fadeInUpVariant } from '@/animations';
import GameGenSelect from '@/components/GameGenSelect';
import Loading from '@/components/Loading';

interface EncountersProps extends Grid2Props {
  species: PokemonSpecies;
}

const Encounters = ({ species, ...rest }: EncountersProps): JSX.Element => {
  // data
  const { data, isLoading } = usePokemonEncounters(species.id);
  // context
  const { gameVersion } = useContext(GameVersionContext);

  // Memoized computation of encounter details
  const encounterDetails = useMemo(() => {
    if (!data || !gameVersion) return [];

    return data.reduce(
      (acc, area) => {
        const relevantDetails = area.version_details.find(
          details => details.version.name === gameVersion,
        );

        if (relevantDetails) {
          acc.push({
            location_area: area.location_area,
            version_details: relevantDetails,
          });
        }

        return acc;
      },
      [] as Array<{
        location_area: LocationAreaEncounter['location_area'];
        version_details: LocationAreaEncounter['version_details'][number];
      }>,
    );
  }, [data, gameVersion]);

  return (
    <Grid2 container direction="column" spacing={4} size={12} {...rest}>
      <Grid2 size={12}>
        <Typography variant="sectionTitle">Encounters</Typography>
      </Grid2>
      <Grid2 size={12}>
        <GameGenSelect />
      </Grid2>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Loading
            height="100%"
            $iconWidth={{ xxs: '20%', xs: '15%', md: '10%', lg: '5%' }}
            py={12}
          />
        ) : encounterDetails.length > 0 ? (
          encounterDetails.map((encounter, index) => (
            <Typography key={index}>{`Area: ${encounter.location_area.name}`}</Typography>
          ))
        ) : (
          <Typography
            variant="sectionSubTitle"
            py={4}
            component={motion.p}
            initial="hidden"
            animate="show"
            exit="exit"
            variants={fadeInUpVariant}
            key="type-nomoves-message"
          >
            No encounters for selected game version.
          </Typography>
        )}
      </AnimatePresence>
    </Grid2>
  );
};

export default Encounters;
