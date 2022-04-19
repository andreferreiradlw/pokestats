import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
// helpers
import { capitalize, hoverVariant } from '../../helpers'
// styles
import { Badge } from './StyledBadge'

export default function TypeBadge({ type, hideIcon, $iconOnly, ...rest }) {
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
      // if mounted, set icon state
      if (_isMounted.current) setIcon(importedIcon.default)
    }
    if (_isMounted.current) fetchSVG()
  }, [_isMounted])

  return (
    <Link as={`/type/${type}`} href="/type/[typeName]" passHref>
      <Badge
        type={type}
        $iconOnly={$iconOnly}
        whileHover="hover"
        whileTap="tap"
        variants={hoverVariant}
        {...rest}
      >
        {!hideIcon && type && Icon && Icon}
        {!$iconOnly && type && <span>{capitalize(type)}</span>}
      </Badge>
    </Link>
  )
}
