import { AsmFunction, InstructionStructure, PtrType } from './index';
import { HashMap } from '../../helper/hashMap';
import {generateCode} from '../../functions/generateCode';
import {OpCode} from '../interfaces';

const IDIV_TABLE = new HashMap<InstructionStructure, OpCode>()
  .set({ operation: 'idiv', operand1: 'r8' }, { opCode: 'F6', modRmByte: '7' })
  .set({ operation: 'idiv', operand1: 'm8' }, { opCode: 'F6', modRmByte: '7' })
  .set({ operation: 'idiv', operand1: 'r16' }, { opCode: 'F7', modRmByte: '7' })
  .set({ operation: 'idiv', operand1: 'm16' }, { opCode: 'F7', modRmByte: '7' })
  .set({ operation: 'idiv', operand1: 'r32' }, { opCode: 'F7', modRmByte: '7' })
  .set({ operation: 'idiv', operand1: 'm32' }, { opCode: 'F7', modRmByte: '7' });

export const IDIV: AsmFunction = {
  generateMachineCode: (op1?: string, op2?: string, ptrType?: PtrType) => {
    return generateCode(op1, op2, 'idiv', ptrType, IDIV_TABLE);
  },
};
