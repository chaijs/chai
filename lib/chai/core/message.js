/*!
* chai
* http://chaijs.com
* Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
* MIT Licensed
*
* @author The Blacksmith (a.k.a. Saulo Vallory) <me@saulovallory.com>
*/

var nodes = require('./messages/nodes')
  , debug = require('../utils/debug');

var Node = nodes.Node,
    StringNode = nodes.StringNode,
    TokenNode = nodes.TokenNode,
    VarNode = nodes.VarNode,
    PseudoNode = nodes.PseudoNode;

module.exports = Message;

/**
 * ## Message Class
 *
 * Defines a message. Messages are used to provide feedback upon assertion
 * failure.
 *
 * A Message is an immutable object which holds the pattern for creating
 * an error of a specific type. It can contain template tags to dynamically
 * compose the error message and control how data in the message is displayed.
 *
 * ### Template tags
 *
 * #### Placeholders
 *
 * Placeholders mark where data should be inserted. They can be used inside other tags.
 * There are three placeholders available
 *
 * - `{{this}}`: the `_obj` of the assertion
 * - `{{exp}}`: the expected value, if it was provided in `assert`
 * - `{{act}}`: the actual value, defaults to `_obj` but can be overwritten by value provided in `assert`
 *
 * But you can add more if you need.
 *
 * ### Pre-filling token values
 *
 * Sometimes what you want to print in the message as the `expected` or `actual`
 * value is not the same of what you should set on the respective properties of
 * the assertion error. Most of the time we want the message to contain a summary
 * or some representaion of the value and the assertion error to contain the real
 * value. In those cases you can pre-fill the message with the values you want
 * before sending it to assert.
 *
 * In the example below we are asserting that an exception was thrown.
 * The `{{exp}}` placeholder will be pre-filled with the value of `expectedThrown`
 * while the `expected` property will be either `desiredError.toString()` or
 * `desiredError`.
 *
 *     this.assert(
 *       thrown === true
 *       , messages.throwAnError.fill({exp: expectedThrown})
 *       , null   // old inverted message, not needed anymore
 *       , (desiredError instanceof Error ? desiredError.toString() : desiredError)
 *       , (thrownError instanceof Error ? thrownError.toString() : thrownError)
 *     );
 *
 *
 * @class Message
 */
function Message(msg){
  this.root = new PseudoNode(msg, 0, 'TREE');
  this.msg = msg;

  // gets tokens that DOESN'T contain tokens inside
  var varRe = /\{\{([0-9\w]+)}}/;
  var tokenRe = /\[(@|#|\+|\-|\!)?([\w_]+)?(\?)?\:([^\[\]]+)\]/;
  var m;

  while(m = varRe.exec(msg)) {
    var raw = this.msg.substr(m.index, m[0].length);
    var new_node = this.root.addChild(new VarNode(raw, m.index));
    
    msg = msg.substring(0, m.index) + repeat('_', m[0].length) + msg.substr(m.index + m[0].length);
    varRe.lastIndex = 0;
  }

  debug(this);

  while(m = tokenRe.exec(msg)) {
    debug('MSG:', msg)
    debug('TKN:', m[0])
    var raw = this.msg.substr(m.index, m[0].length);

    var new_node = this.root.addChild(TokenNode.createFromString(raw, m.index));
    debug(this);
    msg = msg.substring(0, m.index) + repeat('_', m[0].length) + msg.substr(m.index + m[0].length);
    tokenRe.lastIndex = 0;
  }

  this.map(function(n) {n.mapText()});
}

/**
 * Depth-first in-order traversal.
 * @param {Function(Node)} a function to call for each node
 */
Message.prototype.map = function(fn) {
  var results = [];

  var _map = function (n, fn) {
    var subresult = [];

    if(n.children.length > 0)
      n.children.map(function(c){ subresult = _map(c, fn); })

    subresult.push(fn(n));

    return subresult;
  };

  //return _map(this.root, fn);
  return _map(this.root, fn);
};

Message.prototype.toString = function(n, level) {
  n = n || this.root;
  level = level || 0;

  var tabs = repeat('  ', level);
  var str = tabs + n.toString() + "\n";
  var self = this;

  n.children.forEach(function (n) {
    str += self.toString(n, level+1);
  })

  return str;
};

Message.prototype.inspect = function() {
  return this.toString();
};

Message.prototype.compose = function(vars) {
  return this.root.eval(vars);
};

Message.prototype.fill = function(vars) {
  return new Message(this.compose(vars));
};

//////////////// HELPERS

function repeat(char, n) {
  var s = '';
  while(n > 0) {
    s += char;
    n--;
  }
  return s;
}
