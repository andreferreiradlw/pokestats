// types
import type { Type } from 'pokenode-ts';
// helpers
import { TypesApi } from '@/services';
import { notFound } from 'next/navigation';
// components
import { TypePage } from '@/PageComponents';

export interface PokestatsTypePageProps {
  typeData: Type;
}

const PokestatsTypePage = async ({ params }: { params: { typeId: string } }) => {
  const typeName = params.typeId;

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
    typeId: name,
  }));
}

export default PokestatsTypePage;
