// types
import type { PokestatsItemPageProps } from '@/pages/item/[itemName]';
// helpers
import { findEnglishName } from '@/helpers';
// components
import { Divider, Grid2, Stack, Typography } from '@mui/material';
import ItemDetails from './ItemDetails';
import Image from 'next/image';
import ItemEffects from './ItemEffects';
import LanguageTable from '../LanguageTable';

const ItemPage = ({
  item,
  category,
  attributes,
  flingEffect,
}: PokestatsItemPageProps): JSX.Element => {
  return (
    <Stack gap={4}>
      <Stack>
        <Stack flexDirection="row" gap={1} alignItems="center">
          <Typography variant="pageHeading">{findEnglishName(item.names)}</Typography>
          <Image src={item.sprite} alt={item.name} width={64} height={64} />
        </Stack>
        <Typography variant="sectionSubTitle" gutterBottom>
          {item.shortEntry}
        </Typography>
        <Typography variant="sectionMessage" textAlign="left">
          {item.longEntry}
        </Typography>
      </Stack>
      <Grid2 container spacing={4} direction={{ xxs: 'column', lg: 'row' }} size={12} wrap="nowrap">
        <ItemDetails size={{ xxs: 12, lg: 3 }} category={category} item={item} />
        <ItemEffects size={{ xxs: 12, lg: 5 }} attributes={attributes} flingEffect={flingEffect} />
        <LanguageTable size={{ xxs: 12, lg: 4 }} names={item.names} />
      </Grid2>
      <Divider />
    </Stack>
  );
};

export default ItemPage;
