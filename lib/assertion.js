/*!
 * chai
 * Copyright(c) 2011 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 *
 * Primarily a refactor of: should.js
 * https://github.com/visionmedia/should.js
 * Copyright(c) 2011 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * ### BDD Style Introduction
 *
 * The BDD style is exposed through `expect` or `should` interfaces. In both
 * scenarios, you chain together natural language assertions.
 *
 *      // expect
 *      var expect = require('chai').expect;
 *      expect(foo).to.equal('bar');
 *
 *      // should
 *      var should = require('chai').should();
 *      foo.should.equal('bar');
 *
 * #### Differences
 *
 * The `expect` interface provides a function as a starting point for chaining
 * your language assertions. It works on node.js and in all browsers.
 *
 * The `should` interface extends `Object.prototype` to provide a single getter as
 * the starting point for your language assertions. It works on node.js and in
 * all browsers except Internet Explorer.
 *
 * #### Configuration
 *
 * By default, Chai does not show stack traces upon an AssertionError. This can
 * be changed by modifying the `includeStack` parameter for chai.Assertion. For example:
 *
 *      var chai = require('chai');
 *      chai.Assertion.includeStack = true; // defaults to false
 */

/*!
 * Module dependencies.
 */

var AssertionError = require('./error')
  , eql = require('./utils/eql')
  , toString = Object.prototype.toString
  , inspect = require('./utils/inspect');

/*!
 * Module export.
 */

module.exports = Assertion;


/*!
 * # Assertion Constructor
 *
 * Creates object for chaining.
 *
 * @api private
 */

function Assertion (obj, msg, stack) {
  this.ssfi = stack || arguments.callee;
  this.obj = obj;
  this.msg = msg;
}

/*!
  * ## Assertion.includeStack
  * , toString = Object.prototype.toString
  *
  * User configurable property, influences whether stack trace
  * is included in Assertion error message. Default of false
  * suppresses stack trace in the error message
  *
  *     Assertion.includeStack = true;  // enable stack on error
  *
  * @api public
  */

Assertion.includeStack = false;

/*!
 * # .assert(expression, message, negateMessage)
 *
 * Executes an expression and check expectations. Throws AssertionError for reporting if test doesn't pass.
 *
 * @name assert
 * @param {Philosophical} expression to be tested
 * @param {String} message to display if fails
 * @param {String} negatedMessage to display if negated expression fails
 * @api private
 */

Assertion.prototype.assert = function (expr, msg, negateMsg, expected, actual) {
  actual = actual || this.obj;
  var msg = (this.negate ? negateMsg : msg)
    , ok = this.negate ? !expr : expr;

  if (!ok) {
    throw new AssertionError({
        message: this.msg ? this.msg + ': ' + msg : msg // include custom message if available
      , actual: actual
      , expected: expected
      , stackStartFunction: (Assertion.includeStack) ? this.assert : this.ssfi
    });
  }
};

/*!
 * # inspect
 *
 * Returns the current object stringified.
 *
 * @name inspect
 * @api private
 */

Object.defineProperty(Assertion.prototype, 'inspect',
  { get: function () {
      return inspect(this.obj);
    }
  , configurable: true
});

/**
 * # to
 *
 * Language chain.
 *
 * @name to
 * @api public
 */

Object.defineProperty(Assertion.prototype, 'to',
  { get: function () {
      return this;
    }
  , configurable: true
});

/**
 * # be
 *
 * Language chain.
 *
 * @name be
 * @api public
 */

Object.defineProperty(Assertion.prototype, 'be',
  { get: function () {
      return this;
    }
  , configurable: true
});

/**
 * # been
 *
 * Language chain. Also tests `tense` to past for addon
 * modules that use the tense feature.
 *
 * @name been
 * @api public
 */

Object.defineProperty(Assertion.prototype, 'been',
  { get: function () {
      this.tense = 'past';
      return this;
    }
  , configurable: true
});

/**
 * # an
 *
 * Language chain.
 *
 * @name an
 * @api public
 */

Object.defineProperty(Assertion.prototype, 'an',
  { get: function () {
      return this;
    }
  , configurable: true
});
/**
 * # is
 *
 * Language chain.
 *
 * @name is
 * @api public
 */

Object.defineProperty(Assertion.prototype, 'is',
  { get: function () {
      return this;
    }
  , configurable: true
});

/**
 * # and
 *
 * Language chain.
 *
 * @name and
 * @api public
 */

Object.defineProperty(Assertion.prototype, 'and',
  { get: function () {
      return this;
    }
  , configurable: true
});

/**
 * # have
 *
 * Language chain.
 *
 * @name have
 * @api public
 */

Object.defineProperty(Assertion.prototype, 'have',
  { get: function () {
      return this;
    }
  , configurable: true
});

/**
 * # with
 *
 * Language chain.
 *
 * @name with
 * @api public
 */

Object.defineProperty(Assertion.prototype, 'with',
  { get: function () {
      return this;
    }
  , configurable: true
});

/**
 * # .not
 *
 * Negates any of assertions following in the chain.
 *
 * @name not
 * @api public
 */

Object.defineProperty(Assertion.prototype, 'not',
  { get: function () {
      this.negate = true;
      return this;
    }
  , configurable: true
});

/**
 * # .ok
 *
 * Assert object truthiness.
 *
 *      expect('everthing').to.be.ok;
 *      expect(false).to.not.be.ok;
 *      expect(undefined).to.not.be.ok;
 *      expect(null).to.not.be.ok;
 *
 * @name ok
 * @api public
 */

Object.defineProperty(Assertion.prototype, 'ok',
  { get: function () {
      this.assert(
          this.obj
        , 'expected ' + this.inspect + ' to be truthy'
        , 'expected ' + this.inspect + ' to be falsy');

      return this;
    }
  , configurable: true
});

/**
 * # .true
 *
 * Assert object is true
 *
 * @name true
 * @api public
 */

Object.defineProperty(Assertion.prototype, 'true',
  { get: function () {
      this.assert(
          true === this.obj
        , 'expected ' + this.inspect + ' to be true'
        , 'expected ' + this.inspect + ' to be false'
        , this.negate ? false : true
      );

      return this;
    }
  , configurable: true
});

/**
 * # .false
 *
 * Assert object is false
 *
 * @name false
 * @api public
 */

Object.defineProperty(Assertion.prototype, 'false',
  { get: function () {
      this.assert(
          false === this.obj
        , 'expected ' + this.inspect + ' to be false'
        , 'expected ' + this.inspect + ' to be true'
        , this.negate ? true : false
      );

      return this;
    }
  , configurable: true
});

/**
 * # .exist
 *
 * Assert object exists (null).
 *
 *      var foo = 'hi'
 *        , bar;
 *      expect(foo).to.exist;
 *      expect(bar).to.not.exist;
 *
 * @name exist
 * @api public
 */

Object.defineProperty(Assertion.prototype, 'exist',
  { get: function () {
      this.assert(
          null != this.obj
        , 'expected ' + this.inspect + ' to exist'
        , 'expected ' + this.inspect + ' to not exist'
      );

      return this;
    }
  , configurable: true
});

/**
 * # .empty
 *
 * Assert object's length to be 0.
 *
 *      expect([]).to.be.empty;
 *
 * @name empty
 * @api public
 */

Object.defineProperty(Assertion.prototype, 'empty',
  { get: function () {
      var expected = this.obj;

      if (Array.isArray(this.obj)) {
        expected = this.obj.length;
      } else if (typeof this.obj === 'object') {
        expected = Object.keys(this.obj).length;
      }

      this.assert(
          !expected
        , 'expected ' + this.inspect + ' to be empty'
        , 'expected ' + this.inspect + ' not to be empty');

      return this;
    }
  , configurable: true
});

/**
 * # .arguments
 *
 * Assert object is an instanceof arguments.
 *
 *      function test () {
 *        expect(arguments).to.be.arguments;
 *      }
 *
 * @name arguments
 * @api public
 */

Object.defineProperty(Assertion.prototype, 'arguments',
  { get: function () {
      this.assert(
          '[object Arguments]' == Object.prototype.toString.call(this.obj)
        , 'expected ' + this.inspect + ' to be arguments'
        , 'expected ' + this.inspect + ' to not be arguments'
        , '[object Arguments]'
        , Object.prototype.toString.call(this.obj)
      );

      return this;
    }
  , configurable: true
});

/**
 * # .equal(value)
 *
 * Assert strict equality.
 *
 *      expect('hello').to.equal('hello');
 *
 * @name equal
 * @param {*} value
 * @api public
 */

Assertion.prototype.equal = function (val) {
  this.assert(
      val === this.obj
    , 'expected ' + this.inspect + ' to equal ' + inspect(val)
    , 'expected ' + this.inspect + ' to not equal ' + inspect(val)
    , val );

  return this;
};

/**
 * # .eql(value)
 *
 * Assert deep equality.
 *
 *      expect({ foo: 'bar' }).to.eql({ foo: 'bar' });
 *
 * @name eql
 * @param {*} value
 * @api public
 */

Assertion.prototype.eql = function (obj) {
  this.assert(
      eql(obj, this.obj)
    , 'expected ' + this.inspect + ' to equal ' + inspect(obj)
    , 'expected ' + this.inspect + ' to not equal ' + inspect(obj)
    , obj );

  return this;
};

/**
 * # .above(value)
 *
 * Assert greater than `value`.
 *
 *      expect(10).to.be.above(5);
 *
 * @name above
 * @param {Number} value
 * @api public
 */

Assertion.prototype.above = function (val) {
  this.assert(
      this.obj > val
    , 'expected ' + this.inspect + ' to be above ' + val
    , 'expected ' + this.inspect + ' to be below ' + val);

  return this;
};

/**
 * # .below(value)
 *
 * Assert less than `value`.
 *
 *      expect(5).to.be.below(10);
 *
 * @name below
 * @param {Number} value
 * @api public
 */

Assertion.prototype.below = function (val) {
  this.assert(
      this.obj < val
    , 'expected ' + this.inspect + ' to be below ' + val
    , 'expected ' + this.inspect + ' to be above ' + val);

  return this;
};

/**
 * # .within(start, finish)
 *
 * Assert that a number is within a range.
 *
 *      expect(7).to.be.within(5,10);
 *
 * @name within
 * @param {Number} start lowerbound inclusive
 * @param {Number} finish upperbound inclusive
 * @api public
 */

Assertion.prototype.within = function (start, finish) {
  var range = start + '..' + finish;

  this.assert(
      this.obj >= start && this.obj <= finish
    , 'expected ' + this.inspect + ' to be within ' + range
    , 'expected ' + this.inspect + ' to not be within ' + range);

  return this;
};

/**
 * # .a(type)
 *
 * Assert typeof.
 *
 *      expect('test').to.be.a('string');
 *
 * @name a
 * @param {String} type
 * @api public
 */

Assertion.prototype.a = function (type) {
  var klass = type.charAt(0).toUpperCase() + type.slice(1);

  this.assert(
      '[object ' + klass + ']' === toString.call(this.obj)
    , 'expected ' + this.inspect + ' to be a ' + type
    , 'expected ' + this.inspect + ' not to be a ' + type
    , '[object ' + klass + ']'
    , toString.call(this.obj)
  );

  return this;
};

/**
 * # .instanceof(constructor)
 *
 * Assert instanceof.
 *
 *      var Tea = function (name) { this.name = name; }
 *        , Chai = new Tea('chai');
 *
 *      expect(Chai).to.be.an.instanceOf(Tea);
 *
 * @name instanceof
 * @param {Constructor}
 * @alias instanceOf
 * @api public
 */

Assertion.prototype.instanceof = function (constructor) {
  var name = constructor.name;
  this.assert(
      this.obj instanceof constructor
    , 'expected ' + this.inspect + ' to be an instance of ' + name
    , 'expected ' + this.inspect + ' to not be an instance of ' + name);

  return this;
};

/**
 * # .property(name, [value])
 *
 * Assert that property of `name` exists, optionally with `value`.
 *
 *      var obj = { foo: 'bar' }
 *      expect(obj).to.have.property('foo');
 *      expect(obj).to.have.property('foo', 'bar');
 *      expect(obj).to.have.property('foo').to.be.a('string');
 *
 * @name property
 * @param {String} name
 * @param {*} value (optional)
 * @returns value of property for chaining
 * @api public
 */

Assertion.prototype.property = function (name, val) {
  if (this.negate && undefined !== val) {
    if (undefined === this.obj[name]) {
      throw new Error(this.inspect + ' has no property ' + inspect(name));
    }
  } else {
    this.assert(
        undefined !== this.obj[name]
      , 'expected ' + this.inspect + ' to have a property ' + inspect(name)
      , 'expected ' + this.inspect + ' to not have property ' + inspect(name));
  }

  if (undefined !== val) {
    this.assert(
        val === this.obj[name]
      , 'expected ' + this.inspect + ' to have a property ' + inspect(name) + ' of ' +
          inspect(val) + ', but got ' + inspect(this.obj[name])
      , 'expected ' + this.inspect + ' to not have a property ' + inspect(name) + ' of ' +  inspect(val)
      , val
      , this.obj[val]
    );
  }

  this.obj = this.obj[name];
  return this;
};

/**
 * # .ownProperty(name)
 *
 * Assert that has own property by `name`.
 *
 *      expect('test').to.have.ownProperty('length');
 *
 * @name ownProperty
 * @alias haveOwnProperty
 * @param {String} name
 * @api public
 */

Assertion.prototype.ownProperty = function (name) {
  this.assert(
      this.obj.hasOwnProperty(name)
    , 'expected ' + this.inspect + ' to have own property ' + inspect(name)
    , 'expected ' + this.inspect + ' to not have own property ' + inspect(name));
  return this;
};

/**
 * # .length(val)
 *
 * Assert that object has expected length.
 *
 *      expect([1,2,3]).to.have.length(3);
 *      expect('foobar').to.have.length(6);
 *
 * @name length
 * @alias lengthOf
 * @param {Number} length
 * @api public
 */

Assertion.prototype.length = function (n) {
  new Assertion(this.obj).to.have.property('length');
  var len = this.obj.length;

  this.assert(
      len == n
    , 'expected ' + this.inspect + ' to have a length of ' + n + ' but got ' + len
    , 'expected ' + this.inspect + ' to not have a length of ' + len
    , n
    , len
  );

  return this;
};

/**
 * # .match(regexp)
 *
 * Assert that matches regular expression.
 *
 *      expect('foobar').to.match(/^foo/);
 *
 * @name match
 * @param {RegExp} RegularExpression
 * @api public
 */

Assertion.prototype.match = function (re) {
  this.assert(
      re.exec(this.obj)
    , 'expected ' + this.inspect + ' to match ' + re
    , 'expected ' + this.inspect + ' not to match ' + re);

  return this;
};

/**
 * # .include(obj)
 *
 * Assert the inclusion of an object in an Array or substring in string.
 *
 *      expect([1,2,3]).to.include(2);
 *
 * @name include
 * @param {Object|String|Number} obj
 * @api public
 */

Assertion.prototype.include = function (obj) {
  this.assert(
      ~this.obj.indexOf(obj)
    , 'expected ' + this.inspect + ' to include ' + inspect(obj)
    , 'expected ' + this.inspect + ' to not include ' + inspect(obj));

  return this;
};

/**
 * # .string(string)
 *
 * Assert inclusion of string in string.
 *
 *      expect('foobar').to.have.string('bar');
 *
 * @name string
 * @param {String} string
 * @api public
 */

Assertion.prototype.string = function (str) {
  new Assertion(this.obj).is.a('string');

  this.assert(
      ~this.obj.indexOf(str)
    , 'expected ' + this.inspect + ' to contain ' + inspect(str)
    , 'expected ' + this.inspect + ' to not contain ' + inspect(str));

  return this;
};



/**
 * # contain
 *
 * Toggles the `contain` flag for the `keys` assertion.
 *
 * @name contain
 * @api public
 */

Object.defineProperty(Assertion.prototype, 'contain',
  { get: function () {
      this.contains = true;
      return this;
    },
    configurable: true
});

/**
 * # .keys(key1, [key2], [...])
 *
 * Assert exact keys or the inclusing of keys using the `contain` modifier.
 *
 *      expect({ foo: 1, bar: 2 }).to.have.keys(['foo', 'bar']);
 *      expect({ foo: 1, bar: 2, baz: 3 }).to.contain.keys('foo', 'bar');
 *
 * @name keys
 * @alias key
 * @param {String|Array} Keys
 * @api public
 */

Assertion.prototype.keys = function(keys) {
  var str
    , ok = true;

  keys = keys instanceof Array
    ? keys
    : Array.prototype.slice.call(arguments);

  if (!keys.length) throw new Error('keys required');

  var actual = Object.keys(this.obj)
    , len = keys.length;

  // Inclusion
  ok = keys.every(function(key){
    return ~actual.indexOf(key);
  });

  // Strict
  if (!this.negate && !this.contains) {
    ok = ok && keys.length == actual.length;
  }

  // Key string
  if (len > 1) {
    keys = keys.map(function(key){
      return inspect(key);
    });
    var last = keys.pop();
    str = keys.join(', ') + ', and ' + last;
  } else {
    str = inspect(keys[0]);
  }

  // Form
  str = (len > 1 ? 'keys ' : 'key ') + str;

  // Have / include
  str = (this.contains ? 'contain ' : 'have ') + str;

  // Assertion
  this.assert(
      ok
    , 'expected ' + this.inspect + ' to ' + str
    , 'expected ' + this.inspect + ' to not ' + str
    , keys
    , Object.keys(this.obj)
  );

  return this;
}

/**
 * # .throw(constructor)
 *
 * Assert that a function will throw a specific type of error or that error
 * thrown will match a RegExp or include a string.
 *
 *      var fn = function () { throw new ReferenceError('This is a bad function.'); }
 *      expect(fn).to.throw(ReferenceError);
 *      expect(fn).to.throw(/bad function/);
 *      expect(fn).to.not.throw('good function');
 *      expect(fn).to.throw(ReferenceError, /bad function/);
 *
 * Please note that when a throw expectation is negated, it will check each
 * parameter independently, starting with Error constructor type. The appropriate way
 * to check for the existence of a type of error but for a message that does not match
 * is to use `and`.
 *
 *      expect(fn).to.throw(ReferenceError).and.not.throw(/good function/);
 *
 * @name throw
 * @alias throws
 * @alias Throw
 * @param {ErrorConstructor} constructor
 * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
 * @api public
 */

Assertion.prototype.throw = function (constructor, msg) {
  new Assertion(this.obj).is.a('function');

  var thrown = false;

  if (arguments.length === 0) {
    msg = null;
    constructor = null;
  } else if (constructor && (constructor instanceof RegExp || 'string' === typeof constructor)) {
    msg = constructor;
    constructor = null;
  }

  try {
    this.obj();
  } catch (err) {
    // first, check constructor
    if (constructor && 'function' === typeof constructor) {
      this.assert(
          err instanceof constructor && err.name == constructor.name
        , 'expected ' + this.inspect + ' to throw ' + constructor.name + ' but a ' + err.name + ' was thrown'
        , 'expected ' + this.inspect + ' to not throw ' + constructor.name );
      if (!msg) return this;
    }
    // next, check message
    if (err.message && msg && msg instanceof RegExp) {
      this.assert(
          msg.exec(err.message)
        , 'expected ' + this.inspect + ' to throw error matching ' + msg + ' but got ' + inspect(err.message)
        , 'expected ' + this.inspect + ' to throw error not matching ' + msg
      );
      return this;
    } else if (err.message && msg && 'string' === typeof msg) {
      this.assert(
          ~err.message.indexOf(msg)
        , 'expected ' + this.inspect + ' to throw error including ' + inspect(msg) + ' but got ' + inspect(err.message)
        , 'expected ' + this.inspect + ' to throw error not including ' + inspect(msg)
      );
      return this;
    } else {
      thrown = true;
    }
  }

  var name = (constructor ? constructor.name : 'an error');

  this.assert(
      thrown === true
    , 'expected ' + this.inspect + ' to throw ' + name
    , 'expected ' + this.inspect + ' to not throw ' + name);

  return this;
};

/**
 * # .respondTo(method)
 *
 * Assert that object/class will respond to a method.
 *
 *      expect(Klass).to.respondTo('bar');
 *      expect(obj).to.respondTo('bar');
 *
 * @name respondTo
 * @param {String} method
 * @api public
 */

Assertion.prototype.respondTo = function (method) {
  var context = ('function' === typeof this.obj)
    ? this.obj.prototype[method]
    : this.obj[method];

  this.assert(
      'function' === typeof context
    , 'expected ' + this.inspect + ' to respond to ' + inspect(method)
    , 'expected ' + this.inspect + ' to not respond to ' + inspect(method)
    , 'function'
    , typeof context
  );

  return this;
};

/**
 * # .satisfy(method)
 *
 * Assert that passes a truth test.
 *
 *      expect(1).to.satisfy(function(num) { return num > 0; });
 *
 * @name satisfy
 * @param {Function} matcher
 * @api public
 */

Assertion.prototype.satisfy = function (matcher) {
  this.assert(
      matcher(this.obj)
    , 'expected ' + this.inspect + ' to satisfy ' + inspect(matcher)
    , 'expected ' + this.inspect + ' to not satisfy' + inspect(matcher)
    , this.negate ? false : true
    , matcher(this.obj)
  );

  return this;
};

/**
 * # .closeTo(expected, delta)
 *
 * Assert that actual is equal to +/- delta.
 *
 *      expect(1.5).to.be.closeTo(1, 0.5);
 *
 * @name closeTo
 * @param {Number} expected
 * @param {Number} delta
 * @api public
 */

Assertion.prototype.closeTo = function (expected, delta) {
  this.assert(
      (this.obj - delta === expected) || (this.obj + delta === expected)
    , 'expected ' + this.inspect + ' to be close to ' + expected + ' +/- ' + delta
    , 'expected ' + this.inspect + ' not to be close to ' + expected + ' +/- ' + delta);

  return this;
};

/*!
 * Aliases.
 */

(function alias(name, as){
  Assertion.prototype[as] = Assertion.prototype[name];
  return alias;
})
('length', 'lengthOf')
('keys', 'key')
('ownProperty', 'haveOwnProperty')
('above', 'greaterThan')
('below', 'lessThan')
('throw', 'throws')
('throw', 'Throw') // for troublesome browsers
('instanceof', 'instanceOf');
