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
  gap: 0.5em;
  justify-content: center;
  overflow: hidden;
`;

const Badge = styled.div<{ $isAffected?: boolean; $isSelected?: boolean }>`
  background: ${({ theme }) => theme.colors.primary.light};
  border: 2px solid transparent;
  border-radius: 5px;
  font-weight: 600;
  padding: 0.5em 1em;
  text-align: center;
  width: 100%;

  ${({ theme, $isAffected }) =>
    $isAffected &&
    css`
      animation: ${blink(theme.colors.primary.main)} 4s infinite linear;
      background: ${theme.colors.secondary.main};
      border: 2px solid ${theme.colors.secondary.main};
      color: ${theme.colors.secondary.contrastText};
    `}

  ${({ theme, $isSelected }) =>
    $isSelected &&
    css`
      animation: ${blink(theme.colors.primary.main)} 2s infinite ease-in-out;
      border: 2px solid ${theme.colors.secondary.main};
    `}
`;

const AllyImg = styled.img`
  transform: translateY(3.5em);
  width: 100%;
  z-index: -1;
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
  left: 5%;
  position: absolute;
  top: 45%;
  transform: translate(-50%, -50%)
    matrix3d(
      2.105369,
      0.253319,
      0,
      -0.000773,
      -1.510317,
      2.129105,
      0,
      -0.000654,
      0,
      0,
      1,
      0,
      197.530897,
      39.40095,
      0,
      1
    );

  /* Need to make sure you define the width and height */
  /* transform: translate(-50%, -50%); */
  /* transform-origin: 0px 0px 0px; */
  width: 30%;
  z-index: -2;

  ${({ theme }) => css`
    @media ${theme.device.sm} {
      top: 49%;
      left: 25%;
      display: block;
    }
    @media ${theme.device.md} {
      left: 35%;
      top: 53%;
    }
    @media ${theme.device.lg} {
      left: 23%;
      top: 50%;
    }
  `}
`;

export { BattleContainer, PokemonContainer, Badge, FoeImg, AllyImg, Description, BattleGround };
