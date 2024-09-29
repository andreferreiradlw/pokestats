// types
import type { GetStaticProps, NextPage } from 'next';
import type { Berry } from 'pokenode-ts';
// helpers
import { BerryApi, ItemApi } from '@/services';
import { type ExtractedItem, formatItemData } from '@/helpers';
// components
import LayoutV2 from '@/components/LayoutV2';
import Seo from '@/components/Seo';
import BerryListPage from '@/components/BerryListPage';

export type BerryItem = Partial<ExtractedItem> & Berry;

export interface PokestatsBerriesPageProps {
  berryData: BerryItem[];
}

const PokestatsBerriesPage: NextPage<PokestatsBerriesPageProps> = props => {
  // Define values for SEO
  const seoTitle = 'Pokémon Berry List - Browse All Pokémon Berries';
  const seoDescription =
    "Explore the complete list of Pokémon Berries, including their effects, growth time, firmness, size, and other key attributes. Whether you're planning a battle strategy or crafting Pokéblocks and Poffins, this comprehensive guide provides detailed information about each Berry’s unique characteristics and usage.";
  const seoKeywords =
    'Pokémon Berries, Pokémon Berry List, Berry Effects, Pokémon Items, Growth Time, Soil Dryness, Berry Firmness, Pokémon Stat Enhancements, Pokéblocks, Poffins, Pokémon Strategy, Berry Smoothness, Max Berries, Berry Sizes, Pokémon Berry Guide, Pokémon Berry Database';

  return (
    <>
      <Seo title={seoTitle} description={seoDescription} keywords={seoKeywords} />
      <LayoutV2 withHeader customKey="berry-list-page">
        <BerryListPage {...props} />
      </LayoutV2>
    </>
  );
};

export const getStaticProps: GetStaticProps<PokestatsBerriesPageProps> = async () => {
  const berryNames = await BerryApi.getAllNames();

  if (!berryNames) {
    return { notFound: true };
  }

  const berryData = await BerryApi.getByNames(berryNames);

  if (!berryData) {
    return { notFound: true };
  }

  const itemData = await ItemApi.getByNames(berryData.map(({ item }) => item.name));

  if (!itemData) {
    return { notFound: true };
  }

  const formattedItems = itemData.map(formatItemData);

  const combinedInformation: BerryItem[] = berryData.map(berry => {
    const foundItem = formattedItems.find(item => item.name === berry.item.name);
    // Spread foundItem only if it exists, else spread berry only
    return foundItem ? { ...foundItem, ...berry } : { ...berry };
  });

  return {
    props: {
      berryData: combinedInformation,
    },
  };
};

export default PokestatsBerriesPage;
