/*!
 * Chai - sortAndStringify utility
 * Copyright(c) 2012 YUKI "Piro" Hiroshi <piro.outsider.reflex@gmail.com>
 * MIT Licensed
 */

/**
 * ### sortAndStringify(object)
 *
 * Strinfigy given object like JSON.stringify(). All properties are sorted,
 * except arrays. This is useful to compare two objects.
 *
 * @param {Object} object the object to be stringified
 * @name sortAndStringify
 * @api private
 */

module.exports = function sortAndStringify(object) {
  if (typeof object != 'object')
    return JSON.stringify(object);

  if (Array.isArray(object))
    return '[' +
           object.map(function(item) {
             return sortAndStringify(item);
           }).join(', ') +
           ']';

  if (!object)
    return JSON.stringify(object);

  var sorted = {};
  Object.keys(object).sort().forEach(function(key) {
    if (object.hasOwnProperty(key))
      sorted[key] = object[key];
  });
  return JSON.stringify(sorted);
};
