import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
// types
import type { Type } from 'pokenode-ts';
import type { TypeBadgeProps } from './index';
// styles
import { float as floatAnim } from '@/components/BaseStyles';
// components
import Link from 'next/link';

const isDarkBackground = (type: Type['name']): boolean =>
  !!type.match(/^(dark|dragon|fighting|ghost|poison|shadow|unknown)$/);

const Anchor = styled(Link)``;

const Badge = styled(motion.div)<TypeBadgeProps>`
  align-items: center;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  font-family: 'Quicksand', sans-serif;
  font-size: 1em;
  font-weight: 600;
  gap: 0.5em;
  justify-content: center;
  text-transform: capitalize;
  transform: background 0.5 ease-in-out;
  transition: box-shadow 0.05s ease-in-out;
  width: auto;

  ${({ theme, $typename, $fill }) => css`
    ${!$fill && `background: ${theme.colors.typesHalf[$typename]};`};
    border: 1px solid ${theme.colors.primary.main};
    color: ${isDarkBackground($typename) ? theme.colors.lightText : theme.colors.darkText};

    &:hover {
      ${!$fill && `background: ${theme.colors.types[$typename]};`}
      box-shadow: ${theme.colors.defaultBoxShadow};
    }

    &:active {
      box-shadow: ${theme.colors.defaultInsetBoxShadow};
    }
  `}

  ${({ theme, $iconOnly, flexmargin }) =>
    $iconOnly
      ? css`
          display: inline-flex;
          ${flexmargin && `margin: ${flexmargin};`}
          padding: 0.3em;
        `
      : css`
          ${flexmargin && `margin: ${flexmargin};`}
          padding: 0.25em;

          @media ${theme.device.md} {
            padding: 0.5em;
          }
        `}

  ${({ $float }) =>
    $float &&
    css`
      @media (prefers-reduced-motion: no-preference) {
        animation: ${floatAnim} infinite 3s ease-in-out;
      }
    `}

  & svg {
    ${({ $iconOnly, $iconWidth, $iconHeight }) =>
      !$iconOnly
        ? css`
            height: ${$iconHeight || '25px'};
            width: ${$iconWidth || '25px'};
          `
        : css`
            height: ${$iconHeight || '15px'};
            width: ${$iconWidth || '15px'};
          `}

    path {
      ${({ theme, $typename, $fill }) => css`
        fill: ${$fill ? theme.colors.types[$typename] : theme.colors.primary.main};
        stroke: ${theme.colors.primary.contrastText};
      `};
    }
  }
`;

export { Anchor, Badge };
