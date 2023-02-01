import { useEffect, useRef, useState } from 'react';
// types
import type { PokestatsKantoGen1PageProps } from '@/pages/regions/kanto-gen1';
// helpers
import { pageContainerVariant } from '@/helpers';
// styles
import { Divider } from '@/BaseStyles';
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
  console.log('locations', locations);
  // console.log('length', kantoZones.length);

  const dimensionsRef = useRef(null);
  const parentRef = useRef(null);

  const [imgWidth, setImgWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setImgWidth(dimensionsRef.current.offsetWidth / 2);
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
        <Box
          flexdirection={{ xxs: 'column', lg: 'row' }}
          flexalign="flex-start"
          flexjustify="flex-start"
          flexgap="2em"
          $flexgrow
          ref={dimensionsRef}
        >
          <Box ref={parentRef}>
            <ImageMapper
              src="/static/regions/kantoGen1/kanto-map.png"
              map={{
                name: 'kanto-gen1',
                areas: kantoZones,
              }}
              responsive={true}
              parentWidth={imgWidth}
              containerRef={parentRef}
              onClick={(area, index, event) => console.log(area)}
              stayHighlighted={true}
              toggleHighlighted={true}
              fillColor="#eab54d4d"
              strokeColor="black"
            />
          </Box>
          <Box>Table</Box>
        </Box>
        <Divider />
      </MainContainer>
    </AnimatePresence>
  );
};

export default KantoGen1;
