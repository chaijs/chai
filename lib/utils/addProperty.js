/*!
 * Chai - addProperty utility
 * Copyright(c) 2012 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * # addProperty (ctx, name, getter)
 *
 * Adds a property to the prototype of an object.
 *
 *      utils.addProperty(chai.Assertion, 'foo', function () {
 *        var obj = utils.flag(this, 'object');
 *        new chai.Assertion(obj).to.be.instanceof(Foo);
 *        return this;
 *      });
 *
 * Then can be used as any other assertion:
 *
 *      expect(myFoo).to.be.foo;
 *
 * @param {Function|Object} context chai.Assertion || chai.Assertion.prototype
 * @param {String} name of property to add
 * @param {Function} getter function to used for name
 * @api public
 */

module.export = function (ctx, name, getter) {
  var context = ('function' === typeof obj) ? ctx.prototype : ctx;
  Object.defineProperty(context, name,
    { get: function () {
        getter.call(this);
        return this;
      }
    , configurable: true
  });
};
