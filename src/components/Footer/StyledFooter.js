import styled, { css } from 'styled-components'
import Box from '../Box'
// pokeapi logo
// import PokeApi from '../../assets/pokeapi_logo.png'

const FooterContainer = styled(Box)`
  background-color: black;
  color: white;
  font-weight: 300;

  & span {
    margin-bottom: 1rem;
  }
`

const FooterA = styled.a`
  color: inherit;
  font-weight: 500;
  padding: 0 0 5px;
  position: relative;
  transition: ease-out 0.3s 0.1s;

  &:after {
    height: 2px;
    width: 100%;
    background: white;
    content: '';
    position: absolute;
    left: 0px;
    bottom: 0;
    transform: scaleX(0);
    transition: 0.3s;
  }

  &:hover:after {
    transform: scaleX(1);
  }

  & img {
    vertical-align: middle;
    height: 25px;
  }

  & svg {
    width: 20px;
    margin-left: 10px;
    vertical-align: bottom;
  }
`

export { FooterContainer, FooterA }
