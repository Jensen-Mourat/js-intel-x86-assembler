import {AsmFunction} from './constants/AsmFunctions';
import {ADD} from './constants/AsmFunctions/ADD';

export class _Assembler {
    private OpTable = new Map<string, AsmFunction>();

    constructor() {
        this.generateTable();
    }

    private generateTable() {
        //Add
        this.OpTable.set('add', ADD);
    }

    private getMachineCode(s:string){
        const ins = s.split(' ')[0];
    }
}

export const Assembler = new _Assembler();

