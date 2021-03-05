import { OpCode } from './ADD.new';
import { AsmFunction, InstructionStructure, ptrType } from './index';
import { generateCode } from './ADD.new';
import { HashMap } from '../../helper/hashMap';

const DIV_TABLE = new HashMap<InstructionStructure, OpCode>()
  .set({operation: 'div', operand1: 'r8'}, {opCode: 'F6', modRmByte: '6' })
  .set({operation: 'div', operand1: 'm8'}, {opCode: 'F6', modRmByte: '6' })
  .set({operation: 'div', operand1: 'r16'}, {opCode: 'F7', modRmByte: '6' })
  .set({operation: 'div', operand1: 'm16'}, {opCode: 'F7', modRmByte: '6' })
  .set({operation: 'div', operand1: 'r32'}, {opCode: 'F7', modRmByte: '6' })
  .set({operation: 'div', operand1: 'm32'}, {opCode: 'F7', modRmByte: '6' });


export const DIV: AsmFunction = {
  generateMachineCode: (op1?: string, op2?: string, ptrType?: ptrType) => {
    return generateCode(op1, op2, 'div', ptrType, [2], DIV_TABLE);
  },
};
