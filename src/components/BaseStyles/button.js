import styled, { css } from 'styled-components'

const Button = styled.button`
  padding: 10px 20px;
  margin: 0 auto;

  font-size: 1rem;
  line-height: 1rem;
  font-weight: 700;
  text-align: center;

  outline: none;
  border-radius: 4px;

  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }

  &:active {
    transition: all 0.01s ease-in-out;
    transform: scale(1);
  }

  ${({ dark, theme }) =>
    dark
      ? css`
          background-color: ${theme.button.dark.backgroundColor};
          color: ${theme.button.dark.color};
          border: 2px solid ${theme.button.dark.borderColor};
          &:hover,
          &:active {
            color: ${theme.button.dark.hoverColor};
            background-color: ${theme.button.dark.hoverBackground};
            border: 2px solid ${theme.button.dark.hoverBorder};
          }
          &:hover {
            box-shadow: 2px 2px 5px ${theme.button.dark.boxShadow};
          }
          &:active {
            box-shadow: 1px 1px 2px 0px ${theme.button.dark.activeShadow} inset;
          }
        `
      : css`
          background-color: ${theme.button.backgroundColor};
          color: ${theme.button.color};
          border: 2px solid ${theme.button.borderColor};
          &:hover,
          &:active {
            color: ${theme.button.hoverColor};
            background-color: ${theme.button.hoverBackground};
            border: 2px solid ${theme.button.hoverBorder};
          }
          &:hover {
            box-shadow: 2px 2px 5px ${theme.button.boxShadow};
          }
          &:active {
            box-shadow: 1px 1px 2px 0px ${theme.button.activeShadow} inset;
          }
        `}

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
`

export { Button }
