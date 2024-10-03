/**
 * @param {unknown} obj
 * @returns {string}
 */
export function type(obj: unknown) {
  if (typeof obj === 'undefined') {
    return 'undefined';
  }

  if (obj === null) {
    return 'null';
  }

  const stringTag = (obj as Record<PropertyKey, unknown>)[Symbol.toStringTag];
  if (typeof stringTag === 'string') {
    return stringTag;
  }
  const type = Object.prototype.toString.call(obj).slice(8, -1);
  return type;
}
