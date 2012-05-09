---
  title: Should
  weight: 7
  render-file: false
---

## Should

The `should` style was inspired by [should.js](https://github.com/visionmedia/should.js)
and is completely API compatible.

      var should = require('chai').should() //actually call the the function
        , foo = 'bar'
        , beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };

      foo.should.be.a('string');
      foo.should.equal('bar');
      foo.should.have.length(3);
      beverages.should.have.property('tea').with.length(3);

Notice that the `expect` require is just a reference to the `expect` function, whereas
with the `should` require, the function is being executed.
