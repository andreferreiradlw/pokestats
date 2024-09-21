// types
import type { NextPage, GetServerSideProps } from 'next';
// components
import LayoutV2 from '@/components/LayoutV2';
import HeadbuttLocationsPage from '@/components/HeadbuttLocationsPage';

export interface PokestatsHeadbuttLocationsPageProps {
  location: string | null;
}

const PokestatsHeadbuttLocationsPage: NextPage<PokestatsHeadbuttLocationsPageProps> = ({
  location,
}) => {
  return (
    <LayoutV2 withHeader customKey="kanto-gen1-region">
      <HeadbuttLocationsPage />
    </LayoutV2>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const { location } = context.query;

  return {
    props: {
      location: typeof location === 'string' ? location : null, // Ensure location is a string or null
    },
  };
};

export default PokestatsHeadbuttLocationsPage;
