import type { RefObject } from 'react';

// Helper function to set up the context for drawing
const setupContext = (
  ctx2D: CanvasRenderingContext2D,
  fillColor: string,
  lineWidth: number,
  strokeColor: string,
) => {
  ctx2D.fillStyle = fillColor;
  ctx2D.lineWidth = lineWidth;
  ctx2D.strokeStyle = strokeColor;
};

const drawRect = (
  coords: [number, number, number, number],
  fillColor = 'black',
  lineWidth = 1,
  strokeColor = 'black',
  ctx2D: CanvasRenderingContext2D,
) => {
  const [left, top, right, bot] = coords;

  setupContext(ctx2D, fillColor, lineWidth, strokeColor);

  ctx2D.strokeRect(left, top, right - left, bot - top);
  ctx2D.fillRect(left, top, right - left, bot - top);
};

const drawCircle = (
  coords: [number, number, number],
  fillColor = 'black',
  lineWidth = 1,
  strokeColor = 'black',
  ctx2D: CanvasRenderingContext2D,
) => {
  const [x, y, radius] = coords;

  setupContext(ctx2D, fillColor, lineWidth, strokeColor);

  ctx2D.beginPath();
  ctx2D.arc(x, y, radius, 0, 2 * Math.PI);
  ctx2D.closePath();
  ctx2D.stroke();
  ctx2D.fill();
};

const drawPoly = (
  coords: number[],
  fillColor = 'black',
  lineWidth = 1,
  strokeColor = 'black',
  ctx2D: CanvasRenderingContext2D,
) => {
  if (coords.length % 2 !== 0) {
    throw new Error('Coordinate array length must be even.');
  }

  const newCoords: [number, number][] = coords.reduce(
    (acc, _, idx, arr) => {
      if (idx % 2 === 0) acc.push([arr[idx], arr[idx + 1]]);
      return acc;
    },
    [] as [number, number][],
  );

  setupContext(ctx2D, fillColor, lineWidth, strokeColor);

  ctx2D.beginPath();
  if (newCoords.length > 0) {
    ctx2D.moveTo(newCoords[0][0], newCoords[0][1]);
    newCoords.forEach(([x, y]) => ctx2D.lineTo(x, y));
  }
  ctx2D.closePath();
  ctx2D.stroke();
  ctx2D.fill();
};

const drawAreas = (
  shape: 'rect' | 'circle' | 'poly',
  coords: number[],
  fillColor = 'black',
  lineWidth = 1,
  strokeColor = 'black',
  isAreaActive: boolean,
  ctx2D: RefObject<CanvasRenderingContext2D>,
) => {
  if (!isAreaActive || !ctx2D.current) return;

  switch (shape) {
    case 'rect':
      drawRect(
        coords as [number, number, number, number],
        fillColor,
        lineWidth,
        strokeColor,
        ctx2D.current,
      );
      break;
    case 'circle':
      drawCircle(
        coords as [number, number, number],
        fillColor,
        lineWidth,
        strokeColor,
        ctx2D.current,
      );
      break;
    case 'poly':
      drawPoly(coords, fillColor, lineWidth, strokeColor, ctx2D.current);
      break;
    default:
      throw new Error(`Unsupported shape: ${shape}`);
  }
};

export { drawAreas };
