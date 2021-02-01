import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'
// components
import Box from '../../Box'
// styles
import { float } from '../../BaseStyles'

const ImageContainer = styled(Box)`
  position: relative;
  height: 100%;

  ${({ theme }) => css`
    @media ${theme.device.lg} {
      min-height: 500px;
    }
  `}

  & img {
    max-width: 80%;
    margin: 1.5rem 0;

    ${({ theme }) => css`
      @media ${theme.device.xs} {
        max-width: 65%;
      }
      @media ${theme.device.sm} {
        max-width: 60%;
      }
      @media ${theme.device.md} {
        max-width: 55%;
      }
      @media ${theme.device.lg} {
        max-width: 60%;
      }
    `}

    @media (prefers-reduced-motion: no-preference) {
      animation: ${float} infinite 3s ease-in-out;
    }
  }
`

const JpnName = styled(motion.span)`
  position: absolute;
  top: 0;
  right: 0;
  z-index: -1;
  // text
  word-break: break-all;
  line-height: 1;
  text-transform: uppercase;
  text-align: center;
  font-size: 3rem;
  font-weight: bold;
  user-select: none;
  width: 1em;

  ${({ theme }) => css`
    color: ${theme.jpnName.color};

    @media ${theme.device.xxs} {
      display: none;
    }
    color: black;
    @media ${theme.device.md} {
      display: inline-block;
    }
  `}
`

export { ImageContainer, JpnName }
