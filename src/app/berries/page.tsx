// types
import type { Berry } from 'pokenode-ts';
import type { Metadata } from 'next';
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

export const metadata: Metadata = {
  title: 'Pokémon Berry Dex - Browse All Pokémon Berries',
  description:
    'Explore the complete list of Pokémon Berries, including their effects, growth time, firmness, size, and other key attributes. Whether you are planning a battle strategy or crafting Pokéblocks and Poffins, this comprehensive guide provides detailed information about each Berry’s unique characteristics and usage.',
  keywords: [
    'pokemon berries',
    'pokemon dex berries',
    'pokestats berries',
    'pokemon db berries',
    'pokemondb berries',
    'pokemon berry list',
    'pokemon all berries',
    'pokemon berries list',
  ],
};

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
