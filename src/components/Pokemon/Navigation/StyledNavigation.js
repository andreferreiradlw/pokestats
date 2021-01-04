import styled, { css, keyframes } from 'styled-components'

const NavBtn = styled.button`
  ${({ right }) =>
    right &&
    css`
      margin-left: auto;
    `}
`

export { NavBtn }
