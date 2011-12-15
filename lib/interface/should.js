
/*!
 * Originally used by:
 * 
 * Should
 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Expose api via `Object#should`.
 *
 * @api public
 */

var Assertion = require('../assertion');

module.exports = function () {
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