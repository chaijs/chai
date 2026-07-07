/*!
 * Chai - flag utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * Known flag names mapped to the value type they always hold.
 *
 * @typedef {{
 *   ssfi: Function,
 *   message: string,
 *   object: unknown,
 *   negate: boolean,
 * }} FlagMap
 * @private
 */

/**
 * @template {{__flags?: Partial<FlagMap> & Record<PropertyKey, unknown>}} T
 * @template {string} K
 * @overload
 * @param {T} obj object constructed Assertion
 * @param {K} key
 * @returns {K extends keyof FlagMap ? FlagMap[K] | undefined : unknown} the flag value
 */

/**
 * @template {{__flags?: Partial<FlagMap> & Record<PropertyKey, unknown>}} T
 * @template {string} K
 * @overload
 * @param {T} obj object constructed Assertion
 * @param {K} key
 * @param {K extends keyof FlagMap ? FlagMap[K] : unknown} value
 * @returns {void}
 */

/**
 * ### .flag(object, key, [value])
 *
 * Get or set a flag value on an object. If a
 * value is provided it will be set, else it will
 * return the currently set value or `undefined` if
 * the value is not set.
 *
 *     utils.flag(this, 'foo', 'bar'); // setter
 *     utils.flag(this, 'foo'); // getter, returns `bar`
 *
 * @template {{__flags?: Partial<FlagMap> & Record<PropertyKey, unknown>}} T
 * @param {T} obj object constructed Assertion
 * @param {string} key
 * @param {unknown=} value
 * @namespace Utils
 * @name flag
 * @returns {unknown}
 * @private
 */
export function flag(obj, key, value) {
  let flags = obj.__flags || (obj.__flags = Object.create(null));
  if (arguments.length === 3) {
    flags[key] = value;
  } else {
    return flags[key];
  }
}
