// types
import type { Berry } from 'pokenode-ts';
// helpers
import { BerryApi, ItemApi } from '@/services';
import { formatItemData, type ExtractedItem } from '@/helpers';
// components
import BerryListPage from '@/components/BerryListPage';

export type BerryItem = Partial<ExtractedItem> & Berry;

export interface PokestatsBerriesPageProps {
  berryData: BerryItem[];
}

export default async function PokestatsBerriesPage() {
  const berryNames = await BerryApi.getAllNames();

  if (!berryNames) {
    throw new Error('Berries not found');
  }

  const berryData = await BerryApi.getByNames(berryNames);

  if (!berryData) {
    throw new Error('Berry data not found');
  }

  const itemData = await ItemApi.getByNames(berryData.map(({ item }) => item.name));

  if (!itemData) {
    throw new Error('Item data not found');
  }

  const formattedItems = itemData.map(formatItemData);

  const combinedInformation: BerryItem[] = berryData.map(berry => {
    const foundItem = formattedItems.find(item => item.name === berry.item.name);
    return foundItem ? { ...foundItem, ...berry } : { ...berry };
  });

  return <BerryListPage berryData={combinedInformation} />;
}
