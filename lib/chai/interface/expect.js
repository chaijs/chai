/*!
 * chai
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

import * as chai from '../../chai.js';
import {Assertion} from '../assertion.js';
import {AssertionError} from 'assertion-error';

/**
 * @param {unknown} val
 * @param {string} message
 * @returns {Assertion}
 */
function expect(val, message) {
  return new Assertion(val, message);
}

export {expect};

/**
 * ### .fail([message])
 * ### .fail(actual, expected, [message], [operator])
 *
 * Throw a failure.
 *
 *     expect.fail();
 *     expect.fail("custom error message");
 *     expect.fail(1, 2);
 *     expect.fail(1, 2, "custom error message");
 *     expect.fail(1, 2, "custom error message", ">");
 *     expect.fail(1, 2, undefined, ">");
 *
 * @name fail
 * @param {unknown=} actual
 * @param {unknown=} expected
 * @param {string=} message
 * @param {string=} operator
 * @returns {never}
 * @namespace expect
 * @public
 */
expect.fail = function (actual, expected, message, operator) {
  let msg = message;
  if (arguments.length < 2) {
    msg = /** @type {string | undefined} */ (actual);
    actual = undefined;
  }

  throw new AssertionError(
    msg || 'expect.fail()',
    {
      actual: actual,
      expected: expected,
      operator: operator
    },
    chai.expect.fail
  );
};
