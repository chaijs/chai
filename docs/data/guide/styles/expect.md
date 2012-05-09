---
  title: Expect
  weight: 5
  render-file: false
---

## Expect

The `expect` style is server/browser BDD style assert language.

      var expect = require('chai').expect
        , foo = 'bar'
        , beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };

      expect(foo).to.be.a('string');
      expect(foo).to.equal('bar');
      expect(foo).to.have.length(3);
      expect(beverages).to.have.property('tea').with.length(3);
