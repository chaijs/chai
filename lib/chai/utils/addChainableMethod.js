/*!
 * Chai - addChainingMethod utility
 * Copyright(c) 2012 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Module dependencies
 */

var transferFlags = require('./transferFlags');

/**
 * ### addChainableMethod (ctx, name, method, chainingBehavior)
 *
 * Adds a method to an object, such that the method can also be chained.
 *
 *     utils.addChainableMethod(chai.Assertion.prototype, 'foo', function (str) {
 *       var obj = utils.flag(this, 'object');
 *       new chai.Assertion(obj).to.be.equal(str);
 *     });
 *
 * Can also be accessed directly from `chai.Assertion`.
 *
 *     chai.Assertion.addChainableMethod('foo', fn, chainingBehavior);
 *
 * The result can then be used as both a method assertion, executing both `method` and
 * `chainingBehavior`, or as a language chain, which only executes `chainingBehavior`.
 *
 *     expect(fooStr).to.be.foo('bar');
 *     expect(fooStr).to.be.foo.equal('foo');
 *
 * @param {Object} ctx object to which the method is added
 * @param {String} name of method to add
 * @param {Function} method function to be used for `name`, when called
 * @param {Function} chainingBehavior function to be called every time the property is accessed
 * @name addChainableMethod
 * @api public
 */

module.exports = function (ctx, name, method, chainingBehavior) {
  if (typeof chainingBehavior !== 'function')
    chainingBehavior = function () { };

  // This method will need to add properties to a function.
  // However, some Function.prototype methods cannot be overwritten,
  // and there seems no easy cross-platform way to detect them (@see chaijs/chai/issues/69).
  var excludeNames = /^(?:length|name|arguments|caller)$/;

  Object.defineProperty(ctx, name,
    { get: function () {
        chainingBehavior.call(this);

        var assert = function () {
          var result = method.apply(this, arguments);
          return result === undefined ? this : result;
        };

        // Re-enumerate every time to better accomodate plugins.
        var asserterNames = Object.getOwnPropertyNames(ctx);
        asserterNames.forEach(function (asserterName) {
          if (!excludeNames.test(asserterName)) {
            var pd = Object.getOwnPropertyDescriptor(ctx, asserterName);
            Object.defineProperty(assert, asserterName, pd);
          }
        });

        transferFlags(this, assert);
        return assert;
      }
    , configurable: true
  });
};
