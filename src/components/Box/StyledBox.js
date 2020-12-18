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
  /** generic styles */
  ${({ alignSelf }) =>
    alignSelf &&
    css`
      align-self: ${alignSelf};
    `}
  ${({ margin }) =>
    margin &&
    css`
      margin: ${margin};
    `}
  ${({ padding }) =>
    padding &&
    css`
      padding: ${padding};
    `}
  ${({ hide }) =>
    hide &&
    css`
      display: none;
    `}

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
    css`
      flex-grow: ${growProp ? 1 : 0};
    `}
  
  /** max-width */
  ${({ constrained }) =>
    constrained &&
    css`
      flex-grow: 1;
      max-width: ${boxConfig.constrained};
    `};

  /** conditional styles */
  ${({ hide }) =>
    !hide &&
    css`
      display: flex;
    `}
  ${({ flexWrap }) =>
    flexWrap &&
    css`
      flex-wrap: ${flexWrap};
    `};
  ${({ widthProp }) =>
    css`
      width: ${widthProp || '100%'};
    `}
  ${({ heightProp }) =>
    heightProp &&
    css`
      height: ${heightProp};
    `}

  /** gutter */
  ${({ padding, noGutter }) => !padding && !noGutter && gutterStyle()}

  /** responsive props */
  ${({ flexDirection }) =>
    flexDirection && responsiveProps('flex-direction', flexDirection)}
  ${({ align }) => align && responsiveProps('align-items', align)}
  ${({ justify }) => justify && responsiveProps('justify-content', justify)}

  /** debug */
  ${({ debug }) => debug && debugStyle()}
`
