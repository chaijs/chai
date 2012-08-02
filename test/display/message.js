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

suite('object display', function () {

  test('property', function () {
    deepObj.should.have.property('chai');
  });

  test('deep equal', function () {
    deepObj.should.deep.equal(deepObj2);
  });

});
