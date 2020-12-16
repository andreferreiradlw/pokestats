import styled, { css } from 'styled-components'
import Box from '../../Box'

const Container = styled(Box)`
  width: 90%;
  max-width: 850px;
  position: relative;

  ${({ theme }) => css`
    @media ${theme.device.sm} {
      width: 75%;
    }
    @media ${theme.device.lg} {
      width: 55%;
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

  &[disabled] {
    cursor: not-allowed;
  }

  & svg {
    width: 20px;
    margin: 0 10px;
  }

  ${({ theme }) => {
    const values = theme.autoComplete.button
    return css`
      color: ${values.color};
      background-color: ${values.backgroundColor};
      border: 1px solid ${values.borderColor};

      & svg {
        fill: ${values.color};
        stroke: ${values.color};
      }

      &:hover {
        background-color: ${values.hover.backgroundColor};
        color: ${values.hover.color};
        cursor: pointer;

        & svg {
          fill: ${values.hover.color};
          stroke: ${values.hover.color};
        }
      }

      &[disabled] {
        color: ${values.disabled.color};
        background-color: ${values.disabled.backgroundColor};

        & svg {
          fill: ${values.disabled.color};
          stroke: ${values.disabled.color};
        }
      }
    `
  }}
`

const ListWrapper = styled.ul`
  position: absolute;
  margin-top: 50px;
  right: 0;
  left: 0;
  z-index: 2;
  border-radius: 0.25rem;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
`

const OptionWrapper = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  font-size: 0.875rem;
  cursor: pointer;

  ${({ theme }) => {
    const values = theme.autoComplete.wrapperOption
    return css`
      color: ${values.color};
      background-color: ${values.backgroundColor};

      &:hover {
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

export { Container, Input, Button, ListWrapper, OptionWrapper, Option }
