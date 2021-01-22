import { forwardRef } from 'react'
import { useForwardedRef } from '../../helpers/refs'
// styles
import { BoxWrapper } from './StyledBox'

const Box = forwardRef(
  (
    {
      align = 'center',
      as = 'div',
      children,
      constrained,
      direction = 'column',
      fill,
      flexWrap = 'nowrap',
      flexGrow,
      height,
      justify = 'center',
      sizes,
      width = '100%',
      ...rest
    },
    ref
  ) => {
    const boxRef = useForwardedRef(ref)
    return (
      <BoxWrapper
        alignProp={align}
        as={as}
        constrained={constrained}
        fillProp={fill}
        flexDirection={direction}
        flexWrap={flexWrap}
        growProp={flexGrow}
        heightProp={height}
        justifyProp={justify}
        sizesProp={sizes}
        widthProp={width}
        ref={boxRef}
        {...rest}
      >
        {children}
      </BoxWrapper>
    )
  }
)

Box.displayName = 'Box'

export default Box
