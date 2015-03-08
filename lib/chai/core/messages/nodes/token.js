/*!
 * chai
 * http://chaijs.com
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 *
 * @author The Blacksmith (a.k.a. Saulo Vallory) <me@saulovallory.com>
 */

var Node = require('./node');
var inherits = require("util").inherits;
var StringNode = require('./string')

/**
 * ### TokenNode class
 */

function TokenNode(str, index) {
  var m = TokenNode.re.exec(str);

  Node.call(this, str, index, m[3] || m[1]);

  this.content = m[4];
};

inherits(TokenNode, Node);

TokenNode.re = /\[(@|#|\+|\-|\!)?([\w_]+)?(\?)?\:(.*)\]/;

TokenNode.registry = {}

TokenNode.register = function(type, klass) {
  inherits(klass, TokenNode);
  TokenNode.registry[type] = klass;
};

TokenNode.createFromString = function(str, index) {
  var m = TokenNode.re.exec(str);

  if(m === null)
    throw new Error('Invalid token string');

  var type = m[3] || m[1];
  var klass = TokenNode.registry[type];

  if(!klass) {
    //throw new Error("There's no class defined for token '" + type + "'. Can't create token " + str)
    return new StringNode(str, index);
  }

  return new klass(str, index);
};

module.exports = TokenNode;
