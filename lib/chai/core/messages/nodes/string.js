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

/**
 * ### StringNode class
 */
function StringNode(str, index) {
  Node.call(this, str, index, 's');
}

inherits(StringNode, Node);

StringNode.prototype.toString = function() {
  return 's :: "' + this.content + '" at ' + this.index;
};

module.exports = StringNode;