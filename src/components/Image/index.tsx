import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
// types
import type { BoxProps } from '@/components/Box';
// helpers
import { AnimatePresence } from 'framer-motion';
// animations
import { placeholderVariant, fadeInUpVariant } from '@/helpers/animations';
// components
import LazyLoad from 'react-lazyload';
// styles
import { ImageWrapper, Image, Placeholder, EggIcon } from './StyledImage';

export interface ImageProps extends BoxProps {
  pixelated?: boolean;
  offset?: number;
  lazy?: boolean;
  placeholderwidth?: string;
}

const ConditionalWrapper = ({ isLazy, children, offset }) =>
  isLazy ? (
    <LazyLoad once offset={offset || 250}>
      {children}
    </LazyLoad>
  ) : (
    children
  );

const ImageComponent = ({
  alt,
  width,
  height,
  placeholderwidth = '65%',
  pixelated,
  src,
  offset,
  lazy = true,
  crossOrigin,
  ...rest
}: ImageProps & React.ImgHTMLAttributes<HTMLImageElement>): JSX.Element => {
  // img src
  const [imgSrc, setImgSrc] = useState(null);
  // ref
  const _isMounted = useRef(null);
  // manage mounted state to avoid memory leaks
  useEffect(() => {
    _isMounted.current = true;

    return () => {
      _isMounted.current = false;
      setImgSrc(null);
    };
  }, []);

  useEffect(() => {
    async function fetchImage() {
      await axios.get(src, { responseType: 'arraybuffer' }).then(response => {
        let blob = new Blob([response.data], {
          type: response.headers['content-type'],
        });
        let image = URL.createObjectURL(blob);
        // check again if mounted before updating the state
        if (_isMounted.current) setImgSrc(image);
      });
    }
    // fetch if mounted
    if (_isMounted.current) fetchImage();
  }, [_isMounted, src]);

  return (
    <ConditionalWrapper key={alt} isLazy={lazy} offset={offset}>
      <ImageWrapper width={width} height={height} {...rest}>
        <AnimatePresence mode="wait">
          {!imgSrc && (
            <Placeholder
              initial="initial"
              animate="animate"
              exit="exit"
              key={`image-placeholder-${src}`}
              variants={placeholderVariant}
            >
              <EggIcon placeholderwidth={placeholderwidth} height={height} />
            </Placeholder>
          )}
          {imgSrc && (
            <Image
              crossOrigin={crossOrigin}
              alt={alt}
              src={imgSrc}
              pixelated={pixelated}
              height={height}
              initial="hidden"
              animate="show"
              variants={fadeInUpVariant}
              key={`image-${src}`}
              draggable="false"
            />
          )}
        </AnimatePresence>
      </ImageWrapper>
    </ConditionalWrapper>
  );
};

export default ImageComponent;
