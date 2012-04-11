/*!
 * Chai - message utility
 * Copyright(c) 2012 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Module dependancies
 */

var flag = require('./flag')
  , getActual = require('./getActual')
  , inspect = require('./inspect');

/**
 * # message(object, message, negateMessage)
 *
 * Test and object for expression.
 *
 * Messsage template tags:
 * - `#{this}` current asserted object
 * - `#{act}` actual value
 * - `#{exp}` expected value
 *
 * @param {Object} object (constructed Assertion)
 * @param {Arguments} chai.Assertion.prototype.assert arguments
 */

module.exports = function (obj, args) {
  var negate = flag(obj, 'negate')
    , expected = args[3]
    , actual = getActual(obj, args)
    , msg = negate ? args[2] : args[1];

  msg = msg
    .replace(/#{this}/g, inspect(obj.obj))
    .replace(/#{act}/g, inspect(actual))
    .replace(/#{exp}/g, inspect(expected));

  return obj.msg ? obj.msg + ': ' + msg : msg;
};
