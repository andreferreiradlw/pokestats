import { type PropsWithChildren, useRef, useState } from 'react';
// helpers
import { mapGeneration, type GameGenValue } from '@/helpers';
import { usePlausible } from 'next-plausible';
import { alpha } from '@mui/material/styles';
// components
import CanvasMapper, { type CanvasMapperArea, type CanvasMapperHandle } from './CanvasMapper';
import { Button, Grid2, Stack, Typography, useTheme } from '@mui/material';
import LocationDetails from './LocationDetails';
import { AnimatePresence } from 'framer-motion';

interface RegionPageProps extends PropsWithChildren {
  areas: CanvasMapperArea[];
  regionName: string;
  generation: GameGenValue;
  mapImageUrl: string;
  defaultLocation: string | null;
}

const RegionPage = ({
  areas,
  regionName,
  generation,
  mapImageUrl,
  defaultLocation,
  children,
}: RegionPageProps): JSX.Element => {
  // state
  const [highlightAllAreas, setHighlightAllAreas] = useState(false);
  const [selectedArea, setSelectedArea] = useState<CanvasMapperArea>();

  // ref
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const canvasMapperRef = useRef<CanvasMapperHandle>(null);

  // hooks
  const plausible = usePlausible();
  const theme = useTheme();

  return (
    <Stack gap={4} py={2}>
      <Grid2 container size={12} alignItems="flex-start" justifyContent="flex-start" spacing={4}>
        <Grid2 flexDirection="column" alignItems="flex-start" size={{ xxs: 12, lg: 5 }}>
          <Typography variant="pageHeading">{regionName}</Typography>
          <Typography variant="sectionTitle" gutterBottom>
            {mapGeneration(generation)}
          </Typography>
          {children}
          <Stack flexDirection="row" gap={2} mt={4}>
            <Button
              onClick={() => {
                setHighlightAllAreas(prev => !prev);
                plausible('Highlight All Areas Click');
              }}
              variant={highlightAllAreas ? 'contained' : 'outlined'}
            >
              Highlight All Areas
            </Button>
            <Button
              onClick={() => {
                if (canvasMapperRef.current) {
                  // Call the clear function directly from CanvasMapper
                  canvasMapperRef.current.clearSelection();
                  setSelectedArea(undefined);
                }
              }}
              disabled={!selectedArea}
              variant="contained"
              color="secondary"
            >
              Clear Selection
            </Button>
          </Stack>
        </Grid2>
        <Grid2 size={{ xxs: 12, lg: 7 }} ref={mapContainerRef}>
          <CanvasMapper
            ref={canvasMapperRef} // Attach ref to access internal functions
            parentRef={mapContainerRef}
            src={mapImageUrl}
            mapName={regionName}
            areas={areas}
            stayHighlighted
            highlightAllAreas={highlightAllAreas}
            toggleHighlighted
            fillColor={alpha(theme.palette.secondary.main, 0.75)}
            strokeColor={theme.palette.secondary.dark}
            onClick={area => {
              setSelectedArea(area);
              plausible('Map Canvas Click');
            }}
            defaultArea={defaultLocation}
          />
        </Grid2>
      </Grid2>
      <AnimatePresence mode="wait">
        {selectedArea && (
          <LocationDetails area={selectedArea} generation={generation} key={selectedArea.key} />
        )}
      </AnimatePresence>
    </Stack>
  );
};

export default RegionPage;
