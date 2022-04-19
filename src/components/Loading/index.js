import { forwardRef } from 'react'
// styles
import { LoadingContainer, PotionIcon, Text } from './StyledLoading'
import BoxWrapper from '../Box/StyledBox'
// helpers
import {
  staggerExitLoadingVariant,
  loadingChild,
} from '../../helpers/animations'

const Loading = forwardRef(
  (
    {
      height,
      iconWidth,
      noIcon,
      text,
      justify = 'center',
      align = 'center',
      passKey,
      ...rest
    },
    ref
  ) => {
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
          <BoxWrapper
            width="100%"
            justify="center"
            variants={loadingChild}
            key={`icon-${passKey}`}
          >
            <PotionIcon iconwidth={iconWidth} />
          </BoxWrapper>
        )}
        {text && (
          <BoxWrapper variants={loadingChild} key={`text-${passKey}`}>
            <Text>{text}</Text>
          </BoxWrapper>
        )}
      </LoadingContainer>
    )
  }
)

Loading.displayName = 'Loading'

export default Loading
