// types
import type { Berry, ItemAttribute, ItemCategory, ItemFlingEffect } from 'pokenode-ts';
// helpers
import { BerryApi, ItemApi } from '@/services';
import { type ExtractedItem, formatItemData } from '@/helpers';
import { notFound } from 'next/navigation';
// components
import { ItemPage } from '@/PageComponents';
import { unusedItems } from '@/constants';

export interface PokestatsItemPageProps {
  item: ExtractedItem;
  category: ItemCategory;
  categoryItems: ExtractedItem[];
  flingEffect: ItemFlingEffect | null;
  attributes: ItemAttribute[];
  berryData: Berry | null;
}

const PokestatsItemPage = async ({ params }: { params: { itemName: string } }) => {
  const itemName = params.itemName;

  try {
    const itemData = await ItemApi.getByName(itemName);

    if (!itemData) {
      notFound();
    }

    const formattedItemData = formatItemData(itemData);

    // Fetch category, fling effect, and attributes concurrently
    const [categoryData, flingEffectData, attributesData] = await Promise.all([
      ItemApi.getCategoryByName(formattedItemData.category),
      formattedItemData.fling_effect
        ? ItemApi.getFlingEffectByName(formattedItemData.fling_effect.name)
        : Promise.resolve(null),
      ItemApi.getAttributesByNames(formattedItemData.attributes),
    ]);

    if (!categoryData || !attributesData) {
      notFound();
    }

    // Fetch category items concurrently and filter afterwards
    const categoryItemNames = categoryData.items.map(({ name }) => name);
    const categoryItemsData = (await ItemApi.getByNames(categoryItemNames))
      .map(formatItemData)
      .filter(({ category, name }) => category !== 'unused' && name !== itemName)
      .sort((a, b) => a.name.localeCompare(b.name));

    // Get berry data if the item belongs to the 'berries' pocket
    const berryData =
      categoryData.pocket.name === 'berries'
        ? await BerryApi.getByName(itemData.name.split('-')[0])
        : null;

    return (
      <ItemPage
        item={formattedItemData}
        category={categoryData}
        categoryItems={categoryItemsData}
        flingEffect={flingEffectData}
        attributes={attributesData}
        berryData={berryData}
      />
    );
  } catch (error) {
    console.error(error);
    notFound();
  }
};

export async function generateStaticParams() {
  const itemList = await ItemApi.listItems();

  return itemList.results
    .filter(({ name }) => !unusedItems.includes(name))
    .map(({ name }) => ({
      itemName: name,
    }));
}

export default PokestatsItemPage;
