export const arrayInArray = (searched, array) => {
  /**
   * Checks if a `searched` array is in `array`
   * @param {array} searched The array user is search
   * @param {array} array The array that includes (or not) the `searched` array
   */

  // json stringify the inputs
  const a = JSON.stringify(array);
  const s = JSON.stringify(searched);

  // return true if `searched` in `array`
  if (a.indexOf(s) !== -1) return true;
};
