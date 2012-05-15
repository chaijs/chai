---
  title: Should Extras
  weight: 12
  render-file: false
---

## Should Extras

Given that `should` works by extending `Object.prototype`, there are
some scenarios where `should` will not work. Mainly, if you are trying
to check the existence of of an object. Take the following psuedocode:

    db.get(1234, function (err, doc) {
      // we expect error to not exist
      // we expect doc to exist and be an object
    });

Given that `err` should be null or undefined, `err.should.not.exist` is
not a valid statement as `undefined` and `null` haven't been extended
with a `should` chain starter. As such, the appropriate few assertions
for this scenario are as follows:

    var should = require('chai').should();
    db.get(1234, function (err, doc) {
      should.not.exist(err);
      should.exist(doc);
      doc.should.be.an('object');
    });

Provided you assigned `should` to a var, you have access to several 
quick helpers to keep you out of trouble when using `should`.

- `should.exist`
- `should.not.exist`
- `should.equal`
- `should.not.equal`
- `should.Throw`
- `should.not.Throw`
