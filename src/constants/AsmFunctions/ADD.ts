import {AsmFunction, InstructionStructure, PtrType} from './index';
import {HashMap} from '../../helper/hashMap';
import '../../helper/utils/string.extensions';
import {generateCode} from '../../functions/generateCode';
import {OpCode} from '../interfaces';

const ADD_TABLE = new HashMap<InstructionStructure, OpCode>()
    .set({operation: 'add', operand1: 'al', operand2: 'imm8'}, {opCode: '04', length: 'b'})
    .set({operation: 'add', operand1: 'eax', operand2: 'imm32'}, {opCode: '05', length: 'd'})
    .set({operation: 'add', operand1: 'r8', operand2: 'imm8'}, {opCode: '80', modRmByte: '0', length: 'b'})
    .set({operation: 'add', operand1: 'm8', operand2: 'imm8'}, {opCode: '80', modRmByte: '0', length: 'b'})
    .set({operation: 'add', operand1: 'r32', operand2: 'imm32'}, {opCode: '81', modRmByte: '0', length: 'd'})
    .set({operation: 'add', operand1: 'm32', operand2: 'imm32'}, {opCode: '81', modRmByte: '0', length: 'd'})
    .set(
        {operation: 'add', operand1: 'm32', operand2: 'imm8'},
        {
            opCode: '83',
            modRmByte: '0',
            length: 'b',
            isSigned: true,
        },
    )
    .set(
        {operation: 'add', operand1: 'r32', operand2: 'imm8'},
        {
            opCode: '83',
            modRmByte: '0',
            length: 'b',
            isSigned: true,
        },
    )
    .set({operation: 'add', operand1: 'r8', operand2: 'r8'}, {opCode: '00'})
    .set({operation: 'add', operand1: 'm8', operand2: 'r8'}, {opCode: '00'})
    .set({operation: 'add', operand1: 'r32', operand2: 'r32'}, {opCode: '01'})
    .set({operation: 'add', operand1: 'm32', operand2: 'r32'}, {opCode: '01'})
    .set({operation: 'add', operand1: 'r8', operand2: 'm8'}, {opCode: '02'})
    .set({operation: 'add', operand1: 'r16', operand2: 'm16'}, {opCode: '03'})
    .set({operation: 'add', operand1: 'r32', operand2: 'm32'}, {opCode: '03'});

export const ADD: AsmFunction = {
    generateMachineCode: (op1?: string, op2?: string, ptrType?: PtrType) => {
        return generateCode(op1, op2, 'add', ptrType, ADD_TABLE);
    },
};

