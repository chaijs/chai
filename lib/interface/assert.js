/*!
 * chai
 * Copyright(c) 2011-2012 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */


module.exports = function (chai, util) {

  /*!
   * Chai dependencies.
   */

  var Assertion = chai.Assertion
    , flag = util.flag;

  /*!
   * Module export.
   */

  /**
   * ### assert(expressions, errorMessage)
   *
   * Write your own test expressions.
   *
   * @param {Mixed} expression to test for truthiness.
   * @param {String} message to display on error
   * @name assert
   * @api public
   */

  var assert = chai.assert = function (express, errmsg) {
    var test = new Assertion(null);
    test.assert(
        express
      , errmsg
      , '[ negation message unavailable ]'
    );
  };

  /**
   * ### .fail(actual, expect, msg, operator)
   *
   * Throw a failure. Node.js compatible.
   *
   * @name fail
   * @param {*} actual value
   * @param {*} expected value
   * @param {String} message
   * @param {String} operator
   * @api public
   */

  assert.fail = function (actual, expected, message, operator) {
    throw new chai.AssertionError({
        actual: actual
      , expected: expected
      , message: message
      , operator: operator
      , stackStartFunction: assert.fail
    });
  };

  /**
   * ### .ok(object, [message])
   *
   * Assert object is truthy.
   *
   *      assert.ok('everthing', 'everything is ok');
   *      assert.ok(false, 'this will fail');
   *
   * @name ok
   * @param {*} object to test
   * @param {String} message
   * @api public
   */

  assert.ok = function (val, msg) {
    new Assertion(val, msg).is.ok;
  };

  /**
   * ### .equal(actual, expected, [message])
   *
   * Assert non-strict equality (==).
   *
   *      assert.equal(3, 3, 'these numbers are equal');
   *
   * @name equal
   * @param {*} actual
   * @param {*} expected
   * @param {String} message
   * @api public
   */

  assert.equal = function (act, exp, msg) {
    var test = new Assertion(act, msg);

    test.assert(
        exp == flag(test, 'object')
      , 'expected #{this} to equal #{exp}'
      , 'expected #{this} to not equal #{act}'
      , exp
      , act
    );
  };

  /**
   * ### .notEqual(actual, expected, [message])
   *
   * Assert non-strict inequality (!=).
   *
   *      assert.notEqual(3, 4, 'these numbers are not equal');
   *
   * @name notEqual
   * @param {*} actual
   * @param {*} expected
   * @param {String} message
   * @api public
   */

  assert.notEqual = function (act, exp, msg) {
    var test = new Assertion(act, msg);

    test.assert(
        exp != flag(test, 'object')
      , 'expected #{this} to not equal #{exp}'
      , 'expected #{this} to equal #{act}'
      , exp
      , act
    );
  };

  /**
   * ### .strictEqual(actual, expected, [message])
   *
   * Assert strict equality (===).
   *
   *      assert.strictEqual(true, true, 'these booleans are strictly equal');
   *
   * @name strictEqual
   * @param {*} actual
   * @param {*} expected
   * @param {String} message
   * @api public
   */

  assert.strictEqual = function (act, exp, msg) {
    new Assertion(act, msg).to.equal(exp);
  };

  /**
   * ### .notStrictEqual(actual, expected, [message])
   *
   * Assert strict inequality (!==).
   *
   *      assert.notStrictEqual(1, true, 'these booleans are not strictly equal');
   *
   * @name notStrictEqual
   * @param {*} actual
   * @param {*} expected
   * @param {String} message
   * @api public
   */

  assert.notStrictEqual = function (act, exp, msg) {
    new Assertion(act, msg).to.not.equal(exp);
  };

  /**
   * ### .deepEqual(actual, expected, [message])
   *
   * Assert not deep equality.
   *
   *      assert.deepEqual({ tea: 'green' }, { tea: 'green' });
   *
   * @name deepEqual
   * @param {*} actual
   * @param {*} expected
   * @param {String} message
   * @api public
   */

  assert.deepEqual = function (act, exp, msg) {
    new Assertion(act, msg).to.eql(exp);
  };

  /**
   * ### .notDeepEqual(actual, expected, [message])
   *
   * Assert not deep equality.
   *
   *      assert.notDeepEqual({ tea: 'green' }, { tea: 'jasmine' });
   *
   * @name notDeepEqual
   * @param {*} actual
   * @param {*} expected
   * @param {String} message
   * @api public
   */

  assert.notDeepEqual = function (act, exp, msg) {
    new Assertion(act, msg).to.not.eql(exp);
  };

  /**
   * ### .isTrue(value, [message])
   *
   * Assert `value` is true.
   *
   *      var tea_served = true;
   *      assert.isTrue(tea_served, 'the tea has been served');
   *
   * @name isTrue
   * @param {Boolean} value
   * @param {String} message
   * @api public
   */

  assert.isTrue = function (val, msg) {
    new Assertion(val, msg).is['true'];
  };

  /**
   * ### .isFalse(value, [message])
   *
   * Assert `value` is false.
   *
   *      var tea_served = false;
   *      assert.isFalse(tea_served, 'no tea yet? hmm...');
   *
   * @name isFalse
   * @param {Boolean} value
   * @param {String} message
   * @api public
   */

  assert.isFalse = function (val, msg) {
    new Assertion(val, msg).is['false'];
  };

  /**
   * ### .isNull(value, [message])
   *
   * Assert `value` is null.
   *
   *      assert.isNull(err, 'no errors');
   *
   * @name isNull
   * @param {*} value
   * @param {String} message
   * @api public
   */

  assert.isNull = function (val, msg) {
    new Assertion(val, msg).to.equal(null);
  };

  /**
   * ### .isNotNull(value, [message])
   *
   * Assert `value` is not null.
   *
   *      var tea = 'tasty chai';
   *      assert.isNotNull(tea, 'great, time for tea!');
   *
   * @name isNotNull
   * @param {*} value
   * @param {String} message
   * @api public
   */

  assert.isNotNull = function (val, msg) {
    new Assertion(val, msg).to.not.equal(null);
  };

  /**
   * ### .isUndefined(value, [message])
   *
   * Assert `value` is undefined.
   *
   *      assert.isUndefined(tea, 'no tea defined');
   *
   * @name isUndefined
   * @param {*} value
   * @param {String} message
   * @api public
   */

  assert.isUndefined = function (val, msg) {
    new Assertion(val, msg).to.equal(undefined);
  };

  /**
   * ### .isDefined(value, [message])
   *
   * Assert `value` is not undefined.
   *
   *      var tea = 'cup of chai';
   *      assert.isDefined(tea, 'no tea defined');
   *
   * @name isUndefined
   * @param {*} value
   * @param {String} message
   * @api public
   */

  assert.isDefined = function (val, msg) {
    new Assertion(val, msg).to.not.equal(undefined);
  };

  /**
   * ### .isFunction(value, [message])
   *
   * Assert `value` is a function.
   *
   *      var serve_tea = function () { return 'cup of tea'; };
   *      assert.isFunction(serve_tea, 'great, we can have tea now');
   *
   * @name isFunction
   * @param {Function} value
   * @param {String} message
   * @api public
   */

  assert.isFunction = function (val, msg) {
    new Assertion(val, msg).to.be.a('function');
  };

  /**
   * ### .isNotFunction(value, [message])
   *
   * Assert `value` is NOT a function.
   *
   *      var serve_tea = [ 'heat', 'pour', 'sip' ];
   *      assert.isNotFunction(serve_tea, 'great, we can have tea now');
   *
   * @name isNotFunction
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.isNotFunction = function (val, msg) {
    new Assertion(val, msg).to.not.be.a('function');
  };

  /**
   * ### .isObject(value, [message])
   *
   * Assert `value` is an object.
   *
   *      var selection = { name: 'Chai', serve: 'with spices' };
   *      assert.isObject(selection, 'tea selection is an object');
   *
   * @name isObject
   * @param {Object} value
   * @param {String} message
   * @api public
   */

  assert.isObject = function (val, msg) {
    new Assertion(val, msg).to.be.a('object');
  };

  /**
   * ### .isNotObject(value, [message])
   *
   * Assert `value` is NOT an object.
   *
   *      var selection = 'chai'
   *      assert.isObject(selection, 'tea selection is not an object');
   *
   * @name isNotObject
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.isNotObject = function (val, msg) {
    new Assertion(val, msg).to.not.be.a('object');
  };

  /**
   * ### .isArray(value, [message])
   *
   * Assert `value` is an instance of Array.
   *
   *      var menu = [ 'green', 'chai', 'oolong' ];
   *      assert.isArray(menu, 'what kind of tea do we want?');
   *
   * @name isArray
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.isArray = function (val, msg) {
    new Assertion(val, msg).to.be.instanceOf(Array);
  };

  /**
   * ### .isArray(value, [message])
   *
   * Assert `value` is NOT an instance of Array.
   *
   *      var menu = 'green|chai|oolong';
   *      assert.isNotArray(menu, 'what kind of tea do we want?');
   *
   * @name isNotArray
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.isNotArray = function (val, msg) {
    new Assertion(val, msg).to.not.be.instanceOf(Array);
  };

  /**
   * ### .isString(value, [message])
   *
   * Assert `value` is a string.
   *
   *      var teaorder = 'chai';
   *      assert.isString(tea_order, 'order placed');
   *
   * @name isString
   * @param {String} value
   * @param {String} message
   * @api public
   */

  assert.isString = function (val, msg) {
    new Assertion(val, msg).to.be.a('string');
  };

  /**
   * ### .isNotString(value, [message])
   *
   * Assert `value` is NOT a string.
   *
   *      var teaorder = 4;
   *      assert.isNotString(tea_order, 'order placed');
   *
   * @name isNotString
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.isNotString = function (val, msg) {
    new Assertion(val, msg).to.not.be.a('string');
  };

  /**
   * ### .isNumber(value, [message])
   *
   * Assert `value` is a number
   *
   *      var cups = 2;
   *      assert.isNumber(cups, 'how many cups');
   *
   * @name isNumber
   * @param {Number} value
   * @param {String} message
   * @api public
   */

  assert.isNumber = function (val, msg) {
    new Assertion(val, msg).to.be.a('number');
  };

  /**
   * ### .isNotNumber(value, [message])
   *
   * Assert `value` NOT is a number
   *
   *      var cups = '2 cups please';
   *      assert.isNotNumber(cups, 'how many cups');
   *
   * @name isNotNumber
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.isNotNumber = function (val, msg) {
    new Assertion(val, msg).to.not.be.a('number');
  };

  /**
   * ### .isBoolean(value, [message])
   *
   * Assert `value` is a boolean
   *
   *      var teaready = true
   *        , teaserved = false;
   *
   *      assert.isBoolean(tea_ready, 'is the tea ready');
   *      assert.isBoolean(tea_served, 'has tea been served');
   *
   * @name isBoolean
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.isBoolean = function (val, msg) {
    new Assertion(val, msg).to.be.a('boolean');
  };

  /**
   * ### .isNotBoolean(value, [message])
   *
   * Assert `value` is NOT a boolean
   *
   *      var teaready = 'yep'
   *        , teaserved = 'nope';
   *
   *      assert.isNotBoolean(tea_ready, 'is the tea ready');
   *      assert.isNotBoolean(tea_served, 'has tea been served');
   *
   * @name isNotBoolean
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.isNotBoolean = function (val, msg) {
    new Assertion(val, msg).to.not.be.a('boolean');
  };

  /**
   * ### .typeOf(value, name, [message])
   *
   * Assert typeof `value` is `name`.
   *
   *      assert.typeOf('tea', 'string', 'we have a string');
   *
   * @name typeOf
   * @param {Mixed} value
   * @param {String} typeof name
   * @param {String} message
   * @api public
   */

  assert.typeOf = function (val, type, msg) {
    new Assertion(val, msg).to.be.a(type);
  };

  /**
   * ### .notTypeOf(value, name, [message])
   *
   * Assert typeof `value` is NOT `name`.
   *
   *      assert.notTypeOf('tea', 'string', 'we have a string');
   *
   * @name notTypeOf
   * @param {Mixed} value
   * @param {String} typeof name
   * @param {String} message
   * @api public
   */

  assert.notTypeOf = function (val, type, msg) {
    new Assertion(val, msg).to.not.be.a(type);
  };

  /**
   * ### .instanceOf(object, constructor, [message])
   *
   * Assert `value` is instanceof `constructor`.
   *
   *      var Tea = function (name) { this.name = name; }
   *        , Chai = new Tea('chai');
   *
   *      assert.instanceOf(Chai, Tea, 'chai is an instance of tea');
   *
   * @name instanceOf
   * @param {Object} object
   * @param {Constructor} constructor
   * @param {String} message
   * @api public
   */

  assert.instanceOf = function (val, type, msg) {
    new Assertion(val, msg).to.be.instanceOf(type);
  };

  /**
   * ### .notInstanceOf(object, constructor, [message])
   *
   * Assert `value` is NOT instanceof `constructor`.
   *
   *      var Tea = function (name) { this.name = name; }
   *        , Chai = new String('chai');
   *
   *      assert.notInstanceOf(Chai, Tea, 'chai is an instance of tea');
   *
   * @name notInstanceOf
   * @param {Object} object
   * @param {Constructor} constructor
   * @param {String} message
   * @api public
   */

  assert.notInstanceOf = function (val, type, msg) {
    new Assertion(val, msg).to.not.be.instanceOf(type);
  };

  /**
   * ### .include(value, includes, [message])
   *
   * Assert the inclusion of an object in another. Works
   * for strings and arrays.
   *
   *      assert.include('foobar', 'bar', 'foobar contains string `var`);
   *      assert.include([ 1, 2, 3], 3, 'array contains value);
   *
   * @name include
   * @param {Array|String} value
   * @param {*} includes
   * @param {String} message
   * @api public
   */

  assert.include = function (exp, inc, msg) {
    var obj = new Assertion(exp, msg);

    if (Array.isArray(exp)) {
      obj.to.include(inc);
    } else if ('string' === typeof exp) {
      obj.to.contain.string(inc);
    }
  };

  /**
   * ### .match(value, regex, [message])
   *
   * Assert that `value` matches regular expression.
   *
   *      assert.match('foobar', /^foo/, 'Regexp matches');
   *
   * @name match
   * @param {*} value
   * @param {RegExp} RegularExpression
   * @param {String} message
   * @api public
   */

  assert.match = function (exp, re, msg) {
    new Assertion(exp, msg).to.match(re);
  };

  /**
   * ### .notMatch(value, regex, [message])
   *
   * Assert that `value` does not match regular expression.
   *
   *      assert.notMatch('foobar', /^foo/, 'Regexp matches');
   *
   * @name notMatch
   * @param {*} value
   * @param {RegExp} RegularExpression
   * @param {String} message
   * @api public
   */

  assert.notMatch = function (exp, re, msg) {
    new Assertion(exp, msg).to.not.match(re);
  };

  /**
   * ### .property(object, property, [message])
   *
   * Assert that `object` has property. Can use dot-notation for deep reference.
   *
   *      assert.property({ tea: { green: 'matcha' }}, 'tea.green');
   *
   * @name property
   * @param {Object} object
   * @param {String} Property address
   * @param {String} message
   * @api public
   */

  assert.property = function (obj, prop, msg) {
    new Assertion(obj, msg).to.have.property(prop);
  };

  /**
   * ### .notOwnProperty(object, property, [message])
   *
   * Assert that `object` does not have property. Can use dot-notation for deep reference.
   *
   *      assert.ownProperty({ tea: { green: 'matcha' }}, 'tea.oolong');
   *
   * @name notOwnProperty
   * @param {Object} object
   * @param {String} property address
   * @param {String} message
   * @api public
   */

  assert.notProperty = function (obj, prop, msg) {
    new Assertion(obj, msg).to.not.have.property(prop);
  };

  /**
   * ### .propertyVal(object, property, value, [message])
   *
   * Assert that `object` has property with `value`.
   * Can use dot-notation for deep reference.
   *
   *      assert.propertyVal({ tea: { green: 'matcha' }}, 'tea.green', 'matcha');
   *
   * @name propertyVal
   * @param {Object} object
   * @param {String} property address
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.propertyVal = function (obj, prop, val, msg) {
    new Assertion(obj, msg).to.have.property(prop, val);
  };

  /**
   * ### .propertyNotVal(object, property, value, [message])
   *
   * Assert that `object` has property but `value`
   * does not equal  `value`. Can use dot-notation for deep reference.
   *
   *      assert.propertyNotVal({ tea: { green: 'matcha' }}, 'tea.green', 'konacha');
   *
   * @name propertyNotVal
   * @param {Object} object
   * @param {String} property address
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */
  assert.propertyNotVal = function (obj, prop, val, msg) {
    new Assertion(obj, msg).to.not.have.property(prop, val);
  };

  /**
   * ### .lengthOf(object, length, [message])
   *
   * Assert that object has expected length.
   *
   *      assert.lengthOf([1,2,3], 3, 'Array has length of 3');
   *      assert.lengthOf('foobar', 5, 'String has length of 6');
   *
   * @name length
   * @param {*} value
   * @param {Number} length
   * @param {String} message
   * @api public
   */

  assert.lengthOf = function (exp, len, msg) {
    new Assertion(exp, msg).to.have.length(len);
  };

  /**
   * ### .throws(function, [constructor/regexp], [message])
   *
   * Assert that a function will throw a specific
   * type of error.
   *
   *      assert.throw(fn, ReferenceError, 'function throw reference error');
   *
   * @name throws
   * @alias throw
   * @param {Function} function to test
   * @param {ErrorConstructor} constructor
   * @param {String} message
   * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
   * @api public
   */

  assert.throws = function (fn, type, msg) {
    if ('string' === typeof type) {
      msg = type;
      type = null;
    }

    new Assertion(fn, msg).to.Throw(type);
  };

  /**
   * ### .doesNotThrow(function, [constructor/regexp], [message])
   *
   * Assert that a function will throw a specific
   * type of error.
   *
   *      var fn = function (err) { if (err) throw Error(err) };
   *      assert.doesNotThrow(fn, Error, 'function throw reference error');
   *
   * @name doesNotThrow
   * @param {Function} function to test
   * @param {ErrorConstructor} constructor
   * @param {String} message
   * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
   * @api public
   */

  assert.doesNotThrow = function (fn, type, msg) {
    if ('string' === typeof type) {
      msg = type;
      type = null;
    }

    new Assertion(fn, msg).to.not.Throw(type);
  };

  /**
   * ### .operator(val, operator, val2, [message])
   *
   * Compare two values using operator.
   *
   *      assert.operator(1, '<', 2, 'everything is ok');
   *      assert.operator(1, '>', 2, 'this will fail');
   *
   * @name operator
   * @param {*} object to test
   * @param {String} operator
   * @param {*} second object
   * @param {String} message
   * @api public
   */

  assert.operator = function (val, operator, val2, msg) {
    if (!~['==', '===', '>', '>=', '<', '<=', '!=', '!=='].indexOf(operator)) {
      throw new Error('Invalid operator "' + operator + '"');
    }
    var test = new Assertion(eval(val + operator + val2), msg);
    test.assert(
        true === flag(test, 'object')
      , 'expected ' + util.inspect(val) + ' to be ' + operator + ' ' + util.inspect(val2)
      , 'expected ' + util.inspect(val) + ' to not be ' + operator + ' ' + util.inspect(val2) );
  };

  /*!
   * Undocumented / untested
   */

  assert.ifError = function (val, msg) {
    new Assertion(val, msg).to.not.be.ok;
  };

  /*!
   * Aliases.
   */

  (function alias(name, as){
    assert[as] = assert[name];
    return alias;
  })
  ('throws', 'throw');
};
