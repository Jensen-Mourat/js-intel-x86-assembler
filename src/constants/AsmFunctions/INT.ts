import { AsmFunction, InstructionStructure, PtrType } from './index';
import { HashMap } from '../../helper/hashMap';
import {generateCode} from '../../functions/generateCode';
import {OpCode} from '../interfaces';

const INT_TABLE = new HashMap<InstructionStructure, OpCode>()
  // Ignored table entry CC | INT 3 | NP | Valid | Valid | Interrupt 3—trap to debugger
  .set({ operation: 'int', operand1: 'imm8' }, { opCode: 'CD', length: 'b' })
  .set({ operation: 'into' }, { opCode: 'CE' });

export const INT: AsmFunction = {
  generateMachineCode: (op1?: string, op2?: string, ptrType?: PtrType) => {
    return generateCode(op1, op2, 'int', ptrType, INT_TABLE);
  },
};
