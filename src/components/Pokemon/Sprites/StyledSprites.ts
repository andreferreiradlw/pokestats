import styled, { css } from 'styled-components';
// components
import Box from '../../Box';
import Image from '../../Image';

const SpriteContainer = styled(Box)`
  margin: 0 1.5rem;

  & p {
    margin-top: 1rem;
    text-align: center;
  }
`;

const Sprite = styled(Image)<{ $dreamworld?: boolean; $animated?: boolean }>`
  ${({ $dreamworld }) =>
    $dreamworld &&
    css`
      margin-bottom: 1rem;
    `}

  ${({ $animated }) =>
    $animated &&
    css`
      margin: 1rem 0;
    `}
`;

const NoSprites = styled(Box)`
  font-size: 2rem;
  line-height: 2.5rem;
  text-align: center;
`;

export { SpriteContainer, Sprite, NoSprites };
