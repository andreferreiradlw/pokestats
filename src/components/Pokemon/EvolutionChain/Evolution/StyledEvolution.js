import styled, { css } from 'styled-components'
// svg
import Arrow from '../../../../assets/svg/arrows.svg'

const EvoArrow = styled(Arrow)`
  width: 50px;
  margin: 0.5rem 0 1rem;
  transform: rotateZ(90deg);

  ${({ theme }) => css`
    @media ${theme.device.lg} {
      transform: none;
    }
  `}
`

const PokeGen = styled.span`
  font-size: 1rem;
  font-weight: 300;
`

export { EvoArrow, PokeGen }
