export const classNames = (...classes) => {
  /**
   * Merge classNames based on boolean operations
   * @param {string} classes Classes to join
   */
  return classes.filter(Boolean).join(" ");
};
