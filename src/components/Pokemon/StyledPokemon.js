import styled, { css, keyframes } from 'styled-components'
import Box from '../Box'

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

const Table = styled(Box)`
  display: table;
  margin-bottom: 1.5rem;
  font-size: 1rem;
  line-height: 1.2rem;
  word-break: break-word;
  border-spacing: 0;
  width: 100%;

  & tbody {
    flex-grow: 1;
  }

  & tr:not(:last-of-type) {
    width: 100%;
    border-bottom: 1px solid #ececec;
  }

  & th {
    padding: 6px 0;
    font-size: 0.875rem;
    font-weight: normal;
    text-align: left;
    white-space: nowrap;
    vertical-align: middle;
  }

  & td {
    padding: 6px 16px;
    font-weight: 500;
    white-space: pre-line;
    height: 40px;
  }

  ${({ theme }) => css`
    @media ${theme.device.md} {
      width: 50%;
    }
    @media ${theme.device.lg} {
      width: 100%;
    }
  `}
`

const Numbered = styled.span`
  width: 100%;
  display: block;

  & span {
    font-weight: 300;
  }

  &:not(:last-of-type) {
    padding-bottom: 6px;
  }

  ${({ light }) =>
    light &&
    css`
      font-weight: 300;
    `}
`

// Create the keyframes for floating img
const float = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(10px)
  }
  100% {
    transform: translateY(0px)
  }
`
// image
const ImageContainer = styled(Box)`
  ${({ theme }) => css`
    @media ${theme.device.lg} {
      min-height: 300px;
    }
  `}
`
const Image = styled.img`
  max-width: 80%;
  margin: 1.5rem 0;

  ${({ theme }) => css`
    @media ${theme.device.xs} {
      max-width: 65%;
    }
    @media ${theme.device.sm} {
      max-width: 60%;
    }
    @media ${theme.device.md} {
      max-width: 55%;
    }
    @media ${theme.device.lg} {
      max-width: 60%;
    }
  `}

  @media (prefers-reduced-motion: no-preference) {
    animation: ${float} infinite 3s ease-in-out;
  }
`

export { SectionTitle, Table, Numbered, ImageContainer, Image }
