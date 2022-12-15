import { forwardRef } from 'react';
// types
import type { HTMLMotionProps } from 'framer-motion';
// helpers
import { useForwardedRef } from '@/helpers';
// styles
import BoxWrapper from './StyledBox';

export interface BoxProps extends HTMLMotionProps<'div'> {
  alignSelf?: string | Record<string, any>;
  margin?: string | Record<string, any>;
  padding?: string | Record<string, any>;
  $flexWrap?: string | Record<string, any>;
  width?: string | Record<string, any>;
  height?: string | Record<string, any>;
  $minHeight?: string | Record<string, any>;
  direction?: string | Record<string, any>;
  align?: string | Record<string, any>;
  justify?: string | Record<string, any>;
  gap?: string | Record<string, any>;
  $constrained?: boolean;
  $flexGrow?: boolean;
  sizes?: number | Record<string, any>;
  relative?: boolean;
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
