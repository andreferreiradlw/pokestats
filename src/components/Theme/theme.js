import { breakpoints } from '../../helpers/box'

const theme = {
  device: {
    xxs: `(min-width: ${breakpoints.xxs}rem)`,
    xs: `(min-width: ${breakpoints.xs}rem)`,
    sm: `(min-width: ${breakpoints.sm}rem)`,
    md: `(min-width: ${breakpoints.md}rem)`,
    lg: `(min-width: ${breakpoints.lg}rem)`,
    xl: `(min-width: ${breakpoints.xl}rem)`,
    xxl: `(min-width: ${breakpoints.xxl}rem)`,
  },
  container: {
    maxWidth: '1200px',
    padding: '0 2rem',
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
  header: {
    backgroundColor: '#E3350D',
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
