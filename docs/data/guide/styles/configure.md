---
  title: Configuration
  weight: 15
  render-file: false
---

## Configuration

By default, Chai does not show stack traces upon an AssertionError. This can
be changed by modifying the `includeStack` parameter for chai.Assertion. For example:

    var chai = require('chai');
    chai.Assertion.includeStack = true; // defaults to false
