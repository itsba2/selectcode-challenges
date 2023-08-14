export const arrayInArray = (searched, array) => {
  const a = JSON.stringify(array);
  const s = JSON.stringify(searched);

  if (a.indexOf(s) !== -1) return true;
};
