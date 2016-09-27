/*!
 * Chai - getName utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * # getName(func)
 *
 * Gets the name of a function, in a cross-browser way.
 *
 * @param {Function} a function (usually a constructor)
 * @namespace Utils
 * @name getName
 */

var functionNameMatch = /\s*function(?:\s|\s*\/\*[^(?:*\/)]+\*\/\s*)*([^\(\/]+)/;

module.exports = function (func) {
  var name = '';
  if (typeof func.name === 'undefined') {
    // Here we run a polyfill if func.name is not defined
    var match = String(func).match(functionNameMatch);
    if (match) {
      name = match[1];
    }
  } else {
    name = func.name;
  }

  return name;
};
