import { HashMap } from '../../helper/hashMap';
import { AsmFunction, InstructionStructure, PtrType } from './index';
import {generateCode} from '../../functions/generateCode';
import {OpCode} from '../interfaces';

const SAR_TABLE = new HashMap<InstructionStructure, OpCode>()
  .set({ operation: 'sar', operand1: 'r8', operand2: 'cl' }, { opCode: 'D2', modRmByte: '7' })
  .set({ operation: 'sar', operand1: 'm8', operand2: 'cl' }, { opCode: 'D2', modRmByte: '7' })
  .set({ operation: 'sar', operand1: 'r8', operand2: 'imm8' }, { opCode: 'C0', modRmByte: '7', length: 'b' })
  .set({ operation: 'sar', operand1: 'm8', operand2: 'imm8' }, { opCode: 'C0', modRmByte: '7', length: 'b' })
  .set({ operation: 'sar', operand1: 'r16', operand2: 'cl' }, { opCode: 'D3', modRmByte: '7' })
  .set({ operation: 'sar', operand1: 'm16', operand2: 'cl' }, { opCode: 'D3', modRmByte: '7' })
  .set({ operation: 'sar', operand1: 'r16', operand2: 'imm8' }, { opCode: 'C1', modRmByte: '7', length: 'b' })
  .set({ operation: 'sar', operand1: 'm16', operand2: 'imm8' }, { opCode: 'C1', modRmByte: '7', length: 'b' })
  .set({ operation: 'sar', operand1: 'r32', operand2: 'cl' }, { opCode: 'D3', modRmByte: '7' })
  .set({ operation: 'sar', operand1: 'm32', operand2: 'cl' }, { opCode: 'D3', modRmByte: '7' })
  .set({ operation: 'sar', operand1: 'r32', operand2: 'imm8' }, { opCode: 'C1', modRmByte: '7', length: 'b' })
  .set({ operation: 'sar', operand1: 'm32', operand2: 'imm8' }, { opCode: 'C1', modRmByte: '7', length: 'b' });

export const SAR: AsmFunction = {
  generateMachineCode: (op1?: string, op2?: string, ptrType?: PtrType) => {
    return generateCode(op1, op2, 'sar', ptrType, SAR_TABLE);
  },
};
