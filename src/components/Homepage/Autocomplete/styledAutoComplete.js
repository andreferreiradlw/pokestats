import styled from 'styled-components'

const Container = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  width: ${({ theme }) => theme.autoComplete.container.width};
  max-width: 850px;
  margin: 0 auto;
`

const Input = styled.input`
  margin-right: 5px;
  padding: 0;
  ${(props) => console.log(props)}
`

export { Container, Input }
