import { HashMap } from '../../helper/hashMap';
import {AsmFunction, InstructionStructure, PtrType} from './index';
import {generateCode} from '../../functions/generateCode';
import {OpCode} from '../interfaces';

const LOOP_TABLE = new HashMap<InstructionStructure, OpCode>().set(
  { operation: 'loop', operand1: 'imm8' },
  { opCode: 'E2', length: 'b' },
);
// .set({ operation: 'loop', operand1: 'ax', operand2: 'imm16' }, { opCode: '25', length: 'w' })
// .set({ operation: 'loop', operand1: 'eax', operand2: 'imm32' }, { opCode: '25', length: 'd' });

export const LOOP: AsmFunction = {
  generateMachineCode: (op1?: string, op2?: string, ptrType?: PtrType) => {
    return generateCode(op1, op2, 'loop', ptrType, LOOP_TABLE);
  },
};
