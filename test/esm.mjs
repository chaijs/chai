import {expect, should} from 'chai';
import chai from 'chai';
should()

it('expect and should are ESM named exports and chai is a default export', () => {
  expect(4).to.equal(4)
  "s".should.equal("s")
  chai.expect(4).to.equal(4)
})