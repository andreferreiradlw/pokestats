import { useContext } from 'react';
// helpers
import { usePokemonEncounters } from '@/hooks';
import { GameVersionContext } from '@/context';
// types
import type { PokemonSpecies } from 'pokenode-ts';
// components
import { Grid2, Typography, type Grid2Props } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { fadeInUpVariant, staggerContainerVariant } from '@/animations';
import GameGenSelect from '@/components/GameGenSelect';
import Loading from '@/components/Loading';
import EncounterCard from './EncounterCard';

interface EncountersProps extends Grid2Props {
  species: PokemonSpecies;
}

const Encounters = ({ species, ...rest }: EncountersProps): JSX.Element => {
  // context
  const { gameVersion } = useContext(GameVersionContext);
  // data
  const { data: encounterDetails, isLoading } = usePokemonEncounters(species.id, gameVersion);

  return (
    <Grid2 container direction="column" spacing={4} size={12} {...rest}>
      <Grid2 size={12}>
        <Typography variant="sectionTitle">Encounters</Typography>
      </Grid2>
      <Grid2 size={12}>
        <GameGenSelect />
      </Grid2>
      <Grid2>
        {isLoading ? (
          <Loading
            height="100%"
            $iconWidth={{ xxs: '20%', xs: '15%', md: '10%', lg: '5%' }}
            py={12}
            key="encounters-loading"
          />
        ) : encounterDetails && encounterDetails.length > 0 ? (
          <AnimatePresence>
            <Grid2
              container
              size={12}
              spacing={4}
              direction="row"
              component={motion.div}
              initial="hidden"
              animate="visible"
              variants={staggerContainerVariant}
              key="encounter-details"
            >
              {encounterDetails.map(encounter => (
                <EncounterCard
                  key={`${encounter.location_area.id}-${encounter.version_details.version.name}`}
                  encounter={encounter}
                />
              ))}
            </Grid2>
          </AnimatePresence>
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
      </Grid2>
    </Grid2>
  );
};

export default Encounters;
