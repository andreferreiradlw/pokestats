import styled, { css } from 'styled-components';

const absolutePosition = css`
  left: 0;
  position: absolute;
  top: 0;
`;

const ContainerEl = styled.div`
  position: relative;
`;

const ImageEl = styled.img<{ hide?: boolean }>`
  ${absolutePosition}

  user-select: none;
  z-index: 1;

  ${({ hide }) =>
    hide &&
    css`
      display: none;
    `}
`;

const CanvasEl = styled.canvas`
  ${absolutePosition}

  pointer-events: none;
  z-index: 2;
`;

const MapEl = styled.map`
  cursor: pointer;
`;

export { ContainerEl, ImageEl, CanvasEl, MapEl };
