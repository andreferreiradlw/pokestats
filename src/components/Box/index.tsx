import { CSSProperties, forwardRef } from 'react';
// types
import type { HTMLMotionProps } from 'framer-motion';
// helpers
import { useForwardedRef } from '@/helpers';
// styles
import BoxWrapper from './StyledBox';

export interface BoxProps extends HTMLMotionProps<'div'> {
  flexalign?: CSSProperties['alignItems'] | Record<string, CSSProperties['alignItems']>;
  flexalignself?: CSSProperties['alignSelf'] | Record<string, CSSProperties['alignSelf']>;
  backgroundcolor?: CSSProperties['background'] | Record<string, CSSProperties['background']>;
  borderradius?: CSSProperties['borderRadius'] | Record<string, CSSProperties['borderRadius']>;
  $constrained?: boolean;
  $debug?: boolean;
  flexdirection?: CSSProperties['flexDirection'] | Record<string, CSSProperties['flexDirection']>;
  $flexgrow?: boolean;
  flexwrap?: CSSProperties['flexWrap'] | Record<string, CSSProperties['flexWrap']>;
  flexgap?: CSSProperties['gap'] | Record<string, CSSProperties['gap']>;
  flexheight?: CSSProperties['height'] | Record<string, CSSProperties['height']>;
  $hide?: boolean;
  flexjustify?: CSSProperties['justifyContent'] | Record<string, CSSProperties['justifyContent']>;
  flexmargin?: CSSProperties['margin'] | Record<string, CSSProperties['margin']>;
  minheight?: CSSProperties['minHeight'] | Record<string, CSSProperties['minHeight']>;
  flexpadding?: CSSProperties['padding'] | Record<string, CSSProperties['padding']>;
  $isRelative?: boolean;
  screensizes?: number | Record<string, number>;
  width?: CSSProperties['width'] | Record<string, CSSProperties['width']>;
  $withGutter?: boolean;
  children?: React.ReactNode;
}

const Box = forwardRef((props: BoxProps, ref): JSX.Element => {
  const boxRef = useForwardedRef(ref);

  return <BoxWrapper ref={boxRef} {...props} />;
});

Box.displayName = 'Box';

Box.defaultProps = {
  flexalign: 'center',
  flexdirection: 'column',
  flexwrap: 'nowrap',
  flexjustify: 'center',
  width: '100%',
};

export default Box;
