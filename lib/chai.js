/*!
 * chai
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

var used = [];

/*!
 * Chai version
 */

export const version = '4.2.0';

/*!
 * Assertion Error
 */

export const AssertionError = require('assertion-error');

/*!
 * Utils for plugins (not exported)
 */

import util from './chai/utils';

/**
 * # .use(function)
 *
 * Provides a way to extend the internals of Chai.
 *
 * @param {Function}
 * @returns {this} for chaining
 * @api public
 */

export function use (fn) {
  if (!~used.indexOf(fn)) {
    fn(exports, util);
    used.push(fn);
  }

  return exports;
}

/*!
 * Utility Functions
 */

const _util = util;
export { _util as util };

/*!
 * Configuration
 */

import config from './chai/config';
const _config = config;
export { _config as config };

/*!
 * Primary `Assertion` prototype
 */

import assertion from './chai/assertion';
use(assertion);

/*!
 * Core Assertions
 */

import core from './chai/core/assertions';
use(core);

/*!
 * Expect interface
 */

import expect from './chai/interface/expect';
use(expect);

/*!
 * Should interface
 */

import should from './chai/interface/should';
use(should);

/*!
 * Assert interface
 */

import assert from './chai/interface/assert';
use(assert);
