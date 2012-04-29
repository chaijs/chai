if (!chai) var chai = require('..');

var expect = chai.expect;

suite('utilities', function () {

  test('getPathValue', function () {
    var object = {
        hello: 'universe'
      , universe: {
          hello: 'world'
        }
      , world: [ 'hello', 'universe' ]
      , complex: [
            { hello: 'universe' }
          , { universe: 'world' }
        ]
    }

    chai.use(function (_chai, utils) {
      var gpv = utils.getPathValue;
      expect(gpv('hello', object)).to.equal('universe');
      expect(gpv('universe.hello', object)).to.equal('world');
      expect(gpv('world[1]', object)).to.equal('universe');
      expect(gpv('complex[1].universe', object)).to.equal('world');
    });
  });

  test('overwriteMethod', function () {
    chai.use(function (_chai, utils) {
      utils.overwriteMethod(_chai.Assertion, 'equal', function (_super) {
        return function (str) {
          var object = utils.flag(this, 'object');
          if (object == 'cucumber' && str == 'cuke') {
            return;
          } else {
             return _super.apply(this, arguments);
          }
        };
      });
    });

    expect('cucumber').to.equal('cuke');
    expect('spec').not.to.equal('test');
  });

  test('addMethod', function () {
    chai.use(function(_chai, utils) {
      utils.addMethod(_chai.Assertion, 'eqqqual', function (str) {
        var object = utils.flag(this, 'object');
        new _chai.Assertion(object).to.be.eql(str);
        return this;
      });
    });

    expect('spec').to.eqqqual('spec');
  });
});
