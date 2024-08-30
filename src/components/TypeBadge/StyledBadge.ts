import { styled, alpha } from '@mui/material/styles';
import { motion } from 'framer-motion';
// types
import type { Type } from 'pokenode-ts';
import type { TypeBadgeProps } from './index';
// styles
import { float as floatAnim } from '@/components/BaseStyles';
// components
import Link from 'next/link';

// Helper to determine if the type has a dark background
const isDarkBackground = (type: Type['name']): boolean =>
  !!type.match(/^(dark|dragon|fighting|ghost|poison|shadow|unknown)$/);

// Styled components using MUI's styled utility
const Anchor = styled(Link)({});

const Badge = styled(motion.div)<TypeBadgeProps>(
  ({ theme, $typename, $fill, $iconOnly, $float, $iconWidth, $iconHeight, flexmargin }) => ({
    alignItems: 'center',
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'row',
    fontFamily: "'Quicksand', sans-serif",
    fontSize: '1em',
    fontWeight: 600,
    gap: '0.5em',
    justifyContent: 'center',
    textTransform: 'capitalize',
    transition: 'background 0.5s ease-in-out, box-shadow 0.05s ease-in-out',
    width: 'auto',

    // Background and color styles
    background: $fill
      ? theme.palette.types[$typename]
      : alpha(theme.palette.types[$typename], 0.75),
    border: `1px solid ${theme.palette.primary.main}`,
    color: isDarkBackground($typename)
      ? theme.palette.getContrastText(theme.palette.types[$typename])
      : theme.palette.text.primary,

    '&:hover': {
      background: $fill ? theme.palette.types[$typename] : theme.palette.types[$typename],
      boxShadow: theme.shadows[3], // Use theme shadow for hover
    },

    '&:active': {
      boxShadow: theme.shadows[1], // Use theme shadow for active state
    },

    // Icon Only and Margin Styles
    ...(flexmargin && { margin: flexmargin }),
    padding: $iconOnly ? '0.3em' : '0.25em',

    [theme.breakpoints.up('md')]: {
      padding: $iconOnly ? '0.3em' : '0.5em',
    },

    // Floating Animation
    ...($float && {
      '@media (prefers-reduced-motion: no-preference)': {
        animation: `${floatAnim} infinite 3s ease-in-out`,
      },
    }),

    // Icon Styles
    '& svg': {
      height: $iconOnly ? $iconHeight || '15px' : $iconHeight || '25px',
      width: $iconOnly ? $iconWidth || '15px' : $iconWidth || '25px',
      '& path': {
        fill: $fill ? theme.palette.types[$typename] : theme.palette.common.white,
        stroke: theme.palette.common.black,
      },
    },
  }),
);

export { Anchor, Badge };
