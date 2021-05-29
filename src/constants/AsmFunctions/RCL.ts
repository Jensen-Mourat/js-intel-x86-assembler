import { AsmFunction, InstructionStructure, PtrType } from './index';
import { HashMap } from '../../helper/hashMap';
import {generateCode} from '../../functions/generateCode';
import {OpCode} from '../interfaces';

const RCL_TABLE = new HashMap<InstructionStructure, OpCode>()
  .set({ operation: 'rcl', operand1: 'r8', operand2: 'cl' }, { opCode: 'D2', modRmByte: '2' })
  .set({ operation: 'rcl', operand1: 'm8', operand2: 'cl' }, { opCode: 'D2', modRmByte: '2' })
  .set({ operation: 'rcl', operand1: 'r8', operand2: 'imm8' }, { opCode: 'C0', modRmByte: '2', length: 'b' })
  .set({ operation: 'rcl', operand1: 'm8', operand2: 'imm8' }, { opCode: 'C0', modRmByte: '2', length: 'b' })
  .set({ operation: 'rcl', operand1: 'r16', operand2: 'cl' }, { opCode: 'D3', modRmByte: '2' })
  .set({ operation: 'rcl', operand1: 'm16', operand2: 'cl' }, { opCode: 'D3', modRmByte: '2' })
  .set({ operation: 'rcl', operand1: 'r16', operand2: 'imm8' }, { opCode: 'C1', modRmByte: '2', length: 'b' })
  .set({ operation: 'rcl', operand1: 'm16', operand2: 'imm8' }, { opCode: 'C1', modRmByte: '2', length: 'b' })
  .set({ operation: 'rcl', operand1: 'r32', operand2: 'cl' }, { opCode: 'D3', modRmByte: '2' })
  .set({ operation: 'rcl', operand1: 'm32', operand2: 'cl' }, { opCode: 'D3', modRmByte: '2' })
  .set({ operation: 'rcl', operand1: 'r32', operand2: 'imm8' }, { opCode: 'C1', modRmByte: '2', length: 'b' })
  .set({ operation: 'rcl', operand1: 'm32', operand2: 'imm8' }, { opCode: 'C1', modRmByte: '2', length: 'b' });

export const RCL: AsmFunction = {
  generateMachineCode: (op1?: string, op2?: string, ptrType?: PtrType) => {
    return generateCode(op1, op2, 'rcl', ptrType, RCL_TABLE);
  },
};
