import {AsmFunction, InstructionStructure} from './index';
import {convertToTwosComp, getTypes, operandType} from '../../functions/getTypes';
import {Table} from '32bit-adressing-table-modrm';
import {HashMap} from '../../helper/hashMap';
import {SixteenBitRegisters, ThirtyTwoBitRegisters} from '../registers';
import {rotate} from '../../functions/rotate';
import has = Reflect.has;
import {everythingAfterSlashRegex} from '../regex';

const ADD_TABLE = new HashMap<InstructionStructure, string>()
    .set({operation: 'add', operand1: 'al', operand2: 'imm8'}, '04 ib')
    .set({operation: 'add', operand1: 'ax', operand2: 'imm16'}, '05 iw')
    .set({operation: 'add', operand1: 'eax', operand2: 'imm32'}, '05 id')
    .set({operation: 'add', operand1: 'r8', operand2: 'imm8'}, '80 /0 ib')
    .set({operation: 'add', operand1: 'm8', operand2: 'imm8'}, '80 /0 ib')
    .set({operation: 'add', operand1: 'r16', operand2: 'imm16'}, '81 /0 iw')
    .set({operation: 'add', operand1: 'r32', operand2: 'imm32'}, '81 /0 id')
    .set({operation: 'add', operand1: 'm32', operand2: 'imm32'}, '81 /0 id')
    .set({operation: 'add', operand1: 'r16', operand2: 'imm8'}, '83 /0 ib')
    .set({operation: 'add', operand1: 'm16', operand2: 'imm8'}, '83 /0 ib')
    .set({operation: 'add', operand1: 'm32', operand2: 'imm8'}, '83 /0 ib')
    .set({operation: 'add', operand1: 'r32', operand2: 'imm8'}, '83 /0 ib')
    .set({operation: 'add', operand1: 'r8', operand2: 'r8'}, '00 /r')
    .set({operation: 'add', operand1: 'm8', operand2: 'r8'}, '00 /r')
    .set({operation: 'add', operand1: 'r16', operand2: 'r16'}, '01 /r')
    .set({operation: 'add', operand1: 'r32', operand2: 'r32'}, '01 /r')
    .set({operation: 'add', operand1: 'r8', operand2: 'm8'}, '02 /r')
    .set({operation: 'add', operand1: 'r16', operand2: 'm16'}, '03 /r')
    .set({operation: 'add', operand1: 'r32', operand2: 'm32'}, '03 /r');


export const ADD: AsmFunction = {
    generateMachineCode: (op1?: string, op2?: string) => {
        op1 = op1?.replace(/\s+/g, ''); // remove white spaces
        op2 = op2?.replace(/\s+/g, '');
        let operand1Type: operandType[] | undefined = op1 ? getTypes(op1) : undefined;
        let operand2Type: operandType[] | undefined = op2 ? getTypes(op2) : undefined;
        let opCode = getOpCode(ADD_TABLE, 'add', operand1Type, operand2Type);
        [op1, op2] = formatOp(opCode, op1, op2, operand1Type, operand2Type);
        opCode = opCode.replace('ib', '').replace('iw', '').replace('id', '').trim();
        opCode = getPrefix(opCode, operand1Type, operand2Type);
        let modRmByte;
        [opCode, modRmByte] = getRMByte(opCode);
        if (modRmByte) {
            return convertModRmByte(opCode, modRmByte, {op1: op1, type1: operand1Type, op2, type2: operand2Type});
        }
        return opCode + op2;
    }
};

export const formatOp = (opCode: string, op1?: string, op2?: string, op1Type?: operandType[], op2Type?: operandType[]) => {
    const dispIsZero = op2Type?.includes('zero');
    if (opCode.includes('ib')) {
        op2 = makeValueToByte(op2!, 2);

    }
    if (opCode.includes('iw')) {
        op2 = makeValueToByte(op2!, 4);

    }
    if (opCode.includes('id')) {
        op2 = makeValueToByte(op2!, 8);
    }

    if (op2Type?.includes('reg*constant')) {
        op2 = '00000000';
    } else {
        if (dispIsZero) {
            if (op2Type?.includes('neg')) {
                op2 = op2?.split('-')[0] + ']';
            } else {
                op2 = op2?.split('+')[0] + ']';
            }
        }
    }
    if (hasType(op2Type, 'disp')) {
        const bracketsRemoved = removeBrackets(op2!);
        if (op2Type?.includes('neg')) {
            bracketsRemoved = bracketsRemoved.replace('-', '+');
        }
        const separated = bracketsRemoved.split('+');
        op2 = separated[separated.length - 1]; // we know the displacement will always be last

        if (hasType(op2Type, 'disp32')) {
            if (op2Type?.includes('mr16')) {
                op2 = makeValueToByte(op2, 4);
            } else {
                op2 = makeValueToByte(op2, 8);
            }
        }
        if (hasType(op2Type, 'disp16')) {
            op2 = makeValueToByte(op2, 4);
        }
        if (hasType(op2Type, 'disp8')) {
            op2 = makeValueToByte(op2, 2);
        }
        if (op2Type?.includes('neg')) {
            op2 = convertToTwosComp(op2!);
        }
        op2 = op2.toUpperCase();
    }
    if (hasType(op2Type, 'disp') || hasType(op2Type, 'imm')) {
        op2 = rotate(op2!);
    }
    return [op1, op2];
};

export const removeOddByte = (s: string) => {
    if (s.length % 2 !== 0) {
        s = '0' + s;
    }
    return s;
};

export const removeBrackets = (s: string) => {
    return s.replace('[', '').replace(']', '');
};

export const setLengthWhenReg32AndImm16 = (op: string, opCode: string) => {
    if (opCode.includes('id')) {
        op = makeValueToByte(op, 8);
    }
    return op;
};

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

export const getRMByte = (s: string): [string, string | undefined] => {
    let val = s;
    const match = s.match(everythingAfterSlashRegex);
    const modRmByte = match ? match[1].replace('/', '') : undefined;
    if (modRmByte) {
        val = s.replace(everythingAfterSlashRegex, '').replace('/', '');
    }
    return [val.trim(), modRmByte];
};

export const convertModRmByte = (opCode: string, rmByte: string, op: { op2: string | undefined; op1: string | undefined; type2: operandType[] | undefined; type1: operandType[] | undefined }): string => {
    let op2value;
    if (hasType(op.type2, 'sib')) {
        const index = op.type2?.findIndex(o => o.includes('sib'))!;
        const v1 = Table.getValueFromTable(op.op1!, op.type2[index]!);
        const v2 = Table.getValueFromTable(op.type2[index + 1]!, op.type2[index + 2]!, '32sib');
        if (v1 && v2) {
            return opCode + v1 + v2 + (!op.type2?.includes('reg+reg') ? op.op2 : '');
        }
    }
    if (hasType(op.type2, 'disp')) {
        op2value = op.op2;
        if (op.op2?.includes('+')) {
            op2value = removeBrackets(op.op2).split('+')[1].trim();
            op2value = makeValueToByte(op2value!, 8);
            op2value = rotate(op2value);
        }
        op.op2 = op.type2!.filter(o => o.includes('disp'))[0];
    }
    if (rmByte === 'r') {
        let val = Table.getValueFromTable(op.op1!, op.op2!);
        if (!val && op.op2 && hasType(op.type2!, 'mr16')) { // e.g [si] then try with the 16 bit rm table
            val = Table.getValueFromTable(op.op1!, op.op2!, '16rm');
        }
        // if(!val && op.op2 &&  || hasType(op.type2!, 'm32') ){
        //     if(hasType(op.type2!, 'm16'))
        // }
        if (val) {
            return opCode + val + (op2value ? op2value : '');
        }
    }
    let val = Table.getValueFromTable(rmByte, op.op1!);
    if (val) {
        return opCode + val + (op.op2 ? op.op2! : '');
    }
    throw new Error('ModRmByte or operand invalid');
};

export const getPrefix = (opCode: string, op1Type?: operandType[], op2Type?: operandType[]): string => {
    if ((op1Type && hasType(op1Type, 'r16')) || (op2Type && op2Type.length === 1 && op2Type[0] === 'm16')) {
        opCode = '66' + opCode;
    }
    if ((op1Type && hasType(op1Type, 'mr16')) || (op2Type && hasType(op2Type, 'mr16'))) {
        opCode = '67' + opCode;
    }
    return opCode;
};

export const hasType = (opType: operandType[] | undefined, t: string) => {
    if (opType) {
        return opType.some(o => o.includes(t));
    }
    return undefined;
};

export const getOpCode = (table: HashMap<InstructionStructure, string>, ins: string, operand1?: operandType[], operand2?: operandType[]): string => {
    let opCode: string | undefined;
    const operation = ins;

    // get string from Table
    if (operand2) {
        operand1?.some(op => {
            return operand2?.some(op2 => {
                let t = table.get({operation, operand1: op, operand2: op2});
                if (t) {
                    opCode = t;
                    return true;
                }
                if ((ThirtyTwoBitRegisters.has(op) || op === 'r32') && op2 === 'imm16') {
                    opCode = table.get({operation, operand1: op, operand2: 'imm32'});
                    return !!opCode;
                }
                if (op === 'r32' && (op2.includes('disp32') || op2.includes('mr16'))) {
                    opCode = table.get({operation, operand1: op, operand2: 'm32'});
                    return !!opCode;
                }
                if (op === 'r16' && (op2.includes('m8') || op2.includes('m32'))) {
                    opCode = table.get({operation, operand1: op, operand2: 'm16'});
                    return !!opCode;
                }
                if (op === 'r8' && (op2.includes('m16') || op2.includes('m32'))) {
                    opCode = table.get({operation, operand1: op, operand2: 'm8'});
                }
                return false;
            });
        });
    } else if (operand1) {
        operand1?.some(op => {
            const t = table.get({operation, operand1: op});
            if (t) {
                opCode = t;
                return true;
            }
            return false;
        });
    } else {
        const t = table.get({operation});
        opCode = t;
    }
    // if opCode
    if (opCode) {
        return opCode;
    }
    throw new Error('Could not find matching opCode');
};
