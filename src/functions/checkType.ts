import {checkOp} from './checkOperand';
import {EightBitRegisters, SixteenBitRegisters, ThirtyTwoBitRegisters} from '../constants/registers';

export const checkType = (op: string): OperandTypes => {
    if (checkOp(op, ['must-be-register'])) {
       if(EightBitRegisters.has(op)){
           return '8bitR'
       }
       if(SixteenBitRegisters.has(op)){
           return '16bitR'
       }
       if(ThirtyTwoBitRegisters.has(op)){
           return '32bitR'
       }
       const withoutBrackets = op.replace('[', '').replace(']', '');
        if(EightBitRegisters.has(withoutBrackets)){
            return '8bitPtrR'
        }
        if(SixteenBitRegisters.has(withoutBrackets)){
            return '16bitPtrR'
        }
        if(ThirtyTwoBitRegisters.has(withoutBrackets)){
            return '32bitPtrR'
        }
    }
    if(op.includes('[')){
        return length(op.replace('[', '').replace(']', '')) + 'PtrH' as OperandTypes
    }
    return length(op) + 'H' as OperandTypes;
};

const length = (s:string) => {
    if(s.length <= 2) {
        return '8bit'
    }
    if(s.length <=4){
        return '16bit'
    }
    if(s.length <=8){
        return '32bit'
    }
}
export type OperandTypes =
    '8bitH'
    | '16bitH'
    | '32bitH'
    | '8bitR'
    | '16bitR'
    | '32bitR'
    | '8bitPtrH'
    | '16bitPtrH'
    | '32bitPtrH'
    | '8bitPtrR'
    | '16bitPtrR'
    | '32bitPtrR'
