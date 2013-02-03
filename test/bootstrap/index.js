/*!
 * Attach chai to global should
 */

global.chai = (process && process.env && process.env.CHAI_COV)
  ? require('../../lib-cov/chai')
  : require('../..');

/*!
 * Provide check for fail function.
 */

global.err = function (fn, msg) {
  try {
    fn();
    throw new chai.AssertionError({ message: 'Expected an error' });
  } catch (err) {
    if ('string' === typeof msg) {
      chai.expect(err.message).to.equal(msg);
    } else {
      chai.expect(err.message).to.match(msg);
    }
  }
};
