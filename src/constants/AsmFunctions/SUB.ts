import {HashMap} from '../../helper/hashMap';
import {AsmFunction, InstructionStructure} from './index';
import {generateCode, OpCode} from './ADD.new';

const SUB_TABLE = new HashMap<InstructionStructure, OpCode>()
    .set({operation: 'sub', operand1: 'al', operand2: 'imm8'}, {opCode: '2C', length: 'b'})
    .set({operation: 'sub', operand1: 'ax', operand2: 'imm16'}, {opCode: '2D', length: 'w'})
    .set({operation: 'sub', operand1: 'eax', operand2: 'imm32'}, {opCode: '2D', length: 'd'})
    .set({operation: 'sub', operand1: 'r8', operand2: 'imm8'}, {opCode: '80', length: 'b', modRmByte: '5'})
    .set({operation: 'sub', operand1: 'm8', operand2: 'imm8'}, {opCode: '80', length: 'b', modRmByte: '5'})
    .set({operation: 'sub', operand1: 'r16', operand2: 'imm16'}, {opCode: '81', length: 'w', modRmByte: '5'})
    .set({operation: 'sub', operand1: 'm16', operand2: 'imm16'}, {opCode: '81', length: 'w', modRmByte: '5'})
    .set({operation: 'sub', operand1: 'r32', operand2: 'imm32'}, {opCode: '81', length: 'd', modRmByte: '5'})
    .set({operation: 'sub', operand1: 'm32', operand2: 'imm32'}, {opCode: '81', length: 'd', modRmByte: '5'})
    .set(
        {operation: 'sub', operand1: 'r16', operand2: 'imm8'},
        {opCode: '83', length: 'b', modRmByte: '5', isSigned: true},
    )
    .set(
        {operation: 'sub', operand1: 'm16', operand2: 'imm8'},
        {opCode: '83', length: 'b', modRmByte: '5', isSigned: true},
    )
    .set(
        {operation: 'sub', operand1: 'r32', operand2: 'imm8'},
        {opCode: '83', length: 'b', modRmByte: '5', isSigned: true},
    )
    .set(
        {operation: 'sub', operand1: 'm32', operand2: 'imm8'},
        {opCode: '83', length: 'b', modRmByte: '5', isSigned: true},
    )
    .set({operation: 'sub', operand1: 'r8', operand2: 'r8'}, {opCode: '28'})
    .set({operation: 'sub', operand1: 'm8', operand2: 'r8'}, {opCode: '28'})
    .set({operation: 'sub', operand1: 'r16', operand2: 'r16'}, {opCode: '29'})
    .set({operation: 'sub', operand1: 'm16', operand2: 'r16'}, {opCode: '29'})
    .set({operation: 'sub', operand1: 'r32', operand2: 'r32'}, {opCode: '29'})
    .set({operation: 'sub', operand1: 'm32', operand2: 'r32'}, {opCode: '29'})
    .set({operation: 'sub', operand1: 'r8', operand2: 'm8'}, {opCode: '2A'})
    .set({operation: 'sub', operand1: 'r16', operand2: 'r16'}, {opCode: '2B'})
    .set({operation: 'sub', operand1: 'r16', operand2: 'm16'}, {opCode: '2B'})
    .set({operation: 'sub', operand1: 'r32', operand2: 'r32'}, {opCode: '2B'})
    .set({operation: 'sub', operand1: 'r32', operand2: 'm32'}, {opCode: '2B'});

export const SUB: AsmFunction = {
    generateMachineCode: (op1?: string, op2?: string, ptrType?: ptrType) => {
        return generateCode(op1, op2, 'sub', ptrType, [2], SUB_TABLE);
    },
};
