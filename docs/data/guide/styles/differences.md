---
  title: Differences
  weight: 10
  render-file: false
---

## Differences

First of all, notice that the `expect` require is just a reference to the 
`expect` function, whereas with the `should` require, the function is 
being executed.

    var chai = require('chai')
      , expect = chai.expect
      , should = chai.should();

The `expect` interface provides a function as a starting point for chaining
your language assertions. It works on node.js and in all browsers.

The `should` interface extends `Object.prototype` to provide a single getter as
the starting point for your language assertions. It works on node.js and in
all browsers except Internet Explorer.
