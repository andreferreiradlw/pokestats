// types
import { motion } from 'framer-motion';
import type { CanvasMapperArea } from '../CanvasMapper';
// hooks
import { useLocationAreas } from '@/hooks';
// helpers
import { findEnglishName, type GameGenValue } from '@/helpers';
import { fadeInUpVariant } from '@/animations';
// components
import { Box, Grid2, Stack, Typography, type Grid2Props } from '@mui/material';
import Loading from '@/components/Loading';
import LocationTableV2 from '../LocationTableV2';
import ImageNext from '@/components/ImageNext';

interface LocationDetailsProps extends Grid2Props {
  area: CanvasMapperArea;
  generation: GameGenValue;
}

const LocationDetails = ({ area, generation, ...rest }: LocationDetailsProps): JSX.Element => {
  const { id, description, key } = area;

  // data
  const { data, isLoading } = useLocationAreas(Number(id), generation);

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
      direction={{ xs: 'column', md: 'row' }}
      spacing={12}
      component={motion.div}
      initial="hidden"
      animate="show"
      exit="exit"
      variants={fadeInUpVariant}
      {...rest}
    >
      {data ? (
        <>
          <Grid2 size={4} gap={2} flexDirection="column">
            <Typography variant="h3">{findEnglishName(data.location.names)}</Typography>
            <Typography gutterBottom>{description}</Typography>
            {data.locationAreas && (
              <Stack gap={4} width="100%">
                {data.locationAreas.map(({ name, names }) => {
                  const locationAreaName = findEnglishName(names);

                  return (
                    <Box key={name}>
                      {data.locationAreas!.length > 1 && (
                        <Typography variant="sectionSubTitle" gutterBottom>
                          {locationAreaName}
                        </Typography>
                      )}
                      <ImageNext
                        alt={locationAreaName || name}
                        src={`https://raw.githubusercontent.com/andreferreiradlw/pokestats_media/main/assets/regions/${generation}/${name}.png`}
                      />
                    </Box>
                  );
                })}
              </Stack>
            )}
          </Grid2>
          <Grid2 size={{ xs: 12, md: 8 }}>
            {data.locationAreas?.length ? (
              <LocationTableV2
                locationAreas={data.locationAreas}
                generation={generation}
                region={data.location.region?.name}
              />
            ) : (
              <Typography>No encounters in this area.</Typography>
            )}
          </Grid2>
        </>
      ) : (
        <Typography>issue loading data</Typography>
      )}
    </Grid2>
  );
};

export default LocationDetails;
