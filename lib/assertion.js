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

var AssertionError = require('./error')
  , eql = require('./utils/eql')
  , inspect = require('./utils/inspect');

module.exports = Assertion;

function Assertion (obj, msg) {
  this.obj = obj;
  this.msg = msg;
}

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

Assertion.prototype.__defineGetter__('inspect', function () {
  return inspect(this.obj);
});

Assertion.prototype.__defineGetter__('arguments', function () {
  this.assert(
      '[object Arguments]' == Object.prototype.toString.call(this.obj)
    , 'expected ' + this.inspect + ' to be arguments'
    , 'expected ' + this.inspect + ' to not be arguments');

  return this;
});

Assertion.prototype.__defineGetter__('to', function () {
  return this;
});

Assertion.prototype.__defineGetter__('be', function () {
  return this;
});

Assertion.prototype.__defineGetter__('an', function () {
  return this;
});

Assertion.prototype.__defineGetter__('is', function () {
  return this;
});

Assertion.prototype.__defineGetter__('and', function () {
  return this;
});

Assertion.prototype.__defineGetter__('have', function () {
  return this;
});

Assertion.prototype.__defineGetter__('include', function () {
  this.includes = true;
  return this;
});

Assertion.prototype.__defineGetter__('with', function () {
  return this;
});

Assertion.prototype.__defineGetter__('not', function () {
  this.negate = true;
  return this;
});

Assertion.prototype.__defineGetter__('ok', function () {
  this.assert(
      this.obj
    , 'expected ' + this.inspect + ' to be truthy'
    , 'expected ' + this.inspect + ' to be falsey');

  return this;
});

Assertion.prototype.__defineGetter__('true', function () {
  this.assert(
      true === this.obj
    , 'expected ' + this.inspect + ' to be true'
    , 'expected ' + this.inspect + ' to be false');

  return this;
});

Assertion.prototype.__defineGetter__('false', function () {
  this.assert(
      false === this.obj
    , 'expected ' + this.inspect + ' to be false'
    , 'expected ' + this.inspect + ' to be true');

  return this;
});

Assertion.prototype.__defineGetter__('exist', function () {
  this.assert(
      null != this.obj
    , 'expected ' + this.inspect + ' to exist'
    , 'expected ' + this.inspect + ' to not exist');

  return this;
});

Assertion.prototype.__defineGetter__('empty', function () {
  new Assertion(this.obj).to.have.property('length');

  this.assert(
      0 === this.obj.length
    , 'expected ' + this.inspect + ' to be empty'
    , 'expected ' + this.inspect + ' not to be empty');

  return this;
});

Assertion.prototype.equal = function (val) {
  this.assert(
      val === this.obj
    , 'expected ' + this.inspect + ' to equal ' + inspect(val)
    , 'expected ' + this.inspect + ' to not equal ' + inspect(val));

  return this;
};

Assertion.prototype.eql = function (obj) {
  this.assert(
      eql(obj, this.obj)
    , 'expected ' + this.inspect + ' to equal ' + inspect(obj)
    , 'expected ' + this.inspect + ' to not equal ' + inspect(obj));
  return this;
};

Assertion.prototype.above = function (val) {
  this.assert(
      this.obj > val
    , 'expected ' + this.inspect + ' to be above ' + val
    , 'expected ' + this.inspect + ' to be below ' + val);

  return this;
};

Assertion.prototype.below = function (val) {
  this.assert(
      this.obj < val
    , 'expected ' + this.inspect + ' to be below ' + val
    , 'expected ' + this.inspect + ' to be above ' + val);

  return this;
};

Assertion.prototype.a = function (type) {
  this.assert(
      type == typeof this.obj
    , 'expected ' + this.inspect + ' to be a ' + type
    , 'expected ' + this.inspect + ' not to be a ' + type);

  return this;
};

Assertion.prototype.instanceof = function (constructor) {
  var name = constructor.name;
  this.assert(
      this.obj instanceof constructor
    , 'expected ' + this.inspect + ' to be an instance of ' + name
    , 'expected ' + this.inspect + ' to not be an instance of ' + name);

  return this;
};

Assertion.prototype.respondTo = function (method) {
  this.assert(
    'function' == typeof this.obj[method]
    , 'expected ' + this.inspect + ' to respond to ' + method + '()'
    , 'expected ' + this.inspect + ' to not respond to ' + method + '()');

  return this;
}

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

Assertion.prototype.ownProperty = function (name) {
  this.assert(
      this.obj.hasOwnProperty(name)
    , 'expected ' + this.inspect + ' to have own property ' + inspect(name)
    , 'expected ' + this.inspect + ' to not have own property ' + inspect(name));
  return this;
};

Assertion.prototype.length = function (n) {
  new Assertion(this.obj).to.have.property('length');
  var len = this.obj.length;

  this.assert(
      len == n
    , 'expected ' + this.inspect + ' to have a length of ' + n + ' but got ' + len
    , 'expected ' + this.inspect + ' to not have a length of ' + len);

  return this;
};

Assertion.prototype.match = function (re) {
  this.assert(
      re.exec(this.obj)
    , 'expected ' + this.inspect + ' to match ' + re
    , 'expected ' + this.inspect + ' not to match ' + re);

  return this;
};

Assertion.prototype.contain = function (obj) {
  new Assertion(this.obj).to.be.an.instanceof(Array);

  this.assert(
      ~this.obj.indexOf(obj)
    , 'expected ' + this.inspect + ' to contain ' + inspect(obj)
    , 'expected ' + this.inspect + ' to not contain ' + inspect(obj));

  return this;
};

Assertion.prototype.within = function (start, finish) {
  var range = start + '..' + finish;

  this.assert(
      this.obj >= start && this.obj <= finish
    , 'expected ' + this.inspect + ' to be within ' + range
    , 'expected ' + this.inspect + ' to not be within ' + range);

  return this;
};

Assertion.prototype.greaterThan = function (val) {
  this.assert(
      this.obj > val
    , 'expected ' + this.inspect + ' to be greater than ' + inspect(val)
    , 'expected ' + this.inspect + ' to not be greater than ' + inspect(val));

  return this;
};

Assertion.prototype.string = function (str) {
  new Assertion(this.obj).is.a('string');

  this.assert(
      ~this.obj.indexOf(str)
    , 'expected ' + this.inspect + ' to include ' + inspect(str)
    , 'expected ' + this.inspect + ' to not include ' + inspect(str));

  return this;
};

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

/**
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
('below', 'lessThan');