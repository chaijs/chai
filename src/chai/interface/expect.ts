/*!
 * chai
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

import * as chai from '../../chai.js';
import {Assertion} from '../assertion.js';
import {AssertionError} from 'assertion-error';

export interface ExpectInterface {
  (val: unknown, message?: string): Assertion;
  fail(actual: unknown, expected: unknown, message: string, operator: string): void;
}

const expect: ExpectInterface = function expect(val: unknown, message?: string): Assertion {
  return Assertion.create(val, message);
} as ExpectInterface;

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
 * @param {Mixed} actual
 * @param {Mixed} expected
 * @param {String} message
 * @param {String} operator
 * @namespace BDD
 * @api public
 */

function expectFail(
  message?: string
): void;
function expectFail(
  actual: unknown,
  expected: unknown,
  message?: string,
  operator?: string
): void;
function expectFail(
  actualOrMessage?: unknown,
  expected?: unknown,
  message?: string,
  operator?: string
): void {
  let msg: string | undefined;
  let actual;

  if (arguments.length < 2) {
    msg = actualOrMessage as string | undefined;
    actual = undefined;
  } else {
    msg = message;
    actual = actualOrMessage;
  }

  msg = msg || 'expect.fail()';
  throw new AssertionError(msg, {
      actual: actual
    , expected: expected
    , operator: operator
  }, chai.expect.fail);
};

expect.fail = expectFail;
