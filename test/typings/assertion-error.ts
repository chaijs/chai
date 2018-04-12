import chai = require('chai');

const assertionError = new chai.AssertionError(
  'Expected `foo` to be `bar`',
  {actual: 'foo', expected: 'bar'},
);

const message: string = assertionError.message;
const actual: string = assertionError.actual;
const expected: string = assertionError.expected;
