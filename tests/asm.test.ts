import {suite, test} from '@testdeck/mocha';
import * as _chai from 'chai';
import {Assembler} from '../src/asm';

_chai.should();

@suite
class AsmTest {

    before() {

    }

    @test 'testRMByte'() {
        // console.log(ADD.generateMachineCode('al', '12'));
    }

    @test 'test pratical example'() {
        const ins = JSON.parse("[{\"operand1\":\"AL\",\"operand2\":\"00\",\"operation\":\"MOV\"},{\"operand1\":\"SI\",\"operand2\":\"0027\",\"operation\":\"MOV\"},{\"operand1\":\"[SI]\",\"operand2\":\"AL\",\"operation\":\"MOV\",\"ptrType\":\"dword\"},{\"operand1\":\"SI\",\"operand2\":\"01\",\"operation\":\"ADD\"},{\"operand1\":\"AL\",\"operand2\":\"01\",\"operation\":\"ADD\"},{\"operand1\":\"[SI]\",\"operand2\":\"AL\",\"operation\":\"MOV\",\"ptrType\":\"dword\"},{\"operand1\":\"CX\",\"operand2\":\"0008\",\"operation\":\"MOV\"},{\"operand1\":\"CX\",\"operand2\":\"0002\",\"operation\":\"SUB\"},{\"label\":\"L1\",\"operand1\":\"AL\",\"operand2\":\"[SI-1]\",\"operation\":\"MOV\",\"ptrType\":\"dword\"},{\"operand1\":\"AL\",\"operand2\":\"[SI]\",\"operation\":\"ADD\",\"ptrType\":\"dword\"},{\"operand1\":\"SI\",\"operand2\":\"01\",\"operation\":\"ADD\"},{\"operand1\":\"[SI]\",\"operand2\":\"AL\",\"operation\":\"MOV\",\"ptrType\":\"dword\"},{\"operand1\":\"L1\",\"operation\":\"LOOP\"}]");
        const s = Assembler.getMachineCode(ins);
        s.should.equal('B00066BE27006788046683C601040167880466B908006681E90200678A44FF6702046683C601678804E2F0');
    }

}
