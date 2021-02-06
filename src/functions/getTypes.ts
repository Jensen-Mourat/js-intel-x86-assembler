import {checkOp} from './checkOperand';
import {EightBitRegisters, SixteenBitRegisters, ThirtyTwoBitRegisters} from '../constants/registers';

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
        const isMemoryType = getMemoryType(withoutBrackets);
        if (isMemoryType) {
            return isMemoryType;
        }
        if (withoutBrackets.includes('+')) {
            const [base, disp] = withoutBrackets.split('+');
            const checkBase = getMemoryType(base)!;
            const dispLength = length(disp);
            return [...checkBase, `[${base}]+disp${dispLength === '16' ? '32' : dispLength}`] as operandType[];
        }
        return [`m${length(withoutBrackets)}`, `disp32`] as operandType [];
    }
    return [`imm${length(op)}` as operandType];
};

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
    if (s.length <= 8) {
        return '32';
    }
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
