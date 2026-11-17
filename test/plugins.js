import * as chai from '../index.js';

describe('plugins', function () {

  function plugin (chai) {
    if (chai.Assertion.prototype.testing) return;

    Object.defineProperty(chai.Assertion.prototype, 'testing', {
      get: function () {
        return 'successful';
      }
    });
  }

  it('basic usage', function () {
    chai.use(plugin);
    var expect = chai.expect;
    expect(expect('').testing).to.equal('successful');
  });

  it('double plugin', function () {
    chai.expect(function () {
      chai.use(plugin);
    }).to.not.throw();
  });

  it('nested plugin', function () {
    chai.use(function (chai) {
      chai.use(plugin);
    });
    var expect = chai.expect;
    expect(expect('').testing).to.equal('successful');
  });

  it('chained plugin', function () {
    chai.use(function (chaiObj) {
      Object.defineProperty(chaiObj.Assertion.prototype, 'testing2', {
        get() {
          return 'bleep bloop';
        }
      });
    }).use(plugin);
    var expect = chai.expect;
    expect(expect('').testing).to.equal('successful');
    expect(expect('').testing2).to.equal('bleep bloop');
  });

  it('retains plugin exports when the same plugin is reused', function () {
    var calls = 0;
    var request = function () { return 'response'; };
    function exportPlugin (chai) {
      calls++;
      chai.pluginRequest = request;
    }

    var first = chai.use(exportPlugin);
    try {
      var second = chai.use(exportPlugin);
      chai.expect(first.pluginRequest()).to.equal('response');
      chai.expect(second.pluginRequest()).to.equal('response');
      chai.expect(calls).to.equal(1);
    } finally {
      delete first.pluginRequest;
    }
  });

  it('keeps exports from each plugin when chaining', function () {
    var first = chai.use(function (chai) {
      chai.firstPluginValue = 'first';
    });
    var second = first.use(function (chai) {
      chai.secondPluginValue = 'second';
    });

    try {
      chai.expect(second.firstPluginValue).to.equal('first');
      chai.expect(second.secondPluginValue).to.equal('second');
      chai.expect(first.secondPluginValue).to.equal('second');
    } finally {
      delete first.firstPluginValue;
      delete second.secondPluginValue;
    }
  });

  it('shares exports with nested plugins', function () {
    var nested;
    var outer = chai.use(function (chai) {
      chai.outerPluginValue = 'outer';
      nested = chai.use(function (chai) {
        chai.nestedPluginValue = 'nested';
      });
    });

    try {
      chai.expect(nested.outerPluginValue).to.equal('outer');
      chai.expect(outer.nestedPluginValue).to.equal('nested');
    } finally {
      delete outer.outerPluginValue;
      delete nested.nestedPluginValue;
    }
  });

  it('does not wrap an assertion again when a plugin is reused', function () {
    var calls = 0;
    var name = 'pluginWrappedMethod';
    chai.util.addMethod(chai.Assertion.prototype, name, function () {});
    function wrappingPlugin (chai, util) {
      util.overwriteMethod(chai.Assertion.prototype, name, function (_super) {
        return function () {
          calls++;
          return _super.apply(this, arguments);
        };
      });
    }

    try {
      chai.use(wrappingPlugin).use(wrappingPlugin);
      chai.expect('').pluginWrappedMethod();
      chai.expect(calls).to.equal(1);
    } finally {
      delete chai.Assertion.prototype[name];
    }
  });

  it('.use detached from chai object', function () {
    function anotherPlugin (chai) {
      Object.defineProperty(chai.Assertion.prototype, 'moreTesting', {
        get: function () {
          return 'more success';
        }
      });
    }

    var use = chai.use;
    use(anotherPlugin);

    var expect = chai.expect;
    expect(expect('').moreTesting).to.equal('more success');
  });
});
