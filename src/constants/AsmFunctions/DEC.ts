import { AsmFunction, InstructionStructure, PtrType } from './index';
import { HashMap } from '../../helper/hashMap';
import {generateCode} from '../../functions/generateCode';
import {OpCode} from '../interfaces';

const DEC_TABLE = new HashMap<InstructionStructure, OpCode>()
  .set({ operation: 'dec', operand1: 'r8' }, { opCode: 'FE', modRmByte: '1' })
  .set({ operation: 'dec', operand1: 'm8' }, { opCode: 'FE', modRmByte: '1' })
  .set({ operation: 'dec', operand1: 'r16' }, { opCode: 'FF', modRmByte: '1' })
  .set({ operation: 'dec', operand1: 'm16' }, { opCode: 'FF', modRmByte: '1' })
  .set({ operation: 'dec', operand1: 'r32' }, { opCode: 'FF', modRmByte: '1' })
  .set({ operation: 'dec', operand1: 'm32' }, { opCode: 'FF', modRmByte: '1' })
  .set({ operation: 'dec', operand1: 'r16' }, { opCode: '48', registerCode: 'rw' })
  .set({ operation: 'dec', operand1: 'r32' }, { opCode: '48', registerCode: 'rd' });

export const DEC: AsmFunction = {
  generateMachineCode: (op1?: string, op2?: string, ptrType?: PtrType) => {
    return generateCode(op1, op2, 'dec', ptrType, DEC_TABLE);
  },
};
