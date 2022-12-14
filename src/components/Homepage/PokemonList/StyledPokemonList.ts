import styled, { css } from 'styled-components';
import Box from '@/components/Box';

const Container = styled(Box)`
  ${({ theme }) => css`
    background-color: ${theme.homepage.pokemonList.backgroundColor};
    color: ${theme.homepage.pokemonList.color};
  `}
`;

const SelectContainer = styled(Box)`
  div {
    margin-bottom: 1.5rem;

    label {
      margin-right: 0.5rem;
    }
  }

  div:nth-of-type(1) {
    margin-right: 1.5rem;
  }
`;

export { Container, SelectContainer };
