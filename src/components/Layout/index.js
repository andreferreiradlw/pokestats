// components
import Header from '../Header'
import Footer from '../Footer'
import Box from '../Box'

export default function Layout({
  withFooter,
  withGutter = true,
  withHeader,
  children,
  ...rest
}) {
  return (
    <>
      {withHeader && <Header />}
      <Box as="main" withGutter={withGutter} {...rest}>
        {children}
      </Box>
      {withFooter && <Footer />}
    </>
  )
}
