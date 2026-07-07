import {flag} from './flag.js';
import {type} from './type-detect.js';

/**
 * @param {unknown} obj
 * @returns {boolean}
 */
function isObjectType(obj) {
  let objectType = type(obj);
  let objectTypes = ['Array', 'Object', 'Function'];

  return objectTypes.indexOf(objectType) !== -1;
}

/**
 * ### .getOperator(message)
 *
 * Extract the operator from error message.
 * Operator defined is based on below link
 * https://nodejs.org/api/assert.html#assert_assert.
 *
 * Returns the `operator` or `undefined` value for an Assertion.
 *
 * @param {object} obj object (constructed Assertion)
 * @param {unknown[]} args chai.Assertion.prototype.assert arguments
 * @returns {string | undefined}
 * @namespace Utils
 * @name getOperator
 * @public
 */
export function getOperator(obj, args) {
  let operator = flag(obj, 'operator');
  let negate = flag(obj, 'negate');
  let expected = args[3];
  let msg = negate ? args[2] : args[1];

  if (operator) {
    return String(operator);
  }

  if (typeof msg === 'function') msg = msg();

  msg = msg || '';

  if (!msg) {
    return undefined;
  }

  const msgString = String(msg);

  if (/\shave\s/.test(msgString)) {
    return undefined;
  }

  let isObject = isObjectType(expected);
  if (/\snot\s/.test(msgString)) {
    return isObject ? 'notDeepStrictEqual' : 'notStrictEqual';
  }

  return isObject ? 'deepStrictEqual' : 'strictEqual';
}
