import { OpCode } from './ADD.new';
import { AsmFunction, InstructionStructure, ptrType } from './index';
import { generateCode } from './ADD.new';
import { HashMap } from '../../helper/hashMap';

const INC_TABLE = new HashMap<InstructionStructure, OpCode>()
  .set({operation: 'inc', operand1: 'r8'}, {opCode: 'FE', modRmByte: '0' })
  .set({operation: 'inc', operand1: 'm8'}, {opCode: 'FE', modRmByte: '0' })
  .set({operation: 'inc', operand1: 'r16'}, {opCode: 'FF', modRmByte: '0' })
  .set({operation: 'inc', operand1: 'm16'}, {opCode: 'FF', modRmByte: '0' })
  .set({operation: 'inc', operand1: 'r32'}, {opCode: 'FF', modRmByte: '0' })
  .set({operation: 'inc', operand1: 'm32'}, {opCode: 'FF', modRmByte: '0' })
  .set({operation: 'inc', operand1: 'r16'}, {opCode: '40', registerCode: 'rw' })
  .set({operation: 'inc', operand1: 'r32'}, {opCode: '40', registerCode: 'rd' });


export const INC: AsmFunction = {
  generateMachineCode: (op1?: string, op2?: string, ptrType?: ptrType) => {
    return generateCode(op1, op2, 'inc', ptrType, [2], INC_TABLE);
  },
};
