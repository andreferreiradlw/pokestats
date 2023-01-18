import styled, { css } from 'styled-components';
// types
import type { BoxProps } from './index';
import type { Type } from 'pokenode-ts';
// helpers
import { responsiveProps, flexStyle } from '@/helpers';
import { motion } from 'framer-motion';
// config
import { boxConfig } from './config';

const gutterStyle = () => css`
  ${responsiveProps('padding', boxConfig.gutterWidth)}
`;

const emphasizedBgColor = (typeName: Type['name']) => {};

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

  /** emphasized background */
  ${({ theme, $emphasizedBg, flexpadding, borderradius, backgroundcolor }) =>
    $emphasizedBg &&
    css`
      ${!backgroundcolor &&
      css`
        background: ${theme.colors.$emphasizedBg[$emphasizedBg]};
      `}
      ${!borderradius &&
      css`
        border-radius: 10px;
      `}
    ${!flexpadding &&
      css`
        padding: 1em;
      `}
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
`;

export default BoxWrapper;
