import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'
// styles
import { float } from './keyframes'

const PokeBox = styled(motion.a)`
  display: flex;
  flex-basis: auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${({ width }) =>
    !width &&
    css`
      max-width: 150px;
      width: 150px;
    `}

  ${({ dark, theme }) =>
    dark
      ? css`
          background-color: ${theme.pokemonBox.dark.backgroundColor};
          color: ${theme.pokemonBox.dark.color};
          &::hover,
          &:active {
            border: 1px solid ${theme.pokemonBox.dark.hoverBorder};
          }
          &:hover {
            box-shadow: 1px 1px 3px 0px ${theme.pokemonBox.dark.boxShadow};
          }
          &:active {
            box-shadow: 1px 1px 2px 0px ${theme.pokemonBox.dark.activeShadow}
              inset;
          }
        `
      : css`
          background-color: ${theme.pokemonBox.backgroundColor};
          color: ${theme.pokemonBox.color};
          &::hover,
          &:active {
            border: 1px solid ${theme.pokemonBox.hoverBorder};
          }
          &:hover {
            box-shadow: 1px 1px 3px 0px ${theme.pokemonBox.boxShadow};
          }
          &:active {
            box-shadow: 1px 1px 2px 0px ${theme.pokemonBox.activeShadow} inset;
          }
        `}

  padding: 1rem;
  margin: 0.5rem;
  border: 1px solid transparent;
  border-radius: 4px;
  text-align: center;
  font-weight: 600;
  transition: border 0.1s ease-in-out;
  transition: box-shadow 0.05s ease-in-out;

  &:hover {
    cursor: pointer;

    &:active {
      transition: box-shadow 0.01s ease-in-out;
    }

    & img {
      @media (prefers-reduced-motion: no-preference) {
        animation: ${float} infinite 3s ease-in-out;
      }
    }
  }
`

const NumberId = styled(motion.span)`
  font-size: 2rem;
`

const PokeName = styled(motion.span)`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`

export { PokeBox, NumberId, PokeName }
