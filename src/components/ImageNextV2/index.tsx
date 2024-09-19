import { useState, useCallback, useMemo } from 'react';
// types
import type { ImageProps } from 'next/image';
// helpers
import { placeholderVariant, fadeInUpVariant } from '@/animations';
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
  imageProps?: ImageProps;
  key: string;
  imageUrl: string;
  alt: string;
}

const ImageNextV2 = ({
  pixelatedimg,
  placeholderwidth = '50%',
  imageProps,
  key,
  imageUrl,
  alt,
  ...rest
}: ImageNextV2Props): JSX.Element => {
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => setShowPlaceholder(false), []);

  const handleError = useCallback(() => {
    setShowPlaceholder(false);
    setHasError(true);
  }, []);

  const loadingProps = useMemo(
    () => ({
      initial: 'initial',
      animate: 'animate',
      exit: 'exit',
      variants: placeholderVariant,
      placeholderwidth,
      py: 4,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    }),
    [placeholderwidth],
  );

  return (
    <AnimatePresence mode="wait">
      {showPlaceholder && (
        <Stack
          key={`loading-placeholder-${key}`}
          component={PlaceholderContainer}
          {...loadingProps}
        >
          <LoadingIcon />
        </Stack>
      )}
      {hasError ? (
        <Stack key={`error-placeholder-${key}`} component={PlaceholderContainer} {...loadingProps}>
          <ErrorIcon />
        </Stack>
      ) : (
        <Box
          key={`image-container-${key}`}
          width="100%"
          alignItems="center"
          justifyContent="center"
          position="relative"
          component={motion.div}
          initial="hidden"
          animate="show"
          variants={fadeInUpVariant}
          {...rest}
        >
          <ImageEl
            $pixelatedimg={pixelatedimg}
            loading={imageProps?.priority ? 'eager' : 'lazy'}
            fill
            sizes={
              imageProps?.fill ? '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' : ''
            }
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
  );
};

export default ImageNextV2;
