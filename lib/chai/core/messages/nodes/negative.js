/*!
 * chai
 * http://chaijs.com
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 *
 * @author The Blacksmith (a.k.a. Saulo Vallory) <me@saulovallory.com>
 */

var TokenNode = require('./token');

/**
 * ### NegativeToken
 *
 * Chai allows you to negate assertions using the `.not()` method. When composing
 * messages it's good practice to tailor it for each scenario using the
 * `[+:shown on normal msg]` and `[-:shown on negation msg]`
 * For example, Chai's
 * default message for `.ok()` assertion is implemented as shown below:
 *
 *     messages.ok = 'expected {{this}} to be [+:truthy][-:falsy]'
 *
 *     expect(false).to.be.ok();   // expected false to be truthy
 *     expect(true).to.be.ok();    // expected true to be falsy
 */
TokenNode.register('-', NegativeToken);

function NegativeToken(str, index){
  TokenNode.call(this, str, index);
};

NegativeToken.prototype.eval = function(vars) {
  return this.resolve('negate', vars) ? this.content : '';
};

module.exports = NegativeToken;
