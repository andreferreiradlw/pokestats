import styled, { css } from 'styled-components';
// types
import type { Pokemon, PokemonType } from '@/types';
// components
import BoxWrapper from '@/components/Box/StyledBox';
import Link from 'next/link';

const Container = styled(BoxWrapper)`
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

  label {
    height: 0;
    overflow: hidden;
    visibility: hidden;
    width: 0;
  }
`;

const Input = styled.input`
  border-radius: 0.25rem;
  font-size: 0.7rem;
  font-weight: 400;
  height: 50px;
  line-height: 1.5;
  max-width: 100%;
  outline: none;
  padding: 0.2rem 0.5rem;
  width: 100%;

  ${({ theme }) => css`
    background-color: ${theme.colors.black};
    border: 1px solid ${theme.colors.black};
    color: ${theme.colors.white};

    &::placeholder {
      color: ${theme.colors.mercury};
      font-style: italic;
      font-weight: 500;
    }

    @media ${theme.device.md} {
      font-size: 1rem;
      padding: 0.375rem 0.75rem;
    }
  `}
`;

const ListWrapper = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: 0.25rem;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  left: 0;
  margin-top: 50px;
  position: absolute;
  right: 0;
  z-index: 2;
`;

const OptionWrapper = styled(Link)`
  align-items: center;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  font-size: 0.875rem;
  justify-content: flex-start;
  padding: 0 1rem 0 0.5rem;

  ${({ theme }) => css`
    background-color: ${theme.colors.white};
    color: ${theme.colors.black};

    &:hover,
    &:active,
    &:focus {
      background-color: ${theme.colors.black};
      color: ${theme.colors.white};
    }
  `}
`;

const OptionImg = styled.img<{ $type?: Pokemon['assetType'] | PokemonType['assetType'] }>`
  width: 50px;

  ${({ $type }) =>
    $type === 'type' &&
    css`
      padding: 10px;
    `}
`;

const Option = styled.span`
  font-weight: 600;
  padding: 16px 0;
`;

const PokeID = styled.span`
  font-size: 1.5rem;
  font-weight: 600;
  margin-left: auto;
`;

export { Container, Input, ListWrapper, OptionWrapper, OptionImg, Option, PokeID };
