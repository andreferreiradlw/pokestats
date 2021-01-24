import styled, { css } from 'styled-components'
import { responsiveProps, flexStyle } from '../../helpers/box'
import { boxConfig } from './config'
import { motion } from 'framer-motion'

const debugStyle = () => css`
  background-color: #5901ad40;
  outline: #fff solid 1px;
`

const gutterStyle = () => css`
  ${responsiveProps('padding', boxConfig.gutterWidth)}
`

export default styled(motion.div)`
  /** dynamic styles */
  ${({
    alignSelf,
    margin,
    padding,
    hide,
    flexWrap,
    width,
    height,
    direction,
    align,
    justify,
  }) => {
    return css`
      // flexbox styles
      display: ${hide ? 'none' : 'flex'};
      ${direction && responsiveProps('flex-direction', direction)}
      ${align && responsiveProps('align-items', align)}
      ${justify && responsiveProps('justify-content', justify)}
      ${alignSelf && responsiveProps('align-self', alignSelf)}
      ${flexWrap && responsiveProps('flex-wrap', flexWrap)}
      // spacing
      ${margin && responsiveProps('margin', margin)}
      ${padding && responsiveProps('padding', padding)}
      // sizing
      ${width && responsiveProps('width', width)}
      ${height && responsiveProps('height', height)}
    `
  }}

  /** column-based flex size */
  ${({ constrained, sizes }) =>
    constrained
      ? css`
          flex-basis: 0%;
        `
      : sizes
      ? flexStyle(sizes)
      : css`
          flex-basis: auto;
        `}
  
  ${({ constrained, sizes, flexGrow }) =>
    !constrained &&
    !sizes &&
    flexGrow &&
    css`
      flex-grow: 1;
    `}
  
  /** constrained max-width */
  ${({ constrained, flexGrow }) =>
    constrained &&
    css`
      ${flexGrow && 'flex-grow: 1;'}
      max-width: ${boxConfig.constrained};
    `};

  /** gutter */
  ${({ padding, withGutter }) => !padding && withGutter && gutterStyle()}

  /** debug */
  ${({ debug }) => debug && debugStyle()}
`
