
/*!
 * Module dependencies.
 *
 * Chai is automatically included in the browser.
 */

if (!chai) {
  var chai = require('..');
}

var assert = chai.assert;

function err(fn, msg) {
  try {
    fn();
    chai.fail('expected an error');
  } catch (err) {
    assert.equal(msg, err.message);
  }
}

suite('assert', function () {

  test('version', function () {
    assert.match(chai.version, /^\d+\.\d+\.\d+$/ );
  });

  test('isTrue', function () {
    assert.isTrue(true);

    err(function() {
      assert.isTrue(false);
    }, "expected false to be true");

    err(function() {
      assert.isTrue(1);
    }, "expected 1 to be true");

    err(function() {
      assert.isTrue('test');
    }, "expected 'test' to be true");
  });

  test('ok', function () {
    assert.ok(true);
    assert.ok(1);
    assert.ok('test');

    err(function () {
      assert.ok(false);
    }, "expected false to be truthy");

    err(function () {
      assert.ok(0);
    }, "expected 0 to be truthy");

    err(function () {
      assert.ok('');
    }, "expected '' to be truthy");
  });

  test('isFalse', function () {
    assert.isFalse(false);

    err(function() {
      assert.isFalse(true);
    }, "expected true to be false");

    err(function() {
      assert.isFalse(0);
    }, "expected 0 to be false");
  });

  test('equal', function () {
    var foo;
    assert.equal(foo, undefined);
  });

  test('typeof', function () {
    assert.typeOf('test', 'string');
    assert.typeOf(true, 'boolean');
    assert.typeOf(5, 'number');

    err(function () {
      assert.typeOf(5, 'string');
    }, "expected 5 to be a string");
  });

  test('instanceOf', function() {
    function Foo(){}
    assert.instanceOf(new Foo(), Foo);

    err(function () {
      assert.instanceOf(5, Foo);
    }, "expected 5 to be an instance of Foo");
  });

  test('isObject', function () {
    function Foo(){}
    assert.isObject({});
    assert.isObject(new Foo());

    err(function() {
      assert.isObject(true);
    }, "expected true to be a object");

    err(function() {
      assert.isObject(Foo);
    }, "expected [Function: Foo] to be a object");

    err(function() {
      assert.isObject('foo');
    }, "expected 'foo' to be a object");
  });

});
