'use client';

import { usePathname } from 'next/navigation';
// styles
import { Container, Title, Message, Image } from './StyledNotFound';
import CustomButton from '@/components/CustomButton';
// components
import Link from 'next/link';
import Particles from '@/components/Particles';

const NotFound = (): JSX.Element => {
  // Get the current path
  const pathname = usePathname();

  return (
    <Container justifyContent="center" alignItems="center">
      <Image src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/shiny/250.gif" />
      <Title variant="mainHeading">HO-OH!</Title>
      <Message variant="sectionMessage">
        The requested page {pathname && <span>{pathname}</span>} could not be found.
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
