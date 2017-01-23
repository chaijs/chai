/*!
 * Chai - addProperty utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

var chai = require('../../chai');
var flag = require('./flag');
var isProxyEnabled = require('./isProxyEnabled');
var transferFlags = require('./transferFlags');

/**
 * ### .addProperty(ctx, name, getter)
 *
 * Adds a property to the prototype of an object.
 *
 *     utils.addProperty(chai.Assertion.prototype, 'foo', function () {
 *       var obj = utils.flag(this, 'object');
 *       new chai.Assertion(obj).to.be.instanceof(Foo);
 *     });
 *
 * Can also be accessed directly from `chai.Assertion`.
 *
 *     chai.Assertion.addProperty('foo', fn);
 *
 * Then can be used as any other assertion.
 *
 *     expect(myFoo).to.be.foo;
 *
 * @param {Object} ctx object to which the property is added
 * @param {String} name of property to add
 * @param {Function} getter function to be used for name
 * @namespace Utils
 * @name addProperty
 * @api public
 */

module.exports = function addProperty(ctx, name, getter) {
  getter = getter === undefined ? new Function() : getter;

  Object.defineProperty(ctx, name,
    { get: function propertyGetter() {
        // If proxy protection is disabled and this assertion hasn't been
        // overwritten, then use this property getter as the starting point for
        // removing implementation frames from the stack trace of a failed
        // assertion.
        //
        // Notes:
        //
        //  - If proxy protection is enabled, then the proxy getter is used as
        //    the starting point instead. This prevents the proxy getter from
        //    showing up in the stack trace since it's invoked before this
        //    property getter.
        //
        //  - If proxy protection is disabled but this assertion has been
        //    overwritten, and thus the `keep_ssfi` flag is set, then the
        //    overwriting property getter is used as the starting point instead.
        //    This prevents the overwriting property getter from showing up in
        //    the stack trace since it's invoked before this property getter.
        if (!isProxyEnabled() && !flag(this, 'keep_ssfi')) {
          flag(this, 'ssfi', propertyGetter);
        }

        var result = getter.call(this);
        if (result !== undefined)
          return result;

        var newAssertion = new chai.Assertion();
        transferFlags(this, newAssertion);
        return newAssertion;
      }
    , configurable: true
  });
};
