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

const NewMapper = (props: ImageMapperProps): JSX.Element => {
  // data
  const {
    // containerRef,
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
  // ref
  const container = useRef<Container>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const hoverCanvasRef = useRef<HTMLCanvasElement>(null);
  const highlightCanvasRef = useRef<HTMLCanvasElement>(null);
  const renderingCtx = useRef<CanvasRenderingContext2D>(null);
  const highlightCtx = useRef<CanvasRenderingContext2D>(null);
  // states
  const [map, setMap] = useState<Map>(mapProp);
  // hooks
  const isFirstRender = useIsFirstRender();
  // memo
  const scaleCoords = useCallback(
    (coords: number[]): number[] =>
      coords.map(coord => coord / (imageRef.current.naturalWidth / parentWidth)),
    [parentWidth, imageRef],
  );
  const centerCoords = useCallback(
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
  const renderPrefilledAreas = useCallback(
    (mapObj: Map) => {
      mapObj.areas.forEach(area => {
        if (!area.preFillColor) return;

        drawAreas(
          area.shape,
          scaleCoords(area.coords),
          area.preFillColor,
          area.lineWidth || lineWidthProp,
          area.strokeColor || strokeColorProp,
          true,
          renderingCtx,
        );
      });
    },
    [lineWidthProp, strokeColorProp, scaleCoords],
  );

  useEffect(() => {
    if (imageRef.current) {
      // console.log('mapProp', mapProp);
      // set width and height
      const imageWidth = parentWidth;
      const imageHeight = imageRef.current.clientHeight;
      // hover canvas
      hoverCanvasRef.current.width = imageWidth;
      hoverCanvasRef.current.height = imageHeight;
      // highlight canvas
      highlightCanvasRef.current.width = imageWidth;
      highlightCanvasRef.current.height = imageHeight;
      // container
      container.current.style.width = `${imageWidth}px`;
      container.current.style.height = `${imageHeight}px`;
      // context
      renderingCtx.current = hoverCanvasRef.current.getContext('2d');
      renderingCtx.current.fillStyle = fillColorProp;
      highlightCtx.current = hoverCanvasRef.current.getContext('2d');
      highlightCtx.current.fillStyle = 'black';
      // render
      renderPrefilledAreas(mapProp);
    }
  }, [imageRef, parentWidth]);

  const onAreaEnter = (area: CustomArea, index?: number, event?: AreaEvent) => {
    console.log('area', area);
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
    renderPrefilledAreas(mapProp);

    if (onMouseLeave) onMouseLeave(area, index, event);
  };

  const handleAreaClick = (area: CustomArea, index: number, event: AreaEvent) => {};

  return (
    <ContainerEl id="img-mapper-beta" ref={container}>
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
        {imageRef.current &&
          map.areas.map((area, index) => {
            if (area.disabled) return null;

            const scaledCoords = scaleCoords(area.coords);
            const center = centerCoords(area);
            const extendedArea = { ...area, scaledCoords, center };

            return (
              <area
                key={area[areaKeyName] || index.toString()}
                shape={area.shape}
                coords={scaledCoords.join(',')}
                onMouseEnter={event => onAreaEnter(extendedArea, index, event)}
                onMouseLeave={event => onAreaLeave(extendedArea, index, event)}
                // onMouseMove={event => mouseMove(extendedArea, index, event, props)}
                // onMouseDown={event => mouseDown(extendedArea, index, event, props)}
                // onMouseUp={event => mouseUp(extendedArea, index, event, props)}
                // onTouchStart={event => touchStart(extendedArea, index, event, props)}
                // onTouchEnd={event => touchEnd(extendedArea, index, event, props)}
                onClick={event => handleAreaClick(extendedArea, index, event)}
                href={area.href}
                alt={area.title}
              />
            );
          })}
      </MapEl>
    </ContainerEl>
  );
};

export default NewMapper;
