if (!chai) {
  var chai = require('..');
}

suite('global should', function () {

  test('works', function () {
    global.should = chai.should();

    try {
        should.not.exist(undefined);
    } finally {
        delete global.should;
    }
  });

});
