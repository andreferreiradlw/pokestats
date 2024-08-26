// helpers
import { rotate } from '@/BaseStyles';
// components
import { motion } from 'framer-motion';
// icons
import PokeballIcon from 'public/static/iconLibrary/pokeball.svg';
import { Stack } from '@mui/material';
import { styled, css } from '@mui/material/styles';

const FirstSection = styled(Stack)(
  () => css`
    align-items: center;
    gap: 1em;
    height: 50vh;
    justify-content: center;
    margin: auto;
    min-height: 50vh;
    position: relative;
    width: 100%;
  `,
);

const SecondSection = styled(Stack)(
  ({ theme }) => css`
    align-items: center;
    background-color: ${theme.palette.background.default};
    justify-content: center;
    width: 100%;
  `,
);

const GithubLink = styled(motion.a)(
  ({ theme }) => css`
    position: absolute;
    right: 20px;
    top: 20px;
    z-index: 3;

    svg {
      background: ${theme.palette.background.default};
      border-radius: 25%;
      fill: ${theme.palette.secondary.main};
      height: auto;
      width: 30px;

      ${theme.breakpoints.up('sm')} {
        width: 50px;
      }

      &:hover {
        background: ${theme.palette.secondary.main};
        fill: ${theme.palette.background.default};
      }
    }
  `,
);

const Pokeball = styled(PokeballIcon)(
  () => css`
    width: 1em;
    // rotation
    animation: 3s ${rotate} 0ms infinite linear;
  `,
);

export { FirstSection, SecondSection, GithubLink, Pokeball };
