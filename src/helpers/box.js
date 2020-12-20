import { css } from 'styled-components'
// config
import { dimensions, breakpoints } from '../components/Box/config'

/**
 * Creates the media-query syntax with the provided content inside.
 * @param {number} breakpoint The rem value for min-width. These should come from ../constants
 * @param {string} content Styles content to go inside the media-query.
 * @returns {string[]} The media-query syntax with styles content.
 */
export const breakpointStyle = (breakpoint, content) => css`
  @media only screen ${breakpoint && `and (min-width: ${breakpoint}rem)`} {
    ${content}
  }
`

/**
 * Creates the multiple media-query syntax with the specified css property inside.
 * @param {string} property CSS property to be applied.
 * @param {string|Object} values Property values to be applied to the multiple breakpoints.
 * @returns {string[]} The styles for the multiples breakpoints.
 */
export const responsiveProps = (property, values) => {
  if (!values) throw new Error('No values provided for responsive props!')
  if (typeof values === 'string') {
    // same values for all screen sizes
    return property ? `${property}: ${values};` : `${values}`
  } else if (typeof values === 'object') {
    return dimensions.map((d) => {
      if (breakpoints[d] && values[d] !== undefined) {
        return css`
          ${breakpointStyle(
            breakpoints[d],
            property ? `${property}: ${values[d]};` : `${values[d]}`
          )}
        `
      }
    })
  } else {
    return undefined
  }
}

/**
 * Converts the sizes prop to flex-basis that defines the width of the element inside a flex container.
 * To be used in the Column component.
 * @param {number|string|Object} sizeProp The sizes prop.
 * @returns {string[]} Returns the flex-basis styles for the multiple breakpoints.
 */
export const flexStyle = (sizeProp) => {
  if (typeof sizeProp === 'number') {
    return css`
      flex-basis: ${(sizeProp / 12) * 100}%;
    `
  } else if (sizeProp === 'auto') {
    return css`
      flex-basis: auto;
      flex-grow: 0;
    `
  } else {
    return dimensions.map((d) => {
      if (breakpoints[d] && sizeProp[d] && sizeProp[d] !== 'auto') {
        return css`
          ${breakpointStyle(
            breakpoints[d],
            `flex-basis: ${(sizeProp[d] / 12) * 100}%;`
          )}
        `
      } else if (breakpoints[d] && sizeProp[d] === 'auto') {
        return css`
          ${breakpointStyle(breakpoints[d], `flex-basis: auto; flex-grow: 1;`)}
        `
      }
    })
  }
}
