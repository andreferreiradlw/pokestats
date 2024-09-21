// types
import type { NextPage, GetServerSideProps } from 'next';
// components
import LayoutV2 from '@/components/LayoutV2';
import HeadbuttLocationsPage from '@/components/HeadbuttLocationsPage';

export interface PokestatsHeadbuttLocationsPageProps {
  defaultLocation: string | null;
}

const PokestatsHeadbuttLocationsPage: NextPage<PokestatsHeadbuttLocationsPageProps> = props => {
  return (
    <LayoutV2 withHeader customKey="kanto-gen1-region">
      <HeadbuttLocationsPage {...props} />
    </LayoutV2>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const { location } = context.query;

  return {
    props: {
      defaultLocation: typeof location === 'string' ? location : null, // Ensure location is a string or null
    },
  };
};

export default PokestatsHeadbuttLocationsPage;
