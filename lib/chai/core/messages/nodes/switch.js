/*!
 * chai
 * http://chaijs.com
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 *
 * @author The Blacksmith (a.k.a. Saulo Vallory) <me@saulovallory.com>
 */

var TokenNode = require('./token')
  , PseudoNode = require('./pseudo')
  , flag = require('../../../utils/flag');

/**
 * #### Switch Token
 *
 * To select a text according to an object's flag value you can use the
 * `[FLAG?:CASE TRUTHY|case else]` tag. In this tag the "case else" value
 * is optional. When resolving the value for this tag, chai will call
 * `flag(obj, 'FLAG')` if the flag exists and it's truthy, it will print
 * "CASE TRUTHY", otherwise, 'case else'.
 *
 * You can also invert the result by adding a `!` before the FLAG, so it will be
 * {!TOKEN_NAME?:CASE FALSE|case else].
 *
 *     "a [deep?:deep] property"     // a deep property (if the flag deep is set and is truthy)
 *     "a [!deep?:shallow] search"    // a deep property (if the flag deep is set and is falsy)
 */
TokenNode.register('?', SwitchToken);

function SwitchToken(str, index){
  TokenNode.call(this, str, index);

  var m = TokenNode.re.exec(str);

  this.varName = m[2];
  this.negate = m[1] == '!';
};

SwitchToken.prototype.mapText = function() {
  var parts = this.content.split('|');
  var left, right;

  if(parts.length == 1) {
    left = new PseudoNode(parts[0], this.index + this.prefixLength, '?L');
    this.addChild(left);
    left.mapText();
    return;
  }

  if(parts.length > 2) {
    for(var i = 0; i < parts.length; i++) {
      if(parts[i].substr(-1) == '\\' && i+1 < parts.length) {
        parts.splice(i, 2, parts[i] + parts[i+1]);
        i--;
      }
    }

    if(parts.length > 2)
      throw new Error('Invalid switch token content:', this.content);
  }

  left = new PseudoNode(parts[0], this.index + this.prefixLength, '?L');
  right = new PseudoNode(parts[1], this.index + this.prefixLength + parts[0].length + 1 /*|*/, '?R');

  this.addChild(left);
  this.addChild(right);

  left.mapText();
  right.mapText();
};

SwitchToken.prototype.eval = function(vars) {
  var value = this.children[0];
  var altVal = false;
  var val = this.resolve(this.varName, vars);

  if(!val && typeof vars.obj != 'undefined')
    val = !!flag(vars.obj, this.varName);

  if(this.children.length == 2)
    altVal = this.children[1];

  if(val) {
    // truthy
    return value.eval(vars);
  }

  if(altVal)
    return altVal.eval(vars);

  return '';
};

module.exports = SwitchToken;
