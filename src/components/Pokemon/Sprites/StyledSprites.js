import styled, { css, keyframes } from 'styled-components'
import Box from '../../Box'

const SpriteContainer = styled(Box)`
  margin: 0 1.5rem;

  & p {
    text-align: center;
  }
`

const Sprite = styled.img`
  ${({ dreamworld }) =>
    dreamworld &&
    css`
      height: 200px;
      margin-bottom: 1rem;
    `}
`

export { SpriteContainer, Sprite }
