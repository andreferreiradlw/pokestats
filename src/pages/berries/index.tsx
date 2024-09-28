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

// Define a new type that combines ExtractedItem and Berry
export type BerryItem = Partial<ExtractedItem> & Berry;

export interface PokestatsBerriesPageProps {
  berryData: BerryItem[];
}

const PokestatsBerriesPage: NextPage<PokestatsBerriesPageProps> = props => {
  // Define values for SEO
  const seoTitle = 'Pokémon Berry List - Browse All Pokémon Berries';

  return (
    <>
      <Seo
        title={seoTitle}
        description="test"
        type="website"
        datePublished={new Date().toISOString()}
        dateModified={new Date().toISOString()}
      />
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
