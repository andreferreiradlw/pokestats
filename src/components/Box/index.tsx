import { CSSProperties, forwardRef } from 'react';
// types
import type { HTMLMotionProps } from 'framer-motion';
// helpers
import { useForwardedRef } from '@/helpers';
// styles
import BoxWrapper from './StyledBox';

export interface BoxProps extends HTMLMotionProps<'div'> {
  alignSelf?: CSSProperties['alignSelf'] | Record<string, CSSProperties['alignSelf']>;
  margin?: CSSProperties['margin'] | Record<string, CSSProperties['margin']>;
  padding?: CSSProperties['padding'] | Record<string, CSSProperties['padding']>;
  $flexWrap?: CSSProperties['flexWrap'] | Record<string, CSSProperties['flexWrap']>;
  width?: CSSProperties['width'] | Record<string, CSSProperties['width']>;
  height?: CSSProperties['height'] | Record<string, CSSProperties['height']>;
  $minHeight?: CSSProperties['minHeight'] | Record<string, CSSProperties['minHeight']>;
  direction?: CSSProperties['flexDirection'] | Record<string, CSSProperties['flexDirection']>;
  align?: CSSProperties['alignItems'] | Record<string, CSSProperties['alignItems']>;
  justify?: CSSProperties['justifyContent'] | Record<string, CSSProperties['justifyContent']>;
  $gap?: CSSProperties['gap'] | Record<string, CSSProperties['gap']>;
  $borderRadius?: CSSProperties['borderRadius'] | Record<string, CSSProperties['borderRadius']>;
  $background?: CSSProperties['background'] | Record<string, CSSProperties['background']>;
  $constrained?: boolean;
  $flexGrow?: boolean;
  sizes?: number | Record<string, any>;
  $relative?: boolean;
  $withGutter?: boolean;
  debug?: boolean;
  hide?: boolean;
  children?: React.ReactNode;
}

const Box = forwardRef(
  (
    {
      align = 'center',
      children,
      direction = 'column',
      $flexWrap = 'nowrap',
      justify = 'center',
      width = '100%',
      ...rest
    }: BoxProps,
    ref,
  ): JSX.Element => {
    const boxRef = useForwardedRef(ref);

    return (
      <BoxWrapper
        align={align}
        direction={direction}
        $flexWrap={$flexWrap}
        justify={justify}
        width={width}
        ref={boxRef}
        {...rest}
      >
        {children}
      </BoxWrapper>
    );
  },
);

Box.displayName = 'Box';

export default Box;
