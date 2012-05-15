---
  title: Should
  weight: 7
  render-file: false
---

## Should

The `should` style allows for the same chainable assertions as the
the `expect` interface, however is extends each object with a `should`
property to start your chain. This style has some issues when used Internet
Explorer, so be aware of browser compatibility. 

    var should = require('chai').should() //actually call the the function
      , foo = 'bar'
      , beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };

    foo.should.be.a('string');
    foo.should.equal('bar');
    foo.should.have.length(3);
    beverages.should.have.property('tea').with.length(3);
