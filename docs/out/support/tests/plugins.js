if (!chai) {
  var chai = require('..');
}

suite('plugins', function () {

  function plugin (chai) {
    Object.defineProperty(chai.Assertion.prototype, 'testing', {
      get: function () {
        return 'successful';
      }
    });
  }

  test('basic usage', function () {
    chai.use(plugin);
    var expect = chai.expect;
    expect(expect('').testing).to.equal('successful');
  });

  test('double plugin', function () {
    chai.expect(function () {
      chai.use(plugin);
    }).to.not.throw();
  });
});
