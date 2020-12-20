// components
import Header from '../Header'
import Box from '../Box'

export default function Layout({ withHeader, children, ...rest }) {
  return (
    <>
      {withHeader && <Header />}
      <Box as="main" withGutter {...rest}>
        {children}
      </Box>
    </>
  )
}
