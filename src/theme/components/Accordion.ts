import { createElement } from 'react';
import type { Components, Theme } from '@mui/material';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';

const Accordion: {
  MuiAccordionSummary: Components<Theme>['MuiAccordionSummary'];
  MuiAccordion: Components<Theme>['MuiAccordion'];
} = {
  MuiAccordionSummary: {
    defaultProps: {
      expandIcon: createElement(CatchingPokemonIcon),
    },
  },
  MuiAccordion: {
    defaultProps: {
      defaultExpanded: true,
    },
    styleOverrides: {
      root: {
        width: '100%',
      },
    },
  },
};

export default Accordion;
