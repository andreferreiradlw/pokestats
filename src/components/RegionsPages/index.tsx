// types
import type { PokestatsRegionsPageProps } from '@/pages/regions';
// components
import { Stack } from '@mui/material';

const RegionsPage = ({ regions }: PokestatsRegionsPageProps): JSX.Element => {
  console.log('regions', regions);

  return <Stack>RegionsPage</Stack>;
};

export default RegionsPage;
