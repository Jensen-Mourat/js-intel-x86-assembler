import { AsmFunction, InstructionStructure, PtrType } from './index';
import { HashMap } from '../../helper/hashMap';
import {generateCode} from '../../functions/generateCode';
import {OpCode} from '../interfaces';

const SAL_TABLE = new HashMap<InstructionStructure, OpCode>()
  .set({ operation: 'sal', operand1: 'r8', operand2: 'cl' }, { opCode: 'D2', modRmByte: '4' })
  .set({ operation: 'sal', operand1: 'm8', operand2: 'cl' }, { opCode: 'D2', modRmByte: '4' })
  .set({ operation: 'sal', operand1: 'r8', operand2: 'imm8' }, { opCode: 'C0', modRmByte: '4', length: 'b' })
  .set({ operation: 'sal', operand1: 'm8', operand2: 'imm8' }, { opCode: 'C0', modRmByte: '4', length: 'b' })
  .set({ operation: 'sal', operand1: 'r16', operand2: 'cl' }, { opCode: 'D3', modRmByte: '4' })
  .set({ operation: 'sal', operand1: 'm16', operand2: 'cl' }, { opCode: 'D3', modRmByte: '4' })
  .set({ operation: 'sal', operand1: 'r16', operand2: 'imm8' }, { opCode: 'C1', modRmByte: '4', length: 'b' })
  .set({ operation: 'sal', operand1: 'm16', operand2: 'imm8' }, { opCode: 'C1', modRmByte: '4', length: 'b' })
  .set({ operation: 'sal', operand1: 'r32', operand2: 'cl' }, { opCode: 'D3', modRmByte: '4' })
  .set({ operation: 'sal', operand1: 'm32', operand2: 'cl' }, { opCode: 'D3', modRmByte: '4' })
  .set({ operation: 'sal', operand1: 'r32', operand2: 'imm8' }, { opCode: 'C1', modRmByte: '4', length: 'b' })
  .set({ operation: 'sal', operand1: 'm32', operand2: 'imm8' }, { opCode: 'C1', modRmByte: '4', length: 'b' });

export const SAL: AsmFunction = {
  generateMachineCode: (op1?: string, op2?: string, ptrType?: PtrType) => {
    return generateCode(op1, op2, 'sal', ptrType, SAL_TABLE);
  },
};
