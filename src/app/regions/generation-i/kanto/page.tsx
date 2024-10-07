// components
import { KantoGen1 } from '@/PageComponents';

export interface PokestatsRegionsPageProps {
  location: string | null;
}

const PokestatsRegionsPage = ({ searchParams }: { searchParams: { location?: string } }) => {
  const location = searchParams.location ?? null;

  return <KantoGen1 location={location} />;
};

export default PokestatsRegionsPage;
