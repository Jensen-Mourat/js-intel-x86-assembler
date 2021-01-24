import {AsmFunction} from './index';
import {checkOp} from '../../functions/checkOperand';
import {checkType} from '../../functions/checkType';
import {rotate} from '../../functions/rotate';


export const ADD: AsmFunction = {
    generateMachineCode: (op1?: string, op2?: string) => {
        const c1 = checkOp(op1, ['must-be-present', 'must-be-register'], 1);
        const c2 = checkOp(op2, ['must-be-present'], 2);
        if (c1 && c2) { // input valid
            const operand1 = op1!;
            const operand2 = op2!;
            const op2String = () => rotate(operand2).toLocaleUpperCase();
            const op2Type = checkType(operand2);
            const op1Type = checkType(operand1);
            // const getValueFromTable = () => Table.getValueFromTable(operand1, '0');
            if (operand1 === 'al') {
                if (op2Type === '8bitH') {
                    return '04' + op2String();
                }
            }
            if (operand1 === 'eax') {
                if (op2Type === '32bitH') {
                    return '05' + op2String();
                }
            }
            if (operand1 === 'ax') {
                if (op2Type === '16bitH') {
                    return '6605' + op2String();
                }
            }
            if (op1Type === '8bitR') {
                if (op2Type === '8bitH') {
                    return '80' + getValueFromTable() + op2String();
                }
            }
            if (op1Type === '16bitR') {
                if (op2Type === '16bitH') {
                    return '6681' + getValueFromTable() + op2String();
                }
            }
            if (op1Type === '32bitR') {
                if (op2Type === '32bitH') {
                    return '81' + getValueFromTable() + op2String();
                }
            }
            if (op1Type) {
                return '';
            }

        }
        return 'error';


        //check if byte

        // if (c1 && c2) {
        //     let code = '';
        //
        //     if(EightBitRegisters.has(operand1)){ // special case of al
        //         if(operand1 === 'al'){
        //             if(EightBitRegisters.has(operand2)){
        //               const value = Table.getValueFromTable(operand1, operand2);
        //               code = '00' +  value;
        //             }
        //             else {
        //                 if(operand2.length == 2){
        //                     code  = '04' + operand2.toUpperCase();
        //                 } else {
        //                     ErrorHandler.handleError(4)
        //                     return 'error';
        //                 }
        //             }
        //         }
        //         if(operand1 === 'eax'){ // special case of eax
        //            if(!SixteenBitRegisters.has(16))
        //         }
        //     }
        //     return code;
        // }
        // return 'error';
    }
};
