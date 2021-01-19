import Link from 'next/link'
import { useRouter } from 'next/router'
// components
import Particles from '../Particles'
// styles
import { Container, Title, Message, Image } from './StyledNotFound'
import { Button } from '../BaseStyles'

export default function NotFound() {
  // router
  const router = useRouter()

  return (
    <Container justify="center" align="center">
      <Image src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/shiny/250.gif" />
      <Title>HO-OH!</Title>
      <Message>
        The requested page {router.asPath && <span>{router.asPath}</span>} could
        not be found.
        <br />
        Check that you typed the URL correctly!
      </Message>
      <Link href="/" passHref>
        <Button as="a">Go back home</Button>
      </Link>
      <Particles />
    </Container>
  )
}
