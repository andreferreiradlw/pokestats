import { forwardRef } from 'react'
import { motion } from 'framer-motion'
// styles
import { LoadingContainer, PotionIcon, Text } from './StyledLoading'
// helpers
import { staggerExitVariant, loadingChild } from '../../helpers/animations'

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
        noGutter
        ref={ref}
        justify={justify}
        align={align}
        height={height}
        variants={staggerExitVariant}
        initial="initial"
        animate="animate"
        exit="exit"
        key={passKey}
        {...rest}
      >
        {!noIcon && (
          <motion.div variants={loadingChild} key={`icon-${passKey}`}>
            <PotionIcon iconwidth={iconWidth} />
          </motion.div>
        )}
        {text && (
          <motion.div variants={loadingChild} key={`text-${passKey}`}>
            <Text>{text}</Text>
          </motion.div>
        )}
      </LoadingContainer>
    )
  }
)

Loading.displayName = 'Loading'

export default Loading
