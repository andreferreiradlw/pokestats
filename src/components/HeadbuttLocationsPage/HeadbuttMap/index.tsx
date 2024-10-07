import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
// helpers
import { fadeInUpVariant } from '@/animations';
import { calculateTreeIndex, getEncounterRate } from '@/helpers';
// types
import type { HeadbuttLocation } from '../headbuttData';
// components
import { Box, Grid2, type Grid2Props } from '@mui/material';
import { AnimatePresence, motion } from '@/client';
import Loading from '@/components/Loading';
import HeadbuttGridItem from './HeadbuttGridItem';

interface HeadbuttMapProps extends Grid2Props {
  trainerId: number;
  scale: number;
  areaDetails: HeadbuttLocation;
}

const HeadbuttMap = ({
  areaDetails,
  trainerId,
  scale = 1,
  ...rest
}: HeadbuttMapProps): JSX.Element => {
  const [gridItems, setGridItems] = useState<JSX.Element[]>([]);
  const [loading, setLoading] = useState(true);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const { imageHeight, value } = areaDetails;

  const trainerIdLastDigit = useMemo(
    () => parseInt(trainerId.toString().slice(-1), 10),
    [trainerId],
  );

  const handleImageLoad = useCallback(() => {
    if (imageRef.current) {
      const { width, height } = imageRef.current;
      const cellSize = 16 * scale;

      const gridSize = {
        x: Math.floor(width / cellSize),
        y: Math.floor(height / cellSize),
      };

      const items = Array.from({ length: gridSize.x * gridSize.y }, (_, index) => {
        const x = index % gridSize.x;
        const y = Math.floor(index / gridSize.x);
        const treeIndex = calculateTreeIndex(x, y);
        const encounterRate = getEncounterRate(treeIndex, trainerIdLastDigit);
        return (
          <HeadbuttGridItem
            key={`${value}-${index}`}
            encounterRate={encounterRate}
            x={x}
            y={y}
            scale={scale}
          />
        );
      });

      setGridItems(items);
      setLoading(false);
    }
  }, [scale, trainerIdLastDigit, value]);

  useEffect(() => {
    setLoading(true);
    handleImageLoad(); // Load the image and grid items without clearing state on scale change
  }, [scale, handleImageLoad]);

  useEffect(() => {
    // Reset state when area value changes
    setGridItems([]);
    setLoading(true);
    handleImageLoad();
  }, [value]);

  return (
    <Grid2
      position="relative"
      component={motion.div}
      initial="hidden"
      animate="show"
      exit="exit"
      variants={fadeInUpVariant}
      {...rest}
    >
      <AnimatePresence mode="wait">
        {loading ? (
          <Loading key={`loading-${areaDetails.value}-${trainerId}-${scale}`} />
        ) : (
          <Box
            key={`grid-${areaDetails.value}-${trainerId}-${scale}`}
            height={`${imageHeight * scale}px`}
            position="relative"
          >
            {gridItems}
          </Box>
        )}
      </AnimatePresence>
      <Box position="absolute" top={0} left={0} zIndex={1}>
        <img
          key={`image-${areaDetails.value}-${trainerId}-${scale}`}
          ref={imageRef}
          src={`https://raw.githubusercontent.com/andreferreiradlw/pokestats_media/main/assets/maps/generation-ii/headbutt-maps/${value}.png`}
          alt="Headbutt Map"
          height={`${imageHeight * scale}px`}
          onLoad={handleImageLoad}
        />
      </Box>
    </Grid2>
  );
};

export default HeadbuttMap;
