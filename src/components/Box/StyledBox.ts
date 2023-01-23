import styled, { css } from 'styled-components';
// types
import type { BoxProps } from './index';
// helpers
import { responsiveProps, flexStyle } from '@/helpers';
import { motion } from 'framer-motion';

const BoxWrapper = styled(motion.div)<BoxProps>`
  /** dynamic styles */
  ${({
    backgroundcolor,
    borderradius,
    flexalign,
    flexalignself,
    flexdirection,
    flexdisplay,
    flexgap,
    flexheight,
    flexjustify,
    flexmargin,
    flexpadding,
    flexwrap,
    flexshrink,
    minheight,
    flextextalign,
    width,
  }) => css`
    // flexbox styles
    ${flexdisplay ? responsiveProps('display', flexdisplay) : 'display: flex;'}
    ${flexalign && responsiveProps('align-items', flexalign)}
    ${flexalignself && responsiveProps('align-self', flexalignself)}
    ${flexdirection && responsiveProps('flex-direction', flexdirection)}
    ${flexwrap && responsiveProps('flex-wrap', flexwrap)}
    ${flexgap && responsiveProps('gap', flexgap)}
    ${flexjustify && responsiveProps('justify-content', flexjustify)}
    ${flexshrink && responsiveProps('flex-shrink', flexshrink)}
    // spacing
    ${flexmargin && responsiveProps('margin', flexmargin)}
    ${flexpadding && responsiveProps('padding', flexpadding)}
    // sizing
    ${flexheight && responsiveProps('height', flexheight)}
    ${minheight && responsiveProps('min-height', minheight)}
    ${width && responsiveProps('width', width)}
    // typography
    ${flextextalign && responsiveProps('text-align', flextextalign)}
    // others
    ${backgroundcolor && responsiveProps('background', backgroundcolor)}
    ${borderradius && responsiveProps('border-radius', borderradius)}
  `}

  /** column-based flex size */
  ${({ $contained, screensizes, $parentGap }) =>
    $contained
      ? css`
          flex-basis: 100%;
        `
      : screensizes
      ? flexStyle(screensizes, $parentGap)
      : css`
          flex-basis: auto;
        `}
  
  ${({ $contained, screensizes, $flexgrow }) =>
    !$contained &&
    !screensizes &&
    $flexgrow &&
    css`
      flex-grow: 1;
    `}
  
  /** $contained max-width */
  ${({ $contained, $flexgrow, theme }) =>
    $contained &&
    css`
      ${$flexgrow && 'flex-grow: 1;'}
      ${responsiveProps('max-width', theme.layout.contained)}}
    `};

  /** Position */
  ${({ $isRelative }) =>
    $isRelative &&
    css`
      position: relative;
    `}

  /** gutter */
  ${({ flexpadding, $withGutter, theme }) =>
    !flexpadding &&
    $withGutter &&
    css`
      ${responsiveProps('padding', theme.layout.gutterWidth)}
    `}
`;

export default BoxWrapper;
