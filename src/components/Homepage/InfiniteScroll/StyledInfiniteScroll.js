import styled, { css } from 'styled-components'
import Box from '../../Box'

const Container = styled(Box)`
  ${({ theme, light }) =>
    light
      ? css`
          background-color: ${theme.infiniteScroll.light.backgroundColor};
          color: ${theme.infiniteScroll.light.color};
        `
      : css`
          background-color: ${theme.infiniteScroll.backgroundColor};
          color: ${theme.infiniteScroll.color};
        `}
`

const List = styled(Box)``

export { Container, List }
