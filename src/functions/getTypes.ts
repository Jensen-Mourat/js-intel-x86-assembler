import {checkOp} from './checkOperand';
import {EightBitRegisters, SixteenBitRegisters, ThirtyTwoBitRegisters} from '../constants/registers';

export const getTypes = (op: string): operandType[] => {
    if (EightBitRegisters.has(op)) {
        return [op as operandType, 'r8', 'imm8'];
    }
    if (SixteenBitRegisters.has(op)) {
        return [op as operandType, 'r16', 'imm16'];
    }
    if (ThirtyTwoBitRegisters.has(op)) {
        return [op as operandType, 'r32', 'imm32'];;
    }
    if (op.includes('[')) {
        const withoutBrackets = op.replace('[', '').replace(']', '');
        if (EightBitRegisters.has(withoutBrackets)) {
            return ['m8'];
        }
        if (SixteenBitRegisters.has(withoutBrackets)) {
            return ['m16'];
        }
        if (ThirtyTwoBitRegisters.has(withoutBrackets)) {
            return ['m32'];
        }
        return [`m${length(withoutBrackets)}`as operandType] ;
    }
    return [`imm${length(op)}`as operandType];
};

const length = (s: string) => {
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
