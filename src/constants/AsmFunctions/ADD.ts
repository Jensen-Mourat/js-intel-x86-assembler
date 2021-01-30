import {AsmFunction, InstructionStructure} from './index';
import {checkOp} from '../../functions/checkOperand';
import {getTypes, operandType} from '../../functions/getTypes';
import {rotate} from '../../functions/rotate';
import {Table} from '32bit-adressing-table-modrm';
import get = Reflect.get;

const ADD_TABLE = new Map<InstructionStructure, string>()
    .set({operation: 'add', operand1: 'al', operand2: 'imm8'}, '04');


export const ADD: AsmFunction = {
    generateMachineCode: (op1?: string, op2?: string) => {
        let opCode = getOpCode(ADD_TABLE, 'add', op1, op2);
        opCode = getPrefix(opCode);
        opCode = getRMByte(opCode);
        return opCode;
    }
};

const getRMByte = (s: string): string => {
    const modRmByte = s.match(new RegExp(/\/(.*)/));
    console.log({modRmByte})
    // if(s.includes('/0')){
    //     Table.getValueFromTable()
    // }
    return '';
}

const getPrefix = (s: string): string=> {
    if(s.includes(' ib')){
        return s.replace(' ib', '');
    }
    if(s.includes(' iw')){
        return '66' + s.replace(' iw', '');
    }
    if(s.includes(' id')){
        return s.replace(' id', '');
    }else {
        return s;
    }
}

const getOpCode = (table: Map<InstructionStructure, string>, ins: string, op1?: string, op2?: string): string => {
    let opCode: string | undefined;
    const operation = ins;
    let operand1: operandType[] | undefined = op1 ? getTypes(op1) : undefined;
    let operand2: operandType[] | undefined = op1 ? getTypes(op1) : undefined;
    if (operand2) {
        operand1?.some(op => {
            return operand2?.map(op2 => {
                const t = table.get({operation, operand1: op, operand2: op2});
                if (t) {
                    opCode = t;
                    return true;
                }
                return false;
            });
        });
    } else if (operand1) {
        operand1?.some(op => {
            const t = table.get({operation, operand1: op});
            if (t) {
                opCode = t;
                return true;
            }
            return false;
        });
    } else {
        const t = table.get({operation});
        opCode = t;
    }
    if (opCode) {
        return opCode;
    }
    throw new Error('Could not find matching opCode');
};
