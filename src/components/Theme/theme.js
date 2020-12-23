import { breakpoints } from '../Box/config'

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
    color: '#FFF',
  },
}

export default theme
