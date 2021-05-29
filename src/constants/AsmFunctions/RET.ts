import { AsmFunction, InstructionStructure, PtrType } from './index';
import { HashMap } from '../../helper/hashMap';
import {generateCode} from '../../functions/generateCode';
import {OpCode} from '../interfaces';

const RET_TABLE = new HashMap<InstructionStructure, OpCode>()
  .set({ operation: 'ret' }, { opCode: 'C3' })
  .set({ operation: 'ret' }, { opCode: 'CB' })
  .set({ operation: 'ret', operand1: 'imm16' }, { opCode: 'C2', length: 'w' })
  .set({ operation: 'ret', operand1: 'imm16' }, { opCode: 'CA', length: 'w' });

export const RET: AsmFunction = {
  generateMachineCode: (op1?: string, op2?: string, ptrType?: PtrType) => {
    return generateCode(op1, op2, 'ret', ptrType, RET_TABLE);
  },
};
