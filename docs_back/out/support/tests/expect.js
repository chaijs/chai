/*!
 * Module dependencies.
 *
 * Chai is automatically included in the browser.
 */

if (!chai) {
  var chai = require('..');
}

var expect = chai.expect;

function err(fn, msg) {
  try {
    fn();
    throw new chai.AssertionError({ message: 'Expected an error' });
  } catch (err) {
    expect(msg).to.equal(err.message);
  }
}

suite('expect', function () {

  test('=.version', function() {
    expect(chai.version).to.match(/^\d+\.\d+\.\d+$/);
  });

  test('=double require', function(){
    //require('chai').expect().to.equal(expect);
  });

  test('assertion', function(){
    expect('test').to.be.a('string');
    expect('foo').to.equal('foo');
  });

  test('true', function(){
    expect(true).to.be.true;
    expect(false).to.not.be.true;
    expect(1).to.not.be.true;

    err(function(){
      expect('test').to.be.true;
    }, "expected 'test' to be true")
  });

  test('ok', function(){
    expect(true).to.be.ok;
    expect(false).to.not.be.ok;
    expect(1).to.be.ok;
    expect(0).to.not.be.ok;

    err(function(){
      expect('').to.be.ok;
    }, "expected '' to be truthy");

    err(function(){
      expect('test').to.not.be.ok;
    }, "expected 'test' to be falsy");
  });

  test('false', function(){
    expect(false).to.be.false;
    expect(true).to.not.be.false;
    expect(0).to.not.be.false;

    err(function(){
      expect('').to.be.false;
    }, "expected '' to be false")
  });

  test('exist', function(){
    var foo = 'bar'
      , bar;
    expect(foo).to.exist;
    expect(bar).to.not.exist;
  });

  test('arguments', function(){
    var args = (function(){ return arguments; })(1,2,3);
    expect(args).to.be.arguments;
    expect([]).to.not.be.arguments;
  });

  test('.equal()', function(){
    var foo;
    expect(undefined).to.equal(foo);
  });

  test('typeof', function(){
    expect('test').to.be.a('string');

    err(function(){
      expect('test').to.not.be.a('string');
    }, "expected 'test' not to be a string");

    expect(5).to.be.a('number');
    expect(new Number(1)).to.be.a('number');
    expect(Number(1)).to.be.a('number');
    expect(true).to.be.a('boolean');
    expect(new Array()).to.be.a('array');
    expect(new Object()).to.be.a('object');
    expect({}).to.be.a('object');
    expect([]).to.be.a('array');
    expect(function() {}).to.be.a('function');

    err(function(){
      expect(5).to.not.be.a('number');
    }, "expected 5 not to be a number");
  });

  test('instanceof', function(){
    function Foo(){}
    expect(new Foo()).to.be.an.instanceof(Foo);

    err(function(){
      expect(3).to.an.instanceof(Foo);
    }, "expected 3 to be an instance of Foo");
  });

  test('within(start, finish)', function(){
    expect(5).to.be.within(5, 10);
    expect(5).to.be.within(3,6);
    expect(5).to.be.within(3,5);
    expect(5).to.not.be.within(1,3);

    err(function(){
      expect(5).to.not.be.within(4,6);
    }, "expected 5 to not be within 4..6");

    err(function(){
      expect(10).to.be.within(50,100);
    }, "expected 10 to be within 50..100");
  });

  test('above(n)', function(){
    expect(5).to.be.above(2);
    expect(5).to.be.greaterThan(2);
    expect(5).to.not.be.above(5);
    expect(5).to.not.be.above(6);

    err(function(){
      expect(5).to.be.above(6);
    }, "expected 5 to be above 6");

    err(function(){
      expect(10).to.not.be.above(6);
    }, "expected 10 to be below 6");
  });

  test('below(n)', function(){
    expect(2).to.be.below(5);
    expect(2).to.be.lessThan(5);
    expect(2).to.not.be.below(2);
    expect(2).to.not.be.below(1);

    err(function(){
      expect(6).to.be.below(5);
    }, "expected 6 to be below 5");

    err(function(){
      expect(6).to.not.be.below(10);
    }, "expected 6 to be above 10");
  });

  test('match(regexp)', function(){
    expect('foobar').to.match(/^foo/)
    expect('foobar').to.not.match(/^bar/)

    err(function(){
      expect('foobar').to.match(/^bar/i)
    }, "expected 'foobar' to match /^bar/i");

    err(function(){
      expect('foobar').to.not.match(/^foo/i)
    }, "expected 'foobar' not to match /^foo/i");
  });

  test('length(n)', function(){
    expect('test').to.have.length(4);
    expect('test').to.not.have.length(3);
    expect([1,2,3]).to.have.length(3);

    err(function(){
      expect(4).to.have.length(3);
    }, 'expected 4 to have a property \'length\'');

    err(function(){
      expect('asd').to.not.have.length(3);
    }, "expected 'asd' to not have a length of 3");
  });

  test('eql(val)', function(){
    expect('test').to.eql('test');
    expect({ foo: 'bar' }).to.eql({ foo: 'bar' });
    expect(1).to.eql(1);
    expect('4').to.not.eql(4);

    err(function(){
      expect(4).to.eql(3);
    }, 'expected 4 to equal 3');
  });

  test('equal(val)', function(){
    expect('test').to.equal('test');
    expect(1).to.equal(1);

    err(function(){
      expect(4).to.equal(3);
    }, 'expected 4 to equal 3');

    err(function(){
      expect('4').to.equal(4);
    }, "expected '4' to equal 4");
  });

  test('empty', function(){
    function FakeArgs() {};
    FakeArgs.prototype.length = 0;

    expect('').to.be.empty;
    expect('foo').not.to.be.empty;
    expect([]).to.be.empty;
    expect(['foo']).not.to.be.empty;
    expect(new FakeArgs).to.be.empty;
    expect({arguments: 0}).not.to.be.empty;
    expect({}).to.be.empty;
    expect({foo: 'bar'}).not.to.be.empty;

    err(function(){
      expect('').not.to.be.empty;
    }, "expected \'\' not to be empty");

    err(function(){
      expect('foo').to.be.empty;
    }, "expected \'foo\' to be empty");

    err(function(){
      expect([]).not.to.be.empty;
    }, "expected [] not to be empty");

    err(function(){
      expect(['foo']).to.be.empty;
    }, "expected [ \'foo\' ] to be empty");

    err(function(){
      expect(new FakeArgs).not.to.be.empty;
    }, "expected {} not to be empty");

    err(function(){
      expect({arguments: 0}).to.be.empty;
    }, "expected { arguments: 0 } to be empty");

    err(function(){
      expect({}).not.to.be.empty;
    }, "expected {} not to be empty");

    err(function(){
      expect({foo: 'bar'}).to.be.empty;
    }, "expected { foo: \'bar\' } to be empty");
  });

  test('property(name)', function(){
    expect('test').to.have.property('length');
    expect(4).to.not.have.property('length');

    err(function(){
      expect('asd').to.have.property('foo');
    }, "expected 'asd' to have a property 'foo'");
  });

  test('property(name, val)', function(){
    expect('test').to.have.property('length', 4);
    expect('asd').to.have.property('constructor', String);

    err(function(){
      expect('asd').to.have.property('length', 4);
    }, "expected 'asd' to have a property 'length' of 4, but got 3");

    err(function(){
      expect('asd').to.not.have.property('length', 3);
    }, "expected 'asd' to not have a property 'length' of 3");

    err(function(){
      expect('asd').to.not.have.property('foo', 3);
    }, "'asd' has no property 'foo'");

    err(function(){
      expect('asd').to.have.property('constructor', Number);
    }, "expected 'asd' to have a property 'constructor' of [Function: Number], but got [Function: String]");
  });

  test('ownProperty(name)', function(){
    expect('test').to.have.ownProperty('length');
    expect('test').to.haveOwnProperty('length');
    expect({ length: 12 }).to.have.ownProperty('length');

    err(function(){
      expect({ length: 12 }).to.not.have.ownProperty('length');
    }, "expected { length: 12 } to not have own property 'length'");
  });

  test('string()', function(){
    expect('foobar').to.have.string('bar');
    expect('foobar').to.have.string('foo');
    expect('foobar').to.not.have.string('baz');

    err(function(){
      expect(3).to.have.string('baz');
    }, "expected 3 to be a string");

    err(function(){
      expect('foobar').to.have.string('baz');
    }, "expected 'foobar' to contain 'baz'");

    err(function(){
      expect('foobar').to.not.have.string('bar');
    }, "expected 'foobar' to not contain 'bar'");
  });

  test('include()', function(){
    expect(['foo', 'bar']).to.include('foo');
    expect(['foo', 'bar']).to.include('foo');
    expect(['foo', 'bar']).to.include('bar');
    expect([1,2]).to.include(1);
    expect(['foo', 'bar']).to.not.include('baz');
    expect(['foo', 'bar']).to.not.include(1);

    err(function(){
      expect(['foo']).to.include('bar');
    }, "expected [ 'foo' ] to include 'bar'");

    err(function(){
      expect(['bar', 'foo']).to.not.include('foo');
    }, "expected [ 'bar', 'foo' ] to not include 'foo'");
  });

  test('keys(array)', function(){
    expect({ foo: 1 }).to.have.keys(['foo']);
    expect({ foo: 1, bar: 2 }).to.have.keys(['foo', 'bar']);
    expect({ foo: 1, bar: 2 }).to.have.keys('foo', 'bar');
    expect({ foo: 1, bar: 2, baz: 3 }).to.contain.keys('foo', 'bar');
    expect({ foo: 1, bar: 2, baz: 3 }).to.contain.keys('bar', 'foo');
    expect({ foo: 1, bar: 2, baz: 3 }).to.contain.keys('baz');

    expect({ foo: 1, bar: 2 }).to.contain.keys('foo');
    expect({ foo: 1, bar: 2 }).to.contain.keys('bar', 'foo');
    expect({ foo: 1, bar: 2 }).to.contain.keys(['foo']);
    expect({ foo: 1, bar: 2 }).to.contain.keys(['bar']);
    expect({ foo: 1, bar: 2 }).to.contain.keys(['bar', 'foo']);

    expect({ foo: 1, bar: 2 }).to.not.have.keys('baz');
    expect({ foo: 1, bar: 2 }).to.not.have.keys('foo', 'baz');
    expect({ foo: 1, bar: 2 }).to.not.contain.keys('baz');
    expect({ foo: 1, bar: 2 }).to.not.contain.keys('foo', 'baz');
    expect({ foo: 1, bar: 2 }).to.not.contain.keys('baz', 'foo');

    err(function(){
      expect({ foo: 1 }).to.have.keys();
    }, "keys required");

    err(function(){
      expect({ foo: 1 }).to.have.keys([]);
    }, "keys required");

    err(function(){
      expect({ foo: 1 }).to.not.have.keys([]);
    }, "keys required");

    err(function(){
      expect({ foo: 1 }).to.contain.keys([]);
    }, "keys required");

    err(function(){
      expect({ foo: 1 }).to.have.keys(['bar']);
    }, "expected { foo: 1 } to have key 'bar'");

    err(function(){
      expect({ foo: 1 }).to.have.keys(['bar', 'baz']);
    }, "expected { foo: 1 } to have keys 'bar', and 'baz'");

    err(function(){
      expect({ foo: 1 }).to.have.keys(['foo', 'bar', 'baz']);
    }, "expected { foo: 1 } to have keys 'foo', 'bar', and 'baz'");

    err(function(){
      expect({ foo: 1 }).to.not.have.keys(['foo']);
    }, "expected { foo: 1 } to not have key 'foo'");

    err(function(){
      expect({ foo: 1 }).to.not.have.keys(['foo']);
    }, "expected { foo: 1 } to not have key 'foo'");

    err(function(){
      expect({ foo: 1, bar: 2 }).to.not.have.keys(['foo', 'bar']);
    }, "expected { foo: 1, bar: 2 } to not have keys 'foo', and 'bar'");

    err(function(){
      expect({ foo: 1 }).to.not.contain.keys(['foo']);
    }, "expected { foo: 1 } to not contain key 'foo'");

    err(function(){
      expect({ foo: 1 }).to.contain.keys('foo', 'bar');
    }, "expected { foo: 1 } to contain keys 'foo', and 'bar'");
  });

  test('chaining', function(){
    var tea = { name: 'chai', extras: ['milk', 'sugar', 'smile'] };
    expect(tea).to.have.property('extras').with.lengthOf(3);

    err(function(){
      expect(tea).to.have.property('extras').with.lengthOf(4);
    }, "expected [ 'milk', 'sugar', 'smile' ] to have a length of 4 but got 3");

    expect(tea).to.be.a('object').and.have.property('name', 'chai');
  });

  test('throw', function () {
    var goodFn = function () { 1==1; }
      , badFn = function () { throw new Error('testing'); }
      , refErrFn = function () { throw new ReferenceError(); };

    expect(goodFn).to.not.throw();
    expect(goodFn).to.not.throw(Error);
    expect(badFn).to.throw();
    expect(badFn).to.throw(Error);
    expect(badFn).to.not.throw(ReferenceError);
    expect(refErrFn).to.throw();
    expect(refErrFn).to.throw(ReferenceError);
    expect(refErrFn).to.not.throw(Error);
    expect(refErrFn).to.not.throw(TypeError);

    expect(badFn).to.throw(/testing/);
    expect(badFn).to.not.throw(/hello/);
    expect(badFn).to.throw('testing');
    expect(badFn).to.not.throw('hello');

    expect(badFn).to.throw(Error, /testing/);
    expect(badFn).to.throw(Error, 'testing');

    err(function(){
      expect(goodFn).to.throw();
    }, "expected [Function] to throw an error");

    err(function(){
      expect(goodFn).to.throw(ReferenceError);
    }, "expected [Function] to throw ReferenceError");

    err(function(){
      expect(badFn).to.not.throw();
    }, "expected [Function] to not throw an error");

    err(function(){
      expect(badFn).to.throw(ReferenceError);
    }, "expected [Function] to throw ReferenceError but a Error was thrown");

    err(function(){
      expect(badFn).to.not.throw(Error);
    }, "expected [Function] to not throw Error");

    err(function(){
      expect(refErrFn).to.not.throw(ReferenceError);
    }, "expected [Function] to not throw ReferenceError");

    err(function(){
      expect(refErrFn).to.throw(Error);
    }, "expected [Function] to throw Error but a ReferenceError was thrown");

    err(function (){
      expect(badFn).to.not.throw(/testing/);
    }, "expected [Function] to throw error not matching /testing/");

    err(function () {
      expect(badFn).to.throw(/hello/);
    }, "expected [Function] to throw error matching /hello/ but got \'testing\'");

    err(function () {
      expect(badFn).to.throw(Error, /hello/);
    }, "expected [Function] to throw error matching /hello/ but got 'testing'");

    err(function () {
      expect(badFn).to.throw(Error, 'hello');
    }, "expected [Function] to throw error including 'hello' but got 'testing'");
  });

  test('respondTo', function(){
    function Foo(){};
    Foo.prototype.bar = function(){};

    var bar = {};
    bar.foo = function(){};

    expect(Foo).to.respondTo('bar');
    expect(Foo).to.not.respondTo('foo');

    expect(bar).to.respondTo('foo');

    err(function(){
      expect(Foo).to.respondTo('baz');
    }, "expected [Function: Foo] to respond to \'baz\'");

    err(function(){
      expect(bar).to.respondTo('baz');
    }, "expected { foo: [Function] } to respond to \'baz\'");
  });

  test('satisfy', function(){
    var matcher = function(num){
      return num === 1;
    };

    expect(1).to.satisfy(matcher);

    err(function(){
      expect(2).to.satisfy(matcher);
    }, "expected 2 to satisfy [Function]");
  });

  test('closeTo', function(){
    expect(1.5).to.be.closeTo(1.0, 0.5);

    err(function(){
      expect(2).to.be.closeTo(1.0, 0.5);
    }, "expected 2 to be close to 1 +/- 0.5");
  });
});
