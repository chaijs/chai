---
  title: Assert 
  weight: 1
  render-file: false
---

## Assert

The assert style is exposed through `assert` interface. This provides
the classic assert-dot notation, similiar to that packaged with
node.js. This assert module, however, provides several additional
tests and is browser compatible.

    var assert = require('chai').assert
      , foo = 'bar'
      , beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };

    assert.typeOf(foo, 'string', 'foo is a string');
    assert.equal(foo, 'bar', 'foo equal `bar`');
    assert.length(foo, 3, 'foo`s value has a length of 3');
    assert.length(beverages.tea, 3, 'beverages has 3 types of tea');

In all cases, the assert style allows you to include an optional message as the
last parameter in the `assert` statement. These will be included in the 
error messages should your assertion not pass.
