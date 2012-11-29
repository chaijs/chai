suite('global should', function () {
  var theGlobal = typeof window !== 'undefined' ? window : global;

  test('works', function () {
    theGlobal.should = chai.should();

    try {
        should.not.exist(undefined);
    } finally {
        delete theGlobal.should;
    }
  });
});
