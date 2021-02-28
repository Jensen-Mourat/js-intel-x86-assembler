import { ErrorHandler } from '../errorHandler';
import { EightBitRegisters, SixteenBitRegisters, ThirtyTwoBitRegisters } from '../constants/registers';

export type checkTypes = 'must-be-present' | 'must-be-register';
export const checkOp = (op: string | undefined, type: checkTypes[], position?: 1 | 2) => {
  return type.some((t) => {
    switch (t) {
      case 'must-be-present':
        if (!op) {
          if (position !== 1) {
            ErrorHandler.handleError(1);
            return false;
          }
          ErrorHandler.handleError(0);
          return false;
        }
        return true;
      case 'must-be-register':
        const operand = op?.replace('[', '').replace(']', '');
        if (
          !EightBitRegisters.has(operand!) ||
          !SixteenBitRegisters.has(operand!) ||
          !ThirtyTwoBitRegisters.has(operand!)
        ) {
          ErrorHandler.handleError(3);
          return false;
        }
        return true;
    }
  });
};
