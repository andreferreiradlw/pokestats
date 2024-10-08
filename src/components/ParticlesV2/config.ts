import type { IOptions, RecursivePartial } from '@tsparticles/engine';

const particleConfig: RecursivePartial<IOptions> = {
  particles: {
    number: {
      value: 20,
      density: {
        enable: true,
      },
    },
    color: {
      value: '#000',
    },
    shape: {
      type: 'image',
      options: {
        image: [
          {
            src: '../static/iconLibrary/pokeball.svg',
            width: 100,
            height: 100,
          },
        ],
      },
    },
    opacity: {
      value: 1,
      animation: {
        enable: false,
      },
    },
    size: {
      value: { min: 10, max: 50 },
      animation: {
        enable: false,
      },
    },
    links: {
      enable: false,
    },
    move: {
      enable: true,
      speed: 0.5,
      random: true,
      straight: false,
      outModes: {
        default: 'out',
      },
      drift: 0,
      gravity: {
        acceleration: 9.81,
        enable: false,
        inverse: false,
        maxSpeed: 50,
      },
      attract: {
        enable: false,
        rotate: {
          x: 3687.8477399907024,
          y: 1200,
        },
      },
    },
  },
  interactivity: {
    detectsOn: 'window',
    events: {
      onHover: {
        enable: false,
        mode: 'repulse',
      },
      onClick: {
        enable: false,
        mode: 'repulse',
      },
    },
  },
  retinaDetect: true,
};

export default particleConfig;
