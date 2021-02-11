import React from 'react'
// components
import Box from '../../Box'
import TypeBadge from '../../TypeBadge'
// styles
import { JpnName } from '../../BaseStyles'

export default function TypeIcon({ typeName, otherNames, ...rest }) {
  return (
    <Box relative minHeight={{ xxs: '250px', lg: '350px' }} {...rest}>
      <TypeBadge
        type={typeName}
        key={`type-icon-${typeName}`}
        iconOnly
        fill
        float
        iconWidth="auto"
        iconHeight="150px"
      />
      <JpnName>
        {otherNames.find(name => name.language.name === 'ja-Hrkt').name}
      </JpnName>
    </Box>
  )
}
