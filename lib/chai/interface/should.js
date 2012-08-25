/*!
 * chai
 * Copyright(c) 2011-2012 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

module.exports = function (chai, util) {
  var Assertion = chai.Assertion;

  function loadShould () {
    // modify Object.prototype to have `should`
    Object.defineProperty(Object.prototype, 'should',
      {
        set: function (value) {
          // See https://github.com/chaijs/chai/issues/86: this makes
          // `whatever.should = someValue` actually set `someValue`, which is
          // especially useful for `global.should = require('chai').should()`.
          //
          // Note that we have to use [[DefineProperty]] instead of [[Put]]
          // since otherwise we would trigger this very setter!
          Object.defineProperty(this, 'should', {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
          });
        }
      , get: function(){
          if (this instanceof String || this instanceof Number) {
            return new Assertion(this.constructor(this));
          } else if (this instanceof Boolean) {
            return new Assertion(this == true);
          }
          return new Assertion(this);
        }
      , configurable: true
    });

    var should = {};

    should.equal = function (val1, val2) {
      new Assertion(val1).to.equal(val2);
    };

    should.Throw = function (fn, errt, errs) {
      new Assertion(fn).to.Throw(errt, errs);
    };

    should.exist = function (val) {
      new Assertion(val).to.exist;
    }

    // negation
    should.not = {}

    should.not.equal = function (val1, val2) {
      new Assertion(val1).to.not.equal(val2);
    };

    should.not.Throw = function (fn, errt, errs) {
      new Assertion(fn).to.not.Throw(errt, errs);
    };

    should.not.exist = function (val) {
      new Assertion(val).to.not.exist;
    }

    should['throw'] = should['Throw'];
    should.not['throw'] = should.not['Throw'];

    return should;
  };

  chai.should = loadShould;
  chai.Should = loadShould;
};
