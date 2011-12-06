
var Assertion = require('./assertion')
  , exports = module.exports = {};

exports.version = '0.1.0';

exports.assert = function (actual, expect, message) {

};

exports.expect = function (actual, message) {
  var a = new Assertion(actual, message);
  return a;
};