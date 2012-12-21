var chai = require('../..')
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

chai.Assertion.includeStack = true;

suite('object display', function () {

  test('property', function () {
    deepObj.should.have.property('chai');
  });

  test('deep equal', function () {
    deepObj.should.deep.equal(deepObj2);
  });

  test('deep equal array', function () {
    [ 'one', 'two', 'three' ].should.deep.equal([ 'one', 'two', 'three', 'four' ]);
  });

});
