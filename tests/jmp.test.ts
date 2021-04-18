import {suite, test} from '@testdeck/mocha';
import * as _chai from 'chai';
import {PARAMETERS} from './parameters';
import {MOV} from '../src/constants/AsmFunctions/backup/MOV';
import {Assembler} from '../src/asm';
import {convertToTwosComp} from '../src/functions/twosComplement';

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
            {label: 'm1', operation: 'add', operand1: 'eax', operand2: '6'},
            {operation: 'add', operand1: 'eax', operand2: '6'},
            {operation: 'jnz', operand1: 'm1'},
        ]);
        console.log(val);
        val.should.equal('83C00683C00683C0060F85F4FFFFFF');
    }

    @test 'loop'() {
        let val = Assembler.getMachineCode([
            {operation: 'add', operand1: 'eax', operand2: '6'},
            {label: 'm1', operation: 'add', operand1: 'eax', operand2: '6'},
            {operation: 'add', operand1: 'eax', operand2: '6'},
            {operation: 'loop', operand1: 'm1'},
        ]);
        console.log(val);
        val.should.equal('83C00683C00683C006E2F8');
    }
}
