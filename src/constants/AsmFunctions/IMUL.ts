import { AsmFunction, InstructionStructure, PtrType } from './index';
import { HashMap } from '../../helper/hashMap';
import {generateCode} from '../../functions/generateCode';
import {OpCode} from '../interfaces';

const IMUL_TABLE = new HashMap<InstructionStructure, OpCode>()
  .set({ operation: 'imul', operand1: 'r8' }, { opCode: 'F6', modRmByte: '5' })
  .set({ operation: 'imul', operand1: 'm8' }, { opCode: 'F6', modRmByte: '5' })
  .set({ operation: 'imul', operand1: 'r16' }, { opCode: 'F7', modRmByte: '5' })
  .set({ operation: 'imul', operand1: 'm16' }, { opCode: 'F7', modRmByte: '5' })
  .set({ operation: 'imul', operand1: 'r32' }, { opCode: 'F7', modRmByte: '5' })
  .set({ operation: 'imul', operand1: 'm32' }, { opCode: 'F7', modRmByte: '5' })
  .set({ operation: 'imul', operand1: 'r16', operand2: 'r16' }, { opCode: '0FAF' })
  .set({ operation: 'imul', operand1: 'r16', operand2: 'm16' }, { opCode: '0FAF' })
  .set({ operation: 'imul', operand1: 'r32', operand2: 'r32' }, { opCode: '0FAF' })
  .set({ operation: 'imul', operand1: 'r32', operand2: 'm32' }, { opCode: '0FAF' });

export const IMUL: AsmFunction = {
  generateMachineCode: (op1?: string, op2?: string, ptrType?: PtrType) => {
    return generateCode(op1, op2, 'imul', ptrType, IMUL_TABLE);
  },
};
