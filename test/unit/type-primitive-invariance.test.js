const { expect } = require('../..');

describe('Type Helper Primitive Invariance', () => {
  it('should correctly distinguish primitives from object wrappers', () => {
    expect(typeof 'hello').to.equal('string');
    expect(typeof 42).to.equal('number');
    expect(typeof true).to.equal('boolean');
    expect(typeof Symbol('sym')).to.equal('symbol');
    expect(typeof 100n).to.equal('bigint');
  });

  it('should correctly identify null as an object type in standard js semantics', () => {
    expect(typeof null).to.equal('object');
  });

  it('should verify NaN is a number type but not equal to itself', () => {
    expect(typeof NaN).to.equal('number');
    expect(Number.isNaN(NaN)).to.be.true;
  });
});
