/*
 * Chai - message composition utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Module dependencies
 */

import {flag} from './flag.js';
import {getActual} from './getActual.js';
import {objDisplay} from './objDisplay.js';

/**
 * ### .getMessage(object, message, negateMessage)
 *
 * Construct the error message based on flags
 * and template tags. Template tags will return
 * a stringified inspection of the object referenced.
 *
 * Message template tags:
 * - `#{this}` current asserted object
 * - `#{act}` actual value
 * - `#{exp}` expected value
 *
 * @param {object} obj object (constructed Assertion)
 * @param {String|Function} msg message or function that returns message to display if expression fails
 * @param {String|Function} negateMsg negatedMessage or function that returns negatedMessage to display if negated expression fails
 * @param {unknown} expected value (remember to check for negation)
 * @param {unknown} [_actual] will default to `this.obj`
 * @returns {string}
 * @namespace Utils
 * @name getMessage
 * @api public
 */

export function getMessage(obj, msg, negateMsg, expected, _actual) {
  var negate = flag(obj, 'negate')
    , val = flag(obj, 'object')
    , actual = getActual(obj, arguments)
    , msg = negate ? negateMsg : msg
    , flagMsg = flag(obj, 'message');

  if(typeof msg === "function") msg = msg();
  msg = msg || '';
  msg = msg
    // @ts-ignore `msg` is a string at this point. Probably there's a way to tell TypeScript that.
    .replace(/#\{this\}/g, function () { return objDisplay(val); })
    .replace(/#\{act\}/g, function () { return objDisplay(actual); })
    .replace(/#\{exp\}/g, function () { return objDisplay(expected); });

  // @ts-ignore `msg` is a string at this point. Probably there's a way to tell TypeScript that.
  return flagMsg ? flagMsg + ': ' + msg : msg;
}
