/*!
 * Chai - overwriteMethod utility
 * Copyright(c) 2012 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * # overwriteProperty (ctx, name, fn)
 *
 * Overwites an already existing method and provides
 * access to previous function. Must return function
 * to be used for name.
 *
 *      utils.overwriteMethod(chai.Assertion, 'equal', function (_super) {
 *        return function (str) {
 *          var obj = utils.flag(this, 'object');
 *          if (obj instanceof Foo) {
 *            new chai.Assertion(obj.value).to.equal(str);
 *            return this;
 *          } else {
 *            return _super.apply(this, arguments);
 *          }
 *        }
 *      });
 *
 * Then can be used as any other assertion.
 *
 *      expect(myFoo).to.equal('bar');
 *
 * @param {Function|Object} context chai.Assertion || chai.Assertion.prototype
 * @param {String} name of method to overwrite
 * @param {Function} method function to be used for name
 * @api public
 */

module.exports = function (ctx, name, method) {
  var context = ('function' === typeof ctx) ? ctx.prototype : ctx
    , _method = context[name]
    , _super = function () { return this; };

  if (_method && 'function' === typeof _method)
    _super = _method;

  context[name] = method(_super);
};
