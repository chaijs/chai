/*!
 * Chai - getAllFlags utility
 * Copyright(c) 2012 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### getAllFlags(object)
 *
 * Get all the flags for a specific object. When working
 * with a chai assertion will have at least: `object`, `ssfi`,
 * and `message` if it was provided. Depending on your usage,
 * you might want to delete those.
 *
 *     utils.getAllFlags(this); // returns an object
 *
 * @param {Object} object (constructed Assertion)
 * @name getAllFlags
 * @api private
 */

module.exports = function (obj) {
  var flags = obj.__flags || (obj.__flags = Object.create(null))
    , res = {};

  for (var flag in flags)
    res[flag] = flags[flag];

  return res;
};
