import styled, { css } from 'styled-components'

const Container = styled.section`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  width: ${({ theme }) => theme.autoComplete.container.width};
  max-width: 850px;
  margin: 0 auto;
`

const Input = styled.input`
  position: relative;
  display: block;
  flex: 1 1 auto;
  width: 1%;
  margin-bottom: 0;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: white;
  height: 50px;
  background-color: black;
  border: 1px solid black;
  border-radius: 0.25rem;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  outline: none;

  ${({ theme }) => css`
    @media ${theme.device.laptop} {
      max-width: 800px;
    }
  `}
`

const Button = styled.button`
  display: flex;
  align-items: center;

  margin-left: -1px;
  background-color: black;
  color: white;

  border: 1px solid black;
  border-radius: 0.25rem;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;

  transition: all 0.2s ease;

  &:hover {
    background-color: white;
    color: black;
    cursor: pointer;
  }
`

const Wrapper = styled.ul`
  position: absolute;
  margin-top: 50px;
  right: 0;
  left: 0;
  z-index: 100;
  border-radius: 0.25rem;
  padding-left: 0;
  overflow-y: auto;
  list-style-type: none;
  background: #fff;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
`

const WrapperOption = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  font-size: 0.875rem;
  cursor: pointer;
  background: rgb(255, 255, 255);

  &:hover {
    background: black;
    color: white;
  }

  & img {
    width: 50px;
  }
`

export { Container, Input, Button, Wrapper, WrapperOption }
