import { AsmFunction, InstructionStructure, PtrType } from './index';
import { HashMap } from '../../helper/hashMap';
import {generateCode} from '../../functions/generateCode';
import {OpCode} from '../interfaces';

const IRET_TABLE = new HashMap<InstructionStructure, OpCode>()
  .set({ operation: 'iret' }, { opCode: 'CF' })
  .set({ operation: 'iretd' }, { opCode: 'CF' });

export const IRET: AsmFunction = {
  generateMachineCode: (op1?: string, op2?: string, ptrType?: PtrType) => {
    return generateCode(op1, op2, 'iret', ptrType, IRET_TABLE);
  },
};
