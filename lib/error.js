/*!
 * chai
 * Copyright(c) 2011-2012 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Module dependancies
 */

var fs = require('fs');

/*!
 * Main export
 */

module.exports = AssertionError;

/**
 * # AssertionError (constructor)
 *
 * Create a new assertion error based on the Javascript
 * `Error` prototype.
 *
 * **Options**
 * - message
 * - actual
 * - expected
 * - operator
 * - startStackFunction
 *
 * @param {Object} options
 * @api public
 */

function AssertionError (options) {
  options = options || {};
  this.name = 'AssertionError';
  this.message = options.message;
  this.actual = options.actual;
  this.expected = options.expected;
  this.operator = options.operator;

  if (options.stackStartFunction && Error.captureStackTrace) {
    // We need the raw stack so we can make a JSON
    // object for writing to the logs.
    var stackStartFunction = options.stackStartFunction
      , orig = Error.prepareStackTrace;

    // Custom stack track
    Error.prepareStackTrace = function(_, stack){ return stack; };
    Error.captureStackTrace(this, stackStartFunction);
    this.__stack = this.stack;

    // return original
    Error.prepareStackTrace = orig;

    Object.defineProperty(this, 'stack',
      { get: function () {
          // If we have a stack trace then
          // we are going to get the contents
          // of the line that errored
          if (this.__stack[1]) {
            var filename = this.__stack[1].getFileName()
              , lineno = this.__stack[1].getLineNumber()
              , line = fs.readFileSync(filename, 'utf8').split('\n')[lineno - 1].trim();
            return this.message + '\n[' + lineno + '] ' + filename + '\n' + line;

          // Else, just return the message.
          } else {
            return this.message;
          }
        }
      }
    );
  }
}

/*!
 * Inherit from Error
 */

AssertionError.prototype.__proto__ = Error.prototype;

/**
 * # toString()
 *
 * Override default to string method
 */

AssertionError.prototype.toString = function() {
  return this.message;
};
