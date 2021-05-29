import { AsmFunction, InstructionStructure, PtrType } from './index';
import { HashMap } from '../../helper/hashMap';
import {generateCode} from '../../functions/generateCode';
import {OpCode} from '../interfaces';

const ADC_TABLE = new HashMap<InstructionStructure, OpCode>()
  .set({ operation: 'adc', operand1: 'al', operand2: 'imm8' }, { opCode: '14', length: 'b' })
  .set({ operation: 'adc', operand1: 'ax', operand2: 'imm16' }, { opCode: '15', length: 'w' })
  .set({ operation: 'adc', operand1: 'eax', operand2: 'imm32' }, { opCode: '15', length: 'd' })
  .set({ operation: 'adc', operand1: 'r8', operand2: 'imm8' }, { opCode: '80', length: 'b', modRmByte: '2' })
  .set({ operation: 'adc', operand1: 'm8', operand2: 'imm8' }, { opCode: '80', length: 'b', modRmByte: '2' })
  .set({ operation: 'adc', operand1: 'r16', operand2: 'imm16' }, { opCode: '81', length: 'w', modRmByte: '2' })
  .set({ operation: 'adc', operand1: 'm16', operand2: 'imm16' }, { opCode: '81', length: 'w', modRmByte: '2' })
  .set({ operation: 'adc', operand1: 'r32', operand2: 'imm32' }, { opCode: '81', length: 'd', modRmByte: '2' })
  .set({ operation: 'adc', operand1: 'm32', operand2: 'imm32' }, { opCode: '81', length: 'd', modRmByte: '2' })
  .set(
    { operation: 'adc', operand1: 'r16', operand2: 'imm8' },
    { opCode: '83', length: 'b', modRmByte: '2', isSigned: true },
  )
  .set(
    { operation: 'adc', operand1: 'm16', operand2: 'imm8' },
    { opCode: '83', length: 'b', modRmByte: '2', isSigned: true },
  )
  .set(
    { operation: 'adc', operand1: 'r32', operand2: 'imm8' },
    { opCode: '83', length: 'b', modRmByte: '2', isSigned: true },
  )
  .set(
    { operation: 'adc', operand1: 'm32', operand2: 'imm8' },
    { opCode: '83', length: 'b', modRmByte: '2', isSigned: true },
  )
  .set({ operation: 'adc', operand1: 'r8', operand2: 'r8' }, { opCode: '10' })
  .set({ operation: 'adc', operand1: 'm8', operand2: 'r8' }, { opCode: '10' })
  .set({ operation: 'adc', operand1: 'r16', operand2: 'r16' }, { opCode: '11' })
  .set({ operation: 'adc', operand1: 'm16', operand2: 'r16' }, { opCode: '11' })
  .set({ operation: 'adc', operand1: 'r32', operand2: 'r32' }, { opCode: '11' })
  .set({ operation: 'adc', operand1: 'm32', operand2: 'r32' }, { opCode: '11' })
  .set({ operation: 'adc', operand1: 'r8', operand2: 'm8' }, { opCode: '12' })
  .set({ operation: 'adc', operand1: 'r16', operand2: 'r16' }, { opCode: '13' })
  .set({ operation: 'adc', operand1: 'r16', operand2: 'm16' }, { opCode: '13' })
  .set({ operation: 'adc', operand1: 'r32', operand2: 'r32' }, { opCode: '13' })
  .set({ operation: 'adc', operand1: 'r32', operand2: 'm32' }, { opCode: '13' });

export const ADC: AsmFunction = {
  generateMachineCode: (op1?: string, op2?: string, ptrType?: PtrType) => {
    return generateCode(op1, op2, 'adc', ptrType, ADC_TABLE);
  },
};
