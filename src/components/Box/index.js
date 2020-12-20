import { BoxWrapper } from './StyledBox'

export default function Box({
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
  hide,
  justify = 'center',
  sizes,
  width = '100%',
  ...rest
}) {
  return (
    <BoxWrapper
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
