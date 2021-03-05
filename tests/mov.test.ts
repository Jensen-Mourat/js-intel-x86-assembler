import {suite, test} from '@testdeck/mocha';
import * as _chai from 'chai';
import {PARAMETERS} from './parameters';
import {MOV} from '../src/constants/AsmFunctions/backup/MOV';

_chai.should();

@suite
class movTest {

    before() {

    }

    @test 'al with second operand as bytes'() {
        MOV.generateMachineCode('al', PARAMETERS.oneByte).should.equal('C6C0' + PARAMETERS.oneByte);
        (() => MOV.generateMachineCode('al', PARAMETERS.twoBytes)).should.throw();
        (() => MOV.generateMachineCode('al', PARAMETERS.fourBytes)).should.throw();
    }

    @test 'ax with second operand as bytes'() {
        MOV.generateMachineCode('ax', PARAMETERS.oneByte).should.equal('66B8' + PARAMETERS.oneByte + '00');
        MOV.generateMachineCode('ax', PARAMETERS.twoBytes).should.equal('66B8' + PARAMETERS.twoBytesRotated);
        (() => MOV.generateMachineCode('ax', PARAMETERS.fourBytes)).should.throw();
    }

    @test 'eax with second operand as bytes'() {
        MOV.generateMachineCode('eax', PARAMETERS.oneByte).should.equal('B8' + PARAMETERS.oneByte + '000000');
        MOV.generateMachineCode('eax', PARAMETERS.twoBytes).should.equal('B8' + PARAMETERS.twoBytesRotated + '0000');
        MOV.generateMachineCode('eax', PARAMETERS.fourBytes).should.equal('B8' + PARAMETERS.fourBytesRotated);
    }

    @test 'r8 with second operand as bytes'() {
        MOV.generateMachineCode('ah', PARAMETERS.oneByte).should.equal('80C4' + PARAMETERS.oneByte);
        MOV.generateMachineCode('ah', '1').should.equal('80C4' + '01');
        MOV.generateMachineCode('ch', PARAMETERS.oneByte).should.equal('80C5' + PARAMETERS.oneByte);
        MOV.generateMachineCode('dh', PARAMETERS.oneByte).should.equal('80C6' + PARAMETERS.oneByte);
        MOV.generateMachineCode('bh', PARAMETERS.oneByte).should.equal('80C7' + PARAMETERS.oneByte);
        MOV.generateMachineCode('cl', PARAMETERS.oneByte).should.equal('80C1' + PARAMETERS.oneByte);
        MOV.generateMachineCode('dl', PARAMETERS.oneByte).should.equal('80C2' + PARAMETERS.oneByte);
        MOV.generateMachineCode('bl', PARAMETERS.oneByte).should.equal('80C3' + PARAMETERS.oneByte);
        (() => MOV.generateMachineCode('ah', PARAMETERS.twoBytes)).should.throw();
        (() => MOV.generateMachineCode('ch', PARAMETERS.twoBytes)).should.throw();
        (() => MOV.generateMachineCode('dh', PARAMETERS.twoBytes)).should.throw();
        (() => MOV.generateMachineCode('bh', PARAMETERS.twoBytes)).should.throw();
        (() => MOV.generateMachineCode('cl', PARAMETERS.twoBytes)).should.throw();
        (() => MOV.generateMachineCode('dl', PARAMETERS.twoBytes)).should.throw();
        (() => MOV.generateMachineCode('bl', PARAMETERS.twoBytes)).should.throw();
        (() => MOV.generateMachineCode('ah', PARAMETERS.fourBytes)).should.throw();
        (() => MOV.generateMachineCode('ch', PARAMETERS.fourBytes)).should.throw();
        (() => MOV.generateMachineCode('dh', PARAMETERS.fourBytes)).should.throw();
        (() => MOV.generateMachineCode('bh', PARAMETERS.fourBytes)).should.throw();
        (() => MOV.generateMachineCode('cl', PARAMETERS.fourBytes)).should.throw();
        (() => MOV.generateMachineCode('dl', PARAMETERS.fourBytes)).should.throw();
        (() => MOV.generateMachineCode('bl', PARAMETERS.fourBytes)).should.throw();
    }

    @test 'r16 with second operand as bytes'() {
        MOV.generateMachineCode('di', PARAMETERS.oneByte).should.equal('6683C7' + PARAMETERS.oneByte);
        MOV.generateMachineCode('di', '1').should.equal('6683C7' + '01');
        MOV.generateMachineCode('cx', PARAMETERS.oneByte).should.equal('6683C1' + PARAMETERS.oneByte);
        MOV.generateMachineCode('dx', PARAMETERS.oneByte).should.equal('6683C2' + PARAMETERS.oneByte);
        MOV.generateMachineCode('bx', PARAMETERS.oneByte).should.equal('6683C3' + PARAMETERS.oneByte);
        MOV.generateMachineCode('sp', PARAMETERS.oneByte).should.equal('6683C4' + PARAMETERS.oneByte);
        MOV.generateMachineCode('bp', PARAMETERS.oneByte).should.equal('6683C5' + PARAMETERS.oneByte);
        MOV.generateMachineCode('si', PARAMETERS.oneByte).should.equal('6683C6' + PARAMETERS.oneByte);
        MOV.generateMachineCode('di', PARAMETERS.twoBytes).should.equal('6681C7' + PARAMETERS.twoBytesRotated);
        MOV.generateMachineCode('di', '123').should.equal('6681C7' + '2301');
        MOV.generateMachineCode('cx', PARAMETERS.twoBytes).should.equal('6681C1' + PARAMETERS.twoBytesRotated);
        MOV.generateMachineCode('dx', PARAMETERS.twoBytes).should.equal('6681C2' + PARAMETERS.twoBytesRotated);
        MOV.generateMachineCode('bx', PARAMETERS.twoBytes).should.equal('6681C3' + PARAMETERS.twoBytesRotated);
        MOV.generateMachineCode('sp', PARAMETERS.twoBytes).should.equal('6681C4' + PARAMETERS.twoBytesRotated);
        MOV.generateMachineCode('bp', PARAMETERS.twoBytes).should.equal('6681C5' + PARAMETERS.twoBytesRotated);
        MOV.generateMachineCode('si', PARAMETERS.twoBytes).should.equal('6681C6' + PARAMETERS.twoBytesRotated);
        (() => MOV.generateMachineCode('di', PARAMETERS.fourBytes)).should.throw();
        (() => MOV.generateMachineCode('cx', PARAMETERS.fourBytes)).should.throw();
        (() => MOV.generateMachineCode('dx', PARAMETERS.fourBytes)).should.throw();
        (() => MOV.generateMachineCode('bx', PARAMETERS.fourBytes)).should.throw();
        (() => MOV.generateMachineCode('sp', PARAMETERS.fourBytes)).should.throw();
        (() => MOV.generateMachineCode('bp', PARAMETERS.fourBytes)).should.throw();
        (() => MOV.generateMachineCode('si', PARAMETERS.fourBytes)).should.throw();
    }

    @test 'r32 with second operand as bytes'() {
        MOV.generateMachineCode('edi', PARAMETERS.oneByte).should.equal('83C7' + PARAMETERS.oneByte);
        MOV.generateMachineCode('ecx', PARAMETERS.oneByte).should.equal('83C1' + PARAMETERS.oneByte);
        MOV.generateMachineCode('edx', PARAMETERS.oneByte).should.equal('83C2' + PARAMETERS.oneByte);
        MOV.generateMachineCode('ebx', PARAMETERS.oneByte).should.equal('83C3' + PARAMETERS.oneByte);
        MOV.generateMachineCode('esp', PARAMETERS.oneByte).should.equal('83C4' + PARAMETERS.oneByte);
        MOV.generateMachineCode('ebp', PARAMETERS.oneByte).should.equal('83C5' + PARAMETERS.oneByte);
        MOV.generateMachineCode('esi', PARAMETERS.oneByte).should.equal('83C6' + PARAMETERS.oneByte);
        MOV.generateMachineCode('edi', PARAMETERS.twoBytes).should.equal('81C7' + PARAMETERS.twoBytesRotated + '0000');
        MOV.generateMachineCode('ecx', PARAMETERS.twoBytes).should.equal('81C1' + PARAMETERS.twoBytesRotated + '0000');
        MOV.generateMachineCode('edx', PARAMETERS.twoBytes).should.equal('81C2' + PARAMETERS.twoBytesRotated + '0000');
        MOV.generateMachineCode('ebx', PARAMETERS.twoBytes).should.equal('81C3' + PARAMETERS.twoBytesRotated + '0000');
        MOV.generateMachineCode('esp', PARAMETERS.twoBytes).should.equal('81C4' + PARAMETERS.twoBytesRotated + '0000');
        MOV.generateMachineCode('ebp', PARAMETERS.twoBytes).should.equal('81C5' + PARAMETERS.twoBytesRotated + '0000');
        MOV.generateMachineCode('esi', PARAMETERS.twoBytes).should.equal('81C6' + PARAMETERS.twoBytesRotated + '0000');
        MOV.generateMachineCode('ecx', PARAMETERS.fourBytes).should.equal('81C1' + PARAMETERS.fourBytesRotated);
        MOV.generateMachineCode('edx', PARAMETERS.fourBytes).should.equal('81C2' + PARAMETERS.fourBytesRotated);
        MOV.generateMachineCode('ebx', PARAMETERS.fourBytes).should.equal('81C3' + PARAMETERS.fourBytesRotated);
        MOV.generateMachineCode('esp', PARAMETERS.fourBytes).should.equal('81C4' + PARAMETERS.fourBytesRotated);
        MOV.generateMachineCode('ebp', PARAMETERS.fourBytes).should.equal('81C5' + PARAMETERS.fourBytesRotated);
        MOV.generateMachineCode('esi', PARAMETERS.fourBytes).should.equal('81C6' + PARAMETERS.fourBytesRotated);

        //testing with odd bytes
        MOV.generateMachineCode('edi', '1').should.equal('83C7' + '01');
        MOV.generateMachineCode('edi', '123').should.equal('81C7' + '23010000');
        MOV.generateMachineCode('edi', '12345').should.equal('81C7' + '45230100');

    }

    @test 'r8 , second operand r8'() {
        MOV.generateMachineCode('al', 'al').should.equal('00C0');
        MOV.generateMachineCode('bl', 'al').should.equal('00C3');
        MOV.generateMachineCode('cl', 'bl').should.equal('00D9');
        MOV.generateMachineCode('dl', 'cl').should.equal('00CA');
        MOV.generateMachineCode('al', 'cl').should.equal('00C8');
        MOV.generateMachineCode('ah', 'bh').should.equal('00FC');
        MOV.generateMachineCode('bh', 'ch').should.equal('00EF');
        MOV.generateMachineCode('dh', 'ah').should.equal('00E6');
        (() => MOV.generateMachineCode('si', 'ebx')).should.throw();
        (() => MOV.generateMachineCode('al', 'ax')).should.throw();

    }

    @test 'r16 , second operand r'() {
        MOV.generateMachineCode('ax', 'ax').should.equal('6601C0');
        MOV.generateMachineCode('bx', 'bx').should.equal('6601DB');
        MOV.generateMachineCode('cx', 'dx').should.equal('6601D1');
        MOV.generateMachineCode('dx', 'si').should.equal('6601F2');
        MOV.generateMachineCode('bp', 'cx').should.equal('6601CD');
        (() => MOV.generateMachineCode('si', 'ebx')).should.throw();
        (() => MOV.generateMachineCode('ax', 'al')).should.throw();
    }

    @test 'r16 with disp only'() {
        MOV.generateMachineCode('ax', '[12]').should.equal('66030512000000');
        MOV.generateMachineCode('ax', '[1232]').should.equal('66030532120000');
        MOV.generateMachineCode('ax', '[1]').should.equal('66030501000000');
        MOV.generateMachineCode('ax', '[12345678]').should.equal('66030578563412');
        MOV.generateMachineCode('ax', '[12345678]').should.equal('66030578563412');
    }

    @test 'r16 with reg + disp'() {
        //MOV.generateMachineCode('ax', '[si+12]').should.equal('6766034412');
        MOV.generateMachineCode('ax', '[si+1122]').should.equal('676603842211');
        MOV.generateMachineCode('ax', '[si+112234]').should.equal('676603843422');
    }

    @test 'r16 with r16 + r16'() {
        MOV.generateMachineCode('ax', '[bx+si]').should.equal('67660300');
        MOV.generateMachineCode('bx', '[bx+di]').should.equal('67660319');
        MOV.generateMachineCode('cx', '[bp+si]').should.equal('6766030A');
        MOV.generateMachineCode('dx', '[si]').should.equal('67660314');
        MOV.generateMachineCode('dx', '[di]').should.equal('67660315');
        MOV.generateMachineCode('ax', '[bx]').should.equal('67660307');
    }

    @test 'r16 with r16 + r16 + disp'() {
        MOV.generateMachineCode('ax', '[bx+si+12]').should.equal('6766034012');
        MOV.generateMachineCode('bx', '[bx+di+12]').should.equal('6766035912');
        MOV.generateMachineCode('cx', '[bp+si+1]').should.equal('6766034A01');
        MOV.generateMachineCode('dx', '[si+12]').should.equal('6766035412');
        MOV.generateMachineCode('dx', '[di+12]').should.equal('6766035512');
        MOV.generateMachineCode('ax', '[bx+12]').should.equal('6766034712');
        MOV.generateMachineCode('dx', '[di+1]').should.equal('6766035501');
        MOV.generateMachineCode('ax', '[bx+1]').should.equal('6766034701');
        //disp16
        MOV.generateMachineCode('ax', '[bx+si+1234]').should.equal('676603803412');
        MOV.generateMachineCode('bx', '[bx+di+1234]').should.equal('676603993412');
        MOV.generateMachineCode('cx', '[bp+si+134]').should.equal('6766038A3401');
        MOV.generateMachineCode('dx', '[si+1243]').should.equal('676603944312');
        MOV.generateMachineCode('dx', '[di+1243]').should.equal('676603954312');
        MOV.generateMachineCode('ax', '[bx+1234]').should.equal('676603873412');
        MOV.generateMachineCode('ax', '[bx+123]').should.equal('676603872301');
        MOV.generateMachineCode('ax', '[bx+si+123445]').should.equal('676603804534');
        MOV.generateMachineCode('ax', '[bx+123445]').should.equal('676603874534');
    }

    @test 'r32, second operand r'() {
        MOV.generateMachineCode('eax', 'eax').should.equal('01C0');
        MOV.generateMachineCode('ebx', 'ebx').should.equal('01DB');
        MOV.generateMachineCode('ecx', 'edx').should.equal('01D1');
        MOV.generateMachineCode('edx', 'esi').should.equal('01F2');
        MOV.generateMachineCode('ebp', 'ecx').should.equal('01CD');
        (() => MOV.generateMachineCode('esi', 'ax')).should.throw();
        (() => MOV.generateMachineCode('eax', 'al')).should.throw();
    }

    @test 'r32, second operand mr'() {
        MOV.generateMachineCode('eax', '[si]').should.equal('670304');
        MOV.generateMachineCode('ebx', '[si]').should.equal('67031C');
        MOV.generateMachineCode('eax', '[eax]').should.equal('0300');
        MOV.generateMachineCode('ebx', '[ebx]').should.equal('031B');
        MOV.generateMachineCode('ecx', '[edx]').should.equal('030A');
        MOV.generateMachineCode('edx', '[esi]').should.equal('0316');
        MOV.generateMachineCode('ebp', '[ecx]').should.equal('0329');
        (() => MOV.generateMachineCode('esi', '[ax]')).should.throw();
        (() => MOV.generateMachineCode('eax', '[al]')).should.throw();
    }

    @test 'r32 with disp only'() {
        MOV.generateMachineCode('eax', '[1]').should.equal('030501000000');
        MOV.generateMachineCode('eax', '[12]').should.equal('030512000000');
        MOV.generateMachineCode('eax', '[123]').should.equal('030523010000');
        MOV.generateMachineCode('eax', '[1234]').should.equal('030534120000');
        MOV.generateMachineCode('eax', '[12345]').should.equal('030545230100');
        MOV.generateMachineCode('eax', '[1234567]').should.equal('030567452301');
        MOV.generateMachineCode('eax', '[12345678]').should.equal('030578563412');
        MOV.generateMachineCode('ebx', '[1234567]').should.equal('031D67452301');
        MOV.generateMachineCode('ecx', '[1234567]').should.equal('030D67452301');
    }

    @test 'r32 with base and + disp'() {
        MOV.generateMachineCode('eax', '[eax+1]').should.equal('034001');
        MOV.generateMachineCode('eax', '[eax+12]').should.equal('034012');
        MOV.generateMachineCode('eax', '[eax+123]').should.equal('038023010000');
        MOV.generateMachineCode('eax', '[eax+1234]').should.equal('038034120000');
        MOV.generateMachineCode('eax', '[eax+12345]').should.equal('038045230100');
        MOV.generateMachineCode('eax', '[eax+123456]').should.equal('038056341200');
        MOV.generateMachineCode('eax', '[eax+1234567]').should.equal('038067452301');
        MOV.generateMachineCode('eax', '[eax+12345678]').should.equal('038078563412');
        MOV.generateMachineCode('ebx', '[eax+12345678]').should.equal('039878563412');
        MOV.generateMachineCode('ecx', '[eax+12345678]').should.equal('038878563412');
    }


    @test 'r32 with base*constant'() {
        MOV.generateMachineCode('eax', '[eax*2]').should.equal('03044500000000');
        MOV.generateMachineCode('eax', '[eax*1]').should.equal('03040500000000');
        MOV.generateMachineCode('ebx', '[ecx*2]').should.equal('031C4D00000000');
        MOV.generateMachineCode('edx', '[ebx*2]').should.equal('03145D00000000');
        MOV.generateMachineCode('ebp', '[esi*2]').should.equal('032C7500000000');
        MOV.generateMachineCode('edi', '[ebp*2]').should.equal('033C6D00000000');
        MOV.generateMachineCode('eax', '[eax*4]').should.equal('03048500000000');
        MOV.generateMachineCode('ebx', '[ecx*4]').should.equal('031C8D00000000');
        MOV.generateMachineCode('edx', '[ebx*4]').should.equal('03149D00000000');
        MOV.generateMachineCode('ebp', '[esi*4]').should.equal('032CB500000000');
        MOV.generateMachineCode('edi', '[ebp*4]').should.equal('033CAD00000000');
        MOV.generateMachineCode('eax', '[eax*8]').should.equal('0304C500000000');
        MOV.generateMachineCode('ebx', '[ecx*8]').should.equal('031CCD00000000');
        MOV.generateMachineCode('edx', '[ebx*8]').should.equal('0314DD00000000');
        MOV.generateMachineCode('ebp', '[esi*8]').should.equal('032CF500000000');
        MOV.generateMachineCode('edi', '[ebp*8]').should.equal('033CED00000000');
    }

    @test 'r32 with reg+reg'() {
        MOV.generateMachineCode('eax', '[eax+eax]').should.equal('030400');
        MOV.generateMachineCode('eax', '[ecx+ebx]').should.equal('030419');
        MOV.generateMachineCode('esi', '[eax+edx]').should.equal('033410');
        MOV.generateMachineCode('eax', '[eax+ebp]').should.equal('030428');
        MOV.generateMachineCode('edi', '[edx+esi]').should.equal('033C32');
        MOV.generateMachineCode('ebp', '[eax+edi]').should.equal('032C38');
        MOV.generateMachineCode('edx', '[eax+ebx]').should.equal('031418');
        MOV.generateMachineCode('ecx', '[ebx+eax]').should.equal('030C03');
        MOV.generateMachineCode('ebx', '[eax+eax]').should.equal('031C00');
        (() => MOV.generateMachineCode('ebx', '[eax+ax]')).should.throw;
    }

    @test 'r32 with reg+reg*constant'() {
        MOV.generateMachineCode('eax', '[eax+eax*2]').should.equal('030440');
        MOV.generateMachineCode('eax', '[ecx+ebx*4]').should.equal('030499');
        MOV.generateMachineCode('esi', '[eax+edx*8]').should.equal('0334D0');
        MOV.generateMachineCode('eax', '[eax+ebp*2]').should.equal('030468');
        MOV.generateMachineCode('edi', '[edx+esi*1]').should.equal('033C32');
        MOV.generateMachineCode('ebp', '[eax+edi*8]').should.equal('032CF8');
        MOV.generateMachineCode('edx', '[eax+ebx*2]').should.equal('031458');
        MOV.generateMachineCode('ecx', '[ebx+eax*4]').should.equal('030C83');
        MOV.generateMachineCode('ebx', '[eax+eax*1]').should.equal('031C00');
        (() => MOV.generateMachineCode('ebx', '[eax+eax*3]')).should.throw;
    }

    @test 'r32 with reg+reg*constant+displacement'() {
        MOV.generateMachineCode('eax', '[eax+eax*2+1]').should.equal('03444001');
        MOV.generateMachineCode('eax', '[ecx+ebx*4+1]').should.equal('03449901');
        MOV.generateMachineCode('esi', '[eax+edx*8+1]').should.equal('0374D001');
        MOV.generateMachineCode('eax', '[eax+ebp*2+1]').should.equal('03446801');
        MOV.generateMachineCode('edi', '[edx+esi*1+12]').should.equal('037C3212');
        MOV.generateMachineCode('ebp', '[eax+edi*8+12]').should.equal('036CF812');
        MOV.generateMachineCode('edx', '[eax+ebx*2+12]').should.equal('03545812');
        MOV.generateMachineCode('ecx', '[ebx+eax*4+12]').should.equal('034C8312');
        MOV.generateMachineCode('ebx', '[eax+eax*1+12]').should.equal('035C0012');
        MOV.generateMachineCode('eax', '[eax+eax*2+123]').should.equal('03844023010000');
        MOV.generateMachineCode('eax', '[ecx+ebx*4+123]').should.equal('03849923010000');
        MOV.generateMachineCode('esi', '[eax+edx*8+123]').should.equal('03B4D023010000');
        MOV.generateMachineCode('eax', '[eax+ebp*2+123]').should.equal('03846823010000');
        MOV.generateMachineCode('edi', '[edx+esi*1+1234]').should.equal('03BC3234120000');
        MOV.generateMachineCode('ebp', '[eax+edi*8+1234]').should.equal('03ACF834120000');
        MOV.generateMachineCode('edx', '[eax+ebx*2+1234]').should.equal('03945834120000');
        MOV.generateMachineCode('ecx', '[ebx+eax*4+1234]').should.equal('038C8334120000');
        MOV.generateMachineCode('ebx', '[eax+eax*1+1234]').should.equal('039C0034120000');
        MOV.generateMachineCode('eax', '[eax+eax*2+12345]').should.equal('03844045230100');
        MOV.generateMachineCode('eax', '[ecx+ebx*4+12345]').should.equal('03849945230100');
        MOV.generateMachineCode('esi', '[eax+edx*8+12345]').should.equal('03B4D045230100');
        MOV.generateMachineCode('eax', '[eax+ebp*2+12345]').should.equal('03846845230100');
        MOV.generateMachineCode('edi', '[edx+esi*1+123456]').should.equal('03BC3256341200');
        MOV.generateMachineCode('ebp', '[eax+edi*8+123456]').should.equal('03ACF856341200');
        MOV.generateMachineCode('edx', '[eax+ebx*2+123456]').should.equal('03945856341200');
        MOV.generateMachineCode('ecx', '[ebx+eax*4+123456]').should.equal('038C8356341200');
        MOV.generateMachineCode('ebx', '[eax+eax*1+123456]').should.equal('039C0056341200');
        MOV.generateMachineCode('eax', '[eax+eax*2+1234567]').should.equal('03844067452301');
        MOV.generateMachineCode('eax', '[ecx+ebx*4+1234567]').should.equal('03849967452301');
        MOV.generateMachineCode('esi', '[eax+edx*8+1234567]').should.equal('03B4D067452301');
        MOV.generateMachineCode('eax', '[eax+ebp*2+1234567]').should.equal('03846867452301');
        MOV.generateMachineCode('edi', '[edx+esi*1+12345678]').should.equal('03BC3278563412');
        MOV.generateMachineCode('ebp', '[eax+edi*8+12345678]').should.equal('03ACF878563412');
        MOV.generateMachineCode('edx', '[eax+ebx*2+12345678]').should.equal('03945878563412');
        MOV.generateMachineCode('ecx', '[ebx+eax*4+12345678]').should.equal('038C8378563412');
        MOV.generateMachineCode('ebx', '[eax+eax*1+12345678]').should.equal('039C0078563412');
        (() => MOV.generateMachineCode('ebx', '[eax+eax*3+1]')).should.throw;
        (() => MOV.generateMachineCode('ebx', '[eax+eax*2+11232131231]')).should.throw;
    }

    @test 'r8 negative displacement'() {
        MOV.generateMachineCode('al', '[-0]').should.equal('020500000000');
        MOV.generateMachineCode('al', '[-1]').should.equal('0205FFFFFFFF');
        MOV.generateMachineCode('al', '[-11]').should.equal('0205EFFFFFFF');
        MOV.generateMachineCode('al', '[-FF]').should.equal('020501FFFFFF');
        MOV.generateMachineCode('al', '[-12]').should.equal('0205EEFFFFFF');
        MOV.generateMachineCode('al', '[-111]').should.equal('0205EFFEFFFF');
        MOV.generateMachineCode('al', '[-FFF]').should.equal('020501F0FFFF');
        MOV.generateMachineCode('al', '[-123]').should.equal('0205DDFEFFFF');
        MOV.generateMachineCode('al', '[-1111]').should.equal('0205EFEEFFFF');
        MOV.generateMachineCode('al', '[-FFFF]').should.equal('02050100FFFF');
        MOV.generateMachineCode('al', '[-1234]').should.equal('0205CCEDFFFF');
        MOV.generateMachineCode('al', '[-11111111]').should.equal('0205EFEEEEEE');
        MOV.generateMachineCode('al', '[-FFFFFFFF]').should.equal('020501000000');
        MOV.generateMachineCode('al', '[-12345678]').should.equal('020588A9CBED');
        MOV.generateMachineCode('al', '[-1234567]').should.equal('020599BADCFE');
    }

    @test 'r16 negative displacement'() {
        MOV.generateMachineCode('ax', '[-0]').should.equal('66030500000000');
        MOV.generateMachineCode('ax', '[-1]').should.equal('660305FFFFFFFF');
        MOV.generateMachineCode('ax', '[-11]').should.equal('660305EFFFFFFF');
        MOV.generateMachineCode('ax', '[-FF]').should.equal('66030501FFFFFF');
        MOV.generateMachineCode('ax', '[-12]').should.equal('660305EEFFFFFF');
        MOV.generateMachineCode('ax', '[-111]').should.equal('660305EFFEFFFF');
        MOV.generateMachineCode('ax', '[-FFF]').should.equal('66030501F0FFFF');
        MOV.generateMachineCode('ax', '[-123]').should.equal('660305DDFEFFFF');
        MOV.generateMachineCode('ax', '[-1111]').should.equal('660305EFEEFFFF');
        MOV.generateMachineCode('ax', '[-FFFF]').should.equal('6603050100FFFF');
        MOV.generateMachineCode('ax', '[-1234]').should.equal('660305CCEDFFFF');
        MOV.generateMachineCode('ax', '[-11111111]').should.equal('660305EFEEEEEE');
        MOV.generateMachineCode('ax', '[-FFFFFFFF]').should.equal('66030501000000');
        MOV.generateMachineCode('ax', '[-12345678]').should.equal('66030588A9CBED');
        MOV.generateMachineCode('ax', '[-1234567]').should.equal('66030599BADCFE');
    }

    @test 'r32 negative displacement'() {
        MOV.generateMachineCode('eax', '[-0]').should.equal('030500000000');
        MOV.generateMachineCode('eax', '[-1]').should.equal('0305FFFFFFFF');
        MOV.generateMachineCode('eax', '[-FF]').should.equal('030501FFFFFF');
        MOV.generateMachineCode('eax', '[-12]').should.equal('0305EEFFFFFF');
        MOV.generateMachineCode('eax', '[-111]').should.equal('0305EFFEFFFF');
        MOV.generateMachineCode('eax', '[-FFF]').should.equal('030501F0FFFF');
        MOV.generateMachineCode('eax', '[-123]').should.equal('0305DDFEFFFF');
        MOV.generateMachineCode('eax', '[-1111]').should.equal('0305EFEEFFFF');
        MOV.generateMachineCode('eax', '[-FFFF]').should.equal('03050100FFFF');
        MOV.generateMachineCode('eax', '[-1234]').should.equal('0305CCEDFFFF');
        MOV.generateMachineCode('eax', '[-11111111]').should.equal('0305EFEEEEEE');
        MOV.generateMachineCode('eax', '[-FFFFFFFF]').should.equal('030501000000');
        MOV.generateMachineCode('eax', '[-12345678]').should.equal('030588A9CBED');
        MOV.generateMachineCode('eax', '[-1234567]').should.equal('030599BADCFE');
    }

    @test 'r32 negative reg+displacement'() {
        MOV.generateMachineCode('eax', '[si-12]').should.equal('670344EE');
        MOV.generateMachineCode('eax', '[eax-0]').should.equal('0300');
        MOV.generateMachineCode('eax', '[eax-11]').should.equal('0340EF');
        MOV.generateMachineCode('eax', '[eax-ff]').should.equal('038001FFFFFF'); //defuse.ca says 038001FFFFFF
        MOV.generateMachineCode('eax', '[eax-12]').should.equal('0340EE');
        MOV.generateMachineCode('eax', '[eax-111]').should.equal('0380EFFEFFFF');
        MOV.generateMachineCode('eax', '[eax-fff]').should.equal('038001F0FFFF');
        MOV.generateMachineCode('eax', '[eax-123]').should.equal('0380DDFEFFFF');
        MOV.generateMachineCode('eax', '[eax-1111]').should.equal('0380EFEEFFFF');
        MOV.generateMachineCode('eax', '[eax-ffff]').should.equal('03800100FFFF');
        MOV.generateMachineCode('eax', '[eax-1234]').should.equal('0380CCEDFFFF');
        MOV.generateMachineCode('eax', '[eax-11111111]').should.equal('0380EFEEEEEE');
        MOV.generateMachineCode('eax', '[eax-ffffffff]').should.equal('038001000000');
        MOV.generateMachineCode('eax', '[eax-12345678]').should.equal('038088A9CBED');
        MOV.generateMachineCode('eax', '[eax-1234567]').should.equal('038099BADCFE');
    }

    @test 'r32 negative reg+reg+displacement'() {
        MOV.generateMachineCode('eax', '[eax+eax*2-0]').should.equal('030440');
        MOV.generateMachineCode('eax', '[eax+eax*2-1]').should.equal('034440FF');
        MOV.generateMachineCode('eax', '[eax+eax*2-ff]').should.equal('03844001FFFFFF'); //defuse.ca says 038001FFFFFF
        MOV.generateMachineCode('eax', '[eax+eax*2-80]').should.equal('03444080');
        MOV.generateMachineCode('eax', '[eax+eax*2+80]').should.equal('03844080000000');
        MOV.generateMachineCode('eax', '[eax+eax*2-81]').should.equal('0384407FFFFFFF');
        MOV.generateMachineCode('eax', '[eax+eax*2+81]').should.equal('03844081000000');
        MOV.generateMachineCode('eax', '[eax+eax*2-79]').should.equal('03444087');
        MOV.generateMachineCode('eax', '[eax+eax*2+79]').should.equal('03444079');
        MOV.generateMachineCode('eax', '[eax+ebx*2-7f]').should.equal('03445881');
        MOV.generateMachineCode('eax', '[eax+ecx*2+7f]').should.equal('0344487F');
        MOV.generateMachineCode('eax', '[eax+edx*2+ef]').should.equal('038450EF000000');
        MOV.generateMachineCode('edx', '[eax+eax*2-ffff]').should.equal('0394400100FFFF');
        MOV.generateMachineCode('eax', '[eax+eax*2-1111]').should.equal('038440EFEEFFFF');
        MOV.generateMachineCode('eax', '[eax+eax*2-11111111]').should.equal('038440EFEEEEEE');
        MOV.generateMachineCode('eax', '[eax+eax*2-ffffffff]').should.equal('03844001000000');
    }

    @test 'r32 reg*const+displacement'() {
        MOV.generateMachineCode('eax', '[eax*2-0]').should.equal('03044500000000');
        MOV.generateMachineCode('eax', '[eax*2-1]').should.equal('030445FFFFFFFF');
        MOV.generateMachineCode('eax', '[eax*2-ff]').should.equal('03044501FFFFFF');
        MOV.generateMachineCode('eax', '[eax*2-80]').should.equal('03044580FFFFFF');
        MOV.generateMachineCode('eax', '[eax*2+80]').should.equal('03044580000000');
        MOV.generateMachineCode('eax', '[eax*2-81]').should.equal('0304457FFFFFFF');
        MOV.generateMachineCode('eax', '[eax*2+81]').should.equal('03044581000000');
        MOV.generateMachineCode('eax', '[eax*2-79]').should.equal('03044587FFFFFF');
        MOV.generateMachineCode('eax', '[eax*2+79]').should.equal('03044579000000');
        MOV.generateMachineCode('eax', '[ebx*2-7f]').should.equal('03045D81FFFFFF');
        MOV.generateMachineCode('eax', '[ecx*2+7f]').should.equal('03044D7F000000');
        MOV.generateMachineCode('eax', '[edx*2+ef]').should.equal('030455EF000000');
        MOV.generateMachineCode('edx', '[eax*2-ffff]').should.equal('0314450100FFFF');
        MOV.generateMachineCode('eax', '[eax*2-1111]').should.equal('030445EFEEFFFF');
        MOV.generateMachineCode('eax', '[eax*2-11111111]').should.equal('030445EFEEEEEE');
        MOV.generateMachineCode('eax', '[eax*2-ffffffff]').should.equal('03044501000000');
        MOV.generateMachineCode('eax', '[eax*4-0]').should.equal('03048500000000');
        MOV.generateMachineCode('eax', '[eax*4-1]').should.equal('030485FFFFFFFF');
        MOV.generateMachineCode('eax', '[eax*8-ff]').should.equal('0304C501FFFFFF');
        MOV.generateMachineCode('eax', '[eax*8+ff]').should.equal('0304C5FF000000');
        MOV.generateMachineCode('eax', '[eax*8-80]').should.equal('0304C580FFFFFF');
        MOV.generateMachineCode('eax', '[eax*4+80]').should.equal('03048580000000');
        MOV.generateMachineCode('eax', '[eax*4-81]').should.equal('0304857FFFFFFF');
        MOV.generateMachineCode('eax', '[eax*8+81]').should.equal('0304C581000000');
        MOV.generateMachineCode('eax', '[eax*8-79]').should.equal('0304C587FFFFFF');
        MOV.generateMachineCode('eax', '[eax*4+79]').should.equal('03048579000000');
        MOV.generateMachineCode('eax', '[ebx*8-7f]').should.equal('0304DD81FFFFFF');
        MOV.generateMachineCode('eax', '[ecx*8+7f]').should.equal('0304CD7F000000');
        MOV.generateMachineCode('eax', '[edx*4+ef]').should.equal('030495EF000000');
        MOV.generateMachineCode('edx', '[eax*4-ffff]').should.equal('0314850100FFFF');
        MOV.generateMachineCode('eax', '[eax*8-1111]').should.equal('0304C5EFEEFFFF');
        MOV.generateMachineCode('eax', '[eax*8-11111111]').should.equal('0304C5EFEEEEEE');
        MOV.generateMachineCode('eax', '[eax*4-ffffffff]').should.equal('03048501000000');
    }

    @test 'mr32 and bytes'() {
        (() => MOV.generateMachineCode('[eax]', '0')).should.throw;
        MOV.generateMachineCode('[eax]', '1').should.equal('810001000000');
        MOV.generateMachineCode('[eax]', 'FF').should.equal('8100FF000000');
        MOV.generateMachineCode('[eax]', '80').should.equal('810080000000');
        MOV.generateMachineCode('[edx]', 'FFFF').should.equal('8102FFFF0000');
        MOV.generateMachineCode('[eax]', '1111').should.equal('810011110000');
        MOV.generateMachineCode('[eax]', '1111111').should.equal('810011111101');
        MOV.generateMachineCode('[eax]', 'FFFFFFFF').should.equal('8100FFFFFFFF');
    }

    @test 'mr32*constant and bytes'() {
        MOV.generateMachineCode('[eax*2]', '1').should.equal('8104450000000001000000');
        MOV.generateMachineCode('[eax*4]', 'FF').should.equal('81048500000000FF000000');
        MOV.generateMachineCode('[eax*8]', '80').should.equal('8104C50000000080000000');
        MOV.generateMachineCode('[edx*1]', 'FFFF').should.equal('81041500000000FFFF0000');
        MOV.generateMachineCode('[ebx*2]', '1111').should.equal('81045D0000000011110000');
        MOV.generateMachineCode('[ecx*4]', '1111111').should.equal('81048D0000000011111101');
        MOV.generateMachineCode('[edi*8]', 'FFFFFFFF').should.equal('8104FD00000000FFFFFFFF');
        (() => MOV.generateMachineCode('[eax*3]', 'FFFFFFFF')).should.throw;
        (() => MOV.generateMachineCode('[eax*5]', 'FFFFFFFF')).should.throw;
        (() => MOV.generateMachineCode('[eax*1]', '0')).should.throw;
    }

    @test 'reg+mr32*constant and bytes'() {
        MOV.generateMachineCode('[eax+eax*2]', '1').should.equal('8104400000000001000000');
        MOV.generateMachineCode('[ebx+eax*4]', 'FF').should.equal('81048300000000FF000000');
        MOV.generateMachineCode('[ecx+eax*8]', '80').should.equal('8104C10000000080000000');
        MOV.generateMachineCode('[edx+edx*1]', 'FFFF').should.equal('81041200000000FFFF0000');
        MOV.generateMachineCode('[edi+ebx*2]', '1111').should.equal('81045F0000000011110000');
        MOV.generateMachineCode('[esi+ecx*4]', '1111111').should.equal('81048E0000000011111101');
        MOV.generateMachineCode('[eax+edi*8]', 'FFFFFFFF').should.equal('8104F800000000FFFFFFFF');
        (() => MOV.generateMachineCode('[eax*3]', 'FFFFFFFF')).should.throw;
        (() => MOV.generateMachineCode('[eax*5]', 'FFFFFFFF')).should.throw;
        (() => MOV.generateMachineCode('[eax*1]', '0')).should.throw;
    }

    @test 'reg+mr32*constant + displacement and bytes'() {
        MOV.generateMachineCode('[eax+eax*2+1]', '1').should.equal('8144400101000000');
        MOV.generateMachineCode('[ebx+eax*4+FF]', 'FF').should.equal('818483FF000000FF000000');
        MOV.generateMachineCode('[ecx+eax*8+80]', '80').should.equal('8184C18000000080000000');
        MOV.generateMachineCode('[edx+edx*1+FFFF]', 'FFFF').should.equal('818412FFFF0000FFFF0000');
        MOV.generateMachineCode('[edi+ebx*2+1111]', '1111').should.equal('81845F1111000011110000');
        MOV.generateMachineCode('[esi+ecx*4+1111111]', '1111111').should.equal('81848E1111110111111101');
        MOV.generateMachineCode('[eax+edi*8+FFFFFFFF]', 'FFFFFFFF').should.equal('8184F8FFFFFFFFFFFFFFFF');
        (() => MOV.generateMachineCode('[eax*3+FFFFFFFF]', 'FFFFFFFF')).should.throw;
        (() => MOV.generateMachineCode('[eax*5+FFFFFFFF]', 'FFFFFFFF')).should.throw;
        (() => MOV.generateMachineCode('[eax*1]', '0')).should.throw;
    }

    @test 'mr32*constant and bytes, word ptr'() {
        MOV.generateMachineCode('[eax*2]', '1', 'word').should.equal('66810445000000000100');
        MOV.generateMachineCode('[eax*4]', 'FF', 'word').should.equal('6681048500000000FF00');
        MOV.generateMachineCode('[eax*8]', '80', 'word').should.equal('668104C5000000008000');
        MOV.generateMachineCode('[edx*1]', 'FFFF', 'word').should.equal('6681041500000000FFFF');
        MOV.generateMachineCode('[ebx*2]', '1111', 'word').should.equal('6681045D000000001111');
        MOV.generateMachineCode('[ecx*4]', '1111111', 'word').should.equal('6681048D000000001111');
        MOV.generateMachineCode('[edi*8]', 'FFFFFFFF', 'word').should.equal('668104FD00000000FFFF');
        (() => MOV.generateMachineCode('[eax*3]', 'FFFFFFFF')).should.throw;
        (() => MOV.generateMachineCode('[eax*5]', 'FFFFFFFF')).should.throw;
        (() => MOV.generateMachineCode('[eax*1]', '0')).should.throw;
    }

    @test 'mr32 and bytes, word ptr'() {
        MOV.generateMachineCode('[eax]', '1', 'word').should.equal('6681000100');
        MOV.generateMachineCode('[eax]', 'FF', 'word').should.equal('668100FF00');
        MOV.generateMachineCode('[eax]', '80', 'word').should.equal('6681008000');
        MOV.generateMachineCode('[edx]', 'FFFF', 'word').should.equal('668102FFFF');
        MOV.generateMachineCode('[eax]', '1111', 'word').should.equal('6681001111');
        MOV.generateMachineCode('[eax]', '1111111', 'word').should.equal('6681001111');
        MOV.generateMachineCode('[eax]', 'FFFFFFFF', 'word').should.equal('668100FFFF');
        (() => MOV.generateMachineCode('[eax]', '0', 'word')).should.throw;
    }


    @test 'mr32 and bytes, byte ptr'() {
        MOV.generateMachineCode('[eax]', '1', 'byte').should.equal('800001');
        MOV.generateMachineCode('[eax]', 'FF', 'byte').should.equal('8000FF');
        MOV.generateMachineCode('[eax]', '80', 'byte').should.equal('800080');
        MOV.generateMachineCode('[edx]', 'FFFF', 'byte').should.equal('8002FF');
        MOV.generateMachineCode('[eax]', '1111', 'byte').should.equal('800011');
        MOV.generateMachineCode('[eax]', '1111111', 'byte').should.equal('800011');
        MOV.generateMachineCode('[eax]', 'FFFFFFFF', 'byte').should.equal('8000FF');
        (() => MOV.generateMachineCode('[eax]', '0', 'byte')).should.throw;
    }

    @test 'mr16 and bytes'() {
        MOV.generateMachineCode('[di]', '1').should.equal('67810501000000');
        MOV.generateMachineCode('[si]', '1').should.equal('67810401000000');
        MOV.generateMachineCode('[bx]', '1').should.equal('67810701000000');
        MOV.generateMachineCode('[di]', '1').should.equal('67810501000000');
        MOV.generateMachineCode('[si]', '1').should.equal('67810401000000');
        MOV.generateMachineCode('[bx]', '1').should.equal('67810701000000');
        MOV.generateMachineCode('[di]', 'FF').should.equal('678105FF000000');
        MOV.generateMachineCode('[si]', 'FFFF').should.equal('678104FFFF0000');
        MOV.generateMachineCode('[bx]', '1FFF').should.equal('678107FF1F0000');
        MOV.generateMachineCode('[di]', '1FFFFFFF').should.equal('678105FFFFFF1F');
    }

    @test 'mr16 and bytes, byte ptr'() {
        MOV.generateMachineCode('[di]', '1', 'byte').should.equal('67800501');
        MOV.generateMachineCode('[di]', '1111', 'byte').should.equal('67800511');
        MOV.generateMachineCode('[si]', '1', 'byte').should.equal('67800401');
        MOV.generateMachineCode('[bx]', '1', 'byte').should.equal('67800701');
        MOV.generateMachineCode('[di]', '1', 'byte').should.equal('67800501');
        MOV.generateMachineCode('[si]', '1', 'byte').should.equal('67800401');
        MOV.generateMachineCode('[bx]', '1', 'byte').should.equal('67800701');
        MOV.generateMachineCode('[di]', 'FF', 'byte').should.equal('678005FF');
        MOV.generateMachineCode('[si]', 'FFFF', 'byte').should.equal('678004FF');
        MOV.generateMachineCode('[bx]', '1FFF', 'byte').should.equal('678007FF');
        MOV.generateMachineCode('[di]', '1FFFFFFF', 'byte').should.equal('678005FF');
    }

    @test 'mr16 and bytes, word ptr'() {
        MOV.generateMachineCode('[di]', '1', 'word').should.equal('676681050100');
        MOV.generateMachineCode('[di]', '1111', 'word').should.equal('676681051111');
        MOV.generateMachineCode('[si]', '1', 'word').should.equal('676681040100');
        MOV.generateMachineCode('[bx]', '1', 'word').should.equal('676681070100');
        MOV.generateMachineCode('[di]', '1', 'word').should.equal('676681050100');
        MOV.generateMachineCode('[si]', '1', 'word').should.equal('676681040100');
        MOV.generateMachineCode('[bx]', '1', 'word').should.equal('676681070100');
        MOV.generateMachineCode('[di]', 'FF', 'word').should.equal('67668105FF00');
        MOV.generateMachineCode('[si]', 'FFFF', 'word').should.equal('67668104FFFF');
        MOV.generateMachineCode('[bx]', '1FFF', 'word').should.equal('67668107FF1F');
        MOV.generateMachineCode('[di]', '1FFFFFFF', 'word').should.equal('67668105FFFF');
    }

    @test 'mr16 and bytes, dword'() {
        MOV.generateMachineCode('[di]', '1', 'dword').should.equal('67810501000000');
        MOV.generateMachineCode('[si]', '1', 'dword').should.equal('67810401000000');
        MOV.generateMachineCode('[bx]', '1', 'dword').should.equal('67810701000000');
        MOV.generateMachineCode('[di]', '1', 'dword').should.equal('67810501000000');
        MOV.generateMachineCode('[si]', '1', 'dword').should.equal('67810401000000');
        MOV.generateMachineCode('[bx]', '1', 'dword').should.equal('67810701000000');
        MOV.generateMachineCode('[di]', 'FF', 'dword').should.equal('678105FF000000');
        MOV.generateMachineCode('[si]', 'FFFF', 'dword').should.equal('678104FFFF0000');
        MOV.generateMachineCode('[bx]', '1FFF', 'dword').should.equal('678107FF1F0000');
        MOV.generateMachineCode('[di]', '1FFFFFFF', 'dword').should.equal('678105FFFFFF1F');
    }

    @test 'disp and bytes'() {
        MOV.generateMachineCode('[1]', '1').should.equal('81050100000001000000');
        MOV.generateMachineCode('[11]', '1111').should.equal('81051100000011110000');
        MOV.generateMachineCode('[1]', '11111111').should.equal('81050100000011111111');
        MOV.generateMachineCode('[11]', 'F').should.equal('8105110000000F000000');
        MOV.generateMachineCode('[1]', 'FFFF').should.equal('810501000000FFFF0000');
        MOV.generateMachineCode('[1]', 'FFFFFFFF').should.equal('810501000000FFFFFFFF');
        MOV.generateMachineCode('[1111]', '1').should.equal('81051111000001000000');
        MOV.generateMachineCode('[1111]', '1111').should.equal('81051111000011110000');
        MOV.generateMachineCode('[1111]', '11111111').should.equal('81051111000011111111');
        MOV.generateMachineCode('[1111]', 'F').should.equal('8105111100000F000000');
        MOV.generateMachineCode('[1111]', 'FFFF').should.equal('810511110000FFFF0000');
        MOV.generateMachineCode('[11111111]', 'FFFFFFFF').should.equal('810511111111FFFFFFFF');
        MOV.generateMachineCode('[11111111]', '1').should.equal('81051111111101000000');
        MOV.generateMachineCode('[11111111]', '1111').should.equal('81051111111111110000');
        MOV.generateMachineCode('[11111111]', '11111111').should.equal('81051111111111111111');
        MOV.generateMachineCode('[FF]', '11111111').should.equal('8105FF00000011111111');
        MOV.generateMachineCode('[FFFF]', '11111111').should.equal('8105FFFF000011111111');
        MOV.generateMachineCode('[FFFFFFF]', '11111111').should.equal('8105FFFFFF0F11111111');
        MOV.generateMachineCode('[11111111]', 'F').should.equal('8105111111110F000000');
        MOV.generateMachineCode('[11111111]', 'FFFF').should.equal('810511111111FFFF0000');
        MOV.generateMachineCode('[11111111]', 'FFFFFFFF').should.equal('810511111111FFFFFFFF');
    }

    @test 'disp and bytes, byte ptr'() {
        MOV.generateMachineCode('[1]', '1', 'byte').should.equal('80050100000001');
        MOV.generateMachineCode('[11]', '1111', 'byte').should.equal('80051100000011');
        MOV.generateMachineCode('[1]', '11111111', 'byte').should.equal('80050100000011');
        MOV.generateMachineCode('[11]', 'F', 'byte').should.equal('8005110000000F');
        MOV.generateMachineCode('[1]', 'FFFF', 'byte').should.equal('800501000000FF');
        MOV.generateMachineCode('[1]', 'FFFFFFFF', 'byte').should.equal('800501000000FF');
        MOV.generateMachineCode('[1111]', '1', 'byte').should.equal('80051111000001');
        MOV.generateMachineCode('[1111]', '1111', 'byte').should.equal('80051111000011');
        MOV.generateMachineCode('[1111]', '11111111', 'byte').should.equal('80051111000011');
        MOV.generateMachineCode('[1111]', 'F', 'byte').should.equal('8005111100000F');
        MOV.generateMachineCode('[1111]', 'FFFF', 'byte').should.equal('800511110000FF');
        MOV.generateMachineCode('[11111111]', 'FFFFFFFF', 'byte').should.equal('800511111111FF');
        MOV.generateMachineCode('[11111111]', '1', 'byte').should.equal('80051111111101');
        MOV.generateMachineCode('[11111111]', '1111', 'byte').should.equal('80051111111111');
        MOV.generateMachineCode('[11111111]', '11111111', 'byte').should.equal('80051111111111');
        MOV.generateMachineCode('[FF]', '11111111', 'byte').should.equal('8005FF00000011');
        MOV.generateMachineCode('[FFFF]', '11111111', 'byte').should.equal('8005FFFF000011');
        MOV.generateMachineCode('[FFFFFFF]', '11111111', 'byte').should.equal('8005FFFFFF0F11');
        MOV.generateMachineCode('[11111111]', 'F', 'byte').should.equal('8005111111110F');
        MOV.generateMachineCode('[11111111]', 'FFFF', 'byte').should.equal('800511111111FF');
        MOV.generateMachineCode('[11111111]', 'FFFFFFFF', 'byte').should.equal('800511111111FF');
    }

    @test 'disp and bytes, word ptr'() {
        MOV.generateMachineCode('[1]', '1', 'word').should.equal('668105010000000100');
        MOV.generateMachineCode('[11]', '1111', 'word').should.equal('668105110000001111');
        MOV.generateMachineCode('[1]', '11111111', 'word').should.equal('668105010000001111');
        MOV.generateMachineCode('[11]', 'F', 'word').should.equal('668105110000000F00');
        MOV.generateMachineCode('[1]', 'FFFF', 'word').should.equal('66810501000000FFFF');
        MOV.generateMachineCode('[1]', 'FFFFFFFF', 'word').should.equal('66810501000000FFFF');
        MOV.generateMachineCode('[1111]', '1', 'word').should.equal('668105111100000100');
        MOV.generateMachineCode('[1111]', '1111', 'word').should.equal('668105111100001111');
        MOV.generateMachineCode('[1111]', '11111111', 'word').should.equal('668105111100001111');
        MOV.generateMachineCode('[1111]', 'F', 'word').should.equal('668105111100000F00');
        MOV.generateMachineCode('[1111]', 'FFFF', 'word').should.equal('66810511110000FFFF');
        MOV.generateMachineCode('[11111111]', 'FFFFFFFF', 'word').should.equal('66810511111111FFFF');
        MOV.generateMachineCode('[11111111]', '1', 'word').should.equal('668105111111110100');
        MOV.generateMachineCode('[11111111]', '1111', 'word').should.equal('668105111111111111');
        MOV.generateMachineCode('[11111111]', '11111111', 'word').should.equal('668105111111111111');
        MOV.generateMachineCode('[FF]', '11111111', 'word').should.equal('668105FF0000001111');
        MOV.generateMachineCode('[FFFF]', '11111111', 'word').should.equal('668105FFFF00001111');
        MOV.generateMachineCode('[FFFFFFF]', '11111111', 'word').should.equal('668105FFFFFF0F1111');
        MOV.generateMachineCode('[11111111]', 'F', 'word').should.equal('668105111111110F00');
        MOV.generateMachineCode('[11111111]', 'FFFF', 'word').should.equal('66810511111111FFFF');
        MOV.generateMachineCode('[11111111]', 'FFFFFFFF', 'word').should.equal('66810511111111FFFF');
    }

    @test 'disp and bytes, dworf ptr'() {
        MOV.generateMachineCode('[1]', '1', 'dword').should.equal('81050100000001000000');
        MOV.generateMachineCode('[11]', '1111', 'dword').should.equal('81051100000011110000');
        MOV.generateMachineCode('[1]', '11111111', 'dword').should.equal('81050100000011111111');
        MOV.generateMachineCode('[11]', 'F', 'dword').should.equal('8105110000000F000000');
        MOV.generateMachineCode('[1]', 'FFFF', 'dword').should.equal('810501000000FFFF0000');
        MOV.generateMachineCode('[1]', 'FFFFFFFF', 'dword').should.equal('810501000000FFFFFFFF');
        MOV.generateMachineCode('[1111]', '1', 'dword').should.equal('81051111000001000000');
        MOV.generateMachineCode('[1111]', '1111', 'dword').should.equal('81051111000011110000');
        MOV.generateMachineCode('[1111]', '11111111', 'dword').should.equal('81051111000011111111');
        MOV.generateMachineCode('[1111]', 'F', 'dword').should.equal('8105111100000F000000');
        MOV.generateMachineCode('[1111]', 'FFFF', 'dword').should.equal('810511110000FFFF0000');
        MOV.generateMachineCode('[11111111]', 'FFFFFFFF', 'dword').should.equal('810511111111FFFFFFFF');
        MOV.generateMachineCode('[11111111]', '1', 'dword').should.equal('81051111111101000000');
        MOV.generateMachineCode('[11111111]', '1111', 'dword').should.equal('81051111111111110000');
        MOV.generateMachineCode('[11111111]', '11111111', 'dword').should.equal('81051111111111111111');
        MOV.generateMachineCode('[FF]', '11111111', 'dword').should.equal('8105FF00000011111111');
        MOV.generateMachineCode('[FFFF]', '11111111', 'dword').should.equal('8105FFFF000011111111');
        MOV.generateMachineCode('[FFFFFFF]', '11111111', 'dword').should.equal('8105FFFFFF0F11111111');
        MOV.generateMachineCode('[11111111]', 'F', 'dword').should.equal('8105111111110F000000');
        MOV.generateMachineCode('[11111111]', 'FFFF', 'dword').should.equal('810511111111FFFF0000');
        MOV.generateMachineCode('[11111111]', 'FFFFFFFF', 'dword').should.equal('810511111111FFFFFFFF');
    }

    @test '32bit reg+disp and bytes'() {
        MOV.generateMachineCode('[eax+1]', '1').should.equal('81400101000000');
        MOV.generateMachineCode('[ebx+11]', '1111').should.equal('81431111110000');
        MOV.generateMachineCode('[eax+1]', '11111111').should.equal('81400111111111');
        MOV.generateMachineCode('[ecx+11]', 'F').should.equal('8141110F000000');
        MOV.generateMachineCode('[eax+1]', 'FFFF').should.equal('814001FFFF0000');
        MOV.generateMachineCode('[eax+1]', 'FFFFFFFF').should.equal('814001FFFFFFFF');
        MOV.generateMachineCode('[eax+1111]', '1').should.equal('81801111000001000000');
        MOV.generateMachineCode('[eax+1111]', '1111').should.equal('81801111000011110000');
        MOV.generateMachineCode('[eax+1111]', '11111111').should.equal('81801111000011111111');
        MOV.generateMachineCode('[eax+1111]', 'F').should.equal('8180111100000F000000');
        MOV.generateMachineCode('[eax+1111]', 'FFFF').should.equal('818011110000FFFF0000');
        MOV.generateMachineCode('[eax+11111111]', 'FFFFFFFF').should.equal('818011111111FFFFFFFF');
        MOV.generateMachineCode('[eax+11111111]', '1').should.equal('81801111111101000000');
        MOV.generateMachineCode('[eax+11111111]', '1111').should.equal('81801111111111110000');
        MOV.generateMachineCode('[eax+11111111]', '11111111').should.equal('81801111111111111111');
        MOV.generateMachineCode('[eax+FF]', '11111111').should.equal('8180FF00000011111111');
        MOV.generateMachineCode('[eax+FFFF]', '11111111').should.equal('8180FFFF000011111111');
        MOV.generateMachineCode('[eax+FFFFFFF]', '11111111').should.equal('8180FFFFFF0F11111111');
        MOV.generateMachineCode('[eax+11111111]', 'F').should.equal('8180111111110F000000');
        MOV.generateMachineCode('[eax+11111111]', 'FFFF').should.equal('818011111111FFFF0000');
        MOV.generateMachineCode('[eax+11111111]', 'FFFFFFFF').should.equal('818011111111FFFFFFFF');
    }

    @test '32bit reg+disp and bytes, word ptr'() {
        MOV.generateMachineCode('[eax+1]', '1', 'word').should.equal('668140010100');
        MOV.generateMachineCode('[ebx+11]', '1111', 'word').should.equal('668143111111');
        MOV.generateMachineCode('[eax+1]', '11111111', 'word').should.equal('668140011111');
        MOV.generateMachineCode('[ecx+11]', 'F', 'word').should.equal('668141110F00');
        MOV.generateMachineCode('[eax+1]', 'FFFF', 'word').should.equal('66814001FFFF');
        MOV.generateMachineCode('[eax+1]', 'FFFFFFFF', 'word').should.equal('66814001FFFF');
        MOV.generateMachineCode('[eax+1111]', '1', 'word').should.equal('668180111100000100');
        MOV.generateMachineCode('[eax+1111]', '1111', 'word').should.equal('668180111100001111');
        MOV.generateMachineCode('[eax+1111]', '11111111', 'word').should.equal('668180111100001111');
        MOV.generateMachineCode('[eax+1111]', 'F', 'word').should.equal('668180111100000F00');
        MOV.generateMachineCode('[eax+1111]', 'FFFF', 'word').should.equal('66818011110000FFFF');
        MOV.generateMachineCode('[eax+11111111]', 'FFFFFFFF', 'word').should.equal('66818011111111FFFF');
        MOV.generateMachineCode('[eax+11111111]', '1', 'word').should.equal('668180111111110100');
        MOV.generateMachineCode('[eax+11111111]', '1111', 'word').should.equal('668180111111111111');
        MOV.generateMachineCode('[eax+11111111]', '11111111', 'word').should.equal('668180111111111111');
        MOV.generateMachineCode('[eax+FF]', '11111111', 'word').should.equal('668180FF0000001111');
        MOV.generateMachineCode('[eax+FFFF]', '11111111', 'word').should.equal('668180FFFF00001111');
        MOV.generateMachineCode('[eax+FFFFFFF]', '11111111', 'word').should.equal('668180FFFFFF0F1111');
        MOV.generateMachineCode('[eax+11111111]', 'F', 'word').should.equal('668180111111110F00');
        MOV.generateMachineCode('[eax+11111111]', 'FFFF', 'word').should.equal('66818011111111FFFF');
        MOV.generateMachineCode('[eax+11111111]', 'FFFFFFFF', 'word').should.equal('66818011111111FFFF');
    }

    @test '32bit reg+disp and bytes, byte ptr'() {
        MOV.generateMachineCode('[eax+1]', '1', 'byte').should.equal('80400101');
        MOV.generateMachineCode('[ebx+11]', '1111', 'byte').should.equal('80431111');
        MOV.generateMachineCode('[eax+1]', '11111111', 'byte').should.equal('80400111');
        MOV.generateMachineCode('[ecx+11]', 'F', 'byte').should.equal('8041110F');
        MOV.generateMachineCode('[eax+1]', 'FFFF', 'byte').should.equal('804001FF');
        MOV.generateMachineCode('[eax+1]', 'FFFFFFFF', 'byte').should.equal('804001FF');
        MOV.generateMachineCode('[eax+1111]', '1', 'byte').should.equal('80801111000001');
        MOV.generateMachineCode('[eax+1111]', '1111', 'byte').should.equal('80801111000011');
        MOV.generateMachineCode('[eax+1111]', '11111111', 'byte').should.equal('80801111000011');
        MOV.generateMachineCode('[eax+1111]', 'F', 'byte').should.equal('8080111100000F');
        MOV.generateMachineCode('[eax+1111]', 'FFFF', 'byte').should.equal('808011110000FF');
        MOV.generateMachineCode('[eax+11111111]', 'FFFFFFFF', 'byte').should.equal('808011111111FF');
        MOV.generateMachineCode('[eax+11111111]', '1', 'byte').should.equal('80801111111101');
        MOV.generateMachineCode('[eax+11111111]', '1111', 'byte').should.equal('80801111111111');
        MOV.generateMachineCode('[eax+11111111]', '11111111', 'byte').should.equal('80801111111111');
        MOV.generateMachineCode('[eax+FF]', '11111111', 'byte').should.equal('8080FF00000011');
        MOV.generateMachineCode('[eax+FFFF]', '11111111', 'byte').should.equal('8080FFFF000011');
        MOV.generateMachineCode('[eax+FFFFFFF]', '11111111', 'byte').should.equal('8080FFFFFF0F11');
        MOV.generateMachineCode('[eax+11111111]', 'F', 'byte').should.equal('8080111111110F');
        MOV.generateMachineCode('[eax+11111111]', 'FFFF', 'byte').should.equal('808011111111FF');
        MOV.generateMachineCode('[eax+11111111]', 'FFFFFFFF', 'byte').should.equal('808011111111FF');
    }

    @test '32bit reg+disp and bytes, dword'() {
        MOV.generateMachineCode('[eax+1]', '1', 'dword').should.equal('81400101000000');
        MOV.generateMachineCode('[ebx+11]', '1111', 'dword').should.equal('81431111110000');
        MOV.generateMachineCode('[eax+1]', '11111111', 'dword').should.equal('81400111111111');
        MOV.generateMachineCode('[ecx+11]', 'F', 'dword').should.equal('8141110F000000');
        MOV.generateMachineCode('[eax+1]', 'FFFF', 'dword').should.equal('814001FFFF0000');
        MOV.generateMachineCode('[eax+1]', 'FFFFFFFF', 'dword').should.equal('814001FFFFFFFF');
        MOV.generateMachineCode('[eax+1111]', '1', 'dword').should.equal('81801111000001000000');
        MOV.generateMachineCode('[eax+1111]', '1111', 'dword').should.equal('81801111000011110000');
        MOV.generateMachineCode('[eax+1111]', '11111111', 'dword').should.equal('81801111000011111111');
        MOV.generateMachineCode('[eax+1111]', 'F', 'dword').should.equal('8180111100000F000000');
        MOV.generateMachineCode('[eax+1111]', 'FFFF', 'dword').should.equal('818011110000FFFF0000');
        MOV.generateMachineCode('[eax+11111111]', 'FFFFFFFF', 'dword').should.equal('818011111111FFFFFFFF');
        MOV.generateMachineCode('[eax+11111111]', '1', 'dword').should.equal('81801111111101000000');
        MOV.generateMachineCode('[eax+11111111]', '1111', 'dword').should.equal('81801111111111110000');
        MOV.generateMachineCode('[eax+11111111]', '11111111', 'dword').should.equal('81801111111111111111');
        MOV.generateMachineCode('[eax+FF]', '11111111', 'dword').should.equal('8180FF00000011111111');
        MOV.generateMachineCode('[eax+FFFF]', '11111111', 'dword').should.equal('8180FFFF000011111111');
        MOV.generateMachineCode('[eax+FFFFFFF]', '11111111', 'dword').should.equal('8180FFFFFF0F11111111');
        MOV.generateMachineCode('[eax+11111111]', 'F', 'dword').should.equal('8180111111110F000000');
        MOV.generateMachineCode('[eax+11111111]', 'FFFF', 'dword').should.equal('818011111111FFFF0000');
        MOV.generateMachineCode('[eax+11111111]', 'FFFFFFFF', 'dword').should.equal('818011111111FFFFFFFF');
    }

    @test '32bit reg-disp and bytes, dword'() {
        MOV.generateMachineCode('[eax-1]', '1', 'dword').should.equal('8140FF01000000');
        MOV.generateMachineCode('[ebx-11]', '1111', 'dword').should.equal('8143EF11110000');
        MOV.generateMachineCode('[eax-1]', '11111111', 'dword').should.equal('8140FF11111111');
        MOV.generateMachineCode('[ecx-11]', 'F', 'dword').should.equal('8141EF0F000000');
        MOV.generateMachineCode('[eax-1]', 'FFFF', 'dword').should.equal('8140FFFFFF0000');
        MOV.generateMachineCode('[eax-1]', 'FFFFFFFF', 'dword').should.equal('8140FFFFFFFFFF');
        MOV.generateMachineCode('[eax-1111]', '1', 'dword').should.equal('8180EFEEFFFF01000000');
        MOV.generateMachineCode('[eax-1111]', '1111', 'dword').should.equal('8180EFEEFFFF11110000');
        MOV.generateMachineCode('[eax-1111]', '11111111', 'dword').should.equal('8180EFEEFFFF11111111');
        MOV.generateMachineCode('[eax-1111]', 'F', 'dword').should.equal('8180EFEEFFFF0F000000');
        MOV.generateMachineCode('[eax-1111]', 'FFFF', 'dword').should.equal('8180EFEEFFFFFFFF0000');
        MOV.generateMachineCode('[eax-11111111]', 'FFFFFFFF', 'dword').should.equal('8180EFEEEEEEFFFFFFFF');
        MOV.generateMachineCode('[eax-11111111]', '1', 'dword').should.equal('8180EFEEEEEE01000000');
        MOV.generateMachineCode('[eax-11111111]', '1111', 'dword').should.equal('8180EFEEEEEE11110000');
        MOV.generateMachineCode('[eax-11111111]', '11111111', 'dword').should.equal('8180EFEEEEEE11111111');
        MOV.generateMachineCode('[eax-FF]', '11111111', 'dword').should.equal('818001FFFFFF11111111');
        MOV.generateMachineCode('[eax-FFFF]', '11111111', 'dword').should.equal('81800100FFFF11111111');
        MOV.generateMachineCode('[eax-FFFFFFF]', '11111111', 'dword').should.equal('8180010000F011111111');
        MOV.generateMachineCode('[eax-11111111]', 'F', 'dword').should.equal('8180EFEEEEEE0F000000');
        MOV.generateMachineCode('[eax-11111111]', 'FFFF', 'dword').should.equal('8180EFEEEEEEFFFF0000');
        MOV.generateMachineCode('[eax-11111111]', 'FFFFFFFF', 'dword').should.equal('8180EFEEEEEEFFFFFFFF');
    }

    @test '16bit reg+disp and bytes, dword'() {
        MOV.generateMachineCode('[si+1]', '1', 'dword').should.equal('6781440101000000');
        MOV.generateMachineCode('[si+11]', '1111', 'dword').should.equal('6781441111110000');
        MOV.generateMachineCode('[bx+1]', '11111111', 'dword').should.equal('6781470111111111');
        MOV.generateMachineCode('[di+11]', 'F', 'dword').should.equal('678145110F000000');
        MOV.generateMachineCode('[bx+si+1]', 'FFFF', 'dword').should.equal('67814001FFFF0000');
        MOV.generateMachineCode('[bx+di+1]', 'FFFFFFFF', 'dword').should.equal('67814101FFFFFFFF');
        MOV.generateMachineCode('[bp+di+1111]', '1', 'dword').should.equal('678183111101000000');
        MOV.generateMachineCode('[bp+si+1111]', '1111', 'dword').should.equal('678182111111110000');
        MOV.generateMachineCode('[si+1111]', '11111111', 'dword').should.equal('678184111111111111');
        MOV.generateMachineCode('[bp+di+1111]', 'F', 'dword').should.equal('67818311110F000000');
        MOV.generateMachineCode('[bp+si+1111]', 'FFFF', 'dword').should.equal('6781821111FFFF0000');
        MOV.generateMachineCode('[di+FF]', '11111111', 'dword').should.equal('678185FF0011111111');
        MOV.generateMachineCode('[bx+si+FFFF]', '11111111', 'dword').should.equal('678180FFFF11111111');
    }

    @test '16bit reg-disp and bytes, dword'() {
        MOV.generateMachineCode('[si-1]', '1', 'dword').should.equal('678144FF01000000');
        MOV.generateMachineCode('[si-11]', '1111', 'dword').should.equal('678144EF11110000');
        MOV.generateMachineCode('[bx-1]', '11111111', 'dword').should.equal('678147FF11111111');
        MOV.generateMachineCode('[di-11]', 'F', 'dword').should.equal('678145EF0F000000');
        MOV.generateMachineCode('[bx+si-1]', 'FFFF', 'dword').should.equal('678140FFFFFF0000');
        MOV.generateMachineCode('[bx+di-1]', 'FFFFFFFF', 'dword').should.equal('678141FFFFFFFFFF');
        MOV.generateMachineCode('[bp+di-1111]', '1', 'dword').should.equal('678183EFEE01000000');
        MOV.generateMachineCode('[bp+si-1111]', '1111', 'dword').should.equal('678182EFEE11110000');
        MOV.generateMachineCode('[si-1111]', '11111111', 'dword').should.equal('678184EFEE11111111');
        MOV.generateMachineCode('[bp+di-1111]', 'F', 'dword').should.equal('678183EFEE0F000000');
        MOV.generateMachineCode('[bp+si-1111]', 'FFFF', 'dword').should.equal('678182EFEEFFFF0000');
        MOV.generateMachineCode('[di-FF]', '11111111', 'dword').should.equal('67818501FF11111111');
        MOV.generateMachineCode('[bx+si-FFFF]', '11111111', 'dword').should.equal('678180010011111111');
    }


    @test '16bit reg+disp and bytes, word'() {
        MOV.generateMachineCode('[si+1]', '1', 'word').should.equal('67668144010100');
        MOV.generateMachineCode('[si+11]', '1111', 'word').should.equal('67668144111111');
        MOV.generateMachineCode('[bx+1]', '11111111', 'word').should.equal('67668147011111');
        MOV.generateMachineCode('[di+11]', 'F', 'word').should.equal('67668145110F00');
        MOV.generateMachineCode('[bx+si+1]', 'FFFF', 'word').should.equal('6766814001FFFF');
        MOV.generateMachineCode('[bx+di+1]', 'FFFFFFFF', 'word').should.equal('6766814101FFFF');
        MOV.generateMachineCode('[bp+di+1111]', '1', 'word').should.equal('6766818311110100');
        MOV.generateMachineCode('[bp+si+1111]', '1111', 'word').should.equal('6766818211111111');
        MOV.generateMachineCode('[si+1111]', '11111111', 'word').should.equal('6766818411111111');
        MOV.generateMachineCode('[bp+di+1111]', 'F', 'word').should.equal('6766818311110F00');
        MOV.generateMachineCode('[bp+si+1111]', 'FFFF', 'word').should.equal('676681821111FFFF');
        MOV.generateMachineCode('[di+FF]', '11111111', 'word').should.equal('67668185FF001111');
        MOV.generateMachineCode('[bx+si+FFFF]', '11111111', 'word').should.equal('67668180FFFF1111');
    }

    @test '16bit reg+disp and bytes, byte'() {
        MOV.generateMachineCode('[si+1]', '1', 'byte').should.equal('6780440101');
        MOV.generateMachineCode('[si+11]', '1111', 'byte').should.equal('6780441111');
        MOV.generateMachineCode('[bx+1]', '11111111', 'byte').should.equal('6780470111');
        MOV.generateMachineCode('[di+11]', 'F', 'byte').should.equal('678045110F');
        MOV.generateMachineCode('[bx+si+1]', 'FFFF', 'byte').should.equal('67804001FF');
        MOV.generateMachineCode('[bx+di+1]', 'FFFFFFFF', 'byte').should.equal('67804101FF');
        MOV.generateMachineCode('[bp+di+1111]', '1', 'byte').should.equal('678083111101');
        MOV.generateMachineCode('[bp+si+1111]', '1111', 'byte').should.equal('678082111111');
        MOV.generateMachineCode('[si+1111]', '11111111', 'byte').should.equal('678084111111');
        MOV.generateMachineCode('[bp+di+1111]', 'F', 'byte').should.equal('67808311110F');
        MOV.generateMachineCode('[bp+si+1111]', 'FFFF', 'byte').should.equal('6780821111FF');
        MOV.generateMachineCode('[di+FF]', '11111111', 'byte').should.equal('678085FF0011');
        MOV.generateMachineCode('[bx+si+FFFF]', '11111111', 'byte').should.equal('678080FFFF11');
    }
}













































































































































































