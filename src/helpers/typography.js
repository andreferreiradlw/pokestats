// capitalise 1st letter of the string
export const capitalize = string =>
  string.charAt(0).toUpperCase() + string.slice(1)

export const humanize = string => {
  const frags = string.split('_')

  for (let i = 0; i < frags.length; i++) {
    frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1)
  }

  return frags.join(' ')
}
