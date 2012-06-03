/*!
 * chai
 * Copyright(c) 2011-2012 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

var used = []
  , exports = module.exports = {};

/*!
 * Chai version
 */

exports.version = '1.0.4';

/*!
 * Primary `Assertion` prototype
 */

exports.Assertion = require('./assertion');

/*!
 * Assertion Error
 */

exports.AssertionError = require('./error');

/*!
 * Utils for plugins (not exported)
 */

var util = require('./utils');

/**
 * # .use(function)
 *
 * Provides a way to extend the internals of Chai
 *
 * @param {Function}
 * @returns {this} for chaining
 * @api public
 */

exports.use = function (fn) {
  if (!~used.indexOf(fn)) {
    fn(this, util);
    used.push(fn);
  }

  return this;
};

/*!
 * Expect interface
 */

var expect = require('./interface/expect');
exports.use(expect);

/*!
 * Should interface
 */

var should = require('./interface/should');
exports.use(should);

/*!
 * Assert interface
 */

var assert = require('./interface/assert');
exports.use(assert);
