import {AsmFunction, InstructionStructure, ptrType} from './constants/AsmFunctions';
import {ADD, makeValueToByte} from './constants/AsmFunctions/ADD';
import {MOV} from './constants/AsmFunctions/MOV';
import {convertToTwosComp} from './functions/getTypes';
import {rotate} from './functions/rotate';

export class _Assembler {
    private OpTable = new Map<string, AsmFunction>();
    // jcx not added yet
    private jumpSet = new Set(['jmp', 'jcx', 'ja', 'jae', 'jb', 'jbe', 'jc', 'je', 'jg', 'jge', 'jl', 'jle', 'jna', 'jnae', 'jnb', 'jnbe', 'jnc', 'jne', 'jng', 'jnge', 'jnl', 'jnle', 'jno', 'jnp', 'jns', 'jnz', 'jo', 'jpe', 'jpo', 'js', 'jz']);

    constructor() {
        this.generateTable();
    }

    private generateTable() {
        //Add
        this.OpTable.set('add', ADD);
        this.OpTable.set('mov', MOV);
    }

    getMachineCode(instructions: Instruction[]) {
        let code = '';
        let offset = 0;
        const labels = new Map<string, number>(); // key = name, val = position
        const unresolvedJumps = new Map<string, { position: number, is1Byte?: boolean }>();

        instructions.forEach((ins) => {
            if (this.jumpSet.has(ins.operation!)) { // assuming only relative jump
                const labelPos = labels.get(ins.operand1!); // get label position
                if (labelPos !== undefined) {
                    const currentPosition = this.getPostion(code.length);
                    const relativePosition: number = currentPosition - labelPos + (ins.operation! === 'jmp' ? 5 : 6);
                    const relativePositionHex = relativePosition.toString(16);
                    const complement = convertToTwosComp(makeValueToByte(relativePositionHex, 8));
                    code += this.getJmpOp(ins.operation) + rotate(complement);
                } else {
                    const position = code.length;
                    code += this.getJmpOp(ins.operation) + '00000000';
                    unresolvedJumps.set(ins.operand1!, {position, is1Byte: ins.operation === 'jmp'});
                }
            } else {
                const asmFn = this.OpTable.get(ins.operation!);
                if (asmFn) {
                    if (ins.label) {
                        if (labels.get(ins.label)) {
                            throw new Error('duplicate label!');
                        } else {
                            labels.set(ins.label, this.getPostion(code.length));
                            const unresolvedLabel = unresolvedJumps.get(ins.label);
                            if (unresolvedLabel) { // handle unresolved jumps
                                const unresolvedLabelPos = unresolvedLabel.position;
                                const currentPos = this.getPostion(code.length);
                                const jumPos = this.getPostion(unresolvedLabelPos) + (unresolvedLabel.is1Byte ? 5 : 6);
                                const difference = (currentPos - jumPos);
                                const hexVal = rotate(makeValueToByte(difference.toString(16).toUpperCase(), 8));
                                code = code.substring(0, unresolvedLabelPos + 2 + (unresolvedLabel.is1Byte ? 0 : 2)) + hexVal + code.substring(unresolvedLabelPos + 10 + (unresolvedLabel.is1Byte ? 0 : 2));
                                unresolvedJumps.delete(ins.label);
                            }
                        }
                    }
                    const machineCode = asmFn.generateMachineCode(ins.operand1, ins.operand2, ins.ptrType);
                    code += machineCode;
                }
            }
        });
        return code;
    }


    private getJmpOp(operation: string | undefined) {
        switch (operation) {
            case 'jmp' :
                return 'E9';
            case 'ja':
                return '0F87';
            case 'jae':
                return '0F3';
            case 'jb':
                return '0F2';
            case 'jbe':
                return '0F2';
            case 'jc':
                return '0F82';
            case 'je':
                return '0F84';
            case 'jg':
                return '0F8F';
            case 'jge':
                return '0F8D';
            case 'jl':
                return '0F8C';
            case 'jle':
                return '0F8E';
            case 'jna':
                return '0F86';
            case 'jnae':
                return '0F82';
            case 'jnb':
                return '0F83';
            case 'jnbe':
                return '0F87';
            case 'jnc':
                return '0F83';
            case 'jne':
                return '0F85';
            case 'jng':
                return '0F8E';
            case 'jnge':
                return '0F8C';
            case 'jnl':
                return '0F8D';
            case 'jnle':
                return '0F8F';
            case 'jno':
                return '0F81';
            case 'jnp':
                return '0F8B';
            case 'jns':
                return '0F89';
            case 'jnz':
                return '0F85';
            case 'jo':
                return '0F80';
            case 'jpe':
                return '0F8A';
            case 'jpo':
                return '0F8B';
            case 'js':
                return '0F88';
            case 'jz':
                return '0F84';
        }
    }

    private getPostion(codeLength: number) {
        if (codeLength === 0 || codeLength === 2) {
            return 0;
        }
        return codeLength / 2;
    }
}

export interface Instruction {
    label?: string;
    operation?: string;
    ptrType?: ptrType;
    operand1?: string;
    operand2?: string;
}

export const Assembler = new _Assembler();

