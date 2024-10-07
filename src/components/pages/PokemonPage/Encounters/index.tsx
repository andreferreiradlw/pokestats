'use client';

import { useContext, useEffect, useState } from 'react';
// helpers
import { usePokemonEncounters } from '@/hooks';
import { GameVersionContext } from '@/context';
// types
import type { PokemonSpecies } from 'pokenode-ts';
// components
import { Alert, AlertTitle, Button, Grid2, Link, Typography, type Grid2Props } from '@mui/material';
import { AnimatePresence, motion } from '@/client';
import { fadeInUpVariant, staggerContainerVariant } from '@/animations';
import GameGenSelect from '@/components/GameGenSelect';
import Loading from '@/components/Loading';
import EncounterCard from './EncounterCard';

interface EncountersProps extends Grid2Props {
  species: PokemonSpecies;
}

const Encounters = ({ species, ...rest }: EncountersProps): JSX.Element => {
  // state
  const [showAlert, setShowAlert] = useState(true);
  // context
  const { gameVersion, gameGeneration } = useContext(GameVersionContext);
  // data
  const { data: encounterDetails, isLoading } = usePokemonEncounters(species.id, gameVersion!, {
    enabled: !!gameVersion,
  });

  useEffect(() => {
    const storedBannerSetting = localStorage.getItem('hideEncounterBanner');
    if (storedBannerSetting === 'true') {
      setShowAlert(false);
    }
  }, []);

  return (
    <Grid2 container direction="column" spacing={4} size={12} {...rest}>
      <Grid2 size={12}>
        <Typography variant="sectionTitle">Encounters</Typography>
      </Grid2>
      {showAlert && (
        <Grid2 size={12}>
          <Alert
            severity="warning"
            action={
              <Button
                color="inherit"
                size="medium"
                variant="outlined"
                onClick={() => {
                  setShowAlert(false);
                  localStorage.setItem('hideEncounterBanner', 'true');
                }}
              >
                Dismiss
              </Button>
            }
          >
            <AlertTitle>This data might not be accurate</AlertTitle>
            <Typography gutterBottom variant="body2">
              Some encounter information is missing from the API, especially for newer titles such
              as Sword and Shield.
            </Typography>
            <Typography variant="body2">
              Area images and encounter icons might be broken or incorrect, please let me know if
              you find something by opening a new issue{' '}
              <Link
                href="https://github.com/andreferreiradlw/pokestats/issues"
                target="_blank"
                color="inherit"
              >
                here
              </Link>
              . Please bear with me while I keep improving this section.
            </Typography>
          </Alert>
        </Grid2>
      )}
      <Grid2 size={12}>
        <GameGenSelect />
      </Grid2>
      <Grid2 container size={12}>
        <AnimatePresence mode="wait">
          {isLoading ? (
            <Grid2 size={12}>
              <Loading
                height="100%"
                $iconWidth={{ xxs: '20%', xs: '15%', md: '10%', lg: '5%' }}
                py={12}
                key="encounters-loading"
              />
            </Grid2>
          ) : encounterDetails && encounterDetails.length > 0 ? (
            <AnimatePresence mode="wait">
              <Grid2
                container
                size={12}
                spacing={4}
                direction="row"
                wrap="wrap"
                component={motion.div}
                initial="hidden"
                animate="show"
                exit="exit"
                variants={staggerContainerVariant}
                key={`encounters-container-${gameVersion}`}
              >
                {encounterDetails.map(encounter => (
                  <EncounterCard
                    key={`${encounter.location_area.id}-${encounter.version_details.version.name}`}
                    encounter={encounter}
                    generation={gameGeneration}
                    pokemonName={species.name}
                  />
                ))}
              </Grid2>
            </AnimatePresence>
          ) : (
            <Grid2 size={12}>
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
            </Grid2>
          )}
        </AnimatePresence>
      </Grid2>
    </Grid2>
  );
};

export default Encounters;
