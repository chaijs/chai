describe('should', function() {
  var should = chai.Should();

  it('assertion', function(){
    'test'.should.be.a('string');
    should.equal('foo', 'foo');
    should.not.equal('foo', 'bar');
  });

  it('no-op chains', function() {
    function test(chain) {
      // tests that chain exists
      ((1).should[chain]).should.not.undefined;

      // tests methods
      (1).should[chain].equal(1);

      // tests properties that assert
      (false).should[chain].false;

      // tests not
      (false).should[chain].not.true;

      // tests chainable methods
      [1, 2, 3].should[chain].contains(1);
    }

    [ 'to', 'be', 'been'
    , 'is', 'and', 'has', 'have'
    , 'with', 'that', 'which', 'at'
    , 'of', 'same', 'but', 'does' ].forEach(test);
  });

  it('fail', function () {
    err(function() {
      should.fail(0, 1, 'this has failed');
    }, 'this has failed');
  });

  it('root exist', function () {
    var foo = 'foo'
      , bar = undefined;
    should.exist(foo);
    should.not.exist(bar);

    err(function () {
      should.exist(bar, 'blah');
    }, "blah: expected undefined to exist");

    err(function () {
      should.not.exist(foo, 'blah');
    }, "blah: expected 'foo' to not exist")
  });

  it('root equal', function () {
    var value1 = 'value'
      , value2 = 'value'
      , foo = 'foo';
    should.equal(value1, value2);
    should.not.equal(value1, foo);

    err(function () {
      should.equal(value1, foo, 'blah');
    }, "blah: expected 'value' to equal 'foo'");

    err(function () {
      should.not.equal(value1, value2, 'blah');
    }, "blah: expected 'value' to not equal 'value'")
  });

  it('root Throw', function () {
    should.Throw(function() { throw new Error('error!') }, Error, 'error!');
    should.not.Throw(function () { });

    err(function () {
      should.Throw(function () { throw new Error('error!') }, Error, 'needed user!', 'blah');
    }, "blah: expected [Function] to throw error including 'needed user!' but got 'error!'");

    err(function () {
      should.not.Throw(function () { throw new Error('error!') }, Error, 'error!', 'blah');
    }, "blah: expected [Function] to not throw error including 'error!'");
  });

  it('true', function(){
    (true).should.be.true;
    false.should.not.be.true;
    (1).should.not.be.true;false
    false.should.have.been.false;

    err(function(){
      'test'.should.be.true;
    }, "expected 'test' to be true")
  });

  it('ok', function(){
    true.should.be.ok;
    false.should.not.be.ok;
    (1).should.be.ok;
    (0).should.not.be.ok;

    err(function(){
      ''.should.be.ok;
    }, "expected '' to be truthy");

    err(function(){
      'test'.should.not.be.ok;
    }, "expected 'test' to be falsy");
  });

  it('false', function(){
    false.should.be.false;
    true.should.not.be.false;
    (0).should.not.be.false;

    err(function(){
      ''.should.be.false;
    }, "expected '' to be false")
  });

  it('null', function(){
    (0).should.not.be.null;

    err(function(){
      ''.should.be.null;
    }, "expected '' to be null")
  });

  it('NaN', function(){
    'foo'.should.be.NaN;
    (4).should.not.be.NaN;

    err(function(){
      (4).should.be.NaN;
    }, "expected 4 to be NaN")
  });

  it('undefined', function(){
    (0).should.not.be.undefined;

    err(function(){
      ''.should.be.undefined;
    }, "expected '' to be undefined")
  });

  it('arguments', function(){
    var args = (function(){ return arguments; })(1,2,3);
    args.should.be.arguments;
    [].should.not.be.arguments;
  });

  it('.equal()', function(){
    var foo;
    should.equal(undefined, foo);
  });

  it('typeof', function(){
    'test'.should.be.a('string');

    err(function(){
      'test'.should.not.be.a('string');
    }, "expected 'test' not to be a string");

    (5).should.be.a('number');
    (new Number(1)).should.be.a('number');
    Number(1).should.be.a('number');
    (true).should.be.a('boolean');
    (new Array()).should.be.a('array');
    (new Object()).should.be.a('object');
    ({}).should.be.a('object');
    ([]).should.be.a('array');
    (function() {}).should.be.a('function');

    if (typeof Symbol === 'function') {
      Symbol().should.be.a('symbol');
    }

    (5).should.be.a('number');

    err(function(){
      (5).should.not.be.a('number');
    }, "expected 5 not to be a number");
  });

  it('instanceof', function(){
    function Foo(){}
    new Foo().should.be.an.instanceof(Foo);

    err(function(){
      (3).should.an.instanceof(Foo, 'blah');
    }, "blah: expected 3 to be an instance of Foo");
  });

  it('within(start, finish)', function(){
    (5).should.be.within(5, 10);
    (5).should.be.within(3,6);
    (5).should.be.within(3,5);
    (5).should.not.be.within(1,3);

    err(function(){
      (5).should.not.be.within(4,6, 'blah');
    }, "blah: expected 5 to not be within 4..6");

    err(function(){
      (10).should.be.within(50,100, 'blah');
    }, "blah: expected 10 to be within 50..100");

    err(function(){
      ({ foo: 1 }).should.have.length.within(50,100, 'blah');
    }, "blah: expected { foo: 1 } to have a property 'length'");
  });

  it('above(n)', function(){
    (5).should.be.above(2);
    (5).should.be.greaterThan(2);
    (5).should.not.be.above(5);
    (5).should.not.be.above(6);

    err(function(){
      (5).should.be.above(6, 'blah');
    }, "blah: expected 5 to be above 6");

    err(function(){
      (10).should.not.be.above(6, 'blah');
    }, "blah: expected 10 to be at most 6");

    err(function(){
      ({foo: 1}).should.have.length.above(3, 'blah');
    }, "blah: expected { foo: 1 } to have a property 'length'");
  });

  it('least(n)', function(){
    (5).should.be.at.least(5);
    (5).should.not.be.at.least(6);

    err(function(){
      (5).should.be.at.least(6, 'blah');
    }, "blah: expected 5 to be at least 6");

    err(function(){
      (10).should.not.be.at.least(6, 'blah');
    }, "blah: expected 10 to be below 6");

    err(function(){
      ({foo: 1}).should.have.length.of.at.least(3, 'blah');
    }, "blah: expected { foo: 1 } to have a property 'length'");
  });

  it('below(n)', function(){
    (2).should.be.below(5);
    (2).should.be.lessThan(5);
    (2).should.not.be.below(2);
    (2).should.not.be.below(1);

    err(function(){
      (6).should.be.below(5, 'blah');
    }, "blah: expected 6 to be below 5");

    err(function(){
      (6).should.not.be.below(10, 'blah');
    }, "blah: expected 6 to be at least 10");

    err(function(){
      ({foo: 1}).should.have.length.below(3, 'blah');
    }, "blah: expected { foo: 1 } to have a property 'length'");
  });

  it('most(n)', function(){
    (2).should.be.at.most(2);
    (2).should.not.be.at.most(1);

    err(function(){
      (6).should.be.at.most(5, 'blah');
    }, "blah: expected 6 to be at most 5");

    err(function(){
      (6).should.not.be.at.most(10, 'blah');
    }, "blah: expected 6 to be above 10");

    err(function(){
      ({foo: 1}).should.have.length.of.at.most(3, 'blah');
    }, "blah: expected { foo: 1 } to have a property 'length'");
  });

  it('match(regexp)', function(){
    'foobar'.should.match(/^foo/)
    'foobar'.should.not.match(/^bar/)

    err(function(){
      'foobar'.should.match(/^bar/i, 'blah')
    }, "blah: expected 'foobar' to match /^bar/i");

    err(function(){
      'foobar'.should.not.match(/^foo/i, 'blah')
    }, "blah: expected 'foobar' not to match /^foo/i");
  });

  it('length(n)', function(){
    'test'.should.have.length(4);
    'test'.should.not.have.length(3);
    [1,2,3].should.have.length(3);

    err(function(){
      (4).should.have.length(3, 'blah');
    }, 'blah: expected 4 to have a property \'length\'');

    err(function(){
      'asd'.should.not.have.length(3, 'blah');
    }, "blah: expected 'asd' to not have a length of 3");
  });

  it('eql(val)', function(){
    var a = new Date(1, 2, 3)
      , b = new Date(4, 5, 6);

    a.should.eql(a);
    a.should.not.eql(b);
    a.should.not.eql({});
    'test'.should.eql('test');
    ({ foo: 'bar' }).should.eql({ foo: 'bar' });
    /a/.should.eql(/a/);
    /a/.should.not.eql(/b/);
    /a/.should.not.eql({});
    /a/g.should.eql(/a/g);
    /a/g.should.not.eql(/b/g);
    /a/i.should.eql(/a/i);
    /a/i.should.not.eql(/b/i);
    /a/m.should.eql(/a/m);
    /a/m.should.not.eql(/b/m);
    (1).should.eql(1);
    '4'.should.not.eql(4);

    if (typeof Symbol === 'function') {
      var sym = Symbol();
      sym.should.eql(sym);
    }

    err(function(){
      (4).should.eql(3, 'blah');
    }, 'blah: expected 4 to deeply equal 3');
  });

  it('equal(val)', function(){
    'test'.should.equal('test');
    (1).should.equal(1);

    if (typeof Symbol === 'function') {
      var sym = Symbol();
      sym.should.equal(sym);
    }

    err(function(){
      (4).should.equal(3, 'blah');
    }, 'blah: expected 4 to equal 3');

    err(function(){
      '4'.should.equal(4, 'blah');
    }, "blah: expected '4' to equal 4");
  });

  it('empty', function(){
    function FakeArgs() {};
    FakeArgs.prototype.length = 0;

    ''.should.be.empty;
    'foo'.should.not.be.empty;
    ([]).should.be.empty;
    (['foo']).should.not.be.empty;
    (new FakeArgs).should.be.empty;
    ({arguments: 0}).should.not.be.empty;
    ({}).should.be.empty;
    ({foo: 'bar'}).should.not.be.empty;

    err(function(){
      ''.should.not.be.empty;
    }, "expected \'\' not to be empty");

    err(function(){
      'foo'.should.be.empty;
    }, "expected \'foo\' to be empty");

    err(function(){
      ([]).should.not.be.empty;
    }, "expected [] not to be empty");

    err(function(){
      (['foo']).should.be.empty;
    }, "expected [ \'foo\' ] to be empty");

    err(function(){
      (new FakeArgs).should.not.be.empty;
    }, "expected { length: 0 } not to be empty");

    err(function(){
      ({arguments: 0}).should.be.empty;
    }, "expected { arguments: 0 } to be empty");

    err(function(){
      ({}).should.not.be.empty;
    }, "expected {} not to be empty");

    err(function(){
      ({foo: 'bar'}).should.be.empty;
    }, "expected { foo: \'bar\' } to be empty");
  });

  it('property(name)', function(){
    'test'.should.have.property('length');
    (4).should.not.have.property('length');
    ({ 1: 1 }).should.have.property(1);

    err(function(){
      'asd'.should.have.property('foo');
    }, "expected 'asd' to have a property 'foo'");
  });

  it('property(name, val)', function(){
    'test'.should.have.property('length', 4);
    'asd'.should.have.property('constructor', String);
    ({ 1: 1 }).should.have.property(1, 1);

    err(function(){
      'asd'.should.have.property('length', 4, 'blah');
    }, "blah: expected 'asd' to have a property 'length' of 4, but got 3");

    err(function(){
      'asd'.should.not.have.property('length', 3, 'blah');
    }, "blah: expected 'asd' to not have a property 'length' of 3");

    err(function(){
      'asd'.should.not.have.property('foo', 3, 'blah');
    }, "blah: 'asd' has no property 'foo'");

    err(function(){
      'asd'.should.have.property('constructor', Number, 'blah');
    }, "blah: expected 'asd' to have a property 'constructor' of [Function: Number], but got [Function: String]");
  });

  it('ownProperty(name)', function(){
    'test'.should.have.ownProperty('length');
    'test'.should.haveOwnProperty('length');
    ({ length: 12 }).should.have.ownProperty('length');
    ({ 1: 1 }).should.have.ownProperty(1);

    var objNoHasOwnProperty = {hasOwnProperty: null};
    objNoHasOwnProperty.a = 'a';
    objNoHasOwnProperty.should.have.ownProperty('a');

    err(function(){
      ({ length: 12 }).should.not.have.ownProperty('length', 'blah');
    }, "blah: expected { length: 12 } to not have own property 'length'");
  });

  it('ownPropertyDescriptor(name)', function(){
    'test'.should.haveOwnPropertyDescriptor('length');
    'test'.should.have.ownPropertyDescriptor('length');
    'test'.should.not.have.ownPropertyDescriptor('foo');

    ({ 1: 1 }).should.have.ownPropertyDescriptor(1);

    var obj = { },
        obj2 = { };
    var descriptor = {
      configurable: false,
      enumerable: true,
      writable: true,
      value: NaN
    };
    Object.defineProperty(obj, 'test', descriptor);
    obj.should.haveOwnPropertyDescriptor('test', descriptor);

    Object.defineProperty(obj2, 1, descriptor);
    obj2.should.haveOwnPropertyDescriptor(1, descriptor);

    err(function(){
      obj.should.not.haveOwnPropertyDescriptor('test', descriptor, 'blah');
    }, /^blah: expected the own property descriptor for 'test' on \{ test: NaN \} to not match \{ [^\}]+ \}$/);
    err(function(){
      var wrongDescriptor = {
        configurable: false,
        enumerable: true,
        writable: false,
        value: NaN
      };
      obj.should.haveOwnPropertyDescriptor('test', wrongDescriptor, 'blah');
    }, /^blah: expected the own property descriptor for 'test' on \{ test: NaN \} to match \{ [^\}]+ \}, got \{ [^\}]+ \}$/);

    err(function(){
      obj.should.haveOwnPropertyDescriptor('test2', 'blah');
    }, "blah: expected { test: NaN } to have an own property descriptor for 'test2'");

    obj.should.have.ownPropertyDescriptor('test').and.have.property('enumerable', true);
  });

  it('string()', function(){
    'foobar'.should.contain.string('bar');
    'foobar'.should.contain.string('foo');
    'foobar'.should.not.contain.string('baz');

    err(function(){
      (3).should.contain.string('baz', 'blah');
    }, "blah: expected 3 to be a string");

    err(function(){
      'foobar'.should.contain.string('baz', 'blah');
    }, "blah: expected 'foobar' to contain 'baz'");

    err(function(){
      'foobar'.should.not.contain.string('bar', 'blah');
    }, "blah: expected 'foobar' to not contain 'bar'");
  });

  it('oneOf()', function(){
    'foo'.should.be.oneOf(['foo', 'bar']);
    'bar'.should.be.oneOf(['foo', 'bar']);
    'baz'.should.not.be.oneOf(['foo', 'bar']);
    'baz'.should.not.be.oneOf([]);
  });

  it('include()', function(){
    ['foo', 'bar'].should.include('foo');
    ['foo', 'bar'].should.contain('foo');
    ['foo', 'bar'].should.include('bar');
    [1,2].should.include(1);
    ['foo', 'bar'].should.not.include('baz');
    ['foo', 'bar'].should.not.include(1);
    ({a:1,b:2}).should.include({b:2});
    ({a:1,b:2}).should.not.include({b:3});

    if (typeof Symbol === 'function') {
      var sym1 = Symbol()
        , sym2 = Symbol()
        , sym3 = Symbol();
      [sym1, sym2].should.include(sym1);
      [sym1, sym2].should.not.include(sym3);
    }

    err(function(){
      ['foo'].should.include('bar', 'blah');
    }, "blah: expected [ 'foo' ] to include 'bar'");

    err(function(){
      ['bar', 'foo'].should.not.include('foo', 'blah');
    }, "blah: expected [ 'bar', 'foo' ] to not include 'foo'");

    err(function(){
      ({a:1}).should.include({b:2});
    }, "expected { a: 1 } to have a property 'b'");

    err(function(){
      (true).should.include(true);
    }, "object tested must be an array, an object, or a string, but boolean given");

    err(function(){
      (42).should.include(4);
    }, "object tested must be an array, an object, or a string, but number given");

    err(function(){
      (true).should.not.include(true);
    }, "object tested must be an array, an object, or a string, but boolean given");

    err(function(){
      (42).should.not.include(4);
    }, "object tested must be an array, an object, or a string, but number given");
  });

  it('keys(array|Object|arguments)', function(){
    ({ foo: 1 }).should.have.keys(['foo']);
    ({ foo: 1 }).should.have.keys({ 'foo': 6 });

    ({ foo: 1, bar: 2 }).should.have.keys(['foo', 'bar']);
    ({ foo: 1, bar: 2 }).should.have.keys('foo', 'bar');
    ({ foo: 1, bar: 2 }).should.have.keys({ 'foo': 6, 'bar': 7 });

    ({ foo: 1, bar: 2, baz: 3 }).should.include.keys('foo', 'bar');
    ({ foo: 1, bar: 2, baz: 3 }).should.contain.keys('bar', 'foo');
    ({ foo: 1, bar: 2, baz: 3 }).should.contain.keys('baz');

    ({ foo: 1, bar: 2 }).should.contain.keys('foo');
    ({ foo: 1, bar: 2 }).should.contain.keys('bar', 'foo');
    ({ foo: 1, bar: 2 }).should.contain.keys(['foo']);
    ({ foo: 1, bar: 2 }).should.contain.keys(['bar']);
    ({ foo: 1, bar: 2 }).should.contain.keys(['bar', 'foo']);
    ({ foo: 1, bar: 2 }).should.contain.keys({ 'foo': 6 });
    ({ foo: 1, bar: 2 }).should.contain.keys({ 'bar': 7 });
    ({ foo: 1, bar: 2 }).should.contain.keys({ 'foo': 6 });

    ({ foo: 1, bar: 2 }).should.not.have.keys('baz');
    ({ foo: 1, bar: 2 }).should.not.have.keys('foo', 'baz');
    ({ foo: 1, bar: 2 }).should.not.contain.keys('baz');
    ({ foo: 1, bar: 2 }).should.not.contain.keys('foo', 'baz');
    ({ foo: 1, bar: 2 }).should.not.contain.keys('baz', 'foo');

    ({ foo: 1, bar: 2 }).should.have.any.keys('foo', 'baz');
    ({ foo: 1, bar: 2 }).should.have.any.keys('foo');
    ({ foo: 1, bar: 2 }).should.contain.any.keys('bar', 'baz');
    ({ foo: 1, bar: 2 }).should.contain.any.keys(['foo']);
    ({ foo: 1, bar: 2 }).should.have.all.keys(['bar', 'foo']);
    ({ foo: 1, bar: 2 }).should.contain.all.keys(['bar', 'foo']);
    ({ foo: 1, bar: 2 }).should.contain.any.keys({ 'foo': 6 });
    ({ foo: 1, bar: 2 }).should.have.all.keys({ 'foo': 6, 'bar': 7 });
    ({ foo: 1, bar: 2 }).should.contain.all.keys({ 'bar': 7, 'foo': 6 });

    ({ foo: 1, bar: 2 }).should.not.have.any.keys('baz', 'abc', 'def');
    ({ foo: 1, bar: 2 }).should.not.have.any.keys('baz');
    ({ foo: 1, bar: 2 }).should.not.contain.any.keys('baz');
    ({ foo: 1, bar: 2 }).should.not.have.all.keys(['baz', 'foo']);
    ({ foo: 1, bar: 2 }).should.not.contain.all.keys(['baz', 'foo']);
    ({ foo: 1, bar: 2 }).should.not.have.all.keys({ 'baz': 8, 'foo': 7 });

    ({ foo: 1, bar: 2 }).should.not.contain.all.keys({ 'baz': 8, 'foo': 7 });

    ({ 1: 1, 2: 2 }).should.have.keys(1, 2);
    ({ 1: 1, 2: 2 }).should.have.any.keys(1, 3);
    ({ 1: 1, 2: 2 }).should.contain.keys(1);

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

    obj.should.have.all.keys([enumProp1, enumProp2]);
    obj.should.not.have.all.keys([enumProp1, enumProp2, nonEnumProp]);

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

      obj.should.have.all.keys([sym1, sym2, str]);
      obj.should.not.have.all.keys([sym1, sym2, sym3, str]);
    }

    if (typeof Map !== 'undefined') {
      // Not using Map constructor args because not supported in IE 11.
      var aKey = {thisIs: 'anExampleObject'}
        , anotherKey = {doingThisBecauseOf: 'referential equality'}
        , testMap = new Map();
      
      testMap.set(aKey, 'aValue');
      testMap.set(anotherKey, 'anotherValue');

      testMap.should.have.any.keys(aKey);
      testMap.should.have.any.keys('thisDoesNotExist', 'thisToo', aKey);
      testMap.should.have.all.keys(aKey, anotherKey);

      testMap.should.contain.all.keys(aKey);
      testMap.should.not.contain.all.keys(aKey, 'thisDoesNotExist');
      testMap.should.not.have.any.keys({iDoNot: 'exist'});
      testMap.should.not.have.all.keys('thisDoesNotExist', 'thisToo', anotherKey);

      testMap.should.have.any.keys([aKey]);
      testMap.should.have.any.keys([20, 1, aKey]);
      testMap.should.have.all.keys([aKey, anotherKey]);

      testMap.should.not.have.any.keys([{13: 37}, 'thisDoesNotExist', 'thisToo']);
      testMap.should.not.have.any.keys([20, 1, {13: 37}]);
      testMap.should.not.have.all.keys([aKey, {'iDoNot': 'exist'}]);

      var weirdMapKey1 = Object.create(null)
        , weirdMapKey2 = {toString: NaN}
        , weirdMapKey3 = []
        , weirdMap = new Map();
      
      weirdMap.set(weirdMapKey1, 'val1');
      weirdMap.set(weirdMapKey2, 'val2');

      weirdMap.should.have.all.keys([weirdMapKey1, weirdMapKey2]);
      weirdMap.should.not.have.all.keys([weirdMapKey1, weirdMapKey3]);

      if (typeof Symbol === 'function') {
        var symMapKey1 = Symbol()
          , symMapKey2 = Symbol()
          , symMapKey3 = Symbol()
          , symMap = new Map();
        
        symMap.set(symMapKey1, 'val1');
        symMap.set(symMapKey2, 'val2');

        symMap.should.have.all.keys(symMapKey1, symMapKey2);
        symMap.should.have.any.keys(symMapKey1, symMapKey3);
        symMap.should.contain.all.keys(symMapKey2, symMapKey1);
        symMap.should.contain.any.keys(symMapKey3, symMapKey1);

        symMap.should.not.have.all.keys(symMapKey1, symMapKey3);
        symMap.should.not.have.any.keys(symMapKey3);
        symMap.should.not.contain.all.keys(symMapKey3, symMapKey1);
        symMap.should.not.contain.any.keys(symMapKey3);
      }

      var errMap = new Map();

      errMap.set({ foo: 1 });

      err(function(){
        errMap.should.have.keys();
      }, "keys required");

      err(function(){
        errMap.should.have.keys([]);
      }, "keys required");

      err(function(){
        errMap.should.contain.keys();
      }, "keys required");

      err(function(){
        errMap.should.contain.keys([]);
      }, "keys required");
    }

    if (typeof Set !== 'undefined') {
      // Not using Set constructor args because not supported in IE 11.
      var aKey = {thisIs: 'anExampleObject'}
        , anotherKey = {doingThisBecauseOf: 'referential equality'}
        , testSet = new Set();
      
      testSet.add(aKey);
      testSet.add(anotherKey);

      testSet.should.have.any.keys(aKey);
      testSet.should.have.any.keys('thisDoesNotExist', 'thisToo', aKey);
      testSet.should.have.all.keys(aKey, anotherKey);

      testSet.should.contain.all.keys(aKey);
      testSet.should.not.contain.all.keys(aKey, 'thisDoesNotExist');

      testSet.should.not.have.any.keys({iDoNot: 'exist'});
      testSet.should.not.have.any.keys('thisIsNotAkey', {iDoNot: 'exist'}, {33: 20});
      testSet.should.not.have.all.keys('thisDoesNotExist', 'thisToo', anotherKey);

      testSet.should.have.any.keys([aKey]);
      testSet.should.have.any.keys([20, 1, aKey]);
      testSet.should.have.all.keys([aKey, anotherKey]);

      testSet.should.not.have.any.keys([{13: 37}, 'thisDoesNotExist', 'thisToo']);
      testSet.should.not.have.any.keys([20, 1, {13: 37}]);
      testSet.should.not.have.all.keys([aKey, {'iDoNot': 'exist'}]);

      var weirdSetKey1 = Object.create(null)
        , weirdSetKey2 = {toString: NaN}
        , weirdSetKey3 = []
        , weirdSet = new Set();
      
      weirdSet.add(weirdSetKey1);
      weirdSet.add(weirdSetKey2);

      weirdSet.should.have.all.keys([weirdSetKey1, weirdSetKey2]);
      weirdSet.should.not.have.all.keys([weirdSetKey1, weirdSetKey3]);

      if (typeof Symbol === 'function') {
        var symSetKey1 = Symbol()
          , symSetKey2 = Symbol()
          , symSetKey3 = Symbol()
          , symSet = new Set();
        
        symSet.add(symSetKey1);
        symSet.add(symSetKey2);

        symSet.should.have.all.keys(symSetKey1, symSetKey2);
        symSet.should.have.any.keys(symSetKey1, symSetKey3);
        symSet.should.contain.all.keys(symSetKey2, symSetKey1);
        symSet.should.contain.any.keys(symSetKey3, symSetKey1);

        symSet.should.not.have.all.keys(symSetKey1, symSetKey3);
        symSet.should.not.have.any.keys(symSetKey3);
        symSet.should.not.contain.all.keys(symSetKey3, symSetKey1);
        symSet.should.not.contain.any.keys(symSetKey3);
      }

      var errSet = new Set();

      errSet.add({ foo: 1 });

      err(function(){
        errSet.should.have.keys();
      }, "keys required");

      err(function(){
        errSet.should.have.keys([]);
      }, "keys required");

      err(function(){
        errSet.should.contain.keys();
      }, "keys required");

      err(function(){
        errSet.should.contain.keys([]);
      }, "keys required");
    }

    err(function(){
      ({ foo: 1 }).should.have.keys();
    }, "keys required");

    err(function(){
      ({ foo: 1 }).should.have.keys([]);
    }, "keys required");

    err(function(){
      ({ foo: 1 }).should.not.have.keys([]);
    }, "keys required");

    err(function(){
      ({ foo: 1 }).should.contain.keys([]);
    }, "keys required");

    var mixedArgsMsg = 'when testing keys against an object or an array you must give a single Array|Object|String argument or multiple String arguments'

    err(function(){
      ({}).should.contain.keys(['a'], "b");
    }, mixedArgsMsg);

    err(function(){
      ({}).should.contain.keys({ 'a': 1 }, "b");
    }, mixedArgsMsg);

    err(function(){
      ({ foo: 1 }).should.have.keys(['bar']);
    }, "expected { foo: 1 } to have key 'bar'");

    err(function(){
      ({ foo: 1 }).should.have.keys(['bar', 'baz']);
    }, "expected { foo: 1 } to have keys 'bar', and 'baz'");

    err(function(){
      ({ foo: 1 }).should.have.keys(['foo', 'bar', 'baz']);
    }, "expected { foo: 1 } to have keys 'foo', 'bar', and 'baz'");

    err(function(){
      ({ foo: 1 }).should.not.have.keys(['foo']);
    }, "expected { foo: 1 } to not have key 'foo'");

    err(function(){
      ({ foo: 1 }).should.not.have.keys(['foo']);
    }, "expected { foo: 1 } to not have key 'foo'");

    err(function(){
      ({ foo: 1, bar: 2 }).should.not.have.keys(['foo', 'bar']);
    }, "expected { foo: 1, bar: 2 } to not have keys 'foo', and 'bar'");

    err(function(){
      ({ foo: 1 }).should.not.contain.keys(['foo']);
    }, "expected { foo: 1 } to not contain key 'foo'");

    err(function(){
      ({ foo: 1 }).should.contain.keys('foo', 'bar');
    }, "expected { foo: 1 } to contain keys 'foo', and 'bar'");

    err(function() {
      ({ foo: 1 }).should.have.any.keys('baz');
    }, "expected { foo: 1 } to have key 'baz'");

    err(function(){
      ({ foo: 1, bar: 2 }).should.not.have.all.keys(['foo', 'bar']);
    }, "expected { foo: 1, bar: 2 } to not have keys 'foo', and 'bar'");

    err(function(){
      ({ foo: 1, bar: 2 }).should.not.have.any.keys(['foo', 'baz']);
    }, "expected { foo: 1, bar: 2 } to not have keys 'foo', or 'baz'");

    // repeat previous tests with Object as arg.
    err(function(){
      ({ foo: 1 }).should.have.keys({ 'bar': 1 });
    }, "expected { foo: 1 } to have key 'bar'");

    err(function(){
      ({ foo: 1 }).should.have.keys({ 'bar': 1, 'baz': 1});
    }, "expected { foo: 1 } to have keys 'bar', and 'baz'");

    err(function(){
      ({ foo: 1 }).should.have.keys({ 'foo': 1, 'bar': 1, 'baz': 1});
    }, "expected { foo: 1 } to have keys 'foo', 'bar', and 'baz'");

    err(function(){
      ({ foo: 1 }).should.not.have.keys({ 'foo': 1 });
    }, "expected { foo: 1 } to not have key 'foo'");

    err(function(){
      ({ foo: 1 }).should.not.have.keys({ 'foo': 1 });
    }, "expected { foo: 1 } to not have key 'foo'");

    err(function(){
      ({ foo: 1, bar: 2 }).should.not.have.keys({ 'foo': 1, 'bar': 1});
    }, "expected { foo: 1, bar: 2 } to not have keys 'foo', and 'bar'");

    err(function(){
      ({ foo: 1 }).should.not.contain.keys({ 'foo': 1 });
    }, "expected { foo: 1 } to not contain key 'foo'");

    err(function(){
      ({ foo: 1 }).should.contain.keys('foo', 'bar');
    }, "expected { foo: 1 } to contain keys 'foo', and 'bar'");

    err(function() {
      ({ foo: 1 }).should.have.any.keys('baz');
    }, "expected { foo: 1 } to have key 'baz'");

    err(function(){
      ({ foo: 1, bar: 2 }).should.not.have.all.keys({ 'foo': 1, 'bar': 1});
    }, "expected { foo: 1, bar: 2 } to not have keys 'foo', and 'bar'");

    err(function(){
      ({ foo: 1, bar: 2 }).should.not.have.any.keys({ 'foo': 1, 'baz': 1});
    }, "expected { foo: 1, bar: 2 } to not have keys 'foo', or 'baz'");

  });

  it('keys(array) will not mutate array (#359)', function () {
      var expected = [ 'b', 'a' ];
      var original_order = [ 'b', 'a' ];
      var obj = { "b": 1, "a": 1 };
      expected.should.deep.equal(original_order);
      obj.should.keys(original_order);
      expected.should.deep.equal(original_order);
  });

  it('throw', function () {
    // See GH-45: some poorly-constructed custom errors don't have useful names
    // on either their constructor or their constructor prototype, but instead
    // only set the name inside the constructor itself.
    var PoorlyConstructedError = function () {
      this.name = 'PoorlyConstructedError';
    };
    PoorlyConstructedError.prototype = Object.create(Error.prototype);

    function CustomError(message) {
        this.name = 'CustomError';
        this.message = message;
    }
    CustomError.prototype = Error.prototype;

    var specificError = new RangeError('boo');

    var goodFn = function () { 1==1; }
      , badFn = function () { throw new Error('testing'); }
      , stringErrFn = function () { throw 'testing'; }
      , refErrFn = function () { throw new ReferenceError('hello'); }
      , ickyErrFn = function () { throw new PoorlyConstructedError(); }
      , specificErrFn = function () { throw specificError; }
      , customErrFn = function() { throw new CustomError('foo'); };

    (goodFn).should.not.throw();
    (goodFn).should.not.throw(Error);
    (goodFn).should.not.throw(new Error());
    (goodFn).should.not.throw(specificError);
    (badFn).should.throw();
    (badFn).should.throw(Error);
    (badFn).should.throw(new Error());
    (badFn).should.not.throw(Error, 'hello');
    (badFn).should.not.throw(new Error('hello'));
    (badFn).should.not.throw(ReferenceError);
    (badFn).should.not.throw(new ReferenceError());
    (badFn).should.not.throw(specificError);
    (stringErrFn).should.throw();
    (stringErrFn).should.not.throw(ReferenceError);
    (stringErrFn).should.not.throw(new ReferenceError());
    (stringErrFn).should.not.throw(specificError);
    (refErrFn).should.throw();
    (refErrFn).should.throw(ReferenceError);
    (refErrFn).should.throw(new ReferenceError());
    (refErrFn).should.throw(Error);
    (refErrFn).should.throw(new Error());
    (refErrFn).should.not.throw(TypeError);
    (refErrFn).should.not.throw(new TypeError());
    (refErrFn).should.not.throw(specificError);
    (ickyErrFn).should.throw();
    (ickyErrFn).should.throw(PoorlyConstructedError);
    (ickyErrFn).should.throw(new PoorlyConstructedError());
    (ickyErrFn).should.throw(Error);
    (ickyErrFn).should.not.throw(new Error());
    (ickyErrFn).should.not.throw(specificError);
    (specificErrFn).should.throw(specificError);

    (badFn).should.throw(/testing/);
    (badFn).should.throw('testing');
    (badFn).should.not.throw(/hello/);
    (badFn).should.not.throw('hello');
    (badFn).should.throw(Error, /testing/);
    (badFn).should.throw(Error, 'testing');
    (badFn).should.throw(new Error('testing'));

    (stringErrFn).should.throw(/testing/);
    (stringErrFn).should.throw('testing');
    (stringErrFn).should.not.throw(/hello/);
    (stringErrFn).should.not.throw('hello');

    should.throw(badFn);
    should.throw(refErrFn, ReferenceError);
    should.throw(refErrFn, new ReferenceError());
    should.throw(refErrFn, Error);
    should.throw(refErrFn, new Error());
    should.throw(ickyErrFn, PoorlyConstructedError);
    should.throw(ickyErrFn, new PoorlyConstructedError());
    should.throw(specificErrFn, specificError);
    should.not.throw(goodFn);
    should.not.throw(badFn, ReferenceError);
    should.not.throw(badFn, new ReferenceError());
    should.not.throw(badFn, specificError);

    should.throw(badFn, Error, /testing/);
    should.throw(badFn, Error, 'testing');

    err(function(){
      (goodFn).should.throw();
    }, "expected [Function] to throw an error");

    err(function(){
      (goodFn).should.throw(ReferenceError);
    }, "expected [Function] to throw 'ReferenceError'");

    err(function(){
      (goodFn).should.throw(new ReferenceError());
    }, "expected [Function] to throw 'ReferenceError'");

    err(function(){
      (goodFn).should.throw(specificError);
    }, "expected [Function] to throw 'RangeError: boo'");

    err(function(){
      (badFn).should.not.throw();
    }, "expected [Function] to not throw an error but 'Error: testing' was thrown");

    err(function(){
      (badFn).should.throw(ReferenceError);
    }, "expected [Function] to throw 'ReferenceError' but 'Error: testing' was thrown");

    err(function(){
      (badFn).should.throw(new ReferenceError());
    }, "expected [Function] to throw 'ReferenceError' but 'Error: testing' was thrown");

    err(function(){
      (badFn).should.throw(specificError);
    }, "expected [Function] to throw 'RangeError: boo' but 'Error: testing' was thrown");

    err(function(){
      (badFn).should.not.throw(Error);
    }, "expected [Function] to not throw 'Error' but 'Error: testing' was thrown");

    err(function(){
      (badFn).should.not.throw(new Error());
    }, "expected [Function] to not throw 'Error' but 'Error: testing' was thrown");

    err(function(){
      (badFn).should.throw(new Error('test'));
    }, "expected [Function] to throw error matching 'test' but got 'testing'");

    err(function(){
      (badFn).should.throw(Error, 'hello');
    }, "expected [Function] to throw error including 'hello' but got 'testing'");

    err(function(){
      (badFn).should.throw(new Error('hello'));
    }, "expected [Function] to throw error matching 'hello' but got 'testing'");

    err(function(){
      (badFn).should.not.throw(Error, 'test');
    }, "expected [Function] to not throw error including 'test'");

    err(function(){
      (stringErrFn).should.not.throw();
    }, "expected [Function] to not throw an error but 'testing' was thrown");

    err(function(){
      (stringErrFn).should.throw(ReferenceError);
    }, "expected [Function] to throw 'ReferenceError' but 'testing' was thrown");

    err(function(){
      (stringErrFn).should.throw(new ReferenceError());
    }, "expected [Function] to throw 'ReferenceError' but 'testing' was thrown");

    err(function(){
      (stringErrFn).should.throw(specificError);
    }, "expected [Function] to throw 'RangeError: boo' but 'testing' was thrown");

    err(function(){
      (refErrFn).should.not.throw(ReferenceError);
    }, "expected [Function] to not throw 'ReferenceError' but 'ReferenceError: hello' was thrown");

    err(function(){
      (refErrFn).should.not.throw(new ReferenceError());
    }, "expected [Function] to not throw 'ReferenceError' but 'ReferenceError: hello' was thrown");

    err(function(){
      (badFn).should.throw(PoorlyConstructedError);
    }, "expected [Function] to throw 'PoorlyConstructedError' but 'Error: testing' was thrown")

    err(function(){
      (badFn).should.throw(new PoorlyConstructedError());
    }, "expected [Function] to throw 'PoorlyConstructedError' but 'Error: testing' was thrown")

    err(function(){
      (ickyErrFn).should.not.throw(PoorlyConstructedError);
    }, /^(expected \[Function\] to not throw 'PoorlyConstructedError' but)(.*)(PoorlyConstructedError|\{ Object \()(.*)(was thrown)$/);

    err(function(){
      (ickyErrFn).should.not.throw(new PoorlyConstructedError());
    }, /^(expected \[Function\] to not throw 'PoorlyConstructedError' but)(.*)(PoorlyConstructedError|\{ Object \()(.*)(was thrown)$/);

    err(function(){
      (ickyErrFn).should.throw(ReferenceError);
    }, /^(expected \[Function\] to throw 'ReferenceError' but)(.*)(PoorlyConstructedError|\{ Object \()(.*)(was thrown)$/);

    err(function(){
      (ickyErrFn).should.throw(new ReferenceError());
    }, /^(expected \[Function\] to throw 'ReferenceError' but)(.*)(PoorlyConstructedError|\{ Object \()(.*)(was thrown)$/);

    err(function(){
      (specificErrFn).should.throw(new ReferenceError('eek'));
    }, "expected [Function] to throw 'ReferenceError: eek' but 'RangeError: boo' was thrown");

    err(function(){
      (specificErrFn).should.not.throw(specificError);
    }, "expected [Function] to not throw error matching 'boo'");

    err(function (){
      (badFn).should.not.throw(/testing/);
    }, "expected [Function] to not throw error matching /testing/");

    err(function () {
      (badFn).should.throw(/hello/);
    }, "expected [Function] to throw error matching /hello/ but got \'testing\'");

    err(function () {
      (badFn).should.throw(Error, /hello/, 'blah');
    }, "blah: expected [Function] to throw error matching /hello/ but got 'testing'");

    err(function () {
      (badFn).should.throw(Error, 'hello', 'blah');
    }, "blah: expected [Function] to throw error including 'hello' but got 'testing'");

    err(function () {
      (customErrFn).should.not.throw();
    }, "expected [Function] to not throw an error but 'CustomError: foo' was thrown");
  });

  it('respondTo', function(){
    function Foo(){};
    Foo.prototype.bar = function(){};
    Foo.func = function(){};

    var bar = {};
    bar.foo = function(){};

    Foo.should.respondTo('bar');
    Foo.should.not.respondTo('foo');
    Foo.should.itself.respondTo('func');
    Foo.should.itself.not.respondTo('bar');

    bar.should.respondTo('foo');

    err(function(){
      Foo.should.respondTo('baz', 'constructor');
    }, /^(constructor: expected)(.*)(\[Function: Foo\])(.*)(to respond to \'baz\')$/);

    err(function(){
      bar.should.respondTo('baz', 'object');
    }, /^(object: expected)(.*)(\{ foo: \[Function\] \}|\{ Object \()(.*)(to respond to \'baz\')$/);
  });

  it('satisfy', function(){
    var matcher = function (num){
      return num === 1;
    };

    (1).should.satisfy(matcher);

    err(function(){
      (2).should.satisfy(matcher, 'blah');
    }, "blah: expected 2 to satisfy [Function]");
  });

  it('closeTo', function(){
    (1.5).should.be.closeTo(1.0, 0.5);

    err(function(){
      (2).should.be.closeTo(1.0, 0.5, 'blah');
    }, "blah: expected 2 to be close to 1 +/- 0.5");

    err(function() {
      [1.5].should.be.closeTo(1.0, 0.5);
    }, "expected [ 1.5 ] to be a number");

    err(function() {
      (1.5).should.be.closeTo("1.0", 0.5);
    }, "the arguments to closeTo or approximately must be numbers");

    err(function() {
      (1.5).should.be.closeTo(1.0, true);
    }, "the arguments to closeTo or approximately must be numbers");
  });

  it('approximately', function(){
    (1.5).should.be.approximately(1.0, 0.5);

    err(function(){
      (2).should.be.approximately(1.0, 0.5, 'blah');
    }, "blah: expected 2 to be close to 1 +/- 0.5");

    err(function() {
      [1.5].should.be.approximately(1.0, 0.5);
    }, "expected [ 1.5 ] to be a number");

    err(function() {
      (1.5).should.be.approximately("1.0", 0.5);
    }, "the arguments to closeTo or approximately must be numbers");

    err(function() {
      (1.5).should.be.approximately(1.0, true);
    }, "the arguments to closeTo or approximately must be numbers");
  });

  it('include.members', function() {
    [1, 2, 3].should.include.members([3]);
    [1, 2, 3].should.include.members([]);
    [1, 2, 3].should.include.members([2, 1]);

    [1, 2, 3].should.not.include.members([999]);
    [].should.not.include.members([23]);
    [{a: 1}].should.not.include.members([{a: 1}]);

    err(function() {
      [].should.include.members([43]);
    }, 'expected [] to be a superset of [ 43 ]');

    err(function() {
      [5, 2, 1].should.not.include.members([2]);
    }, 'expected [ 5, 2, 1 ] to not be a superset of [ 2 ]');

    err(function() {
      'foo'.should.include.members([12]);
    }, "expected 'foo' to be an array");

    err(function() {
      [1, 2, 3].should.include.members('o');
    }, "expected 'o' to be an array");
  });

  it('memberEquals', function() {
    [1, 2, 3].should.have.same.members([3, 2, 1]);
    [5, 4].should.have.same.members([5, 4]);
    [].should.have.same.members([]);

    [{a: 1}].should.not.have.same.members([{a: 1}]);

    err(function() {
      [1, 2, 3].should.have.same.members([]);
    }, 'expected [ 1, 2, 3 ] to have the same members as []');

    err(function() {
      [1, 2, 3].should.have.same.members(4);
    }, 'expected 4 to be an array');
  });

  it('ordered.members', function() {
    [1, 2, 3].should.ordered.members([1, 2, 3]);
    [1, 2, 3].should.not.ordered.members([2, 1, 3]);
    [1, 2, 3].should.not.ordered.members([1, 2]);

    err(function() {
      [1, 2, 3].should.ordered.members([2, 1, 3]);
    }, 'expected [ 1, 2, 3 ] to have the same ordered members as [ 2, 1, 3 ]');

    err(function() {
      [1, 2, 3].should.not.ordered.members([1, 2, 3]);
    }, 'expected [ 1, 2, 3 ] to not have the same ordered members as [ 1, 2, 3 ]');
  });

  it('include.ordered.members', function() {
    [1, 2, 3].should.include.ordered.members([1, 2]);
    [1, 2, 3].should.not.include.ordered.members([2, 1]);
    [1, 2, 3].should.not.include.ordered.members([2, 3]);

    err(function() {
      [1, 2, 3].should.include.ordered.members([2, 1]);
    }, 'expected [ 1, 2, 3 ] to be an ordered superset of [ 2, 1 ]');

    err(function() {
      [1, 2, 3].should.not.include.ordered.members([1, 2]);
    }, 'expected [ 1, 2, 3 ] to not be an ordered superset of [ 1, 2 ]');
  });

  it('deep.ordered.members', function() {
    [{a: 1}, {b: 2}, {c: 3}].should.deep.ordered.members([{a: 1}, {b: 2}, {c: 3}]);
    [{a: 1}, {b: 2}, {c: 3}].should.not.deep.ordered.members([{b: 2}, {a: 1}, {c: 3}]);

    err(function() {
      [{a: 1}, {b: 2}, {c: 3}].should.deep.ordered.members([{b: 2}, {a: 1}, {c: 3}]);
    }, 'expected [ { a: 1 }, { b: 2 }, { c: 3 } ] to have the same ordered members as [ { b: 2 }, { a: 1 }, { c: 3 } ]');

    err(function() {
      [{a: 1}, {b: 2}, {c: 3}].should.not.deep.ordered.members([{a: 1}, {b: 2}, {c: 3}]);
    }, 'expected [ { a: 1 }, { b: 2 }, { c: 3 } ] to not have the same ordered members as [ { a: 1 }, { b: 2 }, { c: 3 } ]');
  });

  it('include.deep.ordered.members', function() {
    [{a: 1}, {b: 2}, {c: 3}].should.include.deep.ordered.members([{a: 1}, {b: 2}]);
    [{a: 1}, {b: 2}, {c: 3}].should.not.include.deep.ordered.members([{b: 2}, {a: 1}]);
    [{a: 1}, {b: 2}, {c: 3}].should.not.include.deep.ordered.members([{b: 2}, {c: 3}]);

    err(function() {
      [{a: 1}, {b: 2}, {c: 3}].should.include.deep.ordered.members([{b: 2}, {a: 1}]);
    }, 'expected [ { a: 1 }, { b: 2 }, { c: 3 } ] to be an ordered superset of [ { b: 2 }, { a: 1 } ]');

    err(function() {
      [{a: 1}, {b: 2}, {c: 3}].should.not.include.deep.ordered.members([{a: 1}, {b: 2}]);
    }, 'expected [ { a: 1 }, { b: 2 }, { c: 3 } ] to not be an ordered superset of [ { a: 1 }, { b: 2 } ]');
  });

  it('change', function() {
    var obj = { value: 10, str: 'foo' },
        heroes = ['spiderman', 'superman'],
        fn     = function() { obj.value += 5 },
        sameFn = function() { obj.value += 0 },
        decFn  = function() { obj.value -= 20 },
        bangFn = function() { obj.str += '!' },
        batFn  = function() { heroes.push('batman') },
        lenFn  = function() { return heroes.length },
        noFn   = function() { return null };

    fn.should.change(obj, 'value');
    fn.should.change(obj, 'value').by(5);
    fn.should.change(obj, 'value').by(-5);
    fn.should.change(obj, 'value').but.not.by(10);

    decFn.should.change(obj, 'value');
    decFn.should.change(obj, 'value').by(20);
    decFn.should.change(obj, 'value').but.not.by(19);

    sameFn.should.not.change(obj, 'value');

    sameFn.should.not.change(obj, 'str');
    bangFn.should.change(obj, 'str');

    batFn.should.change(lenFn);
    batFn.should.change(lenFn).by(1);
    batFn.should.change(lenFn).but.not.by(2);
    noFn.should.not.change(lenFn);
  });

  it('increase, decrease', function() {
    var obj = { value: 10 },
        arr = ['one', 'two'],
        pFn   = function() { arr.push('three') },
        popFn = function() { arr.pop() },
        lenFn = function() { return arr.length },
        nFn   = function() { return null },
        incFn = function() { obj.value += 2 },
        decFn = function() { obj.value -= 3 },
        smFn  = function() { obj.value += 0 };

    smFn.should.not.increase(obj, 'value');
    decFn.should.not.increase(obj, 'value');
    incFn.should.increase(obj, 'value');
    incFn.should.increase(obj, 'value').by(2);
    incFn.should.increase(obj, 'value').but.not.by(1);

    smFn.should.not.decrease(obj, 'value');
    incFn.should.not.decrease(obj, 'value');
    decFn.should.decrease(obj, 'value');
    decFn.should.decrease(obj, 'value').by(3);
    decFn.should.decrease(obj, 'value').but.not.by(2);

    nFn.should.not.increase(lenFn);
    nFn.should.not.decrease(lenFn);

    popFn.should.decrease(lenFn);
    popFn.should.not.increase(lenFn);

    pFn.should.increase(lenFn);
    pFn.should.not.decrease(lenFn);

    pFn.should.increase(lenFn).by(1);
    pFn.should.increase(lenFn).but.not.by(2);

    popFn.should.decrease(lenFn).by(1);
    popFn.should.decrease(lenFn).but.not.by(2);
  });

  it('extensible', function() {
     var nonExtensibleObject = Object.preventExtensions({});

     ({}).should.be.extensible;
     nonExtensibleObject.should.not.be.extensible;

     err(function() {
       nonExtensibleObject.should.be.extensible;
     }, 'expected {} to be extensible');

     err(function() {
       ({}).should.not.be.extensible;
     }, 'expected {} to not be extensible');

     // Making sure ES6-like Object.isExtensible response is respected for all primitive types

     (42).should.not.be.extensible;
     'foo'.should.not.be.extensible;
     false.should.not.be.extensible;

     if (typeof Symbol === 'function') {
       Symbol().should.not.be.extensible;
     }

     err(function() {
       (42).should.be.extensible;
     }, 'expected 42 to be extensible');

     err(function() {
       'foo'.should.be.extensible;
     }, 'expected \'foo\' to be extensible');

     err(function() {
       false.should.be.extensible;
     }, 'expected false to be extensible');
  });

  it('sealed', function() {
    var sealedObject = Object.seal({});

    sealedObject.should.be.sealed;
    ({}).should.not.be.sealed;

    err(function() {
      ({}).should.be.sealed;
    }, 'expected {} to be sealed');

    err(function() {
      sealedObject.should.not.be.sealed;
    }, 'expected {} to not be sealed');

    // Making sure ES6-like Object.isSealed response is respected for all primitive types

    (42).should.be.sealed;
    'foo'.should.be.sealed;
    false.should.be.sealed;

    if (typeof Symbol === 'function') {
      Symbol().should.be.sealed;
    }

    err(function() {
      (42).should.not.be.sealed;
    }, 'expected 42 to not be sealed');

    err(function() {
      'foo'.should.not.be.sealed;
    }, 'expected \'foo\' to not be sealed');

    err(function() {
      false.should.not.be.sealed;
    }, 'expected false to not be sealed');
  });

  it('frozen', function() {
    var frozenObject = Object.freeze({});

    frozenObject.should.be.frozen;
    ({}).should.not.be.frozen;

    err(function() {
        ({}).should.be.frozen;
    }, 'expected {} to be frozen');

    err(function() {
        frozenObject.should.not.be.frozen;
    }, 'expected {} to not be frozen');

    // Making sure ES6-like Object.isFrozen response is respected for all primitive types

    (42).should.be.frozen;
    'foo'.should.be.frozen;
    false.should.be.frozen;

    if (typeof Symbol === 'function') {
      Symbol().should.be.frozen;
    }

    err(function() {
      (42).should.not.be.frozen;
    }, 'expected 42 to not be frozen');

    err(function() {
      'foo'.should.not.be.frozen;
    }, 'expected \'foo\' to not be frozen');

    err(function() {
      false.should.not.be.frozen;
    }, 'expected false to not be frozen');
  });
});
