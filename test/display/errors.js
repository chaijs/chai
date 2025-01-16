import * as chai from '../../chai.js';

var expect = chai.expect;

chai.config.includeStack = true;

describe('error display', function () {

  it('show error line', function () {
    expect(4).to.equal(2);
  });

});
