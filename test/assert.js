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
    throw new chai.AssertionError({ message: 'Expected an error' });
  } catch (err) {
    assert.equal(err.message, msg);
  }
}

suite('assert', function () {

  test('fail', function () {
    chai.expect(function () {
      assert.fail();
    }).to.throw(chai.AssertionError);
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

  test('typeof / notTypeOf', function () {
    assert.typeOf('test', 'string');
    assert.typeOf(true, 'boolean');
    assert.typeOf(5, 'number');

    err(function () {
      assert.typeOf(5, 'string');
    }, "expected 5 to be a string");

  });

  test('notTypeOf', function () {
    assert.notTypeOf('test', 'number');

    err(function () {
      assert.notTypeOf(5, 'number');
    }, "expected 5 not to be a number");
  });

  test('instanceOf', function() {
    function Foo(){}
    assert.instanceOf(new Foo(), Foo);

    err(function () {
      assert.instanceOf(5, Foo);
    }, "expected 5 to be an instance of Foo");
  });

  test('notInstanceOf', function () {
    function Foo(){}
    assert.notInstanceOf(new Foo(), String);

    err(function () {
      assert.notInstanceOf(new Foo(), Foo);
    }, "expected {} to not be an instance of Foo");
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

  test('isNotObject', function () {
    function Foo(){}
    assert.isNotObject(5);

    err(function() {
      assert.isNotObject({});
    }, "expected {} not to be a object");
  });

  test('notEqual', function() {
    assert.notEqual(3, 4);

    err(function () {
      assert.notEqual(5, 5);
    }, "expected 5 to not equal 5");
  });

  test('strictEqual', function() {
    assert.strictEqual('foo', 'foo');

    err(function () {
      assert.strictEqual('5', 5);
    }, "expected \'5\' to equal 5");
  });

  test('notStrictEqual', function() {
    assert.notStrictEqual(5, '5');

    err(function () {
      assert.notStrictEqual(5, 5);
    }, "expected 5 to not equal 5");
  });

  test('deepEqual', function() {
    assert.deepEqual({tea: 'chai'}, {tea: 'chai'});

    err(function () {
      assert.deepEqual({tea: 'chai'}, {tea: 'black'});
    }, "expected { tea: \'chai\' } to equal { tea: \'black\' }");
  });

  test('notDeepEqual', function() {
    assert.notDeepEqual({tea: 'jasmine'}, {tea: 'chai'});

    err(function () {
      assert.notDeepEqual({tea: 'chai'}, {tea: 'chai'});
    }, "expected { tea: \'chai\' } to not equal { tea: \'chai\' }");
  });
  
  test('almostEqual', function() {
    assert.almostEqual(3.1416, 3.14159, 3);

    err(function () {
      assert.almostEqual(3.1416, 3.14159, 6); 
    }, "expected 3.1416 to equal 3.14159 up to 6 decimal places"); 
    
    err(function () {
      assert.almostEqual(3.1416, 3.14159); 
    }, "expected 3.1416 to equal 3.14159 up to 7 decimal places"); 
    
  });

  test('deepAlmostEqual', function() {
    assert.deepAlmostEqual({pi: 3.1416}, {pi: 3.14159}, 3);

    err(function () {
      assert.deepAlmostEqual({pi: 3.1416}, {pi: 3.14159}, 6); 
    }, "expected { pi: 3.1416 } to equal { pi: 3.14159 } up to 6 decimal places"); 
    
    err(function () {
      assert.deepAlmostEqual({pi: 3.1416}, {pi: 3.14159}); 
    }, "expected { pi: 3.1416 } to equal { pi: 3.14159 } up to 7 decimal places"); 

  });

  test('isNull', function() {
    assert.isNull(null);

    err(function () {
      assert.isNull(undefined);
    }, "expected undefined to equal null");
  });

  test('isNotNull', function() {
    assert.isNotNull(undefined);

    err(function () {
      assert.isNotNull(null);
    }, "expected null to not equal null");
  });

  test('isUndefined', function() {
    assert.isUndefined(undefined);

    err(function () {
      assert.isUndefined(null);
    }, "expected null to equal undefined");
  });

  test('isDefined', function() {
    assert.isDefined(null);

    err(function () {
      assert.isDefined(undefined);
    }, "expected undefined to not equal undefined");
  });

  test('isFunction', function() {
    var func = function() {};
    assert.isFunction(func);

    err(function () {
      assert.isFunction({});
    }, "expected {} to be a function");
  });

  test('isNotFunction', function () {
    assert.isNotFunction(5);

    err(function () {
      assert.isNotFunction(function () {});
    }, "expected [Function] not to be a function");
  });

  test('isArray', function() {
    assert.isArray([]);
    assert.isArray(new Array);

    err(function () {
      assert.isArray({});
    }, "expected {} to be an instance of Array");
  });

  test('isNotArray', function () {
    assert.isNotArray(3);

    err(function () {
      assert.isNotArray([]);
    }, "expected [] to not be an instance of Array");

    err(function () {
      assert.isNotArray(new Array);
    }, "expected [] to not be an instance of Array");
  });

  test('isString', function() {
    assert.isString('Foo');
    assert.isString(new String('foo'));

    err(function () {
      assert.isString(1);
    }, "expected 1 to be a string");
  });

  test('isNotString', function () {
    assert.isNotString(3);
    assert.isNotString([ 'hello' ]);

    err(function () {
      assert.isNotString('hello');
    }, "expected 'hello' not to be a string");
  });

  test('isNumber', function() {
    assert.isNumber(1);
    assert.isNumber(Number('3'));

    err(function () {
      assert.isNumber('1');
    }, "expected \'1\' to be a number");
  });

  test('isNotNumber', function () {
    assert.isNotNumber('hello');
    assert.isNotNumber([ 5 ]);

    err(function () {
      assert.isNotNumber(4);
    }, "expected 4 not to be a number");
  });

  test('isBoolean', function() {
    assert.isBoolean(true);
    assert.isBoolean(false);

    err(function () {
      assert.isBoolean('1');
    }, "expected \'1\' to be a boolean");
  });

  test('isNotBoolean', function () {
    assert.isNotBoolean('true');

    err(function () {
      assert.isNotBoolean(true);
    }, "expected true not to be a boolean");

    err(function () {
      assert.isNotBoolean(false);
    }, "expected false not to be a boolean");
  });

  test('include', function() {
    assert.include('foobar', 'bar');
    assert.include([ 1, 2, 3], 3);

    err(function () {
      assert.include('foobar', 'baz');
     }, "expected \'foobar\' to contain \'baz\'");
  });

  test('length', function() {
    assert.length([1,2,3], 3);
    assert.length('foobar', 6);

    err(function () {
      assert.length('foobar', 5);
     }, "expected 'foobar' to have a length of 5 but got 6");

    err(function () {
      assert.length(1, 5);
     }, "expected 1 to have a property \'length\'");
  });

  test('throws', function() {
    assert.throws(function() { throw new Error('foo'); });
    assert.throws(function() { throw new Error('bar'); }, 'foo');

    err(function () {
      assert.throws(function() {});
     }, "expected [Function] to throw an error");
  });

  test('doesNotThrow', function() {
    assert.doesNotThrow(function() { });
    assert.doesNotThrow(function() { }, 'foo');

    err(function () {
      assert.doesNotThrow(function() { throw new Error('foo'); });
     }, 'expected [Function] to not throw an error');
  });

  test('ifError', function() {
    assert.ifError(false);
    assert.ifError(null);
    assert.ifError(undefined);

    err(function () {
      assert.ifError('foo');
     }, "expected \'foo\' to be falsy");
  });

  test('operator', function() {
    assert.operator(1, '<', 2);
    assert.operator(2, '>', 1);
    assert.operator(1, '==', 1);
    assert.operator(1, '<=', 1);
    assert.operator(1, '>=', 1);
    assert.operator(1, '!=', 2);
    assert.operator(1, '!==', 2);

    err(function () {
      assert.operator(1, '=', 2);
     }, 'Invalid operator "="');

    err(function () {
      assert.operator(2, '<', 1);
     }, "expected 2 to be < 1");

    err(function () {
      assert.operator(1, '>', 2);
     }, "expected 1 to be > 2");

    err(function () {
      assert.operator(1, '==', 2);
     }, "expected 1 to be == 2");

    err(function () {
      assert.operator(2, '<=', 1);
     }, "expected 2 to be <= 1");

    err(function () {
      assert.operator(1, '>=', 2);
     }, "expected 1 to be >= 2");

    err(function () {
      assert.operator(1, '!=', 1);
     }, "expected 1 to be != 1");

    err(function () {
      assert.operator(1, '!==', '1');
     }, "expected 1 to be !== \'1\'");
  });
});
