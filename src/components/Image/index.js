import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import LazyLoad from 'react-lazyload';
import { AnimatePresence } from 'framer-motion';
// helpers
import { placeholderVariant, fadeInUpVariant } from '../../helpers/animations';
// styles
import { ImageWrapper, Image, Placeholder, EggIcon } from './StyledImage';

const ConditionalWrapper = ({ isLazy, children, offset }) =>
  isLazy ? (
    <LazyLoad once offset={offset || 250}>
      {children}
    </LazyLoad>
  ) : (
    children
  );

function ImageComponent({
  alt,
  width,
  height,
  placeholderwidth = '65%',
  $pixelated,
  src,
  offset,
  notLazy,
  ...rest
}) {
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
  }, [_isMounted]);

  return (
    <ConditionalWrapper key={alt} isLazy={!notLazy} offset={offset} {...rest}>
      <ImageWrapper width={width} height={height}>
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
              alt={alt}
              src={imgSrc}
              $pixelated={$pixelated}
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
}

export default ImageComponent;
