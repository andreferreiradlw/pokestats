import styled, { css } from 'styled-components'
import Box from '../../Box'

const Container = styled(Box)`
  ${({ theme }) => css`
    background-color: ${theme.homepage.pokemonList.backgroundColor};
    color: ${theme.homepage.pokemonList.color};
  `}
`

const SelectContainer = styled(Box)`
  margin-bottom: 1rem;

  & span {
    margin-right: 0.5rem;
  }
`

export { Container, SelectContainer }
