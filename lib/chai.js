/*!
 * chai
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

import * as util from './chai/utils/index.js';
import {AssertionError} from 'assertion-error';
import {config} from './chai/config.js';
import './chai/core/assertions.js';
import {expect} from './chai/interface/expect.js';
import {Assertion} from './chai/assertion.js';
import * as should from './chai/interface/should.js';
import {assert} from './chai/interface/assert.js';

/**
 * @typedef {object} ChaiExports
 * @property {typeof use} use The use function
 * @property {typeof AssertionError} AssertionError AssertionError constructor
 * @property {typeof util} util Utility functions
 * @property {typeof config} config Configuration object
 * @property {typeof expect} expect Expect interface
 * @property {typeof assert} assert Assert interface
 * @property {typeof Assertion} Assertion Assertion constructor
 * @property {typeof should.should} should Should interface
 * @property {typeof should.Should} Should Should interface
 */

/**
 * @typedef {(chai: ChaiExports, utils: typeof util) => void} ChaiPlugin
 */

/** @type {ChaiPlugin[]} */
const used = [];

// Assertion Error
export {AssertionError};

/**
 * # .use(function)
 *
 * Provides a way to extend the internals of Chai.
 *
 * @param {ChaiPlugin} fn
 * @returns {ChaiExports} for chaining
 * @public
 */
export function use(fn) {
  const exports = {
    use,
    AssertionError,
    util,
    config,
    expect,
    assert,
    Assertion,
    ...should
  };

  if (!~used.indexOf(fn)) {
    fn(exports, util);
    used.push(fn);
  }

  return exports;
}

// Utility Functions
export {util};

// Configuration
export {config};

// Primary `Assertion` prototype
export * from './chai/assertion.js';

// Expect interface
export * from './chai/interface/expect.js';

// Should interface
export * from './chai/interface/should.js';

// Assert interface
export * from './chai/interface/assert.js';
