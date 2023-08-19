export const classNames = (...classes) => {
  /**
   * Merge class names based on boolean operations
   * @param {string} classes Classes to join
   */
  return classes.filter(Boolean).join(" ");
};
