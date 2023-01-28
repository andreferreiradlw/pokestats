import { forwardRef } from 'react';
// types
import type { BoxProps } from '@/components/Box';
// styles
import { LoadingContainer, PotionIcon, PokeballIcon, RecordIcon, Text } from './StyledLoading';
// components
import BoxWrapper from '@/components/Box/StyledBox';
// helpers
import { staggerExitLoadingVariant, loadingChild } from '@/helpers/animations';

export interface LoadingProps extends BoxProps {
  $iconWidth?: string | Record<string, any>;
  noIcon?: boolean;
  passKey?: string;
  text?: string;
  icon?: 'potion' | 'pokeball' | 'record';
}

interface LoadingIconProps {
  width: LoadingProps['$iconWidth'];
  icon: LoadingProps['icon'];
}

const LoadingIcon = ({ width, icon }: LoadingIconProps): JSX.Element => {
  switch (icon) {
    case 'pokeball':
      return <PokeballIcon $iconWidth={width} />;
    case 'record':
      return <RecordIcon $iconWidth={width} />;
    default:
      return <PotionIcon $iconWidth={width} />;
  }
};

const Loading = forwardRef(
  (
    {
      flexheight,
      $iconWidth,
      noIcon,
      icon,
      text,
      flexjustify = 'center',
      flexalign = 'center',
      passKey,
      ...rest
    }: LoadingProps,
    ref: any,
  ): JSX.Element => (
    <LoadingContainer
      ref={ref}
      flexjustify={flexjustify}
      flexalign={flexalign}
      flexheight={flexheight}
      flexgap="1em"
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
          <LoadingIcon width={$iconWidth} icon={icon} />
        </BoxWrapper>
      )}
      {text && (
        <BoxWrapper variants={loadingChild} key={`text-${passKey}`}>
          <Text>{text}</Text>
        </BoxWrapper>
      )}
    </LoadingContainer>
  ),
);

Loading.displayName = 'Loading';

export default Loading;
