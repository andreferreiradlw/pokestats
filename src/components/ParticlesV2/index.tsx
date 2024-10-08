'use client';

import { useEffect, useState } from 'react';
// types
import Particles, { initParticlesEngine } from '@tsparticles/react';
import type { Engine } from '@tsparticles/engine';
// helpers
// import { loadFull } from 'tsparticles';
import { loadSlim } from '@tsparticles/slim';

// particles
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

const ParticlesV2 = (): JSX.Element | null => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) return null;

  return (
    <ParticlesContainer>
      <Particles id="tsparticles" options={particleConfig} />
    </ParticlesContainer>
  );
};

export default ParticlesV2;
