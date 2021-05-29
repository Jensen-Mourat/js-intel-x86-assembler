import { AsmFunction, InstructionStructure, PtrType } from './index';
import { HashMap } from '../../helper/hashMap';
import {generateCode} from '../../functions/generateCode';
import {OpCode} from '../interfaces';

const MUL_TABLE = new HashMap<InstructionStructure, OpCode>()
  .set({ operation: 'mul', operand1: 'r8' }, { opCode: 'F6', modRmByte: '4' })
  .set({ operation: 'mul', operand1: 'm8' }, { opCode: 'F6', modRmByte: '4' })
  .set({ operation: 'mul', operand1: 'r16' }, { opCode: 'F7', modRmByte: '4' })
  .set({ operation: 'mul', operand1: 'm16' }, { opCode: 'F7', modRmByte: '4' })
  .set({ operation: 'mul', operand1: 'r32' }, { opCode: 'F7', modRmByte: '4' })
  .set({ operation: 'mul', operand1: 'm32' }, { opCode: 'F7', modRmByte: '4' });

export const MUL: AsmFunction = {
  generateMachineCode: (op1?: string, op2?: string, ptrType?: PtrType) => {
    return generateCode(op1, op2, 'mul', ptrType, MUL_TABLE);
  },
};
