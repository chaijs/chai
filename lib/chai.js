
var exports = module.exports = {};

exports.version = '0.0.1';

exports.expect = function (val, message) {
  return new exports.Assertion(val, message);
};

exports.assert = require('./interface/assert');


exports.Assertion = require('./assertion');
exports.AssertionError = require('./error');