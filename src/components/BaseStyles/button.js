import styled, { css } from 'styled-components'

const Button = styled.button`
  position: relative;
  padding: 10px 20px;
  margin: 0 auto;

  font-size: 1.2rem;
  font-weight: 700;
  text-align: center;

  border: none;
  outline: none;
  overflow: hidden;

  cursor: pointer;
  transition: all 0.2s ease-in-out;
  z-index: 1;

  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 295%;
    width: 140%;
    background: ${({ dark, theme }) =>
      dark ? theme.button.dark.afterColor : theme.button.afterColor};
    transition: all 0.4s ease-in-out;
    transform: translateX(-85%) translateY(-25%) rotate(45deg);
    z-index: -1;
  }

  ${({ dark, theme }) =>
    dark
      ? css`
          background-color: ${theme.button.dark.backgroundColor};
          color: ${theme.button.dark.color};
          &:hover,
          &:active {
            color: ${theme.button.dark.hoverColor};
          }
          &:hover {
            box-shadow: 2px 2px 5px ${theme.button.dark.boxShadow};
          }
        `
      : css`
          background-color: ${theme.button.backgroundColor};
          color: ${theme.button.color};
          &:hover,
          &:active {
            color: ${theme.button.hoverColor};
          }
          &:hover {
            box-shadow: 2px 2px 5px ${theme.button.boxShadow};
          }
        `}

  &:hover {
    &:after {
      transform: translateX(-10.5%) translateY(-25%) rotate(45deg);
    }
  }

  &:active {
    box-shadow: none;

    &:after {
      transition: all 0.1s ease-in-out;
      transform: scale(1.5);
    }
  }
`

export { Button }
