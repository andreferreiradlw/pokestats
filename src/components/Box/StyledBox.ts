import styled, { css } from 'styled-components';
// types
import type { BoxProps } from './index';
// helpers
import { responsiveProps, flexStyle } from '@/helpers';
import { motion } from 'framer-motion';
// config
import { boxConfig } from './config';

const debugStyle = () => css`
  background-color: #5901ad40;
  outline: #fff solid 1px;
`;

const gutterStyle = () => css`
  ${responsiveProps('padding', boxConfig.gutterWidth)}
`;

const BoxWrapper = styled(motion.div)<BoxProps>`
  /** dynamic styles */
  ${({
    flexAlign,
    $alignSelf,
    $background,
    $borderRadius,
    $direction,
    $flexWrap,
    $gap,
    $height,
    $hide,
    $justify,
    $margin,
    $minHeight,
    $padding,
    $width,
  }) => css`
    // flexbox styles
    display: ${$hide ? 'none' : 'flex'};
    ${flexAlign && responsiveProps('align-items', flexAlign)}
    ${$alignSelf && responsiveProps('align-self', $alignSelf)}
    ${$direction && responsiveProps('flex-direction', $direction)}
    ${$flexWrap && responsiveProps('flex-wrap', $flexWrap)}
    ${$gap && responsiveProps('gap', $gap)}
    ${$justify && responsiveProps('justify-content', $justify)}
    // spacing
    ${$margin && responsiveProps('margin', $margin)}
    ${$padding && responsiveProps('padding', $padding)}
    // sizing
    ${$height && responsiveProps('height', $height)}
    ${$minHeight && responsiveProps('min-height', $minHeight)}
    ${$width && responsiveProps('width', $width)}
    // others
    ${$background && responsiveProps('background', $background)}
    ${$borderRadius && responsiveProps('border-radius', $borderRadius)}
  `}

  /** column-based flex size */
  ${({ $constrained, $sizes }) =>
    $constrained
      ? css`
          // flex-basis: 100%;
        `
      : $sizes
      ? flexStyle($sizes)
      : css`
          flex-basis: auto;
        `}
  
  ${({ $constrained, $sizes, $flexGrow }) =>
    !$constrained &&
    !$sizes &&
    $flexGrow &&
    css`
      flex-grow: 1;
    `}
  
  /** constrained max-width */
  ${({ $constrained, $flexGrow }) =>
    $constrained &&
    css`
      ${$flexGrow && 'flex-grow: 1;'}
      max-width: ${boxConfig.constrained};
    `};

  /** Position */
  ${({ $relative }) =>
    $relative &&
    css`
      position: relative;
    `}

  /** gutter */
  ${({ $padding, $withGutter }) => !$padding && $withGutter && gutterStyle()}

  /** debug */
  ${({ $debug }) => $debug && debugStyle()}
`;

export default BoxWrapper;
