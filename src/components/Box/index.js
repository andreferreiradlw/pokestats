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
  justify = 'center',
  sizes,
  width,
  ...rest
}) {
  return (
    <BoxWrapper
      align={align}
      as={as}
      background={background}
      constrained={constrained}
      fillProp={fill}
      flexDirection={direction}
      flexWrap={flexWrap}
      growProp={grow}
      heightProp={height}
      justify={justify}
      sizesProp={sizes}
      widthProp={width}
      {...rest}
    >
      {children}
    </BoxWrapper>
  )
}
