import {AsmFunction, InstructionStructure, ptrType} from './index';
import {length, operandType} from '../../functions/getTypes';
import {HashMap} from '../../helper/hashMap';
import {EightBitRegisters, SixteenBitRegisters, ThirtyTwoBitRegisters} from '../registers';
import {
    displacementOnlyRegex,
    firstCharacterAfterStar,
    regConstantOnly, regConstDisp, regDispRegex,
    registerOnlyRegex, regRegDispRegex, regRegOnlyRegex
} from '../regex';
import '../../helper/utils/string.extensions';
import {removeFalsy} from '../../helper/utils/object.extensions';
import {Table} from '32bit-adressing-table-modrm';
import {rotate} from '../../functions/rotate';
import {makeValueToByte} from '../../functions/makeValueToByte';

export interface OpCode {
    opCode: string;
    modRmByte?: string;
    length?: 'b' | 'd' | 'w';
}

const ADD_TABLE = new HashMap<InstructionStructure, OpCode>()
    .set({operation: 'add', operand1: 'al', operand2: 'imm8'}, {opCode: '04', length: 'b'})
    .set({operation: 'add', operand1: 'eax', operand2: 'imm32'}, {opCode: '05', length: 'd'})
    .set({operation: 'add', operand1: 'r8', operand2: 'imm8'}, {opCode: '80', modRmByte: '0', length: 'b'})
    .set({operation: 'add', operand1: 'm8', operand2: 'imm8'}, {opCode: '80', modRmByte: '0', length: 'b'})
    .set({operation: 'add', operand1: 'r32', operand2: 'imm32'}, {opCode: '81', modRmByte: '0', length: 'd'})
    .set({operation: 'add', operand1: 'm32', operand2: 'imm32'}, {opCode: '81', modRmByte: '0', length: 'd'})
    .set({operation: 'add', operand1: 'm32', operand2: 'imm8'}, {opCode: '83', modRmByte: '0', length: 'b'})
    .set({operation: 'add', operand1: 'r32', operand2: 'imm8'}, {opCode: '83', modRmByte: '0', length: 'b'})
    .set({operation: 'add', operand1: 'r8', operand2: 'r8'}, {opCode: '00'})
    .set({operation: 'add', operand1: 'm8', operand2: 'r8'}, {opCode: '00'})
    .set({operation: 'add', operand1: 'r32', operand2: 'r32'}, {opCode: '01'})
    .set({operation: 'add', operand1: 'm32', operand2: 'r32'}, {opCode: '01'})
    .set({operation: 'add', operand1: 'r8', operand2: 'm8'}, {opCode: '02'})
    .set({operation: 'add', operand1: 'r16', operand2: 'm16'}, {opCode: '03'})
    .set({operation: 'add', operand1: 'r32', operand2: 'm32'}, {opCode: '03'});

export const generateCode = (
    op1?: string,
    op2?: string,
    ins?: string,
    ptrType?: ptrType,
    err?: any[],
    table?: HashMap<InstructionStructure, OpCode>,
) => {
    let operand1: OperandType | undefined;
    let operand2: OperandType | undefined;
    let result;
    if (op1) {
        operand1 = getOperand(op1.toLowerCase());
    }
    if (op2) {
        operand2 = getOperand(op2.toLowerCase());
    }
    // get OpCode
    let opCode;
    // e.g add al, op2
    opCode = getOpCodeIfOp1IsRegister(operand1, table, ins, operand2);
    if (!opCode) { // general add op1, op2
        opCode = table?.get(removeFalsy({operation: ins, operand1: operand1?.type, operand2: operand2?.type}));
    }
    if (!opCode && operand2?.value) { // check all op2 = imm
        const op2Type = operand2.type.includes('32') ? operand2.type.replace('32', '8') : operand2.type.replace('8', '32');
        opCode = getOpCodeIfOp1IsRegister(operand1, table, ins, {...operand2, type: op2Type});
        if (!opCode) {
            opCode = table?.get(removeFalsy({operation: ins, operand1: operand1?.type, operand2: op2Type}));
        }
    }
    const [is16BitMode, is16BitAddressMode] = checkMode(operand1, operand2, ptrType);
    result = (is16BitAddressMode ? '66' : '') + (is16BitMode ? '66' : '') + opCode?.opCode;
    if (opCode?.modRmByte) {
        result += processRmByte(opCode.modRmByte, operand1!);
    }
    if (opCode?.length) {
        if (is16BitMode && opCode?.length === 'd') {
            result += processLength('w', operand2?.value!);
        } else {
            result += processLength(opCode.length, operand2?.value!);
        }
    }
    return result;
};
export const processLength = (l: 'b' | 'w' | 'd', val: string) => {
    const length = l === 'b' ? 2 : l === 'w' ? 4 : 8;
    return rotate(makeValueToByte(val, length));
};

export const getOpCodeIfOp1IsRegister = (operand, table, ins, operand2) => {
    if (operand.register) { // e.g add al, op2
        return table?.get(removeFalsy({operation: ins, operand1: operand.register, operand2: operand2?.type}));
    }
};
export const processOperand = (op?: OperandType) => {
    let operand: string;
    if (op?.constant) {
        operand = '[' + op!.register + '*' + op!.constant + ']';
    } else {
        if (op?.isMemory) {
            operand = '[' + op!.register + (op!.register2 ?? '') + ']' + convertDisplacement(op!.displacement);
        } else {
            operand = op?.register!;
        }
    }
    return op ? operand : undefined;
};

export const processRmByte = (modRmByte: string, op1: OperandType) => {
    const isSib = !!op1.constant;
    const operand1 = processOperand(op1);
    const tableResult = Table.getValueFromTable(modRmByte, isSib ? '[sib]' + convertDisplacement(op1.displacement) : operand1);
    return tableResult;
};

export const convertDisplacement = (disp?: string) => {
    if (!disp) {
        return '';
    }
    return '+disp' + length(disp, true);
};

export const checkMode = (op1?: OperandType, op2?: OperandType, ptrType?: ptrType) => {
    if (!op1 && !op2) {
        return [false, false];
    }
    let isAddressMode = ptrType === 'word';
    let is16bit = op1?.register && op1.is16Bit || op2?.register && op2.is16Bit;
    return [is16bit, isAddressMode];
};

export const ADD: AsmFunction = {
    generateMachineCode: (op1?: string, op2?: string, ptrType?: ptrType) => {
        return generateCode(op1, op2, 'add', ptrType, [1], ADD_TABLE);
    },
};
export type types = 'r32' | 'r8' | 'r16' | 'm32' | 'm8' | 'm16' | 'imm32' | 'imm8' | 'imm16';

export interface OperandType {
    type: types;
    isMemory?: boolean;
    register?: string;
    constant?: string;
    displacement?: string;
    register2?: string;
    is16Bit?: boolean;
    value?: string;
    isNegativeDisp?: boolean;
}

const processReg = (s: string): OperandType => {
    if (EightBitRegisters.has(s)) {
        return {type: 'm8', register: s, isMemory: true};
    }
    if (SixteenBitRegisters.has(s)) {
        return {type: 'm32', register: 'e' + s, is16Bit: true, isMemory: true};
    }
    if (ThirtyTwoBitRegisters.has(s)) {
        return {type: 'm32', register: s, isMemory: true};
    }
    throw Error('Unknown register!');
};

const processRegConst = (s: string): OperandType => {
    const [reg, constant] = s.split('*');
    if (ThirtyTwoBitRegisters.has(reg)) {
        return {type: 'm32', register: reg, constant: constant !== '1' ? constant : undefined, isMemory: true};
    }
    throw Error('Unknown register!');
};

const processRegReg = (s: string): OperandType => {
    const split = s.split('*');
    const constant = split[1];
    const [reg1, reg2] = split[0].split('+');
    if (SixteenBitRegisters.has(reg1) && SixteenBitRegisters.has(reg2)) {
        return {
            type: 'm32',
            register: 'e' + reg1,
            register2: 'e' + reg2,
            constant: constant !== '1' ? constant : undefined,
            is16Bit: true,
            isMemory: true
        };
    }
    if (ThirtyTwoBitRegisters.has(reg1) && ThirtyTwoBitRegisters.has(reg2)) {
        return {
            type: 'm32',
            register: reg1,
            register2: reg2,
            constant: constant !== '1' ? constant : undefined,
            isMemory: true
        };
    }
    throw Error('Invalid [reg+reg]!');
};

const processRegDisp = (s: string): OperandType => {
    const [reg, displacement] = s.split('+');
    if (EightBitRegisters.has(reg)) {
        return {type: 'm8', register: reg, displacement, isMemory: true};
    }
    if (SixteenBitRegisters.has(reg)) {
        return {type: 'm32', register: 'e' + reg, displacement, is16Bit: true, isMemory: true};
    }
    if (ThirtyTwoBitRegisters.has(reg)) {
        return {type: 'm32', register: reg, displacement, isMemory: true};
    }
    throw Error('Unknown register!');
};

const processRegRegDisp = (s: string): OperandType => {
    const [register1, register2, displacement] = s.split('+');
    const regReg = processRegReg(register1 + register2);
    return {...regReg, displacement: displacement, isMemory: true};
    throw Error('Unknown register!');
};

const processDisp = (s: string): OperandType => {
    const type = 'm' + length(s) as types;
    return {type: type === 'm16' ? 'm32' : type, displacement: s, is16Bit: type === 'm16', isMemory: true};
    throw Error('Unknown register!');
};

const processRegConstDisp = (s: string): OperandType => {
    const [register, displacement] = s.split('+');
    const regConst = processRegConst(register);
    return {...regConst, displacement};
    throw Error('Unknown register!');
};

export const getOperand = (op: string): OperandType => {
    if (EightBitRegisters.has(op)) {
        return {type: 'r8', register: op};
    }
    if (SixteenBitRegisters.has(op)) {
        return {type: 'r32', register: 'e' + op, is16Bit: true};
    }
    if (ThirtyTwoBitRegisters.has(op)) {
        return {type: 'r32', register: op};
    }
    if (op.includes('[')) {
        let opWithoutBrackets = op.removeBrackets();
        const isNegativeDisplacement = op.includes('-');
        let containsNegativeDisplacement = false;
        let is2sComplement8bit = false;
        if (isNegativeDisplacement) {
            // convert - to +
            opWithoutBrackets = opWithoutBrackets.replace('-', '+');
            if (opWithoutBrackets[0] === '+') {
                opWithoutBrackets = opWithoutBrackets.replace('+', '');
            }
            containsNegativeDisplacement = true;
        }
        switch (matchRegex(opWithoutBrackets)) {
            case 'reg': // [eax]
                return processReg(opWithoutBrackets);
            case 'disp': // [111]....
                return {...processDisp(opWithoutBrackets), isNegativeDisp: containsNegativeDisplacement};
            case 'reg*constant':
                return processRegConst(opWithoutBrackets);
            case 'reg+disp':
                return {...processRegDisp(opWithoutBrackets), isNegativeDisp: containsNegativeDisplacement};
            case 'reg+reg':
                return processRegReg(opWithoutBrackets);
            case 'reg+reg+disp':
                return {...processRegRegDisp(opWithoutBrackets), isNegativeDisp: containsNegativeDisplacement};
            case 'reg*constant+disp':
                return {...processRegConstDisp(opWithoutBrackets), isNegativeDisp: containsNegativeDisplacement};
        }
    }
    // must be imm
    const type = 'imm' + length(op) as types;
    return {type: type === 'imm16' ? 'imm32' : type, is16Bit: type === 'imm16', value: op};
};

export const matchRegex = (s: string): displacementTypes => {

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
    | 'reg'
    | 'reg+disp'
    | 'disp'
    | 'reg+reg'
    | 'reg+reg+disp'
    | 'reg*constant'
    | 'reg*constant+disp';
