var config = require('../config');

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
  if (!config.useProxy || typeof Proxy === 'undefined' || typeof Reflect === 'undefined')
    return obj;

  return new Proxy(obj, {
    get: function getProperty (target, property) {
      // This check is here because we should not throw errors on Symbol properties
      // such as `Symbol.toStringTag`.
      // The values for which an error should be thrown can be configured using
      // the `config.proxyExcludedKeys` setting.
      if (typeof property === 'string' &&
          config.proxyExcludedKeys.indexOf(property) === -1 &&
          !Reflect.has(target, property))
        throw Error('Invalid Chai property: ' + property);

      return target[property];
    }
  });
};
