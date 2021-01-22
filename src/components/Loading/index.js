import { forwardRef } from 'react'
// styles
import { LoadingContainer, PotionIcon, Text } from './StyledLoading'

const Loading = forwardRef(
  (
    {
      height,
      iconWidth,
      noIcon,
      text,
      justify = 'center',
      align = 'center',
      ...rest
    },
    ref
  ) => {
    return (
      <LoadingContainer
        noGutter
        ref={ref}
        justify={justify}
        align={align}
        height={height}
        {...rest}
      >
        {!noIcon && <PotionIcon iconwidth={iconWidth} />}
        {text && <Text>{text}</Text>}
      </LoadingContainer>
    )
  }
)

Loading.displayName = 'Loading'

export default Loading
