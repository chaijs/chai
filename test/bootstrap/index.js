if (typeof window === 'object') {
  global = window;
} else {
  global.chai = require('../..');
}

var isStackSupported = false;
if (typeof Error.captureStackTrace !== 'undefined') {
  try {
    throw Error();
  } catch (err) {
    if (typeof err.stack !== 'undefined') isStackSupported = true;
  }
}

/**
 * Validate that the given function throws an error.
 *
 * By default, also validate that the thrown error's stack trace doesn't contain
 * Chai implementation frames. Stack trace validation can be disabled by
 * providing a truthy `skipStackTest` argument.
 *
 * Optionally validate some additional properties of the error:
 *
 * If val is a string, validate val equals the error's .message
 * If val is a regex, validate val matches the error's .message
 * If val is an object, validate val's props are included in the error object
 *
 * @param {Function} function that's expected to throw an error
 * @param {Mixed} expected properties of the expected error
 * @param {Boolean} skipStackTest if truthy, don't validate stack trace
 */

global.err = function globalErr (fn, val, skipStackTest) {
  if (chai.util.type(fn) !== 'function')
    throw new chai.AssertionError('Invalid fn');

  try {
    fn();
  } catch (err) {
    if (isStackSupported && !skipStackTest) {
      chai.expect(err).to.have.property('stack')
        .that.has.string('globalErr')
        .but.does.not.match(
          /at [a-zA-Z]*(Getter|Wrapper|(\.)*assert)/,
          'implementation frames not properly filtered from stack trace'
        );
    }

    switch (chai.util.type(val).toLowerCase()) {
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
