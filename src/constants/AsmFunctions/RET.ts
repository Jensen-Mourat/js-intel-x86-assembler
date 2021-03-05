import { OpCode } from './ADD.new';
import { AsmFunction, InstructionStructure, ptrType } from './index';
import { generateCode } from './ADD.new';
import { HashMap } from '../../helper/hashMap';

const RET_TABLE = new HashMap<InstructionStructure, OpCode>()
  .set({ operation: 'ret' }, { opCode: 'C3' })
  .set({ operation: 'ret' }, { opCode: 'CB' })
  .set({ operation: 'ret', operand1: 'imm16' }, { opCode: 'C2', length: 'w' })
  .set({ operation: 'ret', operand1: 'imm16' }, { opCode: 'CA', length: 'w' });

export const RET: AsmFunction = {
  generateMachineCode: (op1?: string, op2?: string, ptrType?: ptrType) => {
    return generateCode(op1, op2, 'ret', ptrType, [2], RET_TABLE);
  },
};
