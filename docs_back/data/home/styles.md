---
  title: Assertion Styles
  weight: 5
  render-file: false
---

### Expect

The `expect` style is server/browser BDD style assert language.

      var expect = require('chai').expect
        , foo = 'bar'
        , beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };

      expect(foo).to.be.a('string');
      expect(foo).to.equal('bar');
      expect(foo).to.have.length(3);
      expect(beverages).to.have.property('tea').with.length(3);

### Should

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

### Assert

The `assert` style is like the node.js included assert utility with few extras.

      var assert = require('chai').assert
        , foo = 'bar'
        , beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };

      assert.typeOf(foo, 'string', 'foo is a string');
      assert.equal(foo, 'bar', 'foo equal `bar`');
      assert.length(foo, 3, 'foo`s value has a length of 3');
      assert.length(beverages.tea, 3, 'beverages has 3 types of tea');
