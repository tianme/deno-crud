export const isNumber = (str: string) => {
  const number = +str
  return !Number.isNaN(number)
}

export const convertToNumber = (str: string): number | null => {
  return isNumber(str) ? +str : null
}