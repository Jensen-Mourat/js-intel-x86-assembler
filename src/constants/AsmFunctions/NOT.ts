import { AsmFunction, InstructionStructure, PtrType } from './index';
import { HashMap } from '../../helper/hashMap';
import {generateCode} from '../../functions/generateCode';
import {OpCode} from '../interfaces';

const NOT_TABLE = new HashMap<InstructionStructure, OpCode>()
  .set({ operation: 'not', operand1: 'r8' }, { opCode: 'F6', modRmByte: '2' })
  .set({ operation: 'not', operand1: 'm8' }, { opCode: 'F6', modRmByte: '2' })
  .set({ operation: 'not', operand1: 'r16' }, { opCode: 'F7', modRmByte: '2' })
  .set({ operation: 'not', operand1: 'm16' }, { opCode: 'F7', modRmByte: '2' })
  .set({ operation: 'not', operand1: 'r32' }, { opCode: 'F7', modRmByte: '2' })
  .set({ operation: 'not', operand1: 'm32' }, { opCode: 'F7', modRmByte: '2' });

export const NOT: AsmFunction = {
  generateMachineCode: (op1?: string, op2?: string, ptrType?: PtrType) => {
    return generateCode(op1, op2, 'not', ptrType, NOT_TABLE);
  },
};
