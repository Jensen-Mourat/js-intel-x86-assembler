export const makeHexLengthEven = (s: string) => {
  if (s.length % 2 !== 0) {
    return 0 + s;
  }
  return s;
};
