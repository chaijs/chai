describe('configuration', function () {
  var assert = chai.assert;

  var origConfig;

  beforeEach(function() {
    // backup current config
    function clone(o) {
      return JSON.parse(JSON.stringify(o));
    }
    origConfig = clone(chai.config);
  });

  afterEach(function() {
    // restore config
    Object.keys(origConfig).forEach(function(key) {
      chai.config[key] = origConfig[key];
    });
  });

  function fooThrows () {
    chai.expect('foo').to.be.equal('bar');
  }
  function fooPropThrows () {
    chai.expect('foo').to.not.exist;
  }

  it('includeStack is true for method assertions', function () {
    chai.config.includeStack = true;

    try {
      fooThrows();
      assert.ok(false, 'should not get here because error thrown');
    } catch (err) {
      // not all browsers support err.stack
      if ('undefined' !== typeof err.stack) {
        assert.include(err.stack, 'assertEqual', 'should have internal stack trace in error message');
        assert.include(err.stack, 'fooThrows', 'should have user stack trace in error message');
      }
    }

  });

  it('includeStack is false for method assertions', function () {
    chai.config.includeStack = false;

    try {
      fooThrows();
      assert.ok(false, 'should not get here because error thrown');
    } catch (err) {
      // IE 10 supports err.stack in Chrome format, but without
      // `Error.captureStackTrace` support that allows tuning of the error
      // message.
      if ('undefined' !== typeof err.stack && 'undefined' !== typeof Error.captureStackTrace) {
        assert.notInclude(err.stack, 'assertEqual', 'should not have internal stack trace in error message');
        assert.include(err.stack, 'fooThrows', 'should have user stack trace in error message');
      }
    }
  });

  it('includeStack is true for property assertions', function () {
    chai.config.includeStack = true;

    try {
      fooPropThrows();
      assert.ok(false, 'should not get here because error thrown');
    } catch (err) {
      // not all browsers support err.stack
      // Phantom does not include function names for getter exec
      if ('undefined' !== typeof err.stack && 'undefined' !== typeof Error.captureStackTrace) {
        assert.include(err.stack, 'addProperty', 'should have internal stack trace in error message');
        assert.include(err.stack, 'fooPropThrows', 'should have user stack trace in error message');
      }
    }

  });

  it('includeStack is false for property assertions', function () {
    chai.config.includeStack = false;

    try {
      fooPropThrows();
      assert.ok(false, 'should not get here because error thrown');
    } catch (err) {
      // IE 10 supports err.stack in Chrome format, but without
      // `Error.captureStackTrace` support that allows tuning of the error
      // message.
      if ('undefined' !== typeof err.stack && 'undefined' !== typeof Error.captureStackTrace) {
        assert.notInclude(err.stack, 'addProperty', 'should not have internal stack trace in error message');
        assert.include(err.stack, 'fooPropThrows', 'should have user stack trace in error message');
      }
    }
  });

  describe('truncateThreshold', function() {
    it('is 20', function() {
      chai.config.truncateThreshold = 20;

      err(function() {
        assert.deepEqual({v: 'something longer than 20'}, {v: 'x'});
      }, "expected { Object (v) } to deeply equal { v: 'x' }");
    });

    it('is 0', function() {
      chai.config.truncateThreshold = 0;

      err(function() {
        assert.deepEqual({v: 'something longer than 20'}, {v: 'x'});
      }, "expected { v: 'something longer than 20' } to deeply equal { v: 'x' }");
    });
  });

  describe('deprecated properties', function() {
    var origWarnFn;
    var warnings;

    beforeEach(function() {
      origWarnFn = console.warn;
      warnings = [];
      console.warn = function(message) {
        warnings.push(message);
      };
    });

    afterEach(function() {
      console.warn = origWarnFn;
    });

    it('Assertion.includeStack warns that it is deprecated', function() {
      chai.Assertion.includeStack;

      assert.equal(warnings.length, 1);
      assert.equal(warnings[0], 'Assertion.includeStack is deprecated, use chai.config.includeStack instead.');

      chai.Assertion.includeStack = true;

      assert.equal(warnings.length, 2);
      assert.equal(warnings[1], 'Assertion.includeStack is deprecated, use chai.config.includeStack instead.');
    });

    it('Assertion.includeStack is kept in sync with config.includeStack', function() {
      assert.equal(chai.Assertion.includeStack, chai.config.includeStack);
      chai.Assertion.includeStack = !chai.Assertion.includeStack;
      assert.equal(chai.Assertion.includeStack, chai.config.includeStack);
      chai.config.includeStack = !chai.config.includeStack;
      assert.equal(chai.Assertion.includeStack, chai.config.includeStack);
    });

    it('Assertion.showDiff warns that it is deprecated', function() {
      chai.Assertion.showDiff;

      assert.equal(warnings.length, 1);
      assert.equal(warnings[0], 'Assertion.showDiff is deprecated, use chai.config.showDiff instead.');

      chai.Assertion.showDiff = true;

      assert.equal(warnings.length, 2);
      assert.equal(warnings[1], 'Assertion.showDiff is deprecated, use chai.config.showDiff instead.');
    });

    it('Assertion.showDiff is kept in sync with config.showDiff', function() {
      assert.equal(chai.Assertion.showDiff, chai.config.showDiff);
      chai.Assertion.showDiff = !chai.Assertion.showDiff;
      assert.equal(chai.Assertion.showDiff, chai.config.showDiff);
      chai.config.showDiff = !chai.config.showDiff;
      assert.equal(chai.Assertion.showDiff, chai.config.showDiff);
    });
    
  });
});
