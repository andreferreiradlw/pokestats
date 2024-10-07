// types
import type { Berry } from 'pokenode-ts';
// helpers
import { BerryApi, ItemApi } from '@/services';
import { formatItemData, type ExtractedItem } from '@/helpers';
import { notFound } from 'next/navigation';
// components
import { BerryListPage } from '@/PageComponents';

export type BerryItem = Partial<ExtractedItem> & Berry;

export interface PokestatsBerriesPageProps {
  berryData: BerryItem[];
}

const PokestatsBerriesPage = async () => {
  try {
    const berryNames = await BerryApi.getAllNames();

    if (!berryNames) {
      notFound();
    }

    const berryData = await BerryApi.getByNames(berryNames);

    if (!berryData) {
      notFound();
    }

    const itemData = await ItemApi.getByNames(berryData.map(({ item }) => item.name));

    if (!itemData) {
      notFound();
    }

    const formattedItems = itemData.map(formatItemData);

    const combinedInformation: BerryItem[] = berryData.map(berry => {
      const foundItem = formattedItems.find(item => item.name === berry.item.name);
      return foundItem ? { ...foundItem, ...berry } : { ...berry };
    });

    return <BerryListPage berryData={combinedInformation} />;
  } catch (error) {
    console.error(error);
    notFound();
  }
};

export default PokestatsBerriesPage;
