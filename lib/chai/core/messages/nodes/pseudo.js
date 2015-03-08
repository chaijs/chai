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
 * ### PseudoNode
 *
 * Pseudo nodes are nodes that are created automatically to organize a token data
 */

function PseudoNode(str, index, type) {
  Node.call(this, str, index, type)
}

inherits(PseudoNode, Node);

Object.defineProperty(PseudoNode.prototype, 'prefixLength', {
  get: function() {
    return 0;
  }
});

PseudoNode.prototype.eval = function(vars) {
  return this.children.reduce(function(msg, curr) {
    return msg + curr.eval(vars);
  }, '');
};

module.exports = PseudoNode;
