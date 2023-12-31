/*!
 * chai
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

import {Assertion} from '../assertion.js';
import {AssertionError} from 'assertion-error';

type Constructor<T> = {new(): T};

export interface ShouldAssertions {
  fail(message?: string): void;
  fail<T>(actual: T, expected: T, message: string, operator: string): void;
  equal<T>(val1: T, val2: T, msg: string): void;
  Throw(fn: Function, errs: RegExp | string): void;
  Throw(fn: Function, errt: Error | Constructor<Error>, errs: RegExp, msg?: string): void;
  throw(fn: Function, errs: RegExp | string): void;
  throw(fn: Function, errt: Error | Constructor<Error>, errs: RegExp, msg?: string): void;
  exist(val: unknown, msg: string): void;
}

export interface ShouldInterface extends ShouldAssertions {
  not: ShouldAssertions;
}

declare global {
  interface Object {
    // TODO (43081j): can this ever be strongly typed somehow?
    should: Assertion<unknown>;
  }
}

/**
 * Loads the `should` interface
 */
function loadShould (): ShouldInterface {
  // explicitly define this method as function as to have it's name to include as `ssfi`
  function shouldGetter(this: unknown) {
    if (this instanceof String
        || this instanceof Number
        || this instanceof Boolean
        || typeof Symbol === 'function' && this instanceof Symbol
        || typeof BigInt === 'function' && this instanceof BigInt) {
      return Assertion.create(this.valueOf(), null, shouldGetter);
    }
    return Assertion.create(this, null, shouldGetter);
  }
  function shouldSetter(this: unknown, value: unknown) {
    // See https://github.com/chaijs/chai/issues/86: this makes
    // `whatever.should = someValue` actually set `someValue`, which is
    // especially useful for `global.should = require('chai').should()`.
    //
    // Note that we have to use [[DefineProperty]] instead of [[Put]]
    // since otherwise we would trigger this very setter!
    Object.defineProperty(this, 'should', {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  }
  // modify Object.prototype to have `should`
  Object.defineProperty(Object.prototype, 'should', {
    set: shouldSetter
    , get: shouldGetter
    , configurable: true
  });

  /**
   * ### .fail([message])
   * ### .fail(actual, expected, [message], [operator])
   *
   * Throw a failure.
   *
   *     should.fail();
   *     should.fail("custom error message");
   *     should.fail(1, 2);
   *     should.fail(1, 2, "custom error message");
   *     should.fail(1, 2, "custom error message", ">");
   *     should.fail(1, 2, undefined, ">");
   *
   * @name fail
   * @param {unknown} actual
   * @param {unknown} expected
   * @param {string} message
   * @param {string} operator
   * @namespace BDD
   * @public
   */
  const shouldFail: ShouldAssertions['fail'] = function shouldFail(
    actualOrMessage?: unknown,
    expected?: unknown,
    message?: string,
    operator?: string
  ): void {
    let actual;
    let msg: string|undefined;

    if (arguments.length < 2) {
      msg = actualOrMessage as string | undefined;
      actual = undefined;
    } else {
      msg = message;
      actual = actualOrMessage;
    }

    msg = msg || 'should.fail()';

    throw new AssertionError(msg, {
        actual: actual
      , expected: expected
      , operator: operator
    }, shouldFail);
  };

  /**
   * ### .equal(actual, expected, [message])
   *
   * Asserts non-strict equality (`==`) of `actual` and `expected`.
   *
   *     should.equal(3, '3', '== coerces values to strings');
   *
   * @name equal
   * @param {unknown} actual
   * @param {unknown} expected
   * @param {string} message
   * @namespace Should
   * @public
   */
  const shouldEqual: ShouldAssertions['equal'] = function shouldEqual(
    val1: unknown,
    val2: unknown,
    msg: string
  ) {
    Assertion.create(val1, msg).to.equal(val2);
  };

  /**
   * ### .throw(function, [constructor/string/regexp], [string/regexp], [message])
   *
   * Asserts that `function` will throw an error that is an instance of
   * `constructor`, or alternately that it will throw an error with message
   * matching `regexp`.
   *
   *     should.throw(fn, 'function throws a reference error');
   *     should.throw(fn, /function throws a reference error/);
   *     should.throw(fn, ReferenceError);
   *     should.throw(fn, ReferenceError, 'function throws a reference error');
   *     should.throw(fn, ReferenceError, /function throws a reference error/);
   *
   * @name throw
   * @alias Throw
   * @param {Function} fn
   * @param {Error} errt
   * @param {RegExp} errs
   * @param {string} msg
   * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
   * @namespace Should
   * @public
   */
  const shouldThrow: ShouldAssertions['throw'] = function shouldThrow(
    fn: Function,
    errt: Error | Constructor<Error> | RegExp | string,
    errs?: RegExp | string,
    msg?: string
  ) {
    if (errt instanceof RegExp || typeof errt === 'string') {
      Assertion.create(fn, msg).to.Throw(errt);
    } else {
      Assertion.create(fn, msg).to.Throw(errt, errs as RegExp | string);
    }
  };

  /**
   * ### .exist
   *
   * Asserts that the target is neither `null` nor `undefined`.
   *
   *     var foo = 'hi';
   *     should.exist(foo, 'foo exists');
   *
   * @param {unknown} val
   * @param {string} msg
   * @name exist
   * @namespace Should
   * @public
   */
  const shouldExist: ShouldAssertions['exist'] = function shouldExist(val: unknown, msg: string) {
    Assertion.create(val, msg).to.exist;
  }

  /**
   * ### .not.equal(actual, expected, [message])
   *
   * Asserts non-strict inequality (`!=`) of `actual` and `expected`.
   *
   *     should.not.equal(3, 4, 'these numbers are not equal');
   *
   * @name not.equal
   * @param {unknown} actual
   * @param {unknown} expected
   * @param {string} msg
   * @namespace Should
   * @public
   */
  const shouldNotEqual: ShouldAssertions['equal'] = function shouldNotEqual(val1: unknown, val2: unknown, msg: string) {
    Assertion.create(val1, msg).to.not.equal(val2);
  };

  /**
   * ### .throw(function, [constructor/regexp], [message])
   *
   * Asserts that `function` will _not_ throw an error that is an instance of
   * `constructor`, or alternately that it will not throw an error with message
   * matching `regexp`.
   *
   *     should.not.throw(fn, Error, 'function does not throw');
   *
   * @name not.throw
   * @alias not.Throw
   * @param {Function} fn
   * @param {Error} errt
   * @param {RegExp} errs
   * @param {string} msg
   * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
   * @namespace Should
   * @public
   */
  const shouldNotThrow: ShouldAssertions['throw'] = function shouldNotThrow(
    fn: Function,
    errt: Error | Constructor<Error> | RegExp | string,
    errs?: RegExp | string,
    msg?: string
  ) {
    if (errt instanceof RegExp || typeof errt === 'string') {
      Assertion.create(fn, msg).to.not.Throw(errt);
    } else {
      Assertion.create(fn, msg).to.not.Throw(errt, errs as RegExp | string);
    }
  };

  /**
   * ### .not.exist
   *
   * Asserts that the target is neither `null` nor `undefined`.
   *
   *     var bar = null;
   *     should.not.exist(bar, 'bar does not exist');
   *
   * @namespace Should
   * @name not.exist
   * @param {unknown} val
   * @param {string} msg
   * @public
   */
  const shouldNotExist: ShouldAssertions['exist'] = function shouldNotExist(val: unknown, msg: string) {
    Assertion.create(val, msg).to.not.exist;
  };

  return {
    equal: shouldEqual,
    exist: shouldExist,
    fail: shouldFail,
    throw: shouldThrow,
    Throw: shouldThrow,
    not: {
      equal: shouldNotEqual,
      exist: shouldNotExist,
      fail: () => {}, // Nonsensical, so make it noop
      throw: shouldNotThrow,
      Throw: shouldNotThrow
    }
  };
};

export const should = loadShould;
export const Should = loadShould;
