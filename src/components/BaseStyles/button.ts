import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

const darkValues = theme => css`
  background-color: ${theme.button.dark.backgroundColor};
  border: 2px solid ${theme.button.dark.borderColor};
  color: ${theme.button.dark.color};
  &:hover,
  &:active {
    background-color: ${theme.button.dark.hoverBackground};
    border: 2px solid ${theme.button.dark.hoverBorder};
    color: ${theme.button.dark.hoverColor};
  }
  &:hover {
    box-shadow: 2px 2px 5px ${theme.button.dark.boxShadow};
  }
  &:active {
    box-shadow: 1px 1px 2px 0px ${theme.button.dark.activeShadow} inset;
  }
`;

const lightValues = theme => css`
  background-color: ${theme.button.backgroundColor};
  border: 2px solid ${theme.button.borderColor};
  color: ${theme.button.color};
  &:hover,
  &:active {
    background-color: ${theme.button.hoverBackground};
    border: 2px solid ${theme.button.hoverBorder};
    color: ${theme.button.hoverColor};
  }
  &:hover {
    box-shadow: 2px 2px 5px ${theme.button.boxShadow};
  }
  &:active {
    box-shadow: 1px 1px 2px 0px ${theme.button.activeShadow} inset;
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
