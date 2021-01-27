import { useState, useEffect } from 'react'
import axios from 'axios'
import LazyLoad from 'react-lazyload'
import { AnimatePresence } from 'framer-motion'
// helpers
import { placeholderVariant, imageVariant } from '../../helpers/animations'
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
  placeholderWidth = '65%',
  pixelated,
  src,
  offset,
  notLazy,
  ...rest
}) {
  // img src
  const [imgSrc, setImgSrc] = useState(null)

  useEffect(() => {
    axios.get(src, { responseType: 'arraybuffer' }).then(response => {
      let blob = new Blob([response.data], {
        type: response.headers['content-type'],
      })
      let image = URL.createObjectURL(blob)
      setImgSrc(image)
    })
  }, [])

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
    >
      <AnimatePresence exitBeforeEnter>
        {!imgSrc && (
          <Placeholder
            width={width}
            height={height}
            initial="initial"
            animate="animate"
            exit="exit"
            key={`image-placeholder-${src}-${alt}`}
            variants={placeholderVariant}
          >
            <EggIcon placeholderWidth={placeholderWidth} />
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
            variants={imageVariant}
            key={`image-${src}-${alt}`}
            {...rest}
          />
        )}
      </AnimatePresence>
    </ConditionalWrapper>
  )
}

export default ImageComponent
