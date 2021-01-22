import LazyLoad from 'react-lazyload'
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
      {withHeader && (
        <LazyLoad height={200} once>
          <Header />
        </LazyLoad>
      )}
      <Box as="main" withGutter={withGutter} {...rest}>
        {children}
      </Box>
      {withFooter && (
        <LazyLoad height={200} once offset={10}>
          <Footer />
        </LazyLoad>
      )}
    </>
  )
}
