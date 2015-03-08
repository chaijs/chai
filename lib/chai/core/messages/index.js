/*!
* chai
* http://chaijs.com
* Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
* MIT Licensed
*
* @author The Blacksmith (a.k.a. Saulo Vallory) <me@saulovallory.com>
*/

var Message = require('../message');

module.exports = function (chai, _) {
  var msgs = require('./i18n/en');

  chai.messages = {
    Message: Message
  };

  Object.keys(msgs).forEach(function(key) {
    chai.messages[key] = new Message(msgs[key]);
  });

  var meta = require('./meta');

  Object.keys(meta).forEach(function(key) {
    chai.messages[key] = meta[key];
  });
}
