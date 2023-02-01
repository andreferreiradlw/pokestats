import { useEffect, useRef, useState } from 'react';
// types
import type { PokestatsKantoGen1PageProps, Location } from '@/pages/regions/kanto-gen1';
// helpers
import { pageContainerVariant } from '@/helpers';
// styles
import { Divider, SectionTitle } from '@/BaseStyles';
import { ImageContainer, CurrentLocation } from './StyledKantoGen1';
// components
import { AnimatePresence } from 'framer-motion';
import { MainContainer } from '@/components/Layout';
import Box from '@/components/Box';
import ImageMapper from 'react-img-mapper';
// data
import kantoZones from './kanto-zones.json';

const KantoGen1 = ({
  locations,
}: Omit<PokestatsKantoGen1PageProps, 'autocompleteList'>): JSX.Element => {
  // console.log('locations', locations);

  const dimensionsRef = useRef(null);
  const mapRef = useRef(null);

  const [imgWidth, setImgWidth] = useState(0);
  const [mapHover, setMapHover] = useState('');
  const [currArea, setCurrArea] = useState<Location>();

  const handleMapClear = () => {
    mapRef.current.clearHighlightedArea();
  };

  const handleAreaClick = (areaId: string): void => {
    const matchedArea = locations.find(location => location.locationId === areaId);
    console.log(matchedArea);
    setCurrArea(matchedArea);
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
        <SectionTitle>Kanto Map: Generation I</SectionTitle>
        <Box
          flexdirection={{ xxs: 'column', lg: 'row' }}
          flexalign="flex-start"
          flexjustify="flex-start"
          flexgap="2em"
          $flexgrow
          ref={dimensionsRef}
        >
          <ImageContainer width="auto">
            {mapHover && <CurrentLocation>{mapHover}</CurrentLocation>}
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
              onClick={area => handleAreaClick(area.id)}
              onMouseEnter={(area: any) => setMapHover(area.title)}
              onMouseLeave={() => setMapHover(null)}
            />
          </ImageContainer>
          <Box>Table</Box>
        </Box>
        <Divider />
      </MainContainer>
    </AnimatePresence>
  );
};

export default KantoGen1;
