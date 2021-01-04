// capitalise 1st letter of the string
export const capitalize = string =>
  string.charAt(0).toUpperCase() + string.slice(1)

export const removeUnderscore = string => {
  const words = string.split('_')

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1)
  }

  return words.join(' ')
}

export const removeDash = string => {
  const words = string.split('-')

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1)
  }

  return words.join(' ')
}
