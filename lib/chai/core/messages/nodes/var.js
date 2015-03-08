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
 * ### VarNode
 * @class VarNode
 */
function VarNode(str, index) {
  Node.call(this, str, index, '{{}}');

  this.content = this.varName = str.substr(2, str.length - 4).trim();
}

inherits(VarNode, Node);

VarNode.prototype.eval = function(vars) {
  var val = this.resolve(this.varName, vars);

  if(val === undefined)
    return this.raw;

  return val === null ? 'null' : val.toString();
};

VarNode.prototype.mapText = function() {
  return;
};

module.exports = VarNode;
