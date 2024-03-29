import React from 'react';

export interface Container extends HTMLDivElement {
  clearHighlightedArea: () => void;
}

export interface MapAreas {
  id?: string;
  shape: 'rect' | 'circle' | 'poly';
  coords: number[];
  title: string;
  active?: boolean;
  disabled?: boolean;
  href?: string;
  fillColor?: string;
  strokeColor?: string;
  lineWidth?: number;
  preFillColor?: string;
}

export interface Map {
  name: string;
  areas: MapAreas[];
}

export interface CustomArea extends MapAreas {
  scaledCoords: number[];
  center?: [number, number];
}

export type CTX = { current: CanvasRenderingContext2D } | null;
export type TouchEvent = React.TouchEvent<HTMLAreaElement>;
export type AreaEvent = React.MouseEvent<HTMLAreaElement, MouseEvent>;
export type ImageEvent = React.MouseEvent<HTMLImageElement, MouseEvent>;

export interface ImageMapperProps {
  src: string;
  map?: Map;
  areaKeyName?: 'id';
  containerRef?: { current: HTMLDivElement } | null;
  fillColor?: string;
  strokeColor?: string;
  lineWidth?: number;
  stayHighlighted?: boolean;
  stayMultiHighlighted?: boolean;
  highlightAllAreas?: boolean;
  toggleHighlighted?: boolean;
  rerenderProps?: Array<keyof ImageMapperProps>;
  parentWidth: number;
  onImageClick?: ((e: ImageEvent) => void) | null;
  onImageMouseMove?: ((e: ImageEvent) => void) | null;
  onClick?: ((area: CustomArea, index: number, e: AreaEvent) => void) | null;
  onMouseDown?: ((area: CustomArea, index: number, e: AreaEvent) => void) | null;
  onMouseUp?: ((area: CustomArea, index: number, e: AreaEvent) => void) | null;
  onTouchStart?: ((area: CustomArea, index: number, e: TouchEvent) => void) | null;
  onTouchEnd?: ((area: CustomArea, index: number, e: TouchEvent) => void) | null;
  onMouseMove?: ((area: CustomArea, index: number, e: AreaEvent) => void) | null;
  onMouseEnter?: ((area: CustomArea, index: number, e: AreaEvent) => void) | null;
  onMouseLeave?: ((area: CustomArea, index: number, e: AreaEvent) => void) | null;
  onLoad?: ((e: HTMLImageElement, dimensions: { width: number; height: number }) => void) | null;
}
