import {AsmFunction, InstructionStructure, ptrType} from './index';
import {getTypes, operandType} from '../../functions/getTypes';
import {Table} from '32bit-adressing-table-modrm';
import {HashMap} from '../../helper/hashMap';
import {ThirtyTwoBitRegisters} from '../registers';
import {rotate} from '../../functions/rotate';
import {everythingAfterSlashRegex} from '../regex';
import {makeValueToByte} from '../../functions/makeValueToByte';
import {convertToTwosComp} from '../../functions/twosComplement';

const ADD_TABLE = new HashMap<InstructionStructure, string>()
    .set({operation: 'add', operand1: 'al', operand2: 'imm8'}, '04 ib')
    .set({operation: 'add', operand1: 'ax', operand2: 'imm16'}, '05 iw')
    .set({operation: 'add', operand1: 'eax', operand2: 'imm32'}, '05 id')
    .set({operation: 'add', operand1: 'r8', operand2: 'imm8'}, '80 /0 ib')
    .set({operation: 'add', operand1: 'm8', operand2: 'imm8'}, '80 /0 ib')
    .set({operation: 'add', operand1: 'r16', operand2: 'imm16'}, '81 /0 iw')
    .set({operation: 'add', operand1: 'm16', operand2: 'imm16'}, '81 /0 iw')
    .set({operation: 'add', operand1: 'r32', operand2: 'imm32'}, '81 /0 id')
    .set({operation: 'add', operand1: 'm32', operand2: 'imm32'}, '81 /0 id')
    .set({operation: 'add', operand1: 'r16', operand2: 'imm8'}, '83 /0 ib')
    .set({operation: 'add', operand1: 'm16', operand2: 'imm8'}, '83 /0 ib')
    .set({operation: 'add', operand1: 'm32', operand2: 'imm8'}, '83 /0 ib')
    .set({operation: 'add', operand1: 'r32', operand2: 'imm8'}, '83 /0 ib')
    .set({operation: 'add', operand1: 'r8', operand2: 'r8'}, '00 /r')
    .set({operation: 'add', operand1: 'm8', operand2: 'r8'}, '00 /r')
    .set({operation: 'add', operand1: 'r16', operand2: 'r16'}, '01 /r')
    .set({operation: 'add', operand1: 'r16', operand2: 'r16'}, '01 /r')
    .set({operation: 'add', operand1: 'm32', operand2: 'r32'}, '01 /r')
    .set({operation: 'add', operand1: 'r8', operand2: 'm8'}, '02 /r')
    .set({operation: 'add', operand1: 'r16', operand2: 'm16'}, '03 /r')
    .set({operation: 'add', operand1: 'r32', operand2: 'm32'}, '03 /r');

export const generateCode = (
    op1?: string,
    op2?: string,
    ins?: string,
    ptrType?: ptrType,
    err?: any[],
    table?: HashMap<InstructionStructure, string>,
) => {
    op1 = op1?.replace(/\s+/g, ''); // remove white spaces
    op2 = op2?.replace(/\s+/g, '');
    let operand1Type: operandType[] | undefined = op1 ? getTypes(op1) : undefined;
    let operand2Type: operandType[] | undefined = op2 ? getTypes(op2) : undefined;
    if (err?.includes(1)) {
        if (hasType(operand2Type, 'imm')) {
            if (parseInt(op2!, 16) === 0) {
                throw new Error('operand two cant be 0!');
            }
        }
    }

    [operand1Type, operand2Type] = checkPtrTyp(operand1Type, operand2Type, ptrType);
    let opCode = getOpCode(table!, ins!, operand1Type, operand2Type);
    [op1, op2] = formatOps(opCode, op1, op2, operand1Type, operand2Type);
    opCode = opCode.replace('ib', '').replace('iw', '').replace('id', '').trim();
    opCode = getPrefix(opCode, operand1Type, operand2Type);
    let modRmByte;
    [opCode, modRmByte] = getRMByte(opCode);
    if (modRmByte) {
        return convertModRmByte(opCode, modRmByte, {op1, type1: operand1Type, op2, type2: operand2Type});
    }
    return opCode + op2;
};

export const ADD: AsmFunction = {
    generateMachineCode: (op1?: string, op2?: string, ptrType?: ptrType) => {
        return generateCode(op1, op2, 'add', ptrType, [1], ADD_TABLE);
    },
};

export const checkPtrTyp = (op1?: operandType[], op2?: operandType[], ptrType?: ptrType) => {
    const addImm = (s: '8' | '16' | '32') => {
        op2 = op2?.filter((o) => !o.includes('imm'));
        op2?.push(('imm' + s) as operandType);
    };
    const addRtype = (s: '8' | '16' | '32') => {
        op1 = [('m' + s) as operandType, ...op1!];
    };

    if (hasType(op1, 'mr') || hasType(op1, 'disp')) {
        if (ptrType) {
            switch (ptrType) {
                case 'byte':
                    addImm('8');
                    addRtype('8');
                    break;
                case 'word':
                    addImm('16');
                    addRtype('16');
                    break;
                case 'dword':
                    addImm('32');
                    addRtype('16');
                    break;
            }
            op1?.push(ptrType);
        } else {
            op1?.push('dword');
            addImm('32');
        }
    }
    return [op1, op2];
};

export const formatSpecificOp = (op: string, opType: operandType[], position: 1 | 2) => {
    const dispIsZero = opType.includes('zero');
    if (opType?.includes('reg*constant') || opType?.includes('reg+reg')) {
        if (!opType.includes('reg+reg') || !opType.includes('mr16') || position !== 2) {
            op = '00000000';
        }
    } else {
        if (dispIsZero) {
            if (opType?.includes('neg')) {
                op = op?.split('-')[0] + ']';
            } else {
                op = op?.split('+')[0] + ']';
            }
        }
    }
    if (hasType(opType, 'disp')) {
        let bracketsRemoved = removeBrackets(op!);
        if (opType?.includes('neg')) {
            bracketsRemoved = bracketsRemoved.replace('-', '+');
        }
        const separated = bracketsRemoved.split('+');
        op = separated[separated.length - 1]; // we know the displacement will always be last

        if (hasType(opType, 'disp32')) {
            if (opType?.includes('mr16')) {
                op = makeValueToByte(op, 4);
            } else {
                op = makeValueToByte(op, 8);
            }
        }
        if (hasType(opType, 'disp16')) {
            op = makeValueToByte(op, 4);
        }
        if (hasType(opType, 'disp8')) {
            op = makeValueToByte(op, 2);
        }
        if (opType?.includes('neg')) {
            op = convertToTwosComp(op!);
        }
        op = op.toUpperCase();
    }
    if (hasType(opType, 'disp') || hasType(opType, 'imm')) {
        op = rotate(op!);
    }
    return op;
};

export const formatOps = (
    opCode: string,
    op1?: string,
    op2?: string,
    op1Type?: operandType[],
    op2Type?: operandType[],
) => {
    if (opCode.includes('ib')) {
        op2 = makeValueToByte(op2!, 2);
    }
    if (opCode.includes('iw')) {
        op2 = makeValueToByte(op2!, 4);
    }
    if (opCode.includes('id')) {
        op2 = makeValueToByte(op2!, 8);
    }
    op1 = formatSpecificOp(op1!, op1Type!, 1);
    op2 = formatSpecificOp(op2!, op2Type!, 2);
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

export const getRMByte = (s: string): [string, string | undefined] => {
    let val = s;
    const match = s.match(everythingAfterSlashRegex);
    const modRmByte = match ? match[1].replace('/', '') : undefined;
    if (modRmByte) {
        val = s.replace(everythingAfterSlashRegex, '').replace('/', '');
    }
    return [val.trim(), modRmByte];
};

export const checkSib = (opCode: string, op?: string, opType?: operandType[]) => {
    if (hasType(opType, 'sib')) {
        return true;
    }
    return undefined;
};

export const convertModRmByte = (
    opCode: string,
    rmByte: string,
    op: {
        op2: string | undefined;
        op1: string | undefined;
        type2: operandType[] | undefined;
        type1: operandType[] | undefined;
    },
): string => {
    let op2value;
    let op1value;
    const isOp1Sib = checkSib(opCode, op.op1, op.type1);
    const isOp2Sib = checkSib(opCode, op.op2, op.type2);
    if (isOp1Sib || isOp2Sib) {
        const [nonSibOp, sibTyp, sibOp, nonSibType] = (isOp1Sib
            ? [op.op2, op.type1, op.op1, op.type2]
            : [op.op1, op.type2, op.op2, op.type1]) as [any, operandType[], any, operandType[]];
        const index = sibTyp?.findIndex((o) => o.includes('sib'))!;
        const v1 = Table.getValueFromTable(!isNaN(parseInt(rmByte, 10)) ? rmByte : nonSibOp, sibTyp![index]!);
        const v2 = Table.getValueFromTable(sibTyp![index + 1]!, sibTyp![index + 2]!, '32sib');
        if (v1 && v2) {
            opCode = opCode + v1 + v2;
            if (isOp1Sib && hasType(sibTyp, 'reg+reg')) {
                return opCode + op.op1 + (hasType(nonSibType, 'imm') ? nonSibOp : '');
            }
            return opCode + (!sibTyp?.includes('reg+reg') ? sibOp : '') + (hasType(nonSibType, 'imm') ? nonSibOp : '');
        }
    }

    if (hasType(op.type2, 'disp')) {
        op2value = op.op2;
        op.op2 = op.type2!.filter((o) => o.includes('disp'))[0];
    }
    if (hasType(op.type1, 'disp')) {
        op1value = op.op1;
        if (hasType(op.type2, 'imm')) {
            op2value = op.op2;
        }
        op.op1 = op.type1!.filter((o) => o.includes('disp'))[0];
    }
    if (rmByte === 'r') {
        let val = Table.getValueFromTable(op.op1!, op.op2!);
        if (!val && op.op2 && hasType(op.type2!, 'mr16')) {
            // e.g [si] then try with the 16 bit rm table
            val = Table.getValueFromTable(op.op1!, op.op2!, '16rm');
        }
        // if(!val && op.op2 &&  || hasType(op.type2!, 'm32') ){
        //     if(hasType(op.type2!, 'm16'))
        // }
        if (val) {
            return opCode + val + (op1value ? op1value : '') + (op2value ? op2value : '');
        }
    }
    let val = Table.getValueFromTable(rmByte, op.op1!);
    if (!val && op.type1?.includes('m16')) {
        val = Table.getValueFromTable(rmByte, op.op1!, '16rm');
    }
    if (op1value || op2value) {
        return opCode + val + (op1value ? op1value : '') + (op2value ? op2value : '');
    }
    if (val) {
        return opCode + val + (op.op2 ? op.op2! : '');
    }
    throw new Error('ModRmByte or operand invalid');
};

export const getPrefix = (opCode: string, op1Type?: operandType[], op2Type?: operandType[]): string => {
    if (op1Type?.includes('r16') || (op2Type && op2Type.length === 1 && op2Type[0] === 'm16')) {
        opCode = '66' + opCode;
    } else {
        if (op1Type?.includes('word')) {
            opCode = '66' + opCode;
        }
    }
    if ((op1Type && hasType(op1Type, 'mr16')) || (op2Type && hasType(op2Type, 'mr16'))) {
        opCode = '67' + opCode;
    }
    return opCode;
};

export const hasType = (opType: operandType[] | undefined, t: string) => {
    if (opType) {
        return opType.some((o) => o.includes(t));
    }
    return undefined;
};

export const getOpCode = (
    table: HashMap<InstructionStructure, string>,
    ins: string,
    operand1?: operandType[],
    operand2?: operandType[],
): string => {
    let opCode: string | undefined;
    const operation = ins;

    // get string from Table
    if (operand2) {
        operand1?.some((op) => {
            return operand2?.some((op2) => {
                const t = table.get({operation, operand1: op, operand2: op2});
                if (t) {
                    opCode = t;
                    return true;
                }
                if (op === 'disp32') {
                    opCode = table.get({operation, operand1: 'm32', operand2: 'imm32'});
                    return !!opCode;
                }
                if (op === 'mr16' && op2 === 'imm32') {
                    opCode = table.get({operation, operand1: 'r32', operand2: 'imm32'});
                    return !!opCode;
                }

                if ((ThirtyTwoBitRegisters.has(op) || op === 'r32') && op2 === 'imm16') {
                    opCode = table.get({operation, operand1: op, operand2: 'imm32'});
                    return !!opCode;
                }
                if (op === 'r32' && (op2.includes('disp32') || op2.includes('mr16'))) {
                    opCode = table.get({operation, operand1: op, operand2: 'm32'});
                    return !!opCode;
                }
                if (op === 'r16' && op2 === 'imm8') {
                    opCode = table.get({operation, operand1: op, operand2: 'imm16'});
                    return !!opCode;
                }
                if (op === 'r32' && op2 === 'imm8') {
                    opCode = table.get({operation, operand1: op, operand2: 'imm32'});
                    return !!opCode;
                }
                if (op === 'r32' && op2 === 'imm16') {
                    opCode = table.get({operation, operand1: op, operand2: 'imm32'});
                    return !!opCode;
                }
                if (op === 'r16' && (op2 === 'm8' || op2 === 'm32')) {
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
        operand1?.some((op) => {
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
