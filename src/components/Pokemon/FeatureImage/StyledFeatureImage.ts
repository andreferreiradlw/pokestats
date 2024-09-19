import { styled } from '@mui/material/styles';
// components
import { Grid2 } from '@mui/material';
// styles
import { float } from '@/animations';
import type { PokemonVersion } from '.';

interface ImageContainerProps {
  version?: PokemonVersion;
}

const ImageContainer = styled(Grid2)<ImageContainerProps>`
  position: relative;

  ${({ theme }) => theme.breakpoints.up('lg')} {
    min-height: 500px;
    flex-grow: 1;
  }

  & img {
    margin: 1.5rem 0;
    max-width: 80%;

    ${({ version }) =>
      version === 'shiny' &&
      `
      max-width: 75%;
    `}

    ${({ theme, version }) =>
      version === 'normal' &&
      `
      ${theme.breakpoints.up('xs')} {
        max-width: 65%;
      }

      ${theme.breakpoints.up('sm')} {
        max-width: 60%;
      }

      ${theme.breakpoints.up('md')} {
        max-width: 55%;
      }

      ${theme.breakpoints.up('lg')} {
        max-width: 60%;
      }
    `}

    @media (prefers-reduced-motion: no-preference) {
      animation: ${float} infinite 3s ease-in-out;
    }
  }
`;

export { ImageContainer };
