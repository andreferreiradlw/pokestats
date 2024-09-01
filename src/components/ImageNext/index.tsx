import React, { useState, useCallback, memo } from 'react';
// types
import type { ImageProps } from 'next/image';
// helpers
import { placeholderVariant, fadeInUpVariant } from '@/animations';
// styles
import {
  ImageContainer,
  LoadingIcon,
  ErrorIcon,
  PlaceholderContainer,
  LoadingContainer,
  ImageWrapper,
} from './StyledImageNext';
// components
import { AnimatePresence, HTMLMotionProps } from 'framer-motion';
import Image from 'next/image';

export interface ImageNextProps extends ImageProps {
  pixelatedimg?: boolean;
  placeholderwidth?: string;
  containerProps?: HTMLMotionProps<'div'>;
}

const ImageNext = ({
  width,
  height,
  pixelatedimg,
  placeholderwidth = '60%',
  priority,
  fill = true,
  src,
  containerProps,
  ...rest
}: ImageNextProps): JSX.Element => {
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Memoized handlers to prevent re-creation on each render
  const handleLoad = useCallback(() => setShowPlaceholder(false), []);
  const handleError = useCallback(() => setHasError(true), []);

  // Memoized derived values
  const loadingProps = React.useMemo(
    () => ({
      initial: 'initial',
      animate: 'animate',
      variants: placeholderVariant,
      placeholderwidth,
      height,
    }),
    [placeholderwidth, height],
  );

  return (
    <ImageContainer
      width={width as any}
      height={height}
      $pixelatedimg={pixelatedimg}
      key={`image-container-${src}`}
      {...containerProps}
    >
      <AnimatePresence>
        {showPlaceholder && !hasError && (
          <LoadingContainer key={`loading-placeholder-${src}`} {...loadingProps}>
            <LoadingIcon />
          </LoadingContainer>
        )}
        {!hasError ? (
          <ImageWrapper
            initial="hidden"
            animate="show"
            variants={fadeInUpVariant}
            key={`image-${src}`}
          >
            <Image
              loading={priority ? 'eager' : 'lazy'}
              priority={priority}
              fill={fill}
              sizes={fill ? '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' : ''}
              src={src}
              draggable={false}
              onLoad={handleLoad}
              onError={handleError}
              {...rest}
            />
          </ImageWrapper>
        ) : (
          <PlaceholderContainer key={`error-placeholder-${src}`} {...loadingProps}>
            <ErrorIcon />
          </PlaceholderContainer>
        )}
      </AnimatePresence>
    </ImageContainer>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(ImageNext);
