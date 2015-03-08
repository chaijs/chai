/*!
 * chai
 * http://chaijs.com
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 *
 * @author The Blacksmith (a.k.a. Saulo Vallory) <me@saulovallory.com>
 */

var flag = require('../../../utils/flag')
  , debug = require('../../../utils/debug');

/**
 * ### Node class
 */
function Node(str, index, type) {
  // original token extracted from the original message
  this.raw = str;
  this.length = str.length;
  this.content = str || '';
  this.children = [];
  this.type = type || '';
  this.index = index;
};

Node.prototype.eval = function(vars) {
  if(this.children.length) {
    return this.children.reduce(function(msg, curr) {
      return msg + curr.eval(vars);
    }, '');
  }

  return this.content;
};

// Deeply clones a node
Node.prototype.clone = function() {
  var constr = Object.getPrototypeOf(this).constructor;
  var clone = new constr(this.raw, this.index);

  clone.children = this.children.map(function(n) {
    if(n instanceof Node) {
      return n.clone();
    }
    return n;
  });

  return clone;
};

Node.prototype.toString = function() {
  return this.type + (this.varName ? ' ' + this.varName : '') + ' :: ' + this.content + ' at ' + this.index;
};

Node.prototype.inspect = Node.prototype.toString;

Object.defineProperty(Node.prototype, 'prefixLength', {
  get: function() {
    return this.raw.indexOf(':') + 1;
  }
});

Node.prototype.mapText = function() {
  var msg = this.content
    , lastIndex = start = this.index + this.prefixLength
    , VarNode = require('./var')
    , StringNode = require('./string')
    , PseudoNode = require('./pseudo');

  // these can't have children
  if(this instanceof VarNode || this instanceof StringNode)
    return;

  debug(
    'Mapping a', Object.getPrototypeOf(this).constructor.name,
    this instanceof PseudoNode ? '(' + this.type + ') node :>' : 'node :>', this.raw);

  for(var i=0; i < this.children.length; i++) {
    var node = this.children[i];

    if(node.index > lastIndex) {

      this.children.splice(i, 0, new StringNode(
                  msg.slice(lastIndex - start, node.index - start)
                , lastIndex));

      debug('  Found string:', '"' + msg.slice(lastIndex - start, node.index - start) + '"');
      i++;
    }

    lastIndex = node.index + node.length;
  }

  if(lastIndex - this.index < msg.length - 1 /*]*/) {
    this.children.push(new StringNode(msg.substr(lastIndex - start), lastIndex));
    debug('  Found string:', '"' + msg.substr(lastIndex - start) + '"');
    i++;
  }
};

Node.prototype.addChild = function(n) {
  if(this.children.length == 0) {
    this.children.push(n);
    return n;
  }

  var remove_start = false, removed = 0, i;

  for(i=0; i < this.children.length; i++) {
    var c = this.children[i];

    if(n.index <= this.children[i].index) {
      if(c.index + c.length <= n.index + n.length) {
        // ct goes inside t
        if(remove_start === false)
          remove_start = i;
        removed++;
      }
      else {
        // insert n at position of c
        this.children.splice(removed ? remove_start : i, removed, n).forEach(function(rc) {
          n.addChild(rc);
        });
        return n;
      }
    }
  }

  this.children.splice(removed ? remove_start : i, removed, n).forEach(function(rc) {
    n.addChild(rc);
  });

  return n;
};

Node.prototype.resolve = function(property, ctx) {
  if(typeof ctx[property] != 'undefined')
    return ctx[property];

  if(typeof ctx['assertion'] != 'undefined')
    return flag(ctx.assertion, property);

  return undefined;
}

module.exports = Node;
