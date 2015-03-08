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
 * ### ArticleToken
 *
 * Adds an article (_a_ or _an_), automatically selected acording to grammar rules,
 *
 * #### Syntax
 *
 *     [@:{{TOKEN}}]
 *
 * #### Examples
 * 
 *     tok = "string"
 *     [@:{{tok}}]     // a string
 *
 *     tok = "array"
 *     [@:{{tok}}]     // an array
 */
TokenNode.register('@', ArticleToken);

function ArticleToken(str, index) {
  TokenNode.call(this, str, index);

  this.type = '@';
};

ArticleToken.prototype.eval = function (vars) {
  var text = this.children.map(function(c){
    return c.eval(vars);
  }).join(' ');

  if(text[0].match(/[aeiou]/i) !== null)
    return 'an ' + text;

  return 'a ' + text;
};

module.exports = ArticleToken;
