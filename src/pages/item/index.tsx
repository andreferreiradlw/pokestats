// types
import type { GetStaticProps, NextPage } from 'next';
// helpers
import { ItemApi } from '@/services';
// components
import Head from 'next/head';
import LayoutV2 from '@/components/LayoutV2';
import ItemListPage from '@/components/ItemListPage';
import { type ExtractedItem, formatItemData } from '@/helpers';
import type { ItemPocket } from 'pokenode-ts';

export interface PokestatsItemsPageProps {
  itemData: ExtractedItem[];
  itemPocketNames: string[];
  itemPocketData: ItemPocket[];
}

const PokestatsItemsPage: NextPage<PokestatsItemsPageProps> = props => {
  console.log(props);
  return (
    <>
      <Head>
        <meta property="og:title" content="Regions" />
      </Head>
      <LayoutV2 withHeader customKey="regions-homepage">
        <ItemListPage {...props} />
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

  const itemData = await ItemApi.getByNames(allItemNames);
  const itemPocketData = await ItemApi.getItemPocketByNames(itemPocketNames);

  // const [itemData, itemPocketData] = await Promise.all([
  //   ItemApi.getByNames(allItemNames),
  //   ItemApi.getItemPocketByNames(itemPocketNames),
  // ]);

  // if (!itemData || !itemPocketData) {
  //   return { notFound: true };
  // }

  // // Filter out unused items
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
      itemPocketData,
    },
  };
};

export default PokestatsItemsPage;
