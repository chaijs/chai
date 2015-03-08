/*!
 * chai
 * http://chaijs.com
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 *
 * @author The Blacksmith (a.k.a. Saulo Vallory) <me@saulovallory.com>
 */

var TokenNode = require('./token');
var PseudoNode = require('./pseudo');

/**
 * ### PluralizeToken
 *
 * Selects a word based on the value of a variable.
 *
 * #### Syntax
 *
 * `[#VAR_NAME:case zero|CASE ONE|CASE ELSE]`
 *
 *
 * #### Notes
 *
 * In the token prefix, the variable name doesn't appear between `{{` and `}}`,
 * as it refers to the variable itself and not it's value. In the example
 * below you can see both the variable and it's value being referenced.
 *
 * #### Example
 *
 *     [#count: no beers|1 beer|{{count}} beers]
 *
 * will display:
 *
 *     no beers           // if token == 0
 *     1 beer             // if token == 1
 *     {{count}} beers    // if token != 0 and token != 1
 *
 * @class PluralizeToken
 */
TokenNode.register('#', PluralizeToken);

function PluralizeToken(str, index){
  TokenNode.call(this, str, index);

  var m = TokenNode.re.exec(str);

  this.varName = m[2];
};

PluralizeToken.prototype.eval = function(vars) {
  var val = this.resolve(this.varName, vars);

  if(val === undefined)
    return this.raw;

  if(val === 0) {
    return this.zero.eval(vars);
  }

  if(val == 1) {
    return this.one.eval(vars);
  }

  return this.many.eval(vars);
};

PluralizeToken.prototype.mapText = function() {
  var parts = this.content.split('|');

  for(var i = 0; i < parts.length; i++) {
    if(parts[i].substr(-1) == '\\' && i+1 < parts.length) {
      parts.splice(i, 2, parts[i] + parts[i+1]);
      i--;
    }
  }

  if (parts.length < 2 || parts.length > 3) {
    throw new Error('Invalid switch token content:', this.content);
  }

  var index = this.index + this.prefixLength;

  if(parts.length > 2) {
    this.zero = new PseudoNode(parts[0], index, '#0');
    this.one = new PseudoNode(parts[1], index + parts[0].length + 1 /*|*/, '#1');
    this.many = new PseudoNode(parts[2], index + parts[0].length + 1 /*|*/ + parts[1].length + 1 /*|*/, '#*');
  }
  else {
    this.one = new PseudoNode(parts[0], index, '#1');
    this.many = new PseudoNode(parts[1], index + parts[0].length + 1 /*|*/, '#*');
  }

  this.addChild(this.one);
  this.one.mapText();

  this.addChild(this.many);
  this.many.mapText();

  if(typeof this.zero != 'undefined') {
    this.addChild(this.zero);
    this.zero.mapText();
  }
  else {
    this.zero = this.many;
  }
};

module.exports = PluralizeToken;
