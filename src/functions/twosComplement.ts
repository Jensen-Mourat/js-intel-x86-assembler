import {makeHexLengthEven} from './makeHexLengthEven';
import {makeValueToByte} from './makeValueToByte';

export const convertToTwosComp = (s: string) => {
    s = makeHexLengthEven(s);
    const hexL = s.length;
    const hex = parseInt(s, 16);
    const maxHex = parseInt('ffffffff'.slice(0, hexL), 16);
    const twosC = (maxHex - hex + 1).toString(16).toUpperCase();
    return makeValueToByte(twosC, hexL as 2 | 4 | 8);
};
