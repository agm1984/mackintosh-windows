/**
 * This utility function converts hours outputted from `new Date.getHours()`
 * to 12 hour clock.
 * @param {number} h Current hours of the day to be converted
 */
export const calcHours = (h) => {
  if (h === 0) return 12
  if (h > 12) return h - 12
  return h
}

/**
 * This utility function adds a zero onto the minutes outputted from
 * `new Date.getMinutes()` if the number is less than 10.
 * @param {number} m Current minutes of the hour to be converted
 */
export const calcMinutes = (m) => {
  if (m < 10) return `0${m}`
  return m
}

/**
 * This utility function places 'AM' or 'PM' after the time depending if
 * it is pre or post noon.
 * @param {number} h Current hours of the day
 */
export const calcAMPM = (h) => {
  if (h > 12) return ' PM'
  return ' AM'
}
