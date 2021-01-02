import { useState, useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'
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
  font-size: 1rem;
  font-weight: 600;
  border-radius: 4px;
  text-shadow: -0.5px -0.5px 0 #000, 0.5px -0.5px 0 #000, -0.5px 0.5px 0 #000,
    0.5px 0.5px 0 #000;

  ${({ iconOnly, margin }) =>
    iconOnly
      ? css`
          display: inline-flex;
          margin: ${margin || '0.1rem 0.4rem 0.1rem 0'};
          padding: 0.3rem;
        `
      : css`
          margin: ${margin || '0.5rem 0.5rem 0.5rem 0'};
          padding: 0.5rem;
        `}

  ${({ theme }) => css`
    @media ${theme.device.lg} {
      font-size: 1.2rem;
    }
  `}

  & svg {
    ${({ iconOnly }) =>
      !iconOnly
        ? css`
            width: 25px;
            height: 25px;
            margin-right: 1rem;
          `
        : css`
            width: 15px;
            height: 15px;
          `}

    & > path {
      fill: ${({ theme }) => theme.typeBadge.color};
      stroke: black;
      stroke-width: 5;
    }
  }
`

const generateIcon = type => {
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

export default function TypeBadge({ type, hideIcon, iconOnly, ...rest }) {
  return (
    <Badge
      direction="row"
      width="auto"
      grow={0}
      type={type}
      iconOnly={iconOnly}
      {...rest}
    >
      {!hideIcon && type && generateIcon(type)}
      {!iconOnly && type && <span>{capitalize(type)}</span>}
    </Badge>
  )
}
