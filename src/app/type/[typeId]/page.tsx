// types
import type { Type } from 'pokenode-ts';
// helpers
import { TypesApi } from '@/services';
// components
import { TypePage } from '@/PageComponents';

export interface PokestatsTypePageProps {
  typeData: Type;
}

const PokestatsTypePage = async ({ params }: { params: { typeId: string } }) => {
  const typeName = params.typeId;

  const typeData = await TypesApi.getByName(typeName);

  return <TypePage typeData={typeData} />;
};

export async function generateStaticParams() {
  const typeList = await TypesApi.getAll();

  return typeList.map(({ name }) => ({
    typeId: name,
  }));
}

export default PokestatsTypePage;
