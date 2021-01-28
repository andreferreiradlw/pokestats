import styled from 'styled-components'
import BoxWrapper from '../Box/StyledBox'

const Container = styled(BoxWrapper)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: auto;
  height: 100vh;
  min-height: 100vh;
  z-index: 1;
`

export { Container }
