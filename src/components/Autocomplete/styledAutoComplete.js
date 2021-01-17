import styled, { css } from 'styled-components'
import Box from '../Box'

const Container = styled(Box)`
  max-width: 100%;
  position: relative;

  ${({ theme, width }) =>
    !width &&
    css`
      width: 90%;

      @media ${theme.device.sm} {
        max-width: 850px;
        width: 75%;
      }
      @media ${theme.device.lg} {
        width: 55%;
      }
    `}

  & #autocomplete_label {
    width: 0;
    height: 0;
    overflow: hidden;
    visibility: hidden;
  }
`

const Input = styled.input`
  width: 100%;
  max-width: 100%;
  padding: 0.2rem 0.5rem;
  font-size: 0.7rem;
  font-weight: 400;
  line-height: 1.5;
  height: 50px;
  border-radius: 0.25rem;
  outline: none;

  ${({ theme }) => css`
    @media ${theme.device.md} {
      font-size: 1rem;
      padding: 0.375rem 0.75rem;
    }
  `}

  ${({ theme }) => {
    let values = theme.autoComplete.input

    return css`
      color: ${values.color};
      background-color: ${values.backgroundColor};
      border: 1px solid ${values.borderColor};
    `
  }}

  &::placeholder {
    color: white;
    font-weight: 200;
  }
`

const ListWrapper = styled.div`
  position: absolute;
  margin-top: 50px;
  right: 0;
  left: 0;
  z-index: 2;
  border-radius: 0.25rem;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
`

const OptionWrapper = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  font-size: 0.875rem;
  cursor: pointer;
  padding: 0 1rem 0 0;

  ${({ theme }) => {
    const values = theme.autoComplete.wrapperOption

    return css`
      color: ${values.color};
      background-color: ${values.backgroundColor};

      &:hover,
      &:active,
      &:focus {
        background-color: ${values.hover.backgroundColor};
        color: ${values.hover.color};
      }
    `
  }}

  & img {
    width: 50px;
  }
`

const Option = styled.span`
  padding: 16px 0;
`

const PokeID = styled.span`
  font-weight: 600;
  font-size: 1.5rem;
  margin-left: auto;
`

export { Container, Input, ListWrapper, OptionWrapper, Option, PokeID }
