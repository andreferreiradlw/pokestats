// types
import type { PokestatsBerriesPageProps } from '@/pages/berries';
// components
import { Stack, Typography } from '@mui/material';
import BerryTable from './BerryTable';

const BerryListPage = ({ berryData }: PokestatsBerriesPageProps): JSX.Element => {
  console.log(berryData);

  return (
    <Stack gap={4} width="100%">
      <Typography variant="pageHeading">Pokémon Berry List</Typography>
      <BerryTable items={berryData} />
    </Stack>
  );
};

export default BerryListPage;
