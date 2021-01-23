import { useState, useEffect } from 'react'
// helpers
import { capitalize } from '../../helpers/typography'
// styles
import { Badge } from './StyledBadge'

export default function TypeBadge({ type, hideIcon, iconOnly, ...rest }) {
  const [icon, setIcon] = useState()

  useEffect(() => {
    async function fetchSVG() {
      const importedIcon = await import(`../../assets/svg/types/${type}.svg`)
      setIcon(importedIcon.default)
    }
    fetchSVG()
  }, [])

  return (
    <Badge
      direction="row"
      width="auto"
      grow={0}
      type={type}
      iconOnly={iconOnly}
      {...rest}
    >
      {!hideIcon && type && icon && icon}
      {!iconOnly && type && <span>{capitalize(type)}</span>}
    </Badge>
  )
}
