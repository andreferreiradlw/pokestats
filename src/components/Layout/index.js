import styled from 'styled-components'
// components
import Header from '../Header'
import Footer from '../Footer'
import Box from '../Box'

const LayoutContainer = styled(Box)`
  min-height: 100vh;
`

export default function Layout({
  withFooter,
  withGutter = true,
  withHeader,
  children,
  ...rest
}) {
  return (
    <LayoutContainer direction="column" noGutter>
      {withHeader && <Header />}
      <Box as="main" withGutter={withGutter} flexGrow {...rest}>
        {children}
      </Box>
      {withFooter && <Footer />}
    </LayoutContainer>
  )
}
