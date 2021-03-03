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
import {makeHexLengthEven} from '../../functions/makeHexLengthEven';
import {convertToTwosComp} from '../../functions/twosComplement';

export interface OpCode {
    opCode: string;
    modRmByte?: string;
    length?: 'b' | 'd' | 'w';
    isSigned?: boolean;
}

const ADD_TABLE = new HashMap<InstructionStructure, OpCode>()
    .set({operation: 'add', operand1: 'al', operand2: 'imm8'}, {opCode: '04', length: 'b'})
    .set({operation: 'add', operand1: 'eax', operand2: 'imm32'}, {opCode: '05', length: 'd'})
    .set({operation: 'add', operand1: 'r8', operand2: 'imm8'}, {opCode: '80', modRmByte: '0', length: 'b'})
    .set({operation: 'add', operand1: 'm8', operand2: 'imm8'}, {opCode: '80', modRmByte: '0', length: 'b'})
    .set({operation: 'add', operand1: 'r32', operand2: 'imm32'}, {opCode: '81', modRmByte: '0', length: 'd'})
    .set({operation: 'add', operand1: 'm32', operand2: 'imm32'}, {opCode: '81', modRmByte: '0', length: 'd'})
    .set({operation: 'add', operand1: 'm32', operand2: 'imm8'}, {
        opCode: '83',
        modRmByte: '0',
        length: 'b',
        isSigned: true
    })
    .set({operation: 'add', operand1: 'r32', operand2: 'imm8'}, {
        opCode: '83',
        modRmByte: '0',
        length: 'b',
        isSigned: true
    })
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
        operand1 = getOperand(op1.toLowerCase(), ptrType);
    }
    if (op2) {
        operand2 = getOperand(op2.toLowerCase(), ptrType);
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

    if (!opCode && operand1?.register && operand2?.isMemory) { //catches the case  r32 m8
        opCode = table?.get(removeFalsy({operation: ins, operand1: operand1?.type, operand2: 'm32'}));
    }
    if (opCode.isSigned && operand2) { // convert false signed opcode to correct one
        if (operand2.type === 'imm8') {
            const val = parseInt(operand2.value!, 16);
            if (val >= parseInt('80', 16)) {
                opCode = table?.get(removeFalsy({operation: ins, operand1: operand1?.type, operand2: 'imm32'}));
            }
        }
    }
    const [is16BitMode, is16BitAddressMode] = checkMode(operand1, operand2, ptrType);
    result = (is16BitAddressMode ? '67' : '') + (is16BitMode ? '66' : '') + opCode?.opCode;
    if (opCode?.modRmByte) { // check rmByte
        result += processRmByte(opCode.modRmByte, operand1!);
    }
    if (opCode?.length) { // if opcode hase fixed length
        if (is16BitMode && opCode?.length === 'd') {
            result += processLength(operand2?.value!, 'w');
        } else {
            result += processLength(operand2?.value!, opCode.length);
        }
    } else {
        //check register, register
        if (operand1?.isRegisterOnly && operand2?.isRegisterOnly) { // both are registers
            if (operand1?.type !== operand2?.type || operand1?.is16Bit !== operand2.is16Bit) {
                throw new Error('Invalid operand size!');
            }
            result += getValFromTable(operand1.register!, operand2.register!);
        } else { // check register, memory
            if (operand1?.isRegisterOnly) {
                if (operand2?.isDisplacementOnly) { //[111]
                    result += getValFromTable(processOperand(operand1)!, 'disp32');
                    result += processLength(operand2.displacement!, 'd');
                } else {
                    if (operand2?.isAddressMode) { //[ax]
                        result = processRegMem(operand1, operand2, result, true);
                    } else { // [eax*1]
                        if (operand2?.constant) { // [eax*2]
                            if (operand2?.register2) { // [eax+eax*1]
                                result = processRegisterMemConst(operand1, operand2, result, operand2?.register2);
                            } else {
                                result = processRegisterMemConst(operand1, operand2, result);
                            }
                        } else {
                            result = processRegMem(operand1, operand2, result);
                        }

                    }
                }

            } else {
                result += getValFromTable(processOperand(operand1)!, processOperand(operand2));
            }
        }
    }
    return result.toUpperCase();
};
const getValFromTable = (operand1, operand2, type?) => {
    const val = Table.getValueFromTable(operand1, operand2, type);
    if (val) {
        return val;
    }
    throw new Error('Invalid operand');
};

const processRegisterMemConst = (operand1, operand2, result, register2?) => {
    const temp = processOperand(operand2);
    const sib = '[sib]' + (operand2.displacement && register2 ? convertDisplacement(operand2.displacement) : '');
    result += getValFromTable(processOperand(operand1)!, sib);
    result += getValFromTable(register2 ? operand2.register : '[*]', register2 ? `[${register2}*${operand2.constant}]` : temp, '32sib');
    if (!register2) {
        if (operand2.displacement) {
            result += rotate(makeValueToByte(operand2.displacement, 8));
        } else {
            result += makeValueToByte('', 8);
        }
    } else {
        if (operand2.displacement) {
            result += rotate(makeValueToByte(operand2.displacement, sib.includes('32') ? 8 : 2));
        }
    }
    return result;
};
const processRegMem = (operand1, operand2, result, is16bit?: boolean) => {
    let temp = processOperand(operand2, is16bit);
    if (is16bit) {
        temp = temp?.replace('32', '16')!;
    }
    result += getValFromTable(processOperand(operand1)!, temp, is16bit ? '16rm' : '32rm');
    if (operand2.displacement) {
        let disp;
        if (is16bit) {
            disp = Array.from(rotate(makeHexLengthEven(operand2.displacement))).filter((_, index) => index < (temp?.includes('8') ? 2 : 4)).toString().replace(/,/g, '');
        } else {
            disp = rotate(makeValueToByte(operand2.displacement, temp?.includes('32') ? 8 : 2));
        }
        return result + disp;
    }
    return result;
};
export const processLength = (val: string, l: 'b' | 'w' | 'd') => {
    const length = l === 'b' ? 2 : l === 'w' ? 4 : 8;
    return rotate(makeValueToByte(val, length));
};

export const getOpCodeIfOp1IsRegister = (operand, table, ins, operand2) => {
    if (operand.register && !operand.isMemory) { // e.g add al, op2
        const t = table?.get(removeFalsy({operation: ins, operand1: operand.register, operand2: operand2?.type}));
        if (t) {
            return t;
        }
    }
    if (operand2.isDisplacementOnly) { // find possible displacement
        const opCode;
        ['8', '32'].forEach(m => {
            const t = table?.get(removeFalsy({
                    operation: ins,
                    operand1: operand.type,
                    operand2: 'm' + m
                })
            );
            if (t) {
                opCode = t;
            }
        });
        return opCode;
    }

};
export const processOperand = (op?: OperandType, ignore16?: boolean) => {
    let operand: string;
    if (op?.constant) {
        operand = '[' + op!.register + (op!.constant !== '1' ? '*' + op!.constant : '') + ']';
    } else {
        if (op?.isMemory) {
            operand = '[' + op!.register + (op!.register2 ? '+' + op!.register2 : '') + ']' + convertDisplacement(op!.displacement, ignore16);
        } else {
            operand = op?.register!;
        }
    }
    return op ? operand : undefined;
};

export const processRmByte = (modRmByte: string, op1: OperandType) => {
    const isSib = !!op1.constant;
    const operand1 = processOperand(op1);
    const tableResult = Table.getValueFromTable(modRmByte, isSib ? '[sib]' + convertDisplacement(op1.displacement)! : operand1!);
    return tableResult;
};

export const convertDisplacement = (disp?: string, ignore16?: boolean) => {
    if (!disp) {
        return '';
    }
    return '+disp' + length(disp, ignore16 !== undefined ? ignore16 : true);
};

export const checkMode = (op1?: OperandType, op2?: OperandType, ptrType?: ptrType) => {
    if (!op1 && !op2) {
        return [false, false];
    }
    const isAddressMode = op2?.isAddressMode || op1?.isAddressMode;
    const is16bit = ptrType === 'word' || op1?.register && op1.is16Bit;
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
    isDisplacementOnly?: boolean;
    isRegisterOnly?: boolean;
    register?: string;
    constant?: string;
    displacement?: string;
    register2?: string;
    is16Bit?: boolean;
    isAddressMode?: boolean;
    value?: string;
    isNegativeDisp?: boolean;
}

const processReg = (s: string, ptr?: ptrType): OperandType => {
    if (EightBitRegisters.has(s)) {
        return {type: !ptr ? 'm8' : 'm' + processPtr(ptr) as types, register: s, isMemory: true};
    }
    if (SixteenBitRegisters.has(s)) {
        return {
            type: !ptr ? 'm8' : 'm' + processPtr(ptr) as types,
            register: s,
            is16Bit: true,
            isMemory: true,
            isAddressMode: true
        };
    }
    if (ThirtyTwoBitRegisters.has(s)) {
        return {type: !ptr ? 'm8' : 'm' + processPtr(ptr) as types, register: s, isMemory: true};
    }
    throw Error('Unknown register!');
};

const processRegConst = (s: string, ptr?: ptrType): OperandType => {
    const [reg, constant] = s.split('*');
    if (ThirtyTwoBitRegisters.has(reg)) {
        const c = constant ?? '1';
        return {type: !ptr ? 'm32' : 'm' + processPtr(ptr) as types, register: reg, constant: c, isMemory: true};
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
            register: reg1,
            register2: reg2,
            is16Bit: true,
            isAddressMode: true,
            isMemory: true
        };
    }
    if (ThirtyTwoBitRegisters.has(reg1) && ThirtyTwoBitRegisters.has(reg2)) {
        return {
            type: 'm32',
            register: reg1,
            register2: reg2,
            constant: constant ?? '1',
            isMemory: true
        };
    }
    throw Error('Invalid [reg+reg]!');
};
const processNegDisplacement = (d: string, containsNegDisp?: boolean, makeToByte?: boolean): string | undefined => {
    const dispHex = parseInt(d, 16);
    if (d.length <= 2) { // ie one byte
        // check is 2s complement present for 8 bit disp
        if (containsNegDisp) {
            if (dispHex > parseInt('80', 16)) {
                d = convertToTwosComp(makeValueToByte(d, 8));
            } else {
                d = convertToTwosComp(makeToByte ? makeValueToByte(d, 8) : d);
            }
        } else {
            if (dispHex > parseInt('7f', 16)) {
                d = makeValueToByte(d, 8);
            } else {
                d = makeHexLengthEven(d);
            }
        }
    } else {
        if (containsNegDisp) {
            d = convertToTwosComp(makeValueToByte(d, 8));
        }
    }
    if (parseInt(d, 16) === 0) {
        d = undefined;
    }
    return d;
};

const processRegDisp = (s: string, ptr: ptrType, containsNegDisp?: boolean): OperandType => {
    let [reg, displacement] = s.split('+');
    displacement = displacement.toUpperCase();
    displacement = processNegDisplacement(displacement, containsNegDisp)!;
    if (EightBitRegisters.has(reg)) {
        return {type: 'm8', register: reg, displacement, isMemory: true};
    }
    if (SixteenBitRegisters.has(reg)) {
        return {type: 'm32', register: reg, displacement, is16Bit: true, isAddressMode: true, isMemory: true};
    }
    if (ThirtyTwoBitRegisters.has(reg)) {

        return {type: 'm32', register: reg, displacement, isMemory: true};
    }
    throw Error('Unknown register!');
};

const processRegRegDisp = (s: string, ptr: ptrType, containsNegDisp?: boolean): OperandType => {
    let [register1, register2, displacement] = s.split('+');
    displacement = displacement.toUpperCase();
    displacement = processNegDisplacement(displacement, containsNegDisp)!;
    const regReg = processRegReg(register1 + '+' + register2);
    return {...regReg, displacement, isMemory: true};
};

const processDisp = (s: string, ptr: ptrType, containsNegDisp?: boolean): OperandType => {
    const type = 'm' + length(s) as types;
    // const type = 'm' + processPtr(ptr) as types;
    if (containsNegDisp) {
        s = convertToTwosComp(makeValueToByte(s, 8));
    }
    return {
        type: type === 'm16' ? 'm32' : type,
        displacement: s,
        is16Bit: ptr === 'word',
        isMemory: true,
        isDisplacementOnly: true
    };
    throw Error('Unknown register!');
};

const processPtr = (ptr: ptrType) => {
    return ptr === 'byte' ? '8' : '32';
};

const processRegConstDisp = (s: string, ptr: ptrType, containsNegDisp?: boolean): OperandType => {
    let [register, displacement] = s.split('+');
    displacement = displacement.toUpperCase();
    displacement = processNegDisplacement(displacement, containsNegDisp, true)!;
    const regConst = processRegConst(register);
    return {...regConst, displacement};
    throw Error('Unknown register!');
};

export const getOperand = (op: string, ptr: ptrType): OperandType => {
    if (EightBitRegisters.has(op)) {
        return {type: 'r8', isRegisterOnly: true, register: op};
    }
    if (SixteenBitRegisters.has(op)) {
        return {type: 'r32', isRegisterOnly: true, register: 'e' + op, is16Bit: true};
    }
    if (ThirtyTwoBitRegisters.has(op)) {
        return {type: 'r32', isRegisterOnly: true, register: op};
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
                return processReg(opWithoutBrackets, ptr);
            case 'disp': // [111]....
                return {
                    ...processDisp(opWithoutBrackets, ptr, containsNegativeDisplacement),
                    isNegativeDisp: containsNegativeDisplacement
                };
            case 'reg*constant':
                return processRegConst(opWithoutBrackets, ptr);
            case 'reg+disp':
                return {
                    ...processRegDisp(opWithoutBrackets, ptr, containsNegativeDisplacement),
                    isNegativeDisp: containsNegativeDisplacement
                };
            case 'reg+reg':
                return processRegReg(opWithoutBrackets);
            case 'reg+reg+disp':
                return {
                    ...processRegRegDisp(opWithoutBrackets, ptr, containsNegativeDisplacement),
                    isNegativeDisp: containsNegativeDisplacement
                };
            case 'reg*constant+disp':
                return {
                    ...processRegConstDisp(opWithoutBrackets, ptr, containsNegativeDisplacement),
                    isNegativeDisp: containsNegativeDisplacement
                };
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
