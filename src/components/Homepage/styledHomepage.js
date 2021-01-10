import styled, { css } from 'styled-components'
import Box from '../Box'

const Container = styled(Box)`
  margin: auto;
  height: 100vh;
  min-height: 100vh;
  z-index: 1;
`

const Heading = styled.h1`
  font-size: 3.5rem;
  line-height: 4rem;
  font-family: 'Josefin Sans', sans-serif;
  color: ${({ theme }) => theme.homepage.heading.color};
  font-weight: 700;
  margin-bottom: 15px;
  text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000,
    2px 2px 0 #000;

  ${({ theme }) => css`
    @media ${theme.device.xs} {
      font-size: 5rem;
      line-height: 5.5rem;
      margin-bottom: 25px;
    }
    @media ${theme.device.md} {
      font-size: 10rem;
      line-height: 10.5rem;
    }
    @media ${theme.device.lg} {
      font-size: 13.5rem;
      line-height: 14rem;
    }
  `}
`

export { Container, Heading }
