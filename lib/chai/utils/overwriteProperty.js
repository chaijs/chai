/*!
 * Chai - overwriteProperty utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

var chai = require('../../chai');
var flag = require('./flag');
var isProxyEnabled = require('./isProxyEnabled');
var transferFlags = require('./transferFlags');

/**
 * ### .overwriteProperty(ctx, name, fn)
 *
 * Overwites an already existing property getter and provides
 * access to previous value. Must return function to use as getter.
 *
 *     utils.overwriteProperty(chai.Assertion.prototype, 'ok', function (_super) {
 *       return function () {
 *         var obj = utils.flag(this, 'object');
 *         if (obj instanceof Foo) {
 *           new chai.Assertion(obj.name).to.equal('bar');
 *         } else {
 *           _super.call(this);
 *         }
 *       }
 *     });
 *
 *
 * Can also be accessed directly from `chai.Assertion`.
 *
 *     chai.Assertion.overwriteProperty('foo', fn);
 *
 * Then can be used as any other assertion.
 *
 *     expect(myFoo).to.be.ok;
 *
 * @param {Object} ctx object whose property is to be overwritten
 * @param {String} name of property to overwrite
 * @param {Function} getter function that returns a getter function to be used for name
 * @namespace Utils
 * @name overwriteProperty
 * @api public
 */

module.exports = function overwriteProperty(ctx, name, getter) {
  var _get = Object.getOwnPropertyDescriptor(ctx, name)
    , _super = function () {};

  if (_get && 'function' === typeof _get.get)
    _super = _get.get

  Object.defineProperty(ctx, name,
    { get: function overwritingPropertyGetter() {
        // If proxy protection is disabled and this overwriting assertion hasn't
        // been overwritten again by yet another assertion, then use this
        // property getter as the starting point for removing implementation
        // frames from the stack trace of a failed assertion.
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
          flag(this, 'ssfi', overwritingPropertyGetter);
        }

        // The `keep_ssfi` flag is set so that if this assertion ends up calling
        // the overwritten assertion, then the overwritten assertion doesn't
        // attempt to use itself as the starting point for removing
        // implementation frames from the stack trace of a failed assertion.
        flag(this, 'keep_ssfi', true);
        var result = getter(_super).call(this);
        flag(this, 'keep_ssfi', false);

        if (result !== undefined) {
          return result;
        }

        var newAssertion = new chai.Assertion();
        transferFlags(this, newAssertion);
        return newAssertion;
      }
    , configurable: true
  });
};
