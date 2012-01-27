/*!
 * chai
 * Copyright(c) 2011 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

module.exports = function (chai) {
  chai.expect = function (val, message) {
    return new chai.Assertion(val, message);
  };
};

