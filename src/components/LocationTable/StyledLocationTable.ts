import styled from 'styled-components';
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
  margin: -20px;
  width: 60px;
`;

const MethodName = styled.p``;

const TypePill = styled.span``;

export { MethodContainer, MethodName, PokemonCell, LocationAnchor, PokeImg };
