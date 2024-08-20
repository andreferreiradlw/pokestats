import { useCallback } from 'react';
// types
import type { Engine } from 'tsparticles-engine';
// helpers
import { loadFull } from 'tsparticles';
// particles
import { default as ParticlesJS } from 'react-particles';
// config
import particleConfig from './config';
import { css, styled } from '@mui/material';

const ParticlesContainer = styled('div')(
  ({ theme }) => css`
    background-color: ${theme.palette.background.default};
    height: 100vh;
    left: 0;
    margin: 0;
    overflow: hidden;
    padding: 0;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: -1;
  `,
);

const Particles = (): JSX.Element => {
  // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
  // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
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
