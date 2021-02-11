import styled, { css } from 'styled-components'
import Box from '../../Box'

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

export { TypeContainer, Genera, Flavor }
