import styled from 'styled-components'
// components
import Header from '../Header'
import Footer from '../Footer'
import Box from '../Box'
import BoxWrapper from '../Box/StyledBox'

const LayoutContainer = styled(BoxWrapper)`
  min-height: 100vh;
`

export default function Layout({
  withFooter,
  withGutter = true,
  withHeader,
  withMain = true,
  constrained,
  children,
  ...rest
}) {
  return (
    <LayoutContainer direction="column" noGutter {...rest}>
      {withHeader && <Header />}
      {withMain ? (
        <Box
          as="main"
          direction="column"
          width="100%"
          withGutter={withGutter}
          constrained={constrained}
          flexGrow
        >
          {children}
        </Box>
      ) : (
        children
      )}
      {withFooter && <Footer />}
    </LayoutContainer>
  )
}
