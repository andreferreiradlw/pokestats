import { styled } from '@mui/material/styles';

interface ProgressBarProps {
  progress?: number;
  color?: string;
}

const Bar = styled('div')<ProgressBarProps>(({ theme, color, progress }) => ({
  borderBottom: `2px solid ${theme.palette.text.primary}`,
  borderTop: `2px solid ${theme.palette.text.primary}`,
  height: '12px',
  position: 'relative',
  width: '100%',

  '&::before, &::after': {
    backgroundColor: theme.palette.text.primary,
    content: '""',
    height: '8px',
    position: 'absolute',
    top: 0,
    width: '3px',
  },

  '&::before': {
    left: '-2px',
  },

  '&::after': {
    left: 'inherit',
    right: '-2px',
  },

  '& span': {
    backgroundColor: color || theme.palette.primary.main,
    height: '8px',
    left: '0',
    position: 'absolute',
    top: '0',
    width: `${progress}%`,
  },
}));

const BarCell = styled('td')({
  width: '100%',
});

const ProgressBar = ({ progress = 60, color }: ProgressBarProps): JSX.Element => {
  return (
    <BarCell>
      <Bar progress={progress} color={color}>
        <span />
      </Bar>
    </BarCell>
  );
};

export default ProgressBar;
