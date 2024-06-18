import {use, assert, expect, Should} from '../index.js';

/**
 * A chai plugin that adds the `testing` property on chai assertions.
 *
 * @param {unknown} chai
 */
function plugin(chai) {
  if (chai.Assertion.prototype.testing) return;

  chai.assert.testing = 'successful';

  Object.defineProperty(chai.Assertion.prototype, 'testing', {
    get: function () {
      return 'successful';
    },
  });
}

/**
 * A chai plugin that adds the `moreTesting` property on chai assertions.
 *
 * @param {unknown} chai
 */
function anotherPlugin(chai) {
  if (chai.Assertion.prototype.moreTesting) return;

  chai.assert.moreTesting = 'more success';

  Object.defineProperty(chai.Assertion.prototype, 'moreTesting', {
    get: function () {
      return 'more success';
    },
  });
}

/**
 * A exmple of a "bad" plugin for chai that overwrites the `equal` property.
 *
 * @param {unknown} chai
 */
function brokenPlugin(chai) {
  chai.overwriteProperty('equal', function (_super) {
    if (something) {
      return _super.call(this);
    }
    return someOtherThing();
  });
}

describe('plugins', function () {
  // Plugins are not applied "immutably" on chai so we want to just apply them
  // here globally and then run all the tests.
  use(plugin).use(anotherPlugin);

  it("doesn't crash when there's a bad plugin", function () {
    expect(() => {
      use(brokenPlugin).use(brokenPlugin).use(brokenPlugin);
    }).to.not.throw;
  });

  describe('should', () => {
    before(() => {
      Should();
    });

    it('basic usage', function () {
      expect((42).should.testing).to.equal('successful');
    });

    it('multiple plugins apply all changes', function () {
      expect((42).should.testing).to.equal('successful');
      expect((42).should.moreTesting).to.equal('more success');
    });

    it('.use detached from chai object', function () {
      expect((42).should.moreTesting).to.equal('more success');
    });
  });

  describe('expect', () => {
    it('basic usage', function () {
      expect(expect('').testing).to.equal('successful');
    });

    it('multiple plugins apply all changes', function () {
      expect(expect('').testing).to.equal('successful');
      expect(expect('').moreTesting).to.equal('more success');
    });

    it('.use detached from chai object', function () {
      expect(expect('').moreTesting).to.equal('more success');
    });
  });

  describe('assert', () => {
    it('basic usage', function () {
      expect(assert.testing).to.equal('successful');
    });

    it('multiple plugins apply all changes', function () {
      expect(assert.testing).to.equal('successful');
      expect(assert.moreTesting).to.equal('more success');
    });

    it('.use detached from chai object', function () {
      expect(assert.moreTesting).to.equal('more success');
    });
  });
});
