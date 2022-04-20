import React from 'react'
// components
import Box from '../../Box'
import TypeBadge from '../../TypeBadge'
// styles
import { JpnName } from '../../BaseStyles'

export default function TypeIcon({ typeName, otherNames, ...rest }) {
  const japanName = otherNames.find(name => name.language.name === 'ja-Hrkt')
    .name

  return (
    <Box relative minHeight={{ xxs: '250px', lg: '350px' }} {...rest}>
      <TypeBadge
        type={typeName}
        key={`type-icon-${typeName}`}
        $iconOnly
        fill="true"
        $float
        $iconWidth="auto"
        $iconHeight="150px"
      />
      {japanName && <JpnName>{japanName}</JpnName>}
    </Box>
  )
}
