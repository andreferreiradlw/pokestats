import { styled, css } from '@mui/system';
// styles
import { float } from '@/components/BaseStyles';
// components
import { motion } from 'framer-motion';

const PokeBox = styled(motion.a)(
  ({ theme }) => css`
    align-items: center;
    background-color: ${theme.palette.background.paper};
    border: 1px solid ${theme.palette.primary.dark};
    border-radius: 5px;
    display: flex;
    flex-basis: auto;
    flex-direction: column;
    font-weight: 500;
    gap: 0.5em;
    justify-content: center;
    max-width: 125px;
    overflow: hidden;
    padding: 1em;
    position: relative;
    text-align: center;
    transition: border 0.1s ease-in-out;
    width: 125px;

    &:active {
      transition: box-shadow 0.01s ease-in-out;
      box-shadow: 1px 1px 2px 0px ${theme.palette.primary.light} inset;
    }

    ${theme.breakpoints.up('md')} {
      max-width: 175px;
      width: 175px;
    }

    &:hover {
      box-shadow: 1px 1px 3px 0px ${theme.palette.primary.light};
      cursor: pointer;

      img {
        @media (prefers-reduced-motion: no-preference) {
          animation: ${float} infinite 3s ease-in-out;
        }
      }
    }
  `,
);

const NumberId = styled('span')(
  ({ theme }) => css`
    font-size: 1.5em;

    ${theme.breakpoints.up('md')} {
      font-size: 2em;
    }
  `,
);

const PokeName = styled('span')(
  ({ theme }) => css`
    font-size: 1em;
    text-transform: capitalize;

    ${theme.breakpoints.up('md')} {
      font-size: 1.5em;
    }
  `,
);

const PokeGen = styled('span')(
  ({ theme }) => css`
    font-size: 0.85em;
    font-weight: 300;

    ${theme.breakpoints.up('md')} {
      font-size: 1em;
    }
  `,
);

export { PokeBox, NumberId, PokeName, PokeGen };
