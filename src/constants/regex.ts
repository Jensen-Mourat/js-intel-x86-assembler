import {EightBitRegisters, SixteenBitRegisters, ThirtyTwoBitRegisters} from './registers';

export const everythingAfterSlashRegex = new RegExp(/\/(.*)/);
export const firstCharacterAfterStar = new RegExp(/\*(\d)/);

//for type
const constants = new RegExp('[1248]');
const registerRegex = new RegExp('(' + [...Array.from(EightBitRegisters), ...Array.from(SixteenBitRegisters), ...Array.from(ThirtyTwoBitRegisters)].join('|') + ')');
export const registerOnlyRegex = new RegExp('^(' + registerRegex.source + ')$');
const hexadecimalRegex = new RegExp('[0-9A-Fa-f]');
const optionalMultByConstantRegex = new RegExp('(\\\*' + constants.source + ')?');
const displacementRegex = new RegExp(hexadecimalRegex.source + '{1,8}');
export const displacementOnlyRegex = new RegExp('^(' + displacementRegex.source + ')$');
export const regDispRegex = new RegExp('^(' + registerRegex.source + '\\\+' + displacementRegex.source + ')$');
const regRegRegex = new RegExp(registerRegex.source + '\\\+' + registerRegex.source + optionalMultByConstantRegex.source);
export const regRegOnlyRegex = new RegExp('^(' + registerRegex.source + '\\\+' + registerRegex.source + optionalMultByConstantRegex.source + ')$');
export const regRegDispRegex = new RegExp('^(' + regRegRegex.source + '\\\+' + displacementRegex.source + ')$');
const regConstant = new RegExp(registerRegex.source + '\\\*' + constants.source);
export const regConstantOnly = new RegExp('^(' + regConstant.source + ')$');
export const regConstDisp = new RegExp('^(' + regConstant.source + '\\\+' + displacementRegex.source + ')$');
