import * as chai from '../../index.js'

const expect = chai.expect

var deepObj = {
    green: { tea: 'matcha' }
  , teas: [
        'chai'
      , 'matcha'
      , { tea: 'konacha' }
    ]
};

var deepObj2 = {
    green: { tea: 'matcha' }
  , teas: [
        'chai'
      , 'oolong'
      , { tea: 'konacha' }
    ]
};

chai.config.includeStack = true;

describe('object display', function () {

  it('property', function () {
    deepObj.should.have.property('chai');
  });

  it('deep equal', function () {
    deepObj.should.deep.equal(deepObj2);
  });

  it('deep equal no diff', function () {
    chai.config.showDiff = false;
    deepObj.should.deep.equal(deepObj2);
    chai.config.showDiff = true;
  });

});

describe('undefined/null display', function() {
  it('undefined for actual', function() {
    expect(undefined).to.equal(null);
  });
});
