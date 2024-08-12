// types
import type { GetServerSideProps, NextPage } from 'next';
import type { MoveType, Pokemon, PokemonType } from '@/types';
// helpers
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';
import { useRouter } from 'next/router';
import { fetchAutocompleteData } from '@/helpers';
// components
import Loading from '@/components/Loading';
import Head from 'next/head';
import CardPage from '@/components/CardPage';
import Layout from '@/components/Layout';

export interface SingleCardPageProps {
  autocompleteList: (Pokemon | PokemonType | MoveType)[];
  card: PokemonTCG.Card;
}

const SingleCardPage: NextPage<SingleCardPageProps> = ({ autocompleteList, card }) => {
  // router
  const router = useRouter();

  if (router.isFallback) {
    return (
      <Loading
        flexheight="100vh"
        icon="record"
        text="Crafting Card"
        $iconWidth={{ xxs: '20%', xs: '15%', md: '10%', lg: '5%' }}
      />
    );
  }

  const { supertype, set, name } = card;

  // SEO
  const pageTitle = `${name} - ${set.series} ${set.name} - Pokestats.gg`;
  const pageDescription = `${name} from ${set.series} - ${set.name}, released on ${set.releaseDate}.`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta
          name="keywords"
          content={`${supertype}, ${name}, ${set.name}, ${set.series}, pokemon, trading, card, cards, evolution, api, developers, trading card game, trading cards, collectible card game, tcg, game, multiplayer, hobby`}
        />
      </Head>
      <Layout withHeader={{ autocompleteList: autocompleteList }}>
        <CardPage card={card} />
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<SingleCardPageProps> = async ({ params }) => {
  const { cardSetId } = params as { cardName: string; cardSetId: string };

  if (!cardSetId) {
    return { notFound: true };
  }

  try {
    // get card
    const [pageCard] = await Promise.all([PokemonTCG.findCardByID(cardSetId)]);

    if (!pageCard) {
      console.log('Failed to fetch card data');
      return { notFound: true };
    }

    const { allMovesData, allPokemonData, allTypesData } = await fetchAutocompleteData();

    if (!allPokemonData || !allTypesData || !allMovesData) {
      console.log('Failed to fetch autocomplete data');
      return { notFound: true };
    }

    return {
      props: {
        card: pageCard,
        autocompleteList: [...allPokemonData, ...allTypesData, ...allMovesData],
      },
    };
  } catch (error) {
    console.error(error);
    // redirects to 404 page
    return { notFound: true };
  }
};

export default SingleCardPage;
