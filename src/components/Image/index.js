import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import LazyLoad from 'react-lazyload'
import { AnimatePresence } from 'framer-motion'
// helpers
import { placeholderVariant, fadeInUpVariant } from '../../helpers/animations'
// styles
import { ImageWrapper, Image, Placeholder, EggIcon } from './StyledImage'

const ConditionalWrapper = ({ condition, wrapper, children, height }) =>
  condition ? (
    wrapper(children)
  ) : (
    <ImageWrapper height={height}>{children}</ImageWrapper>
  )

function ImageComponent({
  alt,
  width,
  height,
  placeholderwidth = '65%',
  pixelated,
  src,
  offset,
  notLazy,
  ...rest
}) {
  // img src
  const [imgSrc, setImgSrc] = useState(null)
  // ref
  const _isMounted = useRef(null)
  // manage mounted state to avoid memory leaks
  useEffect(() => {
    _isMounted.current = true
    return () => {
      _isMounted.current = false
      setImgSrc(null)
    }
  }, [])

  useEffect(() => {
    async function fetchImage() {
      await axios.get(src, { responseType: 'arraybuffer' }).then(response => {
        let blob = new Blob([response.data], {
          type: response.headers['content-type'],
        })
        let image = URL.createObjectURL(blob)
        if (_isMounted.current) setImgSrc(image)
      })
    }
    if (_isMounted.current) fetchImage()
  }, [_isMounted])

  return (
    <ConditionalWrapper
      key={alt}
      condition={!notLazy}
      height={height}
      wrapper={children => (
        <LazyLoad height={height || 135} once offset={offset || 250}>
          {children}
        </LazyLoad>
      )}
      {...rest}
    >
      <AnimatePresence exitBeforeEnter>
        {!imgSrc && (
          <Placeholder
            width={width}
            height={height}
            initial="initial"
            animate="animate"
            exit="exit"
            key={`image-placeholder-${src}`}
            variants={placeholderVariant}
          >
            <EggIcon placeholderwidth={placeholderwidth} />
          </Placeholder>
        )}
        {imgSrc && (
          <Image
            alt={alt}
            src={imgSrc}
            pixelated={pixelated}
            width={width}
            height={height}
            initial="hidden"
            animate="show"
            variants={fadeInUpVariant}
            key={`image-${src}`}
          />
        )}
      </AnimatePresence>
    </ConditionalWrapper>
  )
}

export default ImageComponent
