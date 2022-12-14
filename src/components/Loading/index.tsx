import { forwardRef } from 'react';
// types
import type { BoxProps } from '@/components/Box';
// styles
import { LoadingContainer, PotionIcon, Text } from './StyledLoading';
// components
import BoxWrapper from '@/components/Box/StyledBox';
// helpers
import { staggerExitLoadingVariant, loadingChild } from '@/helpers/animations';

export interface LoadingProps extends BoxProps {
  $iconWidth?: string;
  noIcon?: boolean;
  passKey?: string;
  text?: string;
}

const Loading = forwardRef(
  (
    {
      height,
      $iconWidth,
      noIcon,
      text,
      justify = 'center',
      align = 'center',
      passKey,
      ...rest
    }: LoadingProps,
    ref: any,
  ): JSX.Element => {
    return (
      <LoadingContainer
        ref={ref}
        justify={justify}
        align={align}
        height={height}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={staggerExitLoadingVariant}
        key={passKey}
        {...rest}
      >
        {!noIcon && (
          <BoxWrapper width="100%" justify="center" variants={loadingChild} key={`icon-${passKey}`}>
            <PotionIcon $iconWidth={$iconWidth} />
          </BoxWrapper>
        )}
        {text && (
          <BoxWrapper variants={loadingChild} key={`text-${passKey}`}>
            <Text>{text}</Text>
          </BoxWrapper>
        )}
      </LoadingContainer>
    );
  },
);

Loading.displayName = 'Loading';

export default Loading;
