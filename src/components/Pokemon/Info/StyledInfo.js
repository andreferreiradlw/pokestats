import styled, { css } from 'styled-components'

const Name = styled.h1`
  font-size: 2.5rem;
  line-height: 3rem;
  font-weight: 700;

  ${({ theme }) => css`
    @media ${theme.device.xs} {
      font-size: 3.5rem;
      line-height: 4rem;
    }
    @media ${theme.device.sm} {
      font-size: 4rem;
      line-height: 4.5rem;
    }
    @media ${theme.device.md} {
      font-size: 6rem;
      line-height: 6.5rem;
    }
  `}
`

const Id = styled.span`
  color: #616161;
  margin-left: 0.25em;
  font-size: 1rem;
  line-height: 1.5rem;

  ${({ theme }) => css`
    @media ${theme.device.sm} {
      font-size: 1.5rem;
      line-height: 2rem;
    }
    @media ${theme.device.md} {
      font-size: 2.5rem;
      line-height: 3rem;
    }
    @media ${theme.device.md} {
      font-size: 4rem;
      line-height: 4.5rem;
    }
  `}
`

// image section

export { Name, Id }
