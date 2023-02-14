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
import { callingFn } from '@/helpers';
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
    active,
    disabled,
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
  const [map, setMap] = useState<Map>(mapProp);
  const [storedMap, setStoredMap] = useState<Map>(map);
  const [isRendered, setRendered] = useState<boolean>(false);
  const container = useRef<Container>(null);
  const img = useRef<HTMLImageElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const ctx = useRef<CanvasRenderingContext2D>(null);
  const isInitialMount = useRef<boolean>(true);
  // memo
  const updateCacheMap = useCallback(() => {
    setMap(mapProp);
    setStoredMap(mapProp);
  }, [mapProp]);

  const scaleCoords = useCallback(
    (coords: number[]): number[] =>
      coords.map(coord => coord / (img.current.naturalWidth / parentWidth)),
    [parentWidth, img],
  );

  const renderPrefilledAreas = useCallback(
    (mapObj = map) => {
      mapObj.areas.map(area => {
        if (!area.preFillColor) return false;

        callingFn(
          area.shape,
          scaleCoords(area.coords),
          area.preFillColor,
          area.lineWidth || lineWidthProp,
          area.strokeColor || strokeColorProp,
          true,
          ctx,
        );

        return true;
      });
    },
    [map, lineWidthProp, strokeColorProp, scaleCoords],
  );

  const initCanvas = useCallback(
    (firstLoad = false) => {
      if (!firstLoad && !img.current) return;

      const imageWidth = parentWidth;
      const imageHeight = img.current.clientHeight;

      canvas.current.width = imageWidth;
      canvas.current.height = imageHeight;
      container.current.style.width = `${imageWidth}px`;
      container.current.style.height = `${imageHeight}px`;

      ctx.current = canvas.current.getContext('2d');
      ctx.current.fillStyle = fillColorProp;

      if (img.current) {
        renderPrefilledAreas();
        // trigger onLoad fn prop
        if (onLoad) {
          onLoad(img.current, {
            width: imageWidth,
            height: imageHeight,
          });
        }
      }
    },
    [fillColorProp, img, onLoad, renderPrefilledAreas, parentWidth],
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

    if (active) {
      callingFn(
        shape,
        scaledCoords,
        fillColor || fillColorProp,
        lineWidth || lineWidthProp,
        strokeColor || strokeColorProp,
        isAreaActive ?? true,
        ctx,
      );
    }

    if (onMouseEnter) onMouseEnter(area, index, event);
  };

  const onAreaLeave = (area: CustomArea, index: number, event: AreaEvent) => {
    if (active) {
      ctx.current.clearRect(0, 0, canvas.current.width, canvas.current.height);
      renderPrefilledAreas();
    }

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

  const updateCanvas = () => {
    ctx.current.clearRect(0, 0, canvas.current.width, canvas.current.height);
    renderPrefilledAreas(mapProp);
  };

  // useEffect(() => {
  //   initCanvas(true);
  //   updateCacheMap();
  //   setRendered(true);
  // }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      initCanvas(true);
      updateCacheMap();
      setRendered(true);
      isInitialMount.current = false;
    } else {
      updateCacheMap();
      initCanvas();
      if (img.current) updateCanvas();
    }
  }, [props, isInitialMount, img]);

  useEffect(() => {
    container.current.clearHighlightedArea = () => {
      setMap(storedMap);
      initCanvas();
    };

    if (containerRef) {
      containerRef.current = container.current;
    }
  }, [img]);

  useEffect(() => {
    // restart canvas when parent resizes
    initCanvas();
  }, [parentWidth, initCanvas]);

  return (
    <ContainerEl id="img-mapper" ref={container}>
      <ImageEl
        role="presentation"
        className="img-mapper-img"
        alt="map"
        src={srcProp}
        useMap={`#${map.name}`}
        hide={!img.current}
        ref={img}
        onClick={event => imageClick(event, props)}
        onMouseMove={event => imageMouseMove(event, props)}
      />
      <CanvasEl className="img-mapper-canvas" ref={canvas} />
      <MapEl className="img-mapper-map" name={map.name}>
        {isRendered &&
          !disabled &&
          img.current &&
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
