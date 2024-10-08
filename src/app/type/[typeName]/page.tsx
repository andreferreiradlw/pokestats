export const runtime = 'nodejs';

// types
import type { Type } from 'pokenode-ts';
import type { Metadata } from 'next';
// helpers
import { TypesApi } from '@/services';
import { notFound } from 'next/navigation';
import { findEnglishName } from '@/helpers';
// components
import { TypePage } from '@/PageComponents';

export interface PokestatsTypePageProps {
  typeData: Type;
}

interface TypePageParams {
  params: { typeName: string };
}

export async function generateMetadata({
  params: { typeName },
}: TypePageParams): Promise<Metadata> {
  const { names } = await TypesApi.getByName(typeName);

  const typeEnglishName = findEnglishName(names);

  return {
    title: `${typeEnglishName} Type - Pokémon & Moves Dex`,
    description: `Explore the ${typeEnglishName} type in the Pokémon world, including strengths, weaknesses, and key Pokémon. Learn about the ${typeEnglishName} type's unique characteristics and how it fits into battles.`,
    keywords: [
      `pokemon ${typeEnglishName}`,
      `pokestats ${typeEnglishName}`,
      `pokemon db ${typeEnglishName}`,
      `pokemondb ${typeEnglishName}`,
      `${typeEnglishName} pokemon db`,
      `${typeEnglishName} pokemon list`,
      `list of ${typeEnglishName} type pokemon`,
      `${typeEnglishName} type move list`,
      `gg ${typeEnglishName}`,
      `${typeEnglishName} type pokemon`,
      `${typeEnglishName} pokemon`,
      `all ${typeEnglishName} pokemon`,
      `all ${typeEnglishName} type pokemon`,
      `all ${typeEnglishName} type moves`,
      `${typeEnglishName} pokemon moves`,
    ],
  };
}

const PokestatsTypePage = async ({ params: { typeName } }: TypePageParams) => {
  try {
    const typeData = await TypesApi.getByName(typeName);

    if (!typeData) {
      notFound();
    }

    return <TypePage typeData={typeData} />;
  } catch (error) {
    console.error(error);
    notFound();
  }
};

export async function generateStaticParams() {
  const typeList = await TypesApi.getAll();

  return typeList.map(({ name }) => ({
    typeName: name,
  }));
}

export default PokestatsTypePage;
