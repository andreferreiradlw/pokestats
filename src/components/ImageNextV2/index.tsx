import { useState, useCallback, useMemo } from 'react';
// types
import type { ImageProps } from 'next/image';
// helpers
import { placeholderVariant, fadeInUpVariant, hoverVariant } from '@/animations';
// styles
import { LoadingIcon, ErrorIcon, PlaceholderContainer, ImageEl } from './StyledImageNextV2';
// components
import { AnimatePresence, type HTMLMotionProps, motion } from 'framer-motion';
import { Box, Stack, type StackProps } from '@mui/material';

export interface ImageNextV2Props
  extends Omit<HTMLMotionProps<'main'>, keyof StackProps>,
    StackProps {
  pixelatedimg?: boolean;
  placeholderwidth?: string;
  imageProps?: Partial<ImageProps>;
  key: string;
  imageUrl: string;
  alt: string;
  height?: string | number;
  width?: string | number;
}

const ImageNextV2 = ({
  pixelatedimg,
  placeholderwidth = '50%',
  imageProps,
  key,
  imageUrl,
  alt,
  height,
  ...rest
}: ImageNextV2Props): JSX.Element => {
  // Determine if the image is a static (local) asset
  const isImageStatic = imageUrl?.startsWith('/static/');

  // State management for loading and error states
  const [showPlaceholder, setShowPlaceholder] = useState(!isImageStatic);
  const [hasError, setHasError] = useState(false);

  // Handler for image load success
  const handleLoad = useCallback(() => {
    setShowPlaceholder(false);
  }, []);

  // Handler for image load error
  const handleError = useCallback(() => {
    setShowPlaceholder(false);
    setHasError(true);
  }, []);

  // Placeholder loading properties
  const loadingProps = useMemo(
    () => ({
      initial: 'initial',
      animate: 'animate',
      // exit: 'exit',
      variants: placeholderVariant,
      placeholderwidth,
      height,
      py: 4,
      alignItems: 'center',
      justifyContent: 'center',
    }),
    [placeholderwidth],
  );

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
      width="100%"
      key={`image-container-${key}`}
      component={motion.div}
      variants={hoverVariant}
      {...rest}
    >
      <AnimatePresence mode="wait">
        {showPlaceholder && !hasError && (
          <Stack
            key={`loading-placeholder-${key}`}
            component={PlaceholderContainer}
            {...loadingProps}
          >
            <LoadingIcon />
          </Stack>
        )}
        {hasError ? (
          <Stack
            key={`error-placeholder-${key}`}
            component={PlaceholderContainer}
            {...loadingProps}
          >
            <ErrorIcon />
          </Stack>
        ) : (
          <Box
            width={!showPlaceholder ? '100%' : 0}
            height={!showPlaceholder ? height || 'auto' : 0}
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
            maxHeight="inherit"
            key={`image-wrapper-${key}`}
            component={motion.div}
            initial="hidden"
            animate="show"
            variants={fadeInUpVariant}
          >
            <ImageEl
              pixelatedimg={pixelatedimg}
              loading={imageProps?.priority ? 'eager' : 'lazy'}
              sizes={
                imageProps?.fill ? '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' : ''
              }
              fill
              src={imageUrl}
              alt={alt}
              draggable={false}
              onLoad={handleLoad}
              onError={handleError}
              {...imageProps}
            />
          </Box>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default ImageNextV2;