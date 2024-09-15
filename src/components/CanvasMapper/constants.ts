import type { CanvasMapperProps } from '.';

export const rerenderPropsList = [
  'src',
  'fillColor',
  'strokeColor',
  'lineWidth',
  'areaKeyName',
  'stayHighlighted',
  'stayMultiHighlighted',
  'highlightAllAreas',
  'toggleHighlighted',
] as const;

export const ImageMapperDefaultProps: Partial<CanvasMapperProps> = {
  mapAreas: [],
  mapName: `image-map-${Math.random()}`,
  areaKeyName: 'id',
  fillColor: 'rgba(255, 255, 255, 0.5)',
  strokeColor: 'rgba(0, 0, 0, 0.5)',
  lineWidth: 1,
  rerenderProps: ['highlightAllAreas'],
};
