/**
 * Module dependencies.
 */

// if we are in a browser session, chai is already defined
if (!chai) {
  var chai = require('../')
    , expect = chai.expect;
}

function err(fn, msg) {
  try {
    fn();
    chai.fail('expected an error');
  } catch (err) {
    expect(msg).to.equal(err.message);
  }
}

var expectTests = module.exports = {
  'expect': {
    'test .version': function(){
      expect(chai.version).to.match(/^\d+\.\d+\.\d+$/);
    },

    'test double require': function(){
      //require('chai').expect().to.equal(expect);
    },

    'test assertion': function(){
      expect('test').to.be.a('string');
      expect('foo').to.equal('foo');
    },

    'test true': function(){
      expect(true).to.be.true;
      expect(false).to.not.be.true;
      expect(1).to.not.be.true;

      err(function(){
        expect('test').to.be.true;
      }, "expected 'test' to be true")
    },

    'test ok': function(){
      expect(true).to.be.ok;
      expect(false).to.not.be.ok;
      expect(1).to.be.ok;
      expect(0).to.not.be.ok;

      err(function(){
        expect('').to.be.ok;
      }, "expected '' to be truthy");

      err(function(){
        expect('test').to.not.be.ok;
      }, "expected 'test' to be falsey");
    },

    'test false': function(){
      expect(false).to.be.false;
      expect(true).to.not.be.false;
      expect(0).to.not.be.false;

      err(function(){
        expect('').to.be.false;
      }, "expected '' to be false")
    },

    'test arguments': function(){
      var args = (function(){ return arguments; })(1,2,3);
      expect(args).to.be.arguments;
      expect([]).to.not.be.arguments;
    },

    'test .equal()': function(){
      var foo;
      expect(undefined).to.equal(foo);
    },

    'test typeof': function(){
      expect('test').to.be.a('string');

      err(function(){
        expect('test').to.not.be.a('string');
      }, "expected 'test' not to be a string");

      expect(5).to.be.a('number');

      err(function(){
        expect(5).to.not.be.a('number');
      }, "expected 5 not to be a number");
    },

    'test instanceof': function(){
      function Foo(){}
      expect(new Foo()).to.be.an.instanceof(Foo);

      err(function(){
        expect(3).to.an.instanceof(Foo);
      }, "expected 3 to be an instance of Foo");
    },

    'test within(start, finish)': function(){
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
    },

    'test above(n)': function(){
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
    },

    'test match(regexp)': function(){
      expect('foobar').to.match(/^foo/)
      expect('foobar').to.not.match(/^bar/)

      err(function(){
        expect('foobar').to.match(/^bar/i)
      }, "expected 'foobar' to match /^bar/i");

      err(function(){
        expect('foobar').to.not.match(/^foo/i)
      }, "expected 'foobar' not to match /^foo/i");
    },

    'test length(n)': function(){
      expect('test').to.have.length(4);
      expect('test').to.not.have.length(3);
      expect([1,2,3]).to.have.length(3);

      err(function(){
        expect(4).to.have.length(3);
      }, 'expected 4 to have a property \'length\'');

      err(function(){
        expect('asd').to.not.have.length(3);
      }, "expected 'asd' to not have a length of 3");
    },

    'test eql(val)': function(){
      expect('test').to.eql('test');
      expect({ foo: 'bar' }).to.eql({ foo: 'bar' });
      expect(1).to.eql(1);
      expect('4').to.not.eql(4);

      err(function(){
        expect(4).to.eql(3);
      }, 'expected 4 to equal 3');
    },

    'test equal(val)': function(){
      expect('test').to.equal('test');
      expect(1).to.equal(1);

      err(function(){
        expect(4).to.equal(3);
      }, 'expected 4 to equal 3');

      err(function(){
        expect('4').to.equal(4);
      }, "expected '4' to equal 4");
    },

    'test empty': function(){
      expect('').to.be.empty;
      expect([]).to.be.empty;
      expect({ length: 0 }).to.be.empty;

      err(function(){
        expect({}).to.be.empty;
      }, 'expected {} to have a property \'length\'');

      err(function(){
        expect('asd').to.be.empty;
      }, "expected 'asd' to be empty");

      err(function(){
        expect('').to.not.be.empty;
      }, "expected '' not to be empty");
    },

    'test property(name)': function(){
      expect('test').to.have.property('length');
      expect(4).to.not.have.property('length');

      err(function(){
        expect('asd').to.have.property('foo');
      }, "expected 'asd' to have a property 'foo'");
    },

    'test property(name, val)': function(){
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
    },

    'test ownProperty(name)': function(){
      expect('test').to.have.ownProperty('length');
      expect('test').to.haveOwnProperty('length');
      expect({ length: 12 }).to.have.ownProperty('length');

      err(function(){
        expect({ length: 12 }).to.not.have.ownProperty('length');
      }, "expected { length: 12 } to not have own property 'length'");
    },

    'test string()': function(){
      expect('foobar').to.include.string('bar');
      expect('foobar').to.include.string('foo');
      expect('foobar').to.not.include.string('baz');

      err(function(){
        expect(3).to.include.string('baz');
      }, "expected 3 to be a string");

      err(function(){
        expect('foobar').to.include.string('baz');
      }, "expected 'foobar' to include 'baz'");

      err(function(){
        expect('foobar').to.not.include.string('bar');
      }, "expected 'foobar' to not include 'bar'");
    },

    'test object()': function(){
      var obj = {foo: 'bar', baz: {baaz: 42}, qux: 13};
      expect(obj).to.include.object({foo: 'bar'});
      expect(obj).to.include.object({baz: {baaz: 42}});
      expect(obj).to.include.object({foo: 'bar', qux: 13});
      expect(obj).to.not.include.object({foo: 'baz'});
      expect(obj).to.not.include.object({foo: 'bar', baz: {baaz: -42}});

      err(function(){
        expect(3).to.include.object({foo: 'bar'});
      }, "expected 3 to be a object");

      err(function(){
        var obj = {foo: 'bar'};
        expect(obj).to.include.object({foo: 'baz'});
      }, "expected { foo: 'bar' } to include { foo: 'baz' }");

      err(function(){
        var obj = {foo: 'bar'};
        expect(obj).to.not.include.object({foo: 'bar'});
      }, "expected { foo: 'bar' } to not include { foo: 'bar' }");
    },
    'test contain()': function(){
      expect(['foo', 'bar']).to.contain('foo');
      expect(['foo', 'bar']).to.contain('foo');
      expect(['foo', 'bar']).to.contain('bar');
      expect([1,2]).to.contain(1);
      expect(['foo', 'bar']).to.not.contain('baz');
      expect(['foo', 'bar']).to.not.contain(1);

      err(function(){
        expect(['foo']).to.contain('bar');
      }, "expected [ 'foo' ] to contain 'bar'");

      err(function(){
        expect(['bar', 'foo']).to.not.contain('foo');
      }, "expected [ 'bar', 'foo' ] to not contain 'foo'");
    },

    'test keys(array)': function(){
      expect({ foo: 1 }).to.have.keys(['foo']);
      expect({ foo: 1, bar: 2 }).to.have.keys(['foo', 'bar']);
      expect({ foo: 1, bar: 2 }).to.have.keys('foo', 'bar');
      expect({ foo: 1, bar: 2, baz: 3 }).to.include.keys('foo', 'bar');
      expect({ foo: 1, bar: 2, baz: 3 }).to.include.keys('bar', 'foo');
      expect({ foo: 1, bar: 2, baz: 3 }).to.include.keys('baz');

      expect({ foo: 1, bar: 2 }).to.include.keys('foo');
      expect({ foo: 1, bar: 2 }).to.include.keys('bar', 'foo');
      expect({ foo: 1, bar: 2 }).to.include.keys(['foo']);
      expect({ foo: 1, bar: 2 }).to.include.keys(['bar']);
      expect({ foo: 1, bar: 2 }).to.include.keys(['bar', 'foo']);

      expect({ foo: 1, bar: 2 }).to.not.have.keys('baz');
      expect({ foo: 1, bar: 2 }).to.not.have.keys('foo', 'baz');
      expect({ foo: 1, bar: 2 }).to.not.include.keys('baz');
      expect({ foo: 1, bar: 2 }).to.not.include.keys('foo', 'baz');
      expect({ foo: 1, bar: 2 }).to.not.include.keys('baz', 'foo');

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
        expect({ foo: 1 }).to.include.keys([]);
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
        expect({ foo: 1 }).to.not.include.keys(['foo']);
      }, "expected { foo: 1 } to not include key 'foo'");

      err(function(){
        expect({ foo: 1 }).to.include.keys('foo', 'bar');
      }, "expected { foo: 1 } to include keys 'foo', and 'bar'");
    },

    'test respondTo(method)': function(){
      expect('test').to.respondTo('toString');
      expect('test').to.not.respondTo('toBuffer');
    },

    'test chaining': function(){
      var user = { name: 'tj', pets: ['tobi', 'loki', 'jane', 'bandit'] };
      expect(user).to.have.property('pets').with.lengthOf(4);

      err(function(){
        expect(user).to.have.property('pets').with.lengthOf(5);
      }, "expected [ 'tobi', 'loki', 'jane', 'bandit' ] to have a length of 5 but got 4");

      expect(user).to.be.a('object').and.have.property('name', 'tj');
    }
  }
};