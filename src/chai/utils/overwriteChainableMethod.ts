/*!
 * Chai - overwriteChainableMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

import {ChainableBehavior} from './chainableBehavior.js';

/**
 * ### .overwriteChainableMethod(ctx, name, method, chainingBehavior)
 *
 * Overwrites an already existing chainable method
 * and provides access to the previous function or
 * property.  Must return functions to be used for
 * name.
 *
 *     utils.overwriteChainableMethod(chai.Assertion.prototype, 'lengthOf',
 *         function (_super) {
 *         }
 *         , function (_super) {
 *         }
 *     );
 *
 * Can also be accessed directly from `chai.Assertion`.
 *
 *     chai.Assertion.overwriteChainableMethod('foo', fn, fn);
 *
 * Then can be used as any other assertion.
 *
 *     expect(myFoo).to.have.lengthOf(3);
 *     expect(myFoo).to.have.lengthOf.above(3);
 *
 * @param {object} ctx object whose method / property is to be overwritten
 * @param {string} name of method / property to overwrite
 * @param {Function} method function that returns a function to be used for name
 * @param {Function} chainingBehavior function that returns a function to be used for property
 * @param {Function=} createDefaultValue
 * @namespace Utils
 * @name overwriteChainableMethod
 * @public
 */
export function overwriteChainableMethod<T extends object>(
  ctx: T,
  name: string,
  method: Function,
  chainingBehavior: Function,
  createDefaultValue?: (ctx: T) => unknown
) {
  var chainableBehavior = (ctx as {__methods: Record<PropertyKey, ChainableBehavior>}).__methods[name];

  var _chainingBehavior = chainableBehavior.chainingBehavior;
  chainableBehavior.chainingBehavior = function overwritingChainableMethodGetter(this: T) {
    var result = chainingBehavior(_chainingBehavior).call(this);
    if (result !== undefined) {
      return result;
    }

    if (createDefaultValue) {
      return createDefaultValue(this);
    }

    return undefined;
  };

  var _method = chainableBehavior.method;
  chainableBehavior.method = function overwritingChainableMethodWrapper(this: T) {
    var result = method(_method).apply(this, arguments);
    if (result !== undefined) {
      return result;
    }

    if (createDefaultValue) {
      return createDefaultValue(this);
    }

    return undefined;
  };
}
