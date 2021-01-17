import styled, { css } from 'styled-components'
import Box from '../../Box'

const SpriteContainer = styled(Box)`
  margin: 0 1.5rem;

  & p {
    text-align: center;
  }
`

const Sprite = styled.img`
  height: auto;
  width: 130px;

  ${({ dreamworld }) =>
    dreamworld &&
    css`
      height: 180px;
      width: auto;
      margin-bottom: 1rem;
    `}

  ${({ animated }) =>
    animated &&
    css`
      width: 80px;
      margin: 1rem 0;
    `}
`

const NoSprites = styled(Box)`
  font-size: 2rem;
  line-height: 2.5rem;
  text-align: center;
`

export { SpriteContainer, Sprite, NoSprites }
