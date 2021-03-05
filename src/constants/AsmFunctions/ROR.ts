import { OpCode } from './ADD.new';
import { AsmFunction, InstructionStructure, ptrType } from './index';
import { generateCode } from './ADD.new';
import { HashMap } from '../../helper/hashMap';

const ROR_TABLE = new HashMap<InstructionStructure, OpCode>()
  .set({ operation: 'ror', operand1: 'r8', operand2: 'cl' }, { opCode: 'D2', modRmByte: '1' })
  .set({ operation: 'ror', operand1: 'm8', operand2: 'cl' }, { opCode: 'D2', modRmByte: '1' })
  .set({ operation: 'ror', operand1: 'r8', operand2: 'imm8' }, { opCode: 'C0', modRmByte: '1', length: 'b' })
  .set({ operation: 'ror', operand1: 'm8', operand2: 'imm8' }, { opCode: 'C0', modRmByte: '1', length: 'b' })
  .set({ operation: 'ror', operand1: 'r16', operand2: 'cl' }, { opCode: 'D3', modRmByte: '1' })
  .set({ operation: 'ror', operand1: 'm16', operand2: 'cl' }, { opCode: 'D3', modRmByte: '1' })
  .set({ operation: 'ror', operand1: 'r16', operand2: 'imm8' }, { opCode: 'C1', modRmByte: '1', length: 'b' })
  .set({ operation: 'ror', operand1: 'm16', operand2: 'imm8' }, { opCode: 'C1', modRmByte: '1', length: 'b' })
  .set({ operation: 'ror', operand1: 'r32', operand2: 'cl' }, { opCode: 'D3', modRmByte: '1' })
  .set({ operation: 'ror', operand1: 'm32', operand2: 'cl' }, { opCode: 'D3', modRmByte: '1' })
  .set({ operation: 'ror', operand1: 'r32', operand2: 'imm8' }, { opCode: 'C1', modRmByte: '1', length: 'b' })
  .set({ operation: 'ror', operand1: 'm32', operand2: 'imm8' }, { opCode: 'C1', modRmByte: '1', length: 'b' });

export const ROR: AsmFunction = {
  generateMachineCode: (op1?: string, op2?: string, ptrType?: ptrType) => {
    return generateCode(op1, op2, 'ror', ptrType, [2], ROR_TABLE);
  },
};
