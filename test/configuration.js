describe('configuration', function () {
  var assert = chai.assert;

  function fooThrows () {
    assert.equal('foo', 'bar');
  }

  it('Assertion.includeStack is true', function () {
    var orig = chai.Assertion.includeStack;
    chai.Assertion.includeStack = true;

    try {
      fooThrows();
      assert.ok(false, 'should not get here because error thrown');
    } catch (err) {
      chai.Assertion.includeStack = orig;
      // not all browsers support err.stack
      if ('undefined' !== typeof err.stack) {
        assert.include(err.stack, 'fooThrows', 'should have stack trace in error message');
      }
    }

  });

  it('Assertion.includeStack is false', function () {
    var orig = chai.Assertion.includeStack;
    chai.Assertion.includeStack = false;

    try {
      fooThrows();
      assert.ok(false, 'should not get here because error thrown');
    } catch (err) {
      chai.Assertion.includeStack = orig;

      // IE 10 supports err.stack in Chrome format, but without
      // `Error.captureStackTrace` support that allows tuning of the error
      // message.
      if ('undefined' !== typeof Error.captureStackTrace) {
        assert.ok(!err.stack || err.stack.indexOf('at fooThrows') === -1, 'should not have stack trace in error message');
      }
    }
  });

  it('mocha.throwError is defined', function () {
    var wasMochaThrowErrorCalls = [];
    global.mocha = {
      throwError: function (err) {
        wasMochaThrowErrorCalls.push(err);
        throw err;
      }
    };

    try {
      chai.expect(function () {
        assert.fail();
      }).to.throw(chai.AssertionError);

      assert.ok(wasMochaThrowErrorCalls.length === 1, 'mocha.throwError should have been called once and only once');
      assert.ok(wasMochaThrowErrorCalls[0] instanceof chai.AssertionError, 'mocha.throwError should have been called with an AssertionError');
    } finally {
      delete global.mocha;
    }
  });
});
