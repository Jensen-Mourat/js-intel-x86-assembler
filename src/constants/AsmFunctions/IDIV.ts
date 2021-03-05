import { OpCode } from './ADD.new';
import { AsmFunction, InstructionStructure, ptrType } from './index';
import { generateCode } from './ADD.new';
import { HashMap } from '../../helper/hashMap';

const IDIV_TABLE = new HashMap<InstructionStructure, OpCode>()
  .set({operation: 'idiv', operand1: 'r8'}, {opCode: 'F6', modRmByte: '7' })
  .set({operation: 'idiv', operand1: 'm8'}, {opCode: 'F6', modRmByte: '7' })
  .set({operation: 'idiv', operand1: 'r16'}, {opCode: 'F7', modRmByte: '7' })
  .set({operation: 'idiv', operand1: 'm16'}, {opCode: 'F7', modRmByte: '7' })
  .set({operation: 'idiv', operand1: 'r32'}, {opCode: 'F7', modRmByte: '7' })
  .set({operation: 'idiv', operand1: 'm32'}, {opCode: 'F7', modRmByte: '7' });


export const IDIV: AsmFunction = {
  generateMachineCode: (op1?: string, op2?: string, ptrType?: ptrType) => {
    return generateCode(op1, op2, 'idiv', ptrType, [2], IDIV_TABLE);
  },
};
