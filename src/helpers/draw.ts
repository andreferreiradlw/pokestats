// @ts-nocheck

import type { CTX } from '@/types/imageMapper';

const drawRect = (
  coords: number[],
  fillColor: string,
  lineWidth: number,
  strokeColor: string,
  ctx: CTX,
) => {
  const [left, top, right, bot] = coords;
  ctx.current.fillStyle = fillColor;
  ctx.current.lineWidth = lineWidth;
  ctx.current.strokeStyle = strokeColor;
  ctx.current.strokeRect(left, top, right - left, bot - top);
  ctx.current.fillRect(left, top, right - left, bot - top);
};

const drawCircle = (
  coords: number[],
  fillColor: string,
  lineWidth: number,
  strokeColor: string,
  ctx: CTX,
) => {
  ctx.current.fillStyle = fillColor;
  ctx.current.beginPath();
  ctx.current.lineWidth = lineWidth;
  ctx.current.strokeStyle = strokeColor;
  ctx.current.arc(coords[0], coords[1], coords[2], 0, 2 * Math.PI);
  ctx.current.closePath();
  ctx.current.stroke();
  ctx.current.fill();
};

const drawPoly = (
  coords: number[],
  fillColor: string,
  lineWidth: number,
  strokeColor: string,
  ctx: CTX,
) => {
  const newCoords = coords.reduce((a, v, i, s) => (i % 2 ? a : [...a, s.slice(i, i + 2)]), []);

  ctx.current.fillStyle = fillColor;
  ctx.current.beginPath();
  ctx.current.lineWidth = lineWidth;
  ctx.current.strokeStyle = strokeColor;

  newCoords.forEach(c => ctx.current.lineTo(c[0], c[1]));
  ctx.current.closePath();
  ctx.current.stroke();
  ctx.current.fill();
};

const drawAreas = (
  shape: 'rect' | 'circle' | 'poly',
  coords: number[],
  fillColor: string,
  lineWidth: number,
  strokeColor: string,
  isAreaActive: boolean,
  ctx: CTX,
): void => {
  if (!isAreaActive) return;
  if (shape === 'rect') {
    return drawRect(coords, fillColor, lineWidth, strokeColor, ctx);
  }
  if (shape === 'circle') {
    return drawCircle(coords, fillColor, lineWidth, strokeColor, ctx);
  }
  if (shape === 'poly') {
    return drawPoly(coords, fillColor, lineWidth, strokeColor, ctx);
  }
};

export { drawAreas };
