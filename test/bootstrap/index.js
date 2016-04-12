if (typeof window === 'object') {
  global = window;
} else {
  global.chai = require('../..');
}

/**
 * Validate that the given function throws an error. Optionally validate some
 * additional properties of the error:
 *
 * If val is a string, validate val equals the error's .message
 * If val is a regex, validate val matches the error's .message
 * If val is an object, validate val's props are included in the error object
 *
 * @param {Function} function that's expected to throw an error
 * @param {Mixed} expected properties of the expected error
 */

global.err = function (fn, val) {
  if (chai.util.type(fn) !== 'function')
    throw new chai.AssertionError('Invalid fn');

  try {
    fn();
  } catch (err) {
    switch (chai.util.type(val)) {
      case 'undefined': return;
      case 'string': return chai.expect(err.message).to.equal(val);
      case 'regexp': return chai.expect(err.message).to.match(val);
      case 'object': return Object.keys(val).forEach(function (key) {
        chai.expect(err).to.have.property(key).and.to.deep.equal(val[key]);
      });
    }

    throw new chai.AssertionError('Invalid val');
  }

  throw new chai.AssertionError('Expected an error');
};
