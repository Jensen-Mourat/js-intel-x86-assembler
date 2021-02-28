export const makeValueToByte = (v: string, byte: 2 | 4 | 8) => {
  if (v.length < byte) {
    for (let i = 0; v.length < byte; i++) {
      v = '0' + v;
    }
  }
  if (v.length > byte) {
    const diff = v.length - byte;
    v = v.slice(diff);
  }
  return v;
};
