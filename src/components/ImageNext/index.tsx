import { useState } from 'react';
// types
import type { ImageProps } from 'next/image';
// helpers
import { placeholderVariant } from '@/helpers';
// styles
import {
  ImageElement,
  ImageContainer,
  LoadingIcon,
  ErrorIcon,
  PlaceholderContainer,
  LoadingContainer,
} from './StyledImageNext';
// components
import { AnimatePresence } from 'framer-motion';

export interface ImageNextProps extends ImageProps {
  $pixelatedImg?: boolean;
  placeholderwidth?: string;
}

const ImageNext = ({
  width,
  height,
  $pixelatedImg,
  placeholderwidth = '60%',
  priority,
  fill = true,
  src,
  ...rest
}: ImageNextProps): JSX.Element => {
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <ImageContainer
      width={width}
      height={height}
      $pixelatedImg={$pixelatedImg}
      key={`image-container-${src}`}
    >
      <AnimatePresence>
        {hasError && (
          <PlaceholderContainer
            initial="initial"
            animate="animate"
            exit="exit"
            key={`error-placeholder-${src}`}
            variants={placeholderVariant}
            placeholderwidth={placeholderwidth}
            height={height}
          >
            <ErrorIcon />
          </PlaceholderContainer>
        )}
        {showPlaceholder && !hasError && (
          <LoadingContainer
            initial="initial"
            animate="animate"
            exit="exit"
            key={`loading-placeholder-${src}`}
            variants={placeholderVariant}
            placeholderwidth={placeholderwidth}
            height={height}
          >
            <LoadingIcon />
          </LoadingContainer>
        )}
        {!hasError && (
          <ImageElement
            loading={priority ? 'eager' : 'lazy'}
            fill={fill}
            sizes={fill && '(max-width: 1200px) 100vw, (max-width: 768px) 50vw, 33vw'}
            src={src}
            draggable={false}
            onLoadingComplete={() => setShowPlaceholder(false)}
            onError={() => setHasError(true)}
            style={{}}
            {...rest}
          />
        )}
      </AnimatePresence>
    </ImageContainer>
  );
};

export default ImageNext;
