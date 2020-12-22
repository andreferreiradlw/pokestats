import styled, { css } from 'styled-components'
import Box from '../Box'

const DescriptionList = styled(Box)`
  margin-bottom: 1.5rem;
  font-size: 1rem;
  line-height: 1.2rem;
  word-break: break-all;
  border-collapse: collapse;
  border-spacing: 0;

  & th {
    font-size: 0.875rem;
    font-weight: normal;
    text-align: right;
    white-space: nowrap;
  }

  & td {
    padding: 6px 16px;
    font-weight: 600;

    & span:not(:last-of-type) {
      margin-right: 0.5rem;
    }
  }
`

export { DescriptionList }
