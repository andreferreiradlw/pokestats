'use client';

// helpers
import { usePathname } from 'next/navigation';
// components
import { Container, Title, Message, Image } from './StyledNotFound';
import CustomButton from '@/components/CustomButton';
import Link from 'next/link';
import { Stack } from '@mui/material';
import ParticlesV2 from '@/components/ParticlesV2';

const NotFoundPage = (): JSX.Element => {
  // Get the current path
  const pathname = usePathname();

  return (
    <Container justifyContent="center" alignItems="center">
      <Image
        pixelatedimg
        imageUrl="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/250.gif"
        customKey={`404-pokemon-gif-${pathname}`}
        alt="Image of Oh-ho pokemon"
      />
      <Title variant="mainHeading">HO-OH!</Title>
      <Stack width="100%" justifyContent="center" alignItems="center">
        <Message variant="sectionMessage" gutterBottom>
          The requested page {pathname && <span>{pathname}</span>} could not be found.
        </Message>
        <Message variant="sectionMessage">Check that you typed the URL correctly!</Message>
        <Link href="/" passHref>
          <CustomButton variant="contained" key="404-notfound-btn" sx={{ mt: 4 }}>
            Go back home
          </CustomButton>
        </Link>
      </Stack>
      <ParticlesV2 />
    </Container>
  );
};

export default NotFoundPage;
