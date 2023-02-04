import styled, { css } from 'styled-components';
// components
import { motion } from 'framer-motion';

const MethodContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  justify-content: center;

  img {
    width: 40px;
  }
`;

const PokemonCell = styled(motion.td)`
  cursor: pointer;
  height: 40px;
  overflow: hidden;
  padding: 0.5em;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    text-decoration: underline;
  }
`;

const LocationAnchor = styled.a`
  align-items: center;
  display: flex;
  gap: 2em;
  height: auto !important;
  text-transform: capitalize;
`;

const PokeImg = styled.img`
  image-rendering: pixelated;
  margin: -10px;
  width: 60px;
`;

const MethodName = styled.p``;

const GamesContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 0.5em;
  justify-content: center;
`;

const GamePill = styled.span<{ game: string }>`
  border-radius: 4px;
  font-size: 0.75em;
  font-weight: 600;
  padding: 0.25em;
  text-transform: capitalize;

  ${({ game, theme }) => {
    switch (game) {
      case 'yellow':
        return css`
          background-color: ${theme.colors.games.yellow};
        `;
      case 'red':
        return css`
          background-color: ${theme.colors.games.red};
          color: white;
        `;
      case 'blue':
        return css`
          background-color: ${theme.colors.games.blue};
          color: white;
        `;
    }
  }}
`;

export {
  MethodContainer,
  MethodName,
  PokemonCell,
  LocationAnchor,
  PokeImg,
  GamesContainer,
  GamePill,
};
