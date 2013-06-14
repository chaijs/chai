suite('utilities', function () {
  var expect = chai.expect;

  test('_obj', function () {
    var foo = 'bar'
      , test = expect(foo);

    expect(test).to.have.property('_obj', foo);

    var bar = 'baz';
    test._obj = bar;

    expect(test).to.have.property('_obj', bar);
    test.equal(bar);
  });

  test('transferFlags', function () {
    var foo = 'bar'
      , test = expect(foo).not;

    chai.use(function (_chai, utils) {
      var obj = {};
      utils.transferFlags(test, obj);
      expect(utils.flag(obj, 'object')).to.equal(foo);
      expect(utils.flag(obj, 'negate')).to.equal(true);
    });
  });

  test('transferFlags, includeAll = false', function () {
    var foo = 'bar';

    chai.use(function (_chai, utils) {
      var obj = {};

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

  test('addMethod', function () {
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

  test('addMethod returning result', function () {
    chai.use(function(_chai, utils) {
      _chai.Assertion.addMethod('result', function () {
        return 'result';
      })
    });

    expect(expect('foo').result()).to.equal('result');
  });

  test('overwriteMethod', function () {
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

  test('overwriteMethod returning result', function () {
    chai.use(function (_chai, _) {
      _chai.Assertion.overwriteMethod('result', function (_super) {
        return function () {
          return 'result';
        }
      });
    });

    expect(expect('foo').result()).to.equal('result');
  });

  test('addProperty', function () {
    chai.use(function (_chai, _) {
      _chai.Assertion.addProperty('tea', function () {
        _.flag(this, 'tea', 'chai');
      });
    });

    var assert = expect('chai').to.be.tea;
    expect(assert.__flags.tea).to.equal('chai');
  });

  test('addProperty returning result', function () {
    chai.use(function(_chai, _) {
      _chai.Assertion.addProperty('result', function () {
        return 'result';
      })
    });

    expect(expect('foo').result).to.equal('result');
  });

  test('overwriteProperty', function () {
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

  test('overwriteProperty returning result', function () {
    chai.use(function(_chai, _) {
      _chai.Assertion.overwriteProperty('result', function (_super) {
        return function () {
          return 'result';
        }
      });
    });

    expect(expect('foo').result).to.equal('result');
  });

  test('getMessage', function () {
    chai.use(function (_chai, _) {
      expect(_.getMessage({}, [])).to.equal('');
      expect(_.getMessage({}, [null, null, null])).to.equal('');

      var obj = {};
      _.flag(obj, 'message', 'foo');
      expect(_.getMessage(obj, [])).to.contain('foo');
    });
  });

  test('inspect with custom object-returning inspect()s', function () {
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

  test('addChainableMethod', function () {
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
  })
});
