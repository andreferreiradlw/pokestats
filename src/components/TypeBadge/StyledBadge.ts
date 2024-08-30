import { styled, alpha } from '@mui/material/styles';
import { motion } from 'framer-motion';
// types
import type { TypeBadgeProps } from './index';

const Badge = styled(motion.a)<TypeBadgeProps>(
  ({ theme, $typename, $fill, $iconOnly, $iconWidth, $iconHeight, flexmargin }) => ({
    alignItems: 'center',
    borderRadius: '4px',
    display: 'flex',
    flexDirection: 'row',
    gap: '0.5em',
    justifyContent: 'center',
    textTransform: 'capitalize',
    transition: 'background 0.25s ease-in-out, box-shadow 0.03s ease-in-out',
    padding: $iconOnly ? '0.3em' : '0.25em',
    background: $fill
      ? theme.palette.types[$typename]
      : alpha(theme.palette.types[$typename], 0.75),
    border: `1px solid ${theme.palette.primary.main}`,
    color: theme.palette.getContrastText(theme.palette.types[$typename]),

    '&:hover': {
      background: $fill ? theme.palette.types[$typename] : theme.palette.types[$typename],
      boxShadow: theme.shadows[3],
    },

    '&:active': {
      boxShadow: theme.shadows[1],
    },

    ...(flexmargin && { margin: flexmargin }),

    [theme.breakpoints.up('md')]: {
      padding: $iconOnly ? '0.3em' : '0.5em',
    },

    '& svg': {
      height: $iconOnly ? $iconHeight || '15px' : $iconHeight || '25px',
      width: $iconOnly ? $iconWidth || '15px' : $iconWidth || '25px',

      '& path': {
        fill: theme.palette.common.white,
        stroke: theme.palette.common.black,
      },
    },
  }),
);

export { Badge };
