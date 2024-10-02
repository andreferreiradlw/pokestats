import { findEnglishName } from '@/helpers';
import type { PokestatsEggGroupPageProps } from '@/pages/egg-group/[eggGroupName]';
// components
import { Grid2, Stack, Typography } from '@mui/material';
import { useMemo } from 'react';
import EggGroupTable from './EggGroupTable';

const EggGroupPage = ({ eggGroupData, tableData }: PokestatsEggGroupPageProps): JSX.Element => {
  const groupName = useMemo(() => findEnglishName(eggGroupData.names), [eggGroupData]);

  return (
    <Stack gap={4} width="100%">
      <Typography variant="pageHeading">{`${groupName} Egg Group`}</Typography>
      <Grid2 direction="column" gap={2}>
        filters
      </Grid2>
      <EggGroupTable pokemon={tableData} eggGroup={eggGroupData.name} />
    </Stack>
  );
};

export default EggGroupPage;
