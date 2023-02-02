import styled from 'styled-components';
// styles
import { UppercasedTd } from '@/BaseStyles';

const LocationCell = styled.a`
  align-items: center;
  display: flex;
  gap: 2em;
  height: auto !important;
  text-transform: capitalize;
`;

const PokeImg = styled.img`
  float: left;
  image-rendering: pixelated;
  margin: -25px;
`;

export { LocationCell, PokeImg };
