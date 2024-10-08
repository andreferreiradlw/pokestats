import { useCallback } from 'react';
// helpers
import { useRouter } from 'next/navigation';
import { track } from '@vercel/analytics';
import { fadeInUpVariant } from '@/animations';
import { capitalise, removeDash, type ExtractedItem } from '@/helpers';
// components
import { Box, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import CustomTable, {
  type Column,
  type Row,
  type CustomTableProps,
} from '@/components/CustomTable';
import { PokeCurrency } from '@/BaseStyles';

interface ItemTableProps extends Partial<CustomTableProps> {
  items: ExtractedItem[];
}

const ItemTable = ({ items, ...rest }: ItemTableProps): JSX.Element => {
  // hooks
  const router = useRouter();

  const onCellClick = useCallback(
    (itemName: ExtractedItem['name']) => {
      track('Item Table Click', { itemName });
      router.push(`/item/${itemName}`);
    },
    [track, router],
  );

  // Define table columns
  const columns: Column[] = [
    { field: 'id', headerName: 'ID', sortable: true },
    { field: 'name', headerName: 'Name', sortable: true, defaultSort: true },
    { field: 'shortEntry', headerName: 'Effect' },
    { field: 'cost', headerName: 'Cost', sortable: true },
    { field: 'category', headerName: 'Category', sortable: true },
    { field: 'generation', headerName: 'Introduced' },
  ];

  // Transform items into rows for CustomTable
  const data: Row[] = items.map(
    ({ name, sprite, shortEntry, category, id, generationIntroduced, cost }) => ({
      id: {
        render: `#${id}`,
        onClick: () => onCellClick(name),
        sortBy: id,
      },
      name: {
        render: (
          <Stack direction="row" gap={1} alignItems="center">
            {sprite ? (
              <Image src={sprite} alt={name} width={32} height={32} />
            ) : (
              <Box width={32} height={32} />
            )}
            <Typography whiteSpace="nowrap">{capitalise(removeDash(name))}</Typography>
          </Stack>
        ),
        onClick: () => onCellClick(name),
        sortBy: name,
      },
      shortEntry: {
        render: shortEntry,
        onClick: () => onCellClick(name),
      },
      cost: {
        render: (
          <Typography>
            <PokeCurrency>$</PokeCurrency>
            {cost.toLocaleString()}
          </Typography>
        ),
        onClick: () => onCellClick(name),
        sortBy: cost,
      },
      category: {
        render: capitalise(removeDash(category)),
        onClick: () => onCellClick(name),
        sortBy: category,
        sx: {
          whiteSpace: 'nowrap',
        },
      },
      generation: {
        render: generationIntroduced,
        onClick: () => onCellClick(name),
        sx: {
          whiteSpace: 'nowrap',
        },
      },
    }),
  );

  return (
    <CustomTable
      paginated
      columns={columns}
      data={data}
      customKey="item-table"
      initial="hidden"
      animate="show"
      exit="exit"
      variants={fadeInUpVariant}
      {...rest}
    />
  );
};

export default ItemTable;
