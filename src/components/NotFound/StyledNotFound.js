import styled, { css } from 'styled-components'
// components
import Box from '../Box'
// styles
import { MainHeading, SectionMessage } from '../BaseStyles'

const Container = styled(Box)`
  margin: auto;
  height: 100vh;
  min-height: 100vh;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
`

const Title = styled(MainHeading)`
  margin-bottom: 0;
  font-style: italic;
`

const Message = styled(SectionMessage)`
  max-width: 90%;
  margin: 0 auto 1.5rem;
  font-weight: 500;
  word-break: break-word;

  span {
    font-weight: 700;
    background-color: black;
    padding: 3px 5px;
    border-radius: 4px;
  }

  ${({ theme }) => css`
    @media ${theme.device.md} {
      max-width: 75%;
      margin: 0 auto 2rem;
    }
  `}
`

const Image = styled.img`
  margin-bottom: 2rem;
  image-rendering: pixelated;
  width: 150px;

  ${({ theme }) => css`
    @media ${theme.device.md} {
      width: 200px;
    }
  `}
`

export { Container, Title, Message, Image }
