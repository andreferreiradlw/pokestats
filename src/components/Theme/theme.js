const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px',
}

const theme = {
  device: {
    mobileS: `(min-width: ${size.mobileS})`,
    mobileM: `(min-width: ${size.mobileM})`,
    mobileL: `(min-width: ${size.mobileL})`,
    tablet: `(min-width: ${size.tablet})`,
    laptop: `(min-width: ${size.laptop})`,
    laptopL: `(min-width: ${size.laptopL})`,
    desktop: `(min-width: ${size.desktop})`,
    desktopL: `(min-width: ${size.desktop})`,
  },
  container: {
    maxWidth: '1920px',
  },
  autoComplete: {
    input: {
      color: '#FFF',
      backgroundColor: '#000',
      borderColor: '#000',
      hover: {
        color: '#000',
        backgroundColor: '#FFF',
      },
    },
    button: {
      color: '#FFF',
      backgroundColor: '#000',
      borderColor: '#000',
      hover: {
        color: '#000',
        backgroundColor: '#FFF',
      },
      disabled: {
        color: 'lightgrey',
        backgroundColor: '#FFF',
      },
    },
    wrapperOption: {
      color: '#000',
      backgroundColor: '#fff',
      hover: {
        color: '#FFF',
        backgroundColor: '#000',
      },
    },
  },
  homepage: {
    heading: {
      color: '#FFF',
    },
  },
  particles: {
    backgroundColor: '#FFF',
  },
}

export default theme
