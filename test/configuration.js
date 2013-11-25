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

  describe('Assertion.truncateThreshold', function() {
    var orig = chai.Assertion.truncateThreshold;

    beforeEach(function() {
      chai.Assertion.showDiff = false;
    });

    afterEach(function() {
      chai.Assertion.truncateThreshold = orig;
      chai.Assertion.showDiff = true;
    });

    it('is 20', function() {
      chai.Assertion.truncateThreshold = 20;

      err(function() {
        assert.deepEqual({v: 'something longer than 20'}, {v: 'x'});
      }, "expected { Object (v) } to deeply equal { v: 'x' }");
    });

    it('is 0', function() {
      chai.Assertion.truncateThreshold = 0;

      err(function() {
        assert.deepEqual({v: 'something longer than 20'}, {v: 'x'});
      }, "expected { v: 'something longer than 20' } to deeply equal { v: 'x' }");
    });
  });
});
