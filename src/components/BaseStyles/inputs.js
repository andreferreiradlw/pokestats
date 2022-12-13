import styled, { css } from 'styled-components'

const Select = styled.select`
  ${({ theme, light }) =>
    light
      ? css`
          background-color: ${theme.select.light.background} !important;
          color: ${theme.select.light.color};
        `
      : css`
          background-color: ${theme.select.background} !important;
          color: ${theme.select.color};
        `}

  align-items: center;
  border: none;
  border-radius: 0.25rem;
  display: flex;
  justify-content: center;
  outline: none;
  padding: 4px 2px;

  &:focus {
    border: none;
    outline: none;
  }
`

export { Select }
