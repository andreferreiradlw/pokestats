import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'

const MainHeading = styled(motion.h1)`
  font-size: 3.5rem;
  line-height: 3.5rem;
  font-family: 'Josefin Sans', sans-serif;
  color: ${({ theme }) => theme.homepage.heading.color};
  font-weight: 700;
  user-select: none;
  text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000,
    2px 2px 0 #000;

  ${({ theme }) => css`
    @media ${theme.device.xs} {
      font-size: 5rem;
      line-height: 5rem;
    }
    @media ${theme.device.md} {
      font-size: 10rem;
      line-height: 10rem;
    }
    @media ${theme.device.lg} {
      font-size: 13.5rem;
      line-height: 13.5rem;
    }
  `}
`

const PageHeading = styled.h1`
  font-size: 2.5rem;
  line-height: 3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-align: center;

  ${({ theme }) => css`
    @media ${theme.device.xs} {
      font-size: 3.5rem;
      line-height: 4rem;
    }
    @media ${theme.device.sm} {
      font-size: 5rem;
      line-height: 5.5rem;
    }
    @media ${theme.device.md} {
      font-size: 8rem;
      line-height: 8.5rem;
    }
    @media ${theme.device.lg} {
      text-align: left;
      font-size: 5.3rem;
      line-height: 5.5rem;
    }
  `}
`

export { MainHeading, PageHeading }
