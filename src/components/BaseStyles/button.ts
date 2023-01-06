import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import type { ThemeType } from '../Theme/theme';

const darkValues = (theme: ThemeType) => css`
  background-color: ${theme.colors.black};
  border: 2px solid ${theme.colors.black};
  color: ${theme.colors.white};
  &:hover,
  &:active {
    background-color: ${theme.colors.white};
    border: 2px solid ${theme.colors.black};
    color: ${theme.colors.black};
  }
  &:hover {
    box-shadow: 2px 2px 5px ${theme.colors.lightShadow};
  }
  &:active {
    box-shadow: 1px 1px 2px 0px ${theme.colors.darkerShadow} inset;
  }
`;

const lightValues = (theme: ThemeType) => css`
  background-color: ${theme.colors.white};
  border: 2px solid ${theme.colors.white};
  color: ${theme.colors.black};
  &:hover,
  &:active {
    background-color: ${theme.colors.black};
    border: 2px solid ${theme.colors.black};
    color: ${theme.colors.white};
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

  font-size: 1rem;
  font-weight: 700;
  line-height: 1rem;
  margin: 0 auto;

  outline: none;
  padding: 10px 20px;

  text-align: center;
  transition: box-shadow 0.2s ease-in-out;

  ${({ $active, $dark, theme }) =>
    $dark
      ? $active
        ? lightValues(theme)
        : darkValues(theme)
      : $active
      ? darkValues(theme)
      : lightValues(theme)}

  ${({ theme }) => css`
    @media ${theme.device.md} {
      font-size: 1.2rem;
      line-height: 1.2rem;
    }
    @media ${theme.device.lg} {
      font-size: 1.4rem;
      line-height: 1.4rem;
    }
  `}
`;

export { Button };
