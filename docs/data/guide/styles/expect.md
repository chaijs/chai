---
  title: Expect
  weight: 5
  render-file: false
---

## Expect

The BDD style is exposed through `expect` or `should` interfaces. In both
scenarios, you chain together natural language assertions.

    var expect = require('chai').expect
      , foo = 'bar'
      , beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };

    expect(foo).to.be.a('string');
    expect(foo).to.equal('bar');
    expect(foo).to.have.length(3);
    expect(beverages).to.have.property('tea').with.length(3);
