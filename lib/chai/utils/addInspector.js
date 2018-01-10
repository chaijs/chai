/**
 * @type {Inspector[]}
 */
var inspectors = require('./inspectors');

/**
 * ### .addInspector(Inspector)
 *
 * Adds a custom inspector for formatting string representation of a value.
 *
 *     utils.addInspector(function customInspector(obj) {
 *       if (obj && obj.constructor === MyCustomType) {
 *         return obj.myCustomStringRepresentation();
 *       }
 *     });
 *
 * When an assertion fails, Chai will use the string representation from your inspector in the
 * error message.
 *
 * When using custom inspectors, the first inspector that returns a non-null/undefined
 * value will be used. If no custom inspectors return a value, the representation from
 * the built-in Chai inspector is used.
 *
 * @param {Inspector} inspector - inspector to add
 * @name addInspector
 * @namespace Utils
 * @api public
 */

module.exports = function addInspector(inspector) {
    inspectors.push(inspector);
};