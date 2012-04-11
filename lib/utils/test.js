/*!
 * Chai - test utility
 * Copyright(c) 2012 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Module dependancies
 */

var flag = require('./flag');

/**
 * # test(object, expression)
 *
 * Test and object for expression.
 *
 * @param {Object} object (constructed Assertion)
 * @param {Mixed} expression
 * @api private
 */

module.exports = function (obj, expr) {
  var negate = flag(obj, 'negate');
  return negate ? !expr : expr;
};
