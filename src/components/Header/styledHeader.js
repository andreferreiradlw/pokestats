import styled, { css } from 'styled-components'
import Box from '../Box'

const Header = styled(Box)`
  background-color: ${({ theme }) => theme.header.backgroundColor};
`

const Container = styled.div`
  max-width: ${({ theme }) => theme.container.maxWidth};
  padding: ${({ theme }) => theme.container.padding};
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Select = styled.select``

export { Header, Container, Select }
