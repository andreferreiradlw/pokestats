import styled from 'styled-components'
import { default as ParticlesJS } from 'react-particles-js'
import particleParams from './particleConfig'

const ParticleContainer = styled(ParticlesJS)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: ${({ theme }) => theme.particles.backgroundColor};
`

export default function Particles() {
  return (
    <ParticleContainer width="100%" height="100%" params={particleParams} />
  )
}
