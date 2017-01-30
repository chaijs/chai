describe('assert', function () {
  var assert = chai.assert;

  it('assert', function () {
    var foo = 'bar';
    assert(foo == 'bar', "expected foo to equal `bar`");

    err(function () {
      assert(foo == 'baz', "expected foo to equal `bar`");
    }, "expected foo to equal `bar`");

    err(function () {
      assert(foo == 'baz', function() { return "expected foo to equal `bar`"; });
    }, "expected foo to equal `bar`");
  });

  it('fail', function () {
    chai.expect(function () {
      assert.fail(0, 1, 'this has failed');
    }).to.throw(chai.AssertionError, /this has failed/);
  });

  it('isTrue', function () {
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

  it('isNotTrue', function () {
    assert.isNotTrue(false);

    err(function() {
      assert.isNotTrue(true);
    }, "expected true to not equal true");
  });

  it('isOk / ok', function () {
    ['isOk', 'ok'].forEach(function (isOk) {
      assert[isOk](true);
      assert[isOk](1);
      assert[isOk]('test');

      err(function () {
        assert[isOk](false);
      }, "expected false to be truthy");

      err(function () {
        assert[isOk](0);
      }, "expected 0 to be truthy");

      err(function () {
        assert[isOk]('');
      }, "expected '' to be truthy");
    });
  });

  it('isNotOk, notOk', function () {
    ['isNotOk', 'notOk'].forEach(function (isNotOk) {
      assert[isNotOk](false);
      assert[isNotOk](0);
      assert[isNotOk]('');

      err(function () {
        assert[isNotOk](true);
      }, "expected true to be falsy");

      err(function () {
        assert[isNotOk](1);
      }, "expected 1 to be falsy");

      err(function () {
        assert[isNotOk]('test');
      }, "expected 'test' to be falsy");
    });
  });

  it('isFalse', function () {
    assert.isFalse(false);

    err(function() {
      assert.isFalse(true);
    }, "expected true to be false");

    err(function() {
      assert.isFalse(0);
    }, "expected 0 to be false");
  });

  it('isNotFalse', function () {
    assert.isNotFalse(true);

    err(function() {
      assert.isNotFalse(false);
    }, "expected false to not equal false");
  });

  it('equal', function () {
    var foo;
    assert.equal(foo, undefined);

    if (typeof Symbol === 'function') {
      var sym = Symbol();
      assert.equal(sym, sym);
    }
  });

  it('typeof', function () {
    assert.typeOf('test', 'string');
    assert.typeOf(true, 'boolean');
    assert.typeOf(5, 'number');

    if (typeof Symbol === 'function') {
      assert.typeOf(Symbol(), 'symbol');
    }

    err(function () {
      assert.typeOf(5, 'string');
    }, "expected 5 to be a string");

  });

  it('notTypeOf', function () {
    assert.notTypeOf('test', 'number');

    err(function () {
      assert.notTypeOf(5, 'number');
    }, "expected 5 not to be a number");
  });

  it('instanceOf', function() {
    function Foo(){}
    assert.instanceOf(new Foo(), Foo);

    err(function () {
      assert.instanceOf(5, Foo);
    }, "expected 5 to be an instance of Foo");

    function CrashyObject() {};
    CrashyObject.prototype.inspect = function () {
      throw new Error("Arg's inspect() called even though the test passed");
    };
    assert.instanceOf(new CrashyObject(), CrashyObject);
  });

  it('notInstanceOf', function () {
    function Foo(){}
    assert.notInstanceOf(new Foo(), String);

    err(function () {
      assert.notInstanceOf(new Foo(), Foo);
    }, "expected {} to not be an instance of Foo");
  });

  it('isObject', function () {
    function Foo(){}
    assert.isObject({});
    assert.isObject(new Foo());

    err(function() {
      assert.isObject(true);
    }, "expected true to be an object");

    err(function() {
      assert.isObject(Foo);
    }, "expected [Function: Foo] to be an object");

    err(function() {
      assert.isObject('foo');
    }, "expected 'foo' to be an object");
  });

  it('isNotObject', function () {
    function Foo(){}
    assert.isNotObject(5);

    err(function() {
      assert.isNotObject({});
    }, "expected {} not to be an object");
  });

  it('notEqual', function() {
    assert.notEqual(3, 4);

    if (typeof Symbol === 'function') {
      var sym1 = Symbol()
        , sym2 = Symbol();
      assert.notEqual(sym1, sym2);
    }

    err(function () {
      assert.notEqual(5, 5);
    }, "expected 5 to not equal 5");
  });

  it('strictEqual', function() {
    assert.strictEqual('foo', 'foo');

    if (typeof Symbol === 'function') {
      var sym = Symbol();
      assert.strictEqual(sym, sym);
    }

    err(function () {
      assert.strictEqual('5', 5);
    }, "expected \'5\' to equal 5");
  });

  it('notStrictEqual', function() {
    assert.notStrictEqual(5, '5');

    if (typeof Symbol === 'function') {
      var sym1 = Symbol()
        , sym2 = Symbol();
      assert.notStrictEqual(sym1, sym2);
    }

    err(function () {
      assert.notStrictEqual(5, 5);
    }, "expected 5 to not equal 5");
  });

  it('deepEqual', function() {
    assert.deepEqual({tea: 'chai'}, {tea: 'chai'});
    assert.deepStrictEqual({tea: 'chai'}, {tea: 'chai'});  // Alias of deepEqual

    assert.deepEqual([NaN], [NaN]);
    assert.deepEqual({tea: NaN}, {tea: NaN});

    err(function () {
      assert.deepEqual({tea: 'chai'}, {tea: 'black'});
    }, "expected { tea: \'chai\' } to deeply equal { tea: \'black\' }");

    var obja = Object.create({ tea: 'chai' })
      , objb = Object.create({ tea: 'chai' });

    assert.deepEqual(obja, objb);

    var obj1 = Object.create({tea: 'chai'})
      , obj2 = Object.create({tea: 'black'});

    err(function () {
      assert.deepEqual(obj1, obj2);
    }, "expected { tea: \'chai\' } to deeply equal { tea: \'black\' }");
  });

  it('deepEqual (ordering)', function() {
    var a = { a: 'b', c: 'd' }
      , b = { c: 'd', a: 'b' };
    assert.deepEqual(a, b);
  });

  it('deepEqual /regexp/', function() {
    assert.deepEqual(/a/, /a/);
    assert.notDeepEqual(/a/, /b/);
    assert.notDeepEqual(/a/, {});
    assert.deepEqual(/a/g, /a/g);
    assert.notDeepEqual(/a/g, /b/g);
    assert.deepEqual(/a/i, /a/i);
    assert.notDeepEqual(/a/i, /b/i);
    assert.deepEqual(/a/m, /a/m);
    assert.notDeepEqual(/a/m, /b/m);
  });

  it('deepEqual (Date)', function() {
    var a = new Date(1, 2, 3)
      , b = new Date(4, 5, 6);
    assert.deepEqual(a, a);
    assert.notDeepEqual(a, b);
    assert.notDeepEqual(a, {});
  });

  it('deepEqual (circular)', function() {
    var circularObject = {}
      , secondCircularObject = {};
    circularObject.field = circularObject;
    secondCircularObject.field = secondCircularObject;

    assert.deepEqual(circularObject, secondCircularObject);

    err(function() {
      secondCircularObject.field2 = secondCircularObject;
      assert.deepEqual(circularObject, secondCircularObject);
    }, "expected { field: [Circular] } to deeply equal { Object (field, field2) }");
  });

  it('notDeepEqual', function() {
    assert.notDeepEqual({tea: 'jasmine'}, {tea: 'chai'});

    err(function () {
      assert.notDeepEqual({tea: 'chai'}, {tea: 'chai'});
    }, "expected { tea: \'chai\' } to not deeply equal { tea: \'chai\' }");
  });

  it('notDeepEqual (circular)', function() {
    var circularObject = {}
      , secondCircularObject = { tea: 'jasmine' };
    circularObject.field = circularObject;
    secondCircularObject.field = secondCircularObject;

    assert.notDeepEqual(circularObject, secondCircularObject);

    err(function() {
      delete secondCircularObject.tea;
      assert.notDeepEqual(circularObject, secondCircularObject);
    }, "expected { field: [Circular] } to not deeply equal { field: [Circular] }");
  });

  it('isNull', function() {
    assert.isNull(null);

    err(function () {
      assert.isNull(undefined);
    }, "expected undefined to equal null");
  });

  it('isNotNull', function() {
    assert.isNotNull(undefined);

    err(function () {
      assert.isNotNull(null);
    }, "expected null to not equal null");
  });

  it('isNaN', function() {
    assert.isNaN(NaN);

    err(function (){
      assert.isNaN(Infinity);
    }, "expected Infinity to be NaN");

    err(function (){
      assert.isNaN(undefined);
    }, "expected undefined to be NaN");

    err(function (){
      assert.isNaN({});
    }, "expected {} to be NaN");

    err(function (){
      assert.isNaN(4);
    }, "expected 4 to be NaN");
  });

  it('isNotNaN', function() {
    assert.isNotNaN(4);
    assert.isNotNaN(Infinity);
    assert.isNotNaN(undefined);
    assert.isNotNaN({});

    err(function (){
      assert.isNotNaN(NaN);
    }, "expected NaN not to be NaN");
  });

  it('exists', function() {
    var meeber = 'awesome';
    var iDoNotExist;

    assert.exists(meeber);
    assert.exists(0);
    assert.exists(false);
    assert.exists('');

    err(function (){
      assert.exists(iDoNotExist);
    }, "expected undefined to exist");
  });

  it('notExists', function() {
    var meeber = 'awesome';
    var iDoNotExist;

    assert.notExists(iDoNotExist);

    err(function (){
      assert.notExists(meeber);
    }, "expected 'awesome' to not exist");
  });

  it('isUndefined', function() {
    assert.isUndefined(undefined);

    err(function () {
      assert.isUndefined(null);
    }, "expected null to equal undefined");
  });

  it('isDefined', function() {
    assert.isDefined(null);

    err(function () {
      assert.isDefined(undefined);
    }, "expected undefined to not equal undefined");
  });

  it('isFunction', function() {
    var func = function() {};
    assert.isFunction(func);

    err(function () {
      assert.isFunction({});
    }, "expected {} to be a function");
  });

  it('isNotFunction', function () {
    assert.isNotFunction(5);

    err(function () {
      assert.isNotFunction(function () {});
    }, "expected [Function] not to be a function");
  });

  it('isArray', function() {
    assert.isArray([]);
    assert.isArray(new Array);

    err(function () {
      assert.isArray({});
    }, "expected {} to be an array");
  });

  it('isNotArray', function () {
    assert.isNotArray(3);

    err(function () {
      assert.isNotArray([]);
    }, "expected [] not to be an array");

    err(function () {
      assert.isNotArray(new Array);
    }, "expected [] not to be an array");
  });

  it('isString', function() {
    assert.isString('Foo');
    assert.isString(new String('foo'));

    err(function () {
      assert.isString(1);
    }, "expected 1 to be a string");
  });

  it('isNotString', function () {
    assert.isNotString(3);
    assert.isNotString([ 'hello' ]);

    err(function () {
      assert.isNotString('hello');
    }, "expected 'hello' not to be a string");
  });

  it('isNumber', function() {
    assert.isNumber(1);
    assert.isNumber(Number('3'));

    err(function () {
      assert.isNumber('1');
    }, "expected \'1\' to be a number");
  });

  it('isNotNumber', function () {
    assert.isNotNumber('hello');
    assert.isNotNumber([ 5 ]);

    err(function () {
      assert.isNotNumber(4);
    }, "expected 4 not to be a number");
  });

  it('isFinite', function() {
    assert.isFinite(4);
    assert.isFinite(-10);

    err(function(){
      assert.isFinite(NaN);
    }, "expected NaN to be a finite number");

    err(function(){
      assert.isFinite(Infinity);
    }, "expected Infinity to be a finite number");

    err(function(){
      assert.isFinite('foo');
    }, "expected \'foo\' to be a finite number");

    err(function(){
      assert.isFinite([]);
    }, "expected [] to be a finite number");

    err(function(){
      assert.isFinite({});
    }, "expected {} to be a finite number");
  })

  it('isBoolean', function() {
    assert.isBoolean(true);
    assert.isBoolean(false);

    err(function () {
      assert.isBoolean('1');
    }, "expected \'1\' to be a boolean");
  });

  it('isNotBoolean', function () {
    assert.isNotBoolean('true');

    err(function () {
      assert.isNotBoolean(true);
    }, "expected true not to be a boolean");

    err(function () {
      assert.isNotBoolean(false);
    }, "expected false not to be a boolean");
  });

  it('include', function() {
    assert.include('foobar', 'bar');
    assert.include('', '');
    assert.include([ 1, 2, 3], 3);

    var obj1 = {a: 1}
      , obj2 = {b: 2};
    assert.include([obj1, obj2], obj1);
    assert.include({foo: obj1, bar: obj2}, {foo: obj1});
    assert.include({foo: obj1, bar: obj2}, {foo: obj1, bar: obj2});

    if (typeof Symbol === 'function') {
      var sym1 = Symbol()
        , sym2 = Symbol();
      assert.include([sym1, sym2], sym1);
    }

    err(function () {
      assert.include('foobar', 'baz');
    }, "expected \'foobar\' to include \'baz\'");

    err(function () {
      assert.include([{a: 1}, {b: 2}], {a: 1});
    }, "expected [ { a: 1 }, { b: 2 } ] to include { a: 1 }");

    err(function () {
      assert.include({foo: {a: 1}, bar: {b: 2}}, {foo: {a: 1}});
    }, "expected { foo: { a: 1 }, bar: { b: 2 } } to have property 'foo' of { a: 1 }, but got { a: 1 }");

    err(function(){
      assert.include(true, true);
    }, "object tested must be an array, an object, or a string, but boolean given");

    err(function () {
      assert.include(42, 'bar');
    }, "object tested must be an array, an object, or a string, but number given");

    err(function(){
      assert.include(null, 42);
    }, "object tested must be an array, an object, or a string, but null given");

    err(function () {
      assert.include(undefined, 'bar');
    }, "object tested must be an array, an object, or a string, but undefined given");
  });

  it('notInclude', function () {
    assert.notInclude('foobar', 'baz');
    assert.notInclude([ 1, 2, 3 ], 4);

    var obj1 = {a: 1}
      , obj2 = {b: 2};
    assert.notInclude([obj1, obj2], {a: 1});
    assert.notInclude({foo: obj1, bar: obj2}, {foo: {a: 1}});
    assert.notInclude({foo: obj1, bar: obj2}, {foo: obj1, bar: {b: 2}});

    if (typeof Symbol === 'function') {
      var sym1 = Symbol()
        , sym2 = Symbol()
        , sym3 = Symbol();
      assert.notInclude([sym1, sym2], sym3);
    }

    err(function () {
      var obj1 = {a: 1}
        , obj2 = {b: 2};
      assert.notInclude([obj1, obj2], obj1);
    }, "expected [ { a: 1 }, { b: 2 } ] to not include { a: 1 }");

    err(function () {
      var obj1 = {a: 1}
        , obj2 = {b: 2};
      assert.notInclude({foo: obj1, bar: obj2}, {foo: obj1, bar: obj2});
    }, "expected { foo: { a: 1 }, bar: { b: 2 } } to not have property 'foo' of { a: 1 }");

    err(function(){
      assert.notInclude(true, true);
    }, "object tested must be an array, an object, or a string, but boolean given");

    err(function () {
      assert.notInclude(42, 'bar');
    }, "object tested must be an array, an object, or a string, but number given");

    err(function(){
      assert.notInclude(null, 42);
    }, "object tested must be an array, an object, or a string, but null given");

    err(function () {
      assert.notInclude(undefined, 'bar');
    }, "object tested must be an array, an object, or a string, but undefined given");

    err(function () {
      assert.notInclude('foobar', 'bar');
    }, "expected \'foobar\' to not include \'bar\'");
  });

  it('deepInclude and notDeepInclude', function () {
    var obj1 = {a: 1}
      , obj2 = {b: 2};
    assert.deepInclude([obj1, obj2], {a: 1});
    assert.notDeepInclude([obj1, obj2], {a: 9});
    assert.notDeepInclude([obj1, obj2], {z: 1});
    assert.deepInclude({foo: obj1, bar: obj2}, {foo: {a: 1}});
    assert.deepInclude({foo: obj1, bar: obj2}, {foo: {a: 1}, bar: {b: 2}});
    assert.notDeepInclude({foo: obj1, bar: obj2}, {foo: {a: 9}});
    assert.notDeepInclude({foo: obj1, bar: obj2}, {foo: {z: 1}});
    assert.notDeepInclude({foo: obj1, bar: obj2}, {baz: {a: 1}});
    assert.notDeepInclude({foo: obj1, bar: obj2}, {foo: {a: 1}, bar: {b: 9}});

    err(function () {
      assert.deepInclude([obj1, obj2], {a: 9});
    }, "expected [ { a: 1 }, { b: 2 } ] to deep include { a: 9 }");

    err(function () {
      assert.notDeepInclude([obj1, obj2], {a: 1});
    }, "expected [ { a: 1 }, { b: 2 } ] to not deep include { a: 1 }");

    err(function () {
      assert.deepInclude({foo: obj1, bar: obj2}, {foo: {a: 1}, bar: {b: 9}});
    }, "expected { foo: { a: 1 }, bar: { b: 2 } } to have deep property 'bar' of { b: 9 }, but got { b: 2 }");

    err(function () {
      assert.notDeepInclude({foo: obj1, bar: obj2}, {foo: {a: 1}, bar: {b: 2}});
    }, "expected { foo: { a: 1 }, bar: { b: 2 } } to not have deep property 'foo' of { a: 1 }");
  });

  it('keys(array|Object|arguments)', function(){
    assert.hasAllKeys({ foo: 1 }, [ 'foo' ]);
    assert.hasAllKeys({ foo: 1, bar: 2 }, [ 'foo', 'bar' ]);
    assert.hasAllKeys({ foo: 1 }, { foo: 30 });
    assert.hasAllKeys({ foo: 1, bar: 2 }, { 'foo': 6, 'bar': 7 });

    assert.containsAllKeys({ foo: 1, bar: 2, baz: 3 }, [ 'foo', 'bar' ]);
    assert.containsAllKeys({ foo: 1, bar: 2, baz: 3 }, [ 'bar', 'foo' ]);
    assert.containsAllKeys({ foo: 1, bar: 2, baz: 3 }, [ 'baz' ]);
    assert.containsAllKeys({ foo: 1, bar: 2 }, [ 'foo' ]);
    assert.containsAllKeys({ foo: 1, bar: 2 }, ['bar']);
    assert.containsAllKeys({ foo: 1, bar: 2 }, { 'foo': 6 });
    assert.containsAllKeys({ foo: 1, bar: 2 }, { 'bar': 7 });
    assert.containsAllKeys({ foo: 1, bar: 2 }, { 'foo': 6 });
    assert.containsAllKeys({ foo: 1, bar: 2 }, { 'bar': 7, 'foo': 6 });

    assert.doesNotHaveAllKeys({ foo: 1, bar: 2 }, [ 'baz' ]);
    assert.doesNotHaveAllKeys({ foo: 1, bar: 2 }, [ 'foo' ]);
    assert.doesNotHaveAllKeys({ foo: 1, bar: 2 }, [ 'foo', 'baz' ]);
    assert.doesNotHaveAllKeys({ foo: 1, bar: 2, baz: 3 }, [ 'foo', 'bar', 'baz', 'fake' ]);
    assert.doesNotHaveAllKeys({ foo: 1, bar: 2 }, [ 'baz', 'foo' ]);
    assert.doesNotHaveAllKeys({ foo: 1, bar: 2 }, { 'baz': 8 });
    assert.doesNotHaveAllKeys({ foo: 1, bar: 2 }, { 'baz': 8, 'foo': 7 });
    assert.doesNotHaveAllKeys({ foo: 1, bar: 2 }, { 'baz': 8, 'fake': 7 });

    assert.hasAnyKeys({ foo: 1, bar: 2 }, [ 'foo', 'baz' ]);
    assert.hasAnyKeys({ foo: 1, bar: 2 }, [ 'foo' ]);
    assert.hasAnyKeys({ foo: 1, bar: 2 }, [ 'bar', 'baz' ]);
    assert.hasAnyKeys({ foo: 1, bar: 2 }, [ 'bar', 'foo' ]);
    assert.hasAnyKeys({ foo: 1, bar: 2 }, [ 'foo', 'bar' ]);
    assert.hasAnyKeys({ foo: 1, bar: 2 }, [ 'baz', 'fake', 'foo' ]);
    assert.hasAnyKeys({ foo: 1, bar: 2 }, { 'foo': 6 });
    assert.hasAnyKeys({ foo: 1, bar: 2 }, { 'baz': 6, 'foo': 12 });

    assert.doesNotHaveAnyKeys({ foo: 1, bar: 2 }, [ 'baz', 'abc', 'def' ]);
    assert.doesNotHaveAnyKeys({ foo: 1, bar: 2 }, [ 'baz' ]);
    assert.doesNotHaveAnyKeys({ foo: 1, bar: 2 }, { baz: 1, biz: 2, fake: 3 });
    assert.doesNotHaveAnyKeys({ foo: 1, bar: 2 }, { baz: 1 });

    var enumProp1 = 'enumProp1'
      , enumProp2 = 'enumProp2'
      , nonEnumProp = 'nonEnumProp'
      , obj = {};

    obj[enumProp1] = 'enumProp1';
    obj[enumProp2] = 'enumProp2';

    Object.defineProperty(obj, nonEnumProp, {
        enumerable: false,
        value: 'nonEnumProp'
    });

    assert.hasAllKeys(obj, [enumProp1, enumProp2]);
    assert.doesNotHaveAllKeys(obj, [enumProp1, enumProp2, nonEnumProp]);

    if (typeof Symbol === 'function') {
      var sym1 = Symbol('sym1')
        , sym2 = Symbol('sym2')
        , sym3 = Symbol('sym3')
        , str = 'str'
        , obj = {};

      obj[sym1] = 'sym1';
      obj[sym2] = 'sym2';
      obj[str] = 'str';

      Object.defineProperty(obj, sym3, {
        enumerable: false,
        value: 'sym3'
      });

      assert.hasAllKeys(obj, [sym1, sym2, str]);
      assert.doesNotHaveAllKeys(obj, [sym1, sym2, sym3, str]);
    }

    if (typeof Map !== 'undefined') {
      // Not using Map constructor args because not supported in IE 11.
      var aKey = {thisIs: 'anExampleObject'}
        , anotherKey = {doingThisBecauseOf: 'referential equality'}
        , testMap = new Map();

      testMap.set(aKey, 'aValue');
      testMap.set(anotherKey, 'anotherValue');

      assert.hasAnyKeys(testMap, [ aKey ]);
      assert.hasAnyKeys(testMap, [ 'thisDoesNotExist', 'thisToo', aKey ]);
      assert.hasAllKeys(testMap, [ aKey, anotherKey ]);

      assert.containsAllKeys(testMap, [ aKey ]);
      assert.doesNotHaveAllKeys(testMap, [ aKey, {iDoNot: 'exist'} ]);

      assert.doesNotHaveAnyKeys(testMap, [ {iDoNot: 'exist'} ]);
      assert.doesNotHaveAnyKeys(testMap, [ 'thisDoesNotExist', 'thisToo', {iDoNot: 'exist'} ]);
      assert.doesNotHaveAllKeys(testMap, [ 'thisDoesNotExist', 'thisToo', anotherKey ]);

      assert.doesNotHaveAnyKeys(testMap, [ {iDoNot: 'exist'}, 'thisDoesNotExist' ]);
      assert.doesNotHaveAnyKeys(testMap, [ 'thisDoesNotExist', 'thisToo', {iDoNot: 'exist'} ]);
      assert.doesNotHaveAllKeys(testMap, [ aKey, {iDoNot: 'exist'} ]);

      // Ensure the assertions above use strict equality
      assert.doesNotHaveAnyKeys(testMap, {thisIs: 'anExampleObject'});
      assert.doesNotHaveAllKeys(testMap, [ {thisIs: 'anExampleObject'}, {doingThisBecauseOf: 'referential equality'} ]);

      err(function(){
        assert.hasAnyKeys(testMap, [ {thisIs: 'anExampleObject'} ]);
      });

      err(function(){
        assert.hasAllKeys(testMap, [ {thisIs: 'anExampleObject'}, {doingThisBecauseOf: 'referential equality'} ]);
      });

      err(function(){
        assert.containsAllKeys(testMap, [ {thisIs: 'anExampleObject'} ]);
      });

      // Tests for the deep variations of the keys assertion
      assert.hasAnyDeepKeys(testMap, {thisIs: 'anExampleObject'});
      assert.hasAnyDeepKeys(testMap, [{thisIs: 'anExampleObject'}, {three: 'three'}]);
      assert.hasAnyDeepKeys(testMap, [{thisIs: 'anExampleObject'}, {doingThisBecauseOf: 'referential equality'}]);

      assert.hasAllDeepKeys(testMap, [{thisIs: 'anExampleObject'}, {doingThisBecauseOf: 'referential equality'}]);

      assert.containsAllDeepKeys(testMap, {thisIs: 'anExampleObject'});
      assert.containsAllDeepKeys(testMap, [{thisIs: 'anExampleObject'}, {doingThisBecauseOf: 'referential equality'}]);

      assert.doesNotHaveAnyDeepKeys(testMap, {thisDoesNot: 'exist'});
      assert.doesNotHaveAnyDeepKeys(testMap, [{twenty: 'twenty'}, {fifty: 'fifty'}]);

      assert.doesNotHaveAllDeepKeys(testMap, {thisDoesNot: 'exist'});
      assert.doesNotHaveAllDeepKeys(testMap, [{twenty: 'twenty'}, {thisIs: 'anExampleObject'}]);

      var weirdMapKey1 = Object.create(null)
        , weirdMapKey2 = {toString: NaN}
        , weirdMapKey3 = []
        , weirdMap = new Map();

      weirdMap.set(weirdMapKey1, 'val1');
      weirdMap.set(weirdMapKey2, 'val2');

      assert.hasAllKeys(weirdMap, [weirdMapKey1, weirdMapKey2]);
      assert.doesNotHaveAllKeys(weirdMap, [weirdMapKey1, weirdMapKey3]);

      if (typeof Symbol === 'function') {
        var symMapKey1 = Symbol()
          , symMapKey2 = Symbol()
          , symMapKey3 = Symbol()
          , symMap = new Map();

        symMap.set(symMapKey1, 'val1');
        symMap.set(symMapKey2, 'val2');

        assert.hasAllKeys(symMap, [symMapKey1, symMapKey2]);
        assert.hasAnyKeys(symMap, [symMapKey1, symMapKey3]);
        assert.containsAllKeys(symMap, [symMapKey2, symMapKey1]);

        assert.doesNotHaveAllKeys(symMap, [symMapKey1, symMapKey3]);
        assert.doesNotHaveAnyKeys(symMap, [symMapKey3]);
      }

      var errMap = new Map();

      errMap.set({1: 20}, 'number');

      err(function(){
        assert.hasAllKeys(errMap, []);
      }, "keys required");

      err(function(){
        assert.containsAllKeys(errMap, []);
      }, "keys required");

      err(function(){
        assert.doesNotHaveAllKeys(errMap, []);
      }, "keys required");

      err(function(){
        assert.hasAnyKeys(errMap, []);
      }, "keys required");

      err(function(){
        assert.doesNotHaveAnyKeys(errMap, []);
      }, "keys required");

      // Uncomment this after solving https://github.com/chaijs/chai/issues/662
      // This should fail because of referential equality (this is a strict comparison)
      // err(function(){
      //   assert.containsAllKeys(new Map([[{foo: 1}, 'bar']]), { foo: 1 });
      // }, 'expected [ [ { foo: 1 }, 'bar' ] ] to contain key { foo: 1 }');

      // err(function(){
      //   assert.containsAllDeepKeys(new Map([[{foo: 1}, 'bar']]), { iDoNotExist: 0 })
      // }, 'expected [ { foo: 1 } ] to deeply contain key { iDoNotExist: 0 }');
    }

    if (typeof Set !== 'undefined') {
      // Not using Set constructor args because not supported in IE 11.
      var aKey = {thisIs: 'anExampleObject'}
        , anotherKey = {doingThisBecauseOf: 'referential equality'}
        , testSet = new Set();

      testSet.add(aKey);
      testSet.add(anotherKey);

      assert.hasAnyKeys(testSet, [ aKey ]);
      assert.hasAnyKeys(testSet, [ 20, 1, aKey ]);
      assert.hasAllKeys(testSet, [ aKey, anotherKey ]);

      assert.containsAllKeys(testSet, [ aKey ]);
      assert.doesNotHaveAllKeys(testSet, [ aKey, {iDoNot: 'exist'} ]);

      assert.doesNotHaveAnyKeys(testSet, [ {iDoNot: 'exist'} ]);
      assert.doesNotHaveAnyKeys(testSet, [ 'thisDoesNotExist', 'thisToo', {iDoNot: 'exist'} ]);
      assert.doesNotHaveAllKeys(testSet, [ 'thisDoesNotExist', 'thisToo', anotherKey ]);

      assert.doesNotHaveAnyKeys(testSet, [ {iDoNot: 'exist'}, 'thisDoesNotExist' ]);
      assert.doesNotHaveAnyKeys(testSet, [ 20, 1, {iDoNot: 'exist'} ]);
      assert.doesNotHaveAllKeys(testSet, [ 'thisDoesNotExist', 'thisToo', {iDoNot: 'exist'} ]);

      // Ensure the assertions above use strict equality
      assert.doesNotHaveAnyKeys(testSet, {thisIs: 'anExampleObject'});
      assert.doesNotHaveAllKeys(testSet, [ {thisIs: 'anExampleObject'}, {doingThisBecauseOf: 'referential equality'} ]);

      err(function(){
        assert.hasAnyKeys(testSet, [ {thisIs: 'anExampleObject'} ]);
      });

      err(function(){
        assert.hasAllKeys(testSet, [ {thisIs: 'anExampleObject'}, {doingThisBecauseOf: 'referential equality'} ]);
      });

      err(function(){
        assert.containsAllKeys(testSet, [ {thisIs: 'anExampleObject'} ]);
      });

      // Tests for the deep variations of the keys assertion
      assert.hasAnyDeepKeys(testSet, {thisIs: 'anExampleObject'});
      assert.hasAnyDeepKeys(testSet, [{thisIs: 'anExampleObject'}, {three: 'three'}]);
      assert.hasAnyDeepKeys(testSet, [{thisIs: 'anExampleObject'}, {doingThisBecauseOf: 'referential equality'}]);

      assert.hasAllDeepKeys(testSet, [{thisIs: 'anExampleObject'}, {doingThisBecauseOf: 'referential equality'}]);

      assert.containsAllDeepKeys(testSet, {thisIs: 'anExampleObject'});
      assert.containsAllDeepKeys(testSet, [{thisIs: 'anExampleObject'}, {doingThisBecauseOf: 'referential equality'}]);

      assert.doesNotHaveAnyDeepKeys(testSet, {twenty: 'twenty'});
      assert.doesNotHaveAnyDeepKeys(testSet, [{twenty: 'twenty'}, {fifty: 'fifty'}]);

      assert.doesNotHaveAllDeepKeys(testSet, {twenty: 'twenty'});
      assert.doesNotHaveAllDeepKeys(testSet, [{thisIs: 'anExampleObject'}, {fifty: 'fifty'}]);

      var weirdSetKey1 = Object.create(null)
        , weirdSetKey2 = {toString: NaN}
        , weirdSetKey3 = []
        , weirdSet = new Set();

      weirdSet.add(weirdSetKey1);
      weirdSet.add(weirdSetKey2);

      assert.hasAllKeys(weirdSet, [weirdSetKey1, weirdSetKey2]);
      assert.doesNotHaveAllKeys(weirdSet, [weirdSetKey1, weirdSetKey3]);

      if (typeof Symbol === 'function') {
        var symSetKey1 = Symbol()
          , symSetKey2 = Symbol()
          , symSetKey3 = Symbol()
          , symSet = new Set();

        symSet.add(symSetKey1);
        symSet.add(symSetKey2);

        assert.hasAllKeys(symSet, [symSetKey1, symSetKey2]);
        assert.hasAnyKeys(symSet, [symSetKey1, symSetKey3]);
        assert.containsAllKeys(symSet, [symSetKey2, symSetKey1]);

        assert.doesNotHaveAllKeys(symSet, [symSetKey1, symSetKey3]);
        assert.doesNotHaveAnyKeys(symSet, [symSetKey3]);
      }

      var errSet = new Set();

      errSet.add({1: 20});
      errSet.add('number');

      err(function(){
        assert.hasAllKeys(errSet, []);
      }, "keys required");

      err(function(){
        assert.containsAllKeys(errSet, []);
      }, "keys required");

      err(function(){
        assert.doesNotHaveAllKeys(errSet, []);
      }, "keys required");

      err(function(){
        assert.hasAnyKeys(errSet, []);
      }, "keys required");

      err(function(){
        assert.doesNotHaveAnyKeys(errSet, []);
      }, "keys required");

      // Uncomment this after solving https://github.com/chaijs/chai/issues/662
      // This should fail because of referential equality (this is a strict comparison)
      // err(function(){
      //   assert.containsAllKeys(new Set([{foo: 1}]), { foo: 1 });
      // }, 'expected [ [ { foo: 1 }, 'bar' ] ] to contain key { foo: 1 }');

      // err(function(){
      //   assert.containsAllDeepKeys(new Set([{foo: 1}]), { iDoNotExist: 0 })
      // }, 'expected [ { foo: 1 } ] to deeply contain key { iDoNotExist: 0 }');
    }

    err(function(){
      assert.hasAllKeys({ foo: 1 }, []);
    }, "keys required");

    err(function(){
      assert.containsAllKeys({ foo: 1 }, []);
    }, "keys required");

    err(function(){
      assert.doesNotHaveAllKeys({ foo: 1 }, []);
    }, "keys required");

    err(function(){
      assert.hasAnyKeys({ foo: 1 }, []);
    }, "keys required");

    err(function(){
      assert.doesNotHaveAnyKeys({ foo: 1 }, []);
    }, "keys required");

    err(function(){
      assert.hasAllKeys({ foo: 1 }, ['bar']);
    }, "expected { foo: 1 } to have key 'bar'");

    err(function(){
      assert.hasAllKeys({ foo: 1 }, ['bar', 'baz']);
    }, "expected { foo: 1 } to have keys 'bar', and 'baz'");

    err(function(){
      assert.hasAllKeys({ foo: 1 }, ['foo', 'bar', 'baz']);
    }, "expected { foo: 1 } to have keys 'foo', 'bar', and 'baz'");

    err(function(){
      assert.doesNotHaveAllKeys({ foo: 1 }, ['foo']);
    }, "expected { foo: 1 } to not have key 'foo'");

    err(function(){
      assert.doesNotHaveAllKeys({ foo: 1, bar: 2 }, ['foo', 'bar']);
    }, "expected { foo: 1, bar: 2 } to not have keys 'foo', and 'bar'");

    err(function(){
      assert.hasAllKeys({ foo: 1, bar: 2 }, ['foo']);
    }, "expected { foo: 1, bar: 2 } to have key 'foo'");

    err(function(){
      assert.containsAllKeys({ foo: 1 }, ['foo', 'bar']);
    }, "expected { foo: 1 } to contain keys 'foo', and 'bar'");

    err(function() {
      assert.hasAnyKeys({ foo: 1 }, ['baz']);
    }, "expected { foo: 1 } to have key 'baz'");

    err(function(){
      assert.doesNotHaveAllKeys({ foo: 1, bar: 2 }, ['foo', 'bar']);
    }, "expected { foo: 1, bar: 2 } to not have keys 'foo', and 'bar'");

    err(function(){
      assert.doesNotHaveAnyKeys({ foo: 1, bar: 2 }, ['foo', 'baz']);
    }, "expected { foo: 1, bar: 2 } to not have keys 'foo', or 'baz'");

    // repeat previous tests with Object as arg.
    err(function(){
      assert.hasAllKeys({ foo: 1 }, { 'bar': 1 });
    }, "expected { foo: 1 } to have key 'bar'");

    err(function(){
      assert.hasAllKeys({ foo: 1 }, { 'bar': 1, 'baz': 1});
    }, "expected { foo: 1 } to have keys 'bar', and 'baz'");

    err(function(){
      assert.hasAllKeys({ foo: 1 }, { 'foo': 1, 'bar': 1, 'baz': 1});
    }, "expected { foo: 1 } to have keys 'foo', 'bar', and 'baz'");

    err(function(){
      assert.doesNotHaveAllKeys({ foo: 1 }, { 'foo': 1 });
    }, "expected { foo: 1 } to not have key 'foo'");

    err(function(){
      assert.doesNotHaveAllKeys({ foo: 1 }, { 'foo': 1 });
    }, "expected { foo: 1 } to not have key 'foo'");

    err(function(){
      assert.doesNotHaveAllKeys({ foo: 1, bar: 2 }, { 'foo': 1, 'bar': 1});
    }, "expected { foo: 1, bar: 2 } to not have keys 'foo', and 'bar'");

    err(function() {
      assert.hasAnyKeys({ foo: 1 }, 'baz');
    }, "expected { foo: 1 } to have key 'baz'");

    err(function(){
      assert.doesNotHaveAllKeys({ foo: 1, bar: 2 }, { 'foo': 1, 'bar': 1});
    }, "expected { foo: 1, bar: 2 } to not have keys 'foo', and 'bar'");

    err(function(){
      assert.doesNotHaveAnyKeys({ foo: 1, bar: 2 }, { 'foo': 1, 'baz': 1});
    }, "expected { foo: 1, bar: 2 } to not have keys 'foo', or 'baz'");
  });

  it('lengthOf', function() {
    assert.lengthOf([1,2,3], 3);
    assert.lengthOf('foobar', 6);

    err(function () {
      assert.lengthOf('foobar', 5);
     }, "expected 'foobar' to have a length of 5 but got 6");

    err(function () {
      assert.lengthOf(1, 5);
     }, "expected 1 to have property \'length\'");
  });

  it('match', function () {
    assert.match('foobar', /^foo/);
    assert.notMatch('foobar', /^bar/);

    err(function () {
      assert.match('foobar', /^bar/i);
    }, "expected 'foobar' to match /^bar/i");

    err(function () {
      assert.notMatch('foobar', /^foo/i);
    }, "expected 'foobar' not to match /^foo/i");
  });

  it('property', function () {
    var obj = { foo: { bar: 'baz' } };
    var simpleObj = { foo: 'bar' };
    var undefinedKeyObj = { foo: undefined };
    assert.property(obj, 'foo');
    assert.property(obj, 'toString');
    assert.propertyVal(obj, 'toString', Object.prototype.toString);
    assert.property(undefinedKeyObj, 'foo');
    assert.propertyVal(undefinedKeyObj, 'foo', undefined);
    assert.nestedProperty(obj, 'foo.bar');
    assert.notProperty(obj, 'baz');
    assert.notProperty(obj, 'foo.bar');
    assert.notPropertyVal(simpleObj, 'foo', 'flow');
    assert.notPropertyVal(simpleObj, 'flow', 'bar');
    assert.notPropertyVal(obj, 'foo', {bar: 'baz'});
    assert.notNestedProperty(obj, 'foo.baz');
    assert.nestedPropertyVal(obj, 'foo.bar', 'baz');
    assert.notNestedPropertyVal(obj, 'foo.bar', 'flow');
    assert.notNestedPropertyVal(obj, 'foo.flow', 'baz');

    err(function () {
      assert.property(obj, 'baz');
    }, "expected { foo: { bar: 'baz' } } to have property 'baz'");

    err(function () {
      assert.nestedProperty(obj, 'foo.baz');
    }, "expected { foo: { bar: 'baz' } } to have nested property 'foo.baz'");

    err(function () {
      assert.notProperty(obj, 'foo');
    }, "expected { foo: { bar: 'baz' } } to not have property 'foo'");

    err(function () {
      assert.notNestedProperty(obj, 'foo.bar');
    }, "expected { foo: { bar: 'baz' } } to not have nested property 'foo.bar'");

    err(function () {
      assert.propertyVal(simpleObj, 'foo', 'ball');
    }, "expected { foo: 'bar' } to have property 'foo' of 'ball', but got 'bar'");

    err(function () {
      assert.propertyVal(simpleObj, 'foo', undefined);
    }, "expected { foo: 'bar' } to have property 'foo' of undefined, but got 'bar'");

    err(function () {
      assert.nestedPropertyVal(obj, 'foo.bar', 'ball');
    }, "expected { foo: { bar: 'baz' } } to have nested property 'foo.bar' of 'ball', but got 'baz'");

    err(function () {
      assert.notPropertyVal(simpleObj, 'foo', 'bar');
    }, "expected { foo: 'bar' } to not have property 'foo' of 'bar'");

    err(function () {
      assert.notNestedPropertyVal(obj, 'foo.bar', 'baz');
    }, "expected { foo: { bar: 'baz' } } to not have nested property 'foo.bar' of 'baz'");
  });

  it('deepPropertyVal', function () {
    var obj = {a: {b: 1}};
    assert.deepPropertyVal(obj, 'a', {b: 1});
    assert.notDeepPropertyVal(obj, 'a', {b: 7});
    assert.notDeepPropertyVal(obj, 'a', {z: 1});
    assert.notDeepPropertyVal(obj, 'z', {b: 1});

    err(function () {
      assert.deepPropertyVal(obj, 'a', {b: 7}, 'blah');
    }, "blah: expected { a: { b: 1 } } to have deep property 'a' of { b: 7 }, but got { b: 1 }");

    err(function () {
      assert.deepPropertyVal(obj, 'z', {b: 1}, 'blah');
    }, "blah: expected { a: { b: 1 } } to have deep property 'z'");

    err(function () {
      assert.notDeepPropertyVal(obj, 'a', {b: 1}, 'blah');
    }, "blah: expected { a: { b: 1 } } to not have deep property 'a' of { b: 1 }");
  });

  it('ownProperty', function() {
    var coffeeObj = { coffee: 'is good' };

    // This has length = 17
    var teaObj = 'but tea is better';

    assert.ownProperty(coffeeObj, 'coffee');
    assert.ownProperty(teaObj, 'length');

    assert.ownPropertyVal(coffeeObj, 'coffee', 'is good');
    assert.ownPropertyVal(teaObj, 'length', 17);

    assert.notOwnProperty(coffeeObj, 'length');
    assert.notOwnProperty(coffeeObj, 'toString');
    assert.notOwnProperty(teaObj, 'calories');

    assert.notOwnPropertyVal(coffeeObj, 'coffee', 'is bad');
    assert.notOwnPropertyVal(teaObj, 'length', 1);
    assert.notOwnPropertyVal(coffeeObj, 'toString', Object.prototype.toString);
    assert.notOwnPropertyVal({a: {b: 1}}, 'a', {b: 1});

    err(function () {
      assert.ownProperty(coffeeObj, 'calories');
    }, "expected { coffee: 'is good' } to have own property 'calories'");

    err(function () {
      assert.notOwnProperty(coffeeObj, 'coffee');
    }, "expected { coffee: 'is good' } to not have own property 'coffee'");

    err(function () {
      assert.ownPropertyVal(teaObj, 'length', 1);
    }, "expected 'but tea is better' to have own property 'length' of 1, but got 17");

    err(function () {
      assert.notOwnPropertyVal(teaObj, 'length', 17);
    }, "expected 'but tea is better' to not have own property 'length' of 17");

    err(function () {
      assert.ownPropertyVal(teaObj, 'calories', 17);
    }, "expected 'but tea is better' to have own property 'calories'");

    err(function () {
      assert.ownPropertyVal(teaObj, 'calories', 17);
    }, "expected 'but tea is better' to have own property 'calories'");
  });

  it('deepOwnPropertyVal', function () {
    var obj = {a: {b: 1}};
    assert.deepOwnPropertyVal(obj, 'a', {b: 1});
    assert.notDeepOwnPropertyVal(obj, 'a', {z: 1});
    assert.notDeepOwnPropertyVal(obj, 'a', {b: 7});
    assert.notDeepOwnPropertyVal(obj, 'toString', Object.prototype.toString);

    err(function () {
      assert.deepOwnPropertyVal(obj, 'a', {z: 7}, 'blah');
    }, "blah: expected { a: { b: 1 } } to have deep own property 'a' of { z: 7 }, but got { b: 1 }");

    err(function () {
      assert.deepOwnPropertyVal(obj, 'z', {b: 1}, 'blah');
    }, "blah: expected { a: { b: 1 } } to have deep own property 'z'");

    err(function () {
      assert.notDeepOwnPropertyVal(obj, 'a', {b: 1}, 'blah');
    }, "blah: expected { a: { b: 1 } } to not have deep own property 'a' of { b: 1 }");
  });

  it('deepNestedPropertyVal', function () {
    var obj = {a: {b: {c: 1}}};
    assert.deepNestedPropertyVal(obj, 'a.b', {c: 1});
    assert.notDeepNestedPropertyVal(obj, 'a.b', {c: 7});
    assert.notDeepNestedPropertyVal(obj, 'a.b', {z: 1});
    assert.notDeepNestedPropertyVal(obj, 'a.z', {c: 1});

    err(function () {
      assert.deepNestedPropertyVal(obj, 'a.b', {c: 7}, 'blah');
    }, "blah: expected { a: { b: { c: 1 } } } to have deep nested property 'a.b' of { c: 7 }, but got { c: 1 }");

    err(function () {
      assert.deepNestedPropertyVal(obj, 'a.z', {c: 1}, 'blah');
    }, "blah: expected { a: { b: { c: 1 } } } to have deep nested property 'a.z'");

    err(function () {
      assert.notDeepNestedPropertyVal(obj, 'a.b', {c: 1}, 'blah');
    }, "blah: expected { a: { b: { c: 1 } } } to not have deep nested property 'a.b' of { c: 1 }");
  });

  it('throws / throw / Throw', function() {
    ['throws', 'throw', 'Throw'].forEach(function (throws) {
      assert[throws](function() { throw new Error('foo'); });
      assert[throws](function() { throw new Error(''); }, '');
      assert[throws](function() { throw new Error('bar'); }, 'bar');
      assert[throws](function() { throw new Error('bar'); }, /bar/);
      assert[throws](function() { throw new Error('bar'); }, Error);
      assert[throws](function() { throw new Error('bar'); }, Error, 'bar');
      assert[throws](function() { throw new Error(''); }, Error, '');
      assert[throws](function() { throw new Error('foo') }, '');

      var thrownErr = assert[throws](function() { throw new Error('foo'); });
      assert(thrownErr instanceof Error, 'assert.' + throws + ' returns error');
      assert(thrownErr.message === 'foo', 'assert.' + throws + ' returns error message');

      err(function () {
        assert[throws](function() { throw new Error('foo') }, TypeError);
      }, "expected [Function] to throw 'TypeError' but 'Error: foo' was thrown")

      err(function () {
        assert[throws](function() { throw new Error('foo') }, 'bar');
      }, "expected [Function] to throw error including 'bar' but got 'foo'")

      err(function () {
        assert[throws](function() { throw new Error('foo') }, Error, 'bar');
      }, "expected [Function] to throw error including 'bar' but got 'foo'")

      err(function () {
        assert[throws](function() { throw new Error('foo') }, TypeError, 'bar');
      }, "expected [Function] to throw 'TypeError' but 'Error: foo' was thrown")

      err(function () {
        assert[throws](function() {});
      }, "expected [Function] to throw an error");

      err(function () {
        assert[throws](function() { throw new Error('') }, 'bar');
      }, "expected [Function] to throw error including 'bar' but got ''");

      err(function () {
        assert[throws](function() { throw new Error('') }, /bar/);
      }, "expected [Function] to throw error matching /bar/ but got ''");
    });
  });

  it('doesNotThrow', function() {
    function CustomError(message) {
        this.name = 'CustomError';
        this.message = message;
    }
    CustomError.prototype = Object.create(Error.prototype);

    assert.doesNotThrow(function() { });
    assert.doesNotThrow(function() { }, 'foo');
    assert.doesNotThrow(function() { }, '');

    assert.doesNotThrow(function() {
      throw new Error('This is a message');
    }, TypeError);

    assert.doesNotThrow(function() {
      throw new Error('This is a message');
    }, 'Another message');

    assert.doesNotThrow(function() {
      throw new Error('This is a message');
    }, /Another message/);

    assert.doesNotThrow(function() {
      throw new Error('This is a message');
    }, Error, 'Another message');

    assert.doesNotThrow(function() {
      throw new Error('This is a message');
    }, Error, /Another message/);

    assert.doesNotThrow(function() {
      throw new Error('This is a message');
    }, TypeError, 'Another message');

    assert.doesNotThrow(function() {
      throw new Error('This is a message');
    }, TypeError, /Another message/);

    err(function () {
      assert.doesNotThrow(function() { throw new Error('foo'); });
    }, "expected [Function] to not throw an error but 'Error: foo' was thrown");

    err(function () {
      assert.doesNotThrow(function() { throw new CustomError('foo'); });
    }, "expected [Function] to not throw an error but 'CustomError: foo' was thrown");

    err(function () {
      assert.doesNotThrow(function() { throw new Error('foo'); }, Error);
    }, "expected [Function] to not throw 'Error' but 'Error: foo' was thrown");

    err(function () {
      assert.doesNotThrow(function() { throw new CustomError('foo'); }, CustomError);
    }, "expected [Function] to not throw 'CustomError' but 'CustomError: foo' was thrown");

    err(function () {
      assert.doesNotThrow(function() { throw new Error('foo'); }, 'foo');
    }, "expected [Function] to throw error not including 'foo'");

    err(function () {
      assert.doesNotThrow(function() { throw new Error('foo'); }, /foo/);
    }, "expected [Function] to throw error not matching /foo/");

    err(function () {
      assert.doesNotThrow(function() { throw new Error('foo'); }, Error, 'foo');
    }, "expected [Function] to not throw 'Error' but 'Error: foo' was thrown");

    err(function () {
      assert.doesNotThrow(function() { throw new CustomError('foo'); }, CustomError, 'foo');
    }, "expected [Function] to not throw 'CustomError' but 'CustomError: foo' was thrown");

    err(function () {
      assert.doesNotThrow(function() { throw new Error(''); }, '');
    }, "expected [Function] to throw error not including ''");

    err(function () {
      assert.doesNotThrow(function() { throw new Error(''); }, Error, '');
    }, "expected [Function] to not throw 'Error' but 'Error' was thrown");
  });

  it('ifError', function() {
    assert.ifError(false);
    assert.ifError(null);
    assert.ifError(undefined);

    err(function () {
      var err = new Error('This is an error message');
      assert.ifError(err);
     }, 'This is an error message');
  });

  it('operator', function() {
    // For testing undefined and null with == and ===
    var w;

    assert.operator(1, '<', 2);
    assert.operator(2, '>', 1);
    assert.operator(1, '==', 1);
    assert.operator(1, '<=', 1);
    assert.operator(1, '>=', 1);
    assert.operator(1, '!=', 2);
    assert.operator(1, '!==', 2);
    assert.operator(1, '!==', '1');
    assert.operator(w, '==', undefined);
    assert.operator(w, '===', undefined);
    assert.operator(w, '==', null);

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
      assert.operator(1, '===', '1');
     }, "expected 1 to be === \'1\'");

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
      assert.operator(1, '!==', 1);
     }, "expected 1 to be !== 1");

    err(function () {
      assert.operator(w, '===', null);
     }, "expected undefined to be === null");


  });

  it('closeTo', function(){
    assert.closeTo(1.5, 1.0, 0.5);
    assert.closeTo(10, 20, 20);
    assert.closeTo(-10, 20, 30);

    err(function(){
      assert.closeTo(2, 1.0, 0.5);
    }, "expected 2 to be close to 1 +/- 0.5");

    err(function(){
      assert.closeTo(-10, 20, 29);
    }, "expected -10 to be close to 20 +/- 29");

    err(function() {
      assert.closeTo([1.5], 1.0, 0.5);
    }, "expected [ 1.5 ] to be a number");

    err(function() {
      assert.closeTo(1.5, "1.0", 0.5);
    }, "the arguments to closeTo or approximately must be numbers");

    err(function() {
      assert.closeTo(1.5, 1.0, true);
    }, "the arguments to closeTo or approximately must be numbers");
  });

  it('approximately', function(){
    assert.approximately(1.5, 1.0, 0.5);
    assert.approximately(10, 20, 20);
    assert.approximately(-10, 20, 30);

    err(function(){
      assert.approximately(2, 1.0, 0.5);
    }, "expected 2 to be close to 1 +/- 0.5");

    err(function(){
      assert.approximately(-10, 20, 29);
    }, "expected -10 to be close to 20 +/- 29");

    err(function() {
      assert.approximately([1.5], 1.0, 0.5);
    }, "expected [ 1.5 ] to be a number");

    err(function() {
      assert.approximately(1.5, "1.0", 0.5);
    }, "the arguments to closeTo or approximately must be numbers");

    err(function() {
      assert.approximately(1.5, 1.0, true);
    }, "the arguments to closeTo or approximately must be numbers");
  });

  it('sameMembers', function() {
    assert.sameMembers([], []);
    assert.sameMembers([1, 2, 3], [3, 2, 1]);
    assert.sameMembers([4, 2], [4, 2]);
    assert.sameMembers([4, 2, 2], [4, 2, 2]);

    err(function() {
      assert.sameMembers([], [1, 2]);
    }, 'expected [] to have the same members as [ 1, 2 ]');

    err(function() {
      assert.sameMembers([1, 54], [6, 1, 54]);
    }, 'expected [ 1, 54 ] to have the same members as [ 6, 1, 54 ]');
  });

  it('notSameMembers', function() {
    assert.notSameMembers([1, 2, 3], [2, 1, 5]);
    assert.notSameMembers([1, 2, 3], [1, 2, 3, 3]);
    assert.notSameMembers([1, 2], [1, 2, 2]);
    assert.notSameMembers([1, 2, 2], [1, 2]);
    assert.notSameMembers([1, 2, 2], [1, 2, 3]);
    assert.notSameMembers([1, 2, 3], [1, 2, 2]);
    assert.notSameMembers([{a: 1}], [{a: 1}]);

    err(function() {
      assert.notSameMembers([1, 2, 3], [2, 1, 3]);
    }, 'expected [ 1, 2, 3 ] to not have the same members as [ 2, 1, 3 ]');
  });

  it('sameDeepMembers', function() {
    assert.sameDeepMembers([ {b: 3}, {a: 2}, {c: 5} ], [ {c: 5}, {b: 3}, {a: 2} ], 'same deep members');
    assert.sameDeepMembers([ {b: 3}, {a: 2}, 5, "hello" ], [ "hello", 5, {b: 3}, {a: 2} ], 'same deep members');
    assert.sameDeepMembers([{a: 1}, {b: 2}, {b: 2}], [{a: 1}, {b: 2}, {b: 2}]);

    err(function() {
      assert.sameDeepMembers([ {b: 3} ], [ {c: 3} ])
    }, 'expected [ { b: 3 } ] to have the same members as [ { c: 3 } ]');

    err(function() {
      assert.sameDeepMembers([ {b: 3} ], [ {b: 5} ])
    }, 'expected [ { b: 3 } ] to have the same members as [ { b: 5 } ]');
  });

  it('notSameDeepMembers', function() {
    assert.notSameDeepMembers([{a: 1}, {b: 2}, {c: 3}], [{b: 2}, {a: 1}, {f: 5}]);
    assert.notSameDeepMembers([{a: 1}, {b: 2}], [{a: 1}, {b: 2}, {b: 2}]);
    assert.notSameDeepMembers([{a: 1}, {b: 2}, {b: 2}], [{a: 1}, {b: 2}]);
    assert.notSameDeepMembers([{a: 1}, {b: 2}, {b: 2}], [{a: 1}, {b: 2}, {c: 3}]);
    assert.notSameDeepMembers([{a: 1}, {b: 2}, {c: 3}], [{a: 1}, {b: 2}, {b: 2}]);

    err(function() {
      assert.notSameDeepMembers([{a: 1}, {b: 2}, {c: 3}], [{b: 2}, {a: 1}, {c: 3}]);
    }, 'expected [ { a: 1 }, { b: 2 }, { c: 3 } ] to not have the same members as [ { b: 2 }, { a: 1 }, { c: 3 } ]');
  });

  it('sameOrderedMembers', function() {
    assert.sameOrderedMembers([1, 2, 3], [1, 2, 3]);
    assert.sameOrderedMembers([1, 2, 2], [1, 2, 2]);

    err(function() {
      assert.sameOrderedMembers([1, 2, 3], [2, 1, 3]);
    }, 'expected [ 1, 2, 3 ] to have the same ordered members as [ 2, 1, 3 ]');
  });

  it('notSameOrderedMembers', function() {
    assert.notSameOrderedMembers([1, 2, 3], [2, 1, 3]);
    assert.notSameOrderedMembers([1, 2, 3], [1, 2]);
    assert.notSameOrderedMembers([1, 2], [1, 2, 2]);
    assert.notSameOrderedMembers([1, 2, 2], [1, 2]);
    assert.notSameOrderedMembers([1, 2, 2], [1, 2, 3]);
    assert.notSameOrderedMembers([1, 2, 3], [1, 2, 2]);

    err(function() {
      assert.notSameOrderedMembers([1, 2, 3], [1, 2, 3]);
    }, 'expected [ 1, 2, 3 ] to not have the same ordered members as [ 1, 2, 3 ]');
  });

  it('sameDeepOrderedMembers', function() {
    assert.sameDeepOrderedMembers([{a: 1}, {b: 2}, {c: 3}], [{a: 1}, {b: 2}, {c: 3}]);
    assert.sameDeepOrderedMembers([{a: 1}, {b: 2}, {b: 2}], [{a: 1}, {b: 2}, {b: 2}]);

    err(function() {
      assert.sameDeepOrderedMembers([{a: 1}, {b: 2}, {c: 3}], [{b: 2}, {a: 1}, {c: 3}]);
    }, 'expected [ { a: 1 }, { b: 2 }, { c: 3 } ] to have the same ordered members as [ { b: 2 }, { a: 1 }, { c: 3 } ]');
  });

  it('notSameDeepOrderedMembers', function() {
    assert.notSameDeepOrderedMembers([{a: 1}, {b: 2}, {c: 3}], [{b: 2}, {a: 1}, {c: 3}]);
    assert.notSameDeepOrderedMembers([{a: 1}, {b: 2}, {c: 3}], [{a: 1}, {b: 2}, {f: 5}]);
    assert.notSameDeepOrderedMembers([{a: 1}, {b: 2}], [{a: 1}, {b: 2}, {b: 2}]);
    assert.notSameDeepOrderedMembers([{a: 1}, {b: 2}, {b: 2}], [{a: 1}, {b: 2}]);
    assert.notSameDeepOrderedMembers([{a: 1}, {b: 2}, {b: 2}], [{a: 1}, {b: 2}, {c: 3}]);
    assert.notSameDeepOrderedMembers([{a: 1}, {b: 2}, {c: 3}], [{a: 1}, {b: 2}, {b: 2}]);

    err(function() {
      assert.notSameDeepOrderedMembers([{a: 1}, {b: 2}, {c: 3}], [{a: 1}, {b: 2}, {c: 3}]);
    }, 'expected [ { a: 1 }, { b: 2 }, { c: 3 } ] to not have the same ordered members as [ { a: 1 }, { b: 2 }, { c: 3 } ]');
  });

  it('includeMembers', function() {
    assert.includeMembers([1, 2, 3], [2, 3, 2]);
    assert.includeMembers([1, 2, 3], []);
    assert.includeMembers([1, 2, 3], [3]);

    err(function() {
      assert.includeMembers([5, 6], [7, 8]);
    }, 'expected [ 5, 6 ] to be a superset of [ 7, 8 ]');

    err(function() {
      assert.includeMembers([5, 6], [5, 6, 0]);
    }, 'expected [ 5, 6 ] to be a superset of [ 5, 6, 0 ]');
  });

  it('notIncludeMembers', function() {
    assert.notIncludeMembers([1, 2, 3], [5, 1]);
    assert.notIncludeMembers([{a: 1}], [{a: 1}]);

    err(function() {
      assert.notIncludeMembers([1, 2, 3], [2, 1]);
    }, 'expected [ 1, 2, 3 ] to not be a superset of [ 2, 1 ]');
  });

  it('includeDeepMembers', function() {
    assert.includeDeepMembers([{a:1}, {b:2}, {c:3}], [{c:3}, {b:2}]);
    assert.includeDeepMembers([{a:1}, {b:2}, {c:3}], []);
    assert.includeDeepMembers([{a:1}, {b:2}, {c:3}], [{c:3}]);
    assert.includeDeepMembers([{a:1}, {b:2}, {c:3}, {c:3}], [{c:3}, {c:3}]);
    assert.includeDeepMembers([{a:1}, {b:2}, {c:3}], [{c:3}, {c:3}]);

    err(function() {
      assert.includeDeepMembers([{e:5}, {f:6}], [{g:7}, {h:8}]);
    }, 'expected [ { e: 5 }, { f: 6 } ] to be a superset of [ { g: 7 }, { h: 8 } ]');

    err(function() {
      assert.includeDeepMembers([{e:5}, {f:6}], [{e:5}, {f:6}, {z:0}]);
    }, 'expected [ { e: 5 }, { f: 6 } ] to be a superset of [ { e: 5 }, { f: 6 }, { z: 0 } ]');
  });

  it('notIncludeDeepMembers', function() {
    assert.notIncludeDeepMembers([{a:1}, {b:2}, {c:3}], [{b:2}, {f:5}]);

    err(function() {
      assert.notIncludeDeepMembers([{a:1}, {b:2}, {c:3}], [{b:2}, {a:1}]);
    }, 'expected [ { a: 1 }, { b: 2 }, { c: 3 } ] to not be a superset of [ { b: 2 }, { a: 1 } ]');
  });

  it('includeOrderedMembers', function() {
    assert.includeOrderedMembers([1, 2, 3], [1, 2]);

    err(function() {
      assert.includeOrderedMembers([1, 2, 3], [2, 1]);
    }, 'expected [ 1, 2, 3 ] to be an ordered superset of [ 2, 1 ]');
  });

  it('notIncludeOrderedMembers', function() {
    assert.notIncludeOrderedMembers([1, 2, 3], [2, 1]);
    assert.notIncludeOrderedMembers([1, 2, 3], [2, 3]);
    assert.notIncludeOrderedMembers([1, 2, 3], [1, 2, 2]);

    err(function() {
      assert.notIncludeOrderedMembers([1, 2, 3], [1, 2]);
    }, 'expected [ 1, 2, 3 ] to not be an ordered superset of [ 1, 2 ]');
  });

  it('includeDeepOrderedMembers', function() {
    assert.includeDeepOrderedMembers([{a: 1}, {b: 2}, {c: 3}], [{a: 1}, {b: 2}]);

    err(function() {
      assert.includeDeepOrderedMembers([{a: 1}, {b: 2}, {c: 3}], [{b: 2}, {a: 1}]);
    }, 'expected [ { a: 1 }, { b: 2 }, { c: 3 } ] to be an ordered superset of [ { b: 2 }, { a: 1 } ]');
  });

  it('notIncludeDeepOrderedMembers', function() {
    assert.notIncludeDeepOrderedMembers([{a: 1}, {b: 2}, {c: 3}], [{b: 2}, {a: 1}]);
    assert.notIncludeDeepOrderedMembers([{a: 1}, {b: 2}, {c: 3}], [{a: 1}, {f: 5}]);
    assert.notIncludeDeepOrderedMembers([{a: 1}, {b: 2}, {c: 3}], [{a: 1}, {b: 2}, {b: 2}]);

    err(function() {
      assert.notIncludeDeepOrderedMembers([{a: 1}, {b: 2}, {c: 3}], [{a: 1}, {b: 2}]);
    }, 'expected [ { a: 1 }, { b: 2 }, { c: 3 } ] to not be an ordered superset of [ { a: 1 }, { b: 2 } ]');
  });

  it('oneOf', function() {
    assert.oneOf(1, [1, 2, 3]);

    var three = [3];
    assert.oneOf(three, [1, 2, three]);

    var four = { four: 4 };
    assert.oneOf(four, [1, 2, four]);

    err(function() {
      assert.oneOf(1, 1);
    }, 'expected 1 to be an array');

    err(function() {
      assert.oneOf(1, { a: 1 });
    }, 'expected { a: 1 } to be an array');

    err(function() {
      assert.oneOf(9, [1, 2, 3], 'Message');
    }, 'Message: expected 9 to be one of [ 1, 2, 3 ]');

    err(function() {
      assert.oneOf([3], [1, 2, [3]]);
    }, 'expected [ 3 ] to be one of [ 1, 2, [ 3 ] ]');

    err(function() {
      assert.oneOf({ four: 4 }, [1, 2, { four: 4 }]);
    }, 'expected { four: 4 } to be one of [ 1, 2, { four: 4 } ]');

  });

  it('above', function() {
    assert.isAbove(5, 2, '5 should be above 2');

    err(function() {
      assert.isAbove(1, 3);
    }, 'expected 1 to be above 3');

    err(function() {
      assert.isAbove(1, 1);
    }, 'expected 1 to be above 1');

    err(function() {
      assert.isAbove(null, 1);
    }, 'expected null to be a number');

    err(function() {
      assert.isAbove(1, null);
    }, 'the argument to above must be a number');
  });

  it('atLeast', function() {
    assert.isAtLeast(5, 2, '5 should be above 2');
    assert.isAtLeast(1, 1, '1 should be equal to 1');

    err(function() {
      assert.isAtLeast(1, 3);
    }, 'expected 1 to be at least 3');

    err(function() {
      assert.isAtLeast(null, 1);
    }, 'expected null to be a number');
    err(function() {
      assert.isAtLeast(1, null);
    }, 'the argument to least must be a number');
  });

  it('below', function() {
    assert.isBelow(2, 5, '2 should be below 5');

    err(function() {
      assert.isBelow(3, 1);
    }, 'expected 3 to be below 1');

    err(function() {
      assert.isBelow(1, 1);
    }, 'expected 1 to be below 1');

    err(function() {
      assert.isBelow(null, 1);
    }, 'expected null to be a number');

    err(function() {
      assert.isBelow(1, null);
    }, 'the argument to below must be a number');
  });

  it('atMost', function() {
    assert.isAtMost(2, 5, '2 should be below 5');
    assert.isAtMost(1, 1, '1 should be equal to 1');

    err(function() {
      assert.isAtMost(3, 1);
    }, 'expected 3 to be at most 1');

    err(function() {
      assert.isAtMost(null, 1);
    }, 'expected null to be a number');
    err(function() {
      assert.isAtMost(1, null);
    }, 'the argument to most must be a number');
  });

  it('change', function() {
    var obj = { value: 10, str: 'foo' },
        heroes = ['spiderman', 'superman'],
        fn     = function() { obj.value += 5 },
        fnDec  = function() { obj.value -= 20 },
        bangFn = function() { obj.str += '!' },
        smFn   = function() { 'foo' + 'bar' },
        batFn  = function() { heroes.push('batman') },
        lenFn  = function() { return heroes.length };

    assert.changes(fn, obj, 'value');
    assert.changesBy(fn, obj, 'value', 5);
    assert.changesBy(fn, obj, 'value', -5);
    assert.changesBy(fnDec, obj, 'value', 20);

    assert.doesNotChange(smFn, obj, 'value');
    assert.changesButNotBy(fnDec, obj, 'value', 1);

    assert.changes(bangFn, obj, 'str');

    assert.changesBy(batFn, lenFn, 1);
    assert.changesButNotBy(batFn, lenFn, 2);
  });

  it('increase, decrease', function() {
    var obj = { value: 10, noop: null },
        arr = ['one', 'two'],
        pFn   = function() { arr.push('three') },
        popFn = function() { arr.pop() },
        lenFn = function() { return arr.length },
        incFn = function() { obj.value += 2 },
        decFn = function() { obj.value -= 3 },
        smFn  = function() { obj.value += 0 };

    assert.decreases(decFn, obj, 'value');
    assert.doesNotDecrease(smFn, obj, 'value');
    assert.decreasesBy(decFn, obj, 'value', 3);
    assert.decreasesButNotBy(decFn, obj, 'value', 10);

    assert.increases(incFn, obj, 'value');
    assert.doesNotIncrease(smFn, obj, 'value');
    assert.increasesBy(incFn, obj, 'value', 2);
    assert.increasesButNotBy(incFn, obj, 'value', 1);

    assert.decreases(popFn, lenFn);
    assert.doesNotDecrease(pFn, lenFn);
    assert.decreasesBy(popFn, lenFn, 1);
    assert.decreasesButNotBy(popFn, lenFn, 2);

    assert.increases(pFn, lenFn);
    assert.doesNotIncrease(popFn, lenFn);
    assert.increasesBy(pFn, lenFn, 1);
    assert.increasesButNotBy(pFn, lenFn, 2);

    err(function() {
      assert.increases(incFn, obj, 'noop');
    }, 'expected null to be a number');
    err(function() {
      assert.decreases(incFn, obj, 'noop');
    }, 'expected null to be a number');
  });

  it('isExtensible / extensible', function() {
    ['isExtensible', 'extensible'].forEach(function (isExtensible) {
      var nonExtensibleObject = Object.preventExtensions({});

      assert[isExtensible]({});

      err(function() {
        assert[isExtensible](nonExtensibleObject);
      }, 'expected {} to be extensible');

      // Making sure ES6-like Object.isExtensible response is respected for all primitive types

      err(function() {
        assert[isExtensible](42);
      }, 'expected 42 to be extensible');

      err(function() {
        assert[isExtensible](null);
      }, 'expected null to be extensible');

      err(function() {
        assert[isExtensible]('foo');
      }, 'expected \'foo\' to be extensible');

      err(function() {
        assert[isExtensible](false);
      }, 'expected false to be extensible');

      err(function() {
        assert[isExtensible](undefined);
      }, 'expected undefined to be extensible');

      if (typeof Proxy === 'function') {
        var proxy = new Proxy({}, {
          isExtensible: function() {
            throw new TypeError();
          }
        });

        err(function() {
          // isExtensible should not suppress errors, thrown in proxy traps
          assert[isExtensible](proxy);
        }, { name: 'TypeError' });
      }
    });
  });

  it('isNotExtensible / notExtensible', function() {
    ['isNotExtensible', 'notExtensible'].forEach(function (isNotExtensible) {
      var nonExtensibleObject = Object.preventExtensions({});

      assert[isNotExtensible](nonExtensibleObject);

      err(function() {
        assert[isNotExtensible]({});
      }, 'expected {} to not be extensible');

      // Making sure ES6-like Object.isExtensible response is respected for all primitive types

      assert[isNotExtensible](42);
      assert[isNotExtensible](null);
      assert[isNotExtensible]('foo');
      assert[isNotExtensible](false);
      assert[isNotExtensible](undefined);

      if (typeof Symbol === 'function') {
        assert[isNotExtensible](Symbol());
      }

      if (typeof Proxy === 'function') {
        var proxy = new Proxy({}, {
          isExtensible: function() {
            throw new TypeError();
          }
        });

        err(function() {
          // isNotExtensible should not suppress errors, thrown in proxy traps
          assert[isNotExtensible](proxy);
        }, { name: 'TypeError' });
      }
    });
  });

  it('isSealed / sealed', function() {
    ['isSealed', 'sealed'].forEach(function (isSealed) {
      var sealedObject = Object.seal({});

      assert[isSealed](sealedObject);

      err(function() {
        assert[isSealed]({});
      }, 'expected {} to be sealed');

      // Making sure ES6-like Object.isSealed response is respected for all primitive types

      assert[isSealed](42);
      assert[isSealed](null);
      assert[isSealed]('foo');
      assert[isSealed](false);
      assert[isSealed](undefined);

      if (typeof Symbol === 'function') {
        assert[isSealed](Symbol());
      }

      if (typeof Proxy === 'function') {
        var proxy = new Proxy({}, {
          ownKeys: function() {
            throw new TypeError();
          }
        });

        // Object.isSealed will call ownKeys trap only if object is not extensible
        Object.preventExtensions(proxy);

        err(function() {
          // isSealed should not suppress errors, thrown in proxy traps
          assert[isSealed](proxy);
        }, { name: 'TypeError' });
      }
    });
  });

  it('isNotSealed / notSealed', function() {
    ['isNotSealed', 'notSealed'].forEach(function (isNotSealed) {
      var sealedObject = Object.seal({});

      assert[isNotSealed]({});

      err(function() {
        assert[isNotSealed](sealedObject);
      }, 'expected {} to not be sealed');

      // Making sure ES6-like Object.isSealed response is respected for all primitive types

      err(function() {
        assert[isNotSealed](42);
      }, 'expected 42 to not be sealed');

      err(function() {
        assert[isNotSealed](null);
      }, 'expected null to not be sealed');

      err(function() {
        assert[isNotSealed]('foo');
      }, 'expected \'foo\' to not be sealed');

      err(function() {
        assert[isNotSealed](false);
      }, 'expected false to not be sealed');

      err(function() {
        assert[isNotSealed](undefined);
      }, 'expected undefined to not be sealed');

      if (typeof Proxy === 'function') {
        var proxy = new Proxy({}, {
          ownKeys: function() {
            throw new TypeError();
          }
        });

        // Object.isSealed will call ownKeys trap only if object is not extensible
        Object.preventExtensions(proxy);

        err(function() {
          // isNotSealed should not suppress errors, thrown in proxy traps
          assert[isNotSealed](proxy);
        }, { name: 'TypeError' });
      }
    });
  });

  it('isFrozen / frozen', function() {
    ['isFrozen', 'frozen'].forEach(function (isFrozen) {
      var frozenObject = Object.freeze({});

      assert[isFrozen](frozenObject);

      err(function() {
        assert[isFrozen]({});
      }, 'expected {} to be frozen');

      // Making sure ES6-like Object.isFrozen response is respected for all primitive types

      assert[isFrozen](42);
      assert[isFrozen](null);
      assert[isFrozen]('foo');
      assert[isFrozen](false);
      assert[isFrozen](undefined);

      if (typeof Symbol === 'function') {
        assert[isFrozen](Symbol());
      }

      if (typeof Proxy === 'function') {
        var proxy = new Proxy({}, {
          ownKeys: function() {
            throw new TypeError();
          }
        });

        // Object.isFrozen will call ownKeys trap only if object is not extensible
        Object.preventExtensions(proxy);

        err(function() {
          // isFrozen should not suppress errors, thrown in proxy traps
          assert[isFrozen](proxy);
        }, { name: 'TypeError' });
      }
    });
  });

  it('isNotFrozen / notFrozen', function() {
    ['isNotFrozen', 'notFrozen'].forEach(function (isNotFrozen) {
      var frozenObject = Object.freeze({});

      assert[isNotFrozen]({});

      err(function() {
        assert[isNotFrozen](frozenObject);
      }, 'expected {} to not be frozen');

      // Making sure ES6-like Object.isFrozen response is respected for all primitive types

      err(function() {
        assert[isNotFrozen](42);
      }, 'expected 42 to not be frozen');

      err(function() {
        assert[isNotFrozen](null);
      }, 'expected null to not be frozen');

      err(function() {
        assert[isNotFrozen]('foo');
      }, 'expected \'foo\' to not be frozen');

      err(function() {
        assert[isNotFrozen](false);
      }, 'expected false to not be frozen');

      err(function() {
        assert[isNotFrozen](undefined);
      }, 'expected undefined to not be frozen');

      if (typeof Proxy === 'function') {
        var proxy = new Proxy({}, {
          ownKeys: function() {
            throw new TypeError();
          }
        });

        // Object.isFrozen will call ownKeys trap only if object is not extensible
        Object.preventExtensions(proxy);

        err(function() {
          // isNotFrozen should not suppress errors, thrown in proxy traps
          assert[isNotFrozen](proxy);
        }, { name: 'TypeError' });
      }
    });
  });

  it('isEmpty / empty', function() {
    ['isEmpty', 'empty'].forEach(function (isEmpty) {
      function FakeArgs() {};
      FakeArgs.prototype.length = 0;

      assert[isEmpty]('');
      assert[isEmpty]([]);
      assert[isEmpty](new FakeArgs);
      assert[isEmpty]({});

      if (typeof WeakMap === 'function') {
        err(function(){
          assert[isEmpty](new WeakMap);
        }, ".empty was passed a weak collection");
      }

      if (typeof WeakSet === 'function') {
        err(function(){
          assert[isEmpty](new WeakSet);
        }, ".empty was passed a weak collection");
      }

      if (typeof Map === 'function') {
        assert[isEmpty](new Map);

        var map = new Map;
        map.key = 'val';
        assert[isEmpty](map);
      }

      if (typeof Set === 'function') {
        assert[isEmpty](new Set);

        var set = new Set;
        set.key = 'val';
        assert[isEmpty](set);
      }

      err(function(){
        assert[isEmpty]('foo');
      }, "expected \'foo\' to be empty");

      err(function(){
        assert[isEmpty](['foo']);
      }, "expected [ \'foo\' ] to be empty");

      err(function(){
        assert[isEmpty]({arguments: 0});
      }, "expected { arguments: 0 } to be empty");

      err(function(){
        assert[isEmpty]({foo: 'bar'});
      }, "expected { foo: \'bar\' } to be empty");

      err(function(){
        assert[isEmpty](null);
      }, ".empty was passed non-string primitive null");

      err(function(){
        assert[isEmpty](undefined);
      }, ".empty was passed non-string primitive undefined");

      err(function(){
        assert[isEmpty]();
      }, ".empty was passed non-string primitive undefined");

      err(function(){
        assert[isEmpty](0);
      }, ".empty was passed non-string primitive 0");

      err(function(){
        assert[isEmpty](1);
      }, ".empty was passed non-string primitive 1");

      err(function(){
        assert[isEmpty](true);
      }, ".empty was passed non-string primitive true");

      err(function(){
        assert[isEmpty](false);
      }, ".empty was passed non-string primitive false");

      if (typeof Symbol !== 'undefined') {
        err(function(){
          assert[isEmpty](Symbol());
        }, ".empty was passed non-string primitive Symbol()");

        err(function(){
          assert[isEmpty](Symbol.iterator);
        }, ".empty was passed non-string primitive Symbol(Symbol.iterator)");
      }

      err(function(){
        assert[isEmpty](function() {});
      }, ".empty was passed a function");

      if (FakeArgs.name === 'FakeArgs') {
        err(function(){
          assert[isEmpty](FakeArgs);
        }, ".empty was passed a function FakeArgs");
      }
    });
  });

  it('isNotEmpty / notEmpty', function() {
    ['isNotEmpty', 'notEmpty'].forEach(function (isNotEmpty) {
      function FakeArgs() {};
      FakeArgs.prototype.length = 0;

      assert[isNotEmpty]('foo');
      assert[isNotEmpty](['foo']);
      assert[isNotEmpty]({arguments: 0});
      assert[isNotEmpty]({foo: 'bar'});

      if (typeof WeakMap === 'function') {
        err(function(){
          assert[isNotEmpty](new WeakMap);
        }, ".empty was passed a weak collection");
      }

      if (typeof WeakSet === 'function') {
        err(function(){
          assert[isNotEmpty](new WeakSet);
        }, ".empty was passed a weak collection");
      }

      if (typeof Map === 'function') {
        // Not using Map constructor args because not supported in IE 11.
        var map = new Map;
        map.set('a', 1);
        assert[isNotEmpty](map);

        err(function(){
          assert[isNotEmpty](new Map);
        }, "expected {} not to be empty");
      }

      if (typeof Set === 'function') {
        // Not using Set constructor args because not supported in IE 11.
        var set = new Set;
        set.add(1);
        assert[isNotEmpty](set);

        err(function(){
          assert[isNotEmpty](new Set);
        }, "expected {} not to be empty");
      }

      err(function(){
        assert[isNotEmpty]('');
      }, "expected \'\' not to be empty");

      err(function(){
        assert[isNotEmpty]([]);
      }, "expected [] not to be empty");

      err(function(){
        assert[isNotEmpty](new FakeArgs);
      }, "expected { length: 0 } not to be empty");

      err(function(){
        assert[isNotEmpty]({});
      }, "expected {} not to be empty");

      err(function(){
        assert[isNotEmpty](null);
      }, ".empty was passed non-string primitive null");

      err(function(){
        assert[isNotEmpty](undefined);
      }, ".empty was passed non-string primitive undefined");

      err(function(){
        assert[isNotEmpty]();
      }, ".empty was passed non-string primitive undefined");

      err(function(){
        assert[isNotEmpty](0);
      }, ".empty was passed non-string primitive 0");

      err(function(){
        assert[isNotEmpty](1);
      }, ".empty was passed non-string primitive 1");

      err(function(){
        assert[isNotEmpty](true);
      }, ".empty was passed non-string primitive true");

      err(function(){
        assert[isNotEmpty](false);
      }, ".empty was passed non-string primitive false");

      if (typeof Symbol !== 'undefined') {
        err(function(){
          assert[isNotEmpty](Symbol());
        }, ".empty was passed non-string primitive Symbol()");

        err(function(){
          assert[isNotEmpty](Symbol.iterator);
        }, ".empty was passed non-string primitive Symbol(Symbol.iterator)");
      }

      err(function(){
        assert[isNotEmpty](function() {});
      }, ".empty was passed a function");

      if (FakeArgs.name === 'FakeArgs') {
        err(function(){
          assert[isNotEmpty](FakeArgs);
        }, ".empty was passed a function FakeArgs");
      }
    });
  });

  it('showDiff true with actual and expected args', function() {
    try {
      new chai.Assertion().assert(
          'one' === 'two'
        , 'expected #{this} to equal #{exp}'
        , 'expected #{this} to not equal #{act}'
        , 'one'
        , 'two'
      );
    } catch(e) {
      assert.isTrue(e.showDiff);
    }
  });

  it('showDiff false without expected and actual', function() {
    try {
      new chai.Assertion().assert(
          'one' === 'two'
        , 'expected #{this} to equal #{exp}'
        , 'expected #{this} to not equal #{act}'
        , 'one'
        , 'two'
        , false
      );
    } catch(e) {
      assert.isFalse(e.showDiff);
    }
  });
});
