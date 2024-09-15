import type { AreaEvent, CanvasMapperProps, ExtendedArea, ImageEvent } from '.';

export const imageMouseMove = (event: ImageEvent, props: CanvasMapperProps): void => {
  if (props.onImageMouseMove) props.onImageMouseMove(event);
};

export const imageClick = (event: ImageEvent, onImageClick: CanvasMapperProps['onImageClick']) => {
  if (onImageClick) {
    event.preventDefault();
    onImageClick(event);
  }
};

export const mouseMove = (
  area: ExtendedArea,
  index: number,
  event: AreaEvent,
  onMouseMove: CanvasMapperProps['onMouseMove'],
) => onMouseMove && onMouseMove(area, index, event);

export const mouseDown = (
  area: ExtendedArea,
  index: number,
  event: AreaEvent,
  onMouseDown: CanvasMapperProps['onMouseDown'],
) => onMouseDown && onMouseDown(area, index, event);

export const mouseUp = (
  area: ExtendedArea,
  index: number,
  event: AreaEvent,
  onMouseUp: CanvasMapperProps['onMouseUp'],
) => onMouseUp && onMouseUp(area, index, event);

export const touchStart = (
  area: ExtendedArea,
  index: number,
  event: TouchEvent,
  onTouchStart: CanvasMapperProps['onTouchStart'],
) => onTouchStart && onTouchStart(area, index, event);

export const touchEnd = (
  area: ExtendedArea,
  index: number,
  event: TouchEvent,
  onTouchEnd: CanvasMapperProps['onTouchEnd'],
) => onTouchEnd && onTouchEnd(area, index, event);
