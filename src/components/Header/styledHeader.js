import styled, { css } from 'styled-components'
import Box from '../Box'

const Heading = styled.h2`
  font-family: 'Josefin Sans', sans-serif;
  font-size: 2.5rem;
  line-height: 3rem;
  color: ${({ theme }) => theme.homepage.heading.color};
  font-weight: 700;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;

  &:hover {
    cursor: pointer;
  }

  ${({ theme }) => css`
    @media ${theme.device.xs} {
      font-size: 3rem;
      line-height: 3.5rem;
  `}
`

const SelectContainer = styled(Box)`
  & span {
    margin-right: 0.5rem;
  }
`

export { Heading, SelectContainer }
