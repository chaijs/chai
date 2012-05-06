/*!
 * Chai - overwriteProperty utility
 * Copyright(c) 2012 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * # overwriteProperty (ctx, name, fn)
 *
 * Overwites an already existing property getter and provides
 * access to previous value. Must return function to use as getter.
 *
 *      utils.overwriteProperty(chai.Assertion, 'ok', function (_super) {
 *        return function () {
 *          var obj = utils.flag(this, 'object');
 *          if (obj instanceof Foo) {
 *            new chai.Assertion(obj.name).to.equal('bar');
 *          } else {
 *            _super.call(this);
 *          }
 *        }
 *      });
 *
 * Then can be used as any other assertion.
 *
 *      expect(myFoo).to.be.ok;
 *
 * @param {Function|Object} context chai.Assertion || chai.Assertion.prototype
 * @param {String} name of property to overwrite
 * @param {Function} method must return function to be used for name
 * @api public
 */

module.exports = function (ctx, name, getter) {
  var context = ('function' === typeof ctx) ? ctx.prototype : ctx
    , _get = Object.getOwnPropertyDescriptor(context, name)
    , _super = function () {};

  if (_get && 'function' === typeof _get.get)
    _super = _get.get

  Object.defineProperty(context, name,
    { get: function () {
        getter(_super).call(this);
        return this;
      }
    , configurable: true
  });
};
