import { makeHexLengthEven } from './makeHexLengthEven';
import { makeValueToByte } from './makeValueToByte';

export const convertToTwosComp = (s: string, l?: 2 | 4 | 8) => {
  s = makeHexLengthEven(s);
  const hexL = s.length;
  const hex = parseInt(s, 16);
  const maxHex = parseInt('ffffffff'.slice(0, l ?? hexL), 16);
  const twosC = (maxHex - hex + 1).toString(16).toUpperCase();
  return makeValueToByte(twosC, l ?? (hexL as 2 | 4 | 8));
};
