import React, {
  forwardRef,
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useImperativeHandle,
  type RefObject,
} from 'react';
// helpers
import { drawAreas } from './draw';
import { deepEqual } from '@/helpers';
// constants
import { rerenderPropsList } from './constants';
// styles
import { ContainerEl, ImageEl, CanvasEl, MapEl, LocationLabel } from './StyledCanvasMapper';

// Type definitions for the area and event types
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

// Type definition for the exposed methods
export interface CanvasMapperHandle {
  clearSelection: () => void;
}

export interface CanvasMapperProps {
  mapName: string;
  areas: CanvasMapperArea[];
  defaultArea: string | null;
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
  onClick?: (area: CanvasMapperArea) => void;
  onMouseDown?: (area: CanvasMapperArea, index: number, e: AreaEvent) => void;
  onMouseUp?: (area: CanvasMapperArea, index: number, e: AreaEvent) => void;
  onTouchStart?: (area: CanvasMapperArea, index: number, e: TouchEvent) => void;
  onTouchEnd?: (area: CanvasMapperArea, index: number, e: TouchEvent) => void;
  onMouseMove?: (area: CanvasMapperArea, index: number, e: AreaEvent) => void;
  onMouseEnter?: (area: ExtendedArea, index: number, e: AreaEvent) => void;
  onMouseLeave?: (area: CanvasMapperArea, index: number, e: AreaEvent) => void;
  onLoad?: (e: HTMLImageElement, dimensions: { width: number; height: number }) => void;
}

// ForwardRef to allow the parent component to access internal methods
const CanvasMapper = forwardRef<CanvasMapperHandle, CanvasMapperProps>(
  (
    {
      parentRef,
      areas = [],
      defaultArea,
      mapName = `image-map-${Math.random()}`,
      src: srcProp,
      fillColor: fillColorProp = 'rgba(0, 0, 0, 0.5)',
      strokeColor: strokeColorProp = 'rgba(0, 0, 0, 1)',
      lineWidth: lineWidthProp = 3,
      stayHighlighted = false,
      highlightAllAreas = false,
      toggleHighlighted = false,
      rerenderProps = [], // eslint-disable-line
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
    },
    ref,
  ) => {
    // State management
    const [parentWidth, setParentWidth] = useState(0); // Tracks the parent container's width
    const [mapAreas, setMapAreas] = useState(areas); // Manages the areas on the canvas
    // const [isRendered, setRendered] = useState<boolean>(false); // Tracks if the canvas has been rendered
    const [hoverArea, setHoverArea] = useState<CanvasMapperArea>(); // Tracks the current area being hovered
    const isFirstRender = useRef(true); // Tracks whether this is the first render
    const [isImageloaded, setIsImageloaded] = useState(false);
    // Refs for DOM elements and canvas contexts
    const imageContainerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const hoverCanvasRef = useRef<HTMLCanvasElement>(null);
    const highlightCanvasRef = useRef<HTMLCanvasElement>(null);

    // Mutable refs for 2D drawing contexts
    const renderingCtx = useRef<CanvasRenderingContext2D | null>(null);
    const highlightCtx = useRef<CanvasRenderingContext2D | null>(null);

    // Function to scale coordinates based on the canvas size
    const scaleCoords = useCallback(
      (coords: number[]): number[] => {
        const naturalWidth = imageRef.current?.naturalWidth;
        if (!naturalWidth || !parentWidth) {
          return coords; // Return original coordinates if scaling is not possible
        }
        const scaleFactor = parentWidth / naturalWidth;
        return coords.map(coord => coord * scaleFactor);
      },
      [parentWidth],
    );

    // Function to compute the center of an area
    const computeCenter = useCallback(
      (area: CanvasMapperArea): [number, number] => {
        const scaledCoords = scaleCoords(area.coords);
        if (area.shape === 'circle') return [scaledCoords[0], scaledCoords[1]];

        // Compute center for polygons and rectangles
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

    // Function to render prefilled areas on the canvas
    const renderPrefilledAreas = useCallback(
      (mapObj = areas, ctx = renderingCtx) => {
        if (!ctx.current || !hoverCanvasRef.current) return;
        ctx.current.clearRect(0, 0, hoverCanvasRef.current.width, hoverCanvasRef.current.height);

        mapObj.forEach(area => {
          // Use a default light fill color when highlighting all areas
          const fillColor = highlightAllAreas
            ? area.preFillColor || 'rgba(0, 0, 0, 0.1)'
            : area.preFillColor;

          if (!fillColor) return; // Only draw areas with a preFillColor

          drawAreas(
            ctx,
            true,
            area.shape,
            scaleCoords(area.coords),
            area.strokeColor || strokeColorProp,
            fillColor,
            area.lineWidth || lineWidthProp,
          );
        });
      },
      [areas, lineWidthProp, strokeColorProp, scaleCoords, highlightAllAreas],
    );

    // Expose methods to parent component via ref
    useImperativeHandle(
      ref,
      () => ({
        // Method to clear the currently selected areas
        clearSelection() {
          setMapAreas(areas); // Reset areas to initial state
          if (highlightCtx.current && highlightCanvasRef.current) {
            highlightCtx.current.clearRect(
              0,
              0,
              highlightCanvasRef.current.width,
              highlightCanvasRef.current.height,
            );
          }
          renderPrefilledAreas(areas, highlightCtx); // Re-render areas
        },
      }),
      [areas, renderPrefilledAreas],
    );

    // Handlers for mouse events
    const onAreaEnter = useCallback(
      (area: ExtendedArea, index: number, event: AreaEvent) => {
        drawAreas(
          renderingCtx,
          area.active ?? true,
          area.shape,
          area.scaledCoords,
          area.strokeColor || strokeColorProp,
          area.fillColor || fillColorProp,
          area.lineWidth || lineWidthProp,
        );
        // update hover area
        setHoverArea(area);
        // trigger events
        onMouseEnter?.(area, index, event);
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

        // render areas
        renderPrefilledAreas(mapAreas, highlightCtx);

        // remove hover area if any
        setHoverArea(undefined);

        // trigger events
        onMouseLeave?.(area, index, event);
      },
      [renderPrefilledAreas, mapAreas, onMouseLeave],
    );

    const handleAreaClick = useCallback(
      (area: ExtendedArea) => {
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

        // Trigger onClick event
        onClick?.(area);
      },
      [areas, stayHighlighted, toggleHighlighted, fillColorProp, onClick],
    );

    // Function to initialize canvas properties and contexts
    const initCanvas = useCallback(() => {
      if (
        !imageRef.current ||
        !hoverCanvasRef.current ||
        !highlightCanvasRef.current ||
        !imageContainerRef.current
      ) {
        console.warn('Required DOM references are not available.');
        return;
      }

      // Set the dimensions of the image and canvases
      const imageWidth = parentWidth;

      imageRef.current.width = parentWidth;

      const imageHeight =
        imageRef.current.naturalHeight * (imageWidth / imageRef.current.naturalWidth);

      imageRef.current.height = imageHeight;

      hoverCanvasRef.current.width = imageWidth;
      hoverCanvasRef.current.height = imageHeight;

      highlightCanvasRef.current.width = imageWidth;
      highlightCanvasRef.current.height = imageHeight;

      imageContainerRef.current.style.width = `${imageWidth}px`;
      imageContainerRef.current.style.height = `${imageHeight}px`;

      // Initialize 2D drawing contexts
      const renderingContext = hoverCanvasRef.current.getContext('2d');
      const highlightContext = highlightCanvasRef.current.getContext('2d');

      renderingCtx.current = renderingContext ?? null;
      highlightCtx.current = highlightContext ?? null;

      if (renderingCtx.current) renderingCtx.current.fillStyle = fillColorProp;
      else console.warn('Rendering context not initialized.');

      if (!highlightCtx.current) console.warn('Highlight context not initialized.');

      // Trigger onload event
      onLoad?.(imageRef.current, { width: imageWidth, height: imageHeight });
    }, [fillColorProp, imageRef, onLoad, renderPrefilledAreas, parentWidth]);

    // Effect for initial render and updates
    useEffect(() => {
      // check if parent and image are completely loaded
      if (parentWidth < 1 || !isImageloaded) return;

      // initialise the canvas elements onLoad and when parent re-sizes
      initCanvas();

      if (isFirstRender.current) {
        // Check if defaultArea is provided and find its index
        if (defaultArea) {
          const defaultAreaDetails = areas.find(({ key }) => key === defaultArea);

          if (defaultAreaDetails) {
            // Update the areas to highlight the default area
            const updatedAreas = areas.map(area => ({
              ...area,
              preFillColor:
                area.key === defaultAreaDetails.key
                  ? area.fillColor || fillColorProp
                  : area.preFillColor,
            }));

            setMapAreas(updatedAreas);

            renderPrefilledAreas(updatedAreas, highlightCtx);

            // trigger click event
            onClick?.(defaultAreaDetails);
          } else {
            // If no matching area is found, keep the original areas
            setMapAreas(areas);
            renderPrefilledAreas(areas, highlightCtx);
          }
        } else {
          // No defaultArea, just set the original areas
          setMapAreas(areas);
          renderPrefilledAreas(areas, highlightCtx);
        }

        // update isFirstRender ref
        isFirstRender.current = false;
      } else {
        // reset ctx
        renderingCtx.current?.clearRect(
          0,
          0,
          hoverCanvasRef.current!.width,
          hoverCanvasRef.current!.height,
        );
        // render areas again in the updated canvas size
        renderPrefilledAreas(mapAreas, highlightCtx);
      }
    }, [parentWidth, highlightAllAreas, isImageloaded]);

    // Effect to handle resizing and initialize canvas size
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

    // Memoize the areas to prevent unnecessary re-renders
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
              onMouseMove={event => onMouseMove?.(area, index, event)}
              onMouseDown={event => onMouseDown?.(area, index, event)}
              onMouseUp={event => onMouseUp?.(area, index, event)}
              onTouchStart={event => onTouchStart?.(area, index, event)}
              onTouchEnd={event => onTouchEnd?.(area, index, event)}
              onClick={() => handleAreaClick(extendedArea)}
              href={area.href}
              alt={area.key}
            />
          );
        }),
      [mapAreas, scaleCoords, computeCenter, handleAreaClick, onAreaEnter, onAreaLeave],
    );

    // JSX return with the memoized areas
    return (
      <ContainerEl elevation={6} id="img-mapper" ref={imageContainerRef}>
        <ImageEl
          role="presentation"
          alt="map"
          src={srcProp}
          useMap={`#${mapName}`}
          ref={imageRef}
          onClick={onImageClick}
          onMouseMove={onImageMouseMove}
          onLoad={() => {
            if (imageRef.current) {
              setIsImageloaded(true);
            }
          }}
        />
        <CanvasEl ref={hoverCanvasRef} />
        <CanvasEl ref={highlightCanvasRef} />
        <MapEl name={mapName}>{memoizedAreas}</MapEl>
        {hoverArea && <LocationLabel>{hoverArea.title}</LocationLabel>}
      </ContainerEl>
    );
  },
);

// Memoize Component with Deep Comparison
export default React.memo(CanvasMapper, (prevProps, nextProps) => {
  const watchedProps = [...rerenderPropsList, ...(nextProps.rerenderProps || [])];
  const propChanged = watchedProps.some(prop => prevProps[prop] !== nextProps[prop]);

  return deepEqual(prevProps.areas, nextProps.areas) && !propChanged;
});
