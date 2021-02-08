import {EightBitRegisters, SixteenBitRegisters, ThirtyTwoBitRegisters} from '../constants/registers';
import {
    displacementOnlyRegex,
    firstCharacterAfterStar, regConstantOnly, regConstDisp,
    regDispRegex,
    registerOnlyRegex,
    regRegDispRegex,
    regRegOnlyRegex,
} from '../constants/regex';
import {TwosComplementBuffer} from 'twos-complement-buffer';
import {makeValueToByte} from '../constants/AsmFunctions/ADD';

export const getTypes = (op: string): operandType[] => {
    if (EightBitRegisters.has(op)) {
        return [op as operandType, 'r8'];
    }
    if (SixteenBitRegisters.has(op)) {
        return [op as operandType, 'r16'];
    }
    if (ThirtyTwoBitRegisters.has(op)) {
        return [op as operandType, 'r32'];
    }
    if (op.includes('[')) {
        let withoutBrackets = op.replace('[', '').replace(']', '');
        const isNegativeDisplacement = op.includes('-');
        const containsNegativeDisplacement = [];
        let is2s8bit = false;
        if (isNegativeDisplacement) {
            withoutBrackets = withoutBrackets.replace('-', '+');
            if (withoutBrackets[0] === '+') {
                withoutBrackets = withoutBrackets.replace('+', '');
            }
            containsNegativeDisplacement.push('neg');
        }
        switch (matchRegex(withoutBrackets)) {
            case 'reg':
                return getMemoryType(withoutBrackets)!;
            case 'disp':
                return [...containsNegativeDisplacement, `m${length(withoutBrackets)}`, `disp32`] as operandType [];
            case 'reg*constant':
                const c = withoutBrackets.match(firstCharacterAfterStar);
                const r = withoutBrackets.split('*')[0];
                return [...containsNegativeDisplacement, ...getMemoryType(r)!, '[sib]', '[*]', `[${r + (c ? '*' + c[1] : '')}]`, 'reg*constant'] as operandType[];
            case 'reg+disp':
                const [reg, disp] = withoutBrackets.split('+');
                const hex = parseInt(disp, 16);
                if (!hex) { // check if disp === 0
                    return ['zero', ...containsNegativeDisplacement, ...getTypes(`[${reg}]`)] as operandType[];
                }
                const dispLength = length(disp);
                if (dispLength === '8') { // check is 2s complement present for 8 bit disp
                    if (isNegativeDisplacement) {
                        if (hex > parseInt('80', 16)) {
                            is2s8bit = true;
                        }
                    } else {
                        if (hex > parseInt('7f', 16)) {
                            is2s8bit = true;
                        }
                    }
                }
                const checkBase = getMemoryType(reg)!;
                let dispString;
                if (checkBase.includes('mr16')) {
                    dispString = `[${reg}]+disp${dispLength === '32' ? '16' : is2s8bit ? '32' : dispLength}`;
                } else {
                    dispString = `[${reg}]+disp${dispLength === '16' ? '32' : is2s8bit ? '32' : dispLength}`;
                }
                return [...containsNegativeDisplacement, ...checkBase, dispString] as operandType[];
            case 'reg+reg':
                const constant = withoutBrackets.match(firstCharacterAfterStar);
                const [reg1, reg2] = withoutBrackets.split('*')[0].split('+');
                const reg1Type = getMemoryType(reg1);
                let retArr = [...containsNegativeDisplacement, ...reg1Type!, '[sib]', `[${reg1}]`, `[${reg2 + (constant ? '*' + constant[1] : '')}]`, 'reg+reg'] as operandType[];
                if (reg1Type?.includes('mr16')) {
                    retArr = retArr.filter(s => s !== '[sib]');
                }
                return retArr;
            case 'reg+reg+disp':
                const [r1, r2, d] = withoutBrackets.split('+');
                const h = parseInt(d, 16);
                if (!h) { // check if d === 0
                    return ['zero', ...containsNegativeDisplacement, ...getTypes(`[${r1}+${r2}]`)] as operandType[];
                }
                const l = length(d);
                if (l === '8') { // check is 2s complement present for 8 bit disp
                    if (isNegativeDisplacement) {
                        if (h > parseInt('80', 16)) {
                            is2s8bit = true;
                        }
                    } else {
                        if (h > parseInt('7f', 16)) {
                            is2s8bit = true;
                        }
                    }
                }
                const t = getMemoryType(r1);
                const tempArr = [];
                if (t?.includes('mr16')) { //change sib and length for mr16
                    tempArr.push(`[${r1}+${r2}]+disp` + (l === '32' ? '16' : is2s8bit ? '32' : l));
                } else {
                    tempArr.push('[sib]+disp' + (l === '16' ? '32' : is2s8bit ? '32' : l));
                }
                return [...containsNegativeDisplacement, ...t!, ...tempArr, `[${r1}]`, `[${r2}]`, 'reg+reg+disp'] as operandType[];
            case 'reg*constant+disp':
                const [s, val] = withoutBrackets.split('+');
                const hexVal = parseInt(val, 16);
                const types = getTypes(`[${s}]`);
                if (!hexVal) { // check if d === 0
                    return ['zero', ...containsNegativeDisplacement, ...types] as operandType[];
                }
                return [...containsNegativeDisplacement, ...types.filter(o => o !== 'reg*constant'), 'disp32'] as operandType[];
        }
    }
    return [`imm${length(op)}` as operandType];
};

export const convertToTwosComp = (s: string) => {
    s = makeHexLengthEven(s);
    const hexL = s.length;
    const hex = parseInt(s, 16);
    const maxHex = parseInt('ffffffff'.slice(0, hexL), 16);
    const twosC = (maxHex - hex + 1).toString(16).toUpperCase();
    return makeValueToByte(twosC, hexL as 2 | 4 | 8);
};

const makeHexLengthEven = (s: string) => {
    if (s.length % 2 !== 0) {
        return 0 + s;
    }
    return s;
};

export const matchRegex = (s: string): displacementTypes => {
    // console.log(regRegOnlyRegex.source)
    if (registerOnlyRegex.test(s)) {
        return 'reg';
    }
    if (displacementOnlyRegex.test(s)) {
        return 'disp';
    }
    if (regConstantOnly.test(s)) {
        return 'reg*constant';
    }
    if (regDispRegex.test(s)) {
        return 'reg+disp';
    }
    if (regRegOnlyRegex.test(s)) {
        return 'reg+reg';
    }
    if (regRegDispRegex.test(s)) {
        return 'reg+reg+disp';
    }
    if (regConstDisp.test(s)) {
        return 'reg*constant+disp';
    }
    throw new Error('Invalid operand!');
};

export type displacementTypes =
    'reg'
    | 'reg+disp'
    | 'disp'
    | 'reg+reg'
    | 'reg+reg+disp'
    | 'reg*constant'
    | 'reg*constant+disp'

const getMemoryType = (s: string): operandType[] | undefined => {
    if (EightBitRegisters.has(s)) {
        return ['m8', 'mr8'];
    }
    if (SixteenBitRegisters.has(s)) {
        return ['m16', 'mr16'];
    }
    if (ThirtyTwoBitRegisters.has(s)) {
        return ['m32', 'mr32'];
    }
    return undefined;
};


export const length = (s: string) => {
    if (s.length <= 2) {
        return '8';
    }
    if (s.length <= 4) {
        return '16';
    }
    return '32';
};
export type operandType =
    'eax'
    | 'ebx'
    | 'ecx'
    | 'edx'
    | 'esp'
    | 'ebp'
    | 'esi'
    | 'edi'
    | 'ax'
    | 'bx'
    | 'cx'
    | 'dx'
    | 'sp'
    | 'bp'
    | 'si'
    | 'di'
    | 'al'
    | 'bl'
    | 'cl'
    | 'dl'
    | 'ah'
    | 'bh'
    | 'ch'
    | 'dh'
    | 'r8'
    | 'r16'
    | 'r32'
    | 'm8'
    | 'm16'
    | 'm32'
    | 'imm8'
    | 'imm16'
    | 'imm32'
    | 'mr8'
    | 'mr16'
    | 'mr32'
    | 'disp32'
    | '[sib]'
    | '[eax]+disp8'
    | '[ecx]+disp8'
    | '[edx]+disp8'
    | '[ebx]+disp8'
    | '[sib]+disp8'
    | '[ebp]+disp8'
    | '[esi]+disp8'
    | '[edi]+disp8'
    | '[eax]+disp32'
    | '[ecx]+disp32'
    | '[edx]+disp32'
    | '[ebx]+disp32'
    | '[sib]+disp32'
    | '[ebp]+disp32'
    | '[esi]+disp32'
    | '[edi]+disp32'
    | '[eax]'
    | '[ecx]'
    | '[edx]'
    | '[ebx]'
    | '[ebp]'
    | '[esi]'
    | '[edi]'
    | '[eax*2]'
    | '[ecx*2]'
    | '[edx*2]'
    | '[ebx*2]'
    | '[ebp*2]'
    | '[esi*2]'
    | '[edi*2]'
    | '[eax*4]'
    | '[ecx*4]'
    | '[edx*4]'
    | '[ebx*4]'
    | '[ebp*4]'
    | '[esi*4]'
    | '[edi*4]'
    | '[eax*8]'
    | '[ecx*8]'
    | '[edx*8]'
    | '[ebx*8]'
    | '[ebp*8]'
    | '[esi*8]'
    | '[edi*8]'
    | 'none'
    | 'neg'
    | 'zero'
    | displacementTypes


