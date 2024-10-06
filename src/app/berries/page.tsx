// types
import type { Berry } from 'pokenode-ts';
// helpers
import { BerryApi, ItemApi } from '@/services';
import { formatItemData, type ExtractedItem } from '@/helpers';
// components
import { BerryListPage } from '@/PageComponents';

export type BerryItem = Partial<ExtractedItem> & Berry;

export interface PokestatsBerriesPageProps {
  berryData: BerryItem[];
}

export default async function PokestatsBerriesPage() {
  const berryNames = await BerryApi.getAllNames();

  const berryData = await BerryApi.getByNames(berryNames);

  const itemData = await ItemApi.getByNames(berryData.map(({ item }) => item.name));

  const formattedItems = itemData.map(formatItemData);

  const combinedInformation: BerryItem[] = berryData.map(berry => {
    const foundItem = formattedItems.find(item => item.name === berry.item.name);
    return foundItem ? { ...foundItem, ...berry } : { ...berry };
  });

  return <BerryListPage berryData={combinedInformation} />;
}
