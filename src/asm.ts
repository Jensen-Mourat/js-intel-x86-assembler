import {AsmFunction, InstructionStructure, PtrType} from './constants/AsmFunctions';
import {ADD} from './constants/AsmFunctions/ADD';
import {MOV} from './constants/AsmFunctions/MOV';
import {rotate} from './functions/rotate';
import {makeValueToByte} from './functions/makeValueToByte';
import {convertToTwosComp} from './functions/twosComplement';
import {ADC} from './constants/AsmFunctions/ADC';
import {RCR} from './constants/AsmFunctions/RCR';
import {RET} from './constants/AsmFunctions/RET';
import {DEC} from './constants/AsmFunctions/DEC';
import {OR} from './constants/AsmFunctions/OR';
import {MUL} from './constants/AsmFunctions/MUL';
import {SAR} from './constants/AsmFunctions/SAR';
import {CMP} from './constants/AsmFunctions/CMP';
import {IDIV} from './constants/AsmFunctions/IDIV';
import {INT} from './constants/AsmFunctions/INT';
import {ROL} from './constants/AsmFunctions/ROL';
import {DIV} from './constants/AsmFunctions/DIV';
import {NEG} from './constants/AsmFunctions/NEG';
import {NOT} from './constants/AsmFunctions/NOT';
import {ROR} from './constants/AsmFunctions/ROR';
import {SHL} from './constants/AsmFunctions/SHL';
import {AND} from './constants/AsmFunctions/AND';
import {IMUL} from './constants/AsmFunctions/IMUL';
import {IRET} from './constants/AsmFunctions/IRET';
import {RCL} from './constants/AsmFunctions/RCL';
import {SHR} from './constants/AsmFunctions/SHR';
import {INC} from './constants/AsmFunctions/INC';
import {SAL} from './constants/AsmFunctions/SAL';
import {SUB} from './constants/AsmFunctions/SUB';
import {LOOP} from './constants/AsmFunctions/LOOP';

export class _Assembler {
    private OpTable = new Map<string, AsmFunction>();
    private DEFAULT_JUMP_SIZE: 2 | 4 | 8 = 8;
    // jcx not added yet
    private jumpMap = new Map<string,
        {
            length: 1 | 2; // length of opCode in byte
            jumpSize: 2 | 4 | 8; // string length of jump value
        }>()
        .set('jmp', {length: 1, jumpSize: this.DEFAULT_JUMP_SIZE})
        .set('jcx', {length: 2, jumpSize: this.DEFAULT_JUMP_SIZE})
        .set('ja', {length: 2, jumpSize: this.DEFAULT_JUMP_SIZE})
        .set('jae', {length: 2, jumpSize: this.DEFAULT_JUMP_SIZE})
        .set('jb', {length: 2, jumpSize: this.DEFAULT_JUMP_SIZE})
        .set('jbe', {length: 2, jumpSize: this.DEFAULT_JUMP_SIZE})
        .set('jc', {length: 2, jumpSize: this.DEFAULT_JUMP_SIZE})
        .set('je', {length: 2, jumpSize: this.DEFAULT_JUMP_SIZE})
        .set('jg', {length: 2, jumpSize: this.DEFAULT_JUMP_SIZE})
        .set('jge', {length: 2, jumpSize: this.DEFAULT_JUMP_SIZE})
        .set('jl', {length: 2, jumpSize: this.DEFAULT_JUMP_SIZE})
        .set('jle', {length: 2, jumpSize: this.DEFAULT_JUMP_SIZE})
        .set('jna', {length: 2, jumpSize: this.DEFAULT_JUMP_SIZE})
        .set('jnae', {length: 2, jumpSize: this.DEFAULT_JUMP_SIZE})
        .set('jnb', {length: 2, jumpSize: this.DEFAULT_JUMP_SIZE})
        .set('jnbe', {length: 2, jumpSize: this.DEFAULT_JUMP_SIZE})
        .set('jnc', {length: 2, jumpSize: this.DEFAULT_JUMP_SIZE})
        .set('jne', {length: 2, jumpSize: this.DEFAULT_JUMP_SIZE})
        .set('jng', {length: 2, jumpSize: this.DEFAULT_JUMP_SIZE})
        .set('jnge', {length: 2, jumpSize: this.DEFAULT_JUMP_SIZE})
        .set('jnl', {length: 2, jumpSize: this.DEFAULT_JUMP_SIZE})
        .set('jnle', {length: 2, jumpSize: this.DEFAULT_JUMP_SIZE})
        .set('jno', {length: 2, jumpSize: this.DEFAULT_JUMP_SIZE})
        .set('jnp', {length: 2, jumpSize: this.DEFAULT_JUMP_SIZE})
        .set('jns', {length: 2, jumpSize: this.DEFAULT_JUMP_SIZE})
        .set('jnz', {length: 2, jumpSize: this.DEFAULT_JUMP_SIZE})
        .set('jo', {length: 2, jumpSize: this.DEFAULT_JUMP_SIZE})
        .set('jpe', {length: 2, jumpSize: this.DEFAULT_JUMP_SIZE})
        .set('jpo', {length: 2, jumpSize: this.DEFAULT_JUMP_SIZE})
        .set('js', {length: 2, jumpSize: this.DEFAULT_JUMP_SIZE})
        .set('jz', {length: 2, jumpSize: this.DEFAULT_JUMP_SIZE})
        .set('loop', {length: 1, jumpSize: 2});

    constructor() {
        this.generateTable();
    }

    private generateTable() {
        this.OpTable.set('add', ADD);
        this.OpTable.set('sub', SUB);
        this.OpTable.set('mov', MOV);
        this.OpTable.set('adc', ADC);
        this.OpTable.set('and', AND);
        this.OpTable.set('cmp', CMP);
        this.OpTable.set('dec', DEC);
        this.OpTable.set('div', DIV);
        this.OpTable.set('idiv', IDIV);
        this.OpTable.set('imul', IMUL);
        this.OpTable.set('inc', INC);
        this.OpTable.set('int', INT);
        this.OpTable.set('iret', IRET);
        this.OpTable.set('loop', LOOP);
        this.OpTable.set('mul', MUL);
        this.OpTable.set('neg', NEG);
        this.OpTable.set('not', NOT);
        this.OpTable.set('or', OR);
        this.OpTable.set('rcl', RCL);
        this.OpTable.set('rcr', RCR);
        this.OpTable.set('ret', RET);
        this.OpTable.set('rol', ROL);
        this.OpTable.set('ror', ROR);
        this.OpTable.set('sal', SAL);
        this.OpTable.set('sar', SAR);
        this.OpTable.set('shl', SHL);
        this.OpTable.set('shr', SHR);
    }

    getMachineCode(instructions: Instruction[]): string {
        let code = '';
        const offset = 0;
        const labels = new Map<string, number>(); // key = name, val = position
        const unresolvedJumps = new Map<string, { position: number; jumpSize: 2 | 4 | 8; length: number }>();

        instructions.forEach((ins) => {
            const operation = ins.operation?.toLowerCase();
            if (this.jumpMap.has(operation!)) {
                const jumpIns = this.jumpMap.get(operation)!;
                // assuming only relative jump
                const labelPos = labels.get(ins.operand1!); // get label position
                if (labelPos !== undefined) {
                    const currentPosition = this.getPostion(code.length);
                    const relativePosition: number = currentPosition - labelPos + (jumpIns.jumpSize / 2 + jumpIns.length);
                    const relativePositionHex = relativePosition.toString(16);
                    const complement = convertToTwosComp(relativePositionHex, jumpIns.jumpSize);
                    code += this.getJmpOp(operation) + rotate(complement);
                } else {
                    const position = code.length;
                    code += this.getJmpOp(operation) + '00000000'.substr(0, jumpIns.jumpSize);
                    unresolvedJumps.set(ins.operand1!, {position, ...jumpIns});
                }
            } else {
                const asmFn = this.OpTable.get(operation!.toLowerCase());
                if (asmFn) {
                    if (ins.label) {
                        if (labels.get(ins.label)) {
                            throw new Error('duplicate label!');
                        } else {
                            labels.set(ins.label, this.getPostion(code.length));
                            const unresolvedLabel = unresolvedJumps.get(ins.label);
                            if (unresolvedLabel) {
                                // handle unresolved jumps
                                const unresolvedLabelPos = unresolvedLabel.position;
                                const currentPos = this.getPostion(code.length);
                                const jumPos =
                                    this.getPostion(unresolvedLabelPos) + (unresolvedLabel.jumpSize / 2 + unresolvedLabel.length);
                                const difference = currentPos - jumPos;
                                const hexVal = rotate(makeValueToByte(difference.toString(16).toUpperCase(), unresolvedLabel.jumpSize));
                                code =
                                    code.substring(0, unresolvedLabelPos + 2 + (unresolvedLabel.length === 1 ? 0 : 2)) +
                                    hexVal +
                                    code.substring(unresolvedLabelPos + 10 + (unresolvedLabel.length === 1 ? 0 : 2));
                                unresolvedJumps.delete(ins.label);
                            }
                        }
                    }
                    const machineCode = asmFn.generateMachineCode(
                        ins.operand1?.toLowerCase(),
                        ins.operand2?.toLowerCase(),
                        ins.ptrType,
                    );
                    code += machineCode;
                } else {
                    throw new Error(operation?.toLowerCase() + ' is not a recognised instruction');
                }
            }
        });
        if (unresolvedJumps.size > 0) {
            throw new Error('There are unresolved jumps, check your labels' +
                '');
        }
        return code;
    }

    private getJmpOp(operation: string | undefined) {
        switch (operation) {
            case 'jmp':
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
            case 'loop':
                return 'E2';
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
    operation: string;
    ptrType?: PtrType;
    operand1?: string;
    operand2?: string;
}

export const Assembler = new _Assembler();
