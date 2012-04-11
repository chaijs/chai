/*!
 * Chai - message utility
 * Copyright(c) 2012 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Module dependancies
 */

var flag = require('./flag');

/**
 * # message(object, message, negateMessage)
 *
 * Test and object for expression.
 *
 * @param {Object} object (constructed Assertion)
 * @param {String} message
 * @param {String} negated message
 * @api private
 */

module.exports = function (obj, message, negateMessage) {
  var negate = flag(obj, 'negate')
    , msg = negate ? negateMessage : message;
  return obj.msg ? obj.msg + ': ' + msg : msg;
};
