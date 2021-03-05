import { OpCode } from './ADD.new';
import { AsmFunction, InstructionStructure, ptrType } from './index';
import { generateCode } from './ADD.new';
import { HashMap } from '../../helper/hashMap';

const OR_TABLE = new HashMap<InstructionStructure, OpCode>()
  .set({ operation: 'or', operand1: 'al', operand2: 'imm8' }, { opCode: '0C', length: 'b' })
  .set({ operation: 'or', operand1: 'ax', operand2: 'imm16' }, { opCode: '0D', length: 'w' })
  .set({ operation: 'or', operand1: 'eax', operand2: 'imm32' }, { opCode: '0D', length: 'd' })
  .set({ operation: 'or', operand1: 'r8', operand2: 'imm8' }, { opCode: '80', length: 'b', modRmByte: '1' })
  .set({ operation: 'or', operand1: 'm8', operand2: 'imm8' }, { opCode: '80', length: 'b', modRmByte: '1' })
  .set({ operation: 'or', operand1: 'r16', operand2: 'imm16' }, { opCode: '81', length: 'w', modRmByte: '1' })
  .set({ operation: 'or', operand1: 'm16', operand2: 'imm16' }, { opCode: '81', length: 'w', modRmByte: '1' })
  .set({ operation: 'or', operand1: 'r32', operand2: 'imm32' }, { opCode: '81', length: 'd', modRmByte: '1' })
  .set({ operation: 'or', operand1: 'm32', operand2: 'imm32' }, { opCode: '81', length: 'd', modRmByte: '1' })
  .set(
    { operation: 'or', operand1: 'r16', operand2: 'imm8' },
    { opCode: '83', length: 'b', modRmByte: '1', isSigned: true },
  )
  .set(
    { operation: 'or', operand1: 'm16', operand2: 'imm8' },
    { opCode: '83', length: 'b', modRmByte: '1', isSigned: true },
  )
  .set(
    { operation: 'or', operand1: 'r32', operand2: 'imm8' },
    { opCode: '83', length: 'b', modRmByte: '1', isSigned: true },
  )
  .set(
    { operation: 'or', operand1: 'm32', operand2: 'imm8' },
    { opCode: '83', length: 'b', modRmByte: '1', isSigned: true },
  )
  .set(
    { operation: 'or', operand1: 'r8', operand2: 'r8' },
    { opCode: '83', length: 'b', modRmByte: '1', isSigned: true },
  )
  .set({ operation: 'or', operand1: 'm8', operand2: 'r8' }, { opCode: '08' })
  .set({ operation: 'or', operand1: 'r16', operand2: 'r16' }, { opCode: '09' })
  .set({ operation: 'or', operand1: 'm16', operand2: 'r16' }, { opCode: '09' })
  .set({ operation: 'or', operand1: 'r32', operand2: 'r32' }, { opCode: '09' })
  .set({ operation: 'or', operand1: 'm32', operand2: 'r32' }, { opCode: '09' })
  .set({ operation: 'or', operand1: 'r8', operand2: 'r8' }, { opCode: '0A' })
  .set({ operation: 'or', operand1: 'r8', operand2: 'm8' }, { opCode: '0A' })
  .set({ operation: 'or', operand1: 'r16', operand2: 'r16' }, { opCode: '0B' })
  .set({ operation: 'or', operand1: 'r16', operand2: 'm16' }, { opCode: '0B' })
  .set({ operation: 'or', operand1: 'r32', operand2: 'r32' }, { opCode: '0B' })
  .set({ operation: 'or', operand1: 'r32', operand2: 'm32' }, { opCode: '0B' });

export const OR: AsmFunction = {
  generateMachineCode: (op1?: string, op2?: string, ptrType?: ptrType) => {
    return generateCode(op1, op2, 'or', ptrType, [2], OR_TABLE);
  },
};
