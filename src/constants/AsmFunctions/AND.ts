import { AsmFunction, InstructionStructure, PtrType } from './index';
import { HashMap } from '../../helper/hashMap';
import {generateCode} from '../../functions/generateCode';
import {OpCode} from '../interfaces';

const AND_TABLE = new HashMap<InstructionStructure, OpCode>()
  .set({ operation: 'and', operand1: 'al', operand2: 'imm8' }, { opCode: '24', length: 'b' })
  .set({ operation: 'and', operand1: 'ax', operand2: 'imm16' }, { opCode: '25', length: 'w' })
  .set({ operation: 'and', operand1: 'eax', operand2: 'imm32' }, { opCode: '25', length: 'd' })
  .set({ operation: 'and', operand1: 'r8', operand2: 'imm8' }, { opCode: '80', length: 'b', modRmByte: '4' })
  .set({ operation: 'and', operand1: 'm8', operand2: 'imm8' }, { opCode: '80', length: 'b', modRmByte: '4' })
  .set({ operation: 'and', operand1: 'r16', operand2: 'imm16' }, { opCode: '81', length: 'w', modRmByte: '4' })
  .set({ operation: 'and', operand1: 'm16', operand2: 'imm16' }, { opCode: '81', length: 'w', modRmByte: '4' })
  .set({ operation: 'and', operand1: 'r32', operand2: 'imm32' }, { opCode: '81', length: 'd', modRmByte: '4' })
  .set({ operation: 'and', operand1: 'm32', operand2: 'imm32' }, { opCode: '81', length: 'd', modRmByte: '4' })
  .set(
    { operation: 'and', operand1: 'r16', operand2: 'imm8' },
    { opCode: '83', length: 'b', modRmByte: '4', isSigned: true },
  )
  .set(
    { operation: 'and', operand1: 'm16', operand2: 'imm8' },
    { opCode: '83', length: 'b', modRmByte: '4', isSigned: true },
  )
  .set(
    { operation: 'and', operand1: 'r32', operand2: 'imm8' },
    { opCode: '83', length: 'b', modRmByte: '4', isSigned: true },
  )
  .set(
    { operation: 'and', operand1: 'm32', operand2: 'imm8' },
    { opCode: '83', length: 'b', modRmByte: '4', isSigned: true },
  )
  .set({ operation: 'and', operand1: 'r8', operand2: 'r8' }, { opCode: '20' })
  .set({ operation: 'and', operand1: 'm8', operand2: 'r8' }, { opCode: '20' })
  .set({ operation: 'and', operand1: 'r16', operand2: 'r16' }, { opCode: '21' })
  .set({ operation: 'and', operand1: 'm16', operand2: 'r16' }, { opCode: '21' })
  .set({ operation: 'and', operand1: 'r32', operand2: 'r32' }, { opCode: '21' })
  .set({ operation: 'and', operand1: 'm32', operand2: 'r32' }, { opCode: '21' })
  .set({ operation: 'and', operand1: 'r8', operand2: 'm8' }, { opCode: '22' })
  .set({ operation: 'and', operand1: 'r16', operand2: 'r16' }, { opCode: '23' })
  .set({ operation: 'and', operand1: 'r16', operand2: 'm16' }, { opCode: '23' })
  .set({ operation: 'and', operand1: 'r32', operand2: 'r32' }, { opCode: '23' })
  .set({ operation: 'and', operand1: 'r32', operand2: 'm32' }, { opCode: '23' });

export const AND: AsmFunction = {
  generateMachineCode: (op1?: string, op2?: string, ptrType?: PtrType) => {
    return generateCode(op1, op2, 'and', ptrType, AND_TABLE);
  },
};
