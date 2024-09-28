// types
import type { GetStaticProps, NextPage } from 'next';
// helpers
import { ItemApi } from '@/services';
// components
import LayoutV2 from '@/components/LayoutV2';
import ItemListPage from '@/components/ItemListPage';
import Seo from '@/components/Seo'; // Import Seo component
import {
  type ExtractedItem,
  formatItemData,
  formatItemPocket,
  type FormattedItemPocket,
} from '@/helpers';

export interface PokestatsItemsPageProps {
  itemData: ExtractedItem[];
  itemPocketNames: string[];
  itemPocketData: FormattedItemPocket[];
}

const PokestatsItemsPage: NextPage<PokestatsItemsPageProps> = ({
  itemData,
  itemPocketNames,
  itemPocketData,
}) => {
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
        <ItemListPage
          itemData={itemData}
          itemPocketNames={itemPocketNames}
          itemPocketData={itemPocketData}
        />
      </LayoutV2>
    </>
  );
};

export const getStaticProps: GetStaticProps<PokestatsItemsPageProps> = async () => {
  const [itemPocketNames, allItemNames] = await Promise.all([
    ItemApi.getAllItemPocketNames(),
    ItemApi.getAllItemNames(),
  ]);

  if (!itemPocketNames || !allItemNames) {
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

  const formattedItemPocket = formatItemPocket(itemPocketData);

  return {
    props: {
      itemData: formattedItems,
      itemPocketNames,
      itemPocketData: formattedItemPocket,
    },
  };
};

export default PokestatsItemsPage;
