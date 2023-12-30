/*!
 * Chai - test utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

import {flag} from './flag.js';

/**
 * ### .test(object, expression)
 *
 * Test an object for expression.
 *
 * @param {object} obj (constructed Assertion)
 * @param {unknown} args
 * @returns {unknown}
 * @namespace Utils
 * @name test
 */
export function test(obj: object, args: IArguments) {
  var negate = flag(obj, 'negate')
    , expr = args[0];
  return negate ? !expr : expr;
}
