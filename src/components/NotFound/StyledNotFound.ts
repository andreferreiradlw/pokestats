import styled, { css } from 'styled-components';
// components
import Box from '@/components/Box';
// styles
import { MainHeading, SectionMessage } from '@/components/BaseStyles';

const Container = styled(Box)`
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  height: 100vh;
  margin: auto;
  min-height: 100vh;
  z-index: 1;
`;

const Title = styled(MainHeading)`
  font-style: italic;
  margin-bottom: 0;
`;

const Message = styled(SectionMessage)`
  font-weight: 500;
  margin: 0 auto 1.5rem;
  max-width: 90%;
  word-break: break-word;

  span {
    background-color: black;
    border-radius: 4px;
    font-weight: 700;
    padding: 3px 5px;
  }

  ${({ theme }) => css`
    @media ${theme.device.md} {
      max-width: 75%;
      margin: 0 auto 2rem;
    }
  `}
`;

const Image = styled.img`
  image-rendering: pixelated;
  margin-bottom: 2rem;
  width: 150px;

  ${({ theme }) => css`
    @media ${theme.device.md} {
      width: 200px;
    }
  `}
`;

export { Container, Title, Message, Image };
