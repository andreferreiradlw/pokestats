import { useCallback, useEffect, useRef, useState } from 'react';
// types
import type { PokestatsKantoGen1PageProps, Location } from '@/pages/regions/kanto-gen1';
import type { MapAreas } from '@/types/imageMapper';
// helpers
import { capitalise, fadeInUpVariant, pageContainerVariant, removeDash } from '@/helpers';
// styles
import { Divider, PageHeading, SectionSubTitle, SectionTitle } from '@/BaseStyles';
import {
  ImageContainer,
  CurrentLocation,
  MapImage,
  PlayIconContainer,
  PlayIcon,
  PauseIcon,
} from './StyledKantoGen1';
// components
import { AnimatePresence } from 'framer-motion';
import { MainContainer } from '@/components/Layout';
import Box from '@/components/Box';
import ImageMapper from '@/components/ImageMapper';
import NewMapper from '@/components/ImageMapper/newMapper';
import CustomButton from '@/components/CustomButton';
// data
import kantoZones from './kanto-zones.json';
import LocationTable from '@/components/LocationTable';

const mapLocationToMusic = (locationKey: string): string => {
  switch (locationKey) {
    case 'pallet-town':
      return 'pallet-town';
    case 'kanto-route-1':
    case 'kanto-route-2':
      return 'route-1';
    case 'pewter-city':
    case 'viridian-city':
    case 'saffron-city':
      return 'viridian-city';
    case 'seafoam-islands':
    case 'viridian-forest':
    case 'digletts-cave':
      return 'viridian-forest';
    case 'mt-moon':
    case 'rock-tunnel':
    case 'kanto-victory-road-2':
      return 'mt-moon';
    case 'kanto-route-3':
    case 'kanto-route-4':
    case 'kanto-route-5':
    case 'kanto-route-6':
    case 'kanto-route-7':
    case 'kanto-route-8':
    case 'kanto-route-9':
    case 'kanto-route-10':
    case 'kanto-route-16':
    case 'kanto-route-17':
    case 'kanto-route-18':
    case 'kanto-sea-route-19':
    case 'kanto-sea-route-20':
    case 'kanto-sea-route-21':
    case 'kanto-route-22':
      return 'route-3';
    case 'kanto-route-24':
    case 'kanto-route-25':
      return 'route-24';
    case 'kanto-route-11':
    case 'kanto-route-12':
    case 'kanto-route-13':
    case 'kanto-route-14':
    case 'kanto-route-15':
      return 'route-11';
    case 'cerulean-city':
    case 'fuchsia-city':
      return 'cerulean-city';
    case 'vermilion-city':
      return 'vermilion-city';
    case 'lavender-town':
      return 'lavender-town';
    case 'pokemon-tower':
      return 'pokemon-tower';
    case 'pokemon-mansion':
      return 'pokemon-mansion';
    case 'celadon-city':
      return 'celadon-city';
    case 'kanto-safari-zone':
      return 'safari-zone';
    case 'cinnabar-island':
      return 'cinnabar-island';
    case 'kanto-route-23':
    case 'indigo-plateau':
      return 'victory-road';
    case 'power-plant':
    case 'cerulean-cave':
      return 'rocket-hideout';
  }
};

const KantoGen1 = ({
  locations,
}: Omit<PokestatsKantoGen1PageProps, 'autocompleteList'>): JSX.Element => {
  // console.log('locations', locations);

  // ref
  const dimensionsRef = useRef(null);
  const mapRef = useRef(null);
  // states
  const [imgWidth, setImgWidth] = useState(0);
  const [mapHover, setMapHover] = useState('');
  const [currArea, setCurrArea] = useState<Location>();
  const [currAreaDescription, setCurrAreaDescription] = useState<string>('');
  const [locationMusic, setLocationMusic] = useState<HTMLAudioElement>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAllAreas, setShowAllAreas] = useState(false);

  const handleHighlightsClick = () => {
    setShowAllAreas(prev => !prev);
    console.log('showAllAreas', !showAllAreas);
  };

  // memo
  const handleAreaClick = useCallback(
    (areaId: number): void => {
      const areaDesc = kantoZones.find(location => Number(location.id) === areaId)?.description;
      if (areaDesc) {
        setCurrAreaDescription(areaDesc);
      } else {
        setCurrAreaDescription('');
      }
      const matchedArea = locations.find(location => location.locationId === areaId);
      setCurrArea(matchedArea);
      // update soundtrack
      setLocationMusic(
        new Audio(
          `https://raw.githubusercontent.com/andreferreiradlw/pokestats_media/main/assets/music/gen1/${mapLocationToMusic(
            matchedArea.key,
          )}.mp3`,
        ),
      );
    },
    [locations],
  );

  const handleMapClear = () => {
    mapRef.current.clearHighlightedArea();
  };

  const playAreaMusic = () => {
    setIsPlaying(true);
    locationMusic.play();
  };

  const pauseAreaMusic = () => {
    setIsPlaying(false);
    locationMusic.pause();
  };
  // set playing to false when music track ends
  useEffect(() => {
    locationMusic?.addEventListener('ended', () => setIsPlaying(false));
    return () => {
      locationMusic?.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, [locationMusic]);

  useEffect(() => {
    const handleResize = () => {
      setImgWidth(dimensionsRef.current.offsetWidth * 0.4);
    };
    // set initial width
    if (imgWidth === 0) {
      handleResize();
    }
    // add event listener
    window.addEventListener('resize', handleResize);
    // cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dimensionsRef]);

  return (
    <AnimatePresence mode="wait">
      <MainContainer
        flexjustify="flex-start"
        flexalign="flex-start"
        $contained
        $withGutter
        initial="hidden"
        animate="visible"
        exit="fade"
        variants={pageContainerVariant}
        key="kanto-gen1-page-container"
      >
        <Divider />
        <Box flexalign="flex-start" flexjustify="flex-start" flexgap="2em" $flexgrow>
          <Box
            flexdirection={{ xxs: 'column', lg: 'row' }}
            flexalign="flex-start"
            flexjustify="flex-start"
            flexgap="2em"
            ref={dimensionsRef}
          >
            <Box flexgap="0.5em" flexalign="flex-start">
              <PageHeading>Kanto</PageHeading>
              <SectionTitle>Generation I</SectionTitle>
              <p>
                <b>Kanto</b> is a region of the Pokémon world. It is located east of <b>Johto</b>,
                which together form a joint landmass that is south of <b>Sinnoh</b>.It is the
                setting of the first generation of games and can also be explored in Generations II,
                III, IV, and VII.
              </p>
              <CustomButton onClick={handleHighlightsClick}>Toggle Highlights</CustomButton>
              {showAllAreas ? 'true' : 'false'}
            </Box>
            <ImageContainer width="auto">
              <CurrentLocation>{mapHover || currArea?.label || 'Hover me!'}</CurrentLocation>
              <ImageMapper
                containerRef={mapRef}
                src="/static/regions/kantoGen1/kanto-map.png"
                map={{
                  name: 'kanto-gen1',
                  areas: kantoZones as MapAreas[],
                }}
                parentWidth={imgWidth}
                stayHighlighted={true}
                highlightAllAreas={showAllAreas}
                toggleHighlighted={true}
                fillColor="#eab54d4d"
                strokeColor="black"
                onClick={area => handleAreaClick(Number(area.id))}
                onMouseEnter={(area: any) => setMapHover(area.title)}
                onMouseLeave={() => setMapHover(null)}
              />
            </ImageContainer>
          </Box>
          {/* <Box screensizes={6} width="50%">
            <NewMapper
              containerRef={mapRef}
              src="/static/regions/kantoGen1/kanto-map.png"
              map={{
                name: 'kanto-gen1',
                areas: kantoZones as MapAreas[],
              }}
              parentWidth={imgWidth}
              stayHighlighted={true}
              highlightAllAreas={showAllAreas}
              toggleHighlighted={true}
              fillColor="#eab54d4d"
              strokeColor="black"
              onClick={area => handleAreaClick(Number(area.id))}
              onMouseEnter={(area: any) => setMapHover(area.title)}
              onMouseLeave={() => setMapHover(null)}
            />
          </Box> */}
          <Box
            flexdirection={{ xxs: 'column', lg: 'row' }}
            flexalign="flex-start"
            flexjustify="flex-start"
            flexgap="2em"
          >
            {currArea && (
              <>
                <Box
                  screensizes={currArea.locationAreas?.length > 0 ? 4 : 6}
                  flexalign="flex-start"
                  flexgap="1em"
                >
                  <Box
                    flexdirection="row"
                    flexjustify="flex-start"
                    flexalign="center"
                    flexgap="0.5em"
                    width="auto"
                  >
                    <SectionTitle>{currArea.label}</SectionTitle>
                    <PlayIconContainer
                      whileHover="hover"
                      whileTap="tap"
                      variants={fadeInUpVariant}
                      key={`${currArea.key}-music-icon`}
                      onClick={() => (isPlaying ? pauseAreaMusic() : playAreaMusic())}
                    >
                      {isPlaying ? <PauseIcon /> : <PlayIcon />}
                    </PlayIconContainer>
                  </Box>
                  <p>{currAreaDescription}</p>
                  {!!currArea.locationAreas &&
                    currArea.locationAreas.map(({ name, location, names }, i) => {
                      const areaSubName = capitalise(
                        removeDash(name.replace(location.name, '')),
                      ).trim();

                      return (
                        <Box
                          key={`location-area-map-${name}-${i}`}
                          flexalign="flex-start"
                          flexjustify="flex-start"
                          flexgap="0.5em"
                        >
                          {areaSubName && areaSubName !== 'Area' && (
                            <SectionSubTitle>{areaSubName}</SectionSubTitle>
                          )}
                          <MapImage
                            alt={`Map view of ${names[0].name}`}
                            src={`https://raw.githubusercontent.com/andreferreiradlw/pokestats_media/main/assets/regions/kanto/gen1/${name}.png`}
                            placeholderwidth="10%"
                          />
                        </Box>
                      );
                    })}
                </Box>
                {currArea.locationAreas ? (
                  <LocationTable location={currArea} screensizes={8} />
                ) : (
                  <MapImage
                    alt={`Map view of ${currArea.label}`}
                    src={`https://raw.githubusercontent.com/andreferreiradlw/pokestats_media/main/assets/regions/kanto/gen1/${currArea.key}.png`}
                  />
                )}
              </>
            )}
          </Box>
        </Box>
        <Divider />
      </MainContainer>
    </AnimatePresence>
  );
};

export default KantoGen1;
