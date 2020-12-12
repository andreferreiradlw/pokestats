import styled, { css } from 'styled-components'

const Container = styled.section`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  width: 90%;
  max-width: 850px;
  margin: 0 auto;

  ${({ theme }) => css`
    @media ${theme.device.mobileL} {
      width: 75%;
    }
    @media ${theme.device.laptop} {
      width: 55%;
      max-width: 800px;
    }
  `}
`

const Input = styled.input`
  flex: 1 1 auto;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  height: 50px;
  border-radius: 0.25rem;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  outline: none;

  ${({ theme }) => {
    let values = theme.autoComplete.input
    return css`
      color: ${values.color};
      background-color: ${values.backgroundColor};
      border: 1px solid ${values.borderColor};
    `
  }}
`

const Button = styled.button`
  display: flex;
  align-items: center;
  border-radius: 0.25rem;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  transition: all 0.2s ease;

  ${({ theme }) => {
    let values = theme.autoComplete.input
    return css`
      color: ${values.color};
      background-color: ${values.backgroundColor};
      border: 1px solid ${values.borderColor};

      &:hover {
        background-color: ${values.hover.backgroundColor};
        color: ${values.hover.color};
        cursor: pointer;
      }
    `
  }}
`

const Wrapper = styled.ul`
  position: absolute;
  margin-top: 50px;
  right: 0;
  left: 0;
  z-index: 2;
  border-radius: 0.25rem;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
`

const WrapperOption = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  font-size: 0.875rem;
  cursor: pointer;

  &:hover {
    background: #000;
    color: #fff;
  }

  & img {
    width: 50px;
  }
`

export { Container, Input, Button, Wrapper, WrapperOption }
