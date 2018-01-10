/**
 * @type {Inspector[]}
 */
var inspectors = require('./inspectors');

module.exports = function inspect(value) {

    // iterate any custom inspectors, using the first result that returns a non-null value
    for (var result, inspector, i = 0; i < inspectors.length; i++) {
        inspector = inspectors[i];
        result = inspector(value);
        if (result !== null && typeof(result) !== 'undefined') {
            return result;
        }
    }

    // fall back to the default built-in inspector
    return require('./defaultInspector')(value);
};