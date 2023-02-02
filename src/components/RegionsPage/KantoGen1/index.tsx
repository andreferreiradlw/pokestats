import { useCallback, useEffect, useRef, useState } from 'react';
// types
import type { PokestatsKantoGen1PageProps, Location } from '@/pages/regions/kanto-gen1';
// helpers
import { pageContainerVariant } from '@/helpers';
// styles
import { Anchor, Divider, PageHeading, SectionSubTitle, SectionTitle } from '@/BaseStyles';
import { ImageContainer, CurrentLocation } from './StyledKantoGen1';
// components
import { AnimatePresence } from 'framer-motion';
import { MainContainer } from '@/components/Layout';
import Box from '@/components/Box';
import ImageMapper from 'react-img-mapper';
// data
import kantoZones from './kanto-zones.json';
import LocationTable from '@/components/LocationTable';

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
    },
    [locations],
  );

  const handleMapClear = () => {
    mapRef.current.clearHighlightedArea();
  };

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
            </Box>
            <ImageContainer width="auto">
              <CurrentLocation>{mapHover || currArea?.label || 'Hover me!'}</CurrentLocation>
              <ImageMapper
                containerRef={mapRef}
                src="/static/regions/kantoGen1/kanto-map.png"
                map={{
                  name: 'kanto-gen1',
                  areas: kantoZones,
                }}
                responsive={true}
                parentWidth={imgWidth}
                stayHighlighted={true}
                toggleHighlighted={true}
                fillColor="#eab54d4d"
                strokeColor="black"
                onClick={area => handleAreaClick(Number(area.id))}
                onMouseEnter={(area: any) => setMapHover(area.title)}
                onMouseLeave={() => setMapHover(null)}
              />
            </ImageContainer>
          </Box>
          <Box
            flexdirection={{ xxs: 'column', lg: 'row' }}
            flexalign="flex-start"
            flexjustify="flex-start"
            flexgap="2em"
          >
            {currArea && (
              <>
                <Box screensizes={4} flexalign="flex-start" flexgap="0.5em">
                  <SectionTitle>{currArea.label}</SectionTitle>
                  <p>{currAreaDescription}</p>
                </Box>
                <LocationTable location={currArea} screensizes={8} />
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
