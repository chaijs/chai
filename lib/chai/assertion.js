/*!
 * chai
 * http://chaijs.com
 * Copyright(c) 2011-2012 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */


/*!
 * Module dependencies.
 */

var AssertionError = require('./error')
  , toString = Object.prototype.toString
  , util = require('./utils')
  , flag = util.flag;

/*!
 * Module export.
 */

module.exports = Assertion;


/*!
 * Assertion Constructor
 *
 * Creates object for chaining.
 *
 * @api private
 */

function Assertion (obj, msg, stack) {
  flag(this, 'ssfi', stack || arguments.callee);
  flag(this, 'object', obj);
  flag(this, 'message', msg);
}

/*!
  * ### Assertion.includeStack
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

Assertion.addProperty = function (name, fn) {
  util.addProperty(this.prototype, name, fn);
};

Assertion.addMethod = function (name, fn) {
  util.addMethod(this.prototype, name, fn);
};

Assertion.addChainableMethod = function (name, fn, chainingBehavior) {
  util.addChainableMethod(this.prototype, name, fn, chainingBehavior);
};

Assertion.overwriteProperty = function (name, fn) {
  util.overwriteProperty(this.prototype, name, fn);
};

Assertion.overwriteMethod = function (name, fn) {
  util.overwriteMethod(this.prototype, name, fn);
};

/*!
 * ### .assert(expression, message, negateMessage, expected, actual)
 *
 * Executes an expression and check expectations. Throws AssertionError for reporting if test doesn't pass.
 *
 * @name assert
 * @param {Philosophical} expression to be tested
 * @param {String} message to display if fails
 * @param {String} negatedMessage to display if negated expression fails
 * @param {Mixed} expected value (remember to check for negation)
 * @param {Mixed} actual (optional) will default to `this.obj`
 * @api private
 */

Assertion.prototype.assert = function (expr, msg, negateMsg, expected, _actual) {
  var msg = util.getMessage(this, arguments)
    , actual = util.getActual(this, arguments)
    , ok = util.test(this, arguments);

  if (!ok) {
    throw new AssertionError({
        message: msg
      , actual: actual
      , expected: expected
      , stackStartFunction: (Assertion.includeStack) ? this.assert : flag(this, 'ssfi')
    });
  }
};

/*!
 *
 * ### ._obj
 *
 * Quick reference to stored `actual` value for plugin developers.
 *
 * @api private
 */

Object.defineProperty(Assertion.prototype, '_obj',
  { get: function () {
      return flag(this, 'object');
    }
  , set: function (val) {
      flag(this, 'object', val);
    }
});

/**
 * ### Language Chains
 *
 * The following are provide as chainable getters to
 * improve the readability of your assertions. They
 * do not provide an testing capability unless they
 * have been overwritten by a plugin.
 *
 * **Chains**
 *
 * - to
 * - be
 * - been
 * - is
 * - and
 * - have
 * - with
 *
 * @name language chains
 * @api public
 */

[ 'to', 'be', 'been'
, 'is', 'and', 'have'
, 'with' ].forEach(function (chain) {
  Object.defineProperty(Assertion.prototype, chain,
    { get: function () {
        return this;
      }
    , configurable: true
  });
});

/**
 * ### .not
 *
 * Negates any of assertions following in the chain.
 *
 *     expect(foo).to.not.equal('bar');
 *     expect(goodFn).to.not.throw(Error);
 *     expect({ foo: 'baz' }).to.have.property('foo')
 *       .and.not.equal('bar');
 *
 * @name not
 * @api public
 */

Object.defineProperty(Assertion.prototype, 'not',
  { get: function () {
      flag(this, 'negate', true);
      return this;
    }
  , configurable: true
});

/**
 * ### .deep
 *
 * Sets the `deep` flag, later used by the `equal` and
 * `property` assertions.
 *
 *     expect(foo).to.deep.equal({ bar: 'baz' });
 *     expect({ foo: { bar: { baz: 'quux' } } })
 *       .to.have.deep.property('foo.bar.baz', 'quux');
 *
 * @name deep
 * @api public
 */

Object.defineProperty(Assertion.prototype, 'deep',
  { get: function () {
      flag(this, 'deep', true);
      return this;
    }
  , configurable: true
});

/**
 * ### .a(type)
 *
 * The `a` and `an` assertions are aliases that can be
 * used either as language chains or to assert a value's
 * type (as revealed by `Object.prototype.toString`).
 *
 *     // typeof
 *     expect('test').to.be.a('string');
 *     expect({ foo: 'bar' }).to.be.an('object');
 *     expect(null).to.be.a('null');
 *     expect(undefined).to.be.an('undefined');
 *
 *     // language chain
 *     expect(foo).to.be.an.instanceof(Foo);
 *
 * @name a
 * @alias an
 * @param {String} type
 * @api public
 */

function an(type) {
  var obj = flag(this, 'object')
    , klassStart = type.charAt(0).toUpperCase()
    , klass = klassStart + type.slice(1)
    , article = ~[ 'A', 'E', 'I', 'O', 'U' ].indexOf(klassStart) ? 'an ' : 'a ';

  this.assert(
      '[object ' + klass + ']' === toString.call(obj)
    , 'expected #{this} to be ' + article + type
    , 'expected #{this} not to be ' + article + type
    , '[object ' + klass + ']'
    , toString.call(obj)
  );
}

Assertion.addChainableMethod('an', an);
Assertion.addChainableMethod('a', an);

/**
 * ### .include(value)
 *
 * The `include` and `contain` assertions can be used as either property
 * based language chains or as methods to assert the inclusion of an object
 * in an array or a substring in a string. When used as language chains,
 * they toggle the `contain` flag for the `keys` assertion.
 *
 *     expect([1,2,3]).to.include(2);
 *     expect('foobar').to.contain('foo');
 *     expect({ foo: 'bar', hello: 'universe' }).to.include.keys('foo');
 *
 * @name include
 * @alias contain
 * @param {Object|String|Number} obj
 * @api public
 */

function includeChainingBehavior () {
  flag(this, 'contains', true);
}

function include (val) {
  var obj = flag(this, 'object')
  this.assert(
      ~obj.indexOf(val)
    , 'expected #{this} to include ' + util.inspect(val)
    , 'expected #{this} to not include ' + util.inspect(val));
}

Assertion.addChainableMethod('include', include, includeChainingBehavior);
Assertion.addChainableMethod('contain', include, includeChainingBehavior);

/**
 * ### .ok
 *
 * Asserts that the target is truthy.
 *
 *     expect('everthing').to.be.ok;
 *     expect(1).to.be.ok;
 *     expect(false).to.not.be.ok;
 *     expect(undefined).to.not.be.ok;
 *     expect(null).to.not.be.ok;
 *
 * @name ok
 * @api public
 */

Object.defineProperty(Assertion.prototype, 'ok',
  { get: function () {
      this.assert(
          flag(this, 'object')
        , 'expected #{this} to be truthy'
        , 'expected #{this} to be falsy');

      return this;
    }
  , configurable: true
});

/**
 * ### .true
 *
 * Asserts that the target is `true`.
 *
 *     expect(true).to.be.true;
 *     expect(1).to.not.be.true;
 *
 * @name true
 * @api public
 */

Object.defineProperty(Assertion.prototype, 'true',
  { get: function () {
      this.assert(
          true === flag(this, 'object')
        , 'expected #{this} to be true'
        , 'expected #{this} to be false'
        , this.negate ? false : true
      );

      return this;
    }
  , configurable: true
});

/**
 * ### .false
 *
 * Asserts that the target is `false`.
 *
 *     expect(false).to.be.false;
 *     expect(0).to.not.be.false;
 *
 * @name false
 * @api public
 */

Object.defineProperty(Assertion.prototype, 'false',
  { get: function () {
      this.assert(
          false === flag(this, 'object')
        , 'expected #{this} to be false'
        , 'expected #{this} to be true'
        , this.negate ? true : false
      );

      return this;
    }
  , configurable: true
});

/**
 * ### .null
 *
 * Asserts that the target is `null`.
 *
 *     expect(null).to.be.null;
 *     expect(undefined).not.to.be.null;
 *
 * @name null
 * @api public
 */

Object.defineProperty(Assertion.prototype, 'null',
  { get: function () {
      this.assert(
          null === flag(this, 'object')
        , 'expected #{this} to be null'
        , 'expected #{this} not to be null'
        , this.negate ? false : true
      );

      return this;
    }
  , configurable: true
});

/**
 * ### .undefined
 *
 * Asserts that the target is `undefined`.
 *
 *      expect(undefined).to.be.undefined;
 *      expect(null).to.not.be.undefined;
 *
 * @name undefined
 * @api public
 */

Object.defineProperty(Assertion.prototype, 'undefined',
  { get: function () {
      this.assert(
          undefined === flag(this, 'object')
        , 'expected #{this} to be undefined'
        , 'expected #{this} not to be undefined'
        , this.negate ? false : true
      );

      return this;
    }
  , configurable: true
});

/**
 * ### .exist
 *
 * Asserts that the target is neither `null` nor `undefined`.
 *
 *     var foo = 'hi'
 *       , bar = null
 *       , baz;
 *
 *     expect(foo).to.exist;
 *     expect(bar).to.not.exist;
 *     expect(baz).to.not.exist;
 *
 * @name exist
 * @api public
 */

Object.defineProperty(Assertion.prototype, 'exist',
  { get: function () {
      this.assert(
          null != flag(this, 'object')
        , 'expected #{this} to exist'
        , 'expected #{this} to not exist'
      );

      return this;
    }
  , configurable: true
});

/**
 * ### .empty
 *
 * Asserts that the target's length is `0`. For arrays, it checks
 * the `length` property. For objects, it gets the count of
 * enumerable keys.
 *
 *     expect([]).to.be.empty;
 *     expect('').to.be.empty;
 *     expect({}).to.be.empty;
 *
 * @name empty
 * @api public
 */

Object.defineProperty(Assertion.prototype, 'empty',
  { get: function () {
      var obj = flag(this, 'object')
        , expected = obj;

      if (Array.isArray(obj) || 'string' === typeof object) {
        expected = obj.length;
      } else if (typeof obj === 'object') {
        expected = Object.keys(obj).length;
      }

      this.assert(
          !expected
        , 'expected #{this} to be empty'
        , 'expected #{this} not to be empty');

      return this;
    }
  , configurable: true
});

/**
 * ### .arguments
 *
 * Asserts that the target is an arguments object.
 *
 *     function test () {
 *       expect(arguments).to.be.arguments;
 *     }
 *
 * @name arguments
 * @alias Arguments
 * @api public
 */

function checkArguments () {
  var obj = flag(this, 'object')
    , type = Object.prototype.toString.call(obj);
  this.assert(
      '[object Arguments]' === type
    , 'expected #{this} to be arguments but got ' + type
    , 'expected #{this} to not be arguments'
  );
}

Assertion.addProperty('arguments', checkArguments);
Assertion.addProperty('Arguments', checkArguments);

/**
 * ### .equal(value)
 *
 * Asserts that the target is strictly equal (`===`) to `value`.
 * Alternately, if the `deep` flag is set, asserts that
 * the target is deeply equal to `value`.
 *
 *     expect('hello').to.equal('hello');
 *     expect(42).to.equal(42);
 *     expect(1).to.not.equal(true);
 *     expect({ foo: 'bar' }).to.not.equal({ foo: 'bar' });
 *     expect({ foo: 'bar' }).to.deep.equal({ foo: 'bar' });
 *
 * @name equal
 * @param {Mixed} value
 * @api public
 */

Assertion.prototype.equal = function (val) {
  var obj = flag(this, 'object');
  if (flag(this, 'deep')) {
    return this.eql(val);
  } else {
    this.assert(
        val === obj
      , 'expected #{this} to equal #{exp}'
      , 'expected #{this} to not equal #{exp}'
      , val);
  }

  return this;
};

/**
 * ### .eql(value)
 *
 * Asserts that the target is deeply equal to `value`.
 *
 *     expect({ foo: 'bar' }).to.eql({ foo: 'bar' });
 *     expect([ 1, 2, 3 ]).to.eql([ 1, 2, 3 ]);
 *
 * @name eql
 * @param {Mixed} value
 * @api public
 */

Assertion.prototype.eql = function (obj) {
  this.assert(
      util.eql(obj, flag(this, 'object'))
    , 'expected #{this} to deeply equal #{exp}'
    , 'expected #{this} to not deeply equal #{exp}'
    , obj );

  return this;
};

/**
 * ### .above(value)
 *
 * Asserts that the target is greater than `value`.
 *
 *     expect(10).to.be.above(5);
 *
 * @name above
 * @alias gt
 * @param {Number} value
 * @api public
 */

Assertion.prototype.above = function (val) {
  this.assert(
      flag(this, 'object') > val
    , 'expected #{this} to be above ' + val
    , 'expected #{this} to be below ' + val);

  return this;
};

/**
 * ### .below(value)
 *
 * Asserts that the target is less than `value`.
 *
 *     expect(5).to.be.below(10);
 *
 * @name below
 * @alias lt
 * @param {Number} value
 * @api public
 */

Assertion.prototype.below = function (val) {
  this.assert(
      flag(this, 'object') < val
    , 'expected #{this} to be below ' + val
    , 'expected #{this} to be above ' + val);

  return this;
};

/**
 * ### .within(start, finish)
 *
 * Asserts that the target is within a range.
 *
 *     expect(7).to.be.within(5,10);
 *
 * @name within
 * @param {Number} start lowerbound inclusive
 * @param {Number} finish upperbound inclusive
 * @api public
 */

Assertion.prototype.within = function (start, finish) {
  var obj = flag(this, 'object')
    , range = start + '..' + finish;

  this.assert(
      obj >= start && obj <= finish
    , 'expected #{this} to be within ' + range
    , 'expected #{this} to not be within ' + range);

  return this;
};

/**
 * ### .instanceof(constructor)
 *
 * Asserts that the target is an instance of `constructor`.
 *
 *     var Tea = function (name) { this.name = name; }
 *       , Chai = new Tea('chai');
 *
 *     expect(Chai).to.be.an.instanceof(Tea);
 *     expect([ 1, 2, 3 ]).to.be.instanceof(Array);
 *
 * @name instanceof
 * @param {Constructor} constructor
 * @alias instanceOf
 * @api public
 */

Assertion.prototype.instanceOf = function (constructor) {
  var name = util.getName(constructor);
  this.assert(
      flag(this, 'object') instanceof constructor
    , 'expected #{this} to be an instance of ' + name
    , 'expected #{this} to not be an instance of ' + name);

  return this;
};

/**
 * ### .property(name, [value])
 *
 * Asserts that the target has a property `name`, optionally asserting that
 * the value of that property is strictly equal to  `value`.
 * If the `deep` flag is set, you can use dot- and bracket-notation for deep
 * references into objects and arrays.
 *
 *     // simple referencing
 *     var obj = { foo: 'bar' };
 *     expect(obj).to.have.property('foo');
 *     expect(obj).to.have.property('foo', 'bar');
 *     expect(obj).to.have.property('foo').to.be.a('string');
 *
 *     // deep referencing
 *     var deepObj = {
 *         green: { tea: 'matcha' }
 *       , teas: [ 'chai', 'matcha', { tea: 'konacha' } ]
 *     };

 *     expect(deepObj).to.have.deep.property('green.tea', 'matcha');
 *     expect(deepObj).to.have.deep.property('teas[1]', 'matcha');
 *     expect(deepObj).to.have.deep.property('teas[2].tea', 'konacha');
 *
 * @name property
 * @param {String} name
 * @param {Mixed} value (optional)
 * @returns value of property for chaining
 * @api public
 */

Assertion.prototype.property = function (name, val) {
  var obj = flag(this, 'object')
    , value = flag(this, 'deep') ? util.getPathValue(name, obj) : obj[name]
    , descriptor = flag(this, 'deep') ? 'deep property ' : 'property '
    , negate = flag(this, 'negate');

  if (negate && undefined !== val) {
    if (undefined === value) {
      throw new Error(util.inspect(obj) + ' has no ' + descriptor + util.inspect(name));
    }
  } else {
    this.assert(
        undefined !== value
      , 'expected #{this} to have a ' + descriptor + util.inspect(name)
      , 'expected #{this} to not have ' + descriptor + util.inspect(name));
  }

  if (undefined !== val) {
    this.assert(
        val === value
      , 'expected #{this} to have a ' + descriptor + util.inspect(name) + ' of #{exp}, but got #{act}'
      , 'expected #{this} to not have a ' + descriptor + util.inspect(name) + ' of #{act}'
      , val
      , value
    );
  }

  flag(this, 'object', value);
  return this;
};

/**
 * ### .ownProperty(name)
 *
 * Asserts that the target has an own property `name`.
 *
 *     expect('test').to.have.ownProperty('length');
 *
 * @name ownProperty
 * @alias haveOwnProperty
 * @param {String} name
 * @api public
 */

Assertion.prototype.ownProperty = function (name) {
  var obj = flag(this, 'object');
  this.assert(
      obj.hasOwnProperty(name)
    , 'expected #{this} to have own property ' + util.inspect(name)
    , 'expected #{this} to not have own property ' + util.inspect(name));
  return this;
};

/**
 * ### .length(value)
 *
 * Asserts that the target's `length` property has the expected value.
 *
 *     expect([1,2,3]).to.have.length(3);
 *     expect('foobar').to.have.length(6);
 *
 * @name length
 * @alias lengthOf
 * @param {Number} length
 * @api public
 */

Assertion.prototype.length = function (n) {
  var obj = flag(this, 'object');
  new Assertion(obj).to.have.property('length');
  var len = obj.length;

  this.assert(
      len == n
    , 'expected #{this} to have a length of #{exp} but got #{act}'
    , 'expected #{this} to not have a length of #{act}'
    , n
    , len
  );

  return this;
};

/**
 * ### .match(regexp)
 *
 * Asserts that the target matches a regular expression.
 *
 *     expect('foobar').to.match(/^foo/);
 *
 * @name match
 * @param {RegExp} RegularExpression
 * @api public
 */

Assertion.prototype.match = function (re) {
  var obj = flag(this, 'object');
  this.assert(
      re.exec(obj)
    , 'expected #{this} to match ' + re
    , 'expected #{this} not to match ' + re);

  return this;
};


/**
 * ### .string(string)
 *
 * Asserts that the string target contains another string.
 *
 *     expect('foobar').to.have.string('bar');
 *
 * @name string
 * @param {String} string
 * @api public
 */

Assertion.prototype.string = function (str) {
  var obj = flag(this, 'object');
  new Assertion(obj).is.a('string');

  this.assert(
      ~obj.indexOf(str)
    , 'expected #{this} to contain ' + util.inspect(str)
    , 'expected #{this} to not contain ' + util.inspect(str));

  return this;
};

/**
 * ### .keys(key1, [key2], [...])
 *
 * Asserts that the target has exactly the given keys, or
 * asserts the inclusion of some keys when using the
 * `include` or `contain` modifiers.
 *
 *     expect({ foo: 1, bar: 2 }).to.have.keys(['foo', 'bar']);
 *     expect({ foo: 1, bar: 2, baz: 3 }).to.contain.keys('foo', 'bar');
 *
 * @name keys
 * @alias key
 * @param {String...|Array} keys
 * @api public
 */

Assertion.prototype.keys = function(keys) {
  var obj = flag(this, 'object')
    , str
    , ok = true;

  keys = keys instanceof Array
    ? keys
    : Array.prototype.slice.call(arguments);

  if (!keys.length) throw new Error('keys required');

  var actual = Object.keys(obj)
    , len = keys.length;

  // Inclusion
  ok = keys.every(function(key){
    return ~actual.indexOf(key);
  });

  // Strict
  if (!flag(this, 'negate') && !flag(this, 'contains')) {
    ok = ok && keys.length == actual.length;
  }

  // Key string
  if (len > 1) {
    keys = keys.map(function(key){
      return util.inspect(key);
    });
    var last = keys.pop();
    str = keys.join(', ') + ', and ' + last;
  } else {
    str = util.inspect(keys[0]);
  }

  // Form
  str = (len > 1 ? 'keys ' : 'key ') + str;

  // Have / include
  str = (flag(this, 'contains') ? 'contain ' : 'have ') + str;

  // Assertion
  this.assert(
      ok
    , 'expected #{this} to ' + str
    , 'expected #{this} to not ' + str
    , keys
    , Object.keys(obj)
  );

  return this;
}

/**
 * ### .throw(constructor)
 *
 * Asserts that the function target will throw a specific error, or specific type of error
 * (as determined using `instanceof`), optionally with a RegExp or string inclusion test
 * for the error's message.
 *
 *     var err = new ReferenceError('This is a bad function.');
 *     var fn = function () { throw err; }
 *     expect(fn).to.throw(ReferenceError);
 *     expect(fn).to.throw(Error);
 *     expect(fn).to.throw(/bad function/);
 *     expect(fn).to.not.throw('good function');
 *     expect(fn).to.throw(ReferenceError, /bad function/);
 *     expect(fn).to.throw(err);
 *     expect(fn).to.not.throw(new RangeError('Out of range.'));
 *
 * Please note that when a throw expectation is negated, it will check each
 * parameter independently, starting with error constructor type. The appropriate way
 * to check for the existence of a type of error but for a message that does not match
 * is to use `and`.
 *
 *     expect(fn).to.throw(ReferenceError)
 *        .and.not.throw(/good function/);
 *
 * @name throw
 * @alias throws
 * @alias Throw
 * @param {ErrorConstructor} constructor
 * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
 * @api public
 */

Assertion.prototype.Throw = function (constructor, msg) {
  var obj = flag(this, 'object');
  new Assertion(obj).is.a('function');

  var thrown = false
    , desiredError = null
    , name = null;

  if (arguments.length === 0) {
    msg = null;
    constructor = null;
  } else if (constructor && (constructor instanceof RegExp || 'string' === typeof constructor)) {
    msg = constructor;
    constructor = null;
  } else if (constructor && constructor instanceof Error) {
    desiredError = constructor;
    constructor = null;
    msg = null;
  } else if (typeof constructor === 'function') {
    name = (new constructor()).name;
  } else {
    constructor = null;
  }

  try {
    obj();
  } catch (err) {
    // first, check desired error
    if (desiredError) {
      this.assert(
          err === desiredError
        , 'expected #{this} to throw ' + util.inspect(desiredError) + ' but ' + util.inspect(err) + ' was thrown'
        , 'expected #{this} to not throw ' + util.inspect(desiredError)
      );
      return this;
    }
    // next, check constructor
    if (constructor) {
      this.assert(
          err instanceof constructor
        , 'expected #{this} to throw ' + name + ' but a ' + err.name + ' was thrown'
        , 'expected #{this} to not throw ' + name );
      if (!msg) return this;
    }
    // next, check message
    if (err.message && msg && msg instanceof RegExp) {
      this.assert(
          msg.exec(err.message)
        , 'expected #{this} to throw error matching ' + msg + ' but got ' + util.inspect(err.message)
        , 'expected #{this} to throw error not matching ' + msg
      );
      return this;
    } else if (err.message && msg && 'string' === typeof msg) {
      this.assert(
          ~err.message.indexOf(msg)
        , 'expected #{this} to throw error including #{exp} but got #{act}'
        , 'expected #{this} to throw error not including #{act}'
        , msg
        , err.message
      );
      return this;
    } else {
      thrown = true;
    }
  }

  var expectedThrown = name ? name : desiredError ? util.inspect(desiredError) : 'an error';

  this.assert(
      thrown === true
    , 'expected #{this} to throw ' + expectedThrown
    , 'expected #{this} to not throw ' + expectedThrown);

  return this;
};

/**
 * ### .respondTo(method)
 *
 * Asserts that the object or class target will respond to a method.
 *
 *     Klass.prototype.bar = function(){};
 *     expect(Klass).to.respondTo('bar');
 *     expect(obj).to.respondTo('bar');
 *
 * To check if a constructor will respond to a static function,
 * set the `itself` flag.
 *
 *    Klass.baz = function(){};
 *    expect(Klass).itself.to.respondTo('baz');
 *
 * @name respondTo
 * @param {String} method
 * @api public
 */

Assertion.prototype.respondTo = function (method) {
  var obj = flag(this, 'object')
    , itself = flag(this, 'itself')
    , context = ('function' === typeof obj && !itself)
      ? obj.prototype[method]
      : obj[method];

  this.assert(
      'function' === typeof context
    , 'expected #{this} to respond to ' + util.inspect(method)
    , 'expected #{this} to not respond to ' + util.inspect(method)
    , 'function'
    , typeof context
  );

  return this;
};

/**
 * ### .itself
 *
 * Sets the `itself` flag, later used by the `respondTo` assertion.
 *
 *    function Foo() {}
 *    Foo.bar = function() {}
 *    Foo.prototype.baz = function() {}
 *
 *    expect(Foo).itself.to.respondTo('bar');
 *    expect(Foo).itself.not.to.respondTo('baz');
 *
 * @name itself
 * @api public
 */
Object.defineProperty(Assertion.prototype, 'itself',
  { get: function () {
      flag(this, 'itself', true);
      return this;
    }
  , configurable: true
});

/**
 * ### .satisfy(method)
 *
 * Asserts that the target passes a given truth test.
 *
 *     expect(1).to.satisfy(function(num) { return num > 0; });
 *
 * @name satisfy
 * @param {Function} matcher
 * @api public
 */

Assertion.prototype.satisfy = function (matcher) {
  var obj = flag(this, 'object');
  this.assert(
      matcher(obj)
    , 'expected #{this} to satisfy ' + util.inspect(matcher)
    , 'expected #{this} to not satisfy' + util.inspect(matcher)
    , this.negate ? false : true
    , matcher(obj)
  );

  return this;
};

/**
 * ### .closeTo(expected, delta)
 *
 * Asserts that the target is equal `expected`, to within a +/- `delta` range.
 *
 *     expect(1.5).to.be.closeTo(1, 0.5);
 *
 * @name closeTo
 * @param {Number} expected
 * @param {Number} delta
 * @api public
 */

Assertion.prototype.closeTo = function (expected, delta) {
  var obj = flag(this, 'object');
  this.assert(
      (obj - delta === expected) || (obj + delta === expected)
    , 'expected #{this} to be close to ' + expected + ' +/- ' + delta
    , 'expected #{this} not to be close to ' + expected + ' +/- ' + delta);

  return this;
};

/*!
 * Aliases.
 */

(function alias(name, as){
  Assertion.prototype[as] = Assertion.prototype[name];
  return alias;
})
('equal', 'eq')
('above', 'gt')
('below', 'lt')
('length', 'lengthOf')
('keys', 'key')
('ownProperty', 'haveOwnProperty')
('above', 'greaterThan')
('below', 'lessThan')
('Throw', 'throws')
('Throw', 'throw')
('instanceOf', 'instanceof');
