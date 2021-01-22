import styled, { css } from 'styled-components'
import { responsiveProps, flexStyle } from '../../helpers/box'
import { boxConfig } from './config'

const debugStyle = () => css`
  background-color: #5901ad40;
  outline: #fff solid 1px;
`

const gutterStyle = () => css`
  ${responsiveProps('padding', boxConfig.gutterWidth)}
`

export const BoxWrapper = styled.div`
  /** dynamic styles */
  ${({
    alignSelf,
    margin,
    padding,
    hide,
    flexWrap,
    widthProp,
    heightProp,
    flexDirection,
    alignProp,
    justifyProp,
  }) => {
    return css`
      // flexbox styles
      display: ${hide ? 'none' : 'flex'};
      ${flexDirection && responsiveProps('flex-direction', flexDirection)}
      ${alignProp && responsiveProps('align-items', alignProp)}
      ${justifyProp && responsiveProps('justify-content', justifyProp)}
      ${alignSelf && responsiveProps('align-self', alignSelf)}
      ${flexWrap && responsiveProps('flex-wrap', flexWrap)}
      // spacing
      ${margin && responsiveProps('margin', margin)}
      ${padding && responsiveProps('padding', padding)}
      // sizing
      ${widthProp && responsiveProps('width', widthProp)}
      ${heightProp && responsiveProps('height', heightProp)}
    `
  }}

  /** column-based flex size */
  ${({ constrained, sizesProp }) =>
    constrained
      ? css`
          flex-basis: 0%;
        `
      : sizesProp
      ? flexStyle(sizesProp)
      : css`
          flex-basis: auto;
        `}
  
  ${({ constrained, sizesProp, growProp }) =>
    !constrained &&
    !sizesProp &&
    growProp &&
    css`
      flex-grow: 1;
    `}
  
  /** constrained max-width */
  ${({ constrained, growProp }) =>
    constrained &&
    css`
      ${growProp && 'flex-grow: 1;'}
      max-width: ${boxConfig.constrained};
    `};

  /** gutter */
  ${({ padding, withGutter }) => !padding && withGutter && gutterStyle()}

  /** debug */
  ${({ debug }) => debug && debugStyle()}
`
