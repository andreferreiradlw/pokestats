import { useState, useEffect, useRef } from 'react'
// helpers
import { capitalize } from '../../helpers/typography'
// styles
import { Badge } from './StyledBadge'

export default function TypeBadge({ type, hideIcon, iconOnly, ...rest }) {
  const [Icon, setIcon] = useState()
  // ref
  const _isMounted = useRef(null)
  // manage mounted state to avoid memory leaks
  useEffect(() => {
    _isMounted.current = true
    return () => {
      _isMounted.current = false
      setIcon(null)
    }
  }, [])

  useEffect(() => {
    async function fetchSVG() {
      const importedIcon = await import(`../../assets/svg/types/${type}.svg`)
      // console.log(importedIcon.default)
      if (_isMounted.current) setIcon(importedIcon.default)
    }
    if (_isMounted.current) fetchSVG()
  }, [_isMounted])

  return (
    <Badge
      direction="row"
      width="auto"
      grow={0}
      type={type}
      iconOnly={iconOnly}
      {...rest}
    >
      {!hideIcon && type && Icon && Icon}
      {!iconOnly && type && <span>{capitalize(type)}</span>}
    </Badge>
  )
}
