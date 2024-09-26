import type { PokestatsItemsPageProps } from '@/pages/item';
import { Stack, Typography } from '@mui/material';
import ItemTable from './ItemTable.tsx';

const ItemListPage = ({ itemData }: PokestatsItemsPageProps): JSX.Element => {
  return (
    <Stack gap={4} width="100%">
      <Typography variant="pageHeading">Pokémon Items List</Typography>
      <ItemTable items={itemData} />
    </Stack>
  );
};

export default ItemListPage;
