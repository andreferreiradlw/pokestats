import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'
// styles
import { float as floatAnim } from '../BaseStyles'

const Badge = styled(motion.a)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: auto;
  background-color: ${({ theme, type, fill }) =>
    !fill && theme.typeBadge.backgroundColor[type]};
  color: ${({ theme }) => theme.typeBadge.color};
  font-family: 'Quicksand', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 4px;
  text-shadow: -0.5px -0.5px 0 #000, 0.5px -0.5px 0 #000, -0.5px 0.5px 0 #000,
    0.5px 0.5px 0 #000;

  ${({ $iconOnly, margin }) =>
    $iconOnly
      ? css`
          display: inline-flex;
          margin: ${margin || '0.1rem 0.4rem 0.1rem 0'};
          padding: 0.3rem;
        `
      : css`
          margin: ${margin || '0.5rem 0.5rem 0.5rem 0'};
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
            width: ${$iconWidth || '25px'};
            height: ${$iconHeight || '25px'};
            margin-right: 1rem;
          `
        : css`
            width: ${$iconWidth || '15px'};
            height: ${$iconHeight || '15px'};
          `}

    & > path {
      fill: ${({ theme, type, fill }) =>
        fill ? theme.typeBadge.backgroundColor[type] : theme.typeBadge.color};
      stroke: black;
      stroke-width: 5;
    }
  }
`

export { Badge }
