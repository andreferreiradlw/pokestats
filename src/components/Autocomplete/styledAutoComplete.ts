import styled, { css } from 'styled-components';
// types
import type { AutocompleteProps } from './index';
// components
import { motion } from 'framer-motion';
import Link from 'next/link';

const Container = styled(motion.div)<{ width?: AutocompleteProps['width'] }>`
  max-width: 100%;
  position: relative;

  ${({ theme, width }) =>
    width
      ? css`
          width: ${width};
        `
      : css`
          width: 90%;

          @media ${theme.device.sm} {
            max-width: 650px;
            width: 75%;
          }
          @media ${theme.device.lg} {
            width: 55%;
          }
        `}

  label {
    border: 0;
    clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
    clip; rect(1px, 1px, 1px, 1px);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px; 
  }
`;

const Input = styled.input<{ $isOpen: Boolean }>`
  font-size: 1em;
  font-weight: 400;
  line-height: 1;
  max-width: 100%;
  outline: none;
  padding: 0.5rem 0.75rem;
  position: relative;
  width: 100%;

  ${({ theme, $isOpen }) => css`
    background-color: ${theme.colors.secondary.main};
    border: ${theme.colors.secondary.main};
    border-radius: ${$isOpen ? '0.25rem 0.25rem 0 0' : '0.25rem'};
    color: ${theme.colors.secondary.contrastText};

    &::placeholder {
      color: ${theme.colors.secondary.contrastText};
    }

    @media ${theme.device.md} {
      font-size: 1em;
      padding: 0.75em 1em;
    }
  `}
`;

const ListWrapper = styled(motion.div)`
  border-radius: 0 0 0.25rem 0.25rem;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  position: absolute;
  width: 100%;
  z-index: 2;

  ${({ theme }) =>
    css`
      background: ${theme.colors.white};
      border: 1px solid ${theme.colors.white};
      border-top: none;
    `}
`;

const OptionImg = styled.img`
  width: 40px;
`;

const OptionWrapper = styled(Link)`
  align-items: center;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  font-size: 0.875rem;
  gap: 1em;
  justify-content: space-between;
  min-height: 55px;
  padding: 0.5em 1em;

  svg {
    padding: 5px;
    width: 40px;
  }

  ${({ theme }) => css`
    background-color: ${theme.colors.white};
    color: ${theme.colors.black};

    &:hover,
    &:active,
    &:focus {
      background-color: ${theme.colors.black};
      color: ${theme.colors.white};

      svg path {
        fill: ${theme.colors.white};
        stroke: ${theme.colors.black};
      }
    }
  `}
`;

const Option = styled.span`
  font-size: 1.3em;
  font-weight: 600;
  text-transform: capitalize;
`;

const PokeID = styled(Option)`
  font-size: 1.5em;
  font-weight: 600;
`;

export { Container, Input, ListWrapper, OptionWrapper, OptionImg, Option, PokeID };
