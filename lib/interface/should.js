/*!
 * chai
 * Copyright(c) 2011 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

var Assertion = require('../assertion');

/**
 * Expose api via `Object#should`.
 *
 * @api public
 */

module.exports = function () {

  /*!
   * Originally from: should.js
   * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
   * MIT Licensed
   */
  Object.defineProperty(Object.prototype, 'should', {
    set: function(){},
    get: function(){
      return new Assertion(this);
    },
    configurable: true
  });

  var should = {};

  should.equal = function (val1, val2) {
    new Assertion(val1).to.equal(val2);
  };

  return should;
};