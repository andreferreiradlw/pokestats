// types
import type { PokestatsItemPageProps } from '@/pages/item/[itemName]';
// helpers
import { findEnglishName } from '@/helpers';
import { useBreakpoint } from '@/hooks';
// components
import { Divider, Grid2, Stack, Typography } from '@mui/material';
import ItemDetails from './ItemDetails';
import Image from 'next/image';

const ItemPage = ({ item, category, categoryItems }: PokestatsItemPageProps): JSX.Element => {
  // breakpoint
  const isLargeUp = useBreakpoint({ breakpoint: 'lg' });

  return (
    <Stack gap={4}>
      <Stack>
        <Stack flexDirection="row" gap={1} alignItems="center">
          <Typography variant="pageHeading">{findEnglishName(item.names)}</Typography>
          <Image src={item.sprite} alt={item.name} width={64} height={64} />
        </Stack>
        <Typography variant="sectionSubTitle" gutterBottom>
          {item.longEntry}
        </Typography>
        <Typography variant="sectionMessage" textAlign="left">
          {item.shortEntry}
        </Typography>
      </Stack>

      <Grid2 container spacing={4} direction={{ xxs: 'column', lg: 'row' }} size={12}>
        <ItemDetails size={{ xxs: 12, lg: 4 }} category={category} item={item} />
        <Grid2 size={{ xxs: 12, lg: 6 }}>flavor</Grid2>
        {isLargeUp && <Grid2 size={2}>icon</Grid2>}
      </Grid2>
      <Divider />
    </Stack>
  );
};

export default ItemPage;
