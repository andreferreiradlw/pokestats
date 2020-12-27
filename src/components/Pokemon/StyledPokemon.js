import styled, { css } from 'styled-components'
import Box from '../Box'

const SectionTitle = styled.h2`
  font-size: 2rem;
  line-height: 2.5rem;
  font-weight: 600;
  margin-bottom: 1rem;

  ${({ theme }) => css`
    @media ${theme.device.xs} {
      font-size: 2.5rem;
      line-height: 3rem;
    }
    @media ${theme.device.md} {
      font-size: 3rem;
      line-height: 3.5rem;
    }
  `}
`

const Table = styled(Box)`
  position: relative;
  flex-direction: row;
  margin-bottom: 1.5rem;
  font-size: 1rem;
  line-height: 1.2rem;
  word-break: break-word;
  border-collapse: collapse;
  border-spacing: 0;

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
    vertical-align: top;
  }

  & td {
    padding: 6px 16px;
    font-weight: 500;
    white-space: pre-line;
  }
`

const Numbered = styled.span`
  width: 100%;
  display: block;

  &:not(:last-of-type) {
    padding-bottom: 6px;
  }

  ${({ light }) =>
    light &&
    css`
      font-weight: 300;
    `}
`

export { SectionTitle, Table, Numbered }
