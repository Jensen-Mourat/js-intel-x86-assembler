import{suite, test} from '@testdeck/mocha';
import * as _chai from 'chai';
import {ADD} from '../src/constants/AsmFunctions/ADD';
import {PARAMETERS} from './parameters';
import {convertHexToBinary, convertToTwosComp} from '../src/functions/getTypes';
import {rotate} from '../src/functions/rotate';

_chai.should();

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
        //ADD.generateMachineCode('ax', '[si+12]').should.equal('6766034412');
        ADD.generateMachineCode('ax', '[si+1122]').should.equal('676603842211');
        ADD.generateMachineCode('ax', '[si+112234]').should.equal('676603843422');
    }

    @test 'r16 with r16 + r16'() {
        ADD.generateMachineCode('ax', '[bx+si]').should.equal('67660300');
        ADD.generateMachineCode('bx', '[bx+di]').should.equal('67660319');
        ADD.generateMachineCode('cx', '[bp+si]').should.equal('6766030A');
        ADD.generateMachineCode('dx', '[si]').should.equal('67660314');
        ADD.generateMachineCode('dx', '[di]').should.equal('67660315');
        ADD.generateMachineCode('ax', '[bx]').should.equal('67660307');
    }

    @test 'r16 with r16 + r16 + disp'() {
        ADD.generateMachineCode('ax', '[bx+si+12]').should.equal('6766034012');
        ADD.generateMachineCode('bx', '[bx+di+12]').should.equal('6766035912');
        ADD.generateMachineCode('cx', '[bp+si+1]').should.equal('6766034A01');
        ADD.generateMachineCode('dx', '[si+12]').should.equal('6766035412');
        ADD.generateMachineCode('dx', '[di+12]').should.equal('6766035512');
        ADD.generateMachineCode('ax', '[bx+12]').should.equal('6766034712');
        ADD.generateMachineCode('dx', '[di+1]').should.equal('6766035501');
        ADD.generateMachineCode('ax', '[bx+1]').should.equal('6766034701');
        //disp16
        ADD.generateMachineCode('ax', '[bx+si+1234]').should.equal('676603803412');
        ADD.generateMachineCode('bx', '[bx+di+1234]').should.equal('676603993412');
        ADD.generateMachineCode('cx', '[bp+si+134]').should.equal('6766038A3401');
        ADD.generateMachineCode('dx', '[si+1243]').should.equal('676603944312');
        ADD.generateMachineCode('dx', '[di+1243]').should.equal('676603954312');
        ADD.generateMachineCode('ax', '[bx+1234]').should.equal('676603873412');
        ADD.generateMachineCode('ax', '[bx+123]').should.equal('676603872301');
        ADD.generateMachineCode('ax', '[bx+si+123445]').should.equal('676603804534');
        ADD.generateMachineCode('ax', '[bx+123445]').should.equal('676603874534');
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

    @test 'r32 with reg+reg'() {
        ADD.generateMachineCode('eax', '[eax+eax]').should.equal('030400');
        ADD.generateMachineCode('eax', '[ecx+ebx]').should.equal('030419');
        ADD.generateMachineCode('esi', '[eax+edx]').should.equal('033410');
        ADD.generateMachineCode('eax', '[eax+ebp]').should.equal('030428');
        ADD.generateMachineCode('edi', '[edx+esi]').should.equal('033C32');
        ADD.generateMachineCode('ebp', '[eax+edi]').should.equal('032C38');
        ADD.generateMachineCode('edx', '[eax+ebx]').should.equal('031418');
        ADD.generateMachineCode('ecx', '[ebx+eax]').should.equal('030C03');
        ADD.generateMachineCode('ebx', '[eax+eax]').should.equal('031C00');
        (() => ADD.generateMachineCode('ebx', '[eax+ax]')).should.throw;
    }

    @test 'r32 with reg+reg*constant'() {
        ADD.generateMachineCode('eax', '[eax+eax*2]').should.equal('030440');
        ADD.generateMachineCode('eax', '[ecx+ebx*4]').should.equal('030499');
        ADD.generateMachineCode('esi', '[eax+edx*8]').should.equal('0334D0');
        ADD.generateMachineCode('eax', '[eax+ebp*2]').should.equal('030468');
        ADD.generateMachineCode('edi', '[edx+esi*1]').should.equal('033C32');
        ADD.generateMachineCode('ebp', '[eax+edi*8]').should.equal('032CF8');
        ADD.generateMachineCode('edx', '[eax+ebx*2]').should.equal('031458');
        ADD.generateMachineCode('ecx', '[ebx+eax*4]').should.equal('030C83');
        ADD.generateMachineCode('ebx', '[eax+eax*1]').should.equal('031C00');
        (() => ADD.generateMachineCode('ebx', '[eax+eax*3]')).should.throw;
    }

    @test 'r32 with reg+reg*constant+displacement'() {
        ADD.generateMachineCode('eax', '[eax+eax*2+1]').should.equal('03444001');
        ADD.generateMachineCode('eax', '[ecx+ebx*4+1]').should.equal('03449901');
        ADD.generateMachineCode('esi', '[eax+edx*8+1]').should.equal('0374D001');
        ADD.generateMachineCode('eax', '[eax+ebp*2+1]').should.equal('03446801');
        ADD.generateMachineCode('edi', '[edx+esi*1+12]').should.equal('037C3212');
        ADD.generateMachineCode('ebp', '[eax+edi*8+12]').should.equal('036CF812');
        ADD.generateMachineCode('edx', '[eax+ebx*2+12]').should.equal('03545812');
        ADD.generateMachineCode('ecx', '[ebx+eax*4+12]').should.equal('034C8312');
        ADD.generateMachineCode('ebx', '[eax+eax*1+12]').should.equal('035C0012');
        ADD.generateMachineCode('eax', '[eax+eax*2+123]').should.equal('03844023010000');
        ADD.generateMachineCode('eax', '[ecx+ebx*4+123]').should.equal('03849923010000');
        ADD.generateMachineCode('esi', '[eax+edx*8+123]').should.equal('03B4D023010000');
        ADD.generateMachineCode('eax', '[eax+ebp*2+123]').should.equal('03846823010000');
        ADD.generateMachineCode('edi', '[edx+esi*1+1234]').should.equal('03BC3234120000');
        ADD.generateMachineCode('ebp', '[eax+edi*8+1234]').should.equal('03ACF834120000');
        ADD.generateMachineCode('edx', '[eax+ebx*2+1234]').should.equal('03945834120000');
        ADD.generateMachineCode('ecx', '[ebx+eax*4+1234]').should.equal('038C8334120000');
        ADD.generateMachineCode('ebx', '[eax+eax*1+1234]').should.equal('039C0034120000');
        ADD.generateMachineCode('eax', '[eax+eax*2+12345]').should.equal('03844045230100');
        ADD.generateMachineCode('eax', '[ecx+ebx*4+12345]').should.equal('03849945230100');
        ADD.generateMachineCode('esi', '[eax+edx*8+12345]').should.equal('03B4D045230100');
        ADD.generateMachineCode('eax', '[eax+ebp*2+12345]').should.equal('03846845230100');
        ADD.generateMachineCode('edi', '[edx+esi*1+123456]').should.equal('03BC3256341200');
        ADD.generateMachineCode('ebp', '[eax+edi*8+123456]').should.equal('03ACF856341200');
        ADD.generateMachineCode('edx', '[eax+ebx*2+123456]').should.equal('03945856341200');
        ADD.generateMachineCode('ecx', '[ebx+eax*4+123456]').should.equal('038C8356341200');
        ADD.generateMachineCode('ebx', '[eax+eax*1+123456]').should.equal('039C0056341200');
        ADD.generateMachineCode('eax', '[eax+eax*2+1234567]').should.equal('03844067452301');
        ADD.generateMachineCode('eax', '[ecx+ebx*4+1234567]').should.equal('03849967452301');
        ADD.generateMachineCode('esi', '[eax+edx*8+1234567]').should.equal('03B4D067452301');
        ADD.generateMachineCode('eax', '[eax+ebp*2+1234567]').should.equal('03846867452301');
        ADD.generateMachineCode('edi', '[edx+esi*1+12345678]').should.equal('03BC3278563412');
        ADD.generateMachineCode('ebp', '[eax+edi*8+12345678]').should.equal('03ACF878563412');
        ADD.generateMachineCode('edx', '[eax+ebx*2+12345678]').should.equal('03945878563412');
        ADD.generateMachineCode('ecx', '[ebx+eax*4+12345678]').should.equal('038C8378563412');
        ADD.generateMachineCode('ebx', '[eax+eax*1+12345678]').should.equal('039C0078563412');
        (() => ADD.generateMachineCode('ebx', '[eax+eax*3+1]')).should.throw;
        (() => ADD.generateMachineCode('ebx', '[eax+eax*2+11232131231]')).should.throw;
    }

    @test 'r8 negative displacement' () {
        ADD.generateMachineCode('al', '[-0]').should.equal('020500000000');
        ADD.generateMachineCode('al', '[-1]').should.equal('0205FFFFFFFF');
        ADD.generateMachineCode('al', '[-11]').should.equal('0205EFFFFFFF');
        ADD.generateMachineCode('al', '[-FF]').should.equal('020501FFFFFF');
        ADD.generateMachineCode('al', '[-12]').should.equal('0205EEFFFFFF');
        ADD.generateMachineCode('al', '[-111]').should.equal('0205EFFEFFFF');
        ADD.generateMachineCode('al', '[-FFF]').should.equal('020501F0FFFF');
        ADD.generateMachineCode('al', '[-123]').should.equal('0205DDFEFFFF');
        ADD.generateMachineCode('al', '[-1111]').should.equal('0205EFEEFFFF');
        ADD.generateMachineCode('al', '[-FFFF]').should.equal('02050100FFFF');
        ADD.generateMachineCode('al', '[-1234]').should.equal('0205CCEDFFFF');
        ADD.generateMachineCode('al', '[-11111111]').should.equal('0205EFEEEEEE');
        ADD.generateMachineCode('al', '[-FFFFFFFF]').should.equal('020501000000');
        ADD.generateMachineCode('al', '[-12345678]').should.equal('020588A9CBED');
        ADD.generateMachineCode('al', '[-1234567]').should.equal('020599BADCFE');
    }

    @test 'r16 negative displacement' () {
        ADD.generateMachineCode('ax', '[-0]').should.equal('66030500000000');
        ADD.generateMachineCode('ax', '[-1]').should.equal('660305FFFFFFFF');
        ADD.generateMachineCode('ax', '[-11]').should.equal('660305EFFFFFFF');
        ADD.generateMachineCode('ax', '[-FF]').should.equal('66030501FFFFFF');
        ADD.generateMachineCode('ax', '[-12]').should.equal('660305EEFFFFFF');
        ADD.generateMachineCode('ax', '[-111]').should.equal('660305EFFEFFFF');
        ADD.generateMachineCode('ax', '[-FFF]').should.equal('66030501F0FFFF');
        ADD.generateMachineCode('ax', '[-123]').should.equal('660305DDFEFFFF');
        ADD.generateMachineCode('ax', '[-1111]').should.equal('660305EFEEFFFF');
        ADD.generateMachineCode('ax', '[-FFFF]').should.equal('6603050100FFFF');
        ADD.generateMachineCode('ax', '[-1234]').should.equal('660305CCEDFFFF');
        ADD.generateMachineCode('ax', '[-11111111]').should.equal('660305EFEEEEEE');
        ADD.generateMachineCode('ax', '[-FFFFFFFF]').should.equal('66030501000000');
        ADD.generateMachineCode('ax', '[-12345678]').should.equal('66030588A9CBED');
        ADD.generateMachineCode('ax', '[-1234567]').should.equal('66030599BADCFE');
    }

    @test 'r32 negative displacement'() {
        ADD.generateMachineCode('eax', '[-0]').should.equal('030500000000');
        ADD.generateMachineCode('eax', '[-1]').should.equal('0305FFFFFFFF');
        ADD.generateMachineCode('eax', '[-FF]').should.equal('030501FFFFFF');
        ADD.generateMachineCode('eax', '[-12]').should.equal('0305EEFFFFFF');
        ADD.generateMachineCode('eax', '[-111]').should.equal('0305EFFEFFFF');
        ADD.generateMachineCode('eax', '[-FFF]').should.equal('030501F0FFFF');
        ADD.generateMachineCode('eax', '[-123]').should.equal('0305DDFEFFFF');
        ADD.generateMachineCode('eax', '[-1111]').should.equal('0305EFEEFFFF');
        ADD.generateMachineCode('eax', '[-FFFF]').should.equal('03050100FFFF');
        ADD.generateMachineCode('eax', '[-1234]').should.equal('0305CCEDFFFF');
        ADD.generateMachineCode('eax', '[-11111111]').should.equal('0305EFEEEEEE');
        ADD.generateMachineCode('eax', '[-FFFFFFFF]').should.equal('030501000000');
        ADD.generateMachineCode('eax', '[-12345678]').should.equal('030588A9CBED');
        ADD.generateMachineCode('eax', '[-1234567]').should.equal('030599BADCFE');
    }

    @test 'r32 negative reg+displacement'() {
        ADD.generateMachineCode('eax', '[si-12]').should.equal('670344EE');
        ADD.generateMachineCode('eax', '[eax-0]').should.equal('0300');
        ADD.generateMachineCode('eax', '[eax-11]').should.equal('0340EF');
        ADD.generateMachineCode('eax', '[eax-ff]').should.equal('038001FFFFFF'); //defuse.ca says 038001FFFFFF
        ADD.generateMachineCode('eax', '[eax-12]').should.equal('0340EE');
        ADD.generateMachineCode('eax', '[eax-111]').should.equal('0380EFFEFFFF');
        ADD.generateMachineCode('eax', '[eax-fff]').should.equal('038001F0FFFF');
        ADD.generateMachineCode('eax', '[eax-123]').should.equal('0380DDFEFFFF');
        ADD.generateMachineCode('eax', '[eax-1111]').should.equal('0380EFEEFFFF');
        ADD.generateMachineCode('eax', '[eax-ffff]').should.equal('03800100FFFF');
        ADD.generateMachineCode('eax', '[eax-1234]').should.equal('0380CCEDFFFF');
        ADD.generateMachineCode('eax', '[eax-11111111]').should.equal('0380EFEEEEEE');
        ADD.generateMachineCode('eax', '[eax-ffffffff]').should.equal('038001000000');
        ADD.generateMachineCode('eax', '[eax-12345678]').should.equal('038088A9CBED');
        ADD.generateMachineCode('eax', '[eax-1234567]').should.equal('038099BADCFE');
    }

    @test 'r32 negative reg+reg+displacement'() {
        ADD.generateMachineCode('eax', '[eax+eax*2-0]').should.equal('030440');
        ADD.generateMachineCode('eax', '[eax+eax*2-1]').should.equal('034440FF');
        ADD.generateMachineCode('eax', '[eax+eax*2-ff]').should.equal('03844001FFFFFF'); //defuse.ca says 038001FFFFFF
        ADD.generateMachineCode('eax', '[eax+eax*2-80]').should.equal('03444080');
        ADD.generateMachineCode('eax', '[eax+eax*2+80]').should.equal('03844080000000');
        ADD.generateMachineCode('eax', '[eax+eax*2-81]').should.equal('0384407FFFFFFF');
        ADD.generateMachineCode('eax', '[eax+eax*2+81]').should.equal('03844081000000');
        ADD.generateMachineCode('eax', '[eax+eax*2-79]').should.equal('03444087');
        ADD.generateMachineCode('eax', '[eax+eax*2+79]').should.equal('03444079');
        ADD.generateMachineCode('eax', '[eax+ebx*2-7f]').should.equal('03445881');
        ADD.generateMachineCode('eax', '[eax+ecx*2+7f]').should.equal('0344487F');
        ADD.generateMachineCode('eax', '[eax+edx*2+ef]').should.equal('038450EF000000');
        ADD.generateMachineCode('edx', '[eax+eax*2-ffff]').should.equal('0394400100FFFF');
        ADD.generateMachineCode('eax', '[eax+eax*2-1111]').should.equal('038440EFEEFFFF');
        ADD.generateMachineCode('eax', '[eax+eax*2-11111111]').should.equal('038440EFEEEEEE');
        ADD.generateMachineCode('eax', '[eax+eax*2-ffffffff]').should.equal('03844001000000');
    }

    @test 'r32 reg*const+displacement'() {
        ADD.generateMachineCode('eax', '[eax*2-0]').should.equal('03044500000000');
        ADD.generateMachineCode('eax', '[eax*2-1]').should.equal('030445FFFFFFFF');
        ADD.generateMachineCode('eax', '[eax*2-ff]').should.equal('03044501FFFFFF');
        ADD.generateMachineCode('eax', '[eax*2-80]').should.equal('03044580FFFFFF');
        ADD.generateMachineCode('eax', '[eax*2+80]').should.equal('03044580000000');
        ADD.generateMachineCode('eax', '[eax*2-81]').should.equal('0304457FFFFFFF');
        ADD.generateMachineCode('eax', '[eax*2+81]').should.equal('03044581000000');
        ADD.generateMachineCode('eax', '[eax*2-79]').should.equal('03044587FFFFFF');
        ADD.generateMachineCode('eax', '[eax*2+79]').should.equal('03044579000000');
        ADD.generateMachineCode('eax', '[ebx*2-7f]').should.equal('03045D81FFFFFF');
        ADD.generateMachineCode('eax', '[ecx*2+7f]').should.equal('03044D7F000000');
        ADD.generateMachineCode('eax', '[edx*2+ef]').should.equal('030455EF000000');
        ADD.generateMachineCode('edx', '[eax*2-ffff]').should.equal('0314450100FFFF');
        ADD.generateMachineCode('eax', '[eax*2-1111]').should.equal('030445EFEEFFFF');
        ADD.generateMachineCode('eax', '[eax*2-11111111]').should.equal('030445EFEEEEEE');
        ADD.generateMachineCode('eax', '[eax*2-ffffffff]').should.equal('03044501000000');
        ADD.generateMachineCode('eax', '[eax*4-0]').should.equal('03048500000000');
        ADD.generateMachineCode('eax', '[eax*4-1]').should.equal('030485FFFFFFFF');
        ADD.generateMachineCode('eax', '[eax*8-ff]').should.equal('0304C501FFFFFF');
        ADD.generateMachineCode('eax', '[eax*8+ff]').should.equal('0304C5FF000000');
        ADD.generateMachineCode('eax', '[eax*8-80]').should.equal('0304C580FFFFFF');
        ADD.generateMachineCode('eax', '[eax*4+80]').should.equal('03048580000000');
        ADD.generateMachineCode('eax', '[eax*4-81]').should.equal('0304857FFFFFFF');
        ADD.generateMachineCode('eax', '[eax*8+81]').should.equal('0304C581000000');
        ADD.generateMachineCode('eax', '[eax*8-79]').should.equal('0304C587FFFFFF');
        ADD.generateMachineCode('eax', '[eax*4+79]').should.equal('03048579000000');
        ADD.generateMachineCode('eax', '[ebx*8-7f]').should.equal('0304DD81FFFFFF');
        ADD.generateMachineCode('eax', '[ecx*8+7f]').should.equal('0304CD7F000000');
        ADD.generateMachineCode('eax', '[edx*4+ef]').should.equal('030495EF000000');
        ADD.generateMachineCode('edx', '[eax*4-ffff]').should.equal('0314850100FFFF');
        ADD.generateMachineCode('eax', '[eax*8-1111]').should.equal('0304C5EFEEFFFF');
        ADD.generateMachineCode('eax', '[eax*8-11111111]').should.equal('0304C5EFEEEEEE');
        ADD.generateMachineCode('eax', '[eax*4-ffffffff]').should.equal('03048501000000');
    }


}




























































































