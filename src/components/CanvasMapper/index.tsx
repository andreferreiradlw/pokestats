import React, { useState, useEffect, useRef, useCallback, type RefObject } from 'react';
import type { Map, Container, MapAreas, CustomArea, CTX } from '@/types/imageMapper';
import equal from 'fast-deep-equal';
import { drawAreas } from '@/helpers';
import { ContainerEl, ImageEl, CanvasEl, MapEl } from './StyledCanvasMapper';
import {
  imageClick,
  imageMouseMove,
  mouseDown,
  mouseMove,
  mouseUp,
  touchEnd,
  touchStart,
} from './events';
// constants
import { rerenderPropsList, ImageMapperDefaultProps } from './constants';

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
  mapAreas: CanvasMapperArea[];
  areaKeyName?: 'id';
  src: string;
  parentRef: RefObject<HTMLDivElement>;
  fillColor?: string;
  strokeColor?: string;
  lineWidth?: number;
  stayHighlighted?: boolean;
  stayMultiHighlighted?: boolean;
  highlightAllAreas?: boolean;
  toggleHighlighted?: boolean;
  rerenderProps?: Array<keyof CanvasMapperProps>;
  onImageClick?: (e: ImageEvent) => void;
  onImageMouseMove?: (e: ImageEvent) => void;
  onClick?: (area: ExtendedArea, index: number, e: AreaEvent) => void;
  onMouseDown?: (area: ExtendedArea, index: number, e: AreaEvent) => void;
  onMouseUp?: (area: ExtendedArea, index: number, e: AreaEvent) => void;
  onTouchStart?: (area: ExtendedArea, index: number, e: TouchEvent) => void;
  onTouchEnd?: (area: ExtendedArea, index: number, e: TouchEvent) => void;
  onMouseMove?: (area: ExtendedArea, index: number, e: AreaEvent) => void;
  onMouseEnter?: (area: ExtendedArea, index: number, e: AreaEvent) => void;
  onMouseLeave?: (area: ExtendedArea, index: number, e: AreaEvent) => void;
  onLoad?: (e: HTMLImageElement, dimensions: { width: number; height: number }) => void;
}

const CanvasMapper = (props: CanvasMapperProps): JSX.Element => {
  const {
    parentRef,
    fillColor: fillColorProp,
    lineWidth: lineWidthProp,
    mapAreas,
    mapName,
    src: srcProp,
    strokeColor: strokeColorProp,
    areaKeyName,
    stayHighlighted,
    stayMultiHighlighted,
    // highlightAllAreas,
    toggleHighlighted,
    // parentWidth,
    onLoad,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
    onMouseDown,
    onMouseUp,
    onClick,
    onTouchStart,
    onTouchEnd,
    onImageClick,
  } = props;

  // States
  const [parentWidth, setParentWidth] = useState(0);
  const [map, setMap] = useState(mapAreas);
  const [storedMap, setStoredMap] = useState(map);
  const [isRendered, setRendered] = useState<boolean>(false);

  // Refs
  const imageContainerRef = useRef<Container>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const hoverCanvasRef = useRef<HTMLCanvasElement>(null);
  const highlightCanvasRef = useRef<HTMLCanvasElement>(null);
  const renderingCtx = useRef<CTX>();
  const highlightCtx = useRef<CanvasRenderingContext2D>(null);
  const isFirstRender = useRef(true); // Replacing useIsFirstRender hook

  // handle parent element width changes
  useEffect(() => {
    const handleResize = () => {
      setParentWidth(parentRef.current!.offsetWidth);
    };
    // set initial width
    if (parentWidth === 0) {
      handleResize();
    }
    // add event listener
    window.addEventListener('resize', handleResize);
    // cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [parentRef.current?.offsetWidth]);

  // scale the canvas areas coordenates based on the image natural width and parent width
  const scaleCoords = useCallback(
    (coords: number[]): number[] =>
      coords.map(coord => coord / (imageRef.current!.naturalWidth / parentWidth)),
    [parentWidth, imageRef],
  );

  const renderPrefilledAreas = useCallback(
    (mapObj = mapAreas) => {
      mapObj.forEach(area => {
        if (!area.preFillColor) return;

        if (renderingCtx)
          drawAreas(
            area.shape,
            scaleCoords(area.coords),
            area.preFillColor,
            area.lineWidth || lineWidthProp!,
            area.strokeColor || strokeColorProp!,
            true,
            // @ts-expect-error
            renderingCtx,
          );
      });
    },
    [map, lineWidthProp, strokeColorProp, scaleCoords],
  );

  const initCanvas = useCallback(
    (firstLoad = false) => {
      if (!firstLoad && !imageRef.current) return;

      const imageWidth = parentWidth;

      // update image width to match parent dynamically
      imageRef.current!.width = imageWidth;
      const imageHeight = imageRef.current!.height;

      hoverCanvasRef.current.width = imageWidth;
      hoverCanvasRef.current.height = imageHeight;
      imageContainerRef.current.style.width = `${imageWidth}px`;
      imageContainerRef.current.style.height = `${imageHeight}px`;

      renderingCtx.current = hoverCanvasRef.current.getContext('2d');
      renderingCtx.current.fillStyle = fillColorProp;
      // highlight canvas
      highlightCanvasRef.current.width = imageWidth;
      highlightCanvasRef.current.height = imageHeight;
      highlightCtx.current = hoverCanvasRef.current.getContext('2d');

      renderPrefilledAreas();

      onLoad &&
        onLoad(imageRef.current!, {
          width: imageWidth,
          height: imageHeight,
        });
    },
    [fillColorProp, imageRef, onLoad, renderPrefilledAreas, parentWidth],
  );

  const computeCenter = useCallback(
    (area: MapAreas): [number, number] => {
      if (!area) return [0, 0];

      const scaledCoords = scaleCoords(area.coords);

      switch (area.shape) {
        case 'circle':
          return [scaledCoords[0], scaledCoords[1]];
        case 'poly':
        case 'rect':
        default: {
          const n = scaledCoords.length / 2;
          const { y: scaleY, x: scaleX } = scaledCoords.reduce(
            ({ y, x }, val, idx) => (!(idx % 2) ? { y, x: x + val / n } : { y: y + val / n, x }),
            { y: 0, x: 0 },
          );
          return [scaleX, scaleY];
        }
      }
    },
    [scaleCoords],
  );

  const onAreaEnter = (area: CustomArea, index?: number, event?: AreaEvent) => {
    const { shape, scaledCoords, fillColor, lineWidth, strokeColor, active: isAreaActive } = area;

    drawAreas(
      shape,
      scaledCoords,
      fillColor || fillColorProp,
      lineWidth || lineWidthProp,
      strokeColor || strokeColorProp,
      isAreaActive ?? true,
      renderingCtx,
    );

    if (onMouseEnter) onMouseEnter(area, index, event);
  };

  const onAreaLeave = (area: CustomArea, index: number, event: AreaEvent) => {
    renderingCtx.current.clearRect(
      0,
      0,
      hoverCanvasRef.current.width,
      hoverCanvasRef.current.height,
    );
    renderPrefilledAreas();

    if (onMouseLeave) onMouseLeave(area, index, event);
  };

  const handleAreaClick = (area: CustomArea, index: number, event: AreaEvent) => {
    const isAreaActive = area.active ?? true;

    console.log('isAreaActive', isAreaActive);

    if (isAreaActive && (stayHighlighted || stayMultiHighlighted || toggleHighlighted)) {
      const newArea = { ...area };

      const chosenArea = stayMultiHighlighted ? map : storedMap;

      console.log('newArea', newArea);
      console.log('chosenArea', chosenArea);

      if (toggleHighlighted && newArea.preFillColor) {
        delete newArea.preFillColor;
      } else if (stayHighlighted || stayMultiHighlighted) {
        newArea.preFillColor = area.fillColor || fillColorProp;
      }

      const updatedAreas = chosenArea.map(cur =>
        cur[areaKeyName] === area[areaKeyName] ? newArea : cur,
      );

      setMap(prev => ({ ...prev, areas: updatedAreas }));
    }

    if (onClick) {
      event.preventDefault();
      onClick(area, index, event);
    }
  };

  useEffect(() => {
    if (isFirstRender.current) {
      initCanvas(true);
      setRendered(true);
      renderPrefilledAreas(mapAreas);
      isFirstRender.current = false; // Marking the first render complete
    } else {
      initCanvas();
      if (imageRef.current) {
        renderingCtx.current.clearRect(
          0,
          0,
          hoverCanvasRef.current.width,
          hoverCanvasRef.current.height,
        );
        renderPrefilledAreas(mapAreas);
      }
    }
    // Update cached map
    setMap(mapAreas);
    setStoredMap(mapAreas);
  }, [
    mapAreas,
    isFirstRender,
    imageRef,
    hoverCanvasRef,
    renderingCtx,
    initCanvas,
    renderPrefilledAreas,
  ]);

  useEffect(() => {
    // Restart canvas when parent resizes
    initCanvas();
  }, [parentWidth, initCanvas]);

  return (
    <ContainerEl id="img-mapper" ref={imageContainerRef}>
      <ImageEl
        role="presentation"
        alt="map"
        src={srcProp}
        useMap={`#${mapName}`}
        hide={!imageRef.current}
        ref={imageRef}
        onClick={event => imageClick(event, onImageClick)}
        onMouseMove={event => imageMouseMove(event, props)}
      />
      <CanvasEl ref={hoverCanvasRef} />
      <CanvasEl ref={highlightCanvasRef} />
      <MapEl name={mapName}>
        {isRendered &&
          imageRef.current &&
          mapAreas.map((area, index) => {
            if (area.disabled) return null;

            const scaledCoords = scaleCoords(area.coords);
            const center = computeCenter(area);
            const extendedArea: ExtendedArea = { ...area, scaledCoords, center };

            return (
              <area
                key={area[areaKeyName] || index.toString()}
                shape={area.shape}
                coords={scaledCoords.join(',')}
                onMouseEnter={event => onAreaEnter(extendedArea, index, event)}
                onMouseLeave={event => onAreaLeave(extendedArea, index, event)}
                onMouseMove={event => mouseMove(extendedArea, index, event, onMouseMove)}
                onMouseDown={event => mouseDown(extendedArea, index, event, onMouseDown)}
                onMouseUp={event => mouseUp(extendedArea, index, event, onMouseUp)}
                onTouchStart={event => touchStart(extendedArea, index, event, onTouchStart)}
                onTouchEnd={event => touchEnd(extendedArea, index, event, onTouchEnd)}
                onClick={event => handleAreaClick(extendedArea, index, event)}
                href={area.href}
                alt="map"
              />
            );
          })}
      </MapEl>
    </ContainerEl>
  );
};

CanvasMapper.defaultProps = ImageMapperDefaultProps;

export default React.memo<CanvasMapperProps>(CanvasMapper, (prevProps, nextProps) => {
  const watchedProps = [...rerenderPropsList, ...nextProps.rerenderProps!];

  const propChanged = watchedProps.some(prop => prevProps[prop] !== nextProps[prop]);

  return equal(prevProps.mapAreas, nextProps.mapAreas) && !propChanged;
});
