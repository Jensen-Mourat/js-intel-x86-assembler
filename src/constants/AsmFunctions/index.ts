import { operandType } from '../../functions/getTypes';

export interface AsmFunction {
  generateMachineCode(op1?: string, op2?: string, ptrType?: PtrType): string;
}

export type PtrType = 'byte' | 'word' | 'dword';

export interface InstructionStructure {
  operation: string;
  operand1?: operandType;
  operand2?: operandType;
}
