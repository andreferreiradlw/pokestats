import styled, { css } from 'styled-components';
// types
import type { AutocompleteProps } from './index';
import { focusStyles } from '@/BaseStyles';
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
            width: 55%;
          }
          @media ${theme.device.md} {
            width: 40%;
          }
          @media ${theme.device.lg} {
            width: 30%;
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
  font-weight: 500;
  max-width: 100%;
  padding: 0.5rem 0.75rem;
  width: 100%;

  ${({ theme, $isOpen }) => css`
    background-color: ${theme.colors.primary.main};
    border: 2px solid ${theme.colors.secondary.main};
    border-radius: ${$isOpen ? '0.25rem 0.25rem 0 0' : '0.25rem'};
    color: ${theme.colors.primary.contrastText};

    &::placeholder {
      color: ${theme.colors.secondary.light};
      font-style: italic;
    }

    ${focusStyles}

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

const PokemonImg = styled.img`
  width: 40px;
`;

const MachineImg = styled.img`
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
  font-weight: 500;
  text-transform: capitalize;
`;

const PokeID = styled(Option)`
  font-size: 1.5em;
  font-weight: 500;
`;

export { Container, Input, ListWrapper, OptionWrapper, PokemonImg, MachineImg, Option, PokeID };
