import { useState, useEffect, useRef } from 'react'
import LazyLoad from 'react-lazyload'
// styles
import { Image, Placeholder, EggIcon } from './StyledImage'

function index({
  width,
  height,
  iconWidth,
  iconHeight,
  pixelated,
  src,
  offset,
  ...rest
}) {
  // img state
  const [imgLoaded, setImgLoaded] = useState(false)
  // ref
  const imageRef = useRef(null)

  useEffect(() => {
    // check the image complete property before the onload event
    const img = imageRef.current
    if (img && img.complete) setImgLoaded(true)
  }, [])

  return (
    <>
      {!imgLoaded && (
        <Placeholder width={width} height={height}>
          <EggIcon iconWidth={iconWidth} iconHeight={iconHeight} />
        </Placeholder>
      )}
      <LazyLoad height={height || 135} once offset={offset || 250}>
        <Image
          src={src}
          pixelated={pixelated}
          onLoad={() => !imgLoaded && setImgLoaded(true)}
          ref={imageRef}
          width={width}
          height={height}
          loaded={imgLoaded}
          {...rest}
        />
      </LazyLoad>
    </>
  )
}

export default index
