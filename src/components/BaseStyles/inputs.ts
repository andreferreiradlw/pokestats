import styled, { css } from 'styled-components';

const Select = styled.select<{ light?: boolean }>`
  ${({ theme, light }) =>
    light
      ? css`
          background-color: ${theme.colors.white} !important;
          color: ${theme.colors.black};
        `
      : css`
          background-color: ${theme.colors.black} !important;
          color: ${theme.colors.white};
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
`;

export { Select };
