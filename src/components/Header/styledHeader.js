import styled, { css } from 'styled-components'
import Box from '../Box'

const Heading = styled.h2`
  font-family: 'Josefin Sans', sans-serif;
  font-size: 3.5rem;
  line-height: 3rem;
  color: ${({ theme }) => theme.homepage.heading.color};
  font-weight: 700;
  text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000,
    2px 2px 0 #000;

  &:hover {
    cursor: pointer;
  }

  ${({ theme }) => css`
    @media ${theme.device.xs} {
      font-size: 4rem;
      line-height: 4.5rem;
  `}
`

const SelectContainer = styled(Box)`
  & span {
    margin-right: 0.5rem;
  }
`

export { Heading, SelectContainer }
