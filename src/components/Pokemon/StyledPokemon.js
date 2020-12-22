import styled, { css } from 'styled-components'
import Box from '../Box'

const DescriptionList = styled(Box)`
  margin-bottom: 1.5rem;
  font-size: 1rem;
  line-height: 1.2rem;
  word-break: break-word;
  border-collapse: collapse;
  border-spacing: 0;

  & th {
    padding: 6px 0;
    font-size: 0.875rem;
    font-weight: normal;
    text-align: right;
    white-space: nowrap;
    vertical-align: top;
  }

  & td {
    padding: 6px 16px;
    font-weight: 500;
  }
`

export { DescriptionList }
