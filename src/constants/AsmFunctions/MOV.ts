import { AsmFunction, InstructionStructure, ptrType } from './index';
import { generateCode } from './ADD.new';
import { HashMap } from '../../helper/hashMap';
import { OpCode } from './ADD.new';

const MOV_TABLE = new HashMap<InstructionStructure, OpCode>()
  .set({ operation: 'mov', operand1: 'r8', operand2: 'r8' }, { opCode: '88' })
  .set({ operation: 'mov', operand1: 'm8', operand2: 'r8' }, { opCode: '88' })
  .set({ operation: 'mov', operand1: 'm16', operand2: 'r16' }, { opCode: '89' })
  .set({ operation: 'mov', operand1: 'r16', operand2: 'r16' }, { opCode: '89' })
  .set({ operation: 'mov', operand1: 'm32', operand2: 'r32' }, { opCode: '89' })
  .set({ operation: 'mov', operand1: 'r32', operand2: 'r32' }, { opCode: '89' })
  .set({ operation: 'mov', operand1: 'r8', operand2: 'm8' }, { opCode: '8A' })
  .set({ operation: 'mov', operand1: 'r16', operand2: 'm16' }, { opCode: '8B' })
  .set({ operation: 'mov', operand1: 'r32', operand2: 'm32' }, { opCode: '8B' })
  .set({ operation: 'mov', operand1: 'r8', operand2: 'imm8' }, { opCode: 'B0', length: 'b', registerCode: 'rb' })
  .set({ operation: 'mov', operand1: 'r16', operand2: 'imm16' }, { opCode: 'B8', length: 'w', registerCode: 'rw' })
  .set({ operation: 'mov', operand1: 'r32', operand2: 'imm32' }, { opCode: 'B8', length: 'd', registerCode: 'rd' })
  .set({ operation: 'mov', operand1: 'm8', operand2: 'imm8' }, { opCode: 'C6', length: 'b', modRmByte: '0' })
  .set({ operation: 'mov', operand1: 'm16', operand2: 'imm16' }, { opCode: 'C7', length: 'w', modRmByte: '0' })
  .set({ operation: 'mov', operand1: 'm32', operand2: 'imm32' }, { opCode: 'C7', length: 'd', modRmByte: '0' });
export const MOV: AsmFunction = {
  generateMachineCode: (op1?: string, op2?: string, ptrType?: ptrType) => {
    return generateCode(op1, op2, 'mov', ptrType, [2], MOV_TABLE);
  },
};
