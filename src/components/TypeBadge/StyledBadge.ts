import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
// types
import type { Type } from 'pokenode-ts';
import type { TypeBadgeProps } from './index';
// styles
import { float as floatAnim } from '@/components/BaseStyles';

const isDarkBackground = (type: Type['name']): boolean =>
  !!type.match(/^(dark|dragon|fighting|ghost|poison|shadow|unknown)$/);

const Badge = styled(motion.div)<TypeBadgeProps>`
  align-items: center;
  background: ${({ theme, $typename, $fill }) => !$fill && theme.colors.types[$typename]};
  border: 1px solid ${({ theme }) => theme.colors.white};
  border-radius: 4px;
  color: ${({ theme, $typename }) =>
    isDarkBackground($typename) ? theme.colors.white : theme.colors.black};
  display: flex;
  flex-direction: row;
  font-family: 'Quicksand', sans-serif;
  font-size: 1em;
  font-weight: 600;
  gap: 0.5em;
  justify-content: center;
  text-transform: capitalize;
  width: auto;

  ${({ $iconOnly, flexmargin }) =>
    $iconOnly
      ? css`
          display: inline-flex;
          ${flexmargin && `margin: ${flexmargin};`}
          padding: 0.3em;
        `
      : css`
          ${flexmargin && `margin: ${flexmargin};`}
          padding: 0.5em;
        `}

  ${({ theme }) => css`
    @media ${theme.device.lg} {
      font-size: 1.2em;
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

    & > path {
      ${({ theme, $typename, $fill }) => css`
        fill: ${$fill ? theme.colors.types[$typename] : theme.colors.white};
        stroke: ${theme.colors.black};
      `};
    }
  }
`;

export { Badge };
