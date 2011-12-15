/*!
 * chai
 * Copyright(c) 2011 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

var Assertion = require('../assertion');

var assert = module.exports = {};

assert.ok = function (val, msg) {
  new Assertion(val, msg).is.ok;
};

assert.equal = function (act, exp, msg) {
  new Assertion(act, msg).to.equal(exp);
};

assert.notEqual = function (act, exp, msg) {
  new Assertion(act, msg).to.not.equal(exp);
};

assert.deepEqual = function (act, exp, msg) {
  new Assertion(act, msg).to.eql(exp);
};

assert.notDeepEqual = function (act, exp, msg) {
  new Assertion(act, msg).to.not.eql(exp);
};

assert.isTrue = function (val, msg) {
  new Assertion(val, msg).is.true;
};

assert.isFalse = function (val, msg) {
  new Assertion(val, msg).is.false;
};

assert.isNull = function (val, msg) {
  new Assertion(val, msg).to.not.exist;
};

assert.isNotNull = function (val, msg) {
  new Assertion(val, msg).to.exist;
};

assert.isUndefined = function (val, msg) {
  new Assertion(val, msg).to.equal(undefined);
};

assert.isNan = function (val, msg) {
  new Assertion(val, msg).to.not.equal(val);
};

assert.isFunction = function (val, msg) {
  new Assertion(val, msg).to.be.a('function');
};

assert.isObject = function (val, msg) {
  new Assertion(val, msg).to.be.an('object');
};

assert.isString = function (val, msg) {
  new Assertion(val, msg).to.be.a('string');
};

assert.isArray = function (val, msg) {
  new Assertion(val, msg).to.be.instanceof(Array);
};

assert.isNumber = function (val, msg) {
  new Assertion(val, msg).to.be.instanceof(Number);
};

assert.isBoolean = function (val, msg) {
  new Assertion(val, msg).to.be.a('boolean');
};

assert.typeOf = function (val, type, msg) {
  new Assertion(val, msg).to.be.a(type);
};

assert.instanceOf = function (val, type, msg) {
  new Assertion(val, msg).to.be.instanceof(type);
};

assert.include = function (exp, inc, msg) {
  new Assertion(exp, msg).to.include(inc);
};

assert.match = function (exp, re, msg) {
  new Assertion(exp, msg).to.match(re);
};

assert.length = function (exp, len, msg) {
  new Assertion(exp, msg).to.have.length(len);
};

assert.throws = function (fn, type, msg) {
  new Assertions(fn, msg).to.throw(type);
};