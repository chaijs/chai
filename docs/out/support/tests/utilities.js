if (!chai) var chai = require('..');

var expect = chai.expect;

suite('utilities', function () {

  test('_obj', function () {
    var foo = 'bar'
      , test = expect(foo);

    expect(test).to.have.property('_obj', foo);

    var bar = 'baz';
    test._obj = bar;

    expect(test).to.have.property('_obj', bar);
    test.equal(bar);
  });

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

  test('addMethod', function () {
    chai.use(function(_chai, utils) {
      expect(_chai.Assertion).to.not.respondTo('eqqqual');
      utils.addMethod(_chai.Assertion, 'eqqqual', function (str) {
        var object = utils.flag(this, 'object');
        new _chai.Assertion(object).to.be.eql(str);
      });
      expect(_chai.Assertion).to.respondTo('eqqqual');
    });

    expect('spec').to.eqqqual('spec');
  });

  test('overwriteMethod', function () {
    chai.use(function (_chai, _) {
      expect(_chai.Assertion).to.respondTo('eqqqual');
      _.overwriteMethod(_chai.Assertion, 'eqqqual', function (_super) {
        return function (str) {
          var object = _.flag(this, 'object');
          if (object == 'cucumber' && str == 'cuke') {
            _.flag(this, 'cucumber', true);
          } else {
            _super.apply(this, arguments);
          }
        };
      });

    });

    var vege = expect('cucumber').to.eqqqual('cucumber');
    expect(vege.__flags).to.not.have.property('cucumber');
    var cuke = expect('cucumber').to.eqqqual('cuke');
    expect(cuke.__flags).to.have.property('cucumber');

    chai.use(function (_chai, _) {
      expect(_chai.Assertion).to.not.respondTo('doesnotexist');
      _.overwriteMethod(_chai.Assertion, 'doesnotexist', function (_super) {
        expect(_super).to.be.a('function');
        return function () {
          _.flag(this, 'doesnt', true);
          _super.apply(this, arguments);
        }
      });
    });

    var dne = expect('something').to.doesnotexist();
    expect(dne.__flags).to.have.property('doesnt');
  });

  test('addProperty', function () {
    chai.use(function (_chai, _) {
      _.addProperty(_chai.Assertion, 'tea', function () {
        _.flag(this, 'tea', 'chai');
      });
    });

    var assert = expect('chai').to.be.tea;
    expect(assert.__flags.tea).to.equal('chai');
  });

  test('overwriteProperty', function () {
    chai.use(function (_chai, _) {
      expect(chai.Assertion.prototype).to.have.property('tea');
      _.overwriteProperty(_chai.Assertion, 'tea', function (_super) {
        return function () {
          var act = _.flag(this, 'object');
          if (act === 'matcha') {
            _.flag(this, 'tea', 'matcha');
          } else {
            _super.call(this);
          }
        }
      });
    });

    var matcha = expect('matcha').to.be.tea;
    expect(matcha.__flags.tea).to.equal('matcha');
    var assert = expect('something').to.be.tea;
    expect(assert.__flags.tea).to.equal('chai');
  });
});
