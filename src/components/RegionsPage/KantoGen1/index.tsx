// @ts-nocheck

import { useCallback, useEffect, useRef, useState } from 'react';
// types
import type { PokestatsKantoGen1PageProps, Location } from '@/pages/regions/kanto-gen1';
import type { MapAreas } from '@/types/imageMapper';
// helpers
import { removeDash } from '@/helpers';
import { hoverVariant } from '@/animations';
// styles
import {
  ImageContainer,
  CurrentLocation,
  MapImage,
  PlayIconContainer,
  PlayIcon,
  PauseIcon,
} from './StyledKantoGen1';
// components
import ImageMapper from '@/components/ImageMapper';
// import NewMapper from '@/components/ImageMapper/newMapper';
import CustomButton from '@/components/CustomButton';
import LocationTable from '@/components/LocationTable';
import { capitalize, Grid2, Stack, Typography } from '@mui/material';
// data
import kantoZones from './kanto-zones.json';

const mapLocationToMusic = (locationKey: string) => {
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
    default:
      return 'unknown-location';
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
    <Stack alignItems="flex-start" justifyContent="flex-start" gap={4}>
      <Stack
        flexDirection={{ xxs: 'column', lg: 'row' }}
        alignItems="flex-start"
        justifyContent="flex-start"
        gap={4}
        ref={dimensionsRef}
      >
        <Stack gap={1} alignItems="flex-start">
          <Typography variant="pageHeading">Kanto</Typography>
          <Typography variant="sectionTitle">Generation I</Typography>
          <Typography>
            <b>Kanto</b> is a region of the Pokémon world. It is located east of <b>Johto</b>, which
            together form a joint landmass that is south of <b>Sinnoh</b>.It is the setting of the
            first generation of games and can also be explored in Generations II, III, IV, and VII.
          </Typography>
          <CustomButton onClick={handleHighlightsClick}>Toggle Highlights</CustomButton>
          {showAllAreas ? 'true' : 'false'}
        </Stack>
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
            stayHighlighted
            highlightAllAreas={showAllAreas}
            toggleHighlighted
            fillColor="#eab54d4d"
            strokeColor="black"
            onClick={area => handleAreaClick(Number(area.id))}
            onMouseEnter={(area: any) => setMapHover(area.title)}
            onMouseLeave={() => setMapHover(null)}
          />
        </ImageContainer>
      </Stack>
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
      <Grid2
        container
        direction={{ xxs: 'column', lg: 'row' }}
        alignItems="flex-start"
        justifyContent="flex-start"
        spacing={4}
        size={12}
      >
        {currArea && (
          <>
            <Grid2
              size={currArea.locationAreas?.length > 0 ? 4 : 6}
              flexDirection="column"
              alignItems="flex-start"
              gap={2}
            >
              <Stack
                flexDirection="row"
                justifyContent="flex-start"
                alignItems="center"
                gap={1}
                width="auto"
              >
                <Typography variant="sectionTitle">{currArea.label}</Typography>
                <PlayIconContainer
                  whileHover="hover"
                  whileTap="tap"
                  variants={hoverVariant}
                  key={`${currArea.key}-music-icon`}
                  onClick={() => (isPlaying ? pauseAreaMusic() : playAreaMusic())}
                >
                  {isPlaying ? <PauseIcon /> : <PlayIcon />}
                </PlayIconContainer>
              </Stack>
              <Typography>{currAreaDescription}</Typography>
              {!!currArea.locationAreas &&
                currArea.locationAreas.map(({ name, location, names }) => {
                  const areaSubName = capitalize(
                    removeDash(name.replace(location.name, '')),
                  ).trim();

                  return (
                    <Stack
                      key={`location-area-map-${name}`}
                      alignItems="flex-start"
                      justifyContent="flex-start"
                      gap={1}
                    >
                      {areaSubName && areaSubName !== 'Area' && (
                        <Typography variant="sectionSubTitle">{areaSubName}</Typography>
                      )}
                      <MapImage
                        alt={`Map view of ${names[0].name}`}
                        src={`https://raw.githubusercontent.com/andreferreiradlw/pokestats_media/main/assets/regions/generation-i/${name}.png`}
                        placeholderwidth="10%"
                      />
                    </Stack>
                  );
                })}
            </Grid2>
            {currArea.locationAreas ? (
              <LocationTable location={currArea} size={8} />
            ) : (
              <MapImage
                alt={`Map view of ${currArea.label}`}
                src={`https://raw.githubusercontent.com/andreferreiradlw/pokestats_media/main/assets/regions/generation-i/${currArea.key}.png`}
              />
            )}
          </>
        )}
      </Grid2>
    </Stack>
  );
};

export default KantoGen1;
