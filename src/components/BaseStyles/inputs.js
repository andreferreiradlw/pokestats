import styled, { css } from 'styled-components'

const Select = styled.select`
  ${({ theme, light }) =>
    light
      ? css`
          color: ${theme.select.light.color};
          background: ${theme.select.light.background};
        `
      : css`
          color: ${theme.select.color};
          background: ${theme.select.background};
        `}

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 2px;
  border: none;
  border-radius: 0.25rem;

  &:focus {
    outline: none;
    border: none;
  }
`

export { Select }
