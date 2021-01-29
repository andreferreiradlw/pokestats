import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'

const SectionTitle = styled(motion.h2)`
  font-size: 2rem;
  line-height: 2.5rem;
  font-weight: 600;
  margin-bottom: 1rem;

  ${({ theme }) => css`
    @media ${theme.device.xs} {
      font-size: 2.5rem;
      line-height: 3rem;
    }
    @media ${theme.device.md} {
      font-size: 3rem;
      line-height: 3.5rem;
    }
  `}
`

const SectionSubTitle = styled(motion.h3)`
  font-size: 1.3rem;
  line-height: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;

  ${({ theme }) => css`
    @media ${theme.device.xs} {
      font-size: 1.6rem;
      line-height: 2rem;
    }
    @media ${theme.device.md} {
      font-size: 2rem;
      line-height: 2.5rem;
    }
  `}
`

const SectionMessage = styled(motion.p)`
  font-size: 0.8rem;
  line-height: 1.1rem;
  margin: 1.5rem 0;
  text-align: center;
  width: 100%;

  ${({ theme }) => css`
    @media ${theme.device.md} {
      font-size: 1rem;
      line-height: 1.5rem;
    }
    @media ${theme.device.lg} {
      font-size: 1.2rem;
      line-height: 1.7rem;
    }
  `}
`

export { SectionTitle, SectionSubTitle, SectionMessage }
