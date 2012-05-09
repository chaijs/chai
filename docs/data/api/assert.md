---
  title: Assert
  weight: 15
---

The assert (TDD) style is exposed through `assert` interfaces. This provides
the classic assert-dot notation, similiar to that packaged with
node.js. This assert module, however, provides several additional
tests and is browser compatible.

```javascript
// assert
var assert = require('chai').assert;
  , foo = 'bar';

assert.typeOf(foo, 'string');
assert.equal(foo, 'bar');
```

## Configuration

By default, Chai does not show stack traces upon an AssertionError. This can
be changed by modifying the `includeStack` parameter for chai.Assertion. For example:

```javascript
var chai = require('chai');
chai.Assertion.includeStack = true; // defaults to false
```

## Assert API
