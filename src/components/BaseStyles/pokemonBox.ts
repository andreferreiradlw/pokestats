import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
// styles
import { float } from './keyframes';

const PokeBox = styled(motion.div)<{ width?: string; $dark?: boolean }>`
  align-items: center;
  border: 1px solid transparent;
  border-radius: 4px;
  display: flex;
  flex-basis: auto;

  ${({ width }) =>
    !width &&
    css`
      max-width: 150px;
      width: 150px;
    `}

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

  flex-direction: column;
  font-weight: 600;
  justify-content: center;
  padding: 1rem;
  text-align: center;
  transition: box-shadow 0.05s ease-in-out;
  transition: border 0.1s ease-in-out;

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
`;

const NumberId = styled(motion.span)`
  font-size: 2rem;
`;

const PokeName = styled(motion.span)`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

export { PokeBox, NumberId, PokeName };
