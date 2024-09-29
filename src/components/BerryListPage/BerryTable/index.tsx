// types
import type { BerryItem } from '@/pages/berries';
// helpers
import { fadeInUpVariant } from '@/animations';
import { capitalise, removeDash } from '@/helpers';
import { usePlausible } from 'next-plausible';
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
  // analytics
  const plausible = usePlausible();

  // Define table columns
  const columns: Column[] = [
    { field: 'name', headerName: 'Name', sortable: true, defaultSort: true },
    { field: 'effect', headerName: 'Effect' },
    {
      field: 'growth',
      headerName: 'Growth Time',
      sortable: true,
      tooltipText:
        'Time it takes the tree to grow one stage, in hours. Berry trees go through four of these growth stages before they can be picked.',
    },
    {
      field: 'smoothness',
      headerName: 'Smoothness',
      sortable: true,
      tooltipText: 'The smoothness of this Berry, used in making Pokéblocks or Poffins.',
    },
    {
      field: 'soilDryness',
      headerName: 'Soil Dryness',
      sortable: true,
      tooltipText:
        'The speed at which this Berry dries out the soil as it grows. A higher rate means the soil dries more quickly.',
    },
    {
      field: 'firmness',
      headerName: 'Firmness',
      tooltipText: 'The firmness of this berry, used in making Pokéblocks or Poffins.',
    },
    { field: 'size', headerName: 'Size', sortable: true },
    {
      field: 'maxBerries',
      headerName: 'Max Berries',
      sortable: true,
      tooltipText:
        'The maximum number of these berries that can grow on one tree in Generation IV.',
    },
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
        sx: { whiteSpace: 'nowrap' },
        sortBy: size,
      },
      maxBerries: {
        render: max_harvest,
        align: 'center',
      },
      itemInfo: {
        render: (
          <Link href={`/item/${item.name}`}>
            <CustomButton
              variant="contained"
              color="secondary"
              sx={{ whiteSpace: 'nowrap' }}
              onClick={() => plausible('Berry Table Click')}
            >
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
