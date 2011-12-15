/*!
 * chai
 * Copyright(c) 2011 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

var exports = module.exports = {};

exports.version = '0.1.0';

exports.expect = require('./interface/expect');
exports.assert = require('./interface/assert');
exports.should = require('./interface/should');


exports.Assertion = require('./assertion');
exports.AssertionError = require('./error');

exports.fail = function (actual, expected, message, operator, stackStartFunction) {
  throw new exports.AssertionError({
    message: message,
    actual: actual,
    expected: expected,
    operator: operator,
    stackStartFunction: stackStartFunction
  });
}