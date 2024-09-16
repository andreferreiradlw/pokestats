import { type PropsWithChildren, useRef, useState } from 'react';
// components
import CanvasMapper, { type CanvasMapperArea, type CanvasMapperHandle } from './CanvasMapper';
import { Button, Grid2, Stack, Typography } from '@mui/material';
import LocationDetails from './LocationDetails';
import { AnimatePresence } from 'framer-motion';
import { mapGeneration, type GameGenValue } from '@/helpers';

interface RegionPageProps extends PropsWithChildren {
  areas: CanvasMapperArea[];
  regionName: string;
  generation: GameGenValue;
  mapImageUrl: string;
}

const RegionPage = ({
  areas,
  regionName,
  generation,
  mapImageUrl,
  children,
}: RegionPageProps): JSX.Element => {
  // hooks
  const mapContainerRef = useRef<HTMLDivElement>(null);
  // state
  const [highlightAllAreas, setHighlightAllAreas] = useState(false);
  const [selectedArea, setSelectedArea] = useState<CanvasMapperArea>();
  // ref
  const canvasMapperRef = useRef<CanvasMapperHandle>(null);

  return (
    <Stack gap={4} py={2}>
      <Grid2 container size={12} alignItems="flex-start" justifyContent="flex-start" spacing={4}>
        <Grid2 flexDirection="column" alignItems="flex-start" size={{ xxs: 12, lg: 5 }}>
          <Typography variant="pageHeading" gutterBottom>
            {regionName}
          </Typography>
          <Typography variant="sectionTitle" gutterBottom>
            {mapGeneration(generation)}
          </Typography>
          <Typography>{children}</Typography>
          <Button onClick={() => setHighlightAllAreas(prev => !prev)}>Highlight All Areas</Button>
          <Button
            onClick={() => {
              if (canvasMapperRef.current) {
                // Call the clear function directly from CanvasMapper
                canvasMapperRef.current.clearSelection();
                setSelectedArea(undefined);
              }
            }}
            disabled={!selectedArea}
          >
            Clear Selection
          </Button>
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
            onClick={area => setSelectedArea(area)}
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
