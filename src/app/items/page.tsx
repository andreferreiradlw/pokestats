// types
import type { NamedAPIResource } from 'pokenode-ts';
// helpers
import { ItemApi } from '@/services';
import {
  type ExtractedItem,
  formatItemData,
  formatItemPocket,
  type FormattedItemPocket,
} from '@/helpers';
// components
import { ItemListPage } from '@/PageComponents';

export interface PokestatsItemsPageProps {
  itemData: ExtractedItem[];
  itemPocketNames: string[];
  itemPocketData: FormattedItemPocket[];
  allItemAttributes: NamedAPIResource[];
}

export default async function PokestatsItemsPage() {
  const [itemPocketNames, allItemNames, { results: allItemAttributes }] = await Promise.all([
    ItemApi.getAllItemPocketNames(),
    ItemApi.getAllItemNames(),
    ItemApi.listItemAttributes(),
  ]);

  if (!itemPocketNames || !allItemNames || !allItemAttributes) {
    throw new Error('Data not found');
  }

  const [itemData, itemPocketData] = await Promise.all([
    ItemApi.getByNames(allItemNames),
    ItemApi.getItemPocketByNames(itemPocketNames),
  ]);

  if (!itemData || !itemPocketData) {
    throw new Error('Data not found');
  }

  // Filter and format item data
  const formattedItems: ExtractedItem[] = itemData
    .map(formatItemData)
    .filter(({ category }) => category !== 'unused')
    .sort((a, b) => a.name.localeCompare(b.name));

  // Return the page content with the fetched data
  return (
    <ItemListPage
      itemData={formattedItems}
      itemPocketNames={itemPocketNames}
      itemPocketData={formatItemPocket(itemPocketData)}
      allItemAttributes={allItemAttributes}
    />
  );
}
