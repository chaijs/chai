/*!
 * Chai - proxify utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * # proxify(object)
 *
 * Return a proxy of given object that throws an error when a non-existent
 * property is read. (If Proxy or Reflect is undefined, then return object
 * without modification.)
 *
 * @param {Object} obj
 * @namespace Utils
 * @name proxify
 */

module.exports = function proxify (obj) {
  if (typeof Proxy === 'undefined' || typeof Reflect === 'undefined')
    return obj;

  return new Proxy(obj, {
    get: function getProperty (target, property) {
      // Don't throw error on Symbol properties such as Symbol.toStringTag, nor
      // on .then because it's necessary for promise type-checking.
      if (typeof property === 'string' &&
          property !== 'then' &&
          !Reflect.has(target, property))
        throw Error('Invalid Chai property: ' + property);

      return target[property];
    }
  });
};
