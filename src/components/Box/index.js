import { BoxWrapper } from './StyledBox'

import { forwardRef } from 'React'

import { useForwardedRef } from '../../helpers/ref'

const Box = forwardRef(
  (
    {
      align = 'center',
      as = 'div',
      background,
      children,
      constrained,
      direction = 'column',
      fill,
      flexWrap = 'nowrap',
      grow = true,
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
        ref={boxRef}
        alignProp={align}
        as={as}
        constrained={constrained}
        fillProp={fill}
        flexDirection={direction}
        flexWrap={flexWrap}
        growProp={grow}
        heightProp={height}
        justifyProp={justify}
        sizesProp={sizes}
        widthProp={width}
        {...rest}
      >
        {children}
      </BoxWrapper>
    )
  }
)

export default Box
