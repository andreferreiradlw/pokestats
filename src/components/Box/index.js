import { forwardRef } from 'react'
import { useForwardedRef } from '../../helpers/refs'
// styles
import BoxWrapper from './StyledBox'

const Box = forwardRef(
  (
    {
      align = 'center',
      as = 'div',
      children,
      direction = 'column',
      flexWrap = 'nowrap',
      justify = 'center',
      width = '100%',
      ...rest
    },
    ref
  ) => {
    const boxRef = useForwardedRef(ref)

    return (
      <BoxWrapper
        align={align}
        as={as}
        direction={direction}
        flexWrap={flexWrap}
        justify={justify}
        width={width}
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
