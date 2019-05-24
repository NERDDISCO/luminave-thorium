/**
 * Convert any number into a number with fixed precision
 * @param {Number} number - The number that should have fixed precision
 * @param {*} precision - The precision to convert to
 * @param {*} base - The base (default is 10)
 */
export const toFixedNumber = (number, precision, base = 10) => {
  var pow = Math.pow(base, precision)
  return Math.round(number * pow) / pow
}
