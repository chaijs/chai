/*!
 * chai
 * Copyright(c) 2011-2012 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

var used = [];
var exports = module.exports = {};

exports.version = '0.5.3';

exports.Assertion = require('./assertion');
exports.AssertionError = require('./error');

exports.inspect = require('./utils/inspect');

exports.use = function (fn) {
  if (!~used.indexOf(fn)) {
    fn(this);
    used.push(fn);
  }

  return this;
};

var expect = require('./interface/expect');
exports.use(expect);

var should = require('./interface/should');
exports.use(should);

var assert = require('./interface/assert');
exports.use(assert);
