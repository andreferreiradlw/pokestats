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
    $hide,
    backgroundcolor,
    borderradius,
    flexalign,
    flexalignself,
    flexdirection,
    flexgap,
    flexheight,
    flexjustify,
    flexmargin,
    flexpadding,
    flexwrap,
    minheight,
    width,
  }) => css`
    // flexbox styles
    display: ${$hide ? 'none' : 'flex'};
    ${flexalign && responsiveProps('align-items', flexalign)}
    ${flexalignself && responsiveProps('align-self', flexalignself)}
    ${flexdirection && responsiveProps('flex-direction', flexdirection)}
    ${flexwrap && responsiveProps('flex-wrap', flexwrap)}
    ${flexgap && responsiveProps('gap', flexgap)}
    ${flexjustify && responsiveProps('justify-content', flexjustify)}
    // spacing
    ${flexmargin && responsiveProps('margin', flexmargin)}
    ${flexpadding && responsiveProps('padding', flexpadding)}
    // sizing
    ${flexheight && responsiveProps('height', flexheight)}
    ${minheight && responsiveProps('min-height', minheight)}
    ${width && responsiveProps('width', width)}
    // others
    ${backgroundcolor && responsiveProps('background', backgroundcolor)}
    ${borderradius && responsiveProps('border-radius', borderradius)}
  `}

  /** column-based flex size */
  ${({ $constrained, screensizes }) =>
    $constrained
      ? css`
          // flex-basis: 100%;
        `
      : screensizes
      ? flexStyle(screensizes)
      : css`
          flex-basis: auto;
        `}
  
  ${({ $constrained, screensizes, $flexgrow }) =>
    !$constrained &&
    !screensizes &&
    $flexgrow &&
    css`
      flex-grow: 1;
    `}
  
  /** $constrained max-width */
  ${({ $constrained, $flexgrow }) =>
    $constrained &&
    css`
      ${$flexgrow && 'flex-grow: 1;'}
      max-width: ${boxConfig.$constrained};
    `};

  /** Position */
  ${({ $isRelative }) =>
    $isRelative &&
    css`
      position: relative;
    `}

  /** gutter */
  ${({ flexpadding, $withGutter }) => !flexpadding && $withGutter && gutterStyle()}

  /** debug */
  ${({ $debug }) => $debug && debugStyle()}
`;

export default BoxWrapper;
