import styled from 'styled-components'
import { motion } from 'framer-motion'
// helpers
import { scaleInVariant } from '../../helpers/animations'
// particles
import { default as ParticlesJS } from 'react-particles-js'
// config
import particleParams from './particleConfig'

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
`

const ParticlesElement = styled(ParticlesJS)`
  position: fixed;
  width: 100%;
  height: 100%;
`

export default function Particles() {
  return (
    <ParticlesContainer
      initial="hidden"
      animate="show"
      variants={scaleInVariant}
      key="particles"
    >
      <ParticlesElement width="100%" height="100%" params={particleParams} />
    </ParticlesContainer>
  )
}
