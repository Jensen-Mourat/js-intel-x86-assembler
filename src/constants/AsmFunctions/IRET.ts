import { OpCode } from './ADD.new';
import { AsmFunction, InstructionStructure, ptrType } from './index';
import { generateCode } from './ADD.new';
import { HashMap } from '../../helper/hashMap';

const IRET_TABLE = new HashMap<InstructionStructure, OpCode>()
  .set({ operation: 'iret' }, { opCode: 'CF' })
  .set({ operation: 'iretd' }, { opCode: 'CF' });

export const IRET: AsmFunction = {
  generateMachineCode: (op1?: string, op2?: string, ptrType?: ptrType) => {
    return generateCode(op1, op2, 'iret', ptrType, [2], IRET_TABLE);
  },
};
