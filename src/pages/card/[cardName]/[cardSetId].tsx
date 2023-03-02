// types
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import type { MoveType, Pokemon, PokemonType } from '@/types';
// helpers
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';
import { useRouter } from 'next/router';
import { formatCardName } from '@/helpers';
// components
import Loading from '@/components/Loading';
import Head from 'next/head';
import CardPage from '@/components/CardPage';
import Layout from '@/components/Layout';

export interface SingleCardPageProps {
  autocompleteList: (Pokemon | PokemonType | MoveType)[];
  card: PokemonTCG.Card;
}

const SingleCardPage: NextPage<SingleCardPageProps> = ({ autocompleteList, ...rest }) => {
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

  // console.log('card', card);

  return (
    <>
      <Head>
        {/* <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content={`${moveName}, Move, Pokémon, Pokémon Move, ${capitalise(
            props.move.type.name,
          )} Type, Move, TM, HM, TR, Machines, Target, Effect, PP, Accuracy, Power`}
        />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} /> */}
      </Head>
      <Layout withHeader={{ autocompleteList: autocompleteList }}>
        <CardPage {...rest} />
      </Layout>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // clients
  const [baseSetCards] = await Promise.all([PokemonTCG.findCardsByQueries({ q: `id:base1` })]);

  const paths = baseSetCards.map(({ name, id }) => {
    return {
      params: {
        cardName: formatCardName(name),
        cardSetId: id,
      },
    };
  });

  // return static paths
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { cardName, cardSetId } = params as { cardName: string; cardSetId: string };

  try {
    // get card
    const name = cardName.split('-').at(-1);

    const [pageCard] = await Promise.all([PokemonTCG.findCardByID(cardSetId)]);

    if (!pageCard) {
      console.log('Failed to fetch card data', cardName, cardSetId, name);
      return { notFound: true };
    }

    if (formatCardName(cardName) !== formatCardName(pageCard.name)) {
      console.log('Card name does not match fetched card: ', name, pageCard.name);
      return { notFound: true };
    }

    return {
      props: { card: pageCard },
    };
  } catch (error) {
    console.error(error);
    // redirects to 404 page
    return { notFound: true };
  }
};

export default SingleCardPage;
