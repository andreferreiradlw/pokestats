'use client';

// types
import type { PokestatsItemPageProps } from '@/app/item/[itemName]/page';
// helpers
import { findEnglishName } from '@/helpers';
import { track } from '@vercel/analytics/server';
// components
import { Divider, Grid2, Stack, Typography } from '@mui/material';
import ItemDetails from './ItemDetails';
import Image from 'next/image';
import ItemEffects from './ItemEffects';
import LanguageTable from '@/components/LanguageTable';
import ItemFlavorText from './ItemFlavorText';
import CategoryItems from './CategoryItems';
import BerryDetailsTable from './BerryDetailsTable';
import Link from 'next/link';
import CustomButton from '@/components/CustomButton';

const ItemPage = ({
  item,
  category,
  categoryItems,
  attributes,
  flingEffect,
  berryData,
}: PokestatsItemPageProps): JSX.Element => {
  // data
  const { sprite, names, name, shortEntry, longEntry, flavourTextEntries } = item;

  return (
    <Stack gap={4}>
      <Stack>
        <Stack flexDirection="row" gap={1} alignItems="center">
          <Typography variant="pageHeading">{findEnglishName(names)}</Typography>
          {berryData && sprite && <Image src={sprite} alt={name} width={100} height={100} />}
        </Stack>
        {shortEntry && (
          <Typography variant="sectionSubTitle" gutterBottom>
            {shortEntry}
          </Typography>
        )}
        {longEntry && (
          <Typography variant="sectionMessage" textAlign="left">
            {longEntry}
          </Typography>
        )}
      </Stack>
      <Grid2
        container
        spacing={4}
        direction={{ xxs: 'column-reverse', lg: 'row' }}
        size={12}
        wrap="nowrap"
      >
        <ItemDetails size={{ xxs: 12, lg: berryData ? 3 : 4 }} category={category} item={item} />
        <ItemEffects size={{ xxs: 12, lg: 5 }} attributes={attributes} flingEffect={flingEffect} />
        {berryData ? (
          <BerryDetailsTable size={{ xxs: 12, lg: 4 }} berry={berryData} />
        ) : (
          <Grid2 size={{ xxs: 12, lg: 4 }} alignItems="center" justifyContent="center">
            {sprite ? (
              <Image src={sprite} alt={name} width={100} height={100} />
            ) : (
              <Typography>No item image available.</Typography>
            )}
          </Grid2>
        )}
      </Grid2>
      <Divider />
      <Grid2 container spacing={4} direction={{ xxs: 'column', lg: 'row' }} size={12} wrap="nowrap">
        <ItemFlavorText size={{ xxs: 12, lg: 9 }} flavorTexts={flavourTextEntries} />
        <LanguageTable size={{ xxs: 12, lg: 3 }} names={names} />
      </Grid2>
      <Divider />
      <CategoryItems category={category} categoryItems={categoryItems} />
      <Grid2 size={12}>
        <Link href="/items" passHref legacyBehavior>
          <CustomButton
            size="large"
            variant="contained"
            onClick={() => track('Item Page - See All Items Click')}
          >
            See all items
          </CustomButton>
        </Link>
      </Grid2>
    </Stack>
  );
};

export default ItemPage;
