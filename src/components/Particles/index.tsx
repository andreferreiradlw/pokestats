import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useCallback } from 'react';
// types
import type { Engine } from 'tsparticles-engine';
// helpers
import { loadFull } from 'tsparticles';
import { scaleInVariant } from '@/helpers/animations';
// particles
import { default as ParticlesJS } from 'react-particles';
// config
import particleConfig from './config';

const ParticlesContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: -1;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: ${({ theme }) => theme.particles.backgroundColor};
`;

const ParticlesElement = styled(ParticlesJS)`
  height: 100%;
  position: fixed;
  width: 100%;
`;

const Particles = (): JSX.Element => {
  const particlesInit = useCallback(async (engine: Engine) => {
    // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  return (
    <ParticlesContainer initial="hidden" animate="show" variants={scaleInVariant} key="particles">
      <ParticlesElement
        width="100%"
        height="100%"
        id="tsparticles"
        init={particlesInit}
        // @ts-ignore
        options={particleConfig}
      />
    </ParticlesContainer>
  );
};

export default Particles;
