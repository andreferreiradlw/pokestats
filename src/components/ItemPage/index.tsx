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
import ItemFlavorText from './ItemFlavorText';
import CategoryItems from './CategoryItems';

const ItemPage = ({
  item,
  category,
  categoryItems,
  attributes,
  flingEffect,
}: PokestatsItemPageProps): JSX.Element => (
  <Stack gap={4}>
    <Stack>
      <Stack flexDirection="row" gap={1} alignItems="center">
        <Typography variant="pageHeading">{findEnglishName(item.names)}</Typography>
        <Image src={item.sprite} alt={item.name} width={100} height={100} />
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
    <Grid2 container spacing={4} direction={{ xxs: 'column', lg: 'row' }} size={12}>
      <ItemFlavorText size={{ xxs: 12, lg: 10 }} flavorTexts={item.flavourTextEntries} />
    </Grid2>
    <Divider />
    <CategoryItems category={category} categoryItems={categoryItems} />
  </Stack>
);

export default ItemPage;
