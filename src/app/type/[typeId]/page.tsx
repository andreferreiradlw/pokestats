// types
import type { Type } from 'pokenode-ts';
// helpers
import { TypesApi } from '@/services';
// components
import TypePage from '@/components/TypePage';

export interface PokestatsTypePageProps {
  typeData: Type;
}

const PokestatsTypePage = async ({ params }: { params: { typeId: string } }) => {
  const typeName = params.typeId;

  const typeData = await TypesApi.getByName(typeName);

  if (!typeData) {
    throw new Error('Type data not found');
  }

  const props: PokestatsTypePageProps = {
    typeData,
  };

  return <TypePage {...props} />;
};

export async function generateStaticParams() {
  const typeList = await TypesApi.getAll();

  return typeList.map(({ name }) => ({
    typeId: name,
  }));
}

export default PokestatsTypePage;
