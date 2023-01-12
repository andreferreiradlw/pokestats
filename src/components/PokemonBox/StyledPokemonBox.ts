import styled, { css } from 'styled-components';
// types
import type { PokemonBoxProps } from './index';
// styles
import { float } from '@/components/BaseStyles';
// components
import { motion } from 'framer-motion';

const PokeBox = styled(motion.div)<{
  $dark?: PokemonBoxProps['$dark'];
}>`
  align-items: center;
  border: 1px solid transparent;
  border-radius: 4px;
  display: flex;
  flex-basis: auto;
  flex-direction: column;
  font-weight: 600;
  gap: 0.5em;
  justify-content: center;
  max-width: 155px;
  overflow: hidden;
  padding: 1rem;
  position: relative;
  text-align: center;
  transition: border 0.1s ease-in-out;
  transition: box-shadow 0.05s ease-in-out;
  width: 155px;

  &:hover {
    cursor: pointer;

    &:active {
      transition: box-shadow 0.01s ease-in-out;
    }

    img {
      @media (prefers-reduced-motion: no-preference) {
        animation: ${float} infinite 3s ease-in-out;
      }
    }
  }

  ${({ $dark, theme }) =>
    $dark
      ? css`
          background-color: ${theme.colors.black};
          color: ${theme.colors.white};
          &::hover,
          &:active {
            border: 1px solid ${theme.colors.white};
          }
          &:hover {
            box-shadow: 1px 1px 3px 0px ${theme.colors.darkerShadow};
          }
          &:active {
            box-shadow: 1px 1px 2px 0px ${theme.colors.lighterShadow} inset;
          }
        `
      : css`
          background-color: ${theme.colors.white};
          color: ${theme.colors.black};
          &::hover,
          &:active {
            border: 1px solid ${theme.colors.black};
          }
          &:hover {
            box-shadow: 1px 1px 3px 0px ${theme.colors.lighterShadow};
          }
          &:active {
            box-shadow: 1px 1px 2px 0px ${theme.colors.darkerShadow} inset;
          }
        `}
`;

const NumberId = styled.span`
  font-size: 2rem;
`;

const PokeName = styled.span`
  font-size: 1.2rem;
`;

const PokeGen = styled.span`
  font-size: 1rem;
  font-weight: 300;
`;

export { PokeBox, NumberId, PokeName, PokeGen };
