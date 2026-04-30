/*!
 * Chai - overwriteMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

import {Assertion} from '../assertion.js';
import {addLengthGuard} from './addLengthGuard.js';
import {flag} from './flag.js';
import {proxify} from './proxify.js';
import {transferFlags} from './transferFlags.js';

/**
 * ### .overwriteMethod(ctx, name, fn)
 *
 * Overwrites an already existing method and provides
 * access to previous function. Must return function
 * to be used for name.
 *
 *     utils.overwriteMethod(chai.Assertion.prototype, 'equal', function (_super) {
 *         return function (str) {
 *             var obj = utils.flag(this, 'object');
 *             if (obj instanceof Foo) {
 *                 new chai.Assertion(obj.value).to.equal(str);
 *             } else {
 *                 _super.apply(this, arguments);
 *             }
 *         }
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
 * @template {object} T
 * @param {object} ctx object whose method is to be overwritten
 * @param {PropertyKey} name of method to overwrite
 * @param {Function} method function that returns a function to be used for name
 * @namespace Utils
 * @name overwriteMethod
 * @public
 */
export function overwriteMethod(ctx, name, method) {
  let _method = /** @type {Record<PropertyKey, unknown>} */ (ctx)[name];
  /** @type {Function} */
  let _super = function () {
    throw new Error(String(name) + ' is not a function');
  };

  if (_method && 'function' === typeof _method) _super = _method;

  /**
   * @this {T}
   */
  function overwritingMethodWrapper() {
    // Setting the `ssfi` flag to `overwritingMethodWrapper` causes this
    // function to be the starting point for removing implementation frames from
    // the stack trace of a failed assertion.
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
      flag(this, 'ssfi', overwritingMethodWrapper);
    }

    // Setting the `lockSsfi` flag to `true` prevents the overwritten assertion
    // from changing the `ssfi` flag. By this point, the `ssfi` flag is already
    // set to the correct starting point for this assertion.
    let origLockSsfi = flag(this, 'lockSsfi');
    flag(this, 'lockSsfi', true);
    let result = method(_super).apply(this, arguments);
    flag(this, 'lockSsfi', origLockSsfi);

    if (result !== undefined) {
      return result;
    }

    let newAssertion = new Assertion();
    transferFlags(this, newAssertion);
    return newAssertion;
  }

  addLengthGuard(overwritingMethodWrapper, String(name), false);
  /** @type {Record<PropertyKey, unknown>} */ (ctx)[name] = proxify(
    overwritingMethodWrapper,
    name
  );
}
