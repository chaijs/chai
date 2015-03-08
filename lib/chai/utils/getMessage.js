/*!
 * Chai - message composition utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Module dependancies
 */

var flag = require('./flag')
  , getActual = require('./getActual')
  , inspect = require('./inspect')
  , objDisplay = require('./objDisplay')
  , Message = require('../core/message');

/**
 * ### .getMessage(object, message, negateMessage)
 *
 * Construct the error message based on flags
 * and template tags. Template tags will return
 * a stringified inspection of the object referenced.
 *
 * Message template tags:
 * - `#{this}` current asserted object
 * - `#{act}` actual value
 * - `#{exp}` expected value
 *
 * @param {Object} object (constructed Assertion)
 * @param {Arguments} chai.Assertion.prototype.assert arguments
 * @name getMessage
 * @api public
 */

module.exports = function (obj, args) {
  var negate = flag(obj, 'negate')
    , val = flag(obj, 'object')
    , expected = args[3]
    , actual = getActual(obj, args)
    , msg = args[1]
    , flagMsg = flag(obj, 'message');
    
  if(typeof msg === 'function') {
    msg = new Message(msg());
  }
  else if(typeof msg === 'string') {
    msg = new Message(msg);
  }

  if(msg instanceof Message) {
    msg = msg.compose({
      'this': objDisplay(val),
      act: objDisplay(actual),
      exp: objDisplay(expected),
      negate: negate,
      assertion: obj
    });
  }
  else {
    msg =  '';
  }

  return flagMsg ? flagMsg + ': ' + msg : msg;
};
