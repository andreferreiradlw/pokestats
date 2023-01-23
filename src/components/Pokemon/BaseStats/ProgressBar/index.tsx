import styled, { css } from 'styled-components';

interface ProgressBarProps {
  progress?: number;
  color?: string;
}

const Bar = styled.div<ProgressBarProps>`
  ${({ theme }) =>
    css`
      border-bottom: 2px solid ${theme.colors.black};
      border-top: 2px solid ${theme.colors.black};
    `};
  height: 12px;
  position: relative;
  width: 100%;

  &::before,
  &::after {
    background-color: ${({ theme }) => theme.colors.black};
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
    background-color: ${({ theme, color }) => color || theme.colors.black};
    height: 8px;
    left: 0;
    position: absolute;
    top: 0;
    width: ${({ progress }) => progress}%;
  }
`;

const BarCell = styled.td`
  width: 100%;
`;

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
