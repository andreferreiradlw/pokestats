// types
import type { BerryItem } from '@/pages/berries';
// helpers
import { fadeInUpVariant } from '@/animations';
import { capitalise, removeDash } from '@/helpers';
// components
import { Box, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import CustomTable, {
  type Column,
  type Row,
  type CustomTableProps,
} from '@/components/CustomTable';
import CustomButton from '@/components/CustomButton';
import Link from 'next/link';

interface BerryTableProps extends Partial<CustomTableProps> {
  items: BerryItem[];
}

const BerryTable = ({ items }: BerryTableProps): JSX.Element => {
  // Define table columns
  const columns: Column[] = [
    { field: 'name', headerName: 'Name', sortable: true, defaultSort: true },
    { field: 'effect', headerName: 'Effect' },
    { field: 'growth', headerName: 'Growth Time', sortable: true },
    { field: 'smoothness', headerName: 'Smoothness', sortable: true },
    { field: 'soilDryness', headerName: 'Soil Dryness', sortable: true },
    { field: 'firmness', headerName: 'Firmness' },
    { field: 'size', headerName: 'Size', sortable: true },
    { field: 'maxBerries', headerName: 'Max Berries', sortable: true },
    { field: 'itemInfo', headerName: '' },
  ];

  // Transform items into rows for CustomTable
  const data: Row[] = items.map(
    ({
      name,
      growth_time,
      shortEntry,
      sprite,
      firmness,
      item,
      size,
      max_harvest,
      smoothness,
      soil_dryness,
    }) => ({
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
        sortBy: name,
      },
      effect: {
        render: shortEntry ?? 'Effect not available.',
      },
      growth: {
        render: growth_time,
        align: 'center',
      },
      firmness: {
        render: capitalise(removeDash(firmness.name)),
        sx: { whiteSpace: 'nowrap' },
      },
      smoothness: {
        render: smoothness,
        align: 'center',
      },
      soilDryness: {
        render: soil_dryness,
        align: 'center',
      },
      size: {
        render: `${size / 10} cm`,
        align: 'center',
        sortBy: size,
      },
      maxBerries: {
        render: max_harvest,
        align: 'center',
      },
      itemInfo: {
        render: (
          <Link href={`/item/${item.name}`}>
            <CustomButton variant="contained" color="secondary" sx={{ whiteSpace: 'nowrap' }}>
              Item Info
            </CustomButton>
          </Link>
        ),
      },
    }),
  );

  return (
    <CustomTable
      columns={columns}
      data={data}
      customKey="berry-table"
      initial="hidden"
      animate="show"
      exit="exit"
      variants={fadeInUpVariant}
    />
  );
};

export default BerryTable;
