/*!
 * chai
 * Copyright(c) 2011 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Dependencies that are used for multiple exports are required here only once
 */

var pathval = require('pathval');

/*!
 * test utility
 */

exports.test = require('./test.cjs');

/*!
 * type utility
 */

exports.type = require('type-detect');

/*!
 * expectTypes utility
 */
exports.expectTypes = require('./expectTypes.cjs');

/*!
 * message utility
 */

exports.getMessage = require('./getMessage.cjs');

/*!
 * actual utility
 */

exports.getActual = require('./getActual.cjs');

/*!
 * Inspect util
 */

exports.inspect = require('./inspect.cjs');

/*!
 * Object Display util
 */

exports.objDisplay = require('./objDisplay.cjs');

/*!
 * Flag utility
 */

exports.flag = require('./flag.cjs');

/*!
 * Flag transferring utility
 */

exports.transferFlags = require('./transferFlags.cjs');

/*!
 * Deep equal utility
 */

exports.eql = require('deep-eql');

/*!
 * Deep path info
 */

exports.getPathInfo = pathval.getPathInfo;

/*!
 * Check if a property exists
 */

exports.hasProperty = pathval.hasProperty;

/*!
 * Function name
 */

exports.getName = function(fn) {
  return fn.name
}

/*!
 * add Property
 */

exports.addProperty = require('./addProperty.cjs');

/*!
 * add Method
 */

exports.addMethod = require('./addMethod.cjs');

/*!
 * overwrite Property
 */

exports.overwriteProperty = require('./overwriteProperty.cjs');

/*!
 * overwrite Method
 */

exports.overwriteMethod = require('./overwriteMethod.cjs');

/*!
 * Add a chainable method
 */

exports.addChainableMethod = require('./addChainableMethod.cjs');

/*!
 * Overwrite chainable method
 */

exports.overwriteChainableMethod = require('./overwriteChainableMethod.cjs');

/*!
 * Compare by inspect method
 */

exports.compareByInspect = require('./compareByInspect.cjs');

/*!
 * Get own enumerable property symbols method
 */

exports.getOwnEnumerablePropertySymbols = require('./getOwnEnumerablePropertySymbols.cjs');

/*!
 * Get own enumerable properties method
 */

exports.getOwnEnumerableProperties = require('./getOwnEnumerableProperties.cjs');

/*!
 * Checks error against a given set of criteria
 */

exports.checkError = require('check-error');

/*!
 * Proxify util
 */

exports.proxify = require('./proxify.cjs');

/*!
 * addLengthGuard util
 */

exports.addLengthGuard = require('./addLengthGuard.cjs');

/*!
 * isProxyEnabled helper
 */

exports.isProxyEnabled = require('./isProxyEnabled.cjs');

/*!
 * isNaN method
 */

exports.isNaN = require('./isNaN.cjs');

/*!
 * getOperator method
 */

exports.getOperator = require('./getOperator.cjs');
