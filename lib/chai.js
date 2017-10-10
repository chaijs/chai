/*!
 * chai
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

var used = [];
var chai = {};

/*!
 * Chai version
 */

chai.version = '4.1.2';

/*!
 * Assertion Error
 */

chai.AssertionError = require('assertion-error');

/*!
 * Utils for plugins (not exported)
 */

var util = require('./chai/utils');

/**
 * # .use(function)
 *
 * Provides a way to extend the internals of Chai.
 *
 * @param {Function}
 * @returns {this} for chaining
 * @api public
 */

chai.use = function (fn) {
  if (!~used.indexOf(fn)) {
    fn(chai, util);
    used.push(fn);
  }

  return chai;
};

/*!
 * Utility Functions
 */

chai.util = util;

/*!
 * Configuration
 */

var config = require('./chai/config');
chai.config = config;

/*!
 * Primary `Assertion` prototype
 */

var assertion = require('./chai/assertion');
chai.use(assertion);

/*!
 * Core Assertions
 */

var core = require('./chai/core/assertions');
chai.use(core);

/*!
 * Expect interface
 */

var expect = require('./chai/interface/expect');
chai.use(expect);

/*!
 * Should interface
 */

var should = require('./chai/interface/should');
chai.use(should);

/*!
 * Assert interface
 */

var assert = require('./chai/interface/assert');
chai.use(assert);

module.exports = chai;
