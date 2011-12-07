
module.exports = AssertionError;

function AssertionError (options) {
  options = options || {};
  this.name = 'AssertionError';
  this.message = options.message;
  this.actual = options.actual;
  this.expected = options.expected;
  this.operator = options.operator;
  var stackStartFunction = options.stackStartFunction;

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, stackStartFunction);
  }
};

AssertionError.prototype.summary = function() {
  return this.name + (this.message ? ': ' + this.message : '');
};

AssertionError.prototype.details = function() {
  return 'In "' + this.operator + '":\n\tExpected: ' + this.expected + '\n\tFound: ' + this.actual;
};

AssertionError.prototype.toString = function() {
  return this.summary() + '\n' + this.details();
};
