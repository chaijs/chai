---
  title: Assert 
  weight: 10
  render-file: false
---

## Assert

The `assert` style is like the node.js included assert utility with few extras.

      var assert = require('chai').assert
        , foo = 'bar'
        , beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };

      assert.typeOf(foo, 'string', 'foo is a string');
      assert.equal(foo, 'bar', 'foo equal `bar`');
      assert.length(foo, 3, 'foo`s value has a length of 3');
      assert.length(beverages.tea, 3, 'beverages has 3 types of tea');
