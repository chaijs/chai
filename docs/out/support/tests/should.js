/**
 * Module dependencies.
 */


if (!chai) {
  var chai = require('..');
}

var should = chai.should();

function err(fn, msg) {
  try {
    fn();
    chai.fail('expected an error');
  } catch (err) {
    should.equal(msg, err.message);
  }
}

suite('should', function() {

  test('.version', function(){
    chai.version.should.match(/^\d+\.\d+\.\d+$/);
  });

  test('double require', function(){
    //require('chai').should().should.equal(should);
  });

  test('assertion', function(){
    'test'.should.be.a('string');
    should.equal('foo', 'foo');
    should.not.equal('foo', 'bar');
  });

  test('root exist', function () {
    var foo = 'foo'
      , bar = undefined;
    should.exist(foo);
    should.not.exist(bar);

    err(function () {
      should.exist(bar);
    }, "expected undefined to exist");

    err(function () {
      should.not.exist(foo);
    }, "expected 'foo' to not exist")
  });

  test('true', function(){
    (true).should.be.true;
    false.should.not.be.true;
    (1).should.not.be.true;false
    false.should.have.been.false;

    err(function(){
      'test'.should.be.true;
    }, "expected 'test' to be true")
  });

  test('ok', function(){
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

  test('false', function(){
    false.should.be.false;
    true.should.not.be.false;
    (0).should.not.be.false;

    err(function(){
      ''.should.be.false;
    }, "expected '' to be false")
  });

  test('arguments', function(){
    var args = (function(){ return arguments; })(1,2,3);
    args.should.be.arguments;
    [].should.not.be.arguments;
  });

  test('.equal()', function(){
    var foo;
    should.equal(undefined, foo);
  });

  test('typeof', function(){
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

    (5).should.be.a('number');

    err(function(){
      (5).should.not.be.a('number');
    }, "expected 5 not to be a number");
  });

  test('instanceof', function(){
    function Foo(){}
    new Foo().should.be.an.instanceof(Foo);

    err(function(){
      (3).should.an.instanceof(Foo);
    }, "expected 3 to be an instance of Foo");
  });

  test('within(start, finish)', function(){
    (5).should.be.within(5, 10);
    (5).should.be.within(3,6);
    (5).should.be.within(3,5);
    (5).should.not.be.within(1,3);

    err(function(){
      (5).should.not.be.within(4,6);
    }, "expected 5 to not be within 4..6");

    err(function(){
      (10).should.be.within(50,100);
    }, "expected 10 to be within 50..100");
  });

  test('above(n)', function(){
    (5).should.be.above(2);
    (5).should.be.greaterThan(2);
    (5).should.not.be.above(5);
    (5).should.not.be.above(6);

    err(function(){
      (5).should.be.above(6);
    }, "expected 5 to be above 6");

    err(function(){
      (10).should.not.be.above(6);
    }, "expected 10 to be below 6");
  });

  test('below(n)', function(){
    (2).should.be.below(5);
    (2).should.be.lessThan(5);
    (2).should.not.be.below(2);
    (2).should.not.be.below(1);

    err(function(){
      (6).should.be.below(5);
    }, "expected 6 to be below 5");

    err(function(){
      (6).should.not.be.below(10);
    }, "expected 6 to be above 10");
  });

  test('match(regexp)', function(){
    'foobar'.should.match(/^foo/)
    'foobar'.should.not.match(/^bar/)

    err(function(){
      'foobar'.should.match(/^bar/i)
    }, "expected 'foobar' to match /^bar/i");

    err(function(){
      'foobar'.should.not.match(/^foo/i)
    }, "expected 'foobar' not to match /^foo/i");
  });

  test('length(n)', function(){
    'test'.should.have.length(4);
    'test'.should.not.have.length(3);
    [1,2,3].should.have.length(3);

    err(function(){
      (4).should.have.length(3);
    }, 'expected 4 to have a property \'length\'');

    err(function(){
      'asd'.should.not.have.length(3);
    }, "expected 'asd' to not have a length of 3");
  });

  test('eql(val)', function(){
    'test'.should.eql('test');
    ({ foo: 'bar' }).should.eql({ foo: 'bar' });
    (1).should.eql(1);
    '4'.should.not.eql(4);

    err(function(){
      (4).should.eql(3);
    }, 'expected 4 to equal 3');
  });

  test('equal(val)', function(){
    'test'.should.equal('test');
    (1).should.equal(1);

    err(function(){
      (4).should.equal(3);
    }, 'expected 4 to equal 3');

    err(function(){
      '4'.should.equal(4);
    }, "expected '4' to equal 4");
  });

  test('empty', function(){
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
    }, "expected {} not to be empty");

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

  test('property(name)', function(){
    'test'.should.have.property('length');
    (4).should.not.have.property('length');

    err(function(){
      'asd'.should.have.property('foo');
    }, "expected 'asd' to have a property 'foo'");
  });

  test('property(name, val)', function(){
    'test'.should.have.property('length', 4);
    'asd'.should.have.property('constructor', String);

    err(function(){
      'asd'.should.have.property('length', 4);
    }, "expected 'asd' to have a property 'length' of 4, but got 3");

    err(function(){
      'asd'.should.not.have.property('length', 3);
    }, "expected 'asd' to not have a property 'length' of 3");

    err(function(){
      'asd'.should.not.have.property('foo', 3);
    }, "'asd' has no property 'foo'");

    err(function(){
      'asd'.should.have.property('constructor', Number);
    }, "expected 'asd' to have a property 'constructor' of [Function: Number], but got [Function: String]");
  });

  test('ownProperty(name)', function(){
    'test'.should.have.ownProperty('length');
    'test'.should.haveOwnProperty('length');
    ({ length: 12 }).should.have.ownProperty('length');

    err(function(){
      ({ length: 12 }).should.not.have.ownProperty('length');
    }, "expected { length: 12 } to not have own property 'length'");
  });

  test('string()', function(){
    'foobar'.should.contain.string('bar');
    'foobar'.should.contain.string('foo');
    'foobar'.should.not.contain.string('baz');

    err(function(){
      (3).should.contain.string('baz');
    }, "expected 3 to be a string");

    err(function(){
      'foobar'.should.contain.string('baz');
    }, "expected 'foobar' to contain 'baz'");

    err(function(){
      'foobar'.should.not.contain.string('bar');
    }, "expected 'foobar' to not contain 'bar'");
  });

  test('include()', function(){
    ['foo', 'bar'].should.include('foo');
    ['foo', 'bar'].should.include('foo');
    ['foo', 'bar'].should.include('bar');
    [1,2].should.include(1);
    ['foo', 'bar'].should.not.include('baz');
    ['foo', 'bar'].should.not.include(1);

    err(function(){
      ['foo'].should.include('bar');
    }, "expected [ 'foo' ] to include 'bar'");

    err(function(){
      ['bar', 'foo'].should.not.include('foo');
    }, "expected [ 'bar', 'foo' ] to not include 'foo'");
  });

  test('keys(array)', function(){
    ({ foo: 1 }).should.have.keys(['foo']);
    ({ foo: 1, bar: 2 }).should.have.keys(['foo', 'bar']);
    ({ foo: 1, bar: 2 }).should.have.keys('foo', 'bar');
    ({ foo: 1, bar: 2, baz: 3 }).should.contain.keys('foo', 'bar');
    ({ foo: 1, bar: 2, baz: 3 }).should.contain.keys('bar', 'foo');
    ({ foo: 1, bar: 2, baz: 3 }).should.contain.keys('baz');

    ({ foo: 1, bar: 2 }).should.contain.keys('foo');
    ({ foo: 1, bar: 2 }).should.contain.keys('bar', 'foo');
    ({ foo: 1, bar: 2 }).should.contain.keys(['foo']);
    ({ foo: 1, bar: 2 }).should.contain.keys(['bar']);
    ({ foo: 1, bar: 2 }).should.contain.keys(['bar', 'foo']);

    ({ foo: 1, bar: 2 }).should.not.have.keys('baz');
    ({ foo: 1, bar: 2 }).should.not.have.keys('foo', 'baz');
    ({ foo: 1, bar: 2 }).should.not.contain.keys('baz');
    ({ foo: 1, bar: 2 }).should.not.contain.keys('foo', 'baz');
    ({ foo: 1, bar: 2 }).should.not.contain.keys('baz', 'foo');

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
  });

  test('throw', function () {
    var goodFn = function () { 1==1; }
      , badFn = function () { throw new Error('testing'); }
      , refErrFn = function () { throw new ReferenceError('hello'); };

    (goodFn).should.not.throw();
    (goodFn).should.not.throw(Error);
    (badFn).should.throw();
    (badFn).should.throw(Error);
    (badFn).should.not.throw(ReferenceError);
    (refErrFn).should.throw();
    (refErrFn).should.throw(ReferenceError);
    (refErrFn).should.not.throw(Error);
    (refErrFn).should.not.throw(TypeError);

    (badFn).should.throw(/testing/);
    (badFn).should.throw('testing');
    (badFn).should.not.throw(/hello/);
    (badFn).should.throw(Error, /testing/);
    (badFn).should.throw(Error, 'testing');

    should.throw(badFn);
    should.throw(refErrFn, ReferenceError);
    should.not.throw(goodFn);
    should.not.throw(badFn, ReferenceError);

    should.throw(badFn, Error, /testing/);
    should.throw(badFn, Error, 'testing');

    err(function(){
      (goodFn).should.throw();
    }, "expected [Function] to throw an error");

    err(function(){
      (goodFn).should.throw(ReferenceError);
    }, "expected [Function] to throw ReferenceError");

    err(function(){
      (badFn).should.not.throw();
    }, "expected [Function] to not throw an error");

    err(function(){
      (badFn).should.throw(ReferenceError);
    }, "expected [Function] to throw ReferenceError but a Error was thrown");

    err(function(){
      (badFn).should.not.throw(Error);
    }, "expected [Function] to not throw Error");

    err(function(){
      (refErrFn).should.not.throw(ReferenceError);
    }, "expected [Function] to not throw ReferenceError");

    err(function(){
      (refErrFn).should.throw(Error);
    }, "expected [Function] to throw Error but a ReferenceError was thrown");

    err(function (){
      (badFn).should.not.throw(/testing/);
    }, "expected [Function] to throw error not matching /testing/");

    err(function () {
      (badFn).should.throw(/hello/);
    }, "expected [Function] to throw error matching /hello/ but got \'testing\'");

    err(function () {
      (badFn).should.throw(Error, /hello/);
    }, "expected [Function] to throw error matching /hello/ but got 'testing'");

    err(function () {
      (badFn).should.throw(Error, 'hello');
    }, "expected [Function] to throw error including 'hello' but got 'testing'");
  });

  test('respondTo', function(){
    function Foo(){};
    Foo.prototype.bar = function(){};

    var bar = {};
    bar.foo = function(){};

    Foo.should.respondTo('bar');
    Foo.should.not.respondTo('foo');

    bar.should.respondTo('foo');

    err(function(){
      Foo.should.respondTo('baz');
    }, "expected [Function: Foo] to respond to \'baz\'");

    err(function(){
      bar.should.respondTo('baz');
    }, "expected { foo: [Function] } to respond to \'baz\'");
  });

  test('satisfy', function(){
    var matcher = function(num){
      return num === 1;
    };

    (1).should.satisfy(matcher);

    err(function(){
      (2).should.satisfy(matcher);
    }, "expected 2 to satisfy [Function]");
  });

  test('closeTo', function(){
    (1.5).should.be.closeTo(1.0, 0.5);

    err(function(){
      (2).should.be.closeTo(1.0, 0.5);
    }, "expected 2 to be close to 1 +/- 0.5");
  });
});
