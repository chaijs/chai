/*!
 * Chai - overwriteChainableMethod utility
 * Copyright(c) 2012-2013 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

var addChainableMethod = require('./addChainableMethod');

/**
 * ### overwriteChainableMethod (ctx, name, fn)
 *
 * Overwites an already existing chainable method
 * and provides access to the previous function or
 * property.  Must return functions to be used for
 * name.
 *
 *     utils.overwriteChainableMethod(chai.Assertion.prototype, 'length',
 *       function (_super) {
 *       }
 *     , function (_super) {
 *       }
 *     );
 *
 * Can also be accessed directly from `chai.Assertion`.
 *
 *     chai.Assertion.overwriteChainableMethod('foo', fn, fn);
 *
 * Then can be used as any other assertion.
 *
 *     expect(myFoo).to.have.length(3);
 *     expect(myFoo).to.have.length.above(3);
 *
 * @param {Object} ctx object whose method / property is to be overwritten
 * @param {String} name of method / property to overwrite
 * @param {Function} method function that returns a function to be used for name
 * @param {Function} chainingBehavior function that returns a function to be used for property
 * @name overwriteChainableMethod
 * @api public
 */

module.exports = function (ctx, name, method, chainingBehavior) {
  var index = 0;
  var chainableMethods = addChainableMethod.methods[name];

  // doing a brute-force sequential search for the reference to the object in
  // question, so we can get its original method and chaining behavior.  yep.
  // there is a danger of this running very slowly (O of n), but it's difficult
  // for me to imagine n ever getting longer than, well, 1.
  while(index < chainableMethods.length) {
    if (chainableMethods[index].ctx === ctx) break;
    ++index;
  }

  var _chainingBehavior = chainableMethods[index].chainingBehavior;
  chainableMethods[index].chainingBehavior = function () {
    var result = chainingBehavior(_chainingBehavior).call(this);
    return result === undefined ? this : result;
  };

  var _method = chainableMethods[index].method;
  chainableMethods[index].method = function () {
    var result = method(_method).apply(this, arguments);
    return result === undefined ? this : result;
  };
};
