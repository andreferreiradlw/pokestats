// types
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import type { ItemAttribute, ItemCategory, ItemFlingEffect } from 'pokenode-ts';
// helpers
import { ItemApi } from '@/services';
// components
import LayoutV2 from '@/components/LayoutV2';
import { type ExtractedItem, formatItemData } from '@/helpers';
import ItemPage from '@/components/ItemPage';

export interface PokestatsItemPageProps {
  item: ExtractedItem;
  category: ItemCategory;
  categoryItems: ExtractedItem[];
  flingEffect: ItemFlingEffect | null;
  attributes: ItemAttribute[];
}

const PokestatsItemPage: NextPage<PokestatsItemPageProps> = props => {
  console.log('item', props);

  return (
    <LayoutV2 withHeader customKey={`item-${props.item?.id}-page`}>
      <ItemPage {...props} />
    </LayoutV2>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const itemList = await ItemApi.listItems(0, 50);

  const paths = itemList.results.map(({ name }) => ({
    params: { itemName: name },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<PokestatsItemPageProps> = async ({ params }) => {
  const itemName = params?.itemName as string;

  try {
    const itemData = await ItemApi.getByName(itemName);

    if (!itemData) {
      return { notFound: true };
    }

    const formattedItemData = formatItemData(itemData);

    const categoryData = await ItemApi.getCategoryByName(formattedItemData.category);

    const categoryItemNames = categoryData.items.map(({ name }) => name);

    const categoryItemsData = (await ItemApi.getByNames(categoryItemNames))
      .map(formatItemData)
      .filter(
        ({ shortEntry, longEntry, category }) =>
          shortEntry !== '' && longEntry !== '' && category !== 'unused',
      )
      .filter(({ name }) => name !== itemName)
      .sort((a, b) => a.name.localeCompare(b.name));

    let flingEffectData: ItemFlingEffect | null = null;

    if (formattedItemData.fling_effect) {
      flingEffectData = await ItemApi.getFlingEffectByName(formattedItemData.fling_effect.name);
    }

    const atributtesData = await ItemApi.getAttributesByNames(formattedItemData.attributes);

    return {
      props: {
        item: formattedItemData,
        category: categoryData,
        categoryItems: categoryItemsData,
        flingEffect: flingEffectData,
        attributes: atributtesData,
      },
    };
  } catch (error) {
    console.error('Error fetching move data:', error);
    return { notFound: true };
  }
};

export default PokestatsItemPage;
