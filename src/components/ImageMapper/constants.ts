import type { ImageMapperProps } from '@/types/imageMapper';

export const rerenderPropsList = [
  'src',
  'active',
  'disabled',
  'width',
  'height',
  'imgWidth',
  'fillColor',
  'strokeColor',
  'lineWidth',
  'natural',
  'areaKeyName',
  'stayHighlighted',
  'stayMultiHighlighted',
  'toggleHighlighted',
  'parentWidth',
  'responsive',
] as const;

export const ImageMapperDefaultProps: Partial<ImageMapperProps> = {
  map: {
    areas: [],
    name: `image-map-${Math.random()}`,
  },
  areaKeyName: 'id',
  active: true,
  fillColor: 'rgba(255, 255, 255, 0.5)',
  strokeColor: 'rgba(0, 0, 0, 0.5)',
  lineWidth: 1,
  imgWidth: 0,
  width: 0,
  height: 0,
  rerenderProps: [],
  parentWidth: 0,
};
