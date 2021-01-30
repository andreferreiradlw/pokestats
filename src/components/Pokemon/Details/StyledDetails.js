import styled, { css } from 'styled-components'
import Box from '../../Box'

const Name = styled.h1`
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

// type
const TypeContainer = styled(Box)``

const Genera = styled.p`
  font-weight: 500;
  margin-bottom: 0.5rem;
`
const Flavor = styled.p`
  margin-bottom: 0.5rem;
  text-align: center;

  ${({ theme }) => css`
    @media ${theme.device.lg} {
      text-align: left;
    }
  `}
`

export { Name, TypeContainer, Genera, Flavor }
