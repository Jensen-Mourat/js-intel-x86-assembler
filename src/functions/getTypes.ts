import {EightBitRegisters, SixteenBitRegisters, ThirtyTwoBitRegisters} from '../constants/registers';
import {
    displacementOnlyRegex,
    firstCharacterAfterStar, regConstant,
    regDispRegex,
    registerOnlyRegex,
    regRegDispRegex,
    regRegOnlyRegex,
} from '../constants/regex';

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
        const withoutBrackets = op.replace('[', '').replace(']', '');
        switch (matchRegex(withoutBrackets)) {
            case 'reg':
                return getMemoryType(withoutBrackets)!;
            case 'disp':
                return [`m${length(withoutBrackets)}`, `disp32`] as operandType [];
            case 'reg*constant':
                const c = withoutBrackets.match(firstCharacterAfterStar);
                const r = withoutBrackets.split('*')[0];
                return [...getMemoryType(r)!, '[sib]', '[*]', `[${r + (c ? '*' + c[1] : '')}]`, 'reg*constant'] as operandType[];
            case 'reg+disp':
                const [reg, disp] = withoutBrackets.split('+');
                const checkBase = getMemoryType(reg)!;
                const dispLength = length(disp);
                return [...checkBase, `[${reg}]+disp${dispLength === '16' && !checkBase.includes('mr16') ? '32' : dispLength}`] as operandType[];
            case 'reg+reg':
                const constant = withoutBrackets.match(firstCharacterAfterStar);
                const [reg1, reg2] = withoutBrackets.split('*')[0].split('+');
                return ['[sib]', `[${reg1}]`, `[${reg2 + (constant ? '*' + constant[1] : '')}]`, 'reg+reg'] as operandType[];
            case 'reg+reg+disp':
                const cons = withoutBrackets.match(firstCharacterAfterStar);
                withoutBrackets.replace(firstCharacterAfterStar, '');
                const [r1, r2, d] = withoutBrackets.split('+');
                const l = length(d);
                return ['[sib]+disp' + (l === '16' ? '32' : l), `[${r1}]`, `[${r2 + (cons ? '*' + cons[1] : '')}]`] as operandType[];
        }
    }
    return [`imm${length(op)}` as operandType];
};

export const matchRegex = (s: string): displacementTypes => {
    // console.log(regRegOnlyRegex.source)
    if (registerOnlyRegex.test(s)) {
        return 'reg';
    }
    if (displacementOnlyRegex.test(s)) {
        return 'disp';
    }
    if (regConstant.test(s)) {
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
    | displacementTypes


