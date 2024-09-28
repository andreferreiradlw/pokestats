// types
import type { GetStaticProps, NextPage } from 'next';
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
import LayoutV2 from '@/components/LayoutV2';
import ItemListPage from '@/components/ItemListPage';
import Seo from '@/components/Seo';

export interface PokestatsItemsPageProps {
  itemData: ExtractedItem[];
  itemPocketNames: string[];
  itemPocketData: FormattedItemPocket[];
  allItemAttributes: NamedAPIResource[];
}

const PokestatsItemsPage: NextPage<PokestatsItemsPageProps> = props => {
  // Define values for SEO
  const seoTitle = 'Pokémon Items List - Browse All Pokémon Items';
  const seoDescription =
    'Discover all Pokémon items including held items, evolution stones, and more.';
  const seoKeywords =
    'Pokémon items, held items, evolution stones, Pokémon item browser, Pokémon item list, Pokédex items, Pokémon stats, Pokestats, Pokémon item database';

  return (
    <>
      <Seo
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        type="website"
        datePublished={new Date().toISOString()}
        dateModified={new Date().toISOString()}
      />
      <LayoutV2 withHeader customKey="item-list-page">
        <ItemListPage {...props} />
      </LayoutV2>
    </>
  );
};

export const getStaticProps: GetStaticProps<PokestatsItemsPageProps> = async () => {
  const [itemPocketNames, allItemNames, { results: allItemAttributes }] = await Promise.all([
    ItemApi.getAllItemPocketNames(),
    ItemApi.getAllItemNames(),
    ItemApi.listItemAttributes(),
  ]);

  if (!itemPocketNames || !allItemNames || !allItemAttributes) {
    return { notFound: true };
  }

  const [itemData, itemPocketData] = await Promise.all([
    ItemApi.getByNames(allItemNames),
    ItemApi.getItemPocketByNames(itemPocketNames),
  ]);

  if (!itemData || !itemPocketData) {
    return { notFound: true };
  }

  // Filter and format item data
  const formattedItems: ExtractedItem[] = itemData
    .map(formatItemData)
    .filter(
      ({ shortEntry, longEntry, category }) =>
        shortEntry !== '' && longEntry !== '' && category !== 'unused',
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  return {
    props: {
      itemData: formattedItems,
      itemPocketNames,
      itemPocketData: formatItemPocket(itemPocketData),
      allItemAttributes,
    },
  };
};

export default PokestatsItemsPage;
