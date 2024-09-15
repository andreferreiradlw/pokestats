import React, { useState, useEffect, useRef, useCallback, type RefObject, useMemo } from 'react';
// helpers
import { drawAreas } from './draw';
// styles
import { ContainerEl, ImageEl, CanvasEl, MapEl } from './StyledCanvasMapper';
import { deepEqual } from '@/helpers';
import { rerenderPropsList } from './constants';

export interface CanvasMapperArea {
  id: string;
  key: string;
  title: string;
  shape: 'rect' | 'circle' | 'poly';
  coords: number[];
  description: string;
  active?: boolean;
  disabled?: boolean;
  href?: string;
  fillColor?: string;
  strokeColor?: string;
  lineWidth?: number;
  preFillColor?: string;
}

export interface ExtendedArea extends CanvasMapperArea {
  scaledCoords: number[];
  center?: [number, number];
}

export type TouchEvent = React.TouchEvent<HTMLAreaElement>;
export type AreaEvent = React.MouseEvent<HTMLAreaElement, MouseEvent>;
export type ImageEvent = React.MouseEvent<HTMLImageElement, MouseEvent>;

export interface CanvasMapperProps {
  mapName: string;
  areas: CanvasMapperArea[];
  src: string;
  parentRef: RefObject<HTMLDivElement>;
  fillColor?: string;
  strokeColor?: string;
  lineWidth?: number;
  stayHighlighted?: boolean;
  highlightAllAreas?: boolean;
  toggleHighlighted?: boolean;
  rerenderProps?: Array<keyof CanvasMapperProps>;
  onImageClick?: (e: ImageEvent) => void;
  onImageMouseMove?: (e: ImageEvent) => void;
  onClick?: (area: CanvasMapperArea, index: number, e: AreaEvent) => void;
  onMouseDown?: (area: CanvasMapperArea, index: number, e: AreaEvent) => void;
  onMouseUp?: (area: CanvasMapperArea, index: number, e: AreaEvent) => void;
  onTouchStart?: (area: CanvasMapperArea, index: number, e: TouchEvent) => void;
  onTouchEnd?: (area: CanvasMapperArea, index: number, e: TouchEvent) => void;
  onMouseMove?: (area: CanvasMapperArea, index: number, e: AreaEvent) => void;
  onMouseEnter?: (area: ExtendedArea, index: number, e: AreaEvent) => void;
  onMouseLeave?: (area: CanvasMapperArea, index: number, e: AreaEvent) => void;
  onLoad?: (e: HTMLImageElement, dimensions: { width: number; height: number }) => void;
}

const CanvasMapper = ({
  parentRef,
  areas = [],
  mapName = `image-map-${Math.random()}`,
  src: srcProp,
  fillColor: fillColorProp = 'rgba(255, 255, 255, 0.5)',
  strokeColor: strokeColorProp = 'rgba(0, 0, 0, 0.5)',
  lineWidth: lineWidthProp = 1,
  stayHighlighted = false,
  highlightAllAreas = false,
  toggleHighlighted = false,
  rerenderProps = [],
  onImageClick,
  onImageMouseMove,
  onClick,
  onMouseDown,
  onMouseUp,
  onTouchStart,
  onTouchEnd,
  onMouseMove,
  onMouseEnter,
  onMouseLeave,
  onLoad,
}: CanvasMapperProps): JSX.Element => {
  // States and Refs
  const [parentWidth, setParentWidth] = useState(0);
  const [mapAreas, setMapAreas] = useState(areas);
  const [isRendered, setRendered] = useState<boolean>(false);
  const isFirstRender = useRef(true);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const hoverCanvasRef = useRef<HTMLCanvasElement>(null);
  const highlightCanvasRef = useRef<HTMLCanvasElement>(null);

  // Mutable Refs for Contexts
  const renderingCtx = useRef<CanvasRenderingContext2D | null>(
    null,
  ) as React.MutableRefObject<CanvasRenderingContext2D | null>;
  const highlightCtx = useRef<CanvasRenderingContext2D | null>(
    null,
  ) as React.MutableRefObject<CanvasRenderingContext2D | null>;

  // Handle Parent Width Changes
  useEffect(() => {
    const handleResize = () => {
      if (parentRef.current) {
        setParentWidth(parentRef.current.offsetWidth);
      }
    };

    handleResize(); // Set initial width
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [parentRef]);

  // Scale the Canvas Area Coordinates
  const scaleCoords = useCallback(
    (coords: number[]): number[] => {
      const naturalWidth = imageRef.current?.naturalWidth;

      if (!naturalWidth || !parentWidth) {
        return coords;
      }

      const scaleFactor = parentWidth / naturalWidth;
      return coords.map(coord => coord * scaleFactor);
    },
    [parentWidth],
  );

  // Compute Center
  const computeCenter = useCallback(
    (area: CanvasMapperArea): [number, number] => {
      const scaledCoords = scaleCoords(area.coords);
      if (area.shape === 'circle') return [scaledCoords[0], scaledCoords[1]];

      const numPoints = scaledCoords.length / 2;
      const { x, y } = scaledCoords.reduce(
        (acc, val, i) =>
          i % 2 === 0
            ? { ...acc, x: acc.x + val / numPoints }
            : { ...acc, y: acc.y + val / numPoints },
        { x: 0, y: 0 },
      );
      return [x, y];
    },
    [scaleCoords],
  );

  // Render Prefilled Areas
  const renderPrefilledAreas = useCallback(
    (mapObj = areas, ctx = renderingCtx) => {
      if (!ctx.current || !hoverCanvasRef.current) return;
      ctx.current.clearRect(0, 0, hoverCanvasRef.current.width, hoverCanvasRef.current.height);

      mapObj.forEach(area => {
        if (!area.preFillColor) return;
        drawAreas(
          area.shape,
          scaleCoords(area.coords),
          area.preFillColor,
          area.lineWidth || lineWidthProp,
          area.strokeColor || strokeColorProp,
          true,
          ctx,
        );
      });
    },
    [areas, lineWidthProp, strokeColorProp, scaleCoords],
  );

  // Initialize Canvas
  const initCanvas = useCallback(
    (firstLoad = false) => {
      if (!firstLoad && !imageRef.current) return;
      if (
        !imageRef.current ||
        !hoverCanvasRef.current ||
        !highlightCanvasRef.current ||
        !imageContainerRef.current
      ) {
        console.warn('Required DOM references are not available.');
        return;
      }

      const imageWidth = parentWidth;
      const imageHeight =
        imageRef.current.naturalHeight * (imageWidth / imageRef.current.naturalWidth);
      imageRef.current.width = imageWidth;
      imageRef.current.height = imageHeight;
      hoverCanvasRef.current.width = imageWidth;
      hoverCanvasRef.current.height = imageHeight;
      highlightCanvasRef.current.width = imageWidth;
      highlightCanvasRef.current.height = imageHeight;
      imageContainerRef.current.style.width = `${imageWidth}px`;
      imageContainerRef.current.style.height = `${imageHeight}px`;

      const renderingContext = hoverCanvasRef.current.getContext('2d');
      const highlightContext = highlightCanvasRef.current.getContext('2d');

      renderingCtx.current = renderingContext ?? null;
      highlightCtx.current = highlightContext ?? null;

      if (renderingCtx.current) renderingCtx.current.fillStyle = fillColorProp;
      else console.warn('Rendering context not initialized.');

      if (!highlightCtx.current) console.warn('Highlight context not initialized.');

      renderPrefilledAreas();
      onLoad && onLoad(imageRef.current, { width: imageWidth, height: imageHeight });
    },
    [fillColorProp, imageRef, onLoad, renderPrefilledAreas, parentWidth],
  );

  // Area Events
  const onAreaEnter = useCallback(
    (area: ExtendedArea, index: number, event: AreaEvent) => {
      drawAreas(
        area.shape,
        area.scaledCoords,
        area.fillColor || fillColorProp,
        area.lineWidth || lineWidthProp,
        area.strokeColor || strokeColorProp,
        area.active ?? true,
        renderingCtx,
      );
      onMouseEnter && onMouseEnter(area, index, event);
    },
    [fillColorProp, lineWidthProp, strokeColorProp, onMouseEnter],
  );

  const onAreaLeave = useCallback(
    (area: CanvasMapperArea, index: number, event: AreaEvent) => {
      if (renderingCtx.current && hoverCanvasRef.current) {
        renderingCtx.current.clearRect(
          0,
          0,
          hoverCanvasRef.current.width,
          hoverCanvasRef.current.height,
        );
      }
      renderPrefilledAreas(mapAreas, highlightCtx);
      onMouseLeave && onMouseLeave(area, index, event);
    },
    [renderPrefilledAreas, mapAreas, onMouseLeave],
  );

  const handleAreaClick = useCallback(
    (area: ExtendedArea, index: number, event: AreaEvent) => {
      const isAreaActive = area.active ?? true;
      if (isAreaActive && (stayHighlighted || toggleHighlighted)) {
        const newArea = {
          ...area,
          preFillColor:
            toggleHighlighted && area.preFillColor ? undefined : area.fillColor || fillColorProp,
        };
        const updatedAreas = areas.map(currArea =>
          currArea.key === area.key ? newArea : currArea,
        );
        setMapAreas(updatedAreas);
        highlightCtx.current?.clearRect(
          0,
          0,
          highlightCanvasRef.current!.width,
          highlightCanvasRef.current!.height,
        );
        renderPrefilledAreas(updatedAreas, highlightCtx);
      }
      onClick && onClick(area, index, event);
    },
    [areas, stayHighlighted, toggleHighlighted, fillColorProp, onClick],
  );

  // Effect for Initial Render and Updates
  useEffect(() => {
    if (isFirstRender.current) {
      initCanvas(true);
      setRendered(true);
      renderPrefilledAreas(mapAreas, highlightCtx);
      isFirstRender.current = false;
    } else {
      initCanvas();
      renderingCtx.current?.clearRect(
        0,
        0,
        hoverCanvasRef.current!.width,
        hoverCanvasRef.current!.height,
      );
      renderPrefilledAreas(mapAreas, highlightCtx);
    }
  }, [initCanvas, renderPrefilledAreas, mapAreas]);

  // Effect for Resizing
  useEffect(() => initCanvas, [parentWidth]);

  // Memoize Map Areas
  const memoizedAreas = useMemo(
    () =>
      mapAreas.map((area, index) => {
        if (area.disabled) return null;
        const scaledCoords = scaleCoords(area.coords);
        const center = computeCenter(area);
        const extendedArea: ExtendedArea = { ...area, scaledCoords, center };
        return (
          <area
            key={area.key || index.toString()}
            shape={area.shape}
            coords={scaledCoords.join(',')}
            onMouseEnter={event => onAreaEnter(extendedArea, index, event)}
            onMouseLeave={event => onAreaLeave(area, index, event)}
            onMouseMove={event => onMouseMove && onMouseMove(area, index, event)}
            onMouseDown={event => onMouseDown && onMouseDown(area, index, event)}
            onMouseUp={event => onMouseUp && onMouseUp(area, index, event)}
            onTouchStart={event => onTouchStart && onTouchStart(area, index, event)}
            onTouchEnd={event => onTouchEnd && onTouchEnd(area, index, event)}
            onClick={event => handleAreaClick(extendedArea, index, event)}
            href={area.href}
            alt={area.key}
          />
        );
      }),
    [mapAreas, scaleCoords, computeCenter, handleAreaClick, onAreaEnter, onAreaLeave],
  );

  // JSX Return
  return (
    <ContainerEl id="img-mapper" ref={imageContainerRef}>
      <ImageEl
        role="presentation"
        alt="map"
        src={srcProp}
        useMap={`#${mapName}`}
        hide={!imageRef.current}
        ref={imageRef}
        onClick={onImageClick}
        onMouseMove={onImageMouseMove}
      />
      <CanvasEl ref={hoverCanvasRef} />
      <CanvasEl ref={highlightCanvasRef} />
      <MapEl name={mapName}>{isRendered && imageRef.current && memoizedAreas}</MapEl>
    </ContainerEl>
  );
};

// Memoize Component with Deep Comparison
export default React.memo<CanvasMapperProps>(CanvasMapper, (prevProps, nextProps) => {
  const watchedProps = [...rerenderPropsList, ...(nextProps.rerenderProps || [])];

  const propChanged = watchedProps.some(prop => prevProps[prop] !== nextProps[prop]);

  return deepEqual(prevProps.areas, nextProps.areas) && !propChanged;
});
