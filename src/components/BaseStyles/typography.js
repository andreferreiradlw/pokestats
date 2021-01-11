import styled, { css } from 'styled-components'

const SectionTitle = styled.h2`
  font-size: 2rem;
  line-height: 2.5rem;
  font-weight: 600;
  margin-bottom: 1rem;

  ${({ theme }) => css`
    @media ${theme.device.xs} {
      font-size: 2.5rem;
      line-height: 3rem;
    }
    @media ${theme.device.md} {
      font-size: 3rem;
      line-height: 3.5rem;
    }
  `}
`

const SectionSubTitle = styled.h3`
  font-size: 1.3rem;
  line-height: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;

  ${({ theme }) => css`
    @media ${theme.device.xs} {
      font-size: 1.6rem;
      line-height: 2rem;
    }
    @media ${theme.device.md} {
      font-size: 2rem;
      line-height: 2.5rem;
    }
  `}
`

const SectionMessage = styled.p`
  font-size: 1.5rem;
  line-height: 2rem;
  margin: 1.5rem 0;
  text-align: center;
  width: 100%;
`

export { SectionTitle, SectionSubTitle, SectionMessage }
