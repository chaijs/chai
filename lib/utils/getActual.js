/*!
 * Chai - getActual utility
 * Copyright(c) 2012 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * # getActual(object, [actual])
 *
 * Returns the `actual` value for an Assertion
 *
 * @param {Object} object (constructed Assertion)
 * @param {Mixed} actual
 * @api private
 */

module.exports = function (obj, actual) {
  return 'undefined' !== actual ? actual : obj.obj;
};
