import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import type { ThemeType } from '../Theme/theme';

const focusStyles = css`
  ${({ theme }) => css`
    &:focus,
    &:focus-visible {
      outline: ${theme.colors.tertiary.main} auto 1px;
      outline-offset: 2px;
    }
  `}
`;

const darkValues = (theme: ThemeType) => css`
  background-color: ${theme.colors.secondary.main};
  border: 2px solid ${theme.colors.secondary.main};
  color: ${theme.colors.secondary.contrastText};

  &:hover,
  &:active {
    background-color: ${theme.colors.primary.main};
    color: ${theme.colors.primary.contrastText};
  }
  &:hover {
    box-shadow: 2px 2px 5px ${theme.colors.lightShadow};
  }
  &:active {
    box-shadow: 1px 1px 2px 0px ${theme.colors.darkerShadow} inset;
  }
`;

const lightValues = (theme: ThemeType) => css`
  background-color: ${theme.colors.primary.main};
  border: 2px solid ${theme.colors.secondary.main};
  color: ${theme.colors.primary.contrastText};

  &:hover,
  &:active {
    background-color: ${theme.colors.secondary.main};
    border: 2px solid ${theme.colors.secondary.main};
    color: ${theme.colors.secondary.contrastText};
  }
  &:hover {
    box-shadow: 2px 2px 5px ${theme.colors.lightShadow};
  }
  &:active {
    box-shadow: 1px 1px 2px 0px ${theme.colors.lighterShadow} inset;
  }
`;

const Button = styled(motion.button)<{ $dark?: boolean; $active?: boolean }>`
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  font-weight: 500;
  padding: 10px 20px;
  text-align: center;
  transition: box-shadow 0.2s ease-in-out;

  ${focusStyles}

  ${({ $active, $dark, theme }) =>
    $dark
      ? $active
        ? lightValues(theme)
        : darkValues(theme)
      : $active
      ? darkValues(theme)
      : lightValues(theme)}
`;

export { Button, focusStyles };
