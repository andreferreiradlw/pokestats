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
  background-color: ${({ theme }) => theme.particles.backgroundColor};
  height: 100vh;
  left: 0;
  margin: 0;
  overflow: hidden;
  padding: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: -1;
`;

const ParticlesElement = styled(ParticlesJS)`
  height: 100%;
  position: fixed;
  width: 100%;
`;

const Particles = ({ ...props }): JSX.Element => {
  const particlesInit = useCallback(async (engine: Engine) => {
    // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  return (
    <ParticlesContainer
      initial="hidden"
      animate="show"
      variants={scaleInVariant}
      key="particles"
      {...props}
    >
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
