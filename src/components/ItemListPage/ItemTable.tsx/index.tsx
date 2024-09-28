import { useCallback } from 'react';
// helpers
import { useRouter } from 'next/router';
import { usePlausible } from 'next-plausible';
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

interface ItemTableProps extends Partial<CustomTableProps> {
  items: ExtractedItem[];
}

const ItemTable = ({ items }: ItemTableProps): JSX.Element => {
  // hooks
  const router = useRouter();
  const plausible = usePlausible();

  const onCellClick = useCallback(
    (itemName: ExtractedItem['name']) => {
      plausible('Item Table Click');
      router.push(`/item/${itemName}`);
    },
    [plausible, router],
  );

  // Define table columns
  const columns: Column[] = [
    { field: 'name', headerName: 'Name' },
    { field: 'category', headerName: 'Category' },
    { field: 'shortEntry', headerName: 'Effect' },
  ];

  // Transform items into rows for CustomTable
  const data: Row[] = items.map(({ name, sprite, shortEntry, category }) => ({
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
    },
    category: {
      render: capitalise(removeDash(category)),
      onClick: () => onCellClick(name),
      sx: {
        whiteSpace: 'nowrap',
      },
    },
    shortEntry: {
      render: shortEntry,
      onClick: () => onCellClick(name),
    },
  }));

  return (
    <CustomTable
      columns={columns}
      data={data}
      customKey="item-table"
      initial="hidden"
      animate="show"
      exit="exit"
      variants={fadeInUpVariant}
    />
  );
};

export default ItemTable;
