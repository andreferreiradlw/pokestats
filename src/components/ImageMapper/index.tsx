// @ts-nocheck

import React, { useState, useEffect, useRef, useCallback } from 'react';
// types
import type {
  Map,
  Container,
  MapAreas,
  CustomArea,
  AreaEvent,
  ImageMapperProps,
  CTX,
} from '@/types/imageMapper';
// helpers
import equal from 'fast-deep-equal';
import { drawAreas } from '@/helpers';
// hooks
import { useIsFirstRender } from 'usehooks-ts';
// constants
import { rerenderPropsList, ImageMapperDefaultProps } from './constants';
// events
import {
  mouseMove,
  imageMouseMove,
  imageClick,
  mouseDown,
  mouseUp,
  touchStart,
  touchEnd,
} from './events';
// styles
import { ContainerEl, ImageEl, CanvasEl, MapEl } from './StyledImageMapper';

const ImageMapper = (props: ImageMapperProps): JSX.Element => {
  // data
  const {
    containerRef,
    fillColor: fillColorProp,
    lineWidth: lineWidthProp,
    map: mapProp,
    src: srcProp,
    strokeColor: strokeColorProp,
    areaKeyName,
    stayHighlighted,
    stayMultiHighlighted,
    highlightAllAreas,
    toggleHighlighted,
    parentWidth,
    onLoad,
    onMouseEnter,
    onMouseLeave,
    onClick,
  } = props;
  // states
  const [map, setMap] = useState(mapProp);
  const [storedMap, setStoredMap] = useState(map);
  const [isRendered, setRendered] = useState<boolean>(false);
  const container = useRef<Container>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const hoverCanvasRef = useRef<HTMLCanvasElement>(null);
  const highlightCanvasRef = useRef<HTMLCanvasElement>(null);
  const renderingCtx = useRef<CTX>();
  const highlightCtx = useRef<CanvasRenderingContext2D>(null);
  // hooks
  const isFirstRender = useIsFirstRender();
  // memo
  const scaleCoords = useCallback(
    (coords: number[]): number[] =>
      coords.map(coord => coord / (imageRef?.current?.naturalWidth! / parentWidth)),
    [parentWidth, imageRef],
  );

  const renderPrefilledAreas = useCallback(
    (mapObj = map) => {
      mapObj?.areas.forEach(area => {
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
      const imageHeight = imageRef.current.clientHeight;

      hoverCanvasRef.current.width = imageWidth;
      hoverCanvasRef.current.height = imageHeight;
      container.current.style.width = `${imageWidth}px`;
      container.current.style.height = `${imageHeight}px`;

      renderingCtx.current = hoverCanvasRef.current.getContext('2d');
      renderingCtx.current.fillStyle = fillColorProp;
      // highlight canvas
      highlightCanvasRef.current.width = imageWidth;
      highlightCanvasRef.current.height = imageHeight;
      highlightCtx.current = hoverCanvasRef.current.getContext('2d');

      if (imageRef.current) {
        renderPrefilledAreas();

        // trigger onLoad fn prop
        if (onLoad) {
          onLoad(imageRef.current, {
            width: imageWidth,
            height: imageHeight,
          });
        }
      }
    },
    [fillColorProp, imageRef, onLoad, renderPrefilledAreas, parentWidth],
  );

  // useEffect(() => {
  //   if (highlightCtx) {
  //     if (imageRef.current && highlightAllAreas) {
  //       map.areas.forEach(area => {
  //         drawAreas(
  //           area.shape,
  //           scaleCoords(area.coords),
  //           'rgba(222, 98, 98, 0.5)',
  //           2,
  //           'black',
  //           true,
  //           highlightCtx,
  //         );

  //         return true;
  //       });
  //     } else {
  //       map.areas.forEach(area => {
  //         drawAreas(
  //           area.shape,
  //           scaleCoords(area.coords),
  //           'rgba(222, 98, 98, 0.5)',
  //           2,
  //           'black',
  //           false,
  //           highlightCtx,
  //         );

  //         return true;
  //       });
  //     }
  //   }
  // }, [highlightAllAreas, imageRef]);

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

    if (isAreaActive && (stayHighlighted || stayMultiHighlighted || toggleHighlighted)) {
      const newArea = { ...area };
      const chosenArea = stayMultiHighlighted ? map : storedMap;

      if (toggleHighlighted && newArea.preFillColor) {
        delete newArea.preFillColor;
      } else if (stayHighlighted || stayMultiHighlighted) {
        newArea.preFillColor = area.fillColor || fillColorProp;
      }

      const updatedAreas = chosenArea.areas.map(cur =>
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
    if (isFirstRender) {
      initCanvas(true);
      setRendered(true);
      renderPrefilledAreas(mapProp);
    } else {
      initCanvas();
      if (imageRef.current) {
        renderingCtx.current.clearRect(
          0,
          0,
          hoverCanvasRef.current.width,
          hoverCanvasRef.current.height,
        );
        renderPrefilledAreas(mapProp);
      }
    }
    // update cached map
    setMap(mapProp);
    setStoredMap(mapProp);
  }, [props]);

  // useEffect(() => {
  //   container.current.clearHighlightedArea = () => {
  //     setMap(storedMap);
  //     initCanvas();
  //   };

  //   if (containerRef) {
  //     containerRef.current = container.current;
  //   }
  // }, [imageRef]);

  useEffect(() => {
    // restart canvas when parent resizes
    initCanvas();
  }, [parentWidth, initCanvas]);

  console.log('highlightAllAreas', highlightAllAreas);

  return (
    <ContainerEl id="img-mapper" ref={container}>
      <ImageEl
        role="presentation"
        alt="map"
        src={srcProp}
        useMap={`#${map.name}`}
        hide={!imageRef.current}
        ref={imageRef}
        onClick={event => imageClick(event, props)}
        onMouseMove={event => imageMouseMove(event, props)}
      />
      <CanvasEl ref={hoverCanvasRef} />
      <CanvasEl ref={highlightCanvasRef} />
      <MapEl name={map.name}>
        {isRendered &&
          imageRef.current &&
          map.areas.map((area, index) => {
            if (area.disabled) return null;

            const scaledCoords = scaleCoords(area.coords);
            const center = computeCenter(area);
            const extendedArea = { ...area, scaledCoords, center };

            return (
              <area
                key={area[areaKeyName] || index.toString()}
                shape={area.shape}
                coords={scaledCoords.join(',')}
                onMouseEnter={event => onAreaEnter(extendedArea, index, event)}
                onMouseLeave={event => onAreaLeave(extendedArea, index, event)}
                onMouseMove={event => mouseMove(extendedArea, index, event, props)}
                onMouseDown={event => mouseDown(extendedArea, index, event, props)}
                onMouseUp={event => mouseUp(extendedArea, index, event, props)}
                onTouchStart={event => touchStart(extendedArea, index, event, props)}
                onTouchEnd={event => touchEnd(extendedArea, index, event, props)}
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

ImageMapper.defaultProps = ImageMapperDefaultProps;

// export default ImageMapper;

export default React.memo<ImageMapperProps>(ImageMapper, (prevProps, nextProps) => {
  const watchedProps = [...rerenderPropsList, ...nextProps.rerenderProps!];

  const propChanged = watchedProps.some(prop => prevProps[prop] !== nextProps[prop]);

  return equal(prevProps.map, nextProps.map) && !propChanged;
});
