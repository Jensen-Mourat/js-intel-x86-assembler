import {suite, test} from '@testdeck/mocha';
import * as _chai from 'chai';
import {displacementTypes, matchRegex} from '../src/functions/getTypes';
import {everythingAfterSlashRegex, firstCharacterAfterStar} from '../src/constants/regex';
import {match} from 'ts-mockito';

_chai.should();
const {expect} = _chai;

@suite
class regexTest {

    before() {
    }

    @test 'regex test'() {
        matchRegex('eax*1').should.equal('reg*constant' as displacementTypes);
        '/01'.match(everythingAfterSlashRegex)![1].should.equal('01');
        '*2'.match(firstCharacterAfterStar)![1].should.equal('2');
        '*56'.match(firstCharacterAfterStar)![1].should.equal('5');
        (() => '0'.match(firstCharacterAfterStar)![0]).should.throw;
        matchRegex('eax').should.equal('reg' as displacementTypes);
        matchRegex('01234').should.equal('disp' as displacementTypes);
        matchRegex('01234af').should.equal('disp' as displacementTypes);
        (() => matchRegex('01234afas')).should.throw;
        (() => matchRegex('01234afaa1')).should.throw;
        matchRegex('eax+eax').should.equal('reg+reg' as displacementTypes);
        matchRegex('eax+eax*2').should.equal('reg+reg' as displacementTypes);
        matchRegex('eax+1234').should.equal('reg+disp' as displacementTypes);
        matchRegex('eax+eax*4+1234').should.equal('reg+reg+disp' as displacementTypes);
    }
}
