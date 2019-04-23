var chai = require('../..')
  , expect = chai.expect
  , should = chai.should();

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

suite('object display', function () {

  test('property', function () {
    deepObj.should.have.property('chai');
  });

  test('deep equal', function () {
    deepObj.should.deep.equal(deepObj2);
  });

  test('deep equal no diff', function () {
    chai.config.showDiff = false;
    deepObj.should.deep.equal(deepObj2);
    chai.config.showDiff = true;
  });

});

suite('undefined/null display', function() {
  test('undefined for actual', function() {
    expect(undefined).to.equal(null);
  });
});
