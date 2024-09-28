// types
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import type { ItemAttribute, ItemCategory, ItemFlingEffect } from 'pokenode-ts';
// helpers
import { ItemApi } from '@/services';
// components
import LayoutV2 from '@/components/LayoutV2';
import { type ExtractedItem, findEnglishName, formatItemData } from '@/helpers';
import ItemPage from '@/components/ItemPage';
import Seo from '@/components/Seo';

export interface PokestatsItemPageProps {
  item: ExtractedItem;
  category: ItemCategory;
  categoryItems: ExtractedItem[];
  flingEffect: ItemFlingEffect | null;
  attributes: ItemAttribute[];
}

const PokestatsItemPage: NextPage<PokestatsItemPageProps> = props => {
  // item data
  const { names, longEntry, sprite, generationIntroduced, id } = props.item;

  const itemName = findEnglishName(names);
  const categoryName = findEnglishName(props.category.names);

  // Generate dynamic SEO content based on the item details
  const seoTitle = `${itemName} - Pokémon ${categoryName} Item`;
  const seoDescription = `${longEntry} ${categoryName} Pokémon item introduced in ${generationIntroduced}.`;
  const seoImage = sprite !== '' ? sprite : '/static/pokestats_logo.png';
  const keywords = `Pokémon item, Pokémon item details, Pokémon item effects, best held items for Pokémon, how to use ${itemName} in Pokémon, ${itemName} usage in Pokémon games, all ${categoryName} items in Pokémon`;

  return (
    <LayoutV2 withHeader customKey={`item-${id}-page`}>
      <Seo
        title={seoTitle}
        description={seoDescription}
        image={seoImage}
        type="article"
        datePublished={new Date().toISOString()}
        dateModified={new Date().toISOString()}
        authorName="Andre Ferreira"
        keywords={keywords}
      />
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

    // Fetch category, fling effect, and attributes concurrently
    const [categoryData, flingEffectData, attributesData] = await Promise.all([
      ItemApi.getCategoryByName(formattedItemData.category),
      formattedItemData.fling_effect
        ? ItemApi.getFlingEffectByName(formattedItemData.fling_effect.name)
        : Promise.resolve(null),
      ItemApi.getAttributesByNames(formattedItemData.attributes),
    ]);

    // Fetch category items concurrently and filter afterwards
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
        item: formattedItemData,
        category: categoryData,
        categoryItems: categoryItemsData,
        flingEffect: flingEffectData,
        attributes: attributesData,
      },
    };
  } catch (error) {
    console.error('Error fetching item data:', error);
    return { notFound: true };
  }
};

export default PokestatsItemPage;
