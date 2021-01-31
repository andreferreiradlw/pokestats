import { breakpoints } from '../Box/config'

const white = '#FFF'
const black = '#000'

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
      color: white,
      backgroundColor: black,
      borderColor: black,
      hover: {
        color: black,
        backgroundColor: white,
      },
    },
    button: {
      color: white,
      backgroundColor: black,
      borderColor: black,
      hover: {
        color: black,
        backgroundColor: white,
      },
      disabled: {
        color: 'lightgrey',
        backgroundColor: white,
      },
    },
    wrapperOption: {
      color: black,
      backgroundColor: white,
      hover: {
        color: white,
        backgroundColor: black,
      },
    },
  },
  button: {
    activeShadow: 'rgba(255, 255, 255, 0.75)',
    backgroundColor: white,
    borderColor: white,
    boxShadow: 'rgba(255, 255, 255, 0.3)',
    color: black,
    hoverBackground: black,
    hoverBorder: black,
    hoverColor: white,
    dark: {
      activeShadow: 'rgba(0, 0, 0, 0.75)',
      backgroundColor: black,
      borderColor: black,
      boxShadow: 'rgba(0, 0, 0, 0.3)',
      color: white,
      hoverBackground: white,
      hoverBorder: black,
      hoverColor: black,
    },
  },
  header: {
    backgroundColor: white,
  },
  homepage: {
    heading: {
      color: white,
    },
    pokemonList: {
      backgroundColor: black,
      color: white,
    },
  },
  jpnName: {
    color: black,
  },
  particles: {
    backgroundColor: white,
  },
  pokemonBox: {
    activeShadow: 'rgba(0, 0, 0, 0.75)',
    backgroundColor: white,
    boxShadow: 'rgba(255, 255, 255, 0.75)',
    color: black,
    hoverBorder: black,
    dark: {
      activeShadow: 'rgba(255, 255, 255, 0.75)',
      backgroundColor: black,
      boxShadow: 'rgba(0, 0, 0, 0.75)',
      color: white,
      hoverBorder: white,
    },
  },
  progressBar: {
    backgroundColor: black,
  },
  typeBadge: {
    backgroundColor: {
      bug: '#A6B91A',
      dark: '#705746',
      dragon: '#6F35FC',
      electric: '#F7D02C',
      fairy: '#D685AD',
      fighting: '#C22E28',
      fire: '#EE8130',
      flying: '#A98FF3',
      ghost: '#735797',
      grass: '#7AC74C',
      ground: '#E2BF65',
      ice: '#96D9D6',
      normal: '#A8A77A',
      poison: '#A33EA1',
      psychic: '#F95587',
      rock: '#B6A136',
      steel: '#B7B7CE',
      water: '#6390F0',
    },
    color: white,
  },
}

export default theme
