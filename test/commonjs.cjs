const {expect, should} = require('chai');
const chai = require('chai');
require('chai/register-assert.cjs');
should()

it('expect and should are CJS named exports and chai is a default export', () => {
  expect(4).to.equal(4);
  "s".should.equal("s");
  chai.expect(4).to.equal(4);
  assert.equal(4, 4);
})
