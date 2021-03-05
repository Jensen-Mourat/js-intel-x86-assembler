import { OpCode } from './ADD.new';
import { AsmFunction, InstructionStructure, ptrType } from './index';
import { generateCode } from './ADD.new';
import { HashMap } from '../../helper/hashMap';

const INT_TABLE = new HashMap<InstructionStructure, OpCode>()
  // Ignored table entry CC | INT 3 | NP | Valid | Valid | Interrupt 3—trap to debugger
  .set({ operation: 'int', operand1: 'imm8' }, { opCode: 'CD', length: 'b' })
  .set({ operation: 'into' }, { opCode: 'CE' });

export const INT: AsmFunction = {
  generateMachineCode: (op1?: string, op2?: string, ptrType?: ptrType) => {
    return generateCode(op1, op2, 'int', ptrType, [2], INT_TABLE);
  },
};
