import dynamic from 'next/dynamic'
// components
const Header = dynamic(() => import('../Header'))
const Footer = dynamic(() => import('../Footer'))
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
