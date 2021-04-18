import {suite, test} from '@testdeck/mocha';
import * as _chai from 'chai';
import {ADD} from '../src/constants/AsmFunctions/ADD.new';
import {PARAMETERS} from './parameters';

_chai.should();

@suite
class addTest {

    before() {

    }

    @test 'random'() {
        ADD.generateMachineCode('[eax]', 'ebx', 'dword').should.equal('0118');
    }

    @test 'al with second operand as bytes'() {
        ADD.generateMachineCode('al', PARAMETERS.oneByte).should.equal('04' + PARAMETERS.oneByte);
        ADD.generateMachineCode('al', PARAMETERS.twoBytes).should.equal('0434');
        ADD.generateMachineCode('al', PARAMETERS.fourBytes).should.equal('0478');
    }

    @test 'ax with second operand as bytes'() {
        ADD.generateMachineCode('ax', PARAMETERS.oneByte).should.equal('6683C0' + PARAMETERS.oneByte);
        ADD.generateMachineCode('ax', PARAMETERS.twoBytes).should.equal('6605' + PARAMETERS.twoBytesRotated);
        ADD.generateMachineCode('ax', PARAMETERS.fourBytes).should.equal('66057856');
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
        // (() => ADD.generateMachineCode('ah', PARAMETERS.twoBytes)).should.throw();
        // (() => ADD.generateMachineCode('ch', PARAMETERS.twoBytes)).should.throw();
        // (() => ADD.generateMachineCode('dh', PARAMETERS.twoBytes)).should.throw();
        // (() => ADD.generateMachineCode('bh', PARAMETERS.twoBytes)).should.throw();
        // (() => ADD.generateMachineCode('cl', PARAMETERS.twoBytes)).should.throw();
        // (() => ADD.generateMachineCode('dl', PARAMETERS.twoBytes)).should.throw();
        // (() => ADD.generateMachineCode('bl', PARAMETERS.twoBytes)).should.throw();
        // (() => ADD.generateMachineCode('ah', PARAMETERS.fourBytes)).should.throw();
        // (() => ADD.generateMachineCode('ch', PARAMETERS.fourBytes)).should.throw();
        // (() => ADD.generateMachineCode('dh', PARAMETERS.fourBytes)).should.throw();
        // (() => ADD.generateMachineCode('bh', PARAMETERS.fourBytes)).should.throw();
        // (() => ADD.generateMachineCode('cl', PARAMETERS.fourBytes)).should.throw();
        // (() => ADD.generateMachineCode('dl', PARAMETERS.fourBytes)).should.throw();
        // (() => ADD.generateMachineCode('bl', PARAMETERS.fourBytes)).should.throw();
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
        // (() => ADD.generateMachineCode('di', PARAMETERS.fourBytes)).should.throw();
        // (() => ADD.generateMachineCode('cx', PARAMETERS.fourBytes)).should.throw();
        // (() => ADD.generateMachineCode('dx', PARAMETERS.fourBytes)).should.throw();
        // (() => ADD.generateMachineCode('bx', PARAMETERS.fourBytes)).should.throw();
        // (() => ADD.generateMachineCode('sp', PARAMETERS.fourBytes)).should.throw();
        // (() => ADD.generateMachineCode('bp', PARAMETERS.fourBytes)).should.throw();
        // (() => ADD.generateMachineCode('si', PARAMETERS.fourBytes)).should.throw();
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

    @test 'r8 negative displacement'() {
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

    @test 'r16 negative displacement'() {
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

    @test 'mr32 and bytes'() {
        (() => ADD.generateMachineCode('[eax]', '0')).should.throw;
        ADD.generateMachineCode('[eax]', '1', 'byte').should.equal('800001');
        ADD.generateMachineCode('[eax]', 'FF', 'word').should.equal('668100FF00');
        ADD.generateMachineCode('[eax]', '80', 'dword').should.equal('810080000000');
        ADD.generateMachineCode('[edx]', 'FFFF', 'byte').should.equal('8002FF');
        ADD.generateMachineCode('[eax]', '1111', 'word').should.equal('6681001111');
        ADD.generateMachineCode('[eax]', '1111111', 'dword').should.equal('810011111101');
        ADD.generateMachineCode('[eax]', 'FFFFFFFF', 'dword').should.equal('8100FFFFFFFF');
    }

    // @test 'mr32*constant and bytes'() {
    //     ADD.generateMachineCode('[eax*2]', '1', 'byte').should.equal('8004450000000001');
    //     ADD.generateMachineCode('[eax*4]', 'FF', 'word').should.equal('6681048500000000FF00');
    //     ADD.generateMachineCode('[eax*8]', '80', 'dword').should.equal('8104C50000000080000000');
    //     ADD.generateMachineCode('[edx*1]', 'FFFF', 'byte').should.equal('80041500000000FF');
    //     ADD.generateMachineCode('[ebx*2]', '1111', 'word').should.equal('6681045D000000001111');
    //     ADD.generateMachineCode('[ecx*4]', '1111111', 'dword').should.equal('81048D0000000011111101');
    //     ADD.generateMachineCode('[edi*8]', 'FFFFFFFF', 'dword').should.equal('8304FD00000000FF');
    //     (() => ADD.generateMachineCode('[eax*3]', 'FFFFFFFF', 'word')).should.throw;
    //     (() => ADD.generateMachineCode('[eax*5]', 'FFFFFFFF', 'dword')).should.throw;
    //     (() => ADD.generateMachineCode('[eax*1]', '0')).should.throw;
    // }
    //
    // @test 'reg+mr32*constant and bytes'() {
    //     ADD.generateMachineCode('[eax+eax*2]', '1').should.equal('8104400000000001000000');
    //     ADD.generateMachineCode('[ebx+eax*4]', 'FF').should.equal('81048300000000FF000000');
    //     ADD.generateMachineCode('[ecx+eax*8]', '80').should.equal('8104C10000000080000000');
    //     ADD.generateMachineCode('[edx+edx*1]', 'FFFF').should.equal('81041200000000FFFF0000');
    //     ADD.generateMachineCode('[edi+ebx*2]', '1111').should.equal('81045F0000000011110000');
    //     ADD.generateMachineCode('[esi+ecx*4]', '1111111').should.equal('81048E0000000011111101');
    //     ADD.generateMachineCode('[eax+edi*8]', 'FFFFFFFF').should.equal('8104F800000000FFFFFFFF');
    //     (() => ADD.generateMachineCode('[eax*3]', 'FFFFFFFF')).should.throw;
    //     (() => ADD.generateMachineCode('[eax*5]', 'FFFFFFFF')).should.throw;
    //     (() => ADD.generateMachineCode('[eax*1]', '0')).should.throw;
    // }
    //
    // @test 'reg+mr32*constant + displacement and bytes'() {
    //     ADD.generateMachineCode('[eax+eax*2+1]', '1').should.equal('8144400101000000');
    //     ADD.generateMachineCode('[ebx+eax*4+FF]', 'FF').should.equal('818483FF000000FF000000');
    //     ADD.generateMachineCode('[ecx+eax*8+80]', '80').should.equal('8184C18000000080000000');
    //     ADD.generateMachineCode('[edx+edx*1+FFFF]', 'FFFF').should.equal('818412FFFF0000FFFF0000');
    //     ADD.generateMachineCode('[edi+ebx*2+1111]', '1111').should.equal('81845F1111000011110000');
    //     ADD.generateMachineCode('[esi+ecx*4+1111111]', '1111111').should.equal('81848E1111110111111101');
    //     ADD.generateMachineCode('[eax+edi*8+FFFFFFFF]', 'FFFFFFFF').should.equal('8184F8FFFFFFFFFFFFFFFF');
    //     (() => ADD.generateMachineCode('[eax*3+FFFFFFFF]', 'FFFFFFFF')).should.throw;
    //     (() => ADD.generateMachineCode('[eax*5+FFFFFFFF]', 'FFFFFFFF')).should.throw;
    //     (() => ADD.generateMachineCode('[eax*1]', '0')).should.throw;
    // }
    //
    // @test 'mr32*constant and bytes, word ptr'() {
    //     ADD.generateMachineCode('[eax*2]', '1', 'word').should.equal('66810445000000000100');
    //     ADD.generateMachineCode('[eax*4]', 'FF', 'word').should.equal('6681048500000000FF00');
    //     ADD.generateMachineCode('[eax*8]', '80', 'word').should.equal('668104C5000000008000');
    //     ADD.generateMachineCode('[edx*1]', 'FFFF', 'word').should.equal('6681041500000000FFFF');
    //     ADD.generateMachineCode('[ebx*2]', '1111', 'word').should.equal('6681045D000000001111');
    //     ADD.generateMachineCode('[ecx*4]', '1111111', 'word').should.equal('6681048D000000001111');
    //     ADD.generateMachineCode('[edi*8]', 'FFFFFFFF', 'word').should.equal('668104FD00000000FFFF');
    //     (() => ADD.generateMachineCode('[eax*3]', 'FFFFFFFF')).should.throw;
    //     (() => ADD.generateMachineCode('[eax*5]', 'FFFFFFFF')).should.throw;
    //     (() => ADD.generateMachineCode('[eax*1]', '0')).should.throw;
    // }
    //
    // @test 'mr32 and bytes, word ptr'() {
    //     ADD.generateMachineCode('[eax]', '1', 'word').should.equal('6681000100');
    //     ADD.generateMachineCode('[eax]', 'FF', 'word').should.equal('668100FF00');
    //     ADD.generateMachineCode('[eax]', '80', 'word').should.equal('6681008000');
    //     ADD.generateMachineCode('[edx]', 'FFFF', 'word').should.equal('668102FFFF');
    //     ADD.generateMachineCode('[eax]', '1111', 'word').should.equal('6681001111');
    //     ADD.generateMachineCode('[eax]', '1111111', 'word').should.equal('6681001111');
    //     ADD.generateMachineCode('[eax]', 'FFFFFFFF', 'word').should.equal('668100FFFF');
    //     (() => ADD.generateMachineCode('[eax]', '0', 'word')).should.throw;
    // }


    @test 'mr32 and bytes, byte ptr'() {
        ADD.generateMachineCode('[eax]', '1', 'byte').should.equal('800001');
        ADD.generateMachineCode('[eax]', 'FF', 'byte').should.equal('8000FF');
        ADD.generateMachineCode('[eax]', '80', 'byte').should.equal('800080');
        ADD.generateMachineCode('[edx]', 'FFFF', 'byte').should.equal('8002FF');
        ADD.generateMachineCode('[eax]', '1111', 'byte').should.equal('800011');
        ADD.generateMachineCode('[eax]', '1111111', 'byte').should.equal('800011');
        ADD.generateMachineCode('[eax]', 'FFFFFFFF', 'byte').should.equal('8000FF');
        (() => ADD.generateMachineCode('[eax]', '0', 'byte')).should.throw;
    }

    // @test 'mr16 and bytes'() {
    //     ADD.generateMachineCode('[di]', '1').should.equal('67810501000000');
    //     ADD.generateMachineCode('[si]', '1').should.equal('67810401000000');
    //     ADD.generateMachineCode('[bx]', '1').should.equal('67810701000000');
    //     ADD.generateMachineCode('[di]', '1').should.equal('67810501000000');
    //     ADD.generateMachineCode('[si]', '1').should.equal('67810401000000');
    //     ADD.generateMachineCode('[bx]', '1').should.equal('67810701000000');
    //     ADD.generateMachineCode('[di]', 'FF').should.equal('678105FF000000');
    //     ADD.generateMachineCode('[si]', 'FFFF').should.equal('678104FFFF0000');
    //     ADD.generateMachineCode('[bx]', '1FFF').should.equal('678107FF1F0000');
    //     ADD.generateMachineCode('[di]', '1FFFFFFF').should.equal('678105FFFFFF1F');
    // }
    //
    // @test 'mr16 and bytes, byte ptr'() {
    //     ADD.generateMachineCode('[di]', '1', 'byte').should.equal('67800501');
    //     ADD.generateMachineCode('[di]', '1111', 'byte').should.equal('67800511');
    //     ADD.generateMachineCode('[si]', '1', 'byte').should.equal('67800401');
    //     ADD.generateMachineCode('[bx]', '1', 'byte').should.equal('67800701');
    //     ADD.generateMachineCode('[di]', '1', 'byte').should.equal('67800501');
    //     ADD.generateMachineCode('[si]', '1', 'byte').should.equal('67800401');
    //     ADD.generateMachineCode('[bx]', '1', 'byte').should.equal('67800701');
    //     ADD.generateMachineCode('[di]', 'FF', 'byte').should.equal('678005FF');
    //     ADD.generateMachineCode('[si]', 'FFFF', 'byte').should.equal('678004FF');
    //     ADD.generateMachineCode('[bx]', '1FFF', 'byte').should.equal('678007FF');
    //     ADD.generateMachineCode('[di]', '1FFFFFFF', 'byte').should.equal('678005FF');
    // }
    //
    // @test 'mr16 and bytes, word ptr'() {
    //     ADD.generateMachineCode('[di]', '1', 'word').should.equal('676681050100');
    //     ADD.generateMachineCode('[di]', '1111', 'word').should.equal('676681051111');
    //     ADD.generateMachineCode('[si]', '1', 'word').should.equal('676681040100');
    //     ADD.generateMachineCode('[bx]', '1', 'word').should.equal('676681070100');
    //     ADD.generateMachineCode('[di]', '1', 'word').should.equal('676681050100');
    //     ADD.generateMachineCode('[si]', '1', 'word').should.equal('676681040100');
    //     ADD.generateMachineCode('[bx]', '1', 'word').should.equal('676681070100');
    //     ADD.generateMachineCode('[di]', 'FF', 'word').should.equal('67668105FF00');
    //     ADD.generateMachineCode('[si]', 'FFFF', 'word').should.equal('67668104FFFF');
    //     ADD.generateMachineCode('[bx]', '1FFF', 'word').should.equal('67668107FF1F');
    //     ADD.generateMachineCode('[di]', '1FFFFFFF', 'word').should.equal('67668105FFFF');
    // }
    //
    // @test 'mr16 and bytes, dword'() {
    //     ADD.generateMachineCode('[di]', '1', 'dword').should.equal('67810501000000');
    //     ADD.generateMachineCode('[si]', '1', 'dword').should.equal('67810401000000');
    //     ADD.generateMachineCode('[bx]', '1', 'dword').should.equal('67810701000000');
    //     ADD.generateMachineCode('[di]', '1', 'dword').should.equal('67810501000000');
    //     ADD.generateMachineCode('[si]', '1', 'dword').should.equal('67810401000000');
    //     ADD.generateMachineCode('[bx]', '1', 'dword').should.equal('67810701000000');
    //     ADD.generateMachineCode('[di]', 'FF', 'dword').should.equal('678105FF000000');
    //     ADD.generateMachineCode('[si]', 'FFFF', 'dword').should.equal('678104FFFF0000');
    //     ADD.generateMachineCode('[bx]', '1FFF', 'dword').should.equal('678107FF1F0000');
    //     ADD.generateMachineCode('[di]', '1FFFFFFF', 'dword').should.equal('678105FFFFFF1F');
    // }
    //
    // @test 'disp and bytes'() {
    //     ADD.generateMachineCode('[1]', '1').should.equal('81050100000001000000');
    //     ADD.generateMachineCode('[11]', '1111').should.equal('81051100000011110000');
    //     ADD.generateMachineCode('[1]', '11111111').should.equal('81050100000011111111');
    //     ADD.generateMachineCode('[11]', 'F').should.equal('8105110000000F000000');
    //     ADD.generateMachineCode('[1]', 'FFFF').should.equal('810501000000FFFF0000');
    //     ADD.generateMachineCode('[1]', 'FFFFFFFF').should.equal('810501000000FFFFFFFF');
    //     ADD.generateMachineCode('[1111]', '1').should.equal('81051111000001000000');
    //     ADD.generateMachineCode('[1111]', '1111').should.equal('81051111000011110000');
    //     ADD.generateMachineCode('[1111]', '11111111').should.equal('81051111000011111111');
    //     ADD.generateMachineCode('[1111]', 'F').should.equal('8105111100000F000000');
    //     ADD.generateMachineCode('[1111]', 'FFFF').should.equal('810511110000FFFF0000');
    //     ADD.generateMachineCode('[11111111]', 'FFFFFFFF').should.equal('810511111111FFFFFFFF');
    //     ADD.generateMachineCode('[11111111]', '1').should.equal('81051111111101000000');
    //     ADD.generateMachineCode('[11111111]', '1111').should.equal('81051111111111110000');
    //     ADD.generateMachineCode('[11111111]', '11111111').should.equal('81051111111111111111');
    //     ADD.generateMachineCode('[FF]', '11111111').should.equal('8105FF00000011111111');
    //     ADD.generateMachineCode('[FFFF]', '11111111').should.equal('8105FFFF000011111111');
    //     ADD.generateMachineCode('[FFFFFFF]', '11111111').should.equal('8105FFFFFF0F11111111');
    //     ADD.generateMachineCode('[11111111]', 'F').should.equal('8105111111110F000000');
    //     ADD.generateMachineCode('[11111111]', 'FFFF').should.equal('810511111111FFFF0000');
    //     ADD.generateMachineCode('[11111111]', 'FFFFFFFF').should.equal('810511111111FFFFFFFF');
    // }
    //
    // @test 'disp and bytes, byte ptr'() {
    //     ADD.generateMachineCode('[1]', '1', 'byte').should.equal('80050100000001');
    //     ADD.generateMachineCode('[11]', '1111', 'byte').should.equal('80051100000011');
    //     ADD.generateMachineCode('[1]', '11111111', 'byte').should.equal('80050100000011');
    //     ADD.generateMachineCode('[11]', 'F', 'byte').should.equal('8005110000000F');
    //     ADD.generateMachineCode('[1]', 'FFFF', 'byte').should.equal('800501000000FF');
    //     ADD.generateMachineCode('[1]', 'FFFFFFFF', 'byte').should.equal('800501000000FF');
    //     ADD.generateMachineCode('[1111]', '1', 'byte').should.equal('80051111000001');
    //     ADD.generateMachineCode('[1111]', '1111', 'byte').should.equal('80051111000011');
    //     ADD.generateMachineCode('[1111]', '11111111', 'byte').should.equal('80051111000011');
    //     ADD.generateMachineCode('[1111]', 'F', 'byte').should.equal('8005111100000F');
    //     ADD.generateMachineCode('[1111]', 'FFFF', 'byte').should.equal('800511110000FF');
    //     ADD.generateMachineCode('[11111111]', 'FFFFFFFF', 'byte').should.equal('800511111111FF');
    //     ADD.generateMachineCode('[11111111]', '1', 'byte').should.equal('80051111111101');
    //     ADD.generateMachineCode('[11111111]', '1111', 'byte').should.equal('80051111111111');
    //     ADD.generateMachineCode('[11111111]', '11111111', 'byte').should.equal('80051111111111');
    //     ADD.generateMachineCode('[FF]', '11111111', 'byte').should.equal('8005FF00000011');
    //     ADD.generateMachineCode('[FFFF]', '11111111', 'byte').should.equal('8005FFFF000011');
    //     ADD.generateMachineCode('[FFFFFFF]', '11111111', 'byte').should.equal('8005FFFFFF0F11');
    //     ADD.generateMachineCode('[11111111]', 'F', 'byte').should.equal('8005111111110F');
    //     ADD.generateMachineCode('[11111111]', 'FFFF', 'byte').should.equal('800511111111FF');
    //     ADD.generateMachineCode('[11111111]', 'FFFFFFFF', 'byte').should.equal('800511111111FF');
    // }
    //
    // @test 'disp and bytes, word ptr'() {
    //     ADD.generateMachineCode('[1]', '1', 'word').should.equal('668105010000000100');
    //     ADD.generateMachineCode('[11]', '1111', 'word').should.equal('668105110000001111');
    //     ADD.generateMachineCode('[1]', '11111111', 'word').should.equal('668105010000001111');
    //     ADD.generateMachineCode('[11]', 'F', 'word').should.equal('668105110000000F00');
    //     ADD.generateMachineCode('[1]', 'FFFF', 'word').should.equal('66810501000000FFFF');
    //     ADD.generateMachineCode('[1]', 'FFFFFFFF', 'word').should.equal('66810501000000FFFF');
    //     ADD.generateMachineCode('[1111]', '1', 'word').should.equal('668105111100000100');
    //     ADD.generateMachineCode('[1111]', '1111', 'word').should.equal('668105111100001111');
    //     ADD.generateMachineCode('[1111]', '11111111', 'word').should.equal('668105111100001111');
    //     ADD.generateMachineCode('[1111]', 'F', 'word').should.equal('668105111100000F00');
    //     ADD.generateMachineCode('[1111]', 'FFFF', 'word').should.equal('66810511110000FFFF');
    //     ADD.generateMachineCode('[11111111]', 'FFFFFFFF', 'word').should.equal('66810511111111FFFF');
    //     ADD.generateMachineCode('[11111111]', '1', 'word').should.equal('668105111111110100');
    //     ADD.generateMachineCode('[11111111]', '1111', 'word').should.equal('668105111111111111');
    //     ADD.generateMachineCode('[11111111]', '11111111', 'word').should.equal('668105111111111111');
    //     ADD.generateMachineCode('[FF]', '11111111', 'word').should.equal('668105FF0000001111');
    //     ADD.generateMachineCode('[FFFF]', '11111111', 'word').should.equal('668105FFFF00001111');
    //     ADD.generateMachineCode('[FFFFFFF]', '11111111', 'word').should.equal('668105FFFFFF0F1111');
    //     ADD.generateMachineCode('[11111111]', 'F', 'word').should.equal('668105111111110F00');
    //     ADD.generateMachineCode('[11111111]', 'FFFF', 'word').should.equal('66810511111111FFFF');
    //     ADD.generateMachineCode('[11111111]', 'FFFFFFFF', 'word').should.equal('66810511111111FFFF');
    // }
    //
    // @test 'disp and bytes, dworf ptr'() {
    //     ADD.generateMachineCode('[1]', '1', 'dword').should.equal('81050100000001000000');
    //     ADD.generateMachineCode('[11]', '1111', 'dword').should.equal('81051100000011110000');
    //     ADD.generateMachineCode('[1]', '11111111', 'dword').should.equal('81050100000011111111');
    //     ADD.generateMachineCode('[11]', 'F', 'dword').should.equal('8105110000000F000000');
    //     ADD.generateMachineCode('[1]', 'FFFF', 'dword').should.equal('810501000000FFFF0000');
    //     ADD.generateMachineCode('[1]', 'FFFFFFFF', 'dword').should.equal('810501000000FFFFFFFF');
    //     ADD.generateMachineCode('[1111]', '1', 'dword').should.equal('81051111000001000000');
    //     ADD.generateMachineCode('[1111]', '1111', 'dword').should.equal('81051111000011110000');
    //     ADD.generateMachineCode('[1111]', '11111111', 'dword').should.equal('81051111000011111111');
    //     ADD.generateMachineCode('[1111]', 'F', 'dword').should.equal('8105111100000F000000');
    //     ADD.generateMachineCode('[1111]', 'FFFF', 'dword').should.equal('810511110000FFFF0000');
    //     ADD.generateMachineCode('[11111111]', 'FFFFFFFF', 'dword').should.equal('810511111111FFFFFFFF');
    //     ADD.generateMachineCode('[11111111]', '1', 'dword').should.equal('81051111111101000000');
    //     ADD.generateMachineCode('[11111111]', '1111', 'dword').should.equal('81051111111111110000');
    //     ADD.generateMachineCode('[11111111]', '11111111', 'dword').should.equal('81051111111111111111');
    //     ADD.generateMachineCode('[FF]', '11111111', 'dword').should.equal('8105FF00000011111111');
    //     ADD.generateMachineCode('[FFFF]', '11111111', 'dword').should.equal('8105FFFF000011111111');
    //     ADD.generateMachineCode('[FFFFFFF]', '11111111', 'dword').should.equal('8105FFFFFF0F11111111');
    //     ADD.generateMachineCode('[11111111]', 'F', 'dword').should.equal('8105111111110F000000');
    //     ADD.generateMachineCode('[11111111]', 'FFFF', 'dword').should.equal('810511111111FFFF0000');
    //     ADD.generateMachineCode('[11111111]', 'FFFFFFFF', 'dword').should.equal('810511111111FFFFFFFF');
    // }
    //
    // @test '32bit reg+disp and bytes'() {
    //     ADD.generateMachineCode('[eax+1]', '1').should.equal('81400101000000');
    //     ADD.generateMachineCode('[ebx+11]', '1111').should.equal('81431111110000');
    //     ADD.generateMachineCode('[eax+1]', '11111111').should.equal('81400111111111');
    //     ADD.generateMachineCode('[ecx+11]', 'F').should.equal('8141110F000000');
    //     ADD.generateMachineCode('[eax+1]', 'FFFF').should.equal('814001FFFF0000');
    //     ADD.generateMachineCode('[eax+1]', 'FFFFFFFF').should.equal('814001FFFFFFFF');
    //     ADD.generateMachineCode('[eax+1111]', '1').should.equal('81801111000001000000');
    //     ADD.generateMachineCode('[eax+1111]', '1111').should.equal('81801111000011110000');
    //     ADD.generateMachineCode('[eax+1111]', '11111111').should.equal('81801111000011111111');
    //     ADD.generateMachineCode('[eax+1111]', 'F').should.equal('8180111100000F000000');
    //     ADD.generateMachineCode('[eax+1111]', 'FFFF').should.equal('818011110000FFFF0000');
    //     ADD.generateMachineCode('[eax+11111111]', 'FFFFFFFF').should.equal('818011111111FFFFFFFF');
    //     ADD.generateMachineCode('[eax+11111111]', '1').should.equal('81801111111101000000');
    //     ADD.generateMachineCode('[eax+11111111]', '1111').should.equal('81801111111111110000');
    //     ADD.generateMachineCode('[eax+11111111]', '11111111').should.equal('81801111111111111111');
    //     ADD.generateMachineCode('[eax+FF]', '11111111').should.equal('8180FF00000011111111');
    //     ADD.generateMachineCode('[eax+FFFF]', '11111111').should.equal('8180FFFF000011111111');
    //     ADD.generateMachineCode('[eax+FFFFFFF]', '11111111').should.equal('8180FFFFFF0F11111111');
    //     ADD.generateMachineCode('[eax+11111111]', 'F').should.equal('8180111111110F000000');
    //     ADD.generateMachineCode('[eax+11111111]', 'FFFF').should.equal('818011111111FFFF0000');
    //     ADD.generateMachineCode('[eax+11111111]', 'FFFFFFFF').should.equal('818011111111FFFFFFFF');
    // }
    //
    // @test '32bit reg+disp and bytes, word ptr'() {
    //     ADD.generateMachineCode('[eax+1]', '1', 'word').should.equal('668140010100');
    //     ADD.generateMachineCode('[ebx+11]', '1111', 'word').should.equal('668143111111');
    //     ADD.generateMachineCode('[eax+1]', '11111111', 'word').should.equal('668140011111');
    //     ADD.generateMachineCode('[ecx+11]', 'F', 'word').should.equal('668141110F00');
    //     ADD.generateMachineCode('[eax+1]', 'FFFF', 'word').should.equal('66814001FFFF');
    //     ADD.generateMachineCode('[eax+1]', 'FFFFFFFF', 'word').should.equal('66814001FFFF');
    //     ADD.generateMachineCode('[eax+1111]', '1', 'word').should.equal('668180111100000100');
    //     ADD.generateMachineCode('[eax+1111]', '1111', 'word').should.equal('668180111100001111');
    //     ADD.generateMachineCode('[eax+1111]', '11111111', 'word').should.equal('668180111100001111');
    //     ADD.generateMachineCode('[eax+1111]', 'F', 'word').should.equal('668180111100000F00');
    //     ADD.generateMachineCode('[eax+1111]', 'FFFF', 'word').should.equal('66818011110000FFFF');
    //     ADD.generateMachineCode('[eax+11111111]', 'FFFFFFFF', 'word').should.equal('66818011111111FFFF');
    //     ADD.generateMachineCode('[eax+11111111]', '1', 'word').should.equal('668180111111110100');
    //     ADD.generateMachineCode('[eax+11111111]', '1111', 'word').should.equal('668180111111111111');
    //     ADD.generateMachineCode('[eax+11111111]', '11111111', 'word').should.equal('668180111111111111');
    //     ADD.generateMachineCode('[eax+FF]', '11111111', 'word').should.equal('668180FF0000001111');
    //     ADD.generateMachineCode('[eax+FFFF]', '11111111', 'word').should.equal('668180FFFF00001111');
    //     ADD.generateMachineCode('[eax+FFFFFFF]', '11111111', 'word').should.equal('668180FFFFFF0F1111');
    //     ADD.generateMachineCode('[eax+11111111]', 'F', 'word').should.equal('668180111111110F00');
    //     ADD.generateMachineCode('[eax+11111111]', 'FFFF', 'word').should.equal('66818011111111FFFF');
    //     ADD.generateMachineCode('[eax+11111111]', 'FFFFFFFF', 'word').should.equal('66818011111111FFFF');
    // }
    //
    // @test '32bit reg+disp and bytes, byte ptr'() {
    //     ADD.generateMachineCode('[eax+1]', '1', 'byte').should.equal('80400101');
    //     ADD.generateMachineCode('[ebx+11]', '1111', 'byte').should.equal('80431111');
    //     ADD.generateMachineCode('[eax+1]', '11111111', 'byte').should.equal('80400111');
    //     ADD.generateMachineCode('[ecx+11]', 'F', 'byte').should.equal('8041110F');
    //     ADD.generateMachineCode('[eax+1]', 'FFFF', 'byte').should.equal('804001FF');
    //     ADD.generateMachineCode('[eax+1]', 'FFFFFFFF', 'byte').should.equal('804001FF');
    //     ADD.generateMachineCode('[eax+1111]', '1', 'byte').should.equal('80801111000001');
    //     ADD.generateMachineCode('[eax+1111]', '1111', 'byte').should.equal('80801111000011');
    //     ADD.generateMachineCode('[eax+1111]', '11111111', 'byte').should.equal('80801111000011');
    //     ADD.generateMachineCode('[eax+1111]', 'F', 'byte').should.equal('8080111100000F');
    //     ADD.generateMachineCode('[eax+1111]', 'FFFF', 'byte').should.equal('808011110000FF');
    //     ADD.generateMachineCode('[eax+11111111]', 'FFFFFFFF', 'byte').should.equal('808011111111FF');
    //     ADD.generateMachineCode('[eax+11111111]', '1', 'byte').should.equal('80801111111101');
    //     ADD.generateMachineCode('[eax+11111111]', '1111', 'byte').should.equal('80801111111111');
    //     ADD.generateMachineCode('[eax+11111111]', '11111111', 'byte').should.equal('80801111111111');
    //     ADD.generateMachineCode('[eax+FF]', '11111111', 'byte').should.equal('8080FF00000011');
    //     ADD.generateMachineCode('[eax+FFFF]', '11111111', 'byte').should.equal('8080FFFF000011');
    //     ADD.generateMachineCode('[eax+FFFFFFF]', '11111111', 'byte').should.equal('8080FFFFFF0F11');
    //     ADD.generateMachineCode('[eax+11111111]', 'F', 'byte').should.equal('8080111111110F');
    //     ADD.generateMachineCode('[eax+11111111]', 'FFFF', 'byte').should.equal('808011111111FF');
    //     ADD.generateMachineCode('[eax+11111111]', 'FFFFFFFF', 'byte').should.equal('808011111111FF');
    // }
    //
    // @test '32bit reg+disp and bytes, dword'() {
    //     ADD.generateMachineCode('[eax+1]', '1', 'dword').should.equal('81400101000000');
    //     ADD.generateMachineCode('[ebx+11]', '1111', 'dword').should.equal('81431111110000');
    //     ADD.generateMachineCode('[eax+1]', '11111111', 'dword').should.equal('81400111111111');
    //     ADD.generateMachineCode('[ecx+11]', 'F', 'dword').should.equal('8141110F000000');
    //     ADD.generateMachineCode('[eax+1]', 'FFFF', 'dword').should.equal('814001FFFF0000');
    //     ADD.generateMachineCode('[eax+1]', 'FFFFFFFF', 'dword').should.equal('814001FFFFFFFF');
    //     ADD.generateMachineCode('[eax+1111]', '1', 'dword').should.equal('81801111000001000000');
    //     ADD.generateMachineCode('[eax+1111]', '1111', 'dword').should.equal('81801111000011110000');
    //     ADD.generateMachineCode('[eax+1111]', '11111111', 'dword').should.equal('81801111000011111111');
    //     ADD.generateMachineCode('[eax+1111]', 'F', 'dword').should.equal('8180111100000F000000');
    //     ADD.generateMachineCode('[eax+1111]', 'FFFF', 'dword').should.equal('818011110000FFFF0000');
    //     ADD.generateMachineCode('[eax+11111111]', 'FFFFFFFF', 'dword').should.equal('818011111111FFFFFFFF');
    //     ADD.generateMachineCode('[eax+11111111]', '1', 'dword').should.equal('81801111111101000000');
    //     ADD.generateMachineCode('[eax+11111111]', '1111', 'dword').should.equal('81801111111111110000');
    //     ADD.generateMachineCode('[eax+11111111]', '11111111', 'dword').should.equal('81801111111111111111');
    //     ADD.generateMachineCode('[eax+FF]', '11111111', 'dword').should.equal('8180FF00000011111111');
    //     ADD.generateMachineCode('[eax+FFFF]', '11111111', 'dword').should.equal('8180FFFF000011111111');
    //     ADD.generateMachineCode('[eax+FFFFFFF]', '11111111', 'dword').should.equal('8180FFFFFF0F11111111');
    //     ADD.generateMachineCode('[eax+11111111]', 'F', 'dword').should.equal('8180111111110F000000');
    //     ADD.generateMachineCode('[eax+11111111]', 'FFFF', 'dword').should.equal('818011111111FFFF0000');
    //     ADD.generateMachineCode('[eax+11111111]', 'FFFFFFFF', 'dword').should.equal('818011111111FFFFFFFF');
    // }
    //
    // @test '32bit reg-disp and bytes, dword'() {
    //     ADD.generateMachineCode('[eax-1]', '1', 'dword').should.equal('8140FF01000000');
    //     ADD.generateMachineCode('[ebx-11]', '1111', 'dword').should.equal('8143EF11110000');
    //     ADD.generateMachineCode('[eax-1]', '11111111', 'dword').should.equal('8140FF11111111');
    //     ADD.generateMachineCode('[ecx-11]', 'F', 'dword').should.equal('8141EF0F000000');
    //     ADD.generateMachineCode('[eax-1]', 'FFFF', 'dword').should.equal('8140FFFFFF0000');
    //     ADD.generateMachineCode('[eax-1]', 'FFFFFFFF', 'dword').should.equal('8140FFFFFFFFFF');
    //     ADD.generateMachineCode('[eax-1111]', '1', 'dword').should.equal('8180EFEEFFFF01000000');
    //     ADD.generateMachineCode('[eax-1111]', '1111', 'dword').should.equal('8180EFEEFFFF11110000');
    //     ADD.generateMachineCode('[eax-1111]', '11111111', 'dword').should.equal('8180EFEEFFFF11111111');
    //     ADD.generateMachineCode('[eax-1111]', 'F', 'dword').should.equal('8180EFEEFFFF0F000000');
    //     ADD.generateMachineCode('[eax-1111]', 'FFFF', 'dword').should.equal('8180EFEEFFFFFFFF0000');
    //     ADD.generateMachineCode('[eax-11111111]', 'FFFFFFFF', 'dword').should.equal('8180EFEEEEEEFFFFFFFF');
    //     ADD.generateMachineCode('[eax-11111111]', '1', 'dword').should.equal('8180EFEEEEEE01000000');
    //     ADD.generateMachineCode('[eax-11111111]', '1111', 'dword').should.equal('8180EFEEEEEE11110000');
    //     ADD.generateMachineCode('[eax-11111111]', '11111111', 'dword').should.equal('8180EFEEEEEE11111111');
    //     ADD.generateMachineCode('[eax-FF]', '11111111', 'dword').should.equal('818001FFFFFF11111111');
    //     ADD.generateMachineCode('[eax-FFFF]', '11111111', 'dword').should.equal('81800100FFFF11111111');
    //     ADD.generateMachineCode('[eax-FFFFFFF]', '11111111', 'dword').should.equal('8180010000F011111111');
    //     ADD.generateMachineCode('[eax-11111111]', 'F', 'dword').should.equal('8180EFEEEEEE0F000000');
    //     ADD.generateMachineCode('[eax-11111111]', 'FFFF', 'dword').should.equal('8180EFEEEEEEFFFF0000');
    //     ADD.generateMachineCode('[eax-11111111]', 'FFFFFFFF', 'dword').should.equal('8180EFEEEEEEFFFFFFFF');
    // }
    //
    // @test '16bit reg+disp and bytes, dword'() {
    //     ADD.generateMachineCode('[si+1]', '1', 'dword').should.equal('6781440101000000');
    //     ADD.generateMachineCode('[si+11]', '1111', 'dword').should.equal('6781441111110000');
    //     ADD.generateMachineCode('[bx+1]', '11111111', 'dword').should.equal('6781470111111111');
    //     ADD.generateMachineCode('[di+11]', 'F', 'dword').should.equal('678145110F000000');
    //     ADD.generateMachineCode('[bx+si+1]', 'FFFF', 'dword').should.equal('67814001FFFF0000');
    //     ADD.generateMachineCode('[bx+di+1]', 'FFFFFFFF', 'dword').should.equal('67814101FFFFFFFF');
    //     ADD.generateMachineCode('[bp+di+1111]', '1', 'dword').should.equal('678183111101000000');
    //     ADD.generateMachineCode('[bp+si+1111]', '1111', 'dword').should.equal('678182111111110000');
    //     ADD.generateMachineCode('[si+1111]', '11111111', 'dword').should.equal('678184111111111111');
    //     ADD.generateMachineCode('[bp+di+1111]', 'F', 'dword').should.equal('67818311110F000000');
    //     ADD.generateMachineCode('[bp+si+1111]', 'FFFF', 'dword').should.equal('6781821111FFFF0000');
    //     ADD.generateMachineCode('[di+FF]', '11111111', 'dword').should.equal('678185FF0011111111');
    //     ADD.generateMachineCode('[bx+si+FFFF]', '11111111', 'dword').should.equal('678180FFFF11111111');
    // }
    //
    // @test '16bit reg-disp and bytes, dword'() {
    //     ADD.generateMachineCode('[si-1]', '1', 'dword').should.equal('678144FF01000000');
    //     ADD.generateMachineCode('[si-11]', '1111', 'dword').should.equal('678144EF11110000');
    //     ADD.generateMachineCode('[bx-1]', '11111111', 'dword').should.equal('678147FF11111111');
    //     ADD.generateMachineCode('[di-11]', 'F', 'dword').should.equal('678145EF0F000000');
    //     ADD.generateMachineCode('[bx+si-1]', 'FFFF', 'dword').should.equal('678140FFFFFF0000');
    //     ADD.generateMachineCode('[bx+di-1]', 'FFFFFFFF', 'dword').should.equal('678141FFFFFFFFFF');
    //     ADD.generateMachineCode('[bp+di-1111]', '1', 'dword').should.equal('678183EFEE01000000');
    //     ADD.generateMachineCode('[bp+si-1111]', '1111', 'dword').should.equal('678182EFEE11110000');
    //     ADD.generateMachineCode('[si-1111]', '11111111', 'dword').should.equal('678184EFEE11111111');
    //     ADD.generateMachineCode('[bp+di-1111]', 'F', 'dword').should.equal('678183EFEE0F000000');
    //     ADD.generateMachineCode('[bp+si-1111]', 'FFFF', 'dword').should.equal('678182EFEEFFFF0000');
    //     ADD.generateMachineCode('[di-FF]', '11111111', 'dword').should.equal('67818501FF11111111');
    //     ADD.generateMachineCode('[bx+si-FFFF]', '11111111', 'dword').should.equal('678180010011111111');
    // }
    //
    //
    // @test '16bit reg+disp and bytes, word'() {
    //     ADD.generateMachineCode('[si+1]', '1', 'word').should.equal('67668144010100');
    //     ADD.generateMachineCode('[si+11]', '1111', 'word').should.equal('67668144111111');
    //     ADD.generateMachineCode('[bx+1]', '11111111', 'word').should.equal('67668147011111');
    //     ADD.generateMachineCode('[di+11]', 'F', 'word').should.equal('67668145110F00');
    //     ADD.generateMachineCode('[bx+si+1]', 'FFFF', 'word').should.equal('6766814001FFFF');
    //     ADD.generateMachineCode('[bx+di+1]', 'FFFFFFFF', 'word').should.equal('6766814101FFFF');
    //     ADD.generateMachineCode('[bp+di+1111]', '1', 'word').should.equal('6766818311110100');
    //     ADD.generateMachineCode('[bp+si+1111]', '1111', 'word').should.equal('6766818211111111');
    //     ADD.generateMachineCode('[si+1111]', '11111111', 'word').should.equal('6766818411111111');
    //     ADD.generateMachineCode('[bp+di+1111]', 'F', 'word').should.equal('6766818311110F00');
    //     ADD.generateMachineCode('[bp+si+1111]', 'FFFF', 'word').should.equal('676681821111FFFF');
    //     ADD.generateMachineCode('[di+FF]', '11111111', 'word').should.equal('67668185FF001111');
    //     ADD.generateMachineCode('[bx+si+FFFF]', '11111111', 'word').should.equal('67668180FFFF1111');
    // }
    //
    // @test '16bit reg+disp and bytes, byte'() {
    //     ADD.generateMachineCode('[si+1]', '1', 'byte').should.equal('6780440101');
    //     ADD.generateMachineCode('[si+11]', '1111', 'byte').should.equal('6780441111');
    //     ADD.generateMachineCode('[bx+1]', '11111111', 'byte').should.equal('6780470111');
    //     ADD.generateMachineCode('[di+11]', 'F', 'byte').should.equal('678045110F');
    //     ADD.generateMachineCode('[bx+si+1]', 'FFFF', 'byte').should.equal('67804001FF');
    //     ADD.generateMachineCode('[bx+di+1]', 'FFFFFFFF', 'byte').should.equal('67804101FF');
    //     ADD.generateMachineCode('[bp+di+1111]', '1', 'byte').should.equal('678083111101');
    //     ADD.generateMachineCode('[bp+si+1111]', '1111', 'byte').should.equal('678082111111');
    //     ADD.generateMachineCode('[si+1111]', '11111111', 'byte').should.equal('678084111111');
    //     ADD.generateMachineCode('[bp+di+1111]', 'F', 'byte').should.equal('67808311110F');
    //     ADD.generateMachineCode('[bp+si+1111]', 'FFFF', 'byte').should.equal('6780821111FF');
    //     ADD.generateMachineCode('[di+FF]', '11111111', 'byte').should.equal('678085FF0011');
    //     ADD.generateMachineCode('[bx+si+FFFF]', '11111111', 'byte').should.equal('678080FFFF11');
    // }
}













































































































































































