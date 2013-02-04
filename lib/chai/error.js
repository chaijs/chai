/*!
 * chai
 * Copyright(c) 2011-2013 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Main export
 */

module.exports = AssertionError;

/**
 * # AssertionError (constructor)
 *
 * Create a new assertion error based on the Javascript
 * `Error` prototype.
 *
 * **Options**
 * - message
 * - actual
 * - expected
 * - operator
 * - startStackFunction
 *
 * @param {Object} options
 * @api public
 */

function AssertionError (options) {
  options = options || {};
  this.message = options.message;
  this.actual = options.actual;
  this.expected = options.expected;
  this.operator = options.operator;
  this.showDiff = options.showDiff;

  if (options.stackStartFunction && Error.captureStackTrace) {
    var stackStartFunction = options.stackStartFunction;
    Error.captureStackTrace(this, stackStartFunction);
  }
}

/*!
 * Inherit from Error
 */

AssertionError.prototype = Object.create(Error.prototype);
AssertionError.prototype.name = 'AssertionError';
AssertionError.prototype.constructor = AssertionError;

/**
 * # toString()
 *
 * Override default to string method
 */

AssertionError.prototype.toString = function() {
  return this.message;
};
