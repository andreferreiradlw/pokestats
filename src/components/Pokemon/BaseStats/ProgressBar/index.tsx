import styled from 'styled-components';

const Bar = styled.div<ProgressBarProps>`
  border-bottom: 2px solid ${({ theme }) => theme.progressBar.backgroundColor};
  border-top: 2px solid ${({ theme }) => theme.progressBar.backgroundColor};
  height: 12px;
  position: relative;
  width: 100%;

  &::before,
  &::after {
    background-color: ${({ theme }) => theme.progressBar.backgroundColor};
    content: '';
    height: 8px;
    position: absolute;
    top: 0;
    width: 3px;
  }

  &::before {
    left: -2px;
  }

  &::after {
    left: inherit;
    right: -2px;
  }

  & span {
    background-color: ${({ theme, color }) => color || theme.progressBar.backgroundColor};
    height: 8px;
    left: 0;
    position: absolute;
    top: 0;
    width: ${({ progress }) => progress}%;
  }
`;

interface ProgressBarProps {
  progress?: number;
  color?: string;
}

const ProgressBar = ({ progress = 60, color }: ProgressBarProps): JSX.Element => {
  return (
    <Bar progress={progress} color={color}>
      <span />
    </Bar>
  );
};

export default ProgressBar;
