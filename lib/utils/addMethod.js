/*!
 * Chai - addMethod utility
 * Copyright(c) 2012 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * # addMethod (ctx, name, method)
 *
 * Adds a method to the prototype of an object.
 *
 *      utils.addMethod(chai.Assertion, 'foo', function (str) {
 *        var obj = utils.flag(this, 'object');
 *        new chai.Assertion(obj).to.be.equal(str);
 *        return this;
 *      });
 *
 * Then can be used as any other assertion.
 *
 *      expect(fooStr).to.be.foo('bar');
 *
 * @param {Function|Object} context chai.Assertion || chai.Assertion.prototype
 * @param {String} name of method to add
 * @param {Function} method function to used for name
 * @api public
 */

module.exports = function (ctx, name, method) {
  var context = ('function' === typeof obj) ? ctx.prototype : ctx;
  context[name] = function () {
    method.apply(this, arguments);
    return this;
  };
};
