import styled from 'styled-components'

const Container = styled.main`
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  z-index: 1;
`

const Heading = styled.h1`
  font-size: 6rem;
  line-height: 6.5rem;
  font-family: 'Josefin Sans', sans-serif;
  color: white;
  font-weight: 700;
  margin-bottom: 25px;
  text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000,
    2px 2px 0 #000;
`

export { Container, Heading }
