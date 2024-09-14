import { Divider, Grid2, Stack, Typography } from '@mui/material';
import React from 'react';

const KantoGen1 = (): JSX.Element => {
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
        <Grid2 size={{ xxs: 12, lg: 6 }}>map</Grid2>
      </Grid2>
    </Stack>
  );
};

export default KantoGen1;
