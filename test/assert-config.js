if (!chai) {
  var chai = require('..');
}

var assert = chai.assert;

suite('assert-config', function () {

  function fooThrows () {
    assert.equal('foo', 'bar');        
  }
  
  test('Assertion.includeStack is true, stack trace available', function () {
    chai.Assertion.includeStack = true;
    try {
      fooThrows();
      assert.ok(false, 'should not get here because error thrown');
    } catch (err) {
      assert.include(err.stack, 'at fooThrows', 'should have stack trace in error message');
    }
  });

  test('Assertion.includeStack is false, stack trace not available', function () {
    chai.Assertion.includeStack = false;
    try {
      fooThrows();
      assert.ok(false, 'should not get here because error thrown');
    } catch (err) {
      assert.equal(err.stack.indexOf('at fooThrows'), -1, 'should not have stack trace in error message');
    }
  });

});