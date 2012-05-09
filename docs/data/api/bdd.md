---
  title: Expect / Should
  weight: 10
--- 

The BDD style is exposed through `expect` or `should` interfaces. In both
scenarios, you chain together natural language assertions.

```javascript
// expect
var expect = require('chai').expect;
expect(foo).to.equal('bar');

// should
var should = require('chai').should();
foo.should.equal('bar');
```

## Differences

The `expect` interface provides a function as a starting point for chaining
your language assertions. It works on node.js and in all browsers.

The `should` interface extends `Object.prototype` to provide a single getter as
the starting point for your language assertions. It works on node.js and in
all browsers except Internet Explorer.


## Configuration

By default, Chai does not show stack traces upon an AssertionError. This can
be changed by modifying the `includeStack` parameter for chai.Assertion. For example:

```javascript
var chai = require('chai');
chai.Assertion.includeStack = true; // defaults to false
```

## Should Extras

Lorem ipsum

## Language Guide
