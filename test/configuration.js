if (!chai) {
  var chai = require('..');
}

var assert = chai.assert;

function fooThrows () {
  assert.equal('foo', 'bar');
}

suite('configuration', function () {
  test('Assertion.includeStack is true', function () {
    chai.Assertion.includeStack = true;
    try {
      fooThrows();
      assert.ok(false, 'should not get here because error thrown');
    } catch (err) {
      if (typeof(err.stack) !== 'undefined') {  // not all browsers support err.stack
        assert.include(err.stack, 'at fooThrows', 'should have stack trace in error message');
      }
    }
  });

  test('Assertion.includeStack is false', function () {
    chai.Assertion.includeStack = false;
    try {
      fooThrows();
      assert.ok(false, 'should not get here because error thrown');
    } catch (err) {
      // IE 10 supports err.stack in Chrome format, but without
      // `Error.captureStackTrace` support that allows tuning of the error
      // message.
      if (typeof Error.captureStackTrace !== 'undefined') {
        assert.ok(!err.stack || err.stack.indexOf('at fooThrows') === -1, 'should not have stack trace in error message');
      }
    }
  });

  test('AssertionError Properties', function () {
    var err = new chai.AssertionError({ message: 'Chai!' });
    assert.equal(err.toString(), 'Chai!');
  });
});
