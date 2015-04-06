describe('utilities', function () {
  var expect = chai.expect;

  after(function() {
    // Some clean-up so we can run tests in a --watch
    delete chai.Assertion.prototype.eqqqual;
    delete chai.Assertion.prototype.result;
    delete chai.Assertion.prototype.doesnotexist;
  });

  it('_obj', function () {
    var foo = 'bar'
      , test = expect(foo);

    expect(test).to.have.property('_obj', foo);

    var bar = 'baz';
    test._obj = bar;

    expect(test).to.have.property('_obj', bar);
    test.equal(bar);
  });

  it('transferFlags', function () {
    var foo = 'bar'
      , test = expect(foo).not;

    chai.use(function (_chai, utils) {
      var obj = {};
      utils.transferFlags(test, obj);
      expect(utils.flag(obj, 'object')).to.equal(foo);
      expect(utils.flag(obj, 'negate')).to.equal(true);
    });
  });

  it('transferFlags, includeAll = false', function () {
    var foo = 'bar';

    chai.use(function (_chai, utils) {
      var obj = {};
      var test = function() {};

      var assertion = new chai.Assertion({}, "message", test);
      var flag = {};
      utils.flag(obj, 'flagMe', flag);
      utils.flag(obj, 'negate', true);
      utils.transferFlags(test, obj, false);

      expect(utils.flag(obj, 'object')).to.equal(undefined);
      expect(utils.flag(obj, 'message')).to.equal(undefined);
      expect(utils.flag(obj, 'ssfi')).to.equal(undefined);
      expect(utils.flag(obj, 'negate')).to.equal(true);
      expect(utils.flag(obj, 'flagMe')).to.equal(flag);
    });
  });


  it('getPathValue', function () {
    var object = {
        hello: 'universe'
      , universe: {
          hello: 'world'
        }
      , world: [ 'hello', 'universe' ]
      , complex: [
            { hello: 'universe' }
          , { universe: 'world' }
          , [ { hello: 'world' } ]
        ]
    }

    var arr = [ [ true ] ];

    chai.use(function (_chai, utils) {
      var gpv = utils.getPathValue;
      expect(gpv('hello', object)).to.equal('universe');
      expect(gpv('universe.hello', object)).to.equal('world');
      expect(gpv('world[1]', object)).to.equal('universe');
      expect(gpv('complex[1].universe', object)).to.equal('world');
      expect(gpv('complex[2][0].hello', object)).to.equal('world');
      expect(gpv('[0][0]', arr)).to.be.true;
    });
  });

  describe('getPathInfo', function() {
    var gpi,
        obj = {
          id: '10702S300W',
          primes: [2, 3, 5, 7, 11],
          dimensions: {
            units: 'mm',
            lengths: [[1.2, 3.5], [2.2, 1.5], [5, 7]]
          },
          'dimensions.lengths': {
            '[2]': [1.2, 3.5]
          }
        };

    beforeEach(function() {
      chai.use(function (_chai, utils) {
        gpi = utils.getPathInfo;
      });
    });

    it('should handle simple property', function() {
      var info = gpi('dimensions.units', obj);

      info.parent.should.equal(obj.dimensions);
      info.value.should.equal(obj.dimensions.units);
      info.name.should.equal('units');
      info.exists.should.be.true;
    }); 

    it('should handle non-existent property', function() {
      var info = gpi('dimensions.size', obj);

      info.parent.should.equal(obj.dimensions);
      expect(info.value).to.be.undefined;
      info.name.should.equal('size');
      info.exists.should.be.false;
    }); 

    it('should handle array index', function() {
      var info = gpi('primes[2]', obj);

      info.parent.should.equal(obj.primes);
      info.value.should.equal(obj.primes[2]);
      info.name.should.equal(2);
      info.exists.should.be.true;
    }); 

    it('should handle dimensional array', function() {
      var info = gpi('dimensions.lengths[2][1]', obj);

      info.parent.should.equal(obj.dimensions.lengths[2]);
      info.value.should.equal(obj.dimensions.lengths[2][1]);
      info.name.should.equal(1);
      info.exists.should.be.true;
    }); 

    it('should handle out of bounds array index', function() {
      var info = gpi('dimensions.lengths[3]', obj);

      info.parent.should.equal(obj.dimensions.lengths);
      expect(info.value).to.be.undefined;
      info.name.should.equal(3);
      info.exists.should.be.false;
    });

    it('should handle out of bounds dimensional array index', function() {
      var info = gpi('dimensions.lengths[2][5]', obj);

      info.parent.should.equal(obj.dimensions.lengths[2]);
      expect(info.value).to.be.undefined;
      info.name.should.equal(5);
      info.exists.should.be.false;
    });

    it('should handle backslash-escaping for .[]', function() {
      var info = gpi('dimensions\\.lengths.\\[2\\][1]', obj);

      info.parent.should.equal(obj['dimensions.lengths']['[2]']);
      info.value.should.equal(obj['dimensions.lengths']['[2]'][1]);
      info.name.should.equal(1);
      info.exists.should.be.true;
    });
  });

  describe('hasProperty', function() {
    var hp;
    beforeEach(function() {
      chai.use(function (_chai, utils) {
        hp = utils.hasProperty;
      });
    });

    it('should handle array index', function() {
      var arr = [1, 2, 'cheeseburger'];

      hp(1, arr).should.be.true;
      hp(3, arr).should.be.false;
    });
    
    it('should handle literal types', function() {
      var s = 'string literal';
      hp('length', s).should.be.true;
      hp(3, s).should.be.true;
      hp(14, s).should.be.false;
      
      hp('foo', 1).should.be.false;
    });

    it('should handle undefined', function() {
      var o = {
        foo: 'bar'
      };

      hp('foo', o).should.be.true;
      hp('baz', o).should.be.false;
      hp(0, o).should.be.false;
    });

    it('should handle undefined', function() {
      hp('foo', undefined).should.be.false;
    });

    it('should handle null', function() {
      hp('foo', null).should.be.false;
    });
  });

  it('addMethod', function () {
    chai.use(function(_chai, utils) {
      expect(_chai.Assertion).to.not.respondTo('eqqqual');
      _chai.Assertion.addMethod('eqqqual', function (str) {
        var object = utils.flag(this, 'object');
        new _chai.Assertion(object).to.be.eql(str);
      });
      expect(_chai.Assertion).to.respondTo('eqqqual');
    });

    expect('spec').to.eqqqual('spec');
  });

  it('addMethod returning result', function () {
    chai.use(function(_chai, utils) {
      _chai.Assertion.addMethod('result', function () {
        return 'result';
      })
    });

    expect(expect('foo').result()).to.equal('result');
  });

  it('overwriteMethod', function () {
    chai.use(function (_chai, _) {
      expect(_chai.Assertion).to.respondTo('eqqqual');
      _chai.Assertion.overwriteMethod('eqqqual', function (_super) {
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
      _chai.Assertion.overwriteMethod('doesnotexist', function (_super) {
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

  it('overwriteMethod returning result', function () {
    chai.use(function (_chai, _) {
      _chai.Assertion.overwriteMethod('result', function (_super) {
        return function () {
          return 'result';
        }
      });
    });

    expect(expect('foo').result()).to.equal('result');
  });

  it('addProperty', function () {
    chai.use(function (_chai, _) {
      _chai.Assertion.addProperty('tea', function () {
        _.flag(this, 'tea', 'chai');
      });
    });

    var assert = expect('chai').to.be.tea;
    expect(assert.__flags.tea).to.equal('chai');
  });

  it('addProperty returning result', function () {
    chai.use(function(_chai, _) {
      _chai.Assertion.addProperty('result', function () {
        return 'result';
      })
    });

    expect(expect('foo').result).to.equal('result');
  });

  it('overwriteProperty', function () {
    chai.use(function (_chai, _) {
      expect(new chai.Assertion()).to.have.property('tea');
      _chai.Assertion.overwriteProperty('tea', function (_super) {
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

  it('overwriteProperty returning result', function () {
    chai.use(function(_chai, _) {
      _chai.Assertion.overwriteProperty('result', function (_super) {
        return function () {
          return 'result';
        }
      });
    });

    expect(expect('foo').result).to.equal('result');
  });

  it('getMessage', function () {
    chai.use(function (_chai, _) {
      expect(_.getMessage({}, [])).to.equal('');
      expect(_.getMessage({}, [null, null, null])).to.equal('');

      var obj = {};
      _.flag(obj, 'message', 'foo');
      expect(_.getMessage(obj, [])).to.contain('foo');

      var obj = {};
      var msg = function() { return "expected a to eql b"; }
      var negateMsg = function() { return "expected a not to eql b"; }
      expect(_.getMessage(obj, [null, msg, negateMsg])).to.equal("expected a to eql b");
      _.flag(obj, 'negate', true);
      expect(_.getMessage(obj, [null, msg, negateMsg])).to.equal("expected a not to eql b");
    });
  });

  it('inspect with custom object-returning inspect()s', function () {
    chai.use(function (_chai, _) {
      var obj = {
        outer: {
          inspect: function () {
            return { foo: 'bar' };
          }
        }
      };

      expect(_.inspect(obj)).to.equal('{ outer: { foo: \'bar\' } }');
    });
  });

  it('inspect negative zero', function () {
    chai.use(function (_chai, _) {
      expect(_.inspect(-0)).to.equal('-0');
      expect(_.inspect([-0])).to.equal('[ -0 ]');
      expect(_.inspect({ hp: -0 })).to.equal('{ hp: -0 }');
    });
  });

  it('addChainableMethod', function () {
    chai.use(function (_chai, _) {
      _chai.Assertion.addChainableMethod('x',
        function () {
          new chai.Assertion(this._obj).to.be.equal('x');
        }
      , function () {
          this._obj = this._obj || {};
          this._obj.__x = 'X!'
        }
      );

      expect("foo").x.to.equal("foo");
      expect("x").x();

      expect(function () {
        expect("foo").x();
      }).to.throw(_chai.AssertionError);

      // Verify whether the original Function properties are present.
      // see https://github.com/chaijs/chai/commit/514dd6ce4#commitcomment-2593383
      var propertyDescriptor = Object.getOwnPropertyDescriptor(chai.Assertion.prototype, "x");
      expect(propertyDescriptor.get).to.have.property("call", Function.prototype.call);
      expect(propertyDescriptor.get).to.have.property("apply", Function.prototype.apply);
      expect(propertyDescriptor.get()).to.have.property("call", Function.prototype.call);
      expect(propertyDescriptor.get()).to.have.property("apply", Function.prototype.apply);

      var obj = {};
      expect(obj).x.to.be.ok;
      expect(obj).to.have.property('__x', 'X!');
    })
  });

  it('overwriteChainableMethod', function () {
    chai.use(function (_chai, _) {
      _chai.Assertion.overwriteChainableMethod('x',
        function(_super) {
          return function() {
            if (_.flag(this, 'marked')) {
              new chai.Assertion(this._obj).to.be.equal('spot');
            } else {
              _super.apply(this, arguments);
            }
          };
        }
      , function(_super) {
          return function() {
            _.flag(this, 'message', 'x marks the spot');
            _super.apply(this, arguments);
          };
        }
      );

      // Make sure the original behavior of 'x' remains the same
      expect('foo').x.to.equal("foo");
      expect("x").x();
      expect(function () {
        expect("foo").x();
      }).to.throw(_chai.AssertionError);
      var obj = {};
      expect(obj).x.to.be.ok;
      expect(obj).to.have.property('__x', 'X!');

      // Test the new behavior of 'x'
      var assertion = expect('foo').x.to.be.ok;
      expect(_.flag(assertion, 'message')).to.equal('x marks the spot');
      expect(function () {
        var assertion = expect('x');
        _.flag(assertion, 'marked', true);
        assertion.x()
      }).to.throw(_chai.AssertionError);
    });
  });

});
