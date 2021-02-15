import styled, { css } from 'styled-components'

const Select = styled.select`
  ${({ theme, light }) =>
    light
      ? css`
          color: ${theme.select.light.color};
          background-color: ${theme.select.light.background} !important;
        `
      : css`
          color: ${theme.select.color};
          background-color: ${theme.select.background} !important;
        `}

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 2px;
  border: none;
  border-radius: 0.25rem;
  outline: none;

  &:focus {
    outline: none;
    border: none;
  }
`

export { Select }
