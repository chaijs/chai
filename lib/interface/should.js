/*!
 * chai
 * Copyright(c) 2011 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

module.exports = function (chai) {
  var Assertion = chai.Assertion;

  chai.should = function () {
    // modify Object.prototype to have `should`
    Object.defineProperty(Object.prototype, 'should', {
      set: function(){},
      get: function(){
        if (this instanceof String || this instanceof Number) {
          return new Assertion(this.constructor(this));
        } else if (this instanceof Boolean) {
          return new Assertion(this == true);
        }
        return new Assertion(this);
      },
      configurable: true
    });

    var should = {};

    should.equal = function (val1, val2) {
      new Assertion(val1).to.equal(val2);
    };

    should.throw = function (fn, errt, errs) {
      new Assertion(fn).to.throw(errt, errs);
    };

    should.exist = function (val) {
      new Assertion(val).to.exist;
    }

    // negation
    should.not = {}

    should.not.equal = function (val1, val2) {
      new Assertion(val1).to.not.equal(val2);
    };

    should.not.throw = function (fn, errt, errs) {
      new Assertion(fn).to.not.throw(errt, errs);
    };

    should.not.exist = function (val) {
      new Assertion(val).to.not.exist;
    }

    return should;
  };
};
