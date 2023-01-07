import { CSSProperties, forwardRef } from 'react';
// types
import type { HTMLMotionProps } from 'framer-motion';
// helpers
import { useForwardedRef } from '@/helpers';
// styles
import BoxWrapper from './StyledBox';

export interface BoxProps extends HTMLMotionProps<'div'> {
  $align?: CSSProperties['alignItems'] | Record<string, CSSProperties['alignItems']>;
  $alignSelf?: CSSProperties['alignSelf'] | Record<string, CSSProperties['alignSelf']>;
  $background?: CSSProperties['background'] | Record<string, CSSProperties['background']>;
  $borderRadius?: CSSProperties['borderRadius'] | Record<string, CSSProperties['borderRadius']>;
  $constrained?: boolean;
  $debug?: boolean;
  $direction?: CSSProperties['flexDirection'] | Record<string, CSSProperties['flexDirection']>;
  $flexGrow?: boolean;
  $flexWrap?: CSSProperties['flexWrap'] | Record<string, CSSProperties['flexWrap']>;
  $gap?: CSSProperties['gap'] | Record<string, CSSProperties['gap']>;
  $height?: CSSProperties['height'] | Record<string, CSSProperties['height']>;
  $hide?: boolean;
  $justify?: CSSProperties['justifyContent'] | Record<string, CSSProperties['justifyContent']>;
  $margin?: CSSProperties['margin'] | Record<string, CSSProperties['margin']>;
  $minHeight?: CSSProperties['minHeight'] | Record<string, CSSProperties['minHeight']>;
  $padding?: CSSProperties['padding'] | Record<string, CSSProperties['padding']>;
  $relative?: boolean;
  $sizes?: number | Record<string, number>;
  $width?: CSSProperties['width'] | Record<string, CSSProperties['width']>;
  $withGutter?: boolean;
  children?: React.ReactNode;
}

const Box = forwardRef(
  (
    {
      $align = 'center',
      $direction = 'column',
      $flexWrap = 'nowrap',
      $justify = 'center',
      $width = '100%',
      children,
      ...rest
    }: BoxProps,
    ref,
  ): JSX.Element => {
    const boxRef = useForwardedRef(ref);

    return (
      <BoxWrapper
        $align={$align}
        $direction={$direction}
        $flexWrap={$flexWrap}
        $justify={$justify}
        $width={$width}
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
