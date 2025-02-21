/*!
 * Chai - addMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

import {addLengthGuard} from './addLengthGuard.js';
import {flag} from './flag.js';
import {proxify} from './proxify.js';
import {transferFlags} from './transferFlags.js';
import {Assertion} from '../assertion.js';

/**
 * ### .addMethod(ctx, name, method)
 *
 * Adds a method to the prototype of an object.
 *
 *     utils.addMethod(chai.Assertion.prototype, 'foo', function (str) {
 *         var obj = utils.flag(this, 'object');
 *         new chai.Assertion(obj).to.be.equal(str);
 *     });
 *
 * Can also be accessed directly from `chai.Assertion`.
 *
 *     chai.Assertion.addMethod('foo', fn);
 *
 * Then can be used as any other assertion.
 *
 *     expect(fooStr).to.be.foo('bar');
 *
 * @param {object} ctx object to which the method is added
 * @param {string} name of method to add
 * @param {Function} method function to be used for name
 * @namespace Utils
 * @name addMethod
 * @public
 */
export function addMethod(ctx, name, method) {
  const executeMethod = (thisArg, args) => {
    var result = method.apply(thisArg, args);
    if (result !== undefined) {
      return result;
    }

    var newAssertion = new Assertion();
    transferFlags(thisArg, newAssertion);
    return newAssertion;
  };
  const methodWrapper = function (...args) {
    // Setting the `ssfi` flag to `methodWrapper` causes this function to be the
    // starting point for removing implementation frames from the stack trace of
    // a failed assertion.
    //
    // However, we only want to use this function as the starting point if the
    // `lockSsfi` flag isn't set.
    //
    // If the `lockSsfi` flag is set, then either this assertion has been
    // overwritten by another assertion, or this assertion is being invoked from
    // inside of another assertion. In the first case, the `ssfi` flag has
    // already been set by the overwriting assertion. In the second case, the
    // `ssfi` flag has already been set by the outer assertion.
    if (!flag(this, 'lockSsfi')) {
      flag(this, 'ssfi', methodWrapper);
    }

    if (flag(this, 'isAsync')) {
      // TODO (43081j): this is wrong since we can't chain off a promise
      return (async () => {
        try {
          const obj = await flag(this, 'object');
          flag(this, 'object', obj);
          flag(this, 'isAsync', false);
        } catch (err) {
          this.assert(
            false,
            'expected #{this} to resolve but #{act} was thrown',
            'expected #{this} to reject but it resolved to #{act}',
            undefined,
            err,
          );
        }
        return executeMethod(this, args);
      })();
    }

    return executeMethod(this, args);
  };

  addLengthGuard(methodWrapper, name, false);
  ctx[name] = proxify(methodWrapper, name);
}
