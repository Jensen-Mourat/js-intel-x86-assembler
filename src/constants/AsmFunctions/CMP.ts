import { OpCode } from './ADD.new';
import { AsmFunction, InstructionStructure, ptrType } from './index';
import { generateCode } from './ADD.new';
import { HashMap } from '../../helper/hashMap';

const CMP_TABLE = new HashMap<InstructionStructure, OpCode>()
  .set({ operation: 'cmp', operand1: 'al', operand2: 'imm8' }, { opCode: '3C', length: 'b' })
  .set({ operation: 'cmp', operand1: 'ax', operand2: 'imm16' }, { opCode: '3D', length: 'w' })
  .set({ operation: 'cmp', operand1: 'eax', operand2: 'imm32' }, { opCode: '3D', length: 'd' })
  .set({ operation: 'cmp', operand1: 'r8', operand2: 'imm8' }, { opCode: '80', length: 'b', modRmByte: '7' })
  .set({ operation: 'cmp', operand1: 'm8', operand2: 'imm8' }, { opCode: '80', length: 'b', modRmByte: '7' })
  .set({ operation: 'cmp', operand1: 'r16', operand2: 'imm16' }, { opCode: '81', length: 'w', modRmByte: '7' })
  .set({ operation: 'cmp', operand1: 'm16', operand2: 'imm16' }, { opCode: '81', length: 'w', modRmByte: '7' })
  .set({ operation: 'cmp', operand1: 'r32', operand2: 'imm16' }, { opCode: '81', length: 'd', modRmByte: '7' })
  .set({ operation: 'cmp', operand1: 'm32', operand2: 'imm16' }, { opCode: '81', length: 'd', modRmByte: '7' })
  .set({ operation: 'cmp', operand1: 'r16', operand2: 'imm8' }, { opCode: '83', length: 'b', modRmByte: '7' })
  .set({ operation: 'cmp', operand1: 'm16', operand2: 'imm8' }, { opCode: '83', length: 'b', modRmByte: '7' })
  .set({ operation: 'cmp', operand1: 'r32', operand2: 'imm8' }, { opCode: '83', length: 'b', modRmByte: '7' })
  .set({ operation: 'cmp', operand1: 'm32', operand2: 'imm8' }, { opCode: '83', length: 'b', modRmByte: '7' })
  .set({ operation: 'cmp', operand1: 'r8', operand2: 'r8' }, { opCode: '38' })
  .set({ operation: 'cmp', operand1: 'm8', operand2: 'r8' }, { opCode: '38' })
  .set({ operation: 'cmp', operand1: 'r16', operand2: 'r16' }, { opCode: '39' })
  .set({ operation: 'cmp', operand1: 'm16', operand2: 'r16' }, { opCode: '39' })
  .set({ operation: 'cmp', operand1: 'r32', operand2: 'r32' }, { opCode: '39' })
  .set({ operation: 'cmp', operand1: 'm32', operand2: 'r32' }, { opCode: '39' })
  .set({ operation: 'cmp', operand1: 'r8', operand2: 'r8' }, { opCode: '3A' })
  .set({ operation: 'cmp', operand1: 'r8', operand2: 'm8' }, { opCode: '3A' })
  .set({ operation: 'cmp', operand1: 'r16', operand2: 'r16' }, { opCode: '3B' })
  .set({ operation: 'cmp', operand1: 'r16', operand2: 'm16' }, { opCode: '3B' })
  .set({ operation: 'cmp', operand1: 'r32', operand2: 'r32' }, { opCode: '3B' })
  .set({ operation: 'cmp', operand1: 'r32', operand2: 'm32' }, { opCode: '3B' });

export const CMP: AsmFunction = {
  generateMachineCode: (op1?: string, op2?: string, ptrType?: ptrType) => {
    return generateCode(op1, op2, 'cmp', ptrType, [2], CMP_TABLE);
  },
};
