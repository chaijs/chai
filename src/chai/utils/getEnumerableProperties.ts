/*!
 * Chai - getEnumerableProperties utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .getEnumerableProperties(object)
 *
 * This allows the retrieval of enumerable property names of an object,
 * inherited or not.
 *
 * @param {object} object
 * @returns {Array}
 * @namespace Utils
 * @name getEnumerableProperties
 * @public
 */
export function getEnumerableProperties(object: object) {
  var result = [];
  for (var name in object) {
    result.push(name);
  }
  return result;
};
