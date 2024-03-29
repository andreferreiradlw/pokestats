const particleConfig = {
  particles: {
    number: {
      value: 15,
      density: {
        enable: true,
        value_area: 1500,
      },
    },
    color: {
      value: '#000',
    },
    shape: {
      type: 'image',
      image: {
        src: '../static/iconLibrary/pokeball.svg',
        width: 100,
        height: 100,
      },
    },
    opacity: {
      value: 1,
      random: false,
      anim: {
        enable: false,
      },
    },
    size: {
      value: 40,
      random: true,
      anim: {
        enable: false,
      },
    },
    line_linked: {
      enable: false,
    },
    move: {
      enable: true,
      speed: 0.5,
      random: true,
      straight: false,
      out_mode: 'out',
      bounce: true,
      drift: 0,
      gravity: {
        acceleration: 9.81,
        enable: false,
        inverse: false,
        maxSpeed: 50,
      },
      attract: {
        enable: false,
        rotateX: 3687.8477399907024,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    detect_on: 'window',
    events: {
      onhover: {
        enable: false,
        mode: 'repulse',
      },
      onclick: {
        enable: false,
        mode: 'repulse',
      },
      resize: true,
    },
  },
  retina_detect: true,
};

export default particleConfig;
