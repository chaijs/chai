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

/*!
 * Module dependencies.
 */

var AssertionError = require('./error')
  , eql = require('./utils/eql')
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

function Assertion (obj, msg) {
  this.obj = obj;
  this.msg = msg;
}

/*!
 * # .assert(expression, message, negateMessage)
 *
 * Executes an expression and check expectations.
 * Throws AssertionError for reporting.
 *
 * @name assert
 * @param {Philosophical} expression to be tested
 * @param {String} message to display if fails
 * @param {String} negatedMessage to display if negated expression fails
 * @api privage
 */

Assertion.prototype.assert = function (expr, msg, negateMsg) {
  var msg = (this.msg ? this.msg + ': ' : '') + (this.negate ? negateMsg : msg)
    , ok = this.negate ? !expr : expr;

  if (!ok) {
    throw new AssertionError({
      message: msg,
      startStackFunction: this.assert
    });
  }
};

/*!
 * # inpsect
 *
 * Returns the current object stringified.
 *
 * @name inspect
 * @api private
 */

Assertion.prototype.__defineGetter__('inspect', function () {
  return inspect(this.obj);
});

/**
 * # to
 *
 * Language chain.
 *
 * @name to
 * @api public
 */

Assertion.prototype.__defineGetter__('to', function () {
  return this;
});

/**
 * # be
 *
 * Language chain.
 *
 * @name be
 * @api public
 */

Assertion.prototype.__defineGetter__('be', function () {
  return this;
});

/**
 * # an
 *
 * Language chain.
 *
 * @name an
 * @api public
 */

Assertion.prototype.__defineGetter__('an', function () {
  return this;
});

/**
 * # is
 *
 * Language chain.
 *
 * @name is
 * @api public
 */

Assertion.prototype.__defineGetter__('is', function () {
  return this;
});

/**
 * # and
 *
 * Language chain.
 *
 * @name and
 * @api public
 */

Assertion.prototype.__defineGetter__('and', function () {
  return this;
});

/**
 * # have
 *
 * Language chain.
 *
 * @name have
 * @api public
 */

Assertion.prototype.__defineGetter__('have', function () {
  return this;
});

/**
 * # with
 *
 * Language chain.
 *
 * @name with
 * @api public
 */

Assertion.prototype.__defineGetter__('with', function () {
  return this;
});

/**
 * # .not
 *
 * Negates any of assertions following in the chain.
 *
 * @name not
 * @api public
 */

Assertion.prototype.__defineGetter__('not', function () {
  this.negate = true;
  return this;
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

Assertion.prototype.__defineGetter__('ok', function () {
  this.assert(
      this.obj
    , 'expected ' + this.inspect + ' to be truthy'
    , 'expected ' + this.inspect + ' to be falsey');

  return this;
});

/**
 * # .true
 *
 * Assert object is true
 *
 * @name true
 * @api public
 */

Assertion.prototype.__defineGetter__('true', function () {
  this.assert(
      true === this.obj
    , 'expected ' + this.inspect + ' to be true'
    , 'expected ' + this.inspect + ' to be false');

  return this;
});

/**
 * # .false
 *
 * Assert object is false
 *
 * @name false
 * @api public
 */

Assertion.prototype.__defineGetter__('false', function () {
  this.assert(
      false === this.obj
    , 'expected ' + this.inspect + ' to be false'
    , 'expected ' + this.inspect + ' to be true');

  return this;
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
 * @name exist;
 * @api public
 */

Assertion.prototype.__defineGetter__('exist', function () {
  this.assert(
      null != this.obj
    , 'expected ' + this.inspect + ' to exist'
    , 'expected ' + this.inspect + ' to not exist');

  return this;
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

Assertion.prototype.__defineGetter__('empty', function () {
  new Assertion(this.obj).to.have.property('length');

  this.assert(
      0 === this.obj.length
    , 'expected ' + this.inspect + ' to be empty'
    , 'expected ' + this.inspect + ' not to be empty');

  return this;
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

Assertion.prototype.__defineGetter__('arguments', function () {
  this.assert(
      '[object Arguments]' == Object.prototype.toString.call(this.obj)
    , 'expected ' + this.inspect + ' to be arguments'
    , 'expected ' + this.inspect + ' to not be arguments');

  return this;
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
    , 'expected ' + this.inspect + ' to not equal ' + inspect(val));

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
    , 'expected ' + this.inspect + ' to not equal ' + inspect(obj));
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
  this.assert(
      type == typeof this.obj
    , 'expected ' + this.inspect + ' to be a ' + type
    , 'expected ' + this.inspect + ' not to be a ' + type);

  return this;
};

/**
 * # .instanceOf(constructor)
 *
 * Assert instanceof.
 *
 *      expect(42).to.be.instanceof(Number);
 *      expect([4,2]).to.be.instanceof(Array);
 *
 * @name instanceOf
 * @param {Constructor}
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
 * # respondTo(method)
 *
 * Assert that `method` is a function.
 *
 *      var res = { send: function () {} };
 *      expect(res).to.respondTo('send');
 *
 * @name respondTo
 * @param {String} method name
 * @api public
 */

Assertion.prototype.respondTo = function (method) {
  this.assert(
    'function' == typeof this.obj[method]
    , 'expected ' + this.inspect + ' to respond to ' + method + '()'
    , 'expected ' + this.inspect + ' to not respond to ' + method + '()');

  return this;
}

/**
 * # .property(name, [value])
 *
 * Assert that property of `name` exists,
 * optionally with `value`.
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
      , 'expected ' + this.inspect + ' to not have a property ' + inspect(name) + ' of ' +  inspect(val));
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
    , 'expected ' + this.inspect + ' to not have a length of ' + len);

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
 * # .contain(obj)
 *
 * Assert the inclusion of an object in an Array
 *
 *      expect([1,2,3]).to.contain(2);
 *
 * @name contain
 * @param {Object|String|Number} obj
 * @api public
 */

Assertion.prototype.contain = function (obj) {
  new Assertion(this.obj).to.be.an.instanceof(Array);

  this.assert(
      ~this.obj.indexOf(obj)
    , 'expected ' + this.inspect + ' to contain ' + inspect(obj)
    , 'expected ' + this.inspect + ' to not contain ' + inspect(obj));

  return this;
};

/**
 * # .string(string)
 *
 * Assert inclusion of string in string.
 *
 *      expect('foobar').to.include.string('bar');
 *
 * @name string
 * @param {String} string
 * @api public
 */

Assertion.prototype.string = function (str) {
  new Assertion(this.obj).is.a('string');

  this.assert(
      ~this.obj.indexOf(str)
    , 'expected ' + this.inspect + ' to include ' + inspect(str)
    , 'expected ' + this.inspect + ' to not include ' + inspect(str));

  return this;
};

/**
 * # .object(object)
 *
 * Assert inclusion of object in object.
 *
 *      var obj = {foo: 'bar', baz: {baaz: 42}, qux: 13};
 *      expect(obj).to.include.object({foo: 'bar'});
 *
 * @name object
 * @param {Object} object
 * @api public
 */

Assertion.prototype.object = function(obj){
  new Assertion(this.obj).is.a('object');

  var included = true;

  for (var key in obj) {
    if (obj.hasOwnProperty(key) && !eql(obj[key], this.obj[key])) {
      included = false;
      break;
    }
  }

  this.assert(
      included
    , 'expected ' + this.inspect + ' to include ' + inspect(obj)
    , 'expected ' + this.inspect + ' to not include ' + inspect(obj));

  return this;
}

/**
 * # include
 *
 * Language chain that lags #keys to test for inclusion testing.
 *
 * @name include
 * @api public
 */

Assertion.prototype.__defineGetter__('include', function () {
  this.includes = true;
  return this;
});

/**
 * # .keys(key1, [key2], [...])
 *
 * Assert exact keys or the inclusing of keys using
 * the include modifier.
 *
 *      expect({ foo: 1, bar: 2 }).to.have.keys(['foo', 'bar']);
 *      expect({ foo: 1, bar: 2, baz: 3 }).to.include.keys('foo', 'bar');
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
  if (!this.negate && !this.includes) {
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
  str = (this.includes ? 'include ' : 'have ') + str;

  // Assertion
  this.assert(
      ok
    , 'expected ' + this.inspect + ' to ' + str
    , 'expected ' + this.inspect + ' to not ' + str);

  return this;
}

/**
 * # .throw(constructor)
 *
 * Assert that a function will throw a specific
 * type of error.
 *
 *      var fn = function () { throw new ReferenceError(''); }
 *      expect(fn).to.throw(ReferenceError);
 *
 * @name throw
 * @alias throws
 * @param {ErrorConstructor} constructor
 * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
 * @api public
 */

Assertion.prototype.throw = function (constructor) {
  new Assertion(this.obj).is.a('function');

  constructor = constructor || Error;
  var name = constructor.name
    , thrown = false;

  try {
    this.obj();
  } catch (err) {
    thrown = true;
    this.assert(
        err instanceof constructor
      , 'expected ' + this.inspect + ' to throw ' + name
      , 'expected ' + this.inspect + ' to not throw ' + name);
    return this;
  }

  this.assert(
      thrown === true
    , 'expected ' + this.inspect + ' to throw ' + name
    , 'expected ' + this.inspect + ' to not throw ' + name);
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
('throw', 'throws');