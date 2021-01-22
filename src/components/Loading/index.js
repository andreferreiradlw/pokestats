import { forwardRef } from 'react'
// styles
import { LoadingContainer, PotionIcon } from './StyledLoading'

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
        {!noIcon && <PotionIcon iconWidth={iconWidth} />}
        {text && text}
      </LoadingContainer>
    )
  }
)

Loading.displayName = 'Loading'

export default Loading
