import { useCallback } from 'react';
// types
import type { Engine } from 'tsparticles-engine';
// helpers
import { loadFull } from 'tsparticles';
// particles
import ParticlesJS from 'react-particles';
// config
import particleConfig from './config';
import { styled } from '@mui/material/styles';

const ParticlesContainer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  height: '100vh',
  left: 0,
  margin: 0,
  overflow: 'hidden',
  padding: 0,
  position: 'absolute',
  top: 0,
  width: '100%',
  zIndex: -1,
}));

const Particles = (): JSX.Element => {
  // Initialize the tsParticles instance (engine) here, adding custom shapes or presets
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  return (
    <ParticlesContainer>
      <ParticlesJS
        width="100%"
        height="100%"
        id="tsparticles"
        init={particlesInit}
        // @ts-expect-error: not able to type json file object
        options={particleConfig}
      />
    </ParticlesContainer>
  );
};

export default Particles;
