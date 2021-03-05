import { OpCode } from './ADD.new';
import { AsmFunction, InstructionStructure, ptrType } from './index';
import { generateCode } from './ADD.new';
import { HashMap } from '../../helper/hashMap';

const RCR_TABLE = new HashMap<InstructionStructure, OpCode>()
  .set({operation: 'rcr', operand1: 'r8', operand2: 'cl'}, {opCode: 'D2', modRmByte: '3'})
  .set({operation: 'rcr', operand1: 'm8', operand2: 'cl'}, {opCode: 'D2', modRmByte: '3'})
  .set({operation: 'rcr', operand1: 'r8', operand2: 'imm8'}, {opCode: 'C0', modRmByte: '3', length: 'b'})
  .set({operation: 'rcr', operand1: 'm8', operand2: 'imm8'}, {opCode: 'C0', modRmByte: '3', length: 'b'})
  .set({operation: 'rcr', operand1: 'r16', operand2: 'cl'}, {opCode: 'D3', modRmByte: '3'})
  .set({operation: 'rcr', operand1: 'm16', operand2: 'cl'}, {opCode: 'D3', modRmByte: '3'})
  .set({operation: 'rcr', operand1: 'r16', operand2: 'imm8'}, {opCode: 'C1', modRmByte: '3', length: 'b'})
  .set({operation: 'rcr', operand1: 'm16', operand2: 'imm8'}, {opCode: 'C1', modRmByte: '3', length: 'b'})
  .set({operation: 'rcr', operand1: 'r32', operand2: 'cl'}, {opCode: 'D3', modRmByte: '3'})
  .set({operation: 'rcr', operand1: 'm32', operand2: 'cl'}, {opCode: 'D3', modRmByte: '3'})
  .set({operation: 'rcr', operand1: 'r32', operand2: 'imm8'}, {opCode: 'C1', modRmByte: '3', length: 'b'})
  .set({operation: 'rcr', operand1: 'm32', operand2: 'imm8'}, {opCode: 'C1', modRmByte: '3', length: 'b'});

export const RCR: AsmFunction = {
  generateMachineCode: (op1?: string, op2?: string, ptrType?: ptrType) => {
    return generateCode(op1, op2, 'rcr', ptrType, [2], RCR_TABLE);
  },
};
