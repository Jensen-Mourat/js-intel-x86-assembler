import {suite, test} from '@testdeck/mocha';
import * as _chai from 'chai';
import {ADD} from '../src/constants/AsmFunctions/ADD';
import {PARAMETERS} from './parameters';

_chai.should();
const {expect} = _chai;

@suite
class addTest {

    before() {

    }

    @test 'al with second operand as bytes'() {
        ADD.generateMachineCode('al', PARAMETERS.oneByte).should.equal('04' + PARAMETERS.oneByte);
        (() => ADD.generateMachineCode('al', PARAMETERS.twoBytes)).should.throw();
        (() => ADD.generateMachineCode('al', PARAMETERS.fourBytes)).should.throw();
    }

    @test 'ax with second operand as bytes'() {
        ADD.generateMachineCode('ax', PARAMETERS.oneByte).should.equal('6683C0' + PARAMETERS.oneByte);
        ADD.generateMachineCode('ax', PARAMETERS.twoBytes).should.equal('6605' + PARAMETERS.twoBytesRotated);
        (() => ADD.generateMachineCode('ax', PARAMETERS.fourBytes)).should.throw();
    }

    @test 'eax with second operand as bytes'() {
        ADD.generateMachineCode('eax', PARAMETERS.oneByte).should.equal('83C0' + PARAMETERS.oneByte);
        ADD.generateMachineCode('eax', PARAMETERS.twoBytes).should.equal('05' + PARAMETERS.twoBytesRotated + '0000');
        ADD.generateMachineCode('eax', PARAMETERS.fourBytes).should.equal('05' + PARAMETERS.fourBytesRotated);
    }

    @test 'r8 with second operand as bytes'() {
        ADD.generateMachineCode('ah', PARAMETERS.oneByte).should.equal('80C4' + PARAMETERS.oneByte);
        ADD.generateMachineCode('ah', '1').should.equal('80C4' + '01');
        ADD.generateMachineCode('ch', PARAMETERS.oneByte).should.equal('80C5' + PARAMETERS.oneByte);
        ADD.generateMachineCode('dh', PARAMETERS.oneByte).should.equal('80C6' + PARAMETERS.oneByte);
        ADD.generateMachineCode('bh', PARAMETERS.oneByte).should.equal('80C7' + PARAMETERS.oneByte);
        ADD.generateMachineCode('cl', PARAMETERS.oneByte).should.equal('80C1' + PARAMETERS.oneByte);
        ADD.generateMachineCode('dl', PARAMETERS.oneByte).should.equal('80C2' + PARAMETERS.oneByte);
        ADD.generateMachineCode('bl', PARAMETERS.oneByte).should.equal('80C3' + PARAMETERS.oneByte);
        (() => ADD.generateMachineCode('ah', PARAMETERS.twoBytes)).should.throw();
        (() => ADD.generateMachineCode('ch', PARAMETERS.twoBytes)).should.throw();
        (() => ADD.generateMachineCode('dh', PARAMETERS.twoBytes)).should.throw();
        (() => ADD.generateMachineCode('bh', PARAMETERS.twoBytes)).should.throw();
        (() => ADD.generateMachineCode('cl', PARAMETERS.twoBytes)).should.throw();
        (() => ADD.generateMachineCode('dl', PARAMETERS.twoBytes)).should.throw();
        (() => ADD.generateMachineCode('bl', PARAMETERS.twoBytes)).should.throw();
        (() => ADD.generateMachineCode('ah', PARAMETERS.fourBytes)).should.throw();
        (() => ADD.generateMachineCode('ch', PARAMETERS.fourBytes)).should.throw();
        (() => ADD.generateMachineCode('dh', PARAMETERS.fourBytes)).should.throw();
        (() => ADD.generateMachineCode('bh', PARAMETERS.fourBytes)).should.throw();
        (() => ADD.generateMachineCode('cl', PARAMETERS.fourBytes)).should.throw();
        (() => ADD.generateMachineCode('dl', PARAMETERS.fourBytes)).should.throw();
        (() => ADD.generateMachineCode('bl', PARAMETERS.fourBytes)).should.throw();
    }

    @test 'r16 with second operand as bytes'() {
        ADD.generateMachineCode('di', PARAMETERS.oneByte).should.equal('6683C7' + PARAMETERS.oneByte);
        ADD.generateMachineCode('di', '1').should.equal('6683C7' + '01');
        ADD.generateMachineCode('cx', PARAMETERS.oneByte).should.equal('6683C1' + PARAMETERS.oneByte);
        ADD.generateMachineCode('dx', PARAMETERS.oneByte).should.equal('6683C2' + PARAMETERS.oneByte);
        ADD.generateMachineCode('bx', PARAMETERS.oneByte).should.equal('6683C3' + PARAMETERS.oneByte);
        ADD.generateMachineCode('sp', PARAMETERS.oneByte).should.equal('6683C4' + PARAMETERS.oneByte);
        ADD.generateMachineCode('bp', PARAMETERS.oneByte).should.equal('6683C5' + PARAMETERS.oneByte);
        ADD.generateMachineCode('si', PARAMETERS.oneByte).should.equal('6683C6' + PARAMETERS.oneByte);
        ADD.generateMachineCode('di', PARAMETERS.twoBytes).should.equal('6681C7' + PARAMETERS.twoBytesRotated);
        ADD.generateMachineCode('di', '123').should.equal('6681C7' + '2301');
        ADD.generateMachineCode('cx', PARAMETERS.twoBytes).should.equal('6681C1' + PARAMETERS.twoBytesRotated);
        ADD.generateMachineCode('dx', PARAMETERS.twoBytes).should.equal('6681C2' + PARAMETERS.twoBytesRotated);
        ADD.generateMachineCode('bx', PARAMETERS.twoBytes).should.equal('6681C3' + PARAMETERS.twoBytesRotated);
        ADD.generateMachineCode('sp', PARAMETERS.twoBytes).should.equal('6681C4' + PARAMETERS.twoBytesRotated);
        ADD.generateMachineCode('bp', PARAMETERS.twoBytes).should.equal('6681C5' + PARAMETERS.twoBytesRotated);
        ADD.generateMachineCode('si', PARAMETERS.twoBytes).should.equal('6681C6' + PARAMETERS.twoBytesRotated);
        (() => ADD.generateMachineCode('di', PARAMETERS.fourBytes)).should.throw();
        (() => ADD.generateMachineCode('cx', PARAMETERS.fourBytes)).should.throw();
        (() => ADD.generateMachineCode('dx', PARAMETERS.fourBytes)).should.throw();
        (() => ADD.generateMachineCode('bx', PARAMETERS.fourBytes)).should.throw();
        (() => ADD.generateMachineCode('sp', PARAMETERS.fourBytes)).should.throw();
        (() => ADD.generateMachineCode('bp', PARAMETERS.fourBytes)).should.throw();
        (() => ADD.generateMachineCode('si', PARAMETERS.fourBytes)).should.throw();
    }

    @test 'r32 with second operand as bytes'() {
        ADD.generateMachineCode('edi', PARAMETERS.oneByte).should.equal('83C7' + PARAMETERS.oneByte);
        ADD.generateMachineCode('ecx', PARAMETERS.oneByte).should.equal('83C1' + PARAMETERS.oneByte);
        ADD.generateMachineCode('edx', PARAMETERS.oneByte).should.equal('83C2' + PARAMETERS.oneByte);
        ADD.generateMachineCode('ebx', PARAMETERS.oneByte).should.equal('83C3' + PARAMETERS.oneByte);
        ADD.generateMachineCode('esp', PARAMETERS.oneByte).should.equal('83C4' + PARAMETERS.oneByte);
        ADD.generateMachineCode('ebp', PARAMETERS.oneByte).should.equal('83C5' + PARAMETERS.oneByte);
        ADD.generateMachineCode('esi', PARAMETERS.oneByte).should.equal('83C6' + PARAMETERS.oneByte);
        ADD.generateMachineCode('edi', PARAMETERS.twoBytes).should.equal('81C7' + PARAMETERS.twoBytesRotated + '0000');
        ADD.generateMachineCode('ecx', PARAMETERS.twoBytes).should.equal('81C1' + PARAMETERS.twoBytesRotated + '0000');
        ADD.generateMachineCode('edx', PARAMETERS.twoBytes).should.equal('81C2' + PARAMETERS.twoBytesRotated + '0000');
        ADD.generateMachineCode('ebx', PARAMETERS.twoBytes).should.equal('81C3' + PARAMETERS.twoBytesRotated + '0000');
        ADD.generateMachineCode('esp', PARAMETERS.twoBytes).should.equal('81C4' + PARAMETERS.twoBytesRotated + '0000');
        ADD.generateMachineCode('ebp', PARAMETERS.twoBytes).should.equal('81C5' + PARAMETERS.twoBytesRotated + '0000');
        ADD.generateMachineCode('esi', PARAMETERS.twoBytes).should.equal('81C6' + PARAMETERS.twoBytesRotated + '0000');
        ADD.generateMachineCode('ecx', PARAMETERS.fourBytes).should.equal('81C1' + PARAMETERS.fourBytesRotated);
        ADD.generateMachineCode('edx', PARAMETERS.fourBytes).should.equal('81C2' + PARAMETERS.fourBytesRotated);
        ADD.generateMachineCode('ebx', PARAMETERS.fourBytes).should.equal('81C3' + PARAMETERS.fourBytesRotated);
        ADD.generateMachineCode('esp', PARAMETERS.fourBytes).should.equal('81C4' + PARAMETERS.fourBytesRotated);
        ADD.generateMachineCode('ebp', PARAMETERS.fourBytes).should.equal('81C5' + PARAMETERS.fourBytesRotated);
        ADD.generateMachineCode('esi', PARAMETERS.fourBytes).should.equal('81C6' + PARAMETERS.fourBytesRotated);

        //testing with odd bytes
        ADD.generateMachineCode('edi', '1').should.equal('83C7' + '01');
        ADD.generateMachineCode('edi', '123').should.equal('81C7' + '23010000');
        ADD.generateMachineCode('edi', '12345').should.equal('81C7' + '45230100');

    }

    @test 'r8 , second operand r8'() {
        ADD.generateMachineCode('al', 'al').should.equal('00C0');
        ADD.generateMachineCode('bl', 'al').should.equal('00C3');
        ADD.generateMachineCode('cl', 'bl').should.equal('00D9');
        ADD.generateMachineCode('dl', 'cl').should.equal('00CA');
        ADD.generateMachineCode('al', 'cl').should.equal('00C8');
        ADD.generateMachineCode('ah', 'bh').should.equal('00FC');
        ADD.generateMachineCode('bh', 'ch').should.equal('00EF');
        ADD.generateMachineCode('dh', 'ah').should.equal('00E6');
        (() => ADD.generateMachineCode('si', 'ebx')).should.throw();
        (() => ADD.generateMachineCode('al', 'ax')).should.throw();

    }

    @test 'r16 , second operand r'() {
        ADD.generateMachineCode('ax', 'ax').should.equal('6601C0');
        ADD.generateMachineCode('bx', 'bx').should.equal('6601DB');
        ADD.generateMachineCode('cx', 'dx').should.equal('6601D1');
        ADD.generateMachineCode('dx', 'si').should.equal('6601F2');
        ADD.generateMachineCode('bp', 'cx').should.equal('6601CD');
        (() => ADD.generateMachineCode('si', 'ebx')).should.throw();
        (() => ADD.generateMachineCode('ax', 'al')).should.throw();
    }

    @test 'r16 with disp only'() {
        ADD.generateMachineCode('ax', '[12]').should.equal('66030512000000');
        ADD.generateMachineCode('ax', '[1232]').should.equal('66030532120000');
        ADD.generateMachineCode('ax', '[1]').should.equal('66030501000000');
        ADD.generateMachineCode('ax', '[12345678]').should.equal('66030578563412');
        ADD.generateMachineCode('ax', '[12345678]').should.equal('66030578563412');
    }

    @test 'r16 with reg + disp'() {
        ADD.generateMachineCode('ax', '[si+12]').should.equal('6766034412');
        ADD.generateMachineCode('ax', '[si+1122]').should.equal('676603842211');
        (() => ADD.generateMachineCode('ax', '[si+112234]')).should.throw;
    }

    @test 'r32, second operand r'() {
        ADD.generateMachineCode('eax', 'eax').should.equal('01C0');
        ADD.generateMachineCode('ebx', 'ebx').should.equal('01DB');
        ADD.generateMachineCode('ecx', 'edx').should.equal('01D1');
        ADD.generateMachineCode('edx', 'esi').should.equal('01F2');
        ADD.generateMachineCode('ebp', 'ecx').should.equal('01CD');
        (() => ADD.generateMachineCode('esi', 'ax')).should.throw();
        (() => ADD.generateMachineCode('eax', 'al')).should.throw();
    }

    @test 'r32, second operand mr'() {
        ADD.generateMachineCode('eax', '[si]').should.equal('670304');
        ADD.generateMachineCode('ebx', '[si]').should.equal('67031C');
        ADD.generateMachineCode('eax', '[eax]').should.equal('0300');
        ADD.generateMachineCode('ebx', '[ebx]').should.equal('031B');
        ADD.generateMachineCode('ecx', '[edx]').should.equal('030A');
        ADD.generateMachineCode('edx', '[esi]').should.equal('0316');
        ADD.generateMachineCode('ebp', '[ecx]').should.equal('0329');
        (() => ADD.generateMachineCode('esi', '[ax]')).should.throw();
        (() => ADD.generateMachineCode('eax', '[al]')).should.throw();
    }

    @test 'r32 with disp only'() {
        ADD.generateMachineCode('eax', '[1]').should.equal('030501000000');
        ADD.generateMachineCode('eax', '[12]').should.equal('030512000000');
        ADD.generateMachineCode('eax', '[123]').should.equal('030523010000');
        ADD.generateMachineCode('eax', '[1234]').should.equal('030534120000');
        ADD.generateMachineCode('eax', '[12345]').should.equal('030545230100');
        ADD.generateMachineCode('eax', '[1234567]').should.equal('030567452301');
        ADD.generateMachineCode('eax', '[12345678]').should.equal('030578563412');
        ADD.generateMachineCode('ebx', '[1234567]').should.equal('031D67452301');
        ADD.generateMachineCode('ecx', '[1234567]').should.equal('030D67452301');
    }

    @test 'r32 with base and + disp'() {
        ADD.generateMachineCode('eax', '[eax+1]').should.equal('034001');
        ADD.generateMachineCode('eax', '[eax+12]').should.equal('034012');
        ADD.generateMachineCode('eax', '[eax+123]').should.equal('038023010000');
        ADD.generateMachineCode('eax', '[eax+1234]').should.equal('038034120000');
        ADD.generateMachineCode('eax', '[eax+12345]').should.equal('038045230100');
        ADD.generateMachineCode('eax', '[eax+123456]').should.equal('038056341200');
        ADD.generateMachineCode('eax', '[eax+1234567]').should.equal('038067452301');
        ADD.generateMachineCode('eax', '[eax+12345678]').should.equal('038078563412');
        ADD.generateMachineCode('ebx', '[eax+12345678]').should.equal('039878563412');
        ADD.generateMachineCode('ecx', '[eax+12345678]').should.equal('038878563412');
    }


    @test 'r32 with base*constant'() {
        ADD.generateMachineCode('eax', '[eax*2]').should.equal('03044500000000');
        ADD.generateMachineCode('eax', '[eax*1]').should.equal('03040500000000');
        ADD.generateMachineCode('ebx', '[ecx*2]').should.equal('031C4D00000000');
        ADD.generateMachineCode('edx', '[ebx*2]').should.equal('03145D00000000');
        ADD.generateMachineCode('ebp', '[esi*2]').should.equal('032C7500000000');
        ADD.generateMachineCode('edi', '[ebp*2]').should.equal('033C6D00000000');
        ADD.generateMachineCode('eax', '[eax*4]').should.equal('03048500000000');
        ADD.generateMachineCode('ebx', '[ecx*4]').should.equal('031C8D00000000');
        ADD.generateMachineCode('edx', '[ebx*4]').should.equal('03149D00000000');
        ADD.generateMachineCode('ebp', '[esi*4]').should.equal('032CB500000000');
        ADD.generateMachineCode('edi', '[ebp*4]').should.equal('033CAD00000000');
        ADD.generateMachineCode('eax', '[eax*8]').should.equal('0304C500000000');
        ADD.generateMachineCode('ebx', '[ecx*8]').should.equal('031CCD00000000');
        ADD.generateMachineCode('edx', '[ebx*8]').should.equal('0314DD00000000');
        ADD.generateMachineCode('ebp', '[esi*8]').should.equal('032CF500000000');
        ADD.generateMachineCode('edi', '[ebp*8]').should.equal('033CED00000000');
    }


}
