/*!
 * Chai - flag utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
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
 * @param {Object} object constructed Assertion
 * @param {String} key
 * @param {Mixed} value (optional)
 * @namespace Utils
 * @name flag
 * @api private
 */

function flag<
  T extends {__flags: unknown},
  TKey extends keyof T['__flags']
>(
  obj: T,
  key: TKey
): T['__flags'][TKey];
function flag<
  T extends {__flags: unknown},
  TKey extends keyof T['__flags']
>(
  obj: T,
  key: TKey,
  value: T['__flags'][TKey]
): void;
function flag<
  T extends object
>(
  obj: T,
  key: PropertyKey
): unknown;
function flag<
  T extends object
>(
  obj: T,
  key: PropertyKey,
  value: unknown
): void;
function flag(
  obj: object,
  key: PropertyKey,
  value?: unknown
): unknown {
  const objWithFlags = obj as {__flags?: Record<PropertyKey, unknown>};
  const flags = objWithFlags.__flags || (objWithFlags.__flags = Object.create(null));
  if (arguments.length === 3) {
    (flags as Record<PropertyKey, unknown>)[key] = value;
  } else {
    return (flags as Record<PropertyKey, unknown>)[key];
  }
}

export {flag};
