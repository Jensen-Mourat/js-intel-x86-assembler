import { OpCode } from './ADD.new';
import { AsmFunction, InstructionStructure, ptrType } from './index';
import { generateCode } from './ADD.new';
import { HashMap } from '../../helper/hashMap';

const MUL_TABLE = new HashMap<InstructionStructure, OpCode>()
  .set({operation: 'mul', operand1: 'r8'}, {opCode: 'F6', modRmByte: '4' })
  .set({operation: 'mul', operand1: 'm8'}, {opCode: 'F6', modRmByte: '4' })
  .set({operation: 'mul', operand1: 'r16'}, {opCode: 'F7', modRmByte: '4' })
  .set({operation: 'mul', operand1: 'm16'}, {opCode: 'F7', modRmByte: '4' })
  .set({operation: 'mul', operand1: 'r32'}, {opCode: 'F7', modRmByte: '4' })
  .set({operation: 'mul', operand1: 'm32'}, {opCode: 'F7', modRmByte: '4' });


export const MUL: AsmFunction = {
  generateMachineCode: (op1?: string, op2?: string, ptrType?: ptrType) => {
    return generateCode(op1, op2, 'mul', ptrType, [2], MUL_TABLE);
  },
};
