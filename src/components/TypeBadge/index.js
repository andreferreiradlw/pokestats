import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
// helpers
import { capitalize } from '../../helpers/typography'
// components
import Box from '../Box'

// styles
const Badge = styled(Box)`
  background-color: ${({ theme, type }) =>
    theme.typeBadge.backgroundColor[type]};
  color: ${({ theme }) => theme.typeBadge.color};
  font-family: 'Quicksand', sans-serif;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 4px;

  & svg {
    width: 25px;
    height: 25px;
    margin-right: 1rem;

    & > path {
      fill: ${({ theme }) => theme.typeBadge.color};
    }
  }
`

const generateIcon = (type) => {
  const ImportedIconRef = useRef(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const importIcon = async () => {
      try {
        ImportedIconRef.current = (
          await import(`../../assets/svg/${type}.svg`)
        ).default
      } catch (err) {
        throw err
      } finally {
        setLoading(false)
      }
    }
    importIcon()
  }, [type])

  if (!loading && ImportedIconRef.current) {
    const { current: ImportedIcon } = ImportedIconRef
    return <ImportedIcon />
  }

  return null
}

export default function TypeBadge({ type, hideIcon, ...rest }) {
  return (
    <Badge
      direction="row"
      width="auto"
      grow={0}
      padding="0.5rem 1.5rem"
      margin="0 1rem 0 0"
      type={type}
      {...rest}
    >
      {!hideIcon && type && generateIcon(type)}
      <span>{capitalize(type)}</span>
    </Badge>
  )
}
