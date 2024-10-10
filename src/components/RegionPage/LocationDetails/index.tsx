import { useMemo } from 'react';
// types
import type { Location, LocationArea } from 'pokenode-ts';
import type { CanvasMapperArea } from '../CanvasMapper';
// hooks
import { useBreakpoint, useLocationAreas } from '@/hooks';
// helpers
import {
  type AreaEncounters,
  findEnglishName,
  formatLocationEncounters,
  type GameGenValue,
} from '@/helpers';
import { fadeInUpVariant } from '@/animations';
// components
import { motion } from '@/client';
import { Alert, Box, Button, Grid2, Stack, Typography, type Grid2Props } from '@mui/material';
import Loading from '@/components/Loading';
import LocationTableV2 from '../LocationTableV2';
import LocationMusic from '../LocationMusic';
import ImageBackdrop from '@/components/ImageBackdrop';
import ImageNextV2 from '@/components/ImageNextV2';

interface LocationDetailsProps extends Grid2Props {
  area: CanvasMapperArea;
  generation: GameGenValue;
}

export interface FormattedLocationData {
  location: Location;
  locationAreas: {
    encounter_method_rates?: LocationArea['encounter_method_rates'];
    game_index: LocationArea['game_index'];
    id: LocationArea['id'];
    location: LocationArea['location'];
    name: LocationArea['name'];
    names: LocationArea['names'];
    pokemon_encounters: AreaEncounters[];
  }[];
}

const LocationDetails = ({ area, generation, ...rest }: LocationDetailsProps): JSX.Element => {
  // breakpoint
  const isLargeUp = useBreakpoint({ breakpoint: 'lg' });

  // area data
  const { id, description, key } = area;

  // data
  const { data, isLoading, refetch } = useLocationAreas(Number(id), generation);

  const formattedData: FormattedLocationData | undefined = useMemo(() => {
    if (!data?.locationAreas) return data as undefined;

    // Typed accumulator for better clarity and type safety
    const result = data.locationAreas.reduce<FormattedLocationData['locationAreas']>(
      (acc, currentArea) => {
        const formatted = formatLocationEncounters(currentArea.pokemon_encounters);

        if (formatted.length > 0) {
          acc.push({ ...currentArea, pokemon_encounters: formatted });
        }

        return acc;
      },
      [],
    );

    return { location: data.location, locationAreas: result };
  }, [data]);

  if (isLoading) {
    return (
      <Loading
        height="100%"
        $iconWidth={{ xxs: '20%', xs: '15%', md: '10%', lg: '5%' }}
        py={12}
        key={`area-loading-${key}`}
      />
    );
  }

  return (
    <Grid2
      container
      size={12}
      direction={{ xs: 'column-reverse', md: 'row' }}
      spacing={12}
      component={motion.div}
      initial="hidden"
      animate="show"
      exit="exit"
      variants={fadeInUpVariant}
      {...rest}
    >
      {formattedData ? (
        <>
          <Grid2 size={{ xs: 12, lg: 4 }} gap={2} flexDirection="column">
            <Typography variant="h3">{findEnglishName(formattedData.location.names)}</Typography>
            <Typography gutterBottom>{description}</Typography>
            <LocationMusic generation={generation} locationName={key} />
            {isLargeUp &&
              (formattedData.locationAreas ? (
                <Stack gap={4} width="100%">
                  {formattedData.locationAreas.map(({ name, names, id }) => {
                    const locationAreaName = findEnglishName(names);

                    return (
                      <Box key={name}>
                        {formattedData.locationAreas!.length > 1 && (
                          <Typography variant="sectionSubTitle" gutterBottom>
                            {locationAreaName}
                          </Typography>
                        )}
                        <ImageBackdrop
                          key={`${generation}-${name}-${id}`}
                          alt={locationAreaName || name}
                          src={`https://raw.githubusercontent.com/andreferreiradlw/pokestats_media/main/assets/regions/${generation}/${name}.png`}
                        />
                      </Box>
                    );
                  })}
                </Stack>
              ) : (
                <ImageBackdrop
                  key={`${generation}-${formattedData.location.name}-${id}`}
                  alt={findEnglishName(formattedData.location.names) || area.title}
                  src={`https://raw.githubusercontent.com/andreferreiradlw/pokestats_media/main/assets/regions/${generation}/${formattedData.location.name}.png`}
                />
              ))}
          </Grid2>
          <Grid2 size={{ xs: 12, lg: 8 }}>
            {formattedData.locationAreas?.length ? (
              <LocationTableV2
                locationAreas={formattedData.locationAreas}
                generation={generation}
                region={formattedData.location.region?.name}
              />
            ) : (
              <Stack py={12} width="100%" alignItems="center" gap={2}>
                <ImageNextV2
                  customKey={`no-encounters-${formattedData.location.name}`}
                  imageUrl={`https://raw.githubusercontent.com/andreferreiradlw/pokestats_media/main/assets/misc/${generation}/trainer-back.png`}
                  alt="Pokémon Trainer"
                  width={150}
                />
                <Typography variant="sectionSubTitle">
                  No Pokémon encounters have been found in this area.
                </Typography>
              </Stack>
            )}
          </Grid2>
        </>
      ) : (
        <Alert
          variant="filled"
          severity="error"
          action={
            <Button color="inherit" variant="outlined" onClick={() => refetch()}>
              Retry
            </Button>
          }
        >
          There has been an issue loading area location data.
        </Alert>
      )}
    </Grid2>
  );
};

export default LocationDetails;
