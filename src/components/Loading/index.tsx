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
  $iconWidth?: string | Record<string, any>;
  noIcon?: boolean;
  passKey?: string;
  text?: string;
}

const Loading = forwardRef(
  (
    {
      flexheight,
      $iconWidth,
      noIcon,
      text,
      flexjustify = 'center',
      flexalign = 'center',
      passKey,
      ...rest
    }: LoadingProps,
    ref: any,
  ): JSX.Element => {
    return (
      <LoadingContainer
        ref={ref}
        flexjustify={flexjustify}
        flexalign={flexalign}
        flexheight={flexheight}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={staggerExitLoadingVariant}
        key={passKey}
        {...rest}
      >
        {!noIcon && (
          <BoxWrapper
            width="100%"
            flexjustify="center"
            variants={loadingChild}
            key={`icon-${passKey}`}
          >
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
