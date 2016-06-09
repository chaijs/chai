describe('plugins', function () {

  function plugin (chai) {
    if (chai.Assertion.prototype.testing) return;

    Object.defineProperty(chai.Assertion.prototype, 'testing', {
      get: function () {
        return 'successful';
      }
    });
  }

  it('basic usage', function () {
    chai.use(plugin);
    var expect = chai.expect;
    expect(expect('').testing).to.equal('successful');
  });

  it('double plugin', function () {
    chai.expect(function () {
      chai.use(plugin);
    }).to.not.throw();
  });

  it('.use detached from chai object', function () {
    function anotherPlugin (chai) {
      Object.defineProperty(chai.Assertion.prototype, 'moreTesting', {
        get: function () {
          return 'more success';
        }
      });
    }

    var use = chai.use;
    use(anotherPlugin);

    var expect = chai.expect;
    expect(expect('').moreTesting).to.equal('more success');
  });
});
