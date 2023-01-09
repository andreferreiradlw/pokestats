import styled, { css } from 'styled-components';
// components
import { motion } from 'framer-motion';
import Link from 'next/link';

const BtnContainer = styled(motion.div)``;

const BtnSpan = styled.span`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 90px;
  justify-content: center;
  padding: 0 0.5rem;
  position: relative;
`;

const Arrow = styled(BtnSpan)<{ $left?: boolean; $right?: boolean }>`
  ${({ $right, $left }) =>
    css`
      &:after {
        border-bottom: 45px solid transparent;
        border-top: 45px solid transparent;
        content: '';
        position: absolute;
        transition: all 0.15s ease-in-out;

        ${$left &&
        css`
          border-right: 10px solid black;
          box-shadow: 10px 0 0 0 black, 10px 3px 0 0 black;
          right: 0;
        `}

        ${$right &&
        css`
          border-left: 10px solid black;
          box-shadow: -10px 0 0 0 black, -10px 3px 0 0 black;
          left: 0;
        `}
      }
    `}
`;

const Title = styled(BtnSpan)`
  background-color: black;
  color: white;
  max-width: 130px;
  text-align: center;
  transition: all 0.15s ease-in-out;
  width: 130px;

  & span {
    font-size: 2rem;
  }
`;

const BtnAnchor = styled(Link)<{ $left?: boolean; $right?: boolean }>`
  border: 1px solid black;
  display: flex;
  font-weight: 600;
  overflow: hidden;

  ${({ $left }) =>
    $left &&
    css`
      border-radius: 4px 0 0 4px;
      border-right: none;
      flex-direction: row;

      & ${BtnSpan} {
        float: left;
      }
    `}

  ${({ $right }) =>
    $right &&
    css`
      border-left: none;
      border-radius: 0 4px 4px 0;
      flex-direction: row-reverse;

      & ${BtnSpan} {
        float: right;
      }
    `}

  img {
    padding: 10px;
    transition: all 0.15s ease-in-out;
  }

  &:hover {
    cursor: pointer;

    & ${Arrow} {
      ${({ $right }) =>
        $right &&
        css`
          &:after {
            left: 10px;
          }
        `}
      ${({ $left }) =>
        $left &&
        css`
          &:after {
            right: 10px;
          }
        `}
    }

    img {
      transform: scale(1.2) !important;
    }
  }
`;

export { BtnContainer, BtnAnchor, Title, Arrow };
