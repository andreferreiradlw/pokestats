// types
import type { GetStaticProps, NextPage } from 'next';
// import type { Pokemon, PokemonType, MoveType } from '@/types';
// helpers
import { Location, LocationArea, LocationClient, NamedAPIResource, Region } from 'pokenode-ts';
// import { PokestatsPageTitle } from '@/components/Head';
// components
import Head from 'next/head';
import Layout from '@/components/Layout';
import KantoGen1 from '@/components/RegionsPage/KantoGen1';
import { findEnglishName, getIdFromURL } from '@/helpers';

export interface PokestatsKantoGen1PageProps {
  region: Region;
  locations: Location[];
  locationAreas: any;
}

const PokestatsRegionsPage: NextPage<PokestatsKantoGen1PageProps> = props => (
  <>
    <Head>
      <meta property="og:title" content="Regions" />
    </Head>
    <Layout $withGutter={false} layoutGap="0">
      <KantoGen1 {...props} />
    </Layout>
  </>
);

export const getStaticProps: GetStaticProps<PokestatsKantoGen1PageProps> = async () => {
  const locationClient = new LocationClient();

  try {
    const kantoData = await locationClient.getRegionById(1);

    if (!kantoData) {
      return { notFound: true };
    }

    let locations = [];
    // create an axios request for each region location
    kantoData.locations.forEach(({ url }) =>
      locations.push(locationClient.getLocationById(getIdFromURL(url, 'location'))),
    );

    const kantoLocationsData: Location[] = await Promise.all(locations);

    if (!kantoLocationsData) {
      return { notFound: true };
    }

    // get location areas data
    let regionLocationAreas: {
      key: string;
      label: string;
      locationId: number;
      locationAreas: LocationArea[];
    }[] = [];

    await Promise.all(
      kantoLocationsData.map(async ({ name: locationName, areas, names, id }) => {
        // filter out kanto regions from other generations
        if (id > 234) return;

        const locationAreaData = await Promise.all(
          areas.map(async ({ url }) =>
            locationClient.getLocationAreaById(getIdFromURL(url, 'location-area')),
          ),
        );
        // add location area data
        regionLocationAreas.push({
          key: locationName,
          label: findEnglishName(names),
          locationId: id,
          locationAreas: locationAreaData.length ? locationAreaData : null,
        });
      }),
    );

    // filter out pokemon encounters from other generations
    // const genLocationAreas = regionLocationAreas.map(({ locationAreas }) => {
    //   locationAreas.forEach(({ pokemon_encounters }) => pokemon_encounters.filter());
    // });
    const res = regionLocationAreas.filter(
      ({ locationAreas }) =>
        !!locationAreas?.length &&
        locationAreas.some(
          ({ pokemon_encounters }) =>
            !!pokemon_encounters?.length &&
            pokemon_encounters.some(({ version_details }) =>
              version_details?.find(
                ({ version }) => version === 'red' || version === 'blue' || version === 'yellow',
              ),
            ),
        ),
    );

    return {
      props: {
        region: kantoData,
        locations: kantoLocationsData,
        locationAreas: res,
      },
    };
  } catch (error) {
    console.error(error);
    // redirects to 404 page
    return { notFound: true };
  }
};

export default PokestatsRegionsPage;
