// types
import type { NamedAPIResource } from 'pokenode-ts';
import type { Metadata } from 'next';
// helpers
import { ItemApi } from '@/services';
import {
  type ExtractedItem,
  formatItemData,
  formatItemPocket,
  type FormattedItemPocket,
} from '@/helpers';
import { notFound } from 'next/navigation';
// components
import { ItemListPage } from '@/PageComponents';

export interface PokestatsItemsPageProps {
  itemData: ExtractedItem[];
  itemPocketNames: string[];
  itemPocketData: FormattedItemPocket[];
  allItemAttributes: NamedAPIResource[];
}

export const metadata: Metadata = {
  title: 'Pokémon Item Dex - Browse All Pokémon Items',
  description: 'Discover all Pokémon items including held items, evolution stones, and more.',
  keywords: [
    'pokemon items',
    'pokemon dex items',
    'pokestats items',
    'pokemon db items',
    'pokemondb items',
    'pokemon item list',
    'pokemon all items',
    'pokemon items list',
  ],
};

const PokestatsItemsPage = async () => {
  try {
    const [itemPocketNames, allItemNames, { results: allItemAttributes }] = await Promise.all([
      ItemApi.getAllItemPocketNames(),
      ItemApi.getAllItemNames(),
      ItemApi.listItemAttributes(),
    ]);

    if (!itemPocketNames || !allItemNames || !allItemAttributes) {
      notFound();
    }

    const [itemData, itemPocketData] = await Promise.all([
      ItemApi.getByNames(allItemNames),
      ItemApi.getItemPocketByNames(itemPocketNames),
    ]);

    if (!itemData || !itemPocketData) {
      notFound();
    }

    // Filter and format item data
    const formattedItems: ExtractedItem[] = itemData
      .map(formatItemData)
      .filter(({ category }) => category !== 'unused')
      .sort((a, b) => a.name.localeCompare(b.name));

    return (
      <ItemListPage
        itemData={formattedItems}
        itemPocketNames={itemPocketNames}
        itemPocketData={formatItemPocket(itemPocketData)}
        allItemAttributes={allItemAttributes}
      />
    );
  } catch (error) {
    console.error(error);
    notFound();
  }
};

export default PokestatsItemsPage;
