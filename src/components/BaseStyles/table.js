import styled, { css } from 'styled-components'
// components
import Box from '../Box'

const Table = styled(Box)`
  display: table;
  font-size: 1rem;
  line-height: 1.2rem;
  word-break: break-word;
  border-spacing: 0;
  width: 100%;

  & tbody {
    flex-grow: 1;
  }

  & tr:not(:last-of-type) {
    width: 100%;
    border-bottom: 1px solid #ececec;
  }

  & th {
    padding: 6px 0;
    font-size: 0.875rem;
    font-weight: normal;
    text-align: left;
    white-space: nowrap;
    vertical-align: middle;
  }

  & td {
    padding: 6px 16px;
    font-weight: 500;
    white-space: pre-line;
    height: 40px;
  }

  ${({ theme }) => css`
    @media ${theme.device.md} {
      width: 50%;
    }
    @media ${theme.device.lg} {
      width: 100%;
    }
  `}
`

const Numbered = styled.span`
  width: 100%;
  display: block;

  & span {
    font-weight: 300;
  }

  &:not(:last-of-type) {
    padding-bottom: 6px;
  }

  ${({ light }) =>
    light &&
    css`
      font-weight: 300;
    `}
`

export { Table, Numbered }
