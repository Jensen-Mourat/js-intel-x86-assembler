import { OpCode } from './ADD.new';
import { AsmFunction, InstructionStructure, ptrType } from './index';
import { generateCode } from './ADD.new';
import { HashMap } from '../../helper/hashMap';

const DEC_TABLE = new HashMap<InstructionStructure, OpCode>()
  .set({operation: 'dec', operand1: 'r8'}, {opCode: 'FE', modRmByte: '1' })
  .set({operation: 'dec', operand1: 'm8'}, {opCode: 'FE', modRmByte: '1' })
  .set({operation: 'dec', operand1: 'r16'}, {opCode: 'FF', modRmByte: '1' })
  .set({operation: 'dec', operand1: 'm16'}, {opCode: 'FF', modRmByte: '1' })
  .set({operation: 'dec', operand1: 'r32'}, {opCode: 'FF', modRmByte: '1' })
  .set({operation: 'dec', operand1: 'm32'}, {opCode: 'FF', modRmByte: '1' })
  .set({operation: 'dec', operand1: 'r16'}, {opCode: '48', registerCode: 'rw' })
  .set({operation: 'dec', operand1: 'r32'}, {opCode: '48', registerCode: 'rd' });


export const DEC: AsmFunction = {
  generateMachineCode: (op1?: string, op2?: string, ptrType?: ptrType) => {
    return generateCode(op1, op2, 'dec', ptrType, [2], DEC_TABLE);
  },
};
