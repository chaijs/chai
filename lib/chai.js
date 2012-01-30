/*!
 * chai
 * Copyright(c) 2011 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

var exports = module.exports = {};

exports.version = '0.2.1';

exports.Assertion = require('./assertion');
exports.AssertionError = require('./error');

exports.inspect = require('./utils/inspect');

exports.use = function (fn) {
  fn(this);
  return this;
};

exports.fail = function (actual, expected, message, operator, stackStartFunction) {
  throw new exports.AssertionError({
    message: message,
    actual: actual,
    expected: expected,
    operator: operator,
    stackStartFunction: stackStartFunction
  });
};

var expect = require('./interface/expect');
exports.use(expect);

var should = require('./interface/should');
exports.use(should);

var assert = require('./interface/assert');
exports.use(assert);
