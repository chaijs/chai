/*!
 * Chai - overwriteMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

var addLengthGuard = require('./addLengthGuard');
var chai = require('../../chai');
var flag = require('./flag');
var proxify = require('./proxify');
var transferFlags = require('./transferFlags');

/**
 * ### .overwriteMethod(ctx, name, fn)
 *
 * Overwites an already existing method and provides
 * access to previous function. Must return function
 * to be used for name.
 *
 *     utils.overwriteMethod(chai.Assertion.prototype, 'equal', function (_super) {
 *       return function (str) {
 *         var obj = utils.flag(this, 'object');
 *         if (obj instanceof Foo) {
 *           new chai.Assertion(obj.value).to.equal(str);
 *         } else {
 *           _super.apply(this, arguments);
 *         }
 *       }
 *     });
 *
 * Can also be accessed directly from `chai.Assertion`.
 *
 *     chai.Assertion.overwriteMethod('foo', fn);
 *
 * Then can be used as any other assertion.
 *
 *     expect(myFoo).to.equal('bar');
 *
 * @param {Object} ctx object whose method is to be overwritten
 * @param {String} name of method to overwrite
 * @param {Function} method function that returns a function to be used for name
 * @namespace Utils
 * @name overwriteMethod
 * @api public
 */

module.exports = function overwriteMethod(ctx, name, method) {
  var _method = ctx[name]
    , _super = function () {
      throw new Error(name + ' is not a function');
    };

  if (_method && 'function' === typeof _method)
    _super = _method;

  var overwritingMethodWrapper = function () {
    // If proxy protection is disabled and this overwriting assertion hasn't
    // been overwritten again by yet another assertion, then use this method
    // wrapper as the starting point for removing implementation frames from the
    // stack trace of a failed assertion.
    //
    // Note: If this assertion has been overwritten, and thus the `keep_ssfi`
    // flag is set, then the overwriting method wrapper is used as the starting
    // point instead. This prevents the overwriting method wrapper from showing
    // up in the stack trace since it's invoked before this method wrapper.
    if (!flag(this, 'keep_ssfi')) {
      flag(this, 'ssfi', overwritingMethodWrapper);
    }

    // The `keep_ssfi` flag is set so that if this assertion ends up calling
    // the overwritten assertion, then the overwritten assertion doesn't attempt
    // to use itself as the starting point for removing implementation frames
    // from the stack trace of a failed assertion.
    flag(this, 'keep_ssfi', true);
    var result = method(_super).apply(this, arguments);
    flag(this, 'keep_ssfi', false);

    if (result !== undefined) {
      return result;
    }

    var newAssertion = new chai.Assertion();
    transferFlags(this, newAssertion);
    return newAssertion;
  }

  addLengthGuard(overwritingMethodWrapper, name, false);
  ctx[name] = proxify(overwritingMethodWrapper, name);
};
