import {AsmFunction, InstructionStructure, ptrType} from './index';
import {generateCode} from './ADD';
import {HashMap} from '../../helper/hashMap';
const MOV_TABLE = new HashMap<InstructionStructure, string>()
    .set({operation: 'mov', operand1: 'r8', operand2: 'r8'}, '88 /r')
    .set({operation: 'mov', operand1: 'm8', operand2: 'r8'}, '88 /r')
    .set({operation: 'mov', operand1: 'm16', operand2: 'r16'}, '89 /r')
    .set({operation: 'mov', operand1: 'r16', operand2: 'r16'}, '89 /r')
    .set({operation: 'mov', operand1: 'm32', operand2: 'r32'}, '89 /r')
    .set({operation: 'mov', operand1: 'r32', operand2: 'r32'}, '89 /r')
    .set({operation: 'mov', operand1: 'r8', operand2: 'm8'}, '8A /r')
    .set({operation: 'mov', operand1: 'r8', operand2: 'r8'}, '8A /r')
    .set({operation: 'mov', operand1: 'r16', operand2: 'r16'}, '8B /r')
    .set({operation: 'mov', operand1: 'r16', operand2: 'm16'}, '8B /r')
    .set({operation: 'mov', operand1: 'r32', operand2: 'r32'}, '8B /r')
    .set({operation: 'mov', operand1: 'r32', operand2: 'm32'}, '8B /r')

export const MOV: AsmFunction = {
    generateMachineCode: (op1?: string, op2?: string, ptrType?: ptrType) => {
        return generateCode(op1, op2,'mov', ptrType, [2], MOV_TABLE);
    }
};
