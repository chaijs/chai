/*!
 * chai
 * Copyright(c) 2011 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

module.exports = AssertionError;

/*!
 * Inspired by node.js assert module
 * https://github.com/joyent/node/blob/f8c335d0caf47f16d31413f89aa28eda3878e3aa/lib/assert.js
 */
function AssertionError (options) {
  options = options || {};
  this.name = 'AssertionError';
  this.message = options.message;
  this.actual = options.actual;
  this.expected = options.expected;
  this.operator = options.operator;

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, options.stackStartFunction);
  }
}

AssertionError.prototype.__proto__ = Error.prototype;

AssertionError.prototype.toString = function() {
  return this.message;
};
