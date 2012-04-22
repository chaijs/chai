/*!
 * chai
 * Copyright(c) 2011-2012 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

module.exports = AssertionError;

function AssertionError (options) {
  options = options || {};
  this.message = options.message;
  this.actual = options.actual;
  this.expected = options.expected;
  this.operator = options.operator;

  if (options.stackStartFunction && Error.captureStackTrace) {
    var stackStartFunction = options.stackStartFunction;
    Error.captureStackTrace(this, stackStartFunction);
  }
}

AssertionError.prototype = Object.create(Error.prototype);
AssertionError.prototype.name = 'AssertionError';
AssertionError.prototype.constructor = AssertionError;

AssertionError.prototype.toString = function() {
  return this.message;
};
