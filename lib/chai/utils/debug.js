/*!
* chai
* http://chaijs.com
* Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
* MIT Licensed
*
* @author The Blacksmith (a.k.a. Saulo Vallory) <me@saulovallory.com>
*/

/**
 * ### debug(arg1[, arg2[, arg3[, ...]]])
 *
 * Outsputs args to console ONLY if DEBUG environment variable
 * is set and is "truthy". All arguments received are passed to
 * `console.log`.
 */
module.exports = function() {
  if(typeof process.env.DEBUG != 'undefined' && process.env.DEBUG)
    console.log.apply(null, arguments);
}
