
var AssertionError = require('./error')
  , eql = require('./utils');

module.exports = Assertion;


function inspect (val) {
  return (val ? JSON.stringify(val) : 'null');
}

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
  this.include = true;
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
    , 'expected ' + this.inspect + ' to be truthy'
    , 'expected ' + this.inspect + ' to be falsey');

  return this;
});

Assertion.prototype.__defineGetter__('false', function () {
  this.assert(
      false === this.obj
    , 'expected ' + this.inspect + ' to be truthy'
    , 'expected ' + this.inspect + ' to be falsey');

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
    , 'expected ' + this.inspect + ' to exist'
    , 'expected ' + this.inspect + ' to not exist');

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
    , 'expected ' + this.inspect + ' to be deeply equal ' + inspect(obj)
    , 'expected ' + this.inspect + ' to be below' + inspect(obj));
  return this;
};

Assertion.prototype.above = function (val) {
  this.assert(
      this.obj > val
    , 'expected ' + this.inspect + ' to be above ' + val
    , 'expected ' + this.inspect + ' to be below' + val);

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
    , 'expected ' + this.inspect + ' to not be a ' + type);

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

Assertion.prototype.property = function (name, val) {
  if (val) {
    this.assert(
        val === this.obj[name]
      , 'expected ' + this.inspect + ' to have property ' + name + ' with value ' + inspect(val)
      , 'expected ' + this.inspect + ' to not have property ' + name + ' with value ' +  inspect(val));
  } else {
    this.assert(
        undefined !== this.obj[name]
      , 'expected ' + this.inspect + ' to have property ' + name
      , 'expected ' + this.inspect + ' to not have property ' + name);
  }

  this.obj = this.obj[name];
  return this;
};

Assertion.prototype.length = function (n) {
  new Assertion(this.obj).to.have.property('length');
  var len = this.obj.length;

  this.assert(
      len == n
    , 'expected ' + this.inspect + ' to be an length of ' + n + ' bug got ' + len
    , 'expected ' + this.inspect + ' to not have a length of ' + len);

  return this;
};

Assertion.prototype.match = function (re) {
  this.assert(
      re.exec(this.obj)
    , 'expected ' + this.inspect + ' to match ' + re
    , 'expected ' + this.inspect + ' to not match ' + re);

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

Assertion.prototype.string = function (str) {
  new Assertion(this.obj).is.a('string');

  this.assert(
      ~this.obj.indexOf(str)
    , 'expected ' + this.inspect + ' to include ' + str
    , 'expected ' + this.inspect + ' to not include ' + str);

  return this;
};

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