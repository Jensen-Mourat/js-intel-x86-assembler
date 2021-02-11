import {suite, test} from '@testdeck/mocha';
import * as _chai from 'chai';
import {PARAMETERS} from './parameters';
import {MOV} from '../src/constants/AsmFunctions/MOV';
import {convertToTwosComp} from '../src/functions/getTypes';
import {Assembler} from '../src/asm';

_chai.should();

@suite
class jmpTest {

    before() {

    }

    @test '2s complement'() {
        console.log('2s', convertToTwosComp('fffffffa'));
    }

    @test 'jump'() {
        let val = Assembler.getMachineCode([
            {operation: 'add', operand1: 'eax', operand2: '6'},
            {operation: 'jnz', operand1: 'm1'},
            {operation: 'add', operand1: 'eax', operand2: '6'},
            {label: 'm1', operation: 'add', operand1: 'eax', operand2: '6'},
        ]);
        console.log(val);
    }
}
