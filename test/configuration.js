describe('configuration', function () {
  var assert = chai.assert;
  var expect = chai.expect;

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

  describe('includeStack', function() {
    // Skip tests if `Error.captureStackTrace` is unsupported
    if (typeof Error.captureStackTrace === 'undefined') return;

    try {
      throw Error();
    } catch (err) {
      // Skip tests if `err.stack` is unsupported
      if (typeof err.stack === 'undefined') return;
    }

    // Create overwritten assertions that always fail
    before(function () {
      chai.util.addProperty(chai.Assertion.prototype, 'tmpProperty', function () {});
      chai.util.overwriteProperty(chai.Assertion.prototype, 'tmpProperty', function () {
        return function () {
          this.assert(false);
        };
      });

      chai.util.addMethod(chai.Assertion.prototype, 'tmpMethod', function () {});
      chai.util.overwriteMethod(chai.Assertion.prototype, 'tmpMethod', function () {
        return function () {
          this.assert(false);
        };
      });

      chai.util.addChainableMethod(chai.Assertion.prototype, 'tmpChainableMethod', function () {}, function () {});
      chai.util.overwriteChainableMethod(chai.Assertion.prototype, 'tmpChainableMethod', function (_super) {
        return function () {
          this.assert(false);
        };
      }, function () {
        return function () {};
      });
    });

    // Delete overwritten assertions
    after(function () {
      delete chai.Assertion.prototype.tmpProperty;
      delete chai.Assertion.prototype.tmpMethod;
      delete chai.Assertion.prototype.tmpChainableMethod;
    });

    describe('expect interface', function () {
      // Functions that always throw an error
      function badPropertyAssertion() {
        expect(42).to.be.false;
      }
      function badOverwrittenPropertyAssertion() {
        expect(42).tmpProperty;
      }
      function badMethodAssertion() {
        expect(42).to.equal(false);
      }
      function badOverwrittenMethodAssertion() {
        expect(42).tmpMethod();
      }
      function badChainableMethodAssertion() {
        expect(42).to.be.a('string');
      }
      function badOverwrittenChainableMethodAssertion() {
        expect(42).tmpChainableMethod();
      }

      describe('when true', function () {
        describe('failed property assertions', function () {
          var caughtErr = '__PRETEST__';
  
          before(function () {
            chai.config.includeStack = true;
  
            try {
              badPropertyAssertion();
            } catch (err) {
              caughtErr = err;
            }
          });
  
          it('should include Chai frames in stack trace', function () {
            expect(caughtErr.stack).to.contain('propertyGetter');
  
            if (typeof Proxy !== 'undefined' && typeof Reflect !== 'undefined') {
              expect(caughtErr.stack).to.contain('proxyGetter');
            }
          });
  
          it('should include user frames in stack trace', function () {
            expect(caughtErr.stack).to.contain('badPropertyAssertion');
          });
        });
  
        describe('failed overwritten property assertions', function () {
          var caughtErr = '__PRETEST__';
  
          before(function () {
            chai.config.includeStack = true;
  
            try {
              badOverwrittenPropertyAssertion();
            } catch (err) {
              caughtErr = err;
            }
          });
  
          it('should include Chai frames in stack trace', function () {
            expect(caughtErr.stack).to.contain('overwritingPropertyGetter');
  
            if (typeof Proxy !== 'undefined' && typeof Reflect !== 'undefined') {
              expect(caughtErr.stack).to.contain('proxyGetter');
            }
          });
  
          it('should include user frames in stack trace', function () {
            expect(caughtErr.stack).to.contain('badOverwrittenPropertyAssertion');
          });
        });
  
        describe('failed method assertions', function () {
          var caughtErr = '__PRETEST__';
  
          before(function () {
            chai.config.includeStack = true;
  
            try {
              badMethodAssertion();
            } catch (err) {
              caughtErr = err;
            }
          });
  
          it('should include Chai frames in stack trace', function () {
            expect(caughtErr.stack).to.contain('methodWrapper');
          });
  
          it('should include user frames in stack trace', function () {
            expect(caughtErr.stack).to.contain('badMethodAssertion');
          });
        });
  
        describe('failed overwritten method assertions', function () {
          var caughtErr = '__PRETEST__';
  
          before(function () {
            chai.config.includeStack = true;
  
            try {
              badOverwrittenMethodAssertion();
            } catch (err) {
              caughtErr = err;
            }
          });
  
          it('should include Chai frames in stack trace', function () {
            expect(caughtErr.stack).to.contain('overwritingMethodWrapper');
          });
  
          it('should include user frames in stack trace', function () {
            expect(caughtErr.stack).to.contain('badOverwrittenMethodAssertion');
          });
        });
  
        describe('failed chainable method assertions', function () {
          var caughtErr = '__PRETEST__';
  
          before(function () {
            chai.config.includeStack = true;
  
            try {
              badChainableMethodAssertion();
            } catch (err) {
              caughtErr = err;
            }
          });
  
          it('should include Chai frames in stack trace', function () {
            expect(caughtErr.stack).to.contain('chainableMethodWrapper');
          });
  
          it('should include user frames in stack trace', function () {
            expect(caughtErr.stack).to.contain('badChainableMethodAssertion');
          });
        });
  
        describe('failed overwritten chainable method assertions', function () {
          var caughtErr = '__PRETEST__';
  
          before(function () {
            chai.config.includeStack = true;
  
            try {
              badOverwrittenChainableMethodAssertion();
            } catch (err) {
              caughtErr = err;
            }
          });
  
          it('should include Chai frames in stack trace', function () {
            expect(caughtErr.stack).to.contain('overwritingChainableMethodWrapper');
          });
  
          it('should include user frames in stack trace', function () {
            expect(caughtErr.stack).to.contain('badOverwrittenChainableMethodAssertion');
          });
        });
      });
  
      describe('when false', function () {
        describe('failed property assertions', function () {
          var caughtErr = '__PRETEST__';
  
          before(function () {
            chai.config.includeStack = false;
  
            try {
              badPropertyAssertion();
            } catch (err) {
              caughtErr = err;
            }
          });
  
          it('should not include Chai frames in stack trace', function () {
            expect(caughtErr.stack).to.not.contain('propertyGetter');
  
            if (typeof Proxy !== 'undefined' && typeof Reflect !== 'undefined') {
              expect(caughtErr.stack).to.not.contain('proxyGetter');
            }
          });
  
          it('should include user frames in stack trace', function () {
            expect(caughtErr.stack).to.contain('badPropertyAssertion');
          });
        });
  
        describe('failed overwritten property assertions', function () {
          var caughtErr = '__PRETEST__';
  
          before(function () {
            chai.config.includeStack = false;
  
            try {
              badOverwrittenPropertyAssertion();
            } catch (err) {
              caughtErr = err;
            }
          });
  
          it('should not include Chai frames in stack trace', function () {
            expect(caughtErr.stack).to.not.contain('overwritingPropertyGetter');
  
            if (typeof Proxy !== 'undefined' && typeof Reflect !== 'undefined') {
              expect(caughtErr.stack).to.not.contain('proxyGetter');
            }
          });
  
          it('should include user frames in stack trace', function () {
            expect(caughtErr.stack).to.contain('badOverwrittenPropertyAssertion');
          });
        });
  
        describe('failed method assertions', function () {
          var caughtErr = '__PRETEST__';
  
          before(function () {
            chai.config.includeStack = false;
  
            try {
              badMethodAssertion();
            } catch (err) {
              caughtErr = err;
            }
          });
  
          it('should not include Chai frames in stack trace', function () {
            expect(caughtErr.stack).to.not.contain('methodWrapper');
          });
  
          it('should include user frames in stack trace', function () {
            expect(caughtErr.stack).to.contain('badMethodAssertion');
          });
        });
  
        describe('failed overwritten method assertions', function () {
          var caughtErr = '__PRETEST__';
  
          before(function () {
            chai.config.includeStack = false;
  
            try {
              badOverwrittenMethodAssertion();
            } catch (err) {
              caughtErr = err;
            }
          });
  
          it('should not include Chai frames in stack trace', function () {
            expect(caughtErr.stack).to.not.contain('overwritingMethodWrapper');
          });
  
          it('should include user frames in stack trace', function () {
            expect(caughtErr.stack).to.contain('badOverwrittenMethodAssertion');
          });
        });
  
        describe('failed chainable method assertions', function () {
          var caughtErr = '__PRETEST__';
  
          before(function () {
            chai.config.includeStack = false;
  
            try {
              badChainableMethodAssertion();
            } catch (err) {
              caughtErr = err;
            }
          });
  
          it('should not include Chai frames in stack trace', function () {
            expect(caughtErr.stack).to.not.contain('chainableMethodWrapper');
          });
  
          it('should include user frames in stack trace', function () {
            expect(caughtErr.stack).to.contain('badChainableMethodAssertion');
          });
        });
  
        describe('failed overwritten chainable method assertions', function () {
          var caughtErr = '__PRETEST__';
  
          before(function () {
            chai.config.includeStack = false;
  
            try {
              badOverwrittenChainableMethodAssertion();
            } catch (err) {
              caughtErr = err;
            }
          });
  
          it('should not include Chai frames in stack trace', function () {
            expect(caughtErr.stack).to.not.contain('overwritingChainableMethodWrapper');
          });
  
          it('should include user frames in stack trace', function () {
            expect(caughtErr.stack).to.contain('badOverwrittenChainableMethodAssertion');
          });
        });
      });
    });

    describe('should interface', function () {
      // Functions that always throw an error
      function badPropertyAssertion() {
        (42).should.be.false;
      }
      function badOverwrittenPropertyAssertion() {
        (42).should.tmpProperty;
      }
      function badMethodAssertion() {
        (42).should.equal(false);
      }
      function badOverwrittenMethodAssertion() {
        (42).should.tmpMethod();
      }
      function badChainableMethodAssertion() {
        (42).should.be.a('string');
      }
      function badOverwrittenChainableMethodAssertion() {
        (42).should.tmpChainableMethod();
      }

      describe('when true', function () {
        describe('failed property assertions', function () {
          var caughtErr = '__PRETEST__';
  
          before(function () {
            chai.config.includeStack = true;
  
            try {
              badPropertyAssertion();
            } catch (err) {
              caughtErr = err;
            }
          });
  
          it('should include Chai frames in stack trace', function () {
            expect(caughtErr.stack).to.contain('propertyGetter');
  
            if (typeof Proxy !== 'undefined' && typeof Reflect !== 'undefined') {
              expect(caughtErr.stack).to.contain('proxyGetter');
            }
          });
  
          it('should include user frames in stack trace', function () {
            expect(caughtErr.stack).to.contain('badPropertyAssertion');
          });
        });
  
        describe('failed overwritten property assertions', function () {
          var caughtErr = '__PRETEST__';
  
          before(function () {
            chai.config.includeStack = true;
  
            try {
              badOverwrittenPropertyAssertion();
            } catch (err) {
              caughtErr = err;
            }
          });
  
          it('should include Chai frames in stack trace', function () {
            expect(caughtErr.stack).to.contain('overwritingPropertyGetter');
  
            if (typeof Proxy !== 'undefined' && typeof Reflect !== 'undefined') {
              expect(caughtErr.stack).to.contain('proxyGetter');
            }
          });
  
          it('should include user frames in stack trace', function () {
            expect(caughtErr.stack).to.contain('badOverwrittenPropertyAssertion');
          });
        });
  
        describe('failed method assertions', function () {
          var caughtErr = '__PRETEST__';
  
          before(function () {
            chai.config.includeStack = true;
  
            try {
              badMethodAssertion();
            } catch (err) {
              caughtErr = err;
            }
          });
  
          it('should include Chai frames in stack trace', function () {
            expect(caughtErr.stack).to.contain('methodWrapper');
          });
  
          it('should include user frames in stack trace', function () {
            expect(caughtErr.stack).to.contain('badMethodAssertion');
          });
        });
  
        describe('failed overwritten method assertions', function () {
          var caughtErr = '__PRETEST__';
  
          before(function () {
            chai.config.includeStack = true;
  
            try {
              badOverwrittenMethodAssertion();
            } catch (err) {
              caughtErr = err;
            }
          });
  
          it('should include Chai frames in stack trace', function () {
            expect(caughtErr.stack).to.contain('overwritingMethodWrapper');
          });
  
          it('should include user frames in stack trace', function () {
            expect(caughtErr.stack).to.contain('badOverwrittenMethodAssertion');
          });
        });
  
        describe('failed chainable method assertions', function () {
          var caughtErr = '__PRETEST__';
  
          before(function () {
            chai.config.includeStack = true;
  
            try {
              badChainableMethodAssertion();
            } catch (err) {
              caughtErr = err;
            }
          });
  
          it('should include Chai frames in stack trace', function () {
            expect(caughtErr.stack).to.contain('chainableMethodWrapper');
          });
  
          it('should include user frames in stack trace', function () {
            expect(caughtErr.stack).to.contain('badChainableMethodAssertion');
          });
        });
  
        describe('failed overwritten chainable method assertions', function () {
          var caughtErr = '__PRETEST__';
  
          before(function () {
            chai.config.includeStack = true;
  
            try {
              badOverwrittenChainableMethodAssertion();
            } catch (err) {
              caughtErr = err;
            }
          });
  
          it('should include Chai frames in stack trace', function () {
            expect(caughtErr.stack).to.contain('overwritingChainableMethodWrapper');
          });
  
          it('should include user frames in stack trace', function () {
            expect(caughtErr.stack).to.contain('badOverwrittenChainableMethodAssertion');
          });
        });
      });
  
      describe('when false', function () {
        describe('failed property assertions', function () {
          var caughtErr = '__PRETEST__';
  
          before(function () {
            chai.config.includeStack = false;
  
            try {
              badPropertyAssertion();
            } catch (err) {
              caughtErr = err;
            }
          });
  
          it('should not include Chai frames in stack trace', function () {
            expect(caughtErr.stack).to.not.contain('propertyGetter');
  
            if (typeof Proxy !== 'undefined' && typeof Reflect !== 'undefined') {
              expect(caughtErr.stack).to.not.contain('proxyGetter');
            }
          });
  
          it('should include user frames in stack trace', function () {
            expect(caughtErr.stack).to.contain('badPropertyAssertion');
          });
        });
  
        describe('failed overwritten property assertions', function () {
          var caughtErr = '__PRETEST__';
  
          before(function () {
            chai.config.includeStack = false;
  
            try {
              badOverwrittenPropertyAssertion();
            } catch (err) {
              caughtErr = err;
            }
          });
  
          it('should not include Chai frames in stack trace', function () {
            expect(caughtErr.stack).to.not.contain('overwritingPropertyGetter');
  
            if (typeof Proxy !== 'undefined' && typeof Reflect !== 'undefined') {
              expect(caughtErr.stack).to.not.contain('proxyGetter');
            }
          });
  
          it('should include user frames in stack trace', function () {
            expect(caughtErr.stack).to.contain('badOverwrittenPropertyAssertion');
          });
        });
  
        describe('failed method assertions', function () {
          var caughtErr = '__PRETEST__';
  
          before(function () {
            chai.config.includeStack = false;
  
            try {
              badMethodAssertion();
            } catch (err) {
              caughtErr = err;
            }
          });
  
          it('should not include Chai frames in stack trace', function () {
            expect(caughtErr.stack).to.not.contain('methodWrapper');
          });
  
          it('should include user frames in stack trace', function () {
            expect(caughtErr.stack).to.contain('badMethodAssertion');
          });
        });
  
        describe('failed overwritten method assertions', function () {
          var caughtErr = '__PRETEST__';
  
          before(function () {
            chai.config.includeStack = false;
  
            try {
              badOverwrittenMethodAssertion();
            } catch (err) {
              caughtErr = err;
            }
          });
  
          it('should not include Chai frames in stack trace', function () {
            expect(caughtErr.stack).to.not.contain('overwritingMethodWrapper');
          });
  
          it('should include user frames in stack trace', function () {
            expect(caughtErr.stack).to.contain('badOverwrittenMethodAssertion');
          });
        });
  
        describe('failed chainable method assertions', function () {
          var caughtErr = '__PRETEST__';
  
          before(function () {
            chai.config.includeStack = false;
  
            try {
              badChainableMethodAssertion();
            } catch (err) {
              caughtErr = err;
            }
          });
  
          it('should not include Chai frames in stack trace', function () {
            expect(caughtErr.stack).to.not.contain('chainableMethodWrapper');
          });
  
          it('should include user frames in stack trace', function () {
            expect(caughtErr.stack).to.contain('badChainableMethodAssertion');
          });
        });
  
        describe('failed overwritten chainable method assertions', function () {
          var caughtErr = '__PRETEST__';
  
          before(function () {
            chai.config.includeStack = false;
  
            try {
              badOverwrittenChainableMethodAssertion();
            } catch (err) {
              caughtErr = err;
            }
          });
  
          it('should not include Chai frames in stack trace', function () {
            expect(caughtErr.stack).to.not.contain('overwritingChainableMethodWrapper');
          });
  
          it('should include user frames in stack trace', function () {
            expect(caughtErr.stack).to.contain('badOverwrittenChainableMethodAssertion');
          });
        });
      });
    });
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

  describe('useProxy', function() {
    var readNoExistentProperty = function() {
      expect(false).to.be.tue; // typo: tue should be true
    };

    it('should have default value equal to true', function() {
      expect(chai.config.useProxy).to.be.true;
    });

    describe('when true', function() {
      it('should use proxy unless user\'s environment doesn\'t support', function() {
        if (typeof Proxy !== 'undefined' && typeof Reflect !== 'undefined') {
          expect(readNoExistentProperty).to.throw('Invalid Chai property: tue');
        } else {
          expect(readNoExistentProperty).to.not.throw('Invalid Chai property: tue');
        }
      });
    });

    describe('when false', function() {
      it('should not use proxy', function() {
        chai.config.useProxy = false;

        expect(readNoExistentProperty).to.not.throw('Invalid Chai property: tue');
      });
    });
  });

  describe('proxyExcludedKeys', function() {
    var readNoExistentProperty = function(prop) {
      return function() {
        var assertion = expect(false);
        expect(assertion).to.not.have.key(prop);
        assertion[prop];
      }
    };

    it('should have default value equal to `[\'then\', \'inspect\', \'toJSON\']`', function() {
      expect(chai.config.proxyExcludedKeys).to.be.deep.equal(['then', 'inspect', 'toJSON']);
    });

    it('should not throw when accessing non-existing `then` and `inspect` in an environment with proxy support', function() {
      // Since these will not throw if the environment does not support proxies we don't need any `if` clause here
      expect(readNoExistentProperty('then')).to.not.throw();
      expect(readNoExistentProperty('inspect')).to.not.throw();
    });

    it('should throw for properties which are not on the `proxyExcludedKeys` Array in an environment with proxy support', function() {
      chai.config.proxyExcludedKeys = [];

      if (typeof Proxy !== 'undefined' && typeof Reflect !== 'undefined') {
        expect(readNoExistentProperty('then')).to.throw('Invalid Chai property: then');
        expect(readNoExistentProperty('inspect')).to.throw('Invalid Chai property: inspect');
      } else {
        expect(readNoExistentProperty('then')).to.not.throw();
        expect(readNoExistentProperty('inspect')).to.not.throw();
      }
    });
  });

});
