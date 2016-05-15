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
    assert.isNaN('hello');

    err(function (){
      assert.isNaN(4);
    }, "expected 4 to be NaN");
  });

  it('isNotNaN', function() {
    assert.isNotNaN(4);

    err(function (){
      assert.isNotNaN('hello');
    }, "expected 'hello' not to be NaN");
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
    assert.include({a:1, b:2}, {b:2});

    if (typeof Symbol === 'function') {
      var sym1 = Symbol()
        , sym2 = Symbol();
      assert.include([sym1, sym2], sym1);
    }

    err(function () {
      assert.include('foobar', 'baz');
    }, "expected \'foobar\' to include \'baz\'");

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

    if (typeof Symbol === 'function') {
      var sym1 = Symbol()
        , sym2 = Symbol()
        , sym3 = Symbol();
      assert.notInclude([sym1, sym2], sym3);
    }

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
        assert.hasAllKeys(errMap);
      }, "keys required");

      err(function(){
        assert.hasAllKeys(errMap, []);
      }, "keys required");

      err(function(){
        assert.containsAllKeys(errMap);
      }, "keys required");

      err(function(){
        assert.containsAllKeys(errMap, []);
      }, "keys required");

      err(function(){
        assert.doesNotHaveAllKeys(errMap);
      }, "keys required");

      err(function(){
        assert.doesNotHaveAllKeys(errMap, []);
      }, "keys required");

      err(function(){
        assert.hasAnyKeys(errMap);
      }, "keys required");

      err(function(){
        assert.hasAnyKeys(errMap, []);
      }, "keys required");

      err(function(){
        assert.doesNotHaveAnyKeys(errMap);
      }, "keys required");

      err(function(){
        assert.doesNotHaveAnyKeys(errMap, []);
      }, "keys required");
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
        assert.hasAllKeys(errSet);
      }, "keys required");

      err(function(){
        assert.hasAllKeys(errSet, []);
      }, "keys required");

      err(function(){
        assert.containsAllKeys(errSet);
      }, "keys required");

      err(function(){
        assert.containsAllKeys(errSet, []);
      }, "keys required");

      err(function(){
        assert.doesNotHaveAllKeys(errSet);
      }, "keys required");

      err(function(){
        assert.doesNotHaveAllKeys(errSet, []);
      }, "keys required");

      err(function(){
        assert.hasAnyKeys(errSet);
      }, "keys required");

      err(function(){
        assert.hasAnyKeys(errSet, []);
      }, "keys required");

      err(function(){
        assert.doesNotHaveAnyKeys(errSet);
      }, "keys required");

      err(function(){
        assert.doesNotHaveAnyKeys(errSet, []);
      }, "keys required");
    }

    err(function(){
      assert.hasAllKeys({ foo: 1 });
    }, "keys required");

    err(function(){
      assert.hasAllKeys({ foo: 1 }, []);
    }, "keys required");

    err(function(){
      assert.containsAllKeys({ foo: 1 });
    }, "keys required");

    err(function(){
      assert.containsAllKeys({ foo: 1 }, []);
    }, "keys required");

    err(function(){
      assert.doesNotHaveAllKeys({ foo: 1 });
    }, "keys required");

    err(function(){
      assert.doesNotHaveAllKeys({ foo: 1 }, []);
    }, "keys required");

    err(function(){
      assert.hasAnyKeys({ foo: 1 });
    }, "keys required");

    err(function(){
      assert.hasAnyKeys({ foo: 1 }, []);
    }, "keys required");

    err(function(){
      assert.doesNotHaveAnyKeys({ foo: 1 });
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
     }, "expected 1 to have a property \'length\'");
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
    assert.property(undefinedKeyObj, 'foo');
    assert.propertyVal(undefinedKeyObj, 'foo', undefined);
    assert.deepProperty(obj, 'foo.bar');
    assert.notProperty(obj, 'baz');
    assert.notProperty(obj, 'foo.bar');
    assert.notDeepProperty(obj, 'foo.baz');
    assert.deepPropertyVal(obj, 'foo.bar', 'baz');
    assert.deepPropertyNotVal(obj, 'foo.bar', 'flow');

    err(function () {
      assert.property(obj, 'baz');
    }, "expected { foo: { bar: 'baz' } } to have a property 'baz'");

    err(function () {
      assert.deepProperty(obj, 'foo.baz');
    }, "expected { foo: { bar: 'baz' } } to have a deep property 'foo.baz'");

    err(function () {
      assert.notProperty(obj, 'foo');
    }, "expected { foo: { bar: 'baz' } } to not have property 'foo'");

    err(function () {
      assert.notDeepProperty(obj, 'foo.bar');
    }, "expected { foo: { bar: 'baz' } } to not have deep property 'foo.bar'");

    err(function () {
      assert.propertyVal(simpleObj, 'foo', 'ball');
    }, "expected { foo: 'bar' } to have a property 'foo' of 'ball', but got 'bar'");

    err(function () {
      assert.propertyVal(simpleObj, 'foo', undefined);
    }, "expected { foo: 'bar' } to have a property 'foo' of undefined, but got 'bar'");

    err(function () {
      assert.deepPropertyVal(obj, 'foo.bar', 'ball');
    }, "expected { foo: { bar: 'baz' } } to have a deep property 'foo.bar' of 'ball', but got 'baz'");

    err(function () {
      assert.propertyNotVal(simpleObj, 'foo', 'bar');
    }, "expected { foo: 'bar' } to not have a property 'foo' of 'bar'");

    err(function () {
      assert.deepPropertyNotVal(obj, 'foo.bar', 'baz');
    }, "expected { foo: { bar: 'baz' } } to not have a deep property 'foo.bar' of 'baz'");
  });

  it('throws / throw / Throw', function() {
    ['throws', 'throw', 'Throw'].forEach(function (throws) {
      assert[throws](function() { throw new Error('foo'); });
      assert[throws](function() { throw new Error('bar'); }, 'bar');
      assert[throws](function() { throw new Error('bar'); }, /bar/);
      assert[throws](function() { throw new Error('bar'); }, Error);
      assert[throws](function() { throw new Error('bar'); }, Error, 'bar');

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
    CustomError.prototype = Error.prototype;

    assert.doesNotThrow(function() { });
    assert.doesNotThrow(function() { }, 'foo');

    err(function () {
      assert.doesNotThrow(function() { throw new Error('foo'); });
     }, "expected [Function] to not throw an error but 'Error: foo' was thrown");

    err(function () {
        assert.doesNotThrow(function() { throw new CustomError('foo'); });
    }, "expected [Function] to not throw an error but 'CustomError: foo' was thrown");
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

  it('members', function() {
    assert.includeMembers([1, 2, 3], [2, 3]);
    assert.includeMembers([1, 2, 3], []);
    assert.includeMembers([1, 2, 3], [3]);

    err(function() {
      assert.includeMembers([5, 6], [7, 8]);
    }, 'expected [ 5, 6 ] to be a superset of [ 7, 8 ]');

    err(function() {
      assert.includeMembers([5, 6], [5, 6, 0]);
    }, 'expected [ 5, 6 ] to be a superset of [ 5, 6, 0 ]');
  });

  it('memberEquals', function() {
    assert.sameMembers([], []);
    assert.sameMembers([1, 2, 3], [3, 2, 1]);
    assert.sameMembers([4, 2], [4, 2]);

    err(function() {
      assert.sameMembers([], [1, 2]);
    }, 'expected [] to have the same members as [ 1, 2 ]');

    err(function() {
      assert.sameMembers([1, 54], [6, 1, 54]);
    }, 'expected [ 1, 54 ] to have the same members as [ 6, 1, 54 ]');
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
  });

  it('atLeast', function() {
    assert.isAtLeast(5, 2, '5 should be above 2');
    assert.isAtLeast(1, 1, '1 should be equal to 1');

    err(function() {
      assert.isAtLeast(1, 3);
    }, 'expected 1 to be at least 3');
  });

  it('below', function() {
    assert.isBelow(2, 5, '2 should be below 5');

    err(function() {
      assert.isBelow(3, 1);
    }, 'expected 3 to be below 1');

    err(function() {
      assert.isBelow(1, 1);
    }, 'expected 1 to be below 1');

  });

  it('atMost', function() {
    assert.isAtMost(2, 5, '2 should be below 5');
    assert.isAtMost(1, 1, '1 should be equal to 1');

    err(function() {
      assert.isAtMost(3, 1);
    }, 'expected 3 to be at most 1');
  });

  it('memberDeepEquals', function() {
    assert.sameDeepMembers([ {b: 3}, {a: 2}, {c: 5} ], [ {c: 5}, {b: 3}, {a: 2} ], 'same deep members');
    assert.sameDeepMembers([ {b: 3}, {a: 2}, 5, "hello" ], [ "hello", 5, {b: 3}, {a: 2} ], 'same deep members');

    err(function() {
      assert.sameDeepMembers([ {b: 3} ], [ {c: 3} ])
    }, 'expected [ { b: 3 } ] to have the same members as [ { c: 3 } ]');

    err(function() {
      assert.sameDeepMembers([ {b: 3} ], [ {b: 5} ])
    }, 'expected [ { b: 3 } ] to have the same members as [ { b: 5 } ]');
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
    var obj = { value: 10 },
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
    });
  });
});
