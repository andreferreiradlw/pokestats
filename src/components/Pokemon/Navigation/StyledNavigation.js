import styled, { css, keyframes } from 'styled-components'
import Box from '../../Box'

const Arrow = styled.span`
  position: absolute;
  width: 0;
  height: 0;
  border-top: 45px solid transparent;
  border-bottom: 45px solid transparent;
  transition: all 0.15s ease-in-out;
`

const ArrowLeft = styled(Arrow)`
  right: 0;
  border-right: 10px solid black;
  box-shadow: 10px 0 0 0 black, 10px 3px 0 0 black;
`
const ArrowRight = styled(Arrow)`
  left: 0;
  border-left: 10px solid black;
  box-shadow: -10px 0 0 0 black, -10px 3px 0 0 black;
`

const BtnSpan = styled.span`
  display: block;
  position: relative;
  height: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 0.5rem;
  color: white;

  ${({ left }) =>
    left &&
    css`
      float: left;
    `}

  ${({ right }) =>
    right &&
    css`
      float: right;
    `}

  ${({ isTitle }) =>
    isTitle &&
    css`
      background-color: black;
      width: 120px;
      max-width: 120px;
    `}
`

const PokemonImg = styled.img`
  width: auto;
  height: 90px;
  transition: all 0.15s ease-in-out;
`

const BtnContainer = styled.div``

const BtnAnchor = styled.a`
  position: relative;
  display: inline-block;
  overflow: hidden;
  border: 2px solid black;
  font-weight: 600;

  ${({ left }) =>
    left &&
    css`
      border-radius: 4px 0 0 4px;
      border-right: 1px solid white;
    `}

  ${({ right }) =>
    right &&
    css`
      border-radius: 0 4px 4px 0;
      border-left: 1px solid white;
    `}

  &::active {
    height: 51px;
  }

  &:hover {
    cursor: pointer;

    & ${ArrowLeft} {
      right: 10px;
    }

    & ${ArrowRight} {
      left: 10px;
    }

    & ${PokemonImg} {
      transform: scale(1.1);
    }
  }
`

const NumberID = styled.span`
  font-size: 2rem;
`

export {
  BtnContainer,
  BtnAnchor,
  BtnSpan,
  ArrowLeft,
  ArrowRight,
  PokemonImg,
  NumberID,
}
