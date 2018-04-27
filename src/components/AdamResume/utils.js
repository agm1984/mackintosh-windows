/**
 * Returns the first three letters of the current month.
 * @param {number} m Current month of the year, from 0 - 11
 */
const getConciseMonth = (m) => {
  if (m === undefined) {
    throw new Error('No month specified.')
  }
  const monthNames = [
    'Jan', 'Feb', 'Mar',
    'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep',
    'Oct', 'Nov', 'Dec',
  ]
  return monthNames[m]
}

export default getConciseMonth
