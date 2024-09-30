// types
import type { NextPage } from 'next';
// components
import LayoutV2 from '@/components/LayoutV2';
import Seo from '@/components/Seo';
import MovesListPage from '@/components/MovesListPage';

const PokestatsMovesPage: NextPage = () => {
  // Define values for SEO
  const seoTitle = 'Pokémon Moves List - Browse All Pokémon Moves';
  const seoDescription =
    "Explore the complete list of Pokémon Berries, including their effects, growth time, firmness, size, and other key attributes. Whether you're planning a battle strategy or crafting Pokéblocks and Poffins, this comprehensive guide provides detailed information about each Berry’s unique characteristics and usage.";
  const seoKeywords =
    'Pokémon Berries, Pokémon Berry List, Berry Effects, Pokémon Items, Growth Time, Soil Dryness, Berry Firmness, Pokémon Stat Enhancements, Pokéblocks, Poffins, Pokémon Strategy, Berry Smoothness, Max Berries, Berry Sizes, Pokémon Berry Guide, Pokémon Berry Database';

  return (
    <>
      <Seo title={seoTitle} description={seoDescription} keywords={seoKeywords} />
      <LayoutV2 withHeader customKey="berry-list-page">
        <MovesListPage />
      </LayoutV2>
    </>
  );
};

export default PokestatsMovesPage;
