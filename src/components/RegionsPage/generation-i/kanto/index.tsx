import { useRef } from 'react';
// components
import CanvasMapper from '@/components/CanvasMapper';
import { Divider, Grid2, Stack, Typography } from '@mui/material';

import { kantoZones } from './zones';

const KantoGen1 = (): JSX.Element => {
  // hooks
  const mapContainerRef = useRef<HTMLDivElement>(null);

  return (
    <Stack divider={<Divider />} gap={4} py={2}>
      <Grid2 container size={12} alignItems="flex-start" justifyContent="flex-start" spacing={4}>
        <Grid2 flexDirection="column" alignItems="flex-start" size={{ xxs: 12, lg: 6 }}>
          <Typography variant="pageHeading" gutterBottom>
            Kanto
          </Typography>
          <Typography variant="sectionTitle" gutterBottom>
            Generation I
          </Typography>
          <Typography>
            <b>Kanto</b> is a region of the Pokémon world. It is located east of <b>Johto</b>, which
            together form a joint landmass that is south of <b>Sinnoh</b>.It is the setting of the
            first generation of games and can also be explored in Generations II, III, IV, and VII.
          </Typography>
        </Grid2>
        <Grid2 size={{ xxs: 12, lg: 6 }} ref={mapContainerRef}>
          <CanvasMapper
            parentRef={mapContainerRef}
            src="/static/regions/kantoGen1/kanto-map.png"
            mapName="kanto-gen1"
            areas={kantoZones}
            // parentWidth={imgWidth}
            stayHighlighted
            // highlightAllAreas={showAllAreas}
            toggleHighlighted
            fillColor="#1b15074d"
            strokeColor="black"
            onClick={(area, index) => console.log('click', area, index)}
            // onMouseEnter={(area: any) => setMapHover(area.title)}
            // onMouseLeave={() => setMapHover(null)}
          />
        </Grid2>
      </Grid2>
    </Stack>
  );
};

export default KantoGen1;
