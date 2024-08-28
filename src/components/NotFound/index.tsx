import { useRouter } from 'next/router';
// styles
import { Container, Title, Message, Image } from './StyledNotFound';
import CustomButton from '@/components/CustomButton';
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
        <CustomButton key="404-notfound-btn">Go back home</CustomButton>
      </Link>
      <Particles />
    </Container>
  );
};

export default NotFound;
