
var exports = module.exports = {};

exports.version = '0.0.2';

exports.expect = function (val, message) {
  return new exports.Assertion(val, message);
};

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