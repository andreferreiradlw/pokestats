import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
// types
import type { TypeBadgeProps } from './index';
// styles
import { float as floatAnim } from '@/components/BaseStyles';

const Badge = styled(motion.div)<TypeBadgeProps>`
  align-items: center;
  background-color: ${({ theme, typename, $fill }) => !$fill && theme.colors.types[typename]};
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: row;
  font-family: 'Quicksand', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  justify-content: center;
  text-shadow: -0.5px -0.5px 0 #000, 0.5px -0.5px 0 #000, -0.5px 0.5px 0 #000, 0.5px 0.5px 0 #000;
  width: auto;

  ${({ $iconOnly, margin }) =>
    $iconOnly
      ? css`
          display: inline-flex;
          ${margin && `margin: ${margin};`}
          padding: 0.3rem;
        `
      : css`
          ${margin && `margin: ${margin};`}
          padding: 0.5rem;
        `}

  ${({ theme }) => css`
    @media ${theme.device.lg} {
      font-size: 1.2rem;
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
            margin-right: 1rem;
            width: ${$iconWidth || '25px'};
          `
        : css`
            height: ${$iconHeight || '15px'};
            width: ${$iconWidth || '15px'};
          `}

    & > path {
      fill: ${({ theme, typename, $fill }) =>
        $fill ? theme.colors.types[typename] : theme.colors.white};
      stroke: black;
      stroke-width: 5;
    }
  }
`;

export { Badge };
