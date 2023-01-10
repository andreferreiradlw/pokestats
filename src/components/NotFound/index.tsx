import { useRouter } from 'next/router';
// helpers
import { fadeInUpVariant } from '@/helpers/animations';
// styles
import { Container, Title, Message, Image } from './StyledNotFound';
import { Button } from '@/components/BaseStyles';
// components
import Link from 'next/link';
import Particles from '@/components/Particles';

const NotFound = (): JSX.Element => {
  // router
  const router = useRouter();

  return (
    <Container flexjustify="center" flexalign="center">
      <Image src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/shiny/250.gif" />
      <Title>HO-OH!</Title>
      <Message>
        The requested page {router.asPath && <span>{router.asPath}</span>} could not be found.
        <br />
        Check that you typed the URL correctly!
      </Message>
      <Link href="/" passHref>
        <Button whileHover="hover" whileTap="tap" variants={fadeInUpVariant} key="404-notfound-btn">
          Go back home
        </Button>
      </Link>
      <Particles />
    </Container>
  );
};

export default NotFound;
