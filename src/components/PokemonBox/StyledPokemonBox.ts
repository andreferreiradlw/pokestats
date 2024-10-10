import { styled } from '@mui/material/styles';
import { float } from '@/animations';
import { Paper } from '@mui/material';

const PokeBox = styled(Paper)`
  align-items: center;
  border-radius: ${({ theme }) => theme.shape.borderRadius};
  display: flex;
  flex-basis: auto;
  flex-direction: column;
  font-weight: 500;
  gap: 0.5em;
  justify-content: center;
  max-width: 150px;
  overflow: hidden;
  padding: 1em;
  position: relative;
  text-align: center;
  transition: border 0.1s ease-in-out;
  width: 150px;

  &:hover {
    box-shadow: 1px 1px 3px 0px ${({ theme }) => theme.palette.primary.main};
    cursor: pointer;

    img {
      @media (prefers-reduced-motion: no-preference) {
        animation: ${float} infinite 3s ease-in-out;
      }
    }

    &:active {
      transition: box-shadow 0.01s ease-in-out;
      box-shadow: 1px 1px 2px 0px ${({ theme }) => theme.palette.primary.light} inset;
    }
  }

  ${({ theme }) => theme.breakpoints.up('md')} {
    max-width: 200px;
    width: 200px;
  }
`;

export { PokeBox };
