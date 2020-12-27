import styled from 'styled-components'

const Bar = styled.div`
  position: relative;
  width: 100%;
  height: 12px;
  border-top: 2px solid ${({ theme }) => theme.progressBar.backgroundColor};
  border-bottom: 2px solid ${({ theme }) => theme.progressBar.backgroundColor};

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    background-color: ${({ theme }) => theme.progressBar.backgroundColor};
    width: 3px;
    height: 8px;
  }

  &::before {
    left: -2px;
  }

  &::after {
    left: inherit;
    right: -2px;
  }

  & span {
    position: absolute;
    top: 0;
    left: 0;
    width: ${({ progress }) => progress}%;
    height: 8px;
    background-color: ${({ theme, color }) =>
      color || theme.progressBar.backgroundColor};
  }
`

export default function ProgressBar({ progress = 60, color }) {
  return (
    <Bar progress={progress} color={color}>
      <span></span>
    </Bar>
  )
}
