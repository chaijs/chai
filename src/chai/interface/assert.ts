/*!
 * chai
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

import {Assertion} from '../assertion.js';
import {flag, inspect} from '../utils/index.js';
import {AssertionError} from 'assertion-error';
import {
  Constructor,
  LengthLike,
  CollectionLike,
  KeyedObject
} from '../utils/types.js';

export interface AssertInterface {
  (expr: unknown, msg?: string): void;
  fail(msg?: string): void;
  fail<T>(actual: T, expected: T, message: string, operator: string): void;
  isOk(val: unknown, msg?: string): void;
  ok(val: unknown, msg?: string): void;
  isNotOk(val: unknown, msg?: string): void;
  notOk(val: unknown, msg?: string): void;
  equal<T>(actual: T, expected: T, msg?: string): void;
  notEqual<T>(actual: T, expected: T, msg?: string): void;
  strictEqual<T>(actual: T, expected: T, msg?: string): void;
  notStrictEqual<T>(actual: T, expected: T, msg?: string): void;
  deepEqual<T>(actual: T, expected: T, msg?: string): void;
  deepStrictEqual<T>(actual: T, expected: T, msg?: string): void;
  notDeepEqual<T>(actual: T, expected: T, msg?: string): void;
  isAbove<T extends Date | number>(val: T, abv: T, msg?: string): void;
  isAtLeast<T extends Date | number>(val: T, atlst: T, msg?: string): void;
  isBelow<T extends Date | number>(val: T, blw: T, msg?: string): void;
  isAtMost<T extends Date | number>(val: T, atmst: T, msg?: string): void;
  isTrue(val: unknown, msg?: string): void;
  isNotTrue(val: unknown, msg?: string): void;
  isFalse(val: unknown, msg?: string): void;
  isNotFalse(val: unknown, msg?: string): void;
  isNull(val: unknown, msg?: string): void;
  isNotNull(val: unknown, msg?: string): void;
  isNaN(val: unknown, msg?: string): void;
  isNotNaN(val: unknown, msg?: string): void;
  exists(val: unknown, msg?: string): void;
  notExists(val: unknown, msg?: string): void;
  isUndefined(val: unknown, msg?: string): void;
  isDefined(val: unknown, msg?: string): void;
  isFunction(val: unknown, msg?: string): void;
  isNotFunction(val: unknown, msg?: string): void;
  isObject(val: unknown, msg?: string): void;
  isNotObject(val: unknown, msg?: string): void;
  isArray(val: unknown, msg?: string): void;
  isNotArray(val: unknown, msg?: string): void;
  isString(val: unknown, msg?: string): void;
  isNotString(val: unknown, msg?: string): void;
  isNumber(val: unknown, msg?: string): void;
  isNotNumber(val: unknown, msg?: string): void;
  isNumeric(val: unknown, msg?: string): void;
  isNotNumeric(val: unknown, msg?: string): void;
  isFinite(val: number, msg?: string): void;
  isBoolean(val: unknown, msg?: string): void;
  isNotBoolean(val: unknown, msg?: string): void;
  typeOf(val: unknown, type: string, msg?: string): void;
  notTypeOf(val: unknown, type: string, msg?: string): void;
  instanceOf<T>(val: T, type: Constructor<T>, msg?: string): void;
  notInstanceOf(val: object, type: Constructor<unknown>, msg?: string): void;
  include(expr: CollectionLike<unknown> | string | object, inc: unknown, msg?: string): void;
  notInclude(expr: CollectionLike<unknown> | string | object, inc: unknown, msg?: string): void;
  deepInclude(expr: CollectionLike<unknown> | string | object, inc: unknown, msg?: string): void;
  notDeepInclude(expr: CollectionLike<unknown> | string | object, inc: unknown, msg?: string): void;
  nestedInclude(expr: CollectionLike<unknown> | object, inc: unknown, msg?: string): void;
  notNestedInclude(expr: CollectionLike<unknown> | object, inc: unknown, msg?: string): void;
  deepNestedInclude(expr: CollectionLike<unknown> | object, inc: unknown, msg?: string): void;
  notDeepNestedInclude(expr: CollectionLike<unknown> | object, inc: unknown, msg?: string): void;
  ownInclude(expr: object, inc: unknown, msg?: string): void;
  notOwnInclude(expr: object, inc: unknown, msg?: string): void;
  deepOwnInclude(expr: object, inc: unknown, msg?: string): void;
  notDeepOwnInclude(expr: object, inc: unknown, msg?: string): void;
  match(expr: string, re: RegExp, msg?: string): void;
  notMatch(expr: string, re: RegExp, msg?: string): void;
  property(obj: object, prop: PropertyKey, msg?: string): void;
  notProperty(obj: object, prop: PropertyKey, msg?: string): void;
  propertyVal<T extends object, TKey extends keyof T>(obj: T, prop: TKey, val: T[TKey], msg?: string): void;
  notPropertyVal<T extends object, TKey extends keyof T>(obj: T, prop: TKey, val: T[TKey], msg?: string): void;
  deepPropertyVal<T extends object, TKey extends keyof T>(obj: T, prop: TKey, val: T[TKey], msg?: string): void;
  notDeepPropertyVal<T extends object, TKey extends keyof T>(obj: T, prop: TKey, val: T[TKey], msg?: string): void;
  ownProperty(obj: object, prop: PropertyKey, msg?: string): void;
  notOwnProperty(obj: unknown, prop: PropertyKey, msg?: string): void;
  ownPropertyVal<T extends object, TKey extends keyof T>(obj: T, prop: TKey, val: T[TKey], msg?: string): void;
  notOwnPropertyVal<T extends object, TKey extends keyof T>(obj: T, prop: TKey, val: T[TKey], msg?: string): void;
  deepOwnPropertyVal<T extends object, TKey extends keyof T>(obj: T, prop: TKey, val: T[TKey], msg?: string): void;
  notDeepOwnPropertyVal<T extends object, TKey extends keyof T>(obj: T, prop: TKey, val: T[TKey], msg?: string): void;
  nestedProperty(obj: unknown, prop: string, msg?: string): void;
  notNestedProperty(obj: unknown, prop: string, msg?: string): void;
  nestedPropertyVal(obj: unknown, prop: string, val: unknown, msg?: string): void;
  notNestedPropertyVal(obj: unknown, prop: string, val: unknown, msg?: string): void;
  deepNestedPropertyVal(obj: unknown, prop: string, val: unknown, msg?: string): void;
  notDeepNestedPropertyVal(obj: unknown, prop: string, val: unknown, msg?: string): void;
  lengthOf(expr: LengthLike, len: number, msg?: string): void;
  hasAnyKeys(obj: KeyedObject, keys: Array<PropertyKey> | Record<PropertyKey, unknown>, msg?: string): void;
  hasAllKeys(obj: KeyedObject, keys: Array<PropertyKey> | Record<PropertyKey, unknown>, msg?: string): void;
  containsAllKeys(obj: KeyedObject, keys: Array<PropertyKey> | Record<PropertyKey, unknown>, msg?: string): void;
  doesNotHaveAnyKeys(obj: KeyedObject, keys: Array<PropertyKey> | Record<PropertyKey, unknown>, msg?: string): void;
  doesNotHaveAllKeys(obj: KeyedObject, keys: Array<PropertyKey> | Record<PropertyKey, unknown>, msg?: string): void;
  hasAnyDeepKeys(obj: KeyedObject, keys: Array<PropertyKey> | Record<PropertyKey, unknown>, msg?: string): void;
  hasAllDeepKeys(obj: KeyedObject, keys: Array<PropertyKey> | Record<PropertyKey, unknown>, msg?: string): void;
  containsAllDeepKeys(obj: KeyedObject, keys: Array<PropertyKey> | Record<PropertyKey, unknown>, msg?: string): void;
  doesNotHaveAnyDeepKeys(obj: KeyedObject, keys: Array<PropertyKey> | Record<PropertyKey, unknown>, msg?: string): void;
  doesNotHaveAllDeepKeys(obj: KeyedObject, keys: Array<PropertyKey> | Record<PropertyKey, unknown>, msg?: string): void;

  Throw(
    fn: Function,
    errorLike: Error | Constructor<Error>,
    errMsgMatcher: RegExp | string,
    msg?: string
  ): void;
  Throw(
    fn: Function,
    errMsgMatcher: RegExp | string
  ): void;
  throw(
    fn: Function,
    errorLike: Error | Constructor<Error>,
    errMsgMatcher: RegExp | string,
    msg?: string
  ): void;
  throw(
    fn: Function,
    errMsgMatcher: RegExp | string
  ): void;
  throws(
    fn: Function,
    errorLike: Error | Constructor<Error>,
    errMsgMatcher: RegExp | string,
    msg?: string
  ): void;
  throws(
    fn: Function,
    errMsgMatcher: RegExp | string
  ): void;

  doesNotThrow(
    fn: Function,
    errMsgMatcher: RegExp | string
  ): void;
  doesNotThrow(
    fn: Function,
    errorLike: Error | Constructor<Error>,
    errMsgMatcher: RegExp | string,
    msg?: string
  ): void;

  operator<T>(val: T, operator: string, val2: T, msg?: string): void;
  closeTo(actual: number, expected: number, delta: number, msg?: string): void;
  approximately(actual: number, expected: number, delta: number, msg?: string): void;
  sameMembers<T>(set1: T[], set2: T[], msg?: string): void;
  notSameMembers<T>(set1: T[], set2: T[], msg?: string): void;
  sameDeepMembers<T>(set1: T[], set2: T[], msg?: string): void;
  notSameDeepMembers<T>(set1: T[], set2: T[], msg?: string): void;
  sameOrderedMembers<T>(set1: T[], set2: T[], msg?: string): void;
  notSameOrderedMembers<T>(set1: T[], set2: T[], msg?: string): void;
  sameDeepOrderedMembers<T>(set1: T[], set2: T[], msg?: string): void;
  notSameDeepOrderedMembers<T>(set1: T[], set2: T[], msg?: string): void;
  includeMembers<T>(superset: T[], subset: T[], msg?: string): void;
  notIncludeMembers<T>(superset: T[], subset: T[], msg?: string): void;
  includeDeepMembers<T>(superset: T[], subset: T[], msg?: string): void;
  notIncludeDeepMembers<T>(superset: T[], subset: T[], msg?: string): void;
  includeOrderedMembers<T>(superset: T[], subset: T[], msg?: string): void;
  notIncludeOrderedMembers<T>(superset: T[], subset: T[], msg?: string): void;
  includeDeepOrderedMembers<T>(superset: T[], subset: T[], msg?: string): void;
  notIncludeDeepOrderedMembers<T>(superset: T[], subset: T[], msg?: string): void;
  oneOf<T extends string | unknown[]>(inList: T, list: T[], msg?: string): void;

  changes<T>(
    fn: Function,
    obj: T,
    prop: keyof T,
    msg?: string
  ): void;
  changes(
    fn: Function,
    obj: () => void,
    msg?: string
  ): void;

  changesBy<T>(
    fn: Function,
    obj: T,
    prop: keyof T,
    delta: number,
    msg?: string
  ): void;
  changesBy(
    fn: Function,
    obj: () => void,
    delta: number,
    msg?: string
  ): void;

  doesNotChange<T>(
    fn: Function,
    obj: T,
    prop: keyof T,
    msg?: string
  ): Assertion<Function>;
  doesNotChange(
    fn: Function,
    obj: () => void,
    msg?: string
  ): Assertion<Function>;

  changesButNotBy<T>(
    fn: Function,
    obj: T,
    prop: keyof T,
    delta: number,
    msg?: string
  ): void;
  changesButNotBy(
    fn: Function,
    obj: () => void,
    delta: number,
    msg?: string
  ): void;

  increases<T>(
    fn: Function,
    obj: T,
    prop: keyof T,
    msg?: string
  ): Assertion<Function>;
  increases(
    fn: Function,
    obj: () => void,
    msg?: string
  ): Assertion<Function>;

  increasesBy<T>(
    fn: Function,
    obj: T,
    prop: keyof T,
    delta: number,
    msg?: string
  ): void;
  increasesBy(
    fn: Function,
    obj: () => void,
    delta: number,
    msg?: string
  ): void;

  doesNotIncrease<T>(
    fn: Function,
    obj: T,
    prop: keyof T,
    msg?: string
  ): Assertion<Function>;
  doesNotIncrease(
    fn: Function,
    obj: () => void,
    msg?: string
  ): Assertion<Function>;

  increasesButNotBy<T>(
    fn: Function,
    obj: T,
    prop: keyof T,
    delta: number,
    msg?: string
  ): void;
  increasesButNotBy(
    fn: Function,
    obj: () => void,
    delta: number,
    msg?: string
  ): void;

  decreases<T>(
    fn: Function,
    obj: T,
    prop: keyof T,
    msg?: string
  ): Assertion<Function>;
  decreases(
    fn: Function,
    obj: () => void,
    msg?: string
  ): Assertion<Function>;

  decreasesBy<T>(
    fn: Function,
    obj: T,
    prop: keyof T,
    delta: number,
    msg?: string
  ): void;
  decreasesBy(
    fn: Function,
    obj: () => void,
    delta: number,
    msg?: string
  ): void;

  doesNotDecrease<T>(
    fn: Function,
    obj: T,
    prop: keyof T,
    msg?: string
  ): Assertion<Function>;
  doesNotDecrease(
    fn: Function,
    obj: () => void,
    msg?: string
  ): Assertion<Function>;

  doesNotDecreaseBy<T>(
    fn: Function,
    obj: T,
    prop: keyof T,
    delta: number,
    msg?: string
  ): Assertion<Function>;
  doesNotDecreaseBy(
    fn: Function,
    obj: () => void,
    delta: number,
    msg?: string
  ): Assertion<Function>;

  decreasesButNotBy<T>(
    fn: Function,
    obj: T,
    prop: keyof T,
    delta: number,
    msg?: string
  ): void;
  decreasesButNotBy(
    fn: Function,
    obj: () => void,
    delta: number,
    msg?: string
  ): void;

  ifError(val: unknown): void;
  isExtensible(obj: object, msg?: string): void;
  extensible(obj: object, msg?: string): void;
  isNotExtensible(obj: object, msg?: string): void;
  notExtensible(obj: object, msg?: string): void;
  isSealed(obj: object, msg?: string): void;
  sealed(obj: object, msg?: string): void;
  isNotSealed(obj: object, msg?: string): void;
  notSealed(obj: object, msg?: string): void;
  isFrozen(obj: object, msg?: string): void;
  frozen(obj: object, msg?: string): void;
  isNotFrozen(obj: object, msg?: string): void;
  notFrozen(obj: object, msg?: string): void;
  isEmpty(val: unknown, msg?: string): void;
  empty(val: unknown, msg?: string): void;
  isNotEmpty(val: unknown, msg?: string): void;
  notEmpty(val: unknown, msg?: string): void;

  isCallable(val: unknown, msg?: string): void;
  isNotCallable(val: unknown, msg?: string): void;
  isIterable(val: unknown, msg?: string): void;
}

/**
 * ### assert(expression, message)
 *
 * Write your own test expressions.
 *
 *     assert('foo' !== 'bar', 'foo is not bar');
 *     assert(Array.isArray([]), 'empty arrays are arrays');
 *
 * @param {unknown} express - expression to test for truthiness
 * @param {string} errmsg - message to display on error
 * @name assert
 * @namespace Assert
 * @public
 */
export const assert: AssertInterface = function assert(express: unknown, errmsg?: string) {
  var test = Assertion.create(null, null, assert, true);
  test.assert(
      express
    , errmsg
    , '[ negation message unavailable ]'
  );
} as AssertInterface;

/**
 * ### .fail([message])
 * ### .fail(actual, expected, [message], [operator])
 *
 * Throw a failure. Node.js `assert` module-compatible.
 *
 *     assert.fail();
 *     assert.fail("custom error message");
 *     assert.fail(1, 2);
 *     assert.fail(1, 2, "custom error message");
 *     assert.fail(1, 2, "custom error message", ">");
 *     assert.fail(1, 2, undefined, ">");
 *
 * @name fail
 * @param {unknown} actual
 * @param {unknown} expected
 * @param {string} message
 * @param {string} operator
 * @namespace Assert
 * @public
 */
assert.fail = function fail(
  actualOrMsg?: unknown,
  expected?: unknown,
  message?: string,
  operator?: string
) {
  let msg = message;
  let actual = actualOrMsg;

  if (arguments.length < 2) {
      // Comply with Node's fail([message]) interface

      msg = actualOrMsg as string;
      actual = undefined;
  }

  msg = msg || 'assert.fail()';
  throw new AssertionError(msg, {
      actual: actual
    , expected: expected
    , operator: operator
  }, assert.fail);
};

/**
 * ### .isOk(object, [message])
 *
 * Asserts that `object` is truthy.
 *
 *     assert.isOk('everything', 'everything is ok');
 *     assert.isOk(false, 'this will fail');
 *
 * @name isOk
 * @alias ok
 * @param {unknown} val object to test
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.isOk = assert.ok = function (val: unknown, msg?: string) {
  Assertion.create(val, msg, assert.isOk, true).is.ok;
};

/**
 * ### .isNotOk(object, [message])
 *
 * Asserts that `object` is falsy.
 *
 *     assert.isNotOk('everything', 'this will fail');
 *     assert.isNotOk(false, 'this will pass');
 *
 * @name isNotOk
 * @alias notOk
 * @param {unknown} val object to test
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.isNotOk = assert.notOk = function (val: unknown, msg?: string) {
  Assertion.create(val, msg, assert.isNotOk, true).is.not.ok;
};

/**
 * ### .equal(actual, expected, [message])
 *
 * Asserts non-strict equality (`==`) of `actual` and `expected`.
 *
 *     assert.equal(3, '3', '== coerces values to strings');
 *
 * @name equal
 * @param {unknown} act
 * @param {unknown} exp
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.equal = function (act: unknown, exp: unknown, msg?: string) {
  var test = Assertion.create(act, msg, assert.equal, true);

  test.assert(
      exp == flag(test, 'object')
    , 'expected #{this} to equal #{exp}'
    , 'expected #{this} to not equal #{act}'
    , exp
    , act
    , true
  );
};

/**
 * ### .notEqual(actual, expected, [message])
 *
 * Asserts non-strict inequality (`!=`) of `actual` and `expected`.
 *
 *     assert.notEqual(3, 4, 'these numbers are not equal');
 *
 * @name notEqual
 * @param {unknown} act
 * @param {unknown} exp
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.notEqual = function (act: unknown, exp: unknown, msg?: string) {
  var test = Assertion.create(act, msg, assert.notEqual, true);

  test.assert(
      exp != flag(test, 'object')
    , 'expected #{this} to not equal #{exp}'
    , 'expected #{this} to equal #{act}'
    , exp
    , act
    , true
  );
};

/**
 * ### .strictEqual(actual, expected, [message])
 *
 * Asserts strict equality (`===`) of `actual` and `expected`.
 *
 *     assert.strictEqual(true, true, 'these booleans are strictly equal');
 *
 * @name strictEqual
 * @param {unknown} act
 * @param {unknown} exp
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.strictEqual = function (act: unknown, exp: unknown, msg?: string) {
  Assertion.create(act, msg, assert.strictEqual, true).to.equal(exp);
};

/**
 * ### .notStrictEqual(actual, expected, [message])
 *
 * Asserts strict inequality (`!==`) of `actual` and `expected`.
 *
 *     assert.notStrictEqual(3, '3', 'no coercion for strict equality');
 *
 * @name notStrictEqual
 * @param {unknown} act
 * @param {unknown} exp
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.notStrictEqual = function (act: unknown, exp: unknown, msg?: string) {
  Assertion.create(act, msg, assert.notStrictEqual, true).to.not.equal(exp);
};

/**
 * ### .deepEqual(actual, expected, [message])
 *
 * Asserts that `actual` is deeply equal to `expected`.
 *
 *     assert.deepEqual({ tea: 'green' }, { tea: 'green' });
 *
 * @name deepEqual
 * @param {unknown} act
 * @param {unknown} exp
 * @param {string} msg
 * @alias deepStrictEqual
 * @namespace Assert
 * @public
 */
assert.deepEqual = assert.deepStrictEqual = function (act: unknown, exp: unknown, msg?: string) {
  Assertion.create(act, msg, assert.deepEqual, true).to.eql(exp);
};

/**
 * ### .notDeepEqual(actual, expected, [message])
 *
 * Assert that `actual` is not deeply equal to `expected`.
 *
 *     assert.notDeepEqual({ tea: 'green' }, { tea: 'jasmine' });
 *
 * @name notDeepEqual
 * @param {unknown} act
 * @param {unknown} exp
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.notDeepEqual = function (act: unknown, exp: unknown, msg?: string) {
  Assertion.create(act, msg, assert.notDeepEqual, true).to.not.eql(exp);
};

/**
 * ### .isAbove(valueToCheck, valueToBeAbove, [message])
 *
 * Asserts `valueToCheck` is strictly greater than (>) `valueToBeAbove`.
 *
 *     assert.isAbove(5, 2, '5 is strictly greater than 2');
 *
 * @name isAbove
 * @param {unknown} val
 * @param {unknown} abv
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.isAbove = function isAbove<T extends Date | number>(val: T, abv: T, msg?: string): void {
  Assertion.create(val, msg, assert.isAbove, true).to.be.above(abv);
};

/**
 * ### .isAtLeast(valueToCheck, valueToBeAtLeast, [message])
 *
 * Asserts `valueToCheck` is greater than or equal to (>=) `valueToBeAtLeast`.
 *
 *     assert.isAtLeast(5, 2, '5 is greater or equal to 2');
 *     assert.isAtLeast(3, 3, '3 is greater or equal to 3');
 *
 * @name isAtLeast
 * @param {unknown} val
 * @param {unknown} atlst
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.isAtLeast = function isAtLeast<T extends Date | number>(val: T, atlst: T, msg?: string) {
  Assertion.create(val, msg, assert.isAtLeast, true).to.be.least(atlst);
};

/**
 * ### .isBelow(valueToCheck, valueToBeBelow, [message])
 *
 * Asserts `valueToCheck` is strictly less than (<) `valueToBeBelow`.
 *
 *     assert.isBelow(3, 6, '3 is strictly less than 6');
 *
 * @name isBelow
 * @param {unknown} val
 * @param {unknown} blw
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.isBelow = function isBelow<T extends Date | number>(val: T, blw: T, msg?: string) {
  Assertion.create(val, msg, assert.isBelow, true).to.be.below(blw);
};

/**
 * ### .isAtMost(valueToCheck, valueToBeAtMost, [message])
 *
 * Asserts `valueToCheck` is less than or equal to (<=) `valueToBeAtMost`.
 *
 *     assert.isAtMost(3, 6, '3 is less than or equal to 6');
 *     assert.isAtMost(4, 4, '4 is less than or equal to 4');
 *
 * @name isAtMost
 * @param {unknown} val
 * @param {unknown} atmst
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.isAtMost = function isAtMost<T extends Date | number>(val: T, atmst: T, msg?: string) {
  Assertion.create(val, msg, assert.isAtMost, true).to.be.most(atmst);
};

/**
 * ### .isTrue(value, [message])
 *
 * Asserts that `value` is true.
 *
 *     var teaServed = true;
 *     assert.isTrue(teaServed, 'the tea has been served');
 *
 * @name isTrue
 * @param {unknown} val
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.isTrue = function (val: unknown, msg?: string) {
  Assertion.create(val, msg, assert.isTrue, true).is['true'];
};

/**
 * ### .isNotTrue(value, [message])
 *
 * Asserts that `value` is not true.
 *
 *     var tea = 'tasty chai';
 *     assert.isNotTrue(tea, 'great, time for tea!');
 *
 * @name isNotTrue
 * @param {unknown} val
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.isNotTrue = function (val: unknown, msg?: string) {
  Assertion.create(val, msg, assert.isNotTrue, true).to.not.equal(true);
};

/**
 * ### .isFalse(value, [message])
 *
 * Asserts that `value` is false.
 *
 *     var teaServed = false;
 *     assert.isFalse(teaServed, 'no tea yet? hmm...');
 *
 * @name isFalse
 * @param {unknown} val
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.isFalse = function (val: unknown, msg?: string) {
  Assertion.create(val, msg, assert.isFalse, true).is['false'];
};

/**
 * ### .isNotFalse(value, [message])
 *
 * Asserts that `value` is not false.
 *
 *     var tea = 'tasty chai';
 *     assert.isNotFalse(tea, 'great, time for tea!');
 *
 * @name isNotFalse
 * @param {unknown} val
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.isNotFalse = function (val: unknown, msg?: string) {
  Assertion.create(val, msg, assert.isNotFalse, true).to.not.equal(false);
};

/**
 * ### .isNull(value, [message])
 *
 * Asserts that `value` is null.
 *
 *     assert.isNull(err, 'there was no error');
 *
 * @name isNull
 * @param {unknown} val
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.isNull = function (val: unknown, msg?: string) {
  Assertion.create(val, msg, assert.isNull, true).to.equal(null);
};

/**
 * ### .isNotNull(value, [message])
 *
 * Asserts that `value` is not null.
 *
 *     var tea = 'tasty chai';
 *     assert.isNotNull(tea, 'great, time for tea!');
 *
 * @name isNotNull
 * @param {unknown} val
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.isNotNull = function (val: unknown, msg?: string) {
  Assertion.create(val, msg, assert.isNotNull, true).to.not.equal(null);
};

/**
 * ### .isNaN
 *
 * Asserts that value is NaN.
 *
 *     assert.isNaN(NaN, 'NaN is NaN');
 *
 * @name isNaN
 * @param {unknown} val
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.isNaN = function (val: unknown, msg?: string) {
  Assertion.create(val, msg, assert.isNaN, true).to.be.NaN;
};

/**
 * ### .isNotNaN
 *
 * Asserts that value is not NaN.
 *
 *     assert.isNotNaN(4, '4 is not NaN');
 *
 * @name isNotNaN
 * @param {unknown} val
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.isNotNaN = function (val: unknown, msg?: string) {
  Assertion.create(val, msg, assert.isNotNaN, true).not.to.be.NaN;
};

/**
 * ### .exists
 *
 * Asserts that the target is neither `null` nor `undefined`.
 *
 *     var foo = 'hi';
 *     assert.exists(foo, 'foo is neither `null` nor `undefined`');
 *
 * @name exists
 * @param {unknown} val
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.exists = function (val: unknown, msg?: string) {
  Assertion.create(val, msg, assert.exists, true).to.exist;
};

/**
 * ### .notExists
 *
 * Asserts that the target is either `null` or `undefined`.
 *
 *     var bar = null
 *     , baz;
 *
 *     assert.notExists(bar);
 *     assert.notExists(baz, 'baz is either null or undefined');
 *
 * @name notExists
 * @param {unknown} val
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.notExists = function (val: unknown, msg?: string) {
  Assertion.create(val, msg, assert.notExists, true).to.not.exist;
};

/**
 * ### .isUndefined(value, [message])
 *
 * Asserts that `value` is `undefined`.
 *
 *     var tea;
 *     assert.isUndefined(tea, 'no tea defined');
 *
 * @name isUndefined
 * @param {unknown} val
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.isUndefined = function (val: unknown, msg?: string) {
  Assertion.create(val, msg, assert.isUndefined, true).to.equal(undefined);
};

/**
 * ### .isDefined(value, [message])
 *
 * Asserts that `value` is not `undefined`.
 *
 *     var tea = 'cup of chai';
 *     assert.isDefined(tea, 'tea has been defined');
 *
 * @name isDefined
 * @param {unknown} val
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.isDefined = function (val: unknown, msg?: string) {
  Assertion.create(val, msg, assert.isDefined, true).to.not.equal(undefined);
};

/**
 * ### .isCallable(value, [message])
 *
 * Asserts that `value` is a callable function.
 *
 *     function serveTea() { return 'cup of tea'; };
 *     assert.isCallable(serveTea, 'great, we can have tea now');
 *
 * @name isCallable
 * @param {unknown} value
 * @param {string} message
 * @namespace Assert
 * @public
 */
assert.isCallable = function (value: unknown, message?: string) {
  new Assertion(value, message, assert.isCallable, true).is.callable;
}

assert.isFunction = assert.isCallable;

/**
 * ### .isNotCallable(value, [message])
 *
 * Asserts that `value` is _not_ a callable function.
 *
 *     var serveTea = [ 'heat', 'pour', 'sip' ];
 *     assert.isNotCallable(serveTea, 'great, we have listed the steps');
 *
 * @name isNotCallable
 * @param {unknown} value
 * @param {string} message
 * @namespace Assert
 * @public
 */
assert.isNotCallable = function (value: unknown, message?: string) {
  new Assertion(value, message, assert.isNotCallable, true).is.not.callable;
};

assert.isNotFunction = assert.isNotCallable;

/**
 * ### .isObject(value, [message])
 *
 * Asserts that `value` is an object of type 'Object' (as revealed by `Object.prototype.toString`).
 * _The assertion does not match subclassed objects._
 *
 *     var selection = { name: 'Chai', serve: 'with spices' };
 *     assert.isObject(selection, 'tea selection is an object');
 *
 * @name isObject
 * @param {unknown} val
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.isObject = function (val: unknown, msg?: string) {
  Assertion.create(val, msg, assert.isObject, true).to.be.a('object');
};

/**
 * ### .isNotObject(value, [message])
 *
 * Asserts that `value` is _not_ an object of type 'Object' (as revealed by `Object.prototype.toString`).
 *
 *     var selection = 'chai'
 *     assert.isNotObject(selection, 'tea selection is not an object');
 *     assert.isNotObject(null, 'null is not an object');
 *
 * @name isNotObject
 * @param {unknown} val
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.isNotObject = function (val: unknown, msg?: string) {
  Assertion.create(val, msg, assert.isNotObject, true).to.not.be.a('object');
};

/**
 * ### .isArray(value, [message])
 *
 * Asserts that `value` is an array.
 *
 *     var menu = [ 'green', 'chai', 'oolong' ];
 *     assert.isArray(menu, 'what kind of tea do we want?');
 *
 * @name isArray
 * @param {unknown} val
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.isArray = function (val: unknown, msg?: string) {
  Assertion.create(val, msg, assert.isArray, true).to.be.an('array');
};

/**
 * ### .isNotArray(value, [message])
 *
 * Asserts that `value` is _not_ an array.
 *
 *     var menu = 'green|chai|oolong';
 *     assert.isNotArray(menu, 'what kind of tea do we want?');
 *
 * @name isNotArray
 * @param {unknown} val
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.isNotArray = function (val: unknown, msg?: string) {
  Assertion.create(val, msg, assert.isNotArray, true).to.not.be.an('array');
};

/**
 * ### .isString(value, [message])
 *
 * Asserts that `value` is a string.
 *
 *     var teaOrder = 'chai';
 *     assert.isString(teaOrder, 'order placed');
 *
 * @name isString
 * @param {unknown} val
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.isString = function (val: unknown, msg?: string) {
  Assertion.create(val, msg, assert.isString, true).to.be.a('string');
};

/**
 * ### .isNotString(value, [message])
 *
 * Asserts that `value` is _not_ a string.
 *
 *     var teaOrder = 4;
 *     assert.isNotString(teaOrder, 'order placed');
 *
 * @name isNotString
 * @param {unknown} val
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.isNotString = function (val: unknown, msg?: string) {
  Assertion.create(val, msg, assert.isNotString, true).to.not.be.a('string');
};

/**
 * ### .isNumber(value, [message])
 *
 * Asserts that `value` is a number.
 *
 *     var cups = 2;
 *     assert.isNumber(cups, 'how many cups');
 *
 * @name isNumber
 * @param {number} val
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.isNumber = function (val: number, msg?: string) {
  Assertion.create(val, msg, assert.isNumber, true).to.be.a('number');
};

/**
 * ### .isNotNumber(value, [message])
 *
 * Asserts that `value` is _not_ a number.
 *
 *     var cups = '2 cups please';
 *     assert.isNotNumber(cups, 'how many cups');
 *
 * @name isNotNumber
 * @param {unknown} val
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.isNotNumber = function (val: unknown, msg?: string) {
  new Assertion(val, msg, assert.isNotNumber, true).to.not.be.a('number');
};

/**
 * ### .isNumeric(value, [message])
 *
 * Asserts that `value` is a number or BigInt.
 *
 *     var cups = 2;
 *     assert.isNumeric(cups, 'how many cups');
 * 
 *     var cups = 10n;
 *     assert.isNumeric(cups, 'how many cups');
 *
 * @name isNumeric
 * @param {unknown} val
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.isNumeric = function (val: unknown, msg?: string) {
  new Assertion(val, msg, assert.isNumeric, true).is.numeric;
};

/**
 * ### .isNotNumeric(value, [message])
 *
 * Asserts that `value` is _not_ a number or BigInt.
 *
 *     var cups = '2 cups please';
 *     assert.isNotNumeric(cups, 'how many cups');
 *
 * @name isNotNumeric
 * @param {unknown} val
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.isNotNumeric = function (val: unknown, msg?: string) {
  new Assertion(val, msg, assert.isNotNumeric, true).is.not.numeric;
};

 /**
  * ### .isFinite(value, [message])
  *
  * Asserts that `value` is a finite number. Unlike `.isNumber`, this will fail for `NaN` and `Infinity`.
  *
  *     var cups = 2;
  *     assert.isFinite(cups, 'how many cups');
  *     assert.isFinite(NaN); // throws
  *
  * @name isFinite
  * @param {number} val
  * @param {string} msg
  * @namespace Assert
  * @public
  */
assert.isFinite = function (val: unknown, msg?: string) {
  new Assertion(val, msg, assert.isFinite, true).to.be.finite;
};

/**
 * ### .isBoolean(value, [message])
 *
 * Asserts that `value` is a boolean.
 *
 *     var teaReady = true
 *     , teaServed = false;
 *
 *     assert.isBoolean(teaReady, 'is the tea ready');
 *     assert.isBoolean(teaServed, 'has tea been served');
 *
 * @name isBoolean
 * @param {unknown} val
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.isBoolean = function (val: unknown, msg?: string) {
  Assertion.create(val, msg, assert.isBoolean, true).to.be.a('boolean');
};

/**
 * ### .isNotBoolean(value, [message])
 *
 * Asserts that `value` is _not_ a boolean.
 *
 *     var teaReady = 'yep'
 *     , teaServed = 'nope';
 *
 *     assert.isNotBoolean(teaReady, 'is the tea ready');
 *     assert.isNotBoolean(teaServed, 'has tea been served');
 *
 * @name isNotBoolean
 * @param {unknown} val
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.isNotBoolean = function (val: unknown, msg?: string) {
  Assertion.create(val, msg, assert.isNotBoolean, true).to.not.be.a('boolean');
};

/**
 * ### .typeOf(value, name, [message])
 *
 * Asserts that `value`'s type is `name`, as determined by
 * `Object.prototype.toString`.
 *
 *     assert.typeOf({ tea: 'chai' }, 'object', 'we have an object');
 *     assert.typeOf(['chai', 'jasmine'], 'array', 'we have an array');
 *     assert.typeOf('tea', 'string', 'we have a string');
 *     assert.typeOf(/tea/, 'regexp', 'we have a regular expression');
 *     assert.typeOf(null, 'null', 'we have a null');
 *     assert.typeOf(undefined, 'undefined', 'we have an undefined');
 *
 * @name typeOf
 * @param {unknown} val
 * @param {string} type
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.typeOf = function (val: unknown, type: string, msg?: string) {
  Assertion.create(val, msg, assert.typeOf, true).to.be.a(type);
};

/**
 * ### .notTypeOf(value, name, [message])
 *
 * Asserts that `value`'s type is _not_ `name`, as determined by
 * `Object.prototype.toString`.
 *
 *     assert.notTypeOf('tea', 'number', 'strings are not numbers');
 *
 * @name notTypeOf
 * @param {unknown} val
 * @param {string} type
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.notTypeOf = function (val: unknown, type: string, msg?: string) {
  Assertion.create(val, msg, assert.notTypeOf, true).to.not.be.a(type);
};

/**
 * ### .instanceOf(object, constructor, [message])
 *
 * Asserts that `value` is an instance of `constructor`.
 *
 *     var Tea = function (name) { this.name = name; }
 *     , chai = new Tea('chai');
 *
 *     assert.instanceOf(chai, Tea, 'chai is an instance of tea');
 *
 * @name instanceOf
 * @param {object} val
 * @param {object} type
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.instanceOf = function instanceOf<T>(val: T, type: Constructor<T>, msg?: string) {
  Assertion.create(val, msg, assert.instanceOf, true).to.be.instanceOf(type);
};

/**
 * ### .notInstanceOf(object, constructor, [message])
 *
 * Asserts `value` is not an instance of `constructor`.
 *
 *     var Tea = function (name) { this.name = name; }
 *     , chai = new String('chai');
 *
 *     assert.notInstanceOf(chai, Tea, 'chai is not an instance of tea');
 *
 * @name notInstanceOf
 * @param {object} val
 * @param {object} type
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.notInstanceOf = function (val: object, type: Constructor<unknown>, msg?: string) {
  Assertion.create(val, msg, assert.notInstanceOf, true)
    .to.not.be.instanceOf(type);
};

/**
 * ### .include(haystack, needle, [message])
 *
 * Asserts that `haystack` includes `needle`. Can be used to assert the
 * inclusion of a value in an array, a substring in a string, or a subset of
 * properties in an object.
 *
 *     assert.include([1,2,3], 2, 'array contains value');
 *     assert.include('foobar', 'foo', 'string contains substring');
 *     assert.include({ foo: 'bar', hello: 'universe' }, { foo: 'bar' }, 'object contains property');
 *
 * Strict equality (===) is used. When asserting the inclusion of a value in
 * an array, the array is searched for an element that's strictly equal to the
 * given value. When asserting a subset of properties in an object, the object
 * is searched for the given property keys, checking that each one is present
 * and strictly equal to the given property value. For instance:
 *
 *     var obj1 = {a: 1}
 *     , obj2 = {b: 2};
 *     assert.include([obj1, obj2], obj1);
 *     assert.include({foo: obj1, bar: obj2}, {foo: obj1});
 *     assert.include({foo: obj1, bar: obj2}, {foo: obj1, bar: obj2});
 *
 * @name include
 * @param {Array | string} exp
 * @param {unknown} inc
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.include = function include(
  exp: CollectionLike<never> | string | object,
  inc: unknown,
  msg?: string
) {
  Assertion.create(exp, msg, assert.include, true).include(inc);
};

/**
 * ### .notInclude(haystack, needle, [message])
 *
 * Asserts that `haystack` does not include `needle`. Can be used to assert
 * the absence of a value in an array, a substring in a string, or a subset of
 * properties in an object.
 *
 *     assert.notInclude([1,2,3], 4, "array doesn't contain value");
 *     assert.notInclude('foobar', 'baz', "string doesn't contain substring");
 *     assert.notInclude({ foo: 'bar', hello: 'universe' }, { foo: 'baz' }, 'object doesn't contain property');
 *
 * Strict equality (===) is used. When asserting the absence of a value in an
 * array, the array is searched to confirm the absence of an element that's
 * strictly equal to the given value. When asserting a subset of properties in
 * an object, the object is searched to confirm that at least one of the given
 * property keys is either not present or not strictly equal to the given
 * property value. For instance:
 *
 *     var obj1 = {a: 1}
 *     , obj2 = {b: 2};
 *     assert.notInclude([obj1, obj2], {a: 1});
 *     assert.notInclude({foo: obj1, bar: obj2}, {foo: {a: 1}});
 *     assert.notInclude({foo: obj1, bar: obj2}, {foo: obj1, bar: {b: 2}});
 *
 * @name notInclude
 * @param {Array | string} exp
 * @param {unknown} inc
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.notInclude = function notInclude(exp: CollectionLike<never> | string | object, inc: unknown, msg?: string) {
  Assertion.create(exp, msg, assert.notInclude, true).not.include(inc);
};

/**
 * ### .deepInclude(haystack, needle, [message])
 *
 * Asserts that `haystack` includes `needle`. Can be used to assert the
 * inclusion of a value in an array or a subset of properties in an object.
 * Deep equality is used.
 *
 *     var obj1 = {a: 1}
 *     , obj2 = {b: 2};
 *     assert.deepInclude([obj1, obj2], {a: 1});
 *     assert.deepInclude({foo: obj1, bar: obj2}, {foo: {a: 1}});
 *     assert.deepInclude({foo: obj1, bar: obj2}, {foo: {a: 1}, bar: {b: 2}});
 *
 * @name deepInclude
 * @param {Array | string} exp
 * @param {unknown} inc
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.deepInclude = function deepInclude(exp: CollectionLike<never> | object, inc: unknown, msg?: string) {
  Assertion.create(exp, msg, assert.deepInclude, true).deep.include(inc);
};

/**
 * ### .notDeepInclude(haystack, needle, [message])
 *
 * Asserts that `haystack` does not include `needle`. Can be used to assert
 * the absence of a value in an array or a subset of properties in an object.
 * Deep equality is used.
 *
 *     var obj1 = {a: 1}
 *     , obj2 = {b: 2};
 *     assert.notDeepInclude([obj1, obj2], {a: 9});
 *     assert.notDeepInclude({foo: obj1, bar: obj2}, {foo: {a: 9}});
 *     assert.notDeepInclude({foo: obj1, bar: obj2}, {foo: {a: 1}, bar: {b: 9}});
 *
 * @name notDeepInclude
 * @param {Array | string} exp
 * @param {unknown} inc
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.notDeepInclude = function notDeepInclude(exp: CollectionLike<never> | object, inc: unknown, msg?: string) {
  Assertion.create(exp, msg, assert.notDeepInclude, true).not.deep.include(inc);
};

/**
 * ### .nestedInclude(haystack, needle, [message])
 *
 * Asserts that 'haystack' includes 'needle'.
 * Can be used to assert the inclusion of a subset of properties in an
 * object.
 * Enables the use of dot- and bracket-notation for referencing nested
 * properties.
 * '[]' and '.' in property names can be escaped using double backslashes.
 *
 *     assert.nestedInclude({'.a': {'b': 'x'}}, {'\\.a.[b]': 'x'});
 *     assert.nestedInclude({'a': {'[b]': 'x'}}, {'a.\\[b\\]': 'x'});
 *
 * @name nestedInclude
 * @param {object} exp
 * @param {object} inc
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.nestedInclude = function (exp: CollectionLike<never> | object, inc: unknown, msg?: string) {
  Assertion.create(exp, msg, assert.nestedInclude, true).nested.include(inc);
};

/**
 * ### .notNestedInclude(haystack, needle, [message])
 *
 * Asserts that 'haystack' does not include 'needle'.
 * Can be used to assert the absence of a subset of properties in an
 * object.
 * Enables the use of dot- and bracket-notation for referencing nested
 * properties.
 * '[]' and '.' in property names can be escaped using double backslashes.
 *
 *     assert.notNestedInclude({'.a': {'b': 'x'}}, {'\\.a.b': 'y'});
 *     assert.notNestedInclude({'a': {'[b]': 'x'}}, {'a.\\[b\\]': 'y'});
 *
 * @name notNestedInclude
 * @param {object} exp
 * @param {object} inc
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.notNestedInclude = function (exp: CollectionLike<never> | object, inc: unknown, msg?: string) {
  Assertion.create(exp, msg, assert.notNestedInclude, true)
    .not.nested.include(inc);
};

/**
 * ### .deepNestedInclude(haystack, needle, [message])
 *
 * Asserts that 'haystack' includes 'needle'.
 * Can be used to assert the inclusion of a subset of properties in an
 * object while checking for deep equality.
 * Enables the use of dot- and bracket-notation for referencing nested
 * properties.
 * '[]' and '.' in property names can be escaped using double backslashes.
 *
 *     assert.deepNestedInclude({a: {b: [{x: 1}]}}, {'a.b[0]': {x: 1}});
 *     assert.deepNestedInclude({'.a': {'[b]': {x: 1}}}, {'\\.a.\\[b\\]': {x: 1}});
 *
 * @name deepNestedInclude
 * @param {object} exp
 * @param {object} inc
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.deepNestedInclude = function(exp: CollectionLike<never> | object, inc: unknown, msg?: string) {
  Assertion.create(exp, msg, assert.deepNestedInclude, true)
    .deep.nested.include(inc);
};

/**
 * ### .notDeepNestedInclude(haystack, needle, [message])
 *
 * Asserts that 'haystack' does not include 'needle'.
 * Can be used to assert the absence of a subset of properties in an
 * object while checking for deep equality.
 * Enables the use of dot- and bracket-notation for referencing nested
 * properties.
 * '[]' and '.' in property names can be escaped using double backslashes.
 *
 *     assert.notDeepNestedInclude({a: {b: [{x: 1}]}}, {'a.b[0]': {y: 1}})
 *     assert.notDeepNestedInclude({'.a': {'[b]': {x: 1}}}, {'\\.a.\\[b\\]': {y: 2}});
 *
 * @name notDeepNestedInclude
 * @param {object} exp
 * @param {object} inc
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.notDeepNestedInclude = function(exp: CollectionLike<never> | object, inc: unknown, msg?: string) {
  Assertion.create(exp, msg, assert.notDeepNestedInclude, true)
    .not.deep.nested.include(inc);
};

/**
 * ### .ownInclude(haystack, needle, [message])
 *
 * Asserts that 'haystack' includes 'needle'.
 * Can be used to assert the inclusion of a subset of properties in an
 * object while ignoring inherited properties.
 *
 *     assert.ownInclude({ a: 1 }, { a: 1 });
 *
 * @name ownInclude
 * @param {object} exp
 * @param {object} inc
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.ownInclude = function(exp: object, inc: unknown, msg?: string) {
  Assertion.create(exp, msg, assert.ownInclude, true).own.include(inc);
};

/**
 * ### .notOwnInclude(haystack, needle, [message])
 *
 * Asserts that 'haystack' does not include 'needle'.
 * Can be used to assert the absence of a subset of properties in an
 * object while ignoring inherited properties.
 *
 *     Object.prototype.b = 2;
 *     assert.notOwnInclude({ a: 1 }, { b: 2 });
 *
 * @name notOwnInclude
 * @param {object} exp
 * @param {object} inc
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.notOwnInclude = function(exp: object, inc: unknown, msg?: string) {
  Assertion.create(exp, msg, assert.notOwnInclude, true).not.own.include(inc);
};

/**
 * ### .deepOwnInclude(haystack, needle, [message])
 *
 * Asserts that 'haystack' includes 'needle'.
 * Can be used to assert the inclusion of a subset of properties in an
 * object while ignoring inherited properties and checking for deep equality.
 *
 *     assert.deepOwnInclude({a: {b: 2}}, {a: {b: 2}});
 *
 * @name deepOwnInclude
 * @param {object} exp
 * @param {object} inc
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.deepOwnInclude = function(exp: object, inc: unknown, msg?: string) {
  Assertion.create(exp, msg, assert.deepOwnInclude, true)
    .deep.own.include(inc);
};

/**
 * ### .notDeepOwnInclude(haystack, needle, [message])
 *
 * Asserts that 'haystack' includes 'needle'.
 * Can be used to assert the absence of a subset of properties in an
 * object while ignoring inherited properties and checking for deep equality.
 *
 *     assert.notDeepOwnInclude({a: {b: 2}}, {a: {c: 3}});
 *
 * @name notDeepOwnInclude
 * @param {object} exp
 * @param {object} inc
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.notDeepOwnInclude = function(exp: object, inc: unknown, msg?: string) {
  Assertion.create(exp, msg, assert.notDeepOwnInclude, true)
    .not.deep.own.include(inc);
};

/**
 * ### .match(value, regexp, [message])
 *
 * Asserts that `value` matches the regular expression `regexp`.
 *
 *     assert.match('foobar', /^foo/, 'regexp matches');
 *
 * @name match
 * @param {unknown} exp
 * @param {RegExp} re
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.match = function (exp: string, re: RegExp, msg?: string) {
  Assertion.create(exp, msg, assert.match, true).to.match(re);
};

/**
 * ### .notMatch(value, regexp, [message])
 *
 * Asserts that `value` does not match the regular expression `regexp`.
 *
 *     assert.notMatch('foobar', /^foo/, 'regexp does not match');
 *
 * @name notMatch
 * @param {unknown} exp
 * @param {RegExp} re
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.notMatch = function (exp: string, re: RegExp, msg?: string) {
  Assertion.create(exp, msg, assert.notMatch, true).to.not.match(re);
};

/**
 * ### .property(object, property, [message])
 *
 * Asserts that `object` has a direct or inherited property named by
 * `property`.
 *
 *     assert.property({ tea: { green: 'matcha' }}, 'tea');
 *     assert.property({ tea: { green: 'matcha' }}, 'toString');
 *
 * @name property
 * @param {object} obj
 * @param {string} prop
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.property = function property(obj: object, prop: PropertyKey, msg?: string) {
  Assertion.create(obj, msg, assert.property, true).to.have.property(prop);
};

/**
 * ### .notProperty(object, property, [message])
 *
 * Asserts that `object` does _not_ have a direct or inherited property named
 * by `property`.
 *
 *     assert.notProperty({ tea: { green: 'matcha' }}, 'coffee');
 *
 * @name notProperty
 * @param {object} obj
 * @param {string} prop
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.notProperty = function (obj: object, prop: string, msg?: string) {
  Assertion.create(obj, msg, assert.notProperty, true)
    .to.not.have.property(prop);
};

/**
 * ### .propertyVal(object, property, value, [message])
 *
 * Asserts that `object` has a direct or inherited property named by
 * `property` with a value given by `value`. Uses a strict equality check
 * (===).
 *
 *     assert.propertyVal({ tea: 'is good' }, 'tea', 'is good');
 *
 * @name propertyVal
 * @param {object} obj
 * @param {string} prop
 * @param {unknown} val
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.propertyVal = function propertyVal<T extends object, TKey extends keyof T>(obj: T, prop: TKey, val: T[TKey], msg?: string) {
  Assertion.create(obj, msg, assert.propertyVal, true)
    .to.have.property(prop, val);
};

/**
 * ### .notPropertyVal(object, property, value, [message])
 *
 * Asserts that `object` does _not_ have a direct or inherited property named
 * by `property` with value given by `value`. Uses a strict equality check
 * (===).
 *
 *     assert.notPropertyVal({ tea: 'is good' }, 'tea', 'is bad');
 *     assert.notPropertyVal({ tea: 'is good' }, 'coffee', 'is good');
 *
 * @name notPropertyVal
 * @param {object} obj
 * @param {string} prop
 * @param {unknown} val
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.notPropertyVal = function notPropertyVal<T, TKey extends keyof T>(
  obj: T,
  prop: TKey,
  val: T[TKey],
  msg?: string
) {
  Assertion.create(obj, msg, assert.notPropertyVal, true)
    .to.not.have.property(prop, val);
};

/**
 * ### .deepPropertyVal(object, property, value, [message])
 *
 * Asserts that `object` has a direct or inherited property named by
 * `property` with a value given by `value`. Uses a deep equality check.
 *
 *     assert.deepPropertyVal({ tea: { green: 'matcha' } }, 'tea', { green: 'matcha' });
 *
 * @name deepPropertyVal
 * @param {object} obj
 * @param {string} prop
 * @param {unknown} val
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.deepPropertyVal = function deepPropertyVal<T, TKey extends keyof T>(
  obj: T,
  prop: TKey,
  val: T[TKey],
  msg?: string
) {
  Assertion.create(obj, msg, assert.deepPropertyVal, true)
    .to.have.deep.property(prop, val);
};

/**
 * ### .notDeepPropertyVal(object, property, value, [message])
 *
 * Asserts that `object` does _not_ have a direct or inherited property named
 * by `property` with value given by `value`. Uses a deep equality check.
 *
 *     assert.notDeepPropertyVal({ tea: { green: 'matcha' } }, 'tea', { black: 'matcha' });
 *     assert.notDeepPropertyVal({ tea: { green: 'matcha' } }, 'tea', { green: 'oolong' });
 *     assert.notDeepPropertyVal({ tea: { green: 'matcha' } }, 'coffee', { green: 'matcha' });
 *
 * @name notDeepPropertyVal
 * @param {object} obj
 * @param {string} prop
 * @param {unknown} val
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.notDeepPropertyVal = function notDeepPropertyVal<T, TKey extends keyof T>(
  obj: T,
  prop: TKey,
  val: T[TKey],
  msg?: string
) {
  Assertion.create(obj, msg, assert.notDeepPropertyVal, true)
    .to.not.have.deep.property(prop, val);
};

/**
 * ### .ownProperty(object, property, [message])
 *
 * Asserts that `object` has a direct property named by `property`. Inherited
 * properties aren't checked.
 *
 *     assert.ownProperty({ tea: { green: 'matcha' }}, 'tea');
 *
 * @name ownProperty
 * @param {object} obj
 * @param {string} prop
 * @param {string} msg
 * @public
 */
assert.ownProperty = function ownProperty<T>(obj: T, prop: keyof T, msg?: string) {
  Assertion.create(obj, msg, assert.ownProperty, true)
    .to.have.own.property(prop);
};

/**
 * ### .notOwnProperty(object, property, [message])
 *
 * Asserts that `object` does _not_ have a direct property named by
 * `property`. Inherited properties aren't checked.
 *
 *     assert.notOwnProperty({ tea: { green: 'matcha' }}, 'coffee');
 *     assert.notOwnProperty({}, 'toString');
 *
 * @name notOwnProperty
 * @param {object} obj
 * @param {string} prop
 * @param {string} msg
 * @public
 */
assert.notOwnProperty = function (obj: object, prop: string, msg?: string) {
  Assertion.create(obj, msg, assert.notOwnProperty, true)
    .to.not.have.own.property(prop);
};

/**
 * ### .ownPropertyVal(object, property, value, [message])
 *
 * Asserts that `object` has a direct property named by `property` and a value
 * equal to the provided `value`. Uses a strict equality check (===).
 * Inherited properties aren't checked.
 *
 *     assert.ownPropertyVal({ coffee: 'is good'}, 'coffee', 'is good');
 *
 * @name ownPropertyVal
 * @param {object} obj
 * @param {string} prop
 * @param {unknown} value
 * @param {string} msg
 * @public
 */
assert.ownPropertyVal = function ownPropertyVal<T, TKey extends keyof T>(
  obj: T,
  prop: TKey,
  value: T[TKey],
  msg?: string
) {
  Assertion.create(obj, msg, assert.ownPropertyVal, true)
    .to.have.own.property(prop, value);
};

/**
 * ### .notOwnPropertyVal(object, property, value, [message])
 *
 * Asserts that `object` does _not_ have a direct property named by `property`
 * with a value equal to the provided `value`. Uses a strict equality check
 * (===). Inherited properties aren't checked.
 *
 *     assert.notOwnPropertyVal({ tea: 'is better'}, 'tea', 'is worse');
 *     assert.notOwnPropertyVal({}, 'toString', Object.prototype.toString);
 *
 * @name notOwnPropertyVal
 * @param {object} obj
 * @param {string} prop
 * @param {unknown} value
 * @param {string} msg
 * @public
 */
assert.notOwnPropertyVal = function notOwnPropertyVal<T, TKey extends keyof T>(
  obj: T,
  prop: TKey,
  value: T[TKey],
  msg?: string
) {
  Assertion.create(obj, msg, assert.notOwnPropertyVal, true)
    .to.not.have.own.property(prop, value);
};

/**
 * ### .deepOwnPropertyVal(object, property, value, [message])
 *
 * Asserts that `object` has a direct property named by `property` and a value
 * equal to the provided `value`. Uses a deep equality check. Inherited
 * properties aren't checked.
 *
 *     assert.deepOwnPropertyVal({ tea: { green: 'matcha' } }, 'tea', { green: 'matcha' });
 *
 * @name deepOwnPropertyVal
 * @param {object} obj
 * @param {string} prop
 * @param {unknown} value
 * @param {string} msg
 * @public
 */
assert.deepOwnPropertyVal = function deepOwnPropertyVal<T, TKey extends keyof T>(
  obj: T,
  prop: TKey,
  value: T[TKey],
  msg?: string
) {
  Assertion.create(obj, msg, assert.deepOwnPropertyVal, true)
    .to.have.deep.own.property(prop, value);
};

/**
 * ### .notDeepOwnPropertyVal(object, property, value, [message])
 *
 * Asserts that `object` does _not_ have a direct property named by `property`
 * with a value equal to the provided `value`. Uses a deep equality check.
 * Inherited properties aren't checked.
 *
 *     assert.notDeepOwnPropertyVal({ tea: { green: 'matcha' } }, 'tea', { black: 'matcha' });
 *     assert.notDeepOwnPropertyVal({ tea: { green: 'matcha' } }, 'tea', { green: 'oolong' });
 *     assert.notDeepOwnPropertyVal({ tea: { green: 'matcha' } }, 'coffee', { green: 'matcha' });
 *     assert.notDeepOwnPropertyVal({}, 'toString', Object.prototype.toString);
 *
 * @name notDeepOwnPropertyVal
 * @param {object} obj
 * @param {string} prop
 * @param {unknown} value
 * @param {string} msg
 * @public
 */
assert.notDeepOwnPropertyVal = function notDeepOwnPropertyVal<T, TKey extends keyof T>(
  obj: T,
  prop: TKey,
  value: T[TKey],
  msg?: string
) {
  Assertion.create(obj, msg, assert.notDeepOwnPropertyVal, true)
    .to.not.have.deep.own.property(prop, value);
};

/**
 * ### .nestedProperty(object, property, [message])
 *
 * Asserts that `object` has a direct or inherited property named by
 * `property`, which can be a string using dot- and bracket-notation for
 * nested reference.
 *
 *     assert.nestedProperty({ tea: { green: 'matcha' }}, 'tea.green');
 *
 * @name nestedProperty
 * @param {object} obj
 * @param {string} prop
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.nestedProperty = function (obj: object, prop: string, msg?: string) {
  Assertion.create(obj, msg, assert.nestedProperty, true)
    .to.have.nested.property(prop);
};

/**
 * ### .notNestedProperty(object, property, [message])
 *
 * Asserts that `object` does _not_ have a property named by `property`, which
 * can be a string using dot- and bracket-notation for nested reference. The
 * property cannot exist on the object nor anywhere in its prototype chain.
 *
 *     assert.notNestedProperty({ tea: { green: 'matcha' }}, 'tea.oolong');
 *
 * @name notNestedProperty
 * @param {object} obj
 * @param {string} prop
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.notNestedProperty = function (obj: object, prop: string, msg?: string) {
  Assertion.create(obj, msg, assert.notNestedProperty, true)
    .to.not.have.nested.property(prop);
};

/**
 * ### .nestedPropertyVal(object, property, value, [message])
 *
 * Asserts that `object` has a property named by `property` with value given
 * by `value`. `property` can use dot- and bracket-notation for nested
 * reference. Uses a strict equality check (===).
 *
 *     assert.nestedPropertyVal({ tea: { green: 'matcha' }}, 'tea.green', 'matcha');
 *
 * @name nestedPropertyVal
 * @param {object} obj
 * @param {string} prop
 * @param {unknown} val
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.nestedPropertyVal = function (obj: object, prop: string, val: unknown, msg?: string) {
  Assertion.create(obj, msg, assert.nestedPropertyVal, true)
    .to.have.nested.property(prop, val);
};

/**
 * ### .notNestedPropertyVal(object, property, value, [message])
 *
 * Asserts that `object` does _not_ have a property named by `property` with
 * value given by `value`. `property` can use dot- and bracket-notation for
 * nested reference. Uses a strict equality check (===).
 *
 *     assert.notNestedPropertyVal({ tea: { green: 'matcha' }}, 'tea.green', 'konacha');
 *     assert.notNestedPropertyVal({ tea: { green: 'matcha' }}, 'coffee.green', 'matcha');
 *
 * @name notNestedPropertyVal
 * @param {object} obj
 * @param {string} prop
 * @param {unknown} val
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.notNestedPropertyVal = function (obj: object, prop: string, val: unknown, msg?: string) {
  Assertion.create(obj, msg, assert.notNestedPropertyVal, true)
    .to.not.have.nested.property(prop, val);
};

/**
 * ### .deepNestedPropertyVal(object, property, value, [message])
 *
 * Asserts that `object` has a property named by `property` with a value given
 * by `value`. `property` can use dot- and bracket-notation for nested
 * reference. Uses a deep equality check.
 *
 *     assert.deepNestedPropertyVal({ tea: { green: { matcha: 'yum' } } }, 'tea.green', { matcha: 'yum' });
 *
 * @name deepNestedPropertyVal
 * @param {object} obj
 * @param {string} prop
 * @param {unknown} val
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.deepNestedPropertyVal = function (obj: object, prop: string, val: unknown, msg?: string) {
  Assertion.create(obj, msg, assert.deepNestedPropertyVal, true)
    .to.have.deep.nested.property(prop, val);
};

/**
 * ### .notDeepNestedPropertyVal(object, property, value, [message])
 *
 * Asserts that `object` does _not_ have a property named by `property` with
 * value given by `value`. `property` can use dot- and bracket-notation for
 * nested reference. Uses a deep equality check.
 *
 *     assert.notDeepNestedPropertyVal({ tea: { green: { matcha: 'yum' } } }, 'tea.green', { oolong: 'yum' });
 *     assert.notDeepNestedPropertyVal({ tea: { green: { matcha: 'yum' } } }, 'tea.green', { matcha: 'yuck' });
 *     assert.notDeepNestedPropertyVal({ tea: { green: { matcha: 'yum' } } }, 'tea.black', { matcha: 'yum' });
 *
 * @name notDeepNestedPropertyVal
 * @param {object} obj
 * @param {string} prop
 * @param {unknown} val
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.notDeepNestedPropertyVal = function (obj: object, prop: string, val: unknown, msg?: string) {
  Assertion.create(obj, msg, assert.notDeepNestedPropertyVal, true)
    .to.not.have.deep.nested.property(prop, val);
}

/**
 * ### .lengthOf(object, length, [message])
 *
 * Asserts that `object` has a `length` or `size` with the expected value.
 *
 *     assert.lengthOf([1,2,3], 3, 'array has length of 3');
 *     assert.lengthOf('foobar', 6, 'string has length of 6');
 *     assert.lengthOf(new Set([1,2,3]), 3, 'set has size of 3');
 *     assert.lengthOf(new Map([['a',1],['b',2],['c',3]]), 3, 'map has size of 3');
 *
 * @name lengthOf
 * @param {unknown} exp
 * @param {number} len
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.lengthOf = function (exp: LengthLike, len: number, msg?: string) {
  Assertion.create(exp, msg, assert.lengthOf, true).to.have.lengthOf(len);
};

/**
 * ### .hasAnyKeys(object, [keys], [message])
 *
 * Asserts that `object` has at least one of the `keys` provided.
 * You can also provide a single object instead of a `keys` array and its keys
 * will be used as the expected set of keys.
 *
 *     assert.hasAnyKeys({foo: 1, bar: 2, baz: 3}, ['foo', 'iDontExist', 'baz']);
 *     assert.hasAnyKeys({foo: 1, bar: 2, baz: 3}, {foo: 30, iDontExist: 99, baz: 1337});
 *     assert.hasAnyKeys(new Map([[{foo: 1}, 'bar'], ['key', 'value']]), [{foo: 1}, 'key']);
 *     assert.hasAnyKeys(new Set([{foo: 'bar'}, 'anotherKey']), [{foo: 'bar'}, 'anotherKey']);
 *
 * @name hasAnyKeys
 * @param {unknown} obj
 * @param {Array | object} keys
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.hasAnyKeys = function (obj: KeyedObject, keys: Array<string>|Record<string, unknown>, msg?: string) {
  Assertion.create(obj, msg, assert.hasAnyKeys, true).to.have.any.keys(keys);
}

/**
 * ### .hasAllKeys(object, [keys], [message])
 *
 * Asserts that `object` has all and only all of the `keys` provided.
 * You can also provide a single object instead of a `keys` array and its keys
 * will be used as the expected set of keys.
 *
 *     assert.hasAllKeys({foo: 1, bar: 2, baz: 3}, ['foo', 'bar', 'baz']);
 *     assert.hasAllKeys({foo: 1, bar: 2, baz: 3}, {foo: 30, bar: 99, baz: 1337]);
 *     assert.hasAllKeys(new Map([[{foo: 1}, 'bar'], ['key', 'value']]), [{foo: 1}, 'key']);
 *     assert.hasAllKeys(new Set([{foo: 'bar'}, 'anotherKey']), [{foo: 'bar'}, 'anotherKey']);
 *
 * @name hasAllKeys
 * @param {unknown} obj
 * @param {string[]} keys
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.hasAllKeys = function (obj: KeyedObject, keys: string[], msg?: string) {
  Assertion.create(obj, msg, assert.hasAllKeys, true).to.have.all.keys(keys);
}

/**
 * ### .containsAllKeys(object, [keys], [message])
 *
 * Asserts that `object` has all of the `keys` provided but may have more keys not listed.
 * You can also provide a single object instead of a `keys` array and its keys
 * will be used as the expected set of keys.
 *
 *     assert.containsAllKeys({foo: 1, bar: 2, baz: 3}, ['foo', 'baz']);
 *     assert.containsAllKeys({foo: 1, bar: 2, baz: 3}, ['foo', 'bar', 'baz']);
 *     assert.containsAllKeys({foo: 1, bar: 2, baz: 3}, {foo: 30, baz: 1337});
 *     assert.containsAllKeys({foo: 1, bar: 2, baz: 3}, {foo: 30, bar: 99, baz: 1337});
 *     assert.containsAllKeys(new Map([[{foo: 1}, 'bar'], ['key', 'value']]), [{foo: 1}]);
 *     assert.containsAllKeys(new Map([[{foo: 1}, 'bar'], ['key', 'value']]), [{foo: 1}, 'key']);
 *     assert.containsAllKeys(new Set([{foo: 'bar'}, 'anotherKey']), [{foo: 'bar'}]);
 *     assert.containsAllKeys(new Set([{foo: 'bar'}, 'anotherKey']), [{foo: 'bar'}, 'anotherKey']);
 *
 * @name containsAllKeys
 * @param {unknown} obj
 * @param {string[]} keys
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.containsAllKeys = function (obj: KeyedObject, keys: string[], msg?: string) {
  Assertion.create(obj, msg, assert.containsAllKeys, true)
    .to.contain.all.keys(keys);
}

/**
 * ### .doesNotHaveAnyKeys(object, [keys], [message])
 *
 * Asserts that `object` has none of the `keys` provided.
 * You can also provide a single object instead of a `keys` array and its keys
 * will be used as the expected set of keys.
 *
 *     assert.doesNotHaveAnyKeys({foo: 1, bar: 2, baz: 3}, ['one', 'two', 'example']);
 *     assert.doesNotHaveAnyKeys({foo: 1, bar: 2, baz: 3}, {one: 1, two: 2, example: 'foo'});
 *     assert.doesNotHaveAnyKeys(new Map([[{foo: 1}, 'bar'], ['key', 'value']]), [{one: 'two'}, 'example']);
 *     assert.doesNotHaveAnyKeys(new Set([{foo: 'bar'}, 'anotherKey']), [{one: 'two'}, 'example']);
 *
 * @name doesNotHaveAnyKeys
 * @param {unknown} obj
 * @param {string[]} keys
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.doesNotHaveAnyKeys = function (obj: KeyedObject, keys: string[], msg?: string) {
  Assertion.create(obj, msg, assert.doesNotHaveAnyKeys, true)
    .to.not.have.any.keys(keys);
}

/**
 * ### .doesNotHaveAllKeys(object, [keys], [message])
 *
 * Asserts that `object` does not have at least one of the `keys` provided.
 * You can also provide a single object instead of a `keys` array and its keys
 * will be used as the expected set of keys.
 *
 *     assert.doesNotHaveAllKeys({foo: 1, bar: 2, baz: 3}, ['one', 'two', 'example']);
 *     assert.doesNotHaveAllKeys({foo: 1, bar: 2, baz: 3}, {one: 1, two: 2, example: 'foo'});
 *     assert.doesNotHaveAllKeys(new Map([[{foo: 1}, 'bar'], ['key', 'value']]), [{one: 'two'}, 'example']);
 *     assert.doesNotHaveAllKeys(new Set([{foo: 'bar'}, 'anotherKey']), [{one: 'two'}, 'example']);
 *
 * @name doesNotHaveAllKeys
 * @param {unknown} obj
 * @param {string[]} keys
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.doesNotHaveAllKeys = function (obj: KeyedObject, keys: string[], msg?: string) {
  Assertion.create(obj, msg, assert.doesNotHaveAllKeys, true)
    .to.not.have.all.keys(keys);
}

/**
 * ### .hasAnyDeepKeys(object, [keys], [message])
 *
 * Asserts that `object` has at least one of the `keys` provided.
 * Since Sets and Maps can have objects as keys you can use this assertion to perform
 * a deep comparison.
 * You can also provide a single object instead of a `keys` array and its keys
 * will be used as the expected set of keys.
 *
 *     assert.hasAnyDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [1, 2]]), {one: 'one'});
 *     assert.hasAnyDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [1, 2]]), [{one: 'one'}, {two: 'two'}]);
 *     assert.hasAnyDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [{two: 'two'}, 'valueTwo']]), [{one: 'one'}, {two: 'two'}]);
 *     assert.hasAnyDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), {one: 'one'});
 *     assert.hasAnyDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), [{one: 'one'}, {three: 'three'}]);
 *     assert.hasAnyDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), [{one: 'one'}, {two: 'two'}]);
 *
 * @name hasAnyDeepKeys
 * @param {unknown} obj
 * @param {Array | object} keys
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.hasAnyDeepKeys = function (obj: KeyedObject, keys: Array<string>|Record<string, unknown>, msg?: string) {
  Assertion.create(obj, msg, assert.hasAnyDeepKeys, true)
    .to.have.any.deep.keys(keys);
}

/**
 * ### .hasAllDeepKeys(object, [keys], [message])
 *
 * Asserts that `object` has all and only all of the `keys` provided.
 * Since Sets and Maps can have objects as keys you can use this assertion to perform
 * a deep comparison.
 * You can also provide a single object instead of a `keys` array and its keys
 * will be used as the expected set of keys.
 *
 *     assert.hasAllDeepKeys(new Map([[{one: 'one'}, 'valueOne']]), {one: 'one'});
 *     assert.hasAllDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [{two: 'two'}, 'valueTwo']]), [{one: 'one'}, {two: 'two'}]);
 *     assert.hasAllDeepKeys(new Set([{one: 'one'}]), {one: 'one'});
 *     assert.hasAllDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), [{one: 'one'}, {two: 'two'}]);
 *
 * @name hasAllDeepKeys
 * @param {unknown} obj
 * @param {Array | object} keys
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.hasAllDeepKeys = function (obj: KeyedObject, keys: Array<string>|Record<string, unknown>, msg?: string) {
  Assertion.create(obj, msg, assert.hasAllDeepKeys, true)
    .to.have.all.deep.keys(keys);
}

/**
 * ### .containsAllDeepKeys(object, [keys], [message])
 *
 * Asserts that `object` contains all of the `keys` provided.
 * Since Sets and Maps can have objects as keys you can use this assertion to perform
 * a deep comparison.
 * You can also provide a single object instead of a `keys` array and its keys
 * will be used as the expected set of keys.
 *
 *     assert.containsAllDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [1, 2]]), {one: 'one'});
 *     assert.containsAllDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [{two: 'two'}, 'valueTwo']]), [{one: 'one'}, {two: 'two'}]);
 *     assert.containsAllDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), {one: 'one'});
 *     assert.containsAllDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), [{one: 'one'}, {two: 'two'}]);
 *
 * @name containsAllDeepKeys
 * @param {unknown} obj
 * @param {Array | object} keys
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.containsAllDeepKeys = function (obj: KeyedObject, keys: Array<string>|Record<string, unknown>, msg?: string) {
  Assertion.create(obj, msg, assert.containsAllDeepKeys, true)
    .to.contain.all.deep.keys(keys);
}

/**
 * ### .doesNotHaveAnyDeepKeys(object, [keys], [message])
 *
 * Asserts that `object` has none of the `keys` provided.
 * Since Sets and Maps can have objects as keys you can use this assertion to perform
 * a deep comparison.
 * You can also provide a single object instead of a `keys` array and its keys
 * will be used as the expected set of keys.
 *
 *     assert.doesNotHaveAnyDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [1, 2]]), {thisDoesNot: 'exist'});
 *     assert.doesNotHaveAnyDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [{two: 'two'}, 'valueTwo']]), [{twenty: 'twenty'}, {fifty: 'fifty'}]);
 *     assert.doesNotHaveAnyDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), {twenty: 'twenty'});
 *     assert.doesNotHaveAnyDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), [{twenty: 'twenty'}, {fifty: 'fifty'}]);
 *
 * @name doesNotHaveAnyDeepKeys
 * @param {unknown} obj
 * @param {Array | object} keys
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.doesNotHaveAnyDeepKeys = function (obj: CollectionLike<never> | object, keys: Array<string>|Record<string, unknown>, msg?: string) {
  Assertion.create(obj, msg, assert.doesNotHaveAnyDeepKeys, true)
    .to.not.have.any.deep.keys(keys);
}

/**
 * ### .doesNotHaveAllDeepKeys(object, [keys], [message])
 *
 * Asserts that `object` does not have at least one of the `keys` provided.
 * Since Sets and Maps can have objects as keys you can use this assertion to perform
 * a deep comparison.
 * You can also provide a single object instead of a `keys` array and its keys
 * will be used as the expected set of keys.
 *
 *     assert.doesNotHaveAllDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [1, 2]]), {thisDoesNot: 'exist'});
 *     assert.doesNotHaveAllDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [{two: 'two'}, 'valueTwo']]), [{twenty: 'twenty'}, {one: 'one'}]);
 *     assert.doesNotHaveAllDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), {twenty: 'twenty'});
 *     assert.doesNotHaveAllDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), [{one: 'one'}, {fifty: 'fifty'}]);
 *
 * @name doesNotHaveAllDeepKeys
 * @param {unknown} obj
 * @param {Array | object} keys
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.doesNotHaveAllDeepKeys = function (obj: CollectionLike<never> | object, keys: Array<string>|Record<string, unknown>, msg?: string) {
  Assertion.create(obj, msg, assert.doesNotHaveAllDeepKeys, true)
    .to.not.have.all.deep.keys(keys);
}

/**
 * ### .throws(fn, [errorLike/string/regexp], [string/regexp], [message])
 *
 * If `errorLike` is an `Error` constructor, asserts that `fn` will throw an error that is an
 * instance of `errorLike`.
 * If `errorLike` is an `Error` instance, asserts that the error thrown is the same
 * instance as `errorLike`.
 * If `errMsgMatcher` is provided, it also asserts that the error thrown will have a
 * message matching `errMsgMatcher`.
 *
 *     assert.throws(fn, 'Error thrown must have this msg');
 *     assert.throws(fn, /Error thrown must have a msg that matches this/);
 *     assert.throws(fn, ReferenceError);
 *     assert.throws(fn, errorInstance);
 *     assert.throws(fn, ReferenceError, 'Error thrown must be a ReferenceError and have this msg');
 *     assert.throws(fn, errorInstance, 'Error thrown must be the same errorInstance and have this msg');
 *     assert.throws(fn, ReferenceError, /Error thrown must be a ReferenceError and match this/);
 *     assert.throws(fn, errorInstance, /Error thrown must be the same errorInstance and match this/);
 *
 * @name throws
 * @alias throw
 * @alias Throw
 * @param {Function} fn
 * @param {Error} errorLike
 * @param {RegExp | string} errMsgMatcher
 * @param {string} msg
 * @returns {unknown}
 * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
 * @namespace Assert
 * @public
 */
function assertThrows(
  fn: Function,
  errorLike: Error | Constructor<Error>,
  errMsgMatcher: RegExp | string,
  msg?: string
): unknown;
function assertThrows(
  fn: Function,
  errMsgMatcher: RegExp | string
): unknown;
function assertThrows(
  fn: Function,
  errorOrMatcher: Error | Constructor<Error> | RegExp | string,
  errMsgMatcher?: RegExp | string,
  msg?: string
): unknown {
  let assertErr: Assertion<Function>;

  if ('string' === typeof errorOrMatcher || errorOrMatcher instanceof RegExp) {
    assertErr = Assertion.create(fn, msg, assertThrows, true)
      .to.throw(errorOrMatcher);
  } else {
    assertErr = Assertion.create(fn, msg, assertThrows, true)
      .to.throw(errorOrMatcher, errMsgMatcher as RegExp | string);
  }

  return flag(assertErr, 'object');
};

assert.throws = assert.Throw = assert.throw = assertThrows;

/**
 * ### .doesNotThrow(fn, [errorLike/string/regexp], [string/regexp], [message])
 *
 * If `errorLike` is an `Error` constructor, asserts that `fn` will _not_ throw an error that is an
 * instance of `errorLike`.
 * If `errorLike` is an `Error` instance, asserts that the error thrown is _not_ the same
 * instance as `errorLike`.
 * If `errMsgMatcher` is provided, it also asserts that the error thrown will _not_ have a
 * message matching `errMsgMatcher`.
 *
 *     assert.doesNotThrow(fn, 'Any Error thrown must not have this message');
 *     assert.doesNotThrow(fn, /Any Error thrown must not match this/);
 *     assert.doesNotThrow(fn, Error);
 *     assert.doesNotThrow(fn, errorInstance);
 *     assert.doesNotThrow(fn, Error, 'Error must not have this message');
 *     assert.doesNotThrow(fn, errorInstance, 'Error must not have this message');
 *     assert.doesNotThrow(fn, Error, /Error must not match this/);
 *     assert.doesNotThrow(fn, errorInstance, /Error must not match this/);
 *
 * @name doesNotThrow
 * @param {Function} fn
 * @param {Error|Constructor<Error>} errorOrMatcher
 * @param {RegExp | string} errMsgMatcher
 * @param {string} msg
 * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
 * @namespace Assert
 * @public
 */
function assertDoesNotThrow(
  fn: Function,
  errMsgMatcher: RegExp | string
): void;
function assertDoesNotThrow(
  fn: Function,
  errorLike: Error | Constructor<Error>,
  errMsgMatcher: RegExp | string,
  msg?: string
): void;
function assertDoesNotThrow(
  fn: Function,
  errorOrMatcher: Error | Constructor<Error> | RegExp | string,
  errMsgMatcher?: RegExp | string,
  msg?: string
): void {
  if ('string' === typeof errorOrMatcher || errorOrMatcher instanceof RegExp) {
    Assertion.create(fn, msg, assertDoesNotThrow, true)
      .to.not.throw(errorOrMatcher);
  } else {
    Assertion.create(fn, msg, assertDoesNotThrow, true)
      .to.not.throw(errorOrMatcher, errMsgMatcher as RegExp | string);
  }
};

assert.doesNotThrow = assertDoesNotThrow;

/**
 * ### .operator(val1, operator, val2, [message])
 *
 * Compares two values using `operator`.
 *
 *     assert.operator(1, '<', 2, 'everything is ok');
 *     assert.operator(1, '>', 2, 'this will fail');
 *
 * @name operator
 * @param {unknown} val
 * @param {string} operator
 * @param {unknown} val2
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.operator = function (val: unknown, operator: string, val2: unknown, msg?: string) {
  var ok;
  switch(operator) {
    case '==':
      ok = val == val2;
      break;
    case '===':
      ok = val === val2;
      break;
    case '>':
      ok = (val as number) > (val2 as number);
      break;
    case '>=':
      ok = (val as number) >= (val2 as number);
      break;
    case '<':
      ok = (val as number) < (val2 as number);
      break;
    case '<=':
      ok = (val as number) <= (val2 as number);
      break;
    case '!=':
      ok = val != val2;
      break;
    case '!==':
      ok = val !== val2;
      break;
    default:
      msg = msg ? msg + ': ' : msg;
      throw new AssertionError(
        msg + 'Invalid operator "' + operator + '"',
        undefined,
        assert.operator
      );
  }
  var test = Assertion.create(ok, msg, assert.operator, true);
  test.assert(
      true === flag(test, 'object')
    , 'expected ' + inspect(val) + ' to be ' + operator + ' ' + inspect(val2)
    , 'expected ' + inspect(val) + ' to not be ' + operator + ' ' + inspect(val2) );
};

/**
 * ### .closeTo(actual, expected, delta, [message])
 *
 * Asserts that the target is equal `expected`, to within a +/- `delta` range.
 *
 *     assert.closeTo(1.5, 1, 0.5, 'numbers are close');
 *
 * @name closeTo
 * @param {number} act
 * @param {number} exp
 * @param {number} delta
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.closeTo = function (act: number, exp: number, delta: number, msg?: string) {
  Assertion.create(act, msg, assert.closeTo, true).to.be.closeTo(exp, delta);
};

/**
 * ### .approximately(actual, expected, delta, [message])
 *
 * Asserts that the target is equal `expected`, to within a +/- `delta` range.
 *
 *     assert.approximately(1.5, 1, 0.5, 'numbers are close');
 *
 * @name approximately
 * @param {number} act
 * @param {number} exp
 * @param {number} delta
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.approximately = function (act: number, exp: number, delta: number, msg?: string) {
  Assertion.create(act, msg, assert.approximately, true)
    .to.be.approximately(exp, delta);
};

/**
 * ### .sameMembers(set1, set2, [message])
 *
 * Asserts that `set1` and `set2` have the same members in any order. Uses a
 * strict equality check (===).
 *
 *     assert.sameMembers([ 1, 2, 3 ], [ 2, 1, 3 ], 'same members');
 *
 * @name sameMembers
 * @param {Array} set1
 * @param {Array} set2
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.sameMembers = function (set1: unknown[], set2: unknown[], msg?: string) {
  Assertion.create(set1, msg, assert.sameMembers, true)
    .to.have.same.members(set2);
}

/**
 * ### .notSameMembers(set1, set2, [message])
 *
 * Asserts that `set1` and `set2` don't have the same members in any order.
 * Uses a strict equality check (===).
 *
 *     assert.notSameMembers([ 1, 2, 3 ], [ 5, 1, 3 ], 'not same members');
 *
 * @name notSameMembers
 * @param {Array} set1
 * @param {Array} set2
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.notSameMembers = function (set1: unknown[], set2: unknown[], msg?: string) {
  Assertion.create(set1, msg, assert.notSameMembers, true)
    .to.not.have.same.members(set2);
}

/**
 * ### .sameDeepMembers(set1, set2, [message])
 *
 * Asserts that `set1` and `set2` have the same members in any order. Uses a
 * deep equality check.
 *
 *     assert.sameDeepMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [{ b: 2 }, { a: 1 }, { c: 3 }], 'same deep members');
 *
 * @name sameDeepMembers
 * @param {Array} set1
 * @param {Array} set2
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.sameDeepMembers = function (set1: unknown[], set2: unknown[], msg?: string) {
  Assertion.create(set1, msg, assert.sameDeepMembers, true)
    .to.have.same.deep.members(set2);
}

/**
 * ### .notSameDeepMembers(set1, set2, [message])
 *
 * Asserts that `set1` and `set2` don't have the same members in any order.
 * Uses a deep equality check.
 *
 *     assert.notSameDeepMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [{ b: 2 }, { a: 1 }, { f: 5 }], 'not same deep members');
 *
 * @name notSameDeepMembers
 * @param {Array} set1
 * @param {Array} set2
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.notSameDeepMembers = function (set1: unknown[], set2: unknown[], msg?: string) {
  Assertion.create(set1, msg, assert.notSameDeepMembers, true)
    .to.not.have.same.deep.members(set2);
}

/**
 * ### .sameOrderedMembers(set1, set2, [message])
 *
 * Asserts that `set1` and `set2` have the same members in the same order.
 * Uses a strict equality check (===).
 *
 *     assert.sameOrderedMembers([ 1, 2, 3 ], [ 1, 2, 3 ], 'same ordered members');
 *
 * @name sameOrderedMembers
 * @param {Array} set1
 * @param {Array} set2
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.sameOrderedMembers = function (set1: unknown[], set2: unknown[], msg?: string) {
  Assertion.create(set1, msg, assert.sameOrderedMembers, true)
    .to.have.same.ordered.members(set2);
}

/**
 * ### .notSameOrderedMembers(set1, set2, [message])
 *
 * Asserts that `set1` and `set2` don't have the same members in the same
 * order. Uses a strict equality check (===).
 *
 *     assert.notSameOrderedMembers([ 1, 2, 3 ], [ 2, 1, 3 ], 'not same ordered members');
 *
 * @name notSameOrderedMembers
 * @param {Array} set1
 * @param {Array} set2
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.notSameOrderedMembers = function (set1: unknown[], set2: unknown[], msg?: string) {
  Assertion.create(set1, msg, assert.notSameOrderedMembers, true)
    .to.not.have.same.ordered.members(set2);
}

/**
 * ### .sameDeepOrderedMembers(set1, set2, [message])
 *
 * Asserts that `set1` and `set2` have the same members in the same order.
 * Uses a deep equality check.
 *
 *     assert.sameDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { a: 1 }, { b: 2 }, { c: 3 } ], 'same deep ordered members');
 *
 * @name sameDeepOrderedMembers
 * @param {Array} set1
 * @param {Array} set2
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.sameDeepOrderedMembers = function (set1: unknown[], set2: unknown[], msg?: string) {
  Assertion.create(set1, msg, assert.sameDeepOrderedMembers, true)
    .to.have.same.deep.ordered.members(set2);
}

/**
 * ### .notSameDeepOrderedMembers(set1, set2, [message])
 *
 * Asserts that `set1` and `set2` don't have the same members in the same
 * order. Uses a deep equality check.
 *
 *     assert.notSameDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { a: 1 }, { b: 2 }, { z: 5 } ], 'not same deep ordered members');
 *     assert.notSameDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { b: 2 }, { a: 1 }, { c: 3 } ], 'not same deep ordered members');
 *
 * @name notSameDeepOrderedMembers
 * @param {Array} set1
 * @param {Array} set2
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.notSameDeepOrderedMembers = function (set1: unknown[], set2: unknown[], msg?: string) {
  Assertion.create(set1, msg, assert.notSameDeepOrderedMembers, true)
    .to.not.have.same.deep.ordered.members(set2);
}

/**
 * ### .includeMembers(superset, subset, [message])
 *
 * Asserts that `subset` is included in `superset` in any order. Uses a
 * strict equality check (===). Duplicates are ignored.
 *
 *     assert.includeMembers([ 1, 2, 3 ], [ 2, 1, 2 ], 'include members');
 *
 * @name includeMembers
 * @param {Array} superset
 * @param {Array} subset
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.includeMembers = function (superset: unknown[], subset: unknown[], msg?: string) {
  Assertion.create(superset, msg, assert.includeMembers, true)
    .to.include.members(subset);
}

/**
 * ### .notIncludeMembers(superset, subset, [message])
 *
 * Asserts that `subset` isn't included in `superset` in any order. Uses a
 * strict equality check (===). Duplicates are ignored.
 *
 *     assert.notIncludeMembers([ 1, 2, 3 ], [ 5, 1 ], 'not include members');
 *
 * @name notIncludeMembers
 * @param {Array} superset
 * @param {Array} subset
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.notIncludeMembers = function (superset: unknown[], subset: unknown[], msg?: string) {
  Assertion.create(superset, msg, assert.notIncludeMembers, true)
    .to.not.include.members(subset);
}

/**
 * ### .includeDeepMembers(superset, subset, [message])
 *
 * Asserts that `subset` is included in `superset` in any order. Uses a deep
 * equality check. Duplicates are ignored.
 *
 *     assert.includeDeepMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { b: 2 }, { a: 1 }, { b: 2 } ], 'include deep members');
 *
 * @name includeDeepMembers
 * @param {Array} superset
 * @param {Array} subset
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.includeDeepMembers = function (superset: unknown[], subset: unknown[], msg?: string) {
  Assertion.create(superset, msg, assert.includeDeepMembers, true)
    .to.include.deep.members(subset);
}

/**
 * ### .notIncludeDeepMembers(superset, subset, [message])
 *
 * Asserts that `subset` isn't included in `superset` in any order. Uses a
 * deep equality check. Duplicates are ignored.
 *
 *     assert.notIncludeDeepMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { b: 2 }, { f: 5 } ], 'not include deep members');
 *
 * @name notIncludeDeepMembers
 * @param {Array} superset
 * @param {Array} subset
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.notIncludeDeepMembers = function (superset: unknown[], subset: unknown[], msg?: string) {
  Assertion.create(superset, msg, assert.notIncludeDeepMembers, true)
    .to.not.include.deep.members(subset);
}

/**
 * ### .includeOrderedMembers(superset, subset, [message])
 *
 * Asserts that `subset` is included in `superset` in the same order
 * beginning with the first element in `superset`. Uses a strict equality
 * check (===).
 *
 *     assert.includeOrderedMembers([ 1, 2, 3 ], [ 1, 2 ], 'include ordered members');
 *
 * @name includeOrderedMembers
 * @param {Array} superset
 * @param {Array} subset
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.includeOrderedMembers = function (superset: unknown[], subset: unknown[], msg?: string) {
  Assertion.create(superset, msg, assert.includeOrderedMembers, true)
    .to.include.ordered.members(subset);
}

/**
 * ### .notIncludeOrderedMembers(superset, subset, [message])
 *
 * Asserts that `subset` isn't included in `superset` in the same order
 * beginning with the first element in `superset`. Uses a strict equality
 * check (===).
 *
 *     assert.notIncludeOrderedMembers([ 1, 2, 3 ], [ 2, 1 ], 'not include ordered members');
 *     assert.notIncludeOrderedMembers([ 1, 2, 3 ], [ 2, 3 ], 'not include ordered members');
 *
 * @name notIncludeOrderedMembers
 * @param {Array} superset
 * @param {Array} subset
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.notIncludeOrderedMembers = function (superset: unknown[], subset: unknown[], msg?: string) {
  Assertion.create(superset, msg, assert.notIncludeOrderedMembers, true)
    .to.not.include.ordered.members(subset);
}

/**
 * ### .includeDeepOrderedMembers(superset, subset, [message])
 *
 * Asserts that `subset` is included in `superset` in the same order
 * beginning with the first element in `superset`. Uses a deep equality
 * check.
 *
 *     assert.includeDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { a: 1 }, { b: 2 } ], 'include deep ordered members');
 *
 * @name includeDeepOrderedMembers
 * @param {Array} superset
 * @param {Array} subset
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.includeDeepOrderedMembers = function (superset: unknown[], subset: unknown[], msg?: string) {
  Assertion.create(superset, msg, assert.includeDeepOrderedMembers, true)
    .to.include.deep.ordered.members(subset);
}

/**
 * ### .notIncludeDeepOrderedMembers(superset, subset, [message])
 *
 * Asserts that `subset` isn't included in `superset` in the same order
 * beginning with the first element in `superset`. Uses a deep equality
 * check.
 *
 *     assert.notIncludeDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { a: 1 }, { f: 5 } ], 'not include deep ordered members');
 *     assert.notIncludeDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { b: 2 }, { a: 1 } ], 'not include deep ordered members');
 *     assert.notIncludeDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { b: 2 }, { c: 3 } ], 'not include deep ordered members');
 *
 * @name notIncludeDeepOrderedMembers
 * @param {Array} superset
 * @param {Array} subset
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.notIncludeDeepOrderedMembers = function (superset: unknown[], subset: unknown[], msg?: string) {
  Assertion.create(superset, msg, assert.notIncludeDeepOrderedMembers, true)
    .to.not.include.deep.ordered.members(subset);
}

/**
 * ### .oneOf(inList, list, [message])
 *
 * Asserts that non-object, non-array value `inList` appears in the flat array `list`.
 *
 *     assert.oneOf(1, [ 2, 1 ], 'Not found in list');
 *
 * @name oneOf
 * @param {*} inList
 * @param {Array<*>} list
 * @param {string} msg
 * @namespace Assert
 * @public
 */
assert.oneOf = function (inList: string | unknown[], list: unknown[], msg?: string) {
  Assertion.create(inList, msg, assert.oneOf, true).to.be.oneOf(list);
}

/**
 * ### isIterable(obj, [message])
 *
 * Asserts that the target is an iterable, which means that it has a iterator
 * with the exception of `String.`
 *
 *     assert.isIterable([1, 2]);
 *
 * @param {unknown} obj
 * @param {string} [msg]
 * @namespace Assert
 * @public
 */
assert.isIterable = function(obj: unknown, msg?: string) {
  if (obj === null || obj === undefined ||
    !(obj as Record<PropertyKey, unknown>)[Symbol.iterator]) {
    msg = msg ?
      `${msg} expected ${inspect(obj)} to be an iterable` :
      `expected ${inspect(obj)} to be an iterable`;

    throw new AssertionError(
      msg,
      undefined,
      assert.isIterable
    );
  }
}

/**
 * ### .changes(function, object, property, [message])
 *
 * Asserts that a function changes the value of a property.
 *
 *     var obj = { val: 10 };
 *     var fn = function() { obj.val = 22 };
 *     assert.changes(fn, obj, 'val');
 *
 * @name changes
 * @param {Function} fn modifier function
 * @param {object} obj object or getter function
 * @param {string} prop property name _optional_
 * @param {string} msg _optional_
 * @namespace Assert
 * @public
 */
function assertChanges(
  fn: Function,
  obj: object,
  prop: PropertyKey,
  msg?: string
): void;
function assertChanges(
  fn: Function,
  obj: () => void,
  msg?: string
): void;
function assertChanges(
  fn: Function,
  obj: object | (() => void),
  propOrMsg?: PropertyKey | string,
  msg?: string
): void {
  if (arguments.length === 3 && typeof obj === 'function') {
    Assertion.create(fn, propOrMsg as string, assertChanges, true).to.change(obj);
  } else {
    Assertion.create(fn, msg, assertChanges, true).to.change(obj, propOrMsg as PropertyKey);
  }
}

assert.changes = assertChanges;

 /**
 * ### .changesBy(function, object, property, delta, [message])
 *
 * Asserts that a function changes the value of a property by an amount (delta).
 *
 *     var obj = { val: 10 };
 *     var fn = function() { obj.val += 2 };
 *     assert.changesBy(fn, obj, 'val', 2);
 *
 * @name changesBy
 * @param {Function} fn modifier function
 * @param {object} obj object or getter function
 * @param {string} prop property name _optional_
 * @param {number} delta msg change amount (delta)
 * @param {string} msg _optional_
 * @namespace Assert
 * @public
 */
function assertChangesBy(
  fn: Function,
  obj: object,
  prop: PropertyKey,
  delta: number,
  msg?: string
): void;
function assertChangesBy(
  fn: Function,
  obj: () => void,
  delta: number,
  msg?: string
): void;
function assertChangesBy(
  fn: Function,
  obj: object | (() => void),
  deltaOrProp: number | PropertyKey,
  msgOrDelta?: string | number,
  msg?: string
): void {
  if (arguments.length === 4 && typeof obj === 'function') {
    Assertion.create(fn, msgOrDelta as string, assertChangesBy, true)
      .to.change(obj).by(deltaOrProp as number);
  } else if (arguments.length === 3) {
    Assertion.create(fn, msg, assertChangesBy, true)
      .to.change(obj as Function).by(deltaOrProp as number);
  } else {
    Assertion.create(fn, msg, assertChangesBy, true)
      .to.change(obj as object, deltaOrProp as PropertyKey).by(msgOrDelta as number);
  }
}

assert.changesBy = assertChangesBy;

 /**
 * ### .doesNotChange(function, object, property, [message])
 *
 * Asserts that a function does not change the value of a property.
 *
 *   var obj = { val: 10 };
 *   var fn = function() { console.log('foo'); };
 *   assert.doesNotChange(fn, obj, 'val');
 *
 * @name doesNotChange
 * @param {Function} fn modifier function
 * @param {object} obj object or getter function
 * @param {string} prop property name _optional_
 * @param {string} msg _optional_
 * @returns {unknown}
 * @namespace Assert
 * @public
 */
function assertDoesNotChange(
  fn: Function,
  obj: object,
  prop: PropertyKey,
  msg?: string
): Assertion<Function>;
function assertDoesNotChange(
  fn: Function,
  obj: () => void,
  msg?: string
): Assertion<Function>;
function assertDoesNotChange(
  fn: Function,
  obj: object | (() => void),
  propOrMsg?: PropertyKey | string,
  msg?: string
): Assertion<Function> {
  if (arguments.length === 3 && typeof obj === 'function') {
    return Assertion.create(fn, propOrMsg as string, assertDoesNotChange, true)
      .to.not.change(obj);
  } else {
    return Assertion.create(fn, msg, assertDoesNotChange, true)
      .to.not.change(obj as object, propOrMsg as PropertyKey);
  }
}

assert.doesNotChange = assertDoesNotChange;

/**
 * ### .changesButNotBy(function, object, property, delta, [message])
 *
 * Asserts that a function does not change the value of a property or of a function's return value by an amount (delta)
 *
 *     var obj = { val: 10 };
 *     var fn = function() { obj.val += 10 };
 *     assert.changesButNotBy(fn, obj, 'val', 5);
 *
 * @name changesButNotBy
 * @param {Function} fn - modifier function
 * @param {object} obj - object or getter function
 * @param {string} prop - property name _optional_
 * @param {number} delta - change amount (delta)
 * @param {string} msg - message _optional_
 * @namespace Assert
 * @public
 */
function assertChangesButNotBy(
  fn: Function,
  obj: object,
  prop: PropertyKey,
  delta: number,
  msg?: string
): void;
function assertChangesButNotBy(
  fn: Function,
  obj: () => void,
  delta: number,
  msg?: string
): void;
function assertChangesButNotBy(
  fn: Function,
  obj: object | (() => void),
  deltaOrProp: number | PropertyKey,
  msgOrDelta?: string | number,
  msg?: string
): void {
  if (arguments.length === 4 && typeof obj === 'function') {
    Assertion.create(fn, msgOrDelta as string, assertChangesButNotBy, true)
      .to.change(obj).but.not.by(deltaOrProp as number);
  } else if (arguments.length === 3) {
    Assertion.create(fn, msg, assertChangesButNotBy, true)
      .to.change(obj as Function).but.not.by(deltaOrProp as number);
  } else {
    Assertion.create(fn, msg, assertChangesButNotBy, true)
      .to.change(obj as object, deltaOrProp as PropertyKey).but.not.by(msgOrDelta as number);
  }
}

assert.changesButNotBy = assertChangesButNotBy;

/**
 * ### .increases(function, object, property, [message])
 *
 * Asserts that a function increases a numeric object property.
 *
 *     var obj = { val: 10 };
 *     var fn = function() { obj.val = 13 };
 *     assert.increases(fn, obj, 'val');
 *
 * @public
 * @namespace Assert
 * @name increases
 * @param {Function} fn - modifier function
 * @param {object} obj - object or getter function
 * @param {string} prop - property name _optional_
 * @param {string} msg - message _optional_
 * @returns {unknown}
 */
function assertIncreases(
  fn: Function,
  obj: object,
  prop: PropertyKey,
  msg?: string
): Assertion<Function>;
function assertIncreases(
  fn: Function,
  obj: () => void,
  msg?: string
): Assertion<Function>;
function assertIncreases(
  fn: Function,
  obj: object | (() => void),
  propOrMsg?: PropertyKey | string,
  msg?: string
): Assertion<Function> {
  if (arguments.length === 3 && typeof obj === 'function') {
    return Assertion.create(fn, propOrMsg as string, assertIncreases, true)
      .to.increase(obj);
  } else {
    return Assertion.create(fn, msg, assertIncreases, true)
      .to.increase(obj, propOrMsg as PropertyKey);
  }
}

assert.increases = assertIncreases;

/**
 * ### .increasesBy(function, object, property, delta, [message])
 *
 * Asserts that a function increases a numeric object property or a function's return value by an amount (delta).
 *
 *     var obj = { val: 10 };
 *     var fn = function() { obj.val += 10 };
 *     assert.increasesBy(fn, obj, 'val', 10);
 *
 * @public
 * @name increasesBy
 * @namespace Assert
 * @param {Function} fn - modifier function
 * @param {object} obj - object or getter function
 * @param {string} prop - property name _optional_
 * @param {number} delta - change amount (delta)
 * @param {string} msg - message _optional_
 */
function assertIncreasesBy(
  fn: Function,
  obj: object,
  prop: PropertyKey,
  delta: number,
  msg?: string
): void;
function assertIncreasesBy(
  fn: Function,
  obj: () => void,
  delta: number,
  msg?: string
): void;
function assertIncreasesBy(
  fn: Function,
  obj: object | (() => void),
  deltaOrProp: number | PropertyKey,
  msgOrDelta?: string | number,
  msg?: string
): void {
  if (arguments.length === 4 && typeof obj === 'function') {
    Assertion.create(fn, msgOrDelta as string, assertIncreasesBy, true)
      .to.increase(obj).by(deltaOrProp as number);
  } else if (arguments.length === 3) {
    Assertion.create(fn, msg, assertIncreasesBy, true)
      .to.increase(obj as Function).by(deltaOrProp as number);
  } else {
    Assertion.create(fn, msg, assertIncreasesBy, true)
      .to.increase(obj, deltaOrProp as PropertyKey).by(msgOrDelta as number);
  }
}

assert.increasesBy = assertIncreasesBy;

/**
 * ### .doesNotIncrease(function, object, property, [message])
 *
 * Asserts that a function does not increase a numeric object property.
 *
 *     var obj = { val: 10 };
 *     var fn = function() { obj.val = 8 };
 *     assert.doesNotIncrease(fn, obj, 'val');
 *
 * @name doesNotIncrease
 * @param {Function} fn modifier function
 * @param {object} obj object or getter function
 * @param {string} prop property name _optional_
 * @returns {Assertion}
 * @param {string} msg _optional_
 * @namespace Assert
 * @public
 */
function assertDoesNotIncrease(
  fn: Function,
  obj: object,
  prop: PropertyKey,
  msg?: string
): Assertion<Function>;
function assertDoesNotIncrease(
  fn: Function,
  obj: () => void,
  msg?: string
): Assertion<Function>;
function assertDoesNotIncrease(
  fn: Function,
  obj: object | (() => void),
  propOrMsg?: PropertyKey | string,
  msg?: string
): Assertion<Function> {
  if (arguments.length === 3 && typeof obj === 'function') {
    return Assertion.create(fn, propOrMsg as string, assertDoesNotIncrease, true)
      .to.not.increase(obj);
  } else {
    return Assertion.create(fn, msg, assertDoesNotIncrease, true)
      .to.not.increase(obj, propOrMsg as PropertyKey);
  }
}

assert.doesNotIncrease = assertDoesNotIncrease;

/**
 * ### .increasesButNotBy(function, object, property, delta, [message])
 *
 * Asserts that a function does not increase a numeric object property or function's return value by an amount (delta).
 *
 *     var obj = { val: 10 };
 *     var fn = function() { obj.val = 15 };
 *     assert.increasesButNotBy(fn, obj, 'val', 10);
 *
 * @name increasesButNotBy
 * @param {Function} fn modifier function
 * @param {object} obj object or getter function
 * @param {string} prop property name _optional_
 * @param {number} delta change amount (delta)
 * @param {string} msg _optional_
 * @namespace Assert
 * @public
 */
function assertIncreasesButNotBy(
  fn: Function,
  obj: object,
  prop: PropertyKey,
  delta: number,
  msg?: string
): void;
function assertIncreasesButNotBy(
  fn: Function,
  obj: () => void,
  delta: number,
  msg?: string
): void;
function assertIncreasesButNotBy(
  fn: Function,
  obj: object | (() => void),
  deltaOrProp: number | PropertyKey,
  msgOrDelta?: string | number,
  msg?: string
): void {
  if (arguments.length === 4 && typeof obj === 'function') {
    Assertion.create(fn, msgOrDelta as string, assertIncreasesButNotBy, true)
      .to.increase(obj).but.not.by(deltaOrProp as number);
  } else if (arguments.length === 3) {
    Assertion.create(fn, msg, assertIncreasesButNotBy, true)
      .to.increase(obj as Function).but.not.by(deltaOrProp as number);
  } else {
    Assertion.create(fn, msg, assertIncreasesButNotBy, true)
      .to.increase(obj, deltaOrProp as PropertyKey).but.not.by(msgOrDelta as number);
  }
}

assert.increasesButNotBy = assertIncreasesButNotBy;

/**
 * ### .decreases(function, object, property, [message])
 *
 * Asserts that a function decreases a numeric object property.
 *
 *     var obj = { val: 10 };
 *     var fn = function() { obj.val = 5 };
 *     assert.decreases(fn, obj, 'val');
 *
 * @name decreases
 * @param {Function} fn modifier function
 * @param {object} obj object or getter function
 * @param {string} prop property name _optional_
 * @returns {Assertion}
 * @param {string} msg _optional_
 * @namespace Assert
 * @public
 */
function assertDecreases(
  fn: Function,
  obj: object,
  prop: PropertyKey,
  msg?: string
): Assertion<Function>;
function assertDecreases(
  fn: Function,
  obj: () => void,
  msg?: string
): Assertion<Function>;
function assertDecreases(
  fn: Function,
  obj: object | (() => void),
  propOrMsg?: PropertyKey | string,
  msg?: string
): Assertion<Function> {
  if (arguments.length === 3 && typeof obj === 'function') {
    return Assertion.create(fn, propOrMsg as string, assertDecreases, true)
      .to.decrease(obj);
  } else {
    return Assertion.create(fn, msg, assertDecreases, true)
      .to.decrease(obj, propOrMsg as PropertyKey);
  }
}

assert.decreases = assertDecreases;

/**
 * ### .decreasesBy(function, object, property, delta, [message])
 *
 * Asserts that a function decreases a numeric object property or a function's return value by an amount (delta)
 *
 *     var obj = { val: 10 };
 *     var fn = function() { obj.val -= 5 };
 *     assert.decreasesBy(fn, obj, 'val', 5);
 *
 * @name decreasesBy
 * @param {Function} fn modifier function
 * @param {object} obj object or getter function
 * @param {string} prop property name _optional_
 * @param {number} delta change amount (delta)
 * @param {string} msg _optional_
 * @namespace Assert
 * @public
 */
function assertDecreasesBy(
  fn: Function,
  obj: object,
  prop: PropertyKey,
  delta: number,
  msg?: string
): void;
function assertDecreasesBy(
  fn: Function,
  obj: () => void,
  delta: number,
  msg?: string
): void;
function assertDecreasesBy(
  fn: Function,
  obj: object | (() => void),
  deltaOrProp: number | PropertyKey,
  msgOrDelta?: string | number,
  msg?: string
): void {
  if (arguments.length === 4 && typeof obj === 'function') {
    Assertion.create(fn, msgOrDelta as string, assertDecreasesBy, true)
      .to.decrease(obj).by(deltaOrProp as number);
  } else if (arguments.length === 3) {
    Assertion.create(fn, msg, assertDecreasesBy, true)
      .to.decrease(obj as Function).by(deltaOrProp as number);
  } else {
    Assertion.create(fn, msg, assertDecreasesBy, true)
      .to.decrease(obj, deltaOrProp as PropertyKey).by(msgOrDelta as number);
  }
}

assert.decreasesBy = assertDecreasesBy;

/**
 * ### .doesNotDecrease(function, object, property, [message])
 *
 * Asserts that a function does not decreases a numeric object property.
 *
 *     var obj = { val: 10 };
 *     var fn = function() { obj.val = 15 };
 *     assert.doesNotDecrease(fn, obj, 'val');
 *
 * @name doesNotDecrease
 * @param {Function} fn modifier function
 * @param {object} obj object or getter function
 * @param {string} prop property name _optional_
 * @returns {Assertion}
 * @param {string} msg _optional_
 * @namespace Assert
 * @public
 */
function assertDoesNotDecrease(
  fn: Function,
  obj: object,
  prop: PropertyKey,
  msg?: string
): Assertion<Function>;
function assertDoesNotDecrease(
  fn: Function,
  obj: () => void,
  msg?: string
): Assertion<Function>;
function assertDoesNotDecrease(
  fn: Function,
  obj: object | (() => void),
  propOrMsg?: PropertyKey | string,
  msg?: string
): Assertion<Function> {
  if (arguments.length === 3 && typeof obj === 'function') {
    return Assertion.create(fn, propOrMsg as string, assertDoesNotDecrease, true)
      .to.not.decrease(obj);
  } else {
    return Assertion.create(fn, msg, assertDoesNotDecrease, true)
      .to.not.decrease(obj, propOrMsg as PropertyKey);
  }
}

assert.doesNotDecrease = assertDoesNotDecrease;

/**
 * ### .doesNotDecreaseBy(function, object, property, delta, [message])
 *
 * Asserts that a function does not decreases a numeric object property or a function's return value by an amount (delta)
 *
 *     var obj = { val: 10 };
 *     var fn = function() { obj.val = 5 };
 *     assert.doesNotDecreaseBy(fn, obj, 'val', 1);
 *
 * @name doesNotDecreaseBy
 * @param {Function} fn modifier function
 * @param {object} obj object or getter function
 * @param {string} prop property name _optional_
 * @param {number} delta change amount (delta)
 * @returns {Assertion}
 * @param {string} msg _optional_
 * @namespace Assert
 * @public
 */
function assertDoesNotDecreaseBy(
  fn: Function,
  obj: object,
  prop: PropertyKey,
  delta: number,
  msg?: string
): Assertion<Function>;
function assertDoesNotDecreaseBy(
  fn: Function,
  obj: () => void,
  delta: number,
  msg?: string
): Assertion<Function>;
function assertDoesNotDecreaseBy(
  fn: Function,
  obj: object | (() => void),
  deltaOrProp: number | PropertyKey,
  msgOrDelta?: string | number,
  msg?: string
): Assertion<Function> {
  if (arguments.length === 4 && typeof obj === 'function') {
    return Assertion.create(fn, msgOrDelta as string, assertDoesNotDecreaseBy, true)
      .to.not.decrease(obj as Function).by(deltaOrProp as number);
  } else if (arguments.length === 3) {
    return Assertion.create(fn, msg, assertDoesNotDecreaseBy, true)
      .to.not.decrease(obj as Function).by(deltaOrProp as number);
  } else {
    return Assertion.create(fn, msg, assertDoesNotDecreaseBy, true)
      .to.not.decrease(obj, deltaOrProp as PropertyKey).by(msgOrDelta as number);
  }
}

assert.doesNotDecreaseBy = assertDoesNotDecreaseBy;

/**
 * ### .decreasesButNotBy(function, object, property, delta, [message])
 *
 * Asserts that a function does not decreases a numeric object property or a function's return value by an amount (delta)
 *
 *     var obj = { val: 10 };
 *     var fn = function() { obj.val = 5 };
 *     assert.decreasesButNotBy(fn, obj, 'val', 1);
 *
 * @name decreasesButNotBy
 * @param {Function} fn modifier function
 * @param {object} obj object or getter function
 * @param {string} prop property name _optional_
 * @param {number} delta change amount (delta)
 * @param {string} msg _optional_
 * @namespace Assert
 * @public
 */
function assertDecreasesButNotBy(
  fn: Function,
  obj: object,
  prop: PropertyKey,
  delta: number,
  msg?: string
): void;
function assertDecreasesButNotBy(
  fn: Function,
  obj: () => void,
  delta: number,
  msg?: string
): void;
function assertDecreasesButNotBy(
  fn: Function,
  obj: object | (() => void),
  deltaOrProp: number | PropertyKey,
  msgOrDelta?: string | number,
  msg?: string
): void {
  if (arguments.length === 4 && typeof obj === 'function') {
    Assertion.create(fn, msgOrDelta as string, assertDecreasesButNotBy, true)
      .to.decrease(obj).but.not.by(deltaOrProp as number);
  } else if (arguments.length === 3) {
    Assertion.create(fn, msg, assertDecreasesButNotBy, true)
      .to.decrease(obj as Function).but.not.by(deltaOrProp as number);
  } else {
    Assertion.create(fn, msg, assertDecreasesButNotBy, true)
      .to.decrease(obj, deltaOrProp as PropertyKey).but.not.by(msgOrDelta as number);
  }
}

assert.decreasesButNotBy = assertDecreasesButNotBy;

/**
 * ### .ifError(object)
 *
 * Asserts if value is not a false value, and throws if it is a true value.
 * This is added to allow for chai to be a drop-in replacement for Node's
 * assert class.
 *
 *     var err = new Error('I am a custom error');
 *     assert.ifError(err); // Rethrows err!
 *
 * @name ifError
 * @param {object} val
 * @namespace Assert
 * @public
 */
assert.ifError = function (val: unknown) {
  if (val) {
    throw(val);
  }
};

/**
 * ### .isExtensible(object)
 *
 * Asserts that `object` is extensible (can have new properties added to it).
 *
 *     assert.isExtensible({});
 *
 * @name isExtensible
 * @alias extensible
 * @param {object} obj
 * @param {string} msg _optional_
 * @namespace Assert
 * @public
 */
assert.isExtensible = assert.extensible = function (obj: object, msg?: string) {
  Assertion.create(obj, msg, assert.isExtensible, true).to.be.extensible;
};

/**
 * ### .isNotExtensible(object)
 *
 * Asserts that `object` is _not_ extensible.
 *
 *     var nonExtensibleObject = Object.preventExtensions({});
 *     var sealedObject = Object.seal({});
 *     var frozenObject = Object.freeze({});
 *
 *     assert.isNotExtensible(nonExtensibleObject);
 *     assert.isNotExtensible(sealedObject);
 *     assert.isNotExtensible(frozenObject);
 *
 * @name isNotExtensible
 * @alias notExtensible
 * @param {object} obj
 * @param {string} msg _optional_
 * @namespace Assert
 * @public
 */
assert.isNotExtensible = assert.notExtensible = function (obj: object, msg?: string) {
  Assertion.create(obj, msg, assert.isNotExtensible, true).to.not.be.extensible;
};

/**
 * ### .isSealed(object)
 *
 * Asserts that `object` is sealed (cannot have new properties added to it
 * and its existing properties cannot be removed).
 *
 *     var sealedObject = Object.seal({});
 *     var frozenObject = Object.seal({});
 *
 *     assert.isSealed(sealedObject);
 *     assert.isSealed(frozenObject);
 *
 * @name isSealed
 * @alias sealed
 * @param {object} obj
 * @param {string} msg _optional_
 * @namespace Assert
 * @public
 */
assert.isSealed = assert.sealed = function (obj: object, msg?: string) {
  Assertion.create(obj, msg, assert.isSealed, true).to.be.sealed;
};

/**
 * ### .isNotSealed(object)
 *
 * Asserts that `object` is _not_ sealed.
 *
 *     assert.isNotSealed({});
 *
 * @name isNotSealed
 * @alias notSealed
 * @param {object} obj
 * @param {string} msg _optional_
 * @namespace Assert
 * @public
 */
assert.isNotSealed = assert.notSealed = function (obj: object, msg?: string) {
  Assertion.create(obj, msg, assert.isNotSealed, true).to.not.be.sealed;
};

/**
 * ### .isFrozen(object)
 *
 * Asserts that `object` is frozen (cannot have new properties added to it
 * and its existing properties cannot be modified).
 *
 *     var frozenObject = Object.freeze({});
 *     assert.frozen(frozenObject);
 *
 * @name isFrozen
 * @alias frozen
 * @param {object} obj
 * @param {string} msg _optional_
 * @namespace Assert
 * @public
 */
assert.isFrozen = assert.frozen = function (obj: object, msg?: string) {
  Assertion.create(obj, msg, assert.isFrozen, true).to.be.frozen;
};

/**
 * ### .isNotFrozen(object)
 *
 * Asserts that `object` is _not_ frozen.
 *
 *     assert.isNotFrozen({});
 *
 * @name isNotFrozen
 * @alias notFrozen
 * @param {object} obj
 * @param {string} msg _optional_
 * @namespace Assert
 * @public
 */
assert.isNotFrozen = assert.notFrozen = function (obj: object, msg?: string) {
  Assertion.create(obj, msg, assert.isNotFrozen, true).to.not.be.frozen;
};

/**
 * ### .isEmpty(target)
 *
 * Asserts that the target does not contain any values.
 * For arrays and strings, it checks the `length` property.
 * For `Map` and `Set` instances, it checks the `size` property.
 * For non-function objects, it gets the count of own
 * enumerable string keys.
 *
 *     assert.isEmpty([]);
 *     assert.isEmpty('');
 *     assert.isEmpty(new Map);
 *     assert.isEmpty({});
 *
 * @name isEmpty
 * @alias empty
 * @param {object | Array | string | Map | Set} val
 * @param {string} msg _optional_
 * @namespace Assert
 * @public
 */
assert.isEmpty = assert.empty = function(val: unknown, msg?: string) {
  Assertion.create(val, msg, assert.isEmpty, true).to.be.empty;
};

/**
 * ### .isNotEmpty(target)
 *
 * Asserts that the target contains values.
 * For arrays and strings, it checks the `length` property.
 * For `Map` and `Set` instances, it checks the `size` property.
 * For non-function objects, it gets the count of own
 * enumerable string keys.
 *
 *     assert.isNotEmpty([1, 2]);
 *     assert.isNotEmpty('34');
 *     assert.isNotEmpty(new Set([5, 6]));
 *     assert.isNotEmpty({ key: 7 });
 *
 * @name isNotEmpty
 * @alias notEmpty
 * @param {object | Array | string | Map | Set} val
 * @param {string} msg _optional_
 * @namespace Assert
 * @public
 */
assert.isNotEmpty = assert.notEmpty = function(val: unknown, msg?: string) {
  Assertion.create(val, msg, assert.isNotEmpty, true).to.not.be.empty;
};