// types
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import type { ItemCategory } from 'pokenode-ts';
// helpers
import { ItemApi } from '@/services';
// components
import LayoutV2 from '@/components/LayoutV2';
import { type ExtractedItem, formatItemData } from '@/helpers';

export interface PokestatsItemPageProps {
  item: ExtractedItem;
  category: ItemCategory;
  categoryItems: ExtractedItem[];
}

const PokestatsItemPage: NextPage<PokestatsItemPageProps> = props => {
  console.log('item', props);

  return (
    <LayoutV2 withHeader customKey={`item-${props.item?.id}-page`}>
      m
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

    const categoryData = await ItemApi.getCategoryByName(itemData.category.name);

    const categoryItemNames = categoryData.items.map(({ name }) => name);

    const categoryItemsData = (await ItemApi.getByNames(categoryItemNames))
      .map(formatItemData)
      .filter(
        ({ shortEntry, longEntry, category }) =>
          shortEntry !== '' && longEntry !== '' && category !== 'unused',
      )
      .filter(({ name }) => name !== itemName)
      .sort((a, b) => a.name.localeCompare(b.name));

    return {
      props: {
        item: formatItemData(itemData),
        category: categoryData,
        categoryItems: categoryItemsData,
      },
    };
  } catch (error) {
    console.error('Error fetching move data:', error);
    return { notFound: true };
  }
};

export default PokestatsItemPage;
