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
      var target = {};
      var test = function() {};

      var assertion = new chai.Assertion(target, "message", test, true);
      var flag = {};
      utils.flag(assertion, 'flagMe', flag);
      utils.flag(assertion, 'negate', true);
      var obj = {};
      utils.transferFlags(assertion, obj, false);

      expect(utils.flag(obj, 'object')).to.equal(undefined);
      expect(utils.flag(obj, 'message')).to.equal(undefined);
      expect(utils.flag(obj, 'ssfi')).to.equal(undefined);
      expect(utils.flag(obj, 'lockSsfi')).to.equal(undefined);
      expect(utils.flag(obj, 'negate')).to.equal(true);
      expect(utils.flag(obj, 'flagMe')).to.equal(flag);
    });
  });

  it('transferFlags, includeAll = true', function () {
    var foo = 'bar';

    chai.use(function (_chai, utils) {
      var target = {};
      var test = function() {};

      var assertion = new chai.Assertion(target, "message", test, true);
      var flag = {};
      utils.flag(assertion, 'flagMe', flag);
      utils.flag(assertion, 'negate', true);
      var obj = {};
      utils.transferFlags(assertion, obj, true);

      expect(utils.flag(obj, 'object')).to.equal(target);
      expect(utils.flag(obj, 'message')).to.equal("message");
      expect(utils.flag(obj, 'ssfi')).to.equal(test);
      expect(utils.flag(obj, 'lockSsfi')).to.equal(true);
      expect(utils.flag(obj, 'negate')).to.equal(true);
      expect(utils.flag(obj, 'flagMe')).to.equal(flag);
    });
  });

  describe('addMethod', function() {
    var assertionConstructor, utils;

    before(function() {
      chai.use(function(_chai, _utils) {
        utils = _utils;
        assertionConstructor = _chai.Assertion;

        expect(_chai.Assertion).to.not.respondTo('eqqqual');
        _chai.Assertion.addMethod('eqqqual', function (str) {
          var object = utils.flag(this, 'object');
          new _chai.Assertion(object).to.be.eql(str);
        });

        _chai.Assertion.addMethod('result', function () {
          return 'result';
        })

        _chai.Assertion.addMethod('returnNewAssertion', function () {
          utils.flag(this, 'mySpecificFlag', 'value1');
          utils.flag(this, 'ultraSpecificFlag', 'value2');
        });

        _chai.Assertion.addMethod('checkFlags', function() {
          this.assert(
              utils.flag(this, 'mySpecificFlag') === 'value1' &&
              utils.flag(this, 'ultraSpecificFlag') === 'value2'
            , 'expected assertion to have specific flags'
            , "this doesn't matter"
          );
        });
      });
    });

    after(function() {
      delete chai.Assertion.prototype.eqqqual;

      delete chai.Assertion.prototype.result;

      delete chai.Assertion.prototype.returnNewAssertion;
      delete chai.Assertion.prototype.checkFlags;
    });

    it('addMethod', function () {
      expect(chai.Assertion).to.respondTo('eqqqual');
      expect('spec').to.eqqqual('spec');
    });

    it('addMethod returning result', function () {
      expect(expect('foo').result()).to.equal('result');
    });

    it('addMethod returns new assertion with flags copied over', function () {
      var assertion1 = expect('foo');
      var assertion2 = assertion1.to.returnNewAssertion();

      // Checking if a new assertion was returned
      expect(assertion1).to.not.be.equal(assertion2);

      // Check if flags were copied
      assertion2.checkFlags();

      // Checking if it's really an instance of an Assertion
      expect(assertion2).to.be.instanceOf(assertionConstructor);

      // Test chaining `.length` after a method to guarantee it's not a function's
      // `length`. Note: 'instanceof' cannot be used here because the test will
      // fail in IE 10 due to how addChainableMethod works without __proto__
      // support. Therefore, test the constructor property of length instead.
      var anAssertion = expect([1, 2, 3]).to.be.an.instanceof(Array);
      expect(anAssertion.length.constructor).to.equal(assertionConstructor);

      var anotherAssertion = expect([1, 2, 3]).to.have.a.lengthOf(3).and.to.be.ok;
      expect(anotherAssertion.length.constructor).to.equal(assertionConstructor);
    });

    it('addMethod sets `ssfi` when `lockSsfi` isn\'t set', function () {
      var origAssertion = expect(1);
      var origSsfi = utils.flag(origAssertion, 'ssfi');

      var newAssertion = origAssertion.eqqqual(1);
      var newSsfi = utils.flag(newAssertion, 'ssfi');

      expect(origSsfi).to.not.equal(newSsfi);
    });

    it('addMethod doesn\'t set `ssfi` when `lockSsfi` is set', function () {
      var origAssertion = expect(1);
      var origSsfi = utils.flag(origAssertion, 'ssfi');

      utils.flag(origAssertion, 'lockSsfi', true);

      var newAssertion = origAssertion.eqqqual(1);
      var newSsfi = utils.flag(newAssertion, 'ssfi');

      expect(origSsfi).to.equal(newSsfi);
    });
  });

  describe('overwriteMethod', function () {
    var assertionConstructor, utils;

    before(function() {
      chai.config.includeStack = false;

      chai.use(function(_chai, _utils) {
        assertionConstructor = _chai.Assertion;
        utils = _utils;

        _chai.Assertion.addMethod('four', function() {
          this.assert(this._obj === 4, 'expected #{this} to be 4', 'expected #{this} to not be 4', 4);
        });

        _chai.Assertion.overwriteMethod('four', function(_super) {
          return function() {
            utils.flag(this, 'mySpecificFlag', 'value1');
            utils.flag(this, 'ultraSpecificFlag', 'value2');

            if (typeof this._obj === 'string') {
              this.assert(this._obj === 'four', 'expected #{this} to be \'four\'', 'expected #{this} to not be \'four\'', 'four');
            } else {
              _super.call(this);
            }
          }
        });

        _chai.Assertion.addMethod('checkFlags', function() {
          this.assert(
              utils.flag(this, 'mySpecificFlag') === 'value1' &&
              utils.flag(this, 'ultraSpecificFlag') === 'value2'
            , 'expected assertion to have specific flags'
            , "this doesn't matter"
          );
        });
      });
    });

    after(function() {
      delete chai.Assertion.prototype.four;
      delete chai.Assertion.prototype.checkFlags;
      delete chai.Assertion.prototype.eqqqual;
      delete chai.Assertion.prototype.doesnotexist;
      delete chai.Assertion.prototype.doesnotexistfail;
    });

    it('overwriteMethod', function () {
      chai.use(function (_chai, utils) {
        _chai.Assertion.addMethod('eqqqual', function (str) {
          var object = utils.flag(this, 'object');
          new _chai.Assertion(object).to.be.eql(str);
        });

        _chai.Assertion.overwriteMethod('eqqqual', function (_super) {
          return function (str) {
            var object = utils.flag(this, 'object');
            if (object == 'cucumber' && str == 'cuke') {
              utils.flag(this, 'cucumber', true);
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
          }
        });
      });

      var dne = expect('something').to.doesnotexist();
      expect(dne.__flags).to.have.property('doesnt');

      chai.use(function (_chai, _) {
        expect(_chai.Assertion).to.not.respondTo('doesnotexistfail');
        _chai.Assertion.overwriteMethod('doesnotexistfail', function (_super) {
          expect(_super).to.be.a('function');
          return function () {
            _.flag(this, 'doesnt', true);
            _super.apply(this, arguments);
          }
        });
      });

      var dneFail = expect('something');
      var dneError;
      try { dneFail.doesnotexistfail(); }
      catch (e) { dneError = e; }
      expect(dneFail.__flags).to.have.property('doesnt');
      expect(dneError.message).to.eql('doesnotexistfail is not a function');
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

    it('calling _super has correct stack trace', function() {
      try {
        expect(5).to.be.four();
        expect(false, 'should not get here because error thrown').to.be.ok;
      } catch (err) {
        // not all browsers support err.stack
        // Phantom does not include function names for getter exec
        if ('undefined' !== typeof err.stack && 'undefined' !== typeof Error.captureStackTrace) {
          expect(err.stack).to.include('utilities.js');
          expect(err.stack).to.not.include('overwriteMethod');
        }
      }
    });

    it('overwritten behavior has correct stack trace', function() {
      try {
        expect('five').to.be.four();
        expect(false, 'should not get here because error thrown').to.be.ok;
      } catch (err) {
        // not all browsers support err.stack
        // Phantom does not include function names for getter exec
        if ('undefined' !== typeof err.stack && 'undefined' !== typeof Error.captureStackTrace) {
          expect(err.stack).to.include('utilities.js');
          expect(err.stack).to.not.include('overwriteMethod');
        }
      }
    });

    it('should return a new assertion with flags copied over', function () {
      var assertion1 = expect('four');
      var assertion2 = assertion1.four();

      // Checking if a new assertion was returned
      expect(assertion1).to.not.be.equal(assertion2);

      // Check if flags were copied
      assertion2.checkFlags();

      // Checking if it's really an instance of an Assertion
      expect(assertion2).to.be.instanceOf(assertionConstructor);

      // Test chaining `.length` after a method to guarantee it is not a function's `length`
      expect('four').to.be.a.four().length.above(2);

      // Ensure that foo returns an Assertion (not a function)
      expect(expect('four').four()).to.be.an.instanceOf(assertionConstructor);
    });

    it('overwriteMethod sets `ssfi` when `lockSsfi` isn\'t set', function () {
      var origAssertion = expect(4);
      var origSsfi = utils.flag(origAssertion, 'ssfi');

      var newAssertion = origAssertion.four();
      var newSsfi = utils.flag(newAssertion, 'ssfi');

      expect(origSsfi).to.not.equal(newSsfi);
    });

    it('overwriteMethod doesn\'t set `ssfi` when `lockSsfi` is set', function () {
      var origAssertion = expect(4);
      var origSsfi = utils.flag(origAssertion, 'ssfi');

      utils.flag(origAssertion, 'lockSsfi', true);

      var newAssertion = origAssertion.four();
      var newSsfi = utils.flag(newAssertion, 'ssfi');

      expect(origSsfi).to.equal(newSsfi);
    });
  });

  describe('addProperty', function() {
    var assertionConstructor = chai.Assertion;
    var utils;

    before(function() {
      chai.use(function (_chai, _utils) {
        utils = _utils;
        assertionConstructor = _chai.Assertion;

        _chai.Assertion.addProperty('tea', function () {
          utils.flag(this, 'tea', 'chai');
        });

        _chai.Assertion.addProperty('result', function () {
          return 'result';
        })

        _chai.Assertion.addProperty('thing', function () {
          utils.flag(this, 'mySpecificFlag', 'value1');
          utils.flag(this, 'ultraSpecificFlag', 'value2');
        });

        _chai.Assertion.addMethod('checkFlags', function() {
          this.assert(
              utils.flag(this, 'mySpecificFlag') === 'value1' &&
              utils.flag(this, 'ultraSpecificFlag') === 'value2'
            , 'expected assertion to have specific flags'
            , "this doesn't matter"
          );
        });
      });
    });

    after(function() {
      delete chai.Assertion.prototype.tea;
      delete chai.Assertion.prototype.thing;
      delete chai.Assertion.prototype.checkFlags;
      delete chai.Assertion.prototype.result;
    });

    it('addProperty', function () {
      var assert = expect('chai').to.be.tea;
      expect(assert.__flags.tea).to.equal('chai');
    });

    it('addProperty returning result', function () {
      expect(expect('foo').result).to.equal('result');
    });

    it('addProperty returns a new assertion with flags copied over', function () {
      var assertion1 = expect('foo');
      var assertion2 = assertion1.is.thing;

      // Checking if a new assertion was returned
      expect(assertion1).to.not.be.equal(assertion2);

      // Check if flags were copied
      assertion2.checkFlags();

      // If it is, calling length on it should return an assertion, not a function
      expect([1, 2, 3]).to.be.an.instanceof(Array);

      // Checking if it's really an instance of an Assertion
      expect(assertion2).to.be.instanceOf(assertionConstructor);

      // Test chaining `.length` after a property to guarantee it is not a function's `length`
      expect([1, 2, 3]).to.be.a.thing.with.length.above(2);
      expect([1, 2, 3]).to.be.an.instanceOf(Array).and.have.length.below(4);

      expect(expect([1, 2, 3]).be).to.be.an.instanceOf(assertionConstructor);
      expect(expect([1, 2, 3]).thing).to.be.an.instanceOf(assertionConstructor);
    });

    it('addProperty sets `ssfi` when `lockSsfi` isn\'t set', function () {
      var origAssertion = expect(1);
      var origSsfi = utils.flag(origAssertion, 'ssfi');

      var newAssertion = origAssertion.to.be.tea;
      var newSsfi = utils.flag(newAssertion, 'ssfi');

      expect(origSsfi).to.not.equal(newSsfi);
    });

    it('addProperty doesn\'t set `ssfi` when `lockSsfi` is set', function () {
      var origAssertion = expect(1);
      var origSsfi = utils.flag(origAssertion, 'ssfi');

      utils.flag(origAssertion, 'lockSsfi', true);

      var newAssertion = origAssertion.to.be.tea;
      var newSsfi = utils.flag(newAssertion, 'ssfi');

      expect(origSsfi).to.equal(newSsfi);
    });
  });

  describe('overwriteProperty', function () {
    var assertionConstructor, utils;

    before(function() {
      chai.config.includeStack = false;

      chai.use(function(_chai, _utils) {
        assertionConstructor = _chai.Assertion;
        utils = _utils;

        _chai.Assertion.addProperty('tea', function () {
          utils.flag(this, 'tea', 'chai');
        });

        _chai.Assertion.overwriteProperty('tea', function (_super) {
          return function () {
            var act = utils.flag(this, 'object');
            if (act === 'matcha') {
              utils.flag(this, 'tea', 'matcha');
            } else {
              _super.call(this);
            }
          }
        });

        _chai.Assertion.overwriteProperty('result', function (_super) {
          return function () {
            return 'result';
          }
        });

        _chai.Assertion.addProperty('four', function() {
          this.assert(this._obj === 4, 'expected #{this} to be 4', 'expected #{this} to not be 4', 4);
        });

        _chai.Assertion.overwriteProperty('four', function(_super) {
          return function() {
            if (typeof this._obj === 'string') {
              this.assert(this._obj === 'four', 'expected #{this} to be \'four\'', 'expected #{this} to not be \'four\'', 'four');
            } else {
              _super.call(this);
            }
          }
        });

        _chai.Assertion.addProperty('foo');

        _chai.Assertion.overwriteProperty('foo', function (_super) {
          return function blah () {
            utils.flag(this, 'mySpecificFlag', 'value1');
            utils.flag(this, 'ultraSpecificFlag', 'value2');
            _super.call(this);
          };
        });

        _chai.Assertion.addMethod('checkFlags', function() {
          this.assert(
              utils.flag(this, 'mySpecificFlag') === 'value1' &&
              utils.flag(this, 'ultraSpecificFlag') === 'value2'
            , 'expected assertion to have specific flags'
            , "this doesn't matter"
          );
        });
      });
    });

    after(function() {
      delete chai.Assertion.prototype.tea;
      delete chai.Assertion.prototype.four;
      delete chai.Assertion.prototype.result;
      delete chai.Assertion.prototype.foo;
      delete chai.Assertion.prototype.checkFlags
    });

    it('overwriteProperty', function () {
      var matcha = expect('matcha').to.be.tea;
      expect(matcha.__flags.tea).to.equal('matcha');
      var assert = expect('something').to.be.tea;
      expect(assert.__flags.tea).to.equal('chai');
    });

    it('overwriteProperty returning result', function () {
      expect(expect('foo').result).to.equal('result');
    });

    it('calling _super has correct stack trace', function() {
      try {
        expect(5).to.be.four;
        expect(false, 'should not get here because error thrown').to.be.ok;
      } catch (err) {
        // not all browsers support err.stack
        // Phantom does not include function names for getter exec
        if ('undefined' !== typeof err.stack && 'undefined' !== typeof Error.captureStackTrace) {
          expect(err.stack).to.include('utilities.js');
          expect(err.stack).to.not.include('overwriteProperty');
        }
      }
    });

    it('overwritten behavior has correct stack trace', function() {
      try {
        expect('five').to.be.four;
        expect(false, 'should not get here because error thrown').to.be.ok;
      } catch (err) {
        // not all browsers support err.stack
        // Phantom does not include function names for getter exec
        if ('undefined' !== typeof err.stack && 'undefined' !== typeof Error.captureStackTrace) {
          expect(err.stack).to.include('utilities.js');
          expect(err.stack).to.not.include('overwriteProperty');
        }
      }
    });

    it('should return new assertion with flags copied over', function() {
      var assertion1 = expect('foo');
      var assertion2 = assertion1.is.foo;

      // Checking if a new assertion was returned
      expect(assertion1).to.not.be.equal(assertion2);

      // Check if flags were copied
      assertion2.checkFlags();

      // If it is, calling length on it should return an assertion, not a function
      expect([1, 2, 3]).to.be.an.foo.length.below(1000);

      // Checking if it's really an instance of an Assertion
      expect(assertion2).to.be.instanceOf(assertionConstructor);

      // Test chaining `.length` after a property to guarantee it is not a function's `length`
      expect([1, 2, 3]).to.be.a.foo.with.length.above(2);
      expect([1, 2, 3]).to.be.an.instanceOf(Array).and.have.length.below(4);

      expect(expect([1, 2, 3]).be).to.be.an.instanceOf(assertionConstructor);
      expect(expect([1, 2, 3]).foo).to.be.an.instanceOf(assertionConstructor);
    });

    describe('when useProxy is false', function () {
      before(function () {
        chai.config.useProxy = false;
      });

      after(function () {
        chai.config.useProxy = true;
      });

      it('overwriteProperty sets `ssfi` when `lockSsfi` isn\'t set', function () {
        var origAssertion = expect(4);
        var origSsfi = utils.flag(origAssertion, 'ssfi');

        var newAssertion = origAssertion.to.be.four;
        var newSsfi = utils.flag(newAssertion, 'ssfi');

        expect(origSsfi).to.not.equal(newSsfi);
      });
    });

    it('overwriteProperty doesn\'t set `ssfi` when `lockSsfi` is set', function () {
      var origAssertion = expect(4);
      var origSsfi = utils.flag(origAssertion, 'ssfi');

      utils.flag(origAssertion, 'lockSsfi', true);

      var newAssertion = origAssertion.to.be.four;
      var newSsfi = utils.flag(newAssertion, 'ssfi');

      expect(origSsfi).to.equal(newSsfi);
    });
  });

  it('getMessage', function () {
    chai.use(function (_chai, _) {
      expect(_.getMessage({}, [])).to.equal('');
      expect(_.getMessage({}, [null, null, null])).to.equal('');

      var obj = {};
      _.flag(obj, 'message', 'foo');
      expect(_.getMessage(obj, [])).to.contain('foo');
    });
  });

  it('getMessage passed message as function', function () {
    chai.use(function (_chai, _) {
      var obj = {};
      var msg = function() { return "expected a to eql b"; }
      var negateMsg = function() { return "expected a not to eql b"; }
      expect(_.getMessage(obj, [null, msg, negateMsg])).to.equal("expected a to eql b");
      _.flag(obj, 'negate', true);
      expect(_.getMessage(obj, [null, msg, negateMsg])).to.equal("expected a not to eql b");
    });
  });

  it('getMessage template tag substitution', function () {
    chai.use(function (_chai, _) {
      var objName = 'trojan horse';
      var actualValue = 'an actual value';
      var expectedValue = 'an expected value';
      [
          // known template tags
          {
              template: 'one #{this} two',
              expected: 'one \'' + objName + '\' two'
          },
          {
              template: 'one #{act} two',
              expected: 'one \'' + actualValue + '\' two'
          },
          {
              template: 'one #{exp} two',
              expected: 'one \'' + expectedValue + '\' two'
          },
          // unknown template tag
          {
              template: 'one #{unknown} two',
              expected: 'one #{unknown} two'
          },
          // repeated template tag
          {
              template: '#{this}#{this}',
              expected: '\'' + objName + '\'\'' + objName + '\''
          },
          // multiple template tags in different order
          {
              template: '#{this}#{act}#{exp}#{act}#{this}',
              expected: '\'' + objName + '\'\'' + actualValue + '\'\'' + expectedValue + '\'\'' + actualValue + '\'\'' + objName + '\''
          },
          // immune to string.prototype.replace() `$` substitution
          {
              objName: '-$$-',
              template: '#{this}',
              expected: '\'-$$-\''
          },
          {
              actualValue: '-$$-',
              template: '#{act}',
              expected: '\'-$$-\''
          },
          {
              expectedValue: '-$$-',
              template: '#{exp}',
              expected: '\'-$$-\''
          }
      ].forEach(function (config) {
          config.objName = config.objName || objName;
          config.actualValue = config.actualValue || actualValue;
          config.expectedValue = config.expectedValue || expectedValue;
          var obj = {_obj: config.actualValue};
          _.flag(obj, 'object', config.objName);
          expect(_.getMessage(obj, [null, config.template, null, config.expectedValue])).to.equal(config.expected);
      });
    });
  });

  it('inspect with custom stylize-calling inspect()s', function () {
    chai.use(function (_chai, _) {
      var obj = {
        outer: {
          inspect: function (depth, options) {
            return options.stylize('Object content', 'string');
          }
        }
      };
      expect(_.inspect(obj)).to.equal('{ outer: Object content }');
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

  it('inspect Symbol', function () {
    if (typeof Symbol !== 'function') return;

    chai.use(function (_chai, _) {
      expect(_.inspect(Symbol())).to.equal('Symbol()');
      expect(_.inspect(Symbol('cat'))).to.equal('Symbol(cat)');
    });
  });

  it('inspect BigInt', function () {
    if (typeof BigInt !== 'function') return;

    chai.use(function (_chai, _) {
      expect(_.inspect(BigInt(0))).to.equal('0n');
      expect(_.inspect(BigInt(1234))).to.equal('1234n');
      expect(_.inspect(BigInt(-1234))).to.equal('-1234n');
    });
  });

  it('inspect every kind of available TypedArray', function () {
    chai.use(function (_chai, _) {
      var arr = [1, 2, 3]
        , exp = '[ 1, 2, 3 ]'
        , isNode = true;

      if (typeof window !== 'undefined') {
        isNode = false;
      }

      // Checks if engine supports common TypedArrays
      if ((!isNode && 'Int8Array' in window) ||
          isNode && typeof 'Int8Array' !== undefined) {
        // Typed array inspections should work as array inspections do
        expect(_.inspect(new Int8Array(arr))).to.equal(exp);
        expect(_.inspect(new Uint8Array(arr))).to.equal(exp);
        expect(_.inspect(new Int16Array(arr))).to.equal(exp);
        expect(_.inspect(new Uint16Array(arr))).to.equal(exp);
        expect(_.inspect(new Int32Array(arr))).to.equal(exp);
        expect(_.inspect(new Uint32Array(arr))).to.equal(exp);
        expect(_.inspect(new Float32Array(arr))).to.equal(exp);
      }

      // These ones may not be available alongside the others above
      if ((!isNode && 'Uint8ClampedArray' in window) ||
          isNode && typeof 'Uint8ClampedArray' !== undefined) {
        expect(_.inspect(new Uint8ClampedArray(arr))).to.equal(exp);
      }

      if ((!isNode && 'Float64Array' in window) ||
          isNode && typeof 'Float64Array' !== undefined) {
        expect(_.inspect(new Float64Array(arr))).to.equal(exp);
      }
    });
  });

  it('inspect an assertion', function () {
    chai.use(function (_chai, _) {
      var assertion = expect(1);
      var anInspectFn = function() {
        return _.inspect(assertion);
      };

      expect(anInspectFn).to.not.throw();
    });
  });

  it('truncate long TypedArray', function () {
    chai.use(function (_chai, _) {

      var arr = []
        , exp = '[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, ... ]'
        , isNode = true;

      // Filling arr with lots of elements
      for (var i = 1; i <= 1000; i++) {
        arr.push(i);
      }

      if (typeof window !== 'undefined') {
        isNode = false;
      }

      if ((!isNode && 'Int8Array' in window) ||
          isNode && typeof 'Int8Array' !== undefined) {
        expect(_.inspect(new Int8Array(arr))).to.equal(exp);
      }
    });
  });

  describe('addChainableMethod', function() {
    var assertionConstructor, utils;

    before(function() {
      chai.use(function (_chai, _utils) {
        assertionConstructor = _chai.Assertion;
        utils = _utils;

        _chai.Assertion.addChainableMethod('x',
          function () {
            new chai.Assertion(this._obj).to.be.equal('x');
          }
        , function () {
            if (this._obj === Object(this._obj)) {
              this._obj.__x = 'X!'
            }
          }
        );

        _chai.Assertion.addChainableMethod('foo', function(str) {
          utils.flag(this, 'mySpecificFlag', 'value1');
          utils.flag(this, 'ultraSpecificFlag', 'value2');

          var obj = utils.flag(this, 'object');
          new _chai.Assertion(obj).to.be.equal(str);
        });

        _chai.Assertion.addMethod('checkFlags', function() {
          this.assert(
              utils.flag(this, 'mySpecificFlag') === 'value1' &&
              utils.flag(this, 'ultraSpecificFlag') === 'value2'
            , 'expected assertion to have specific flags'
            , "this doesn't matter"
          );
        });
      });
    });

    after(function() {
      delete chai.Assertion.prototype.x;
      delete chai.Assertion.prototype.foo;
      delete chai.Assertion.prototype.checkFlags;
    });

    it('addChainableMethod', function () {
      expect("foo").x.to.equal("foo");
      expect("x").x();

      expect(function () {
        expect("foo").x();
      }).to.throw(chai.AssertionError);

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
    });

    it('addChainableMethod should return a new assertion with flags copied over', function () {
      chai.config.proxyExcludedKeys.push('nodeType');

      var assertion1 = expect('bar');
      var assertion2 = assertion1.foo('bar');

      // Checking if a new assertion was returned
      expect(assertion1).to.not.be.equal(assertion2);

      // Check if flags were copied
      assertion2.checkFlags();

      // Checking if it's really an instance of an Assertion
      expect(assertion2).to.be.instanceOf(assertionConstructor);

      // Test chaining `.length` after a method to guarantee it is not a function's `length`
      expect('bar').to.be.a.foo('bar').length.above(2);

      // Ensure that foo returns an Assertion (not a function)
      expect(expect('bar').foo('bar')).to.be.an.instanceOf(assertionConstructor);
    });

    it('addChainableMethod sets `ssfi` when `lockSsfi` isn\'t set', function () {
      var origAssertion = expect('x');
      var origSsfi = utils.flag(origAssertion, 'ssfi');

      var newAssertion = origAssertion.to.be.x();
      var newSsfi = utils.flag(newAssertion, 'ssfi');

      expect(origSsfi).to.not.equal(newSsfi);
    });

    it('addChainableMethod doesn\'t set `ssfi` when `lockSsfi` is set', function () {
      var origAssertion = expect('x');
      var origSsfi = utils.flag(origAssertion, 'ssfi');

      utils.flag(origAssertion, 'lockSsfi', true);

      var newAssertion = origAssertion.to.be.x();
      var newSsfi = utils.flag(newAssertion, 'ssfi');

      expect(origSsfi).to.equal(newSsfi);
    });
  });

  describe('overwriteChainableMethod', function() {
    var assertionConstructor;
    var utils;

    before(function() {
      chai.use(function (_chai, _utils) {
        assertionConstructor = _chai.Assertion;
        utils = _utils;

        _chai.Assertion.addChainableMethod('x',
          function () {
            new chai.Assertion(this._obj).to.be.equal('x');
          }
        , function () {
            if (this._obj === Object(this._obj)) {
              this._obj.__x = 'X!'
            }
          }
        );

        _chai.Assertion.overwriteChainableMethod('x',
          function(_super) {
            return function() {
              utils.flag(this, 'mySpecificFlag', 'value1');
              utils.flag(this, 'ultraSpecificFlag', 'value2');

              if (utils.flag(this, 'marked')) {
                new chai.Assertion(this._obj).to.be.equal('spot');
              } else {
                _super.apply(this, arguments);
              }
            };
          }
        , function(_super) {
            return function() {
              utils.flag(this, 'message', 'x marks the spot');
              _super.apply(this, arguments);
            };
          }
        );

        _chai.Assertion.addMethod('checkFlags', function() {
          this.assert(
              utils.flag(this, 'mySpecificFlag') === 'value1' &&
              utils.flag(this, 'ultraSpecificFlag') === 'value2' &&
              utils.flag(this, 'message') === 'x marks the spot'
            , 'expected assertion to have specific flags'
            , "this doesn't matter"
          );
        });
      });
    });

    after(function() {
      delete chai.Assertion.prototype.x;
      delete chai.Assertion.prototype.checkFlags;
    });

    it('overwriteChainableMethod', function () {
      // Make sure the original behavior of 'x' remains the same
      expect('foo').x.to.equal("foo");
      expect("x").x();
      expect(function () {
        expect("foo").x();
      }).to.throw(chai.AssertionError);
      var obj = {};
      expect(obj).x.to.be.ok;
      expect(obj).to.have.property('__x', 'X!');

      // Test the new behavior of 'x'
      var assertion = expect('foo').x.to.be.ok;
      expect(utils.flag(assertion, 'message')).to.equal('x marks the spot');
      expect(function () {
        var assertion = expect('x');
        utils.flag(assertion, 'marked', true);
        assertion.x()
      }).to.throw(chai.AssertionError);
    });

    it('should return a new assertion with flags copied over', function () {
      var assertion1 = expect('x');
      var assertion2 = assertion1.x();

      chai.config.proxyExcludedKeys.push('nodeType');

      // Checking if a new assertion was returned
      expect(assertion1).to.not.be.equal(assertion2);

      // Check if flags were copied
      assertion2.checkFlags();

      // Checking if it's really an instance of an Assertion
      expect(assertion2).to.be.instanceOf(assertionConstructor);

      // Test chaining `.length` after a method to guarantee it is not a function's `length`
      expect('x').to.be.x().length.above(0);

      // Ensure that foo returns an Assertion (not a function)
      expect(expect('x').x()).to.be.an.instanceOf(assertionConstructor);

      if (typeof Object.setPrototypeOf === 'function') {
        expect(expect('x').x).to.be.an.instanceOf(assertionConstructor);
      }
    });

    it('overwriteChainableMethod sets `ssfi` when `lockSsfi` isn\'t set', function () {
      var origAssertion = expect('x');
      var origSsfi = utils.flag(origAssertion, 'ssfi');

      var newAssertion = origAssertion.to.be.x();
      var newSsfi = utils.flag(newAssertion, 'ssfi');

      expect(origSsfi).to.not.equal(newSsfi);
    });

    it('overwriteChainableMethod doesn\'t set `ssfi` when `lockSsfi` is set', function () {
      var origAssertion = expect('x');
      var origSsfi = utils.flag(origAssertion, 'ssfi');

      utils.flag(origAssertion, 'lockSsfi', true);

      var newAssertion = origAssertion.to.be.x();
      var newSsfi = utils.flag(newAssertion, 'ssfi');

      expect(origSsfi).to.equal(newSsfi);
    });
  });

  it('compareByInspect', function () {
    chai.use(function (_chai, _) {
      var cbi = _.compareByInspect;

      // "'c" is less than "'d"
      expect(cbi('cat', 'dog')).to.equal(-1);
      expect(cbi('dog', 'cat')).to.equal(1);
      expect(cbi('cat', 'cat')).to.equal(1);

      // "{ cat: [ [ 'dog', 1" is less than "{ cat [ [ 'dog', 2"
      expect(cbi({'cat': [['dog', 1]]}, {'cat': [['dog', 2]]})).to.equal(-1);
      expect(cbi({'cat': [['dog', 2]]}, {'cat': [['dog', 1]]})).to.equal(1);

      if (typeof Symbol === 'function') {
        // "Symbol(c" is less than "Symbol(d"
        expect(cbi(Symbol('cat'), Symbol('dog'))).to.equal(-1);
        expect(cbi(Symbol('dog'), Symbol('cat'))).to.equal(1);
      }
    });
  });

  describe('getOwnEnumerablePropertySymbols', function () {
    var gettem;

    beforeEach(function () {
      chai.use(function (_chai, _) {
        gettem = _.getOwnEnumerablePropertySymbols;
      });
    });

    it('returns an empty array if no symbols', function () {
      var obj = {}
        , cat = 'cat';

      obj[cat] = 42;

      expect(gettem(obj)).to.not.include(cat);
    });

    it('returns enumerable symbols only', function () {
      if (typeof Symbol !== 'function') return;

      var cat = Symbol('cat')
        , dog = Symbol('dog')
        , frog = Symbol('frog')
        , cow = 'cow'
        , obj = {};

      obj[cat] = 'meow';
      obj[dog] = 'woof';

      Object.defineProperty(obj, frog, {
        enumerable: false,
        value: 'ribbit'
      });

      obj[cow] = 'moo';

      expect(gettem(obj)).to.have.same.members([cat, dog]);
    });
  });

  describe('getOwnEnumerableProperties', function () {
    var gettem;

    beforeEach(function () {
      chai.use(function (_chai, _) {
        gettem = _.getOwnEnumerableProperties;
      });
    });

    it('returns enumerable property names if no symbols', function () {
      var cat = 'cat'
        , dog = 'dog'
        , frog = 'frog'
        , obj = {};

      obj[cat] = 'meow'
      obj[dog] = 'woof';

      Object.defineProperty(obj, frog, {
        enumerable: false,
        value: 'ribbit'
      });

      expect(gettem(obj)).to.have.same.members([cat, dog]);
    });

    it('returns enumerable property names and symbols', function () {
      if (typeof Symbol !== 'function') return;

      var cat = Symbol('cat')
        , dog = Symbol('dog')
        , frog = Symbol('frog')
        , bird = 'bird'
        , cow = 'cow'
        , obj = {};

      obj[cat] = 'meow';
      obj[dog] = 'woof';
      obj[bird] = 'chirp';

      Object.defineProperty(obj, frog, {
        enumerable: false,
        value: 'ribbit'
      });

      Object.defineProperty(obj, cow, {
        enumerable: false,
        value: 'moo'
      });

      expect(gettem(obj)).to.have.same.members([cat, dog, bird]);
    });
  });

  describe('proxified object', function () {
    if (typeof Proxy === 'undefined' || typeof Reflect === 'undefined') return;

    var proxify;

    beforeEach(function () {
      chai.use(function (_chai, _) {
        proxify = _.proxify;
      });
    });

    it('returns property value if an existing property is read', function () {
      var pizza = proxify({mushrooms: 42});

      expect(pizza.mushrooms).to.equal(42);
    });

    it('returns property value if an existing property is read when nonChainableMethodName is set', function () {
      var bake = function () {};
      bake.numPizzas = 2;

      var bakeProxy = proxify(bake, 'bake');

      expect(bakeProxy.numPizzas).to.equal(2);
    });

    it('throws invalid property error if a non-existent property is read', function () {
      var pizza = proxify({});

      expect(function () {
        pizza.mushrooms;
      }).to.throw('Invalid Chai property: mushrooms');
    });

    it('throws invalid use error if a non-existent property is read when nonChainableMethodName is set', function () {
      var bake = proxify(function () {}, 'bake');

      expect(function () {
        bake.numPizzas;
      }).to.throw('Invalid Chai property: bake.numPizzas. See docs for proper usage of "bake".');
    });

    it('suggests a fix if a non-existent prop looks like a typo', function () {
      var pizza = proxify({foo: 1, bar: 2, baz: 3});

      expect(function () {
        pizza.phoo;
      }).to.throw('Invalid Chai property: phoo. Did you mean "foo"?');
    });

    it('doesn\'t take exponential time to find string distances', function () {
      var pizza = proxify({veryLongPropertyNameWithLotsOfLetters: 1});

      expect(function () {
        pizza.extremelyLongPropertyNameWithManyLetters;
      }).to.throw(
        'Invalid Chai property: extremelyLongPropertyNameWithManyLetters'
      );
    });

    it('doesn\'t suggest properties from Object.prototype', function () {
      var pizza = proxify({string: 5});
      expect(function () {
        pizza.tostring;
      }).to.throw('Invalid Chai property: tostring. Did you mean "string"?');
    });

    it('doesn\'t suggest internally properties', function () {
      var pizza = proxify({flags: 5, __flags: 6});
      expect(function () {
        pizza.___flags; // 3 underscores; closer to '__flags' than 'flags'
      }).to.throw('Invalid Chai property: ___flags. Did you mean "flags"?');
    });

    // .then is excluded from property validation for promise support
    it('doesn\'t throw error if non-existent `then` is read', function () {
      var pizza = proxify({});

      expect(function () {
        pizza.then;
      }).to.not.throw();
    });
  });

  describe('addLengthGuard', function () {
    var fnLengthDesc = Object.getOwnPropertyDescriptor(function () {}, 'length');
    if (!fnLengthDesc.configurable) return;

    var addLengthGuard;

    beforeEach(function () {
      chai.use(function (_chai, _) {
        addLengthGuard = _.addLengthGuard;
      });
    });

    it('throws invalid use error if `.length` is read when `methodName` is defined and `isChainable` is false', function () {
      var hoagie = addLengthGuard({}, 'hoagie', false);

      expect(function () {
        hoagie.length;
      }).to.throw('Invalid Chai property: hoagie.length. See docs for proper usage of "hoagie".');
    });

    it('throws incompatible `.length` error if `.length` is read when `methodName` is defined and `isChainable` is true', function () {
      var hoagie = addLengthGuard({}, 'hoagie', true);

      expect(function () {
        hoagie.length;
      }).to.throw('Invalid Chai property: hoagie.length. Due to a compatibility issue, "length" cannot directly follow "hoagie". Use "hoagie.lengthOf" instead.');
    });
  });

  describe("isProxyEnabled", function () {
    var origUseProxy, isProxyEnabled;

    before(function () {
      chai.use(function (_chai, _) {
        isProxyEnabled = _.isProxyEnabled;
      });

      origUseProxy = chai.config.useProxy;
    });

    beforeEach(function () {
      chai.config.useProxy = true;
    });

    after(function () {
      chai.config.useProxy = origUseProxy;
    });

    if (typeof Proxy !== 'undefined' && typeof Reflect !== 'undefined') {
      it("returns true if Proxy and Reflect are defined, and useProxy is true", function () {
        expect(isProxyEnabled()).to.be.true;
      });

      it("returns false if Proxy and Reflect are defined, and useProxy is false", function () {
        chai.config.useProxy = false;

        expect(isProxyEnabled()).to.be.false;
      });
    } else {
      it("returns false if Proxy and/or Reflect are undefined, and useProxy is true", function () {
        expect(isProxyEnabled()).to.be.false;
      });

      it("returns false if Proxy and/or Reflect are undefined, and useProxy is false", function () {
        chai.config.useProxy = false;

        expect(isProxyEnabled()).to.be.false;
      });
    }
  });

  describe('getOperator', function() {
    it('Must return operator if the "operator" flag is set', function() {
      chai.use(function(_chai, _) {
        expect(_.getOperator({}, [])).to.equal(undefined);
        expect(_.getOperator({}, [null, null, null])).to.equal(undefined);

        var obj = {};
        _.flag(obj, 'operator', 'my-operator');
        expect(_.getOperator(obj, [])).to.equal('my-operator');
      });
    });

    it('Must return undefined if message is partial assertions', function() {
      chai.use(function(_chai, _) {
        expect(
          _.getOperator({}, [null, 'to have the same ordered', null, 'test'])
        ).to.equal(undefined);
      });
    });

    it('Must return deepStrictEqual if "expected" is a object and assertion is for equal', function() {
      chai.use(function(_chai, _) {
        var expected = Object.create({
          dummyProperty1: 'dummyProperty1',
          dummyProperty2: 'dummyProperty2',
          dummyProperty3: 'dummyProperty3'
        });

        var obj = {};
        _.flag(obj, 'negate', false);

        expect(
          _.getOperator(obj, [
            null,
            'expect #{this} deep equal to #{exp}',
            'expect #{this} not deep equal to #{exp}',
            expected
          ])
        ).to.equal('deepStrictEqual');
      });
    });

    it('Must return deepStrictEqual if "expected" is a function and assertion is for equal', function() {
      chai.use(function(_chai, _) {
        function expected () {
          this.prop = 'prop';
        }

        var obj = {};
        _.flag(obj, 'negate', false);

        expect(
          _.getOperator(obj, [
            null,
            'expect #{this} deep equal to #{exp}',
            'expect #{this} not deep equal to #{exp}',
            expected
          ])
        ).to.equal('deepStrictEqual');
      });
    });

    it('Must return deepStrictEqual if "expected" is an array and assertion is for equal', function() {
      chai.use(function(_chai, _) {
        var expected = [
          'item 1'
        ];

        var obj = {};
        _.flag(obj, 'negate', false);

        expect(
          _.getOperator(obj, [
            null,
            'expect #{this} deep equal to #{exp}',
            'expect #{this} not deep equal to #{exp}',
            expected
          ])
        ).to.equal('deepStrictEqual');
      });
    });

    it('Must return strictEqual if "expected" is a string and assertion is for equal', function() {
      chai.use(function(_chai, _) {
        var expected = 'someString';

        var obj = {};
        _.flag(obj, 'negate', false);

        expect(
          _.getOperator(obj, [
            null,
            'expect #{this} equal to #{exp}',
            'expect #{this} not equal to #{exp}',
            expected
          ])
        ).to.equal('strictEqual');
      });
    });

    it('Must return notDeepStrictEqual if "expected" is a object and assertion is for inequality', function() {
      chai.use(function(_chai, _) {
        var expected = Object.create({
          dummyProperty1: 'dummyProperty1',
          dummyProperty2: 'dummyProperty2',
          dummyProperty3: 'dummyProperty3'
        });

        var obj = {};
        _.flag(obj, 'negate', true);

        expect(
          _.getOperator(obj, [
            null,
            'expect #{this} deep equal to #{exp}',
            'expect #{this} not deep equal to #{exp}',
            expected
          ])
        ).to.equal('notDeepStrictEqual');
      });
    });

    it('Must return notDeepStrictEqual if "expected" is a function and assertion is for inequality', function() {
      chai.use(function(_chai, _) {
        function expected () {
          this.prop = 'prop';
        }

        var obj = {};
        _.flag(obj, 'negate', true);

        expect(
          _.getOperator(obj, [
            null,
            'expect #{this} deep equal to #{exp}',
            'expect #{this} not deep equal to #{exp}',
            expected
          ])
        ).to.equal('notDeepStrictEqual');
      });
    });

    it('Must return notDeepStrictEqual if "expected" is an array and assertion is for inequality', function() {
      chai.use(function(_chai, _) {
        var expected = [
          'item 1'
        ];

        var obj = {};
        _.flag(obj, 'negate', true);

        expect(
          _.getOperator(obj, [
            null,
            'expect #{this} deep equal to #{exp}',
            'expect #{this} not deep equal to #{exp}',
            expected
          ])
        ).to.equal('notDeepStrictEqual');
      });
    });

    it('Must return notStrictEqual if "expected" is a string and assertion is for inequality', function() {
      chai.use(function(_chai, _) {
        var expected = 'someString';

        var obj = {};
        _.flag(obj, 'negate', true);

        expect(
          _.getOperator(obj, [
            null,
            'expect #{this} equal to #{exp}',
            'expect #{this} not equal to #{exp}',
            expected
          ])
        ).to.equal('notStrictEqual');
      });
    });
  });
});
