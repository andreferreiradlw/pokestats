import { styled } from '@mui/material/styles';
// components
import { Grid2 } from '@mui/material';
// styles
import { float } from '@/animations';

const ImageContainer = styled(Grid2)`
  height: 100%;
  position: relative;

  ${({ theme }) => theme.breakpoints.up('lg')} {
    min-height: 500px;
  }

  & img {
    margin: 1.5rem 0;
    max-width: 80%;

    ${({ theme }) => theme.breakpoints.up('xs')} {
      max-width: 65%;
    }

    ${({ theme }) => theme.breakpoints.up('sm')} {
      max-width: 60%;
    }

    ${({ theme }) => theme.breakpoints.up('md')} {
      max-width: 55%;
    }

    ${({ theme }) => theme.breakpoints.up('lg')} {
      max-width: 60%;
    }

    @media (prefers-reduced-motion: no-preference) {
      animation: ${float} infinite 3s ease-in-out;
    }
  }
`;

export { ImageContainer };
