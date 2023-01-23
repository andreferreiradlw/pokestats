import styled, { css } from 'styled-components';
// types
import type { PokemonBoxProps } from './index';
// styles
import { float, focusStyles } from '@/components/BaseStyles';
// components
import { motion } from 'framer-motion';
import Link from 'next/link';

const Anchor = styled(Link)`
  ${focusStyles}
`;

const PokeBox = styled(motion.div)<{
  $dark?: PokemonBoxProps['$dark'];
}>`
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.primary.light};
  border-radius: 5px;
  display: flex;
  flex-basis: auto;
  flex-direction: column;
  font-weight: 500;
  gap: 0.5em;
  justify-content: center;
  max-width: 125px;
  overflow: hidden;
  padding: 1em;
  position: relative;
  text-align: center;
  transition: border 0.1s ease-in-out;
  transition: box-shadow 0.05s ease-in-out;
  width: 125px;

  ${({ theme }) => css`
    @media ${theme.device.md} {
      max-width: 175px;
      width: 175px;
    }
  `}

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
          background-color: ${theme.colors.secondary.main};
          color: ${theme.colors.secondary.contrastText};
          &::hover,
          &:active {
            border: 1px solid ${theme.colors.primary.main};
          }
          &:hover {
            box-shadow: 1px 1px 3px 0px ${theme.colors.darkerShadow};
          }
          &:active {
            box-shadow: 1px 1px 2px 0px ${theme.colors.lighterShadow} inset;
          }
        `
      : css`
          background-color: ${theme.colors.primary.main};
          color: ${theme.colors.primary.contrastText};
          &:hover {
            box-shadow: ${theme.colors.defaultBoxShadow};
          }
          &:active {
            box-shadow: ${theme.colors.defaultInsetBoxShadow};
          }
        `}
`;

const NumberId = styled.span`
  font-size: 1.5em;

  ${({ theme }) => css`
    @media ${theme.device.md} {
      font-size: 2em;
    }
  `}
`;

const PokeName = styled.span`
  font-size: 1em;
  text-transform: capitalize;

  ${({ theme }) => css`
    @media ${theme.device.md} {
      font-size: 1.5em;
    }
  `}
`;

const PokeGen = styled.span`
  font-size: 0.85em;
  font-weight: 300;

  ${({ theme }) => css`
    @media ${theme.device.md} {
      font-size: 1em;
    }
  `}
`;

export { Anchor, PokeBox, NumberId, PokeName, PokeGen };
