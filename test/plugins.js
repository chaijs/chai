import {use, expect} from '../index.js';

function plugin(chai) {
  if (chai.Assertion.prototype.testing) return;

  Object.defineProperty(chai.Assertion.prototype, 'testing', {
    get: function () {
      return 'successful';
    },
  });
}

function anotherPlugin(chai) {
  if (chai.Assertion.prototype.moreTesting) return;

  Object.defineProperty(chai.Assertion.prototype, 'moreTesting', {
    get: function () {
      return 'more success';
    },
  });
}

function brokenPlugin(chai) {
  chai.overwriteProperty('equal', function (_super) {
    if (something) {
      return _super.call(this);
    }
    return someOtherThing();
  });
}

describe('plugins', function () {
  it('basic usage', function () {
    const {expect} = use(plugin);
    expect(expect('').testing).to.equal('successful');
  });

  it('multiple plugins apply all changes', function () {
    const chai = use(plugin).use(anotherPlugin);

    expect(chai.expect('').testing).to.equal('successful');
    expect(chai.expect('').moreTesting).to.equal('more success');
  });

  it("doesn't crash when there's a bad plugin", function () {
    expect(() => {
      use(brokenPlugin).use(brokenPlugin).use(brokenPlugin);
    }).to.not.throw;
  });

  it('.use detached from chai object', function () {
    const {expect} = use(anotherPlugin);

    expect(expect('').moreTesting).to.equal('more success');
  });
});
