import type { IOptions, RecursivePartial } from '@tsparticles/engine';
import { particles } from './particles';

const particleConfig: RecursivePartial<IOptions> = {
  particles: {
    number: {
      value: 22, // Particle count for a more lively hover effect
      density: {
        enable: true,
        height: 1200,
        width: 1200,
      },
    },
    shape: {
      type: 'image',
      options: {
        image: particles,
      },
    },
    opacity: {
      value: 1,
      animation: {
        enable: false,
      },
    },
    collisions: {
      enable: true,
      mode: 'bounce',
      maxSpeed: 10,
    },
    size: {
      value: { min: 20, max: 75 }, // Particles vary in size
      animation: {
        enable: true,
        speed: 2,
        mode: 'random',
      },
    },
    rotate: {
      value: 200, // Initial rotation angle
      animation: {
        enable: true,
        speed: 3, // Speed of the rotation
        sync: false, // Each particle rotates at a different speed
      },
      direction: 'clockwise', // Can be 'clockwise' or 'counterclockwise'
    },
    links: {
      enable: false, // No links between particles
    },
    move: {
      enable: true,
      speed: { min: 0.1, max: 1 }, // Increased speed for a noticeable rightward motion
      direction: 'right', // Ensures particles move to the right
      random: false, // Disable random movement so particles follow the set direction
      straight: false, // Ensure non-linear movement
      outModes: {
        default: 'out', // Particles leave and re-enter smoothly
      },
      drift: 1, // Adds gentle drifting to make the movement feel less static
      gravity: {
        enable: false, // No gravity effect
      },
      path: {
        enable: true, // Enable path-based movement for wave-like motion
        options: {
          frequency: 1, // Lower frequency for smoother waves
          amplitude: 20, // Larger amplitude to make the wave noticeable
        },
      },
    },
  },
  interactivity: {
    detectsOn: 'canvas', // No user interactions
    events: {
      onHover: {
        enable: false, // Disable hover interaction
      },
      onClick: {
        enable: false, // Disable click interaction
      },
    },
  },
  retinaDetect: true, // Enhances appearance on high-DPI screens
};

export default particleConfig;
