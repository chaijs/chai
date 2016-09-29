describe('globalErr', function () {
  var noop = function () {}
    , Err = chai.AssertionError
    , expect = chai.expect;

  it('should pass if string val equals error message', function () {
    err(function () { 
      expect('cat').to.equal('dog')
    }, 'expected \'cat\' to equal \'dog\'');
  });

  it('should pass if regex val matches error message', function () {
    err(function () {
      expect('cat').to.equal('dog')
    }, /expected 'cat' to equal 'dog'/);
  });

  it('should pass if object val\'s props are included in error object', function () {
    err(function () {
      expect('cat').to.equal('dog');
    }, {
        message: 'expected \'cat\' to equal \'dog\''
      , expected: 'dog'
      , actual: 'cat'
    });

    err(function () {
      expect({cat: 'meow'}).to.equal({dog: 'woof'});
    }, {
        message: 'expected { cat: \'meow\' } to equal { dog: \'woof\' }'
      , expected: {dog: 'woof'}
      , actual: {cat: 'meow'}
    });
  });

  it('should throw if string val does not equal error message', function () {
    err(function () {
      err(function () { throw new Err('cat') }, 'dog');
    }, {
        message: 'expected \'cat\' to equal \'dog\''
      , expected: 'dog'
      , actual: 'cat'
    });
  });

  it('should throw if regex val does not match error message', function () {
    err(function () {
      err(function () { throw new Err('cat') }, /dog/);
    }, 'expected \'cat\' to match /dog/');
  });

  it('should throw if object val\'s props are not included in error object', function () {
    err(function () {
      err(function () { throw new Err('cat') }, {text: 'cat'});
    }, /expected { Object \(message, showDiff(, \.\.\.)*\) } to have property \'text\'/);

    err(function () {
      err(function () { throw new Err('cat') }, {message: 'dog'});
    }, 'expected \'cat\' to deeply equal \'dog\'');
  });

  it('should throw if fn does not throw', function () {
    err(function () { err(noop) }, 'Expected an error');
  });

  it('should throw if fn is invalid', function () {
    var vals = [
        'cat'
      , 42
      , []
      , new RegExp()
      , new Date()
      , null
      , undefined
    ];

    if (typeof Symbol === 'function') vals.push(Symbol());
    if (typeof Map === 'function') vals.push(new Map());
    if (typeof WeakMap === 'function') vals.push(new WeakMap());
    if (typeof Set === 'function') vals.push(new Set());
    if (typeof WeakSet === 'function') vals.push(new WeakSet());
    if (typeof Promise === 'function') vals.push(new Promise(noop));

    vals.forEach(function (val) {
      err(function () { err(val) }, 'Invalid fn')
    });
  });

  it('should throw if val is invalid', function () {
    var vals = [
        42
      , []
      , new Date()
      , noop
      , null
    ];

    if (typeof Symbol === 'function') vals.push(Symbol());
    if (typeof Map === 'function') vals.push(new Map());
    if (typeof WeakMap === 'function') vals.push(new WeakMap());
    if (typeof Set === 'function') vals.push(new Set());
    if (typeof WeakSet === 'function') vals.push(new WeakSet());
    if (typeof Promise === 'function') vals.push(new Promise(noop));

    vals.forEach(function (val) {
      err(function () {
        err(function () { throw new Err('Test error') }, val)
      }, 'Invalid val')
    });
  });
});
