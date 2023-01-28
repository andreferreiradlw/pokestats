import styled, { css } from 'styled-components';
// styles
import { blink } from '@/BaseStyles';
// components
import Box from '@/components/Box';

const BattleContainer = styled(Box)`
  position: relative;
`;

const PokemonContainer = styled.div`
  align-items: center;
  display: flex;
  flex-basis: 33%;
  flex-direction: column;
  flex-shrink: 0;
  justify-content: center;
  overflow: hidden;
`;

const Badge = styled.div<{ $isAffected?: boolean; $isSelected?: boolean }>`
  align-items: center;
  border: 2px solid transparent;
  border-radius: 5px;
  display: flex;
  font-weight: 600;
  gap: 0.25em;
  min-width: 50%;
  padding: 0.2em 0.5em;
  text-align: center;

  ${({ theme, $isAffected }) =>
    $isAffected &&
    css`
      border: 2px dotted ${theme.colors.secondary.main};
    `}

  ${({ theme, $isSelected, $isAffected }) =>
    ($isSelected || $isAffected) &&
    css`
      &:before {
        background-image: url('/static/iconLibrary/arrow_right.svg');
      }

      &:after {
        background-image: url('/static/iconLibrary/arrow_left.svg');
      }

      &:before,
      &:after {
        animation: ${blink(theme.colors.primary.main, 'background')} 2s infinite ease-in-out 1s;
        background-size: 20px 20px;
        content: '';
        display: inline-flex;
        height: 20px;
        width: 20px;
      }
    `}
`;

const ImageContainer = styled.div`
  width: 80%;
`;

const AllyImg = styled.img`
  transform: translateY(1em);
  width: 100%;
  /* z-index: -1; */
`;

const FoeImg = styled.img`
  width: 85%;
`;

const Description = styled.p`
  font-size: 1em;
  font-weight: 500;
  width: 100%;

  ${({ theme }) => css`
    @media ${theme.device.sm} {
      font-size: 1.2em;
    }
  `}
`;

const BattleGround = styled.div`
  background: radial-gradient(ellipse at center, #ffffff 19%, #cecece 57%, #ffffff 67%);
  display: none;
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#ffffff',GradientType=1 );
  height: 30%;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%) matrix(2.9, 0.1, -1.5, 2.1, 50, 35);
  width: 30%;
  z-index: -2;

  ${({ theme }) => css`
    @media ${theme.device.sm} {
      display: block;
    }
  `}
`;

export {
  BattleContainer,
  PokemonContainer,
  Badge,
  ImageContainer,
  FoeImg,
  AllyImg,
  Description,
  BattleGround,
};
