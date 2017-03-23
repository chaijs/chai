describe('should', function() {
  var should = chai.Should();

  it('assertion', function(){
    'test'.should.be.a('string');
    should.equal('foo', 'foo');
    should.not.equal('foo', 'bar');
  });

  describe('safeguards', function () {
    before(function () {
      chai.util.addProperty(chai.Assertion.prototype, 'tmpProperty', function () {
        new chai.Assertion(42).equal(42);
      });
      chai.util.overwriteProperty(chai.Assertion.prototype, 'tmpProperty', function (_super) {
        return function () {
          _super.call(this);
        };
      });

      chai.util.addMethod(chai.Assertion.prototype, 'tmpMethod', function () {
        new chai.Assertion(42).equal(42);
      });
      chai.util.overwriteMethod(chai.Assertion.prototype, 'tmpMethod', function (_super) {
        return function () {
          _super.call(this);
        };
      });

      chai.util.addChainableMethod(chai.Assertion.prototype, 'tmpChainableMethod', function () {
        new chai.Assertion(42).equal(42);
      }, function () {
        new chai.Assertion(42).equal(42);
      });
      chai.util.overwriteChainableMethod(chai.Assertion.prototype, 'tmpChainableMethod', function (_super) {
        return function () {
          _super.call(this);
        };
      }, function (_super) {
        return function () {
          _super.call(this);
        };
      });
    });

    after(function () {
      delete chai.Assertion.prototype.tmpProperty;
      delete chai.Assertion.prototype.tmpMethod;
      delete chai.Assertion.prototype.tmpChainableMethod;
    });

    describe('proxify', function () {
      if (typeof Proxy === 'undefined' || typeof Reflect === 'undefined') return;
  
      it('throws when invalid property follows should', function () {
        err(function () {
          (42).should.pizza;
        }, 'Invalid Chai property: pizza');
      });
  
      it('throws when invalid property follows language chain', function () {
        err(function () {
          (42).should.to.pizza;
        }, 'Invalid Chai property: pizza');
      });
  
      it('throws when invalid property follows property assertion', function () {
        err(function () {
          (42).should.ok.pizza;
        }, 'Invalid Chai property: pizza');
      });
  
      it('throws when invalid property follows overwritten property assertion', function () {
        err(function () {
          (42).should.tmpProperty.pizza;
        }, 'Invalid Chai property: pizza');
      });
  
      it('throws when invalid property follows uncalled method assertion', function () {
        err(function () {
          (42).should.equal.pizza;
        }, 'Invalid Chai property: equal.pizza. See docs for proper usage of "equal".');
      });
  
      it('throws when invalid property follows called method assertion', function () {
        err(function () {
          (42).should.equal(42).pizza;
        }, 'Invalid Chai property: pizza');
      });
  
      it('throws when invalid property follows uncalled overwritten method assertion', function () {
        err(function () {
          (42).should.tmpMethod.pizza;
        }, 'Invalid Chai property: tmpMethod.pizza. See docs for proper usage of "tmpMethod".');
      });
  
      it('throws when invalid property follows called overwritten method assertion', function () {
        err(function () {
          (42).should.tmpMethod().pizza;
        }, 'Invalid Chai property: pizza');
      });
  
      it('throws when invalid property follows uncalled chainable method assertion', function () {
        err(function () {
          (42).should.a.pizza;
        }, 'Invalid Chai property: pizza');
      });
  
      it('throws when invalid property follows called chainable method assertion', function () {
        err(function () {
          (42).should.a('number').pizza;
        }, 'Invalid Chai property: pizza');
      });
  
      it('throws when invalid property follows uncalled overwritten chainable method assertion', function () {
        err(function () {
          (42).should.tmpChainableMethod.pizza;
        }, 'Invalid Chai property: pizza');
      });
  
      it('throws when invalid property follows called overwritten chainable method assertion', function () {
        err(function () {
          (42).should.tmpChainableMethod().pizza;
        }, 'Invalid Chai property: pizza');
      });
  
      it('doesn\'t throw if invalid property is excluded via config', function () {
        (function () {
          (42).should.then;
        }).should.not.throw();
      });
    });

    describe('length guard', function () {
      var fnLengthDesc = Object.getOwnPropertyDescriptor(function () {}, 'length');
      if (!fnLengthDesc.configurable) return;

      it('doesn\'t throw when `.length` follows `.should`', function () {
        (function () {
          ('foo').should.length;
        }).should.not.throw();
      });

      it('doesn\'t throw when `.length` follows language chain', function () {
        (function () {
          ('foo').should.to.length;
        }).should.not.throw();
      });

      it('doesn\'t throw when `.length` follows property assertion', function () {
        (function () {
          ('foo').should.ok.length;
        }).should.not.throw();
      });

      it('doesn\'t throw when `.length` follows overwritten property assertion', function () {
        (function () {
          ('foo').should.tmpProperty.length;
        }).should.not.throw();
      });

      it('throws when `.length` follows uncalled method assertion', function () {
        err(function () {
          ('foo').should.equal.length;
        }, 'Invalid Chai property: equal.length. See docs for proper usage of "equal".');
      });

      it('doesn\'t throw when `.length` follows called method assertion', function () {
        (function () {
          ('foo').should.equal('foo').length;
        }).should.not.throw();
      });

      it('throws when `.length` follows uncalled overwritten method assertion', function () {
        err(function () {
          ('foo').should.tmpMethod.length;
        }, 'Invalid Chai property: tmpMethod.length. See docs for proper usage of "tmpMethod".');
      });

      it('doesn\'t throw when `.length` follows called overwritten method assertion', function () {
        (function () {
          ('foo').should.tmpMethod().length;
        }).should.not.throw();
      });

      it('throws when `.length` follows uncalled chainable method assertion', function () {
        err(function () {
          ('foo').should.a.length;
        }, 'Invalid Chai property: a.length. Due to a compatibility issue, "length" cannot directly follow "a". Use "a.lengthOf" instead.');
      });

      it('doesn\'t throw when `.length` follows called chainable method assertion', function () {
        (function () {
          ('foo').should.a('string').length;
        }).should.not.throw();
      });

      it('throws when `.length` follows uncalled overwritten chainable method assertion', function () {
        err(function () {
          ('foo').should.tmpChainableMethod.length;
        }, 'Invalid Chai property: tmpChainableMethod.length. Due to a compatibility issue, "length" cannot directly follow "tmpChainableMethod". Use "tmpChainableMethod.lengthOf" instead.');
      });

      it('doesn\'t throw when `.length` follows called overwritten chainable method assertion', function () {
        (function () {
          ('foo').should.tmpChainableMethod().length;
        }).should.not.throw();
      });
    });
  });

  it('no-op chains', function() {
    function test(chain) {
      // tests that chain exists
      ((1).should[chain]).should.not.undefined;

      // tests methods
      (1).should[chain].equal(1);

      // tests properties that assert
      (false).should[chain].false;

      // tests not
      (false).should[chain].not.true;

      // tests chainable methods
      [1, 2, 3].should[chain].contains(1);
    }

    [ 'to', 'be', 'been'
    , 'is', 'and', 'has', 'have'
    , 'with', 'that', 'which', 'at'
    , 'of', 'same', 'but', 'does' ].forEach(test);
  });

  it('fail', function () {
    err(function() {
      should.fail(0, 1, 'this has failed');
    }, 'this has failed');
  });

  it('root exist', function () {
    var foo = 'foo'
      , bar = undefined;
    should.exist(foo);
    should.not.exist(bar);
    should.exist(0);
    should.exist(false);
    should.exist('');

    err(function () {
      should.exist(bar, 'blah');
    }, "blah: expected undefined to exist");

    err(function () {
      should.not.exist(foo, 'blah');
    }, "blah: expected 'foo' to not exist");
  });

  it('root equal', function () {
    var value1 = 'value'
      , value2 = 'value'
      , foo = 'foo';
    should.equal(value1, value2);
    should.not.equal(value1, foo);

    err(function () {
      should.equal(value1, foo, 'blah');
    }, "blah: expected 'value' to equal 'foo'");

    err(function () {
      should.not.equal(value1, value2, 'blah');
    }, "blah: expected 'value' to not equal 'value'")
  });

  it('root Throw', function () {
    should.Throw(function() { throw new Error('error!') }, Error, 'error!');
    should.not.Throw(function () { });

    err(function () {
      should.Throw(function () { throw new Error('error!') }, Error, 'needed user!', 'blah');
    }, "blah: expected [Function] to throw error including 'needed user!' but got 'error!'");

    err(function () {
      should.not.Throw(function () { throw new Error('error!') }, Error, 'error!', 'blah');
    }, "blah: expected [Function] to not throw 'Error' but 'Error: error!' was thrown");
  });

  it('true', function(){
    (true).should.be.true;
    false.should.not.be.true;
    (1).should.not.be.true;false
    false.should.have.been.false;

    err(function(){
      'test'.should.be.true;
    }, "expected 'test' to be true")
  });

  it('ok', function(){
    true.should.be.ok;
    false.should.not.be.ok;
    (1).should.be.ok;
    (0).should.not.be.ok;

    err(function(){
      ''.should.be.ok;
    }, "expected '' to be truthy");

    err(function(){
      'test'.should.not.be.ok;
    }, "expected 'test' to be falsy");
  });

  it('false', function(){
    false.should.be.false;
    true.should.not.be.false;
    (0).should.not.be.false;

    err(function(){
      ''.should.be.false;
    }, "expected '' to be false")
  });

  it('null', function(){
    (0).should.not.be.null;

    err(function(){
      ''.should.be.null;
    }, "expected '' to be null")
  });

  it('NaN', function(){
    NaN.should.be.NaN;

    Infinity.should.not.be.NaN;
    'foo'.should.not.be.NaN;
    ({}).should.not.be.NaN;
    should.not.equal(undefined, NaN);
    (4).should.not.be.NaN;

    err(function(){
      NaN.should.not.be.NaN;
    }, "expected NaN not to be NaN");

    err(function(){
      Infinity.should.be.NaN;
    }, "expected Infinity to be NaN");

    err(function(){
      'foo'.should.be.NaN;
    }, "expected 'foo' to be NaN");

    err(function(){
      ({}).should.be.NaN;
    }, "expected {} to be NaN");

    err(function(){
      should.equal(undefined, NaN);
    }, "expected undefined to equal NaN");

    err(function(){
      (4).should.be.NaN;
    }, "expected 4 to be NaN");

  });

  it('undefined', function(){
    (0).should.not.be.undefined;

    err(function(){
      ''.should.be.undefined;
    }, "expected '' to be undefined")
  });

  it('arguments', function(){
    var args = (function(){ return arguments; })(1,2,3);
    args.should.be.arguments;
    [].should.not.be.arguments;
  });

  it('.equal()', function(){
    var foo;
    should.equal(undefined, foo);
  });

  it('typeof', function(){
    'test'.should.be.a('string');

    err(function(){
      'test'.should.not.be.a('string');
    }, "expected 'test' not to be a string");

    (5).should.be.a('number');
    (new Number(1)).should.be.a('number');
    Number(1).should.be.a('number');
    (true).should.be.a('boolean');
    (new Array()).should.be.a('array');
    (new Object()).should.be.a('object');
    ({}).should.be.a('object');
    ([]).should.be.a('array');
    (function() {}).should.be.a('function');

    if (typeof Symbol === 'function') {
      Symbol().should.be.a('symbol');
    }

    (5).should.be.a('number');

    err(function(){
      (5).should.not.be.a('number');
    }, "expected 5 not to be a number");
  });

  it('instanceof', function(){
    function Foo(){}
    new Foo().should.be.an.instanceof(Foo);

    err(function(){
      (3).should.an.instanceof(Foo, 'blah');
    }, "blah: expected 3 to be an instance of Foo");
  });

  it('within(start, finish)', function(){
    (5).should.be.within(5, 10);
    (5).should.be.within(3,6);
    (5).should.be.within(3,5);
    (5).should.not.be.within(1,3);

    err(function(){
      (5).should.not.be.within(4,6, 'blah');
    }, "blah: expected 5 to not be within 4..6");

    err(function(){
      (10).should.be.within(50,100, 'blah');
    }, "blah: expected 10 to be within 50..100");

    err(function(){
      ({ foo: 1 }).should.have.length.within(50,100, 'blah');
    }, "blah: expected { foo: 1 } to have property 'length'");

    err(function(){
      ({ foo: 1 }).should.have.lengthOf.within(50,100, 'blah');
    }, "blah: expected { foo: 1 } to have property 'length'");

    err(function () {
      ('string').should.be.within(0, 1, 'blah');
    }, "blah: expected 'string' to be a number");

    err(function () {
      (1).should.be.within(null, 1, 'blah');
    }, "the arguments to within must be numbers");

    err(function () {
      (1).should.be.within(0, null, 'blah');
    }, "the arguments to within must be numbers");

    err(function () {
      ('string').should.not.be.within(0, 1, 'blah');
    }, "blah: expected 'string' to be a number");

    err(function () {
      (1).should.not.be.within(null, 1, 'blah');
    }, "the arguments to within must be numbers");

    err(function () {
      (1).should.not.be.within(0, null, 'blah');
    }, "the arguments to within must be numbers");

    err(function () {
      (1).should.have.length.within(5,7, 'blah');
    }, "blah: expected 1 to have property 'length'");

    err(function () {
      (1).should.have.lengthOf.within(5,7, 'blah');
    }, "blah: expected 1 to have property 'length'");
  });

  it('above(n)', function(){
    (5).should.be.above(2);
    (5).should.be.greaterThan(2);
    (5).should.not.be.above(5);
    (5).should.not.be.above(6);

    err(function(){
      (5).should.be.above(6, 'blah');
    }, "blah: expected 5 to be above 6");

    err(function(){
      (10).should.not.be.above(6, 'blah');
    }, "blah: expected 10 to be at most 6");

    err(function(){
      ({foo: 1}).should.have.length.above(3, 'blah');
    }, "blah: expected { foo: 1 } to have property 'length'");

    err(function(){
      ({foo: 1}).should.have.lengthOf.above(3, 'blah');
    }, "blah: expected { foo: 1 } to have property 'length'");

    err(function () {
      ('string').should.be.above(0, 'blah');
    }, "blah: expected 'string' to be a number");

    err(function () {
      (1).should.be.above(null, 'blah');
    }, "the argument to above must be a number");

    err(function () {
      ('string').should.not.be.above(0, 'blah');
    }, "blah: expected 'string' to be a number");

    err(function () {
      (1).should.not.be.above(null, 'blah');
    }, "the argument to above must be a number");

    err(function () {
      (1).should.have.length.above(0, 'blah');
    }, "blah: expected 1 to have property 'length'");

    err(function () {
      (1).should.have.lengthOf.above(0, 'blah');
    }, "blah: expected 1 to have property 'length'");
  });

  it('least(n)', function(){
    (5).should.be.at.least(5);
    (5).should.not.be.at.least(6);

    err(function(){
      (5).should.be.at.least(6, 'blah');
    }, "blah: expected 5 to be at least 6");

    err(function(){
      (10).should.not.be.at.least(6, 'blah');
    }, "blah: expected 10 to be below 6");

    err(function(){
      ({foo: 1}).should.have.length.of.at.least(3, 'blah');
    }, "blah: expected { foo: 1 } to have property 'length'");

    err(function(){
      ({foo: 1}).should.have.lengthOf.at.least(3, 'blah');
    }, "blah: expected { foo: 1 } to have property 'length'");

    err(function () {
      ('string').should.be.at.least(0, 'blah');
    }, "blah: expected 'string' to be a number");

    err(function () {
      (1).should.be.at.least(null, 'blah');
    }, "the argument to least must be a number");

    err(function () {
      ('string').should.not.be.at.least(0, 'blah');
    }, "blah: expected 'string' to be a number");

    err(function () {
      (1).should.not.be.at.least(null, 'blah');
    }, "the argument to least must be a number");
  });

  it('below(n)', function(){
    (2).should.be.below(5);
    (2).should.be.lessThan(5);
    (2).should.not.be.below(2);
    (2).should.not.be.below(1);

    err(function(){
      (6).should.be.below(5, 'blah');
    }, "blah: expected 6 to be below 5");

    err(function(){
      (6).should.not.be.below(10, 'blah');
    }, "blah: expected 6 to be at least 10");

    err(function(){
      ({foo: 1}).should.have.length.below(3, 'blah');
    }, "blah: expected { foo: 1 } to have property 'length'");

    err(function(){
      ({foo: 1}).should.have.lengthOf.below(3, 'blah');
    }, "blah: expected { foo: 1 } to have property 'length'");

    err(function () {
      ('string').should.be.below(0, 'blah');
    }, "blah: expected 'string' to be a number");

    err(function () {
      (1).should.be.below(null, 'blah');
    }, "the argument to below must be a number");

    err(function () {
      ('string').should.not.be.below(0, 'blah');
    }, "blah: expected 'string' to be a number");

    err(function () {
      (1).should.not.be.below(null, 'blah');
    }, "the argument to below must be a number");

    err(function () {
      (1).should.have.length.below(0, 'blah');
    }, "blah: expected 1 to have property 'length'");

    err(function () {
      (1).should.have.lengthOf.below(0, 'blah');
    }, "blah: expected 1 to have property 'length'");
  });

  it('most(n)', function(){
    (2).should.be.at.most(2);
    (2).should.not.be.at.most(1);

    err(function(){
      (6).should.be.at.most(5, 'blah');
    }, "blah: expected 6 to be at most 5");

    err(function(){
      (6).should.not.be.at.most(10, 'blah');
    }, "blah: expected 6 to be above 10");

    err(function(){
      ({foo: 1}).should.have.length.of.at.most(3, 'blah');
    }, "blah: expected { foo: 1 } to have property 'length'");

    err(function(){
      ({foo: 1}).should.have.lengthOf.at.most(3, 'blah');
    }, "blah: expected { foo: 1 } to have property 'length'");

    err(function () {
      ('string').should.be.at.most(0, 'blah');
    }, "blah: expected 'string' to be a number");

    err(function () {
      (1).should.be.at.most(null, 'blah');
    }, "the argument to most must be a number");

    err(function () {
      ('string').should.not.be.at.most(0, 'blah');
    }, "blah: expected 'string' to be a number");

    err(function () {
      (1).should.not.be.at.most(null, 'blah');
    }, "the argument to most must be a number");

    err(function () {
      (1).should.have.length.of.at.most(0, 'blah');
    }, "blah: expected 1 to have property 'length'");

    err(function () {
      (1).should.have.lengthOf.at.most(0, 'blah');
    }, "blah: expected 1 to have property 'length'");
  });

  it('match(regexp)', function(){
    'foobar'.should.match(/^foo/)
    'foobar'.should.not.match(/^bar/)

    err(function(){
      'foobar'.should.match(/^bar/i, 'blah')
    }, "blah: expected 'foobar' to match /^bar/i");

    err(function(){
      'foobar'.should.not.match(/^foo/i, 'blah')
    }, "blah: expected 'foobar' not to match /^foo/i");
  });

  it('lengthOf(n)', function(){
    'test'.should.have.length(4);
    'test'.should.have.lengthOf(4);
    'test'.should.not.have.length(3);
    'test'.should.not.have.lengthOf(3);
    [1,2,3].should.have.length(3);
    [1,2,3].should.have.lengthOf(3);

    err(function(){
      (4).should.have.length(3, 'blah');
    }, 'blah: expected 4 to have property \'length\'');

    err(function(){
      (4).should.have.lengthOf(3, 'blah');
    }, 'blah: expected 4 to have property \'length\'');

    err(function(){
      'asd'.should.not.have.length(3, 'blah');
    }, "blah: expected 'asd' to not have a length of 3");

    err(function(){
      'asd'.should.not.have.lengthOf(3, 'blah');
    }, "blah: expected 'asd' to not have a length of 3");
  });

  it('eql(val)', function(){
    var a = new Date(1, 2, 3)
      , b = new Date(4, 5, 6);

    a.should.eql(a);
    a.should.not.eql(b);
    a.should.not.eql({});
    'test'.should.eql('test');
    ({ foo: 'bar' }).should.eql({ foo: 'bar' });
    /a/.should.eql(/a/);
    /a/.should.not.eql(/b/);
    /a/.should.not.eql({});
    /a/g.should.eql(/a/g);
    /a/g.should.not.eql(/b/g);
    /a/i.should.eql(/a/i);
    /a/i.should.not.eql(/b/i);
    /a/m.should.eql(/a/m);
    /a/m.should.not.eql(/b/m);
    (1).should.eql(1);
    '4'.should.not.eql(4);

    if (typeof Symbol === 'function') {
      var sym = Symbol();
      sym.should.eql(sym);
    }

    err(function(){
      (4).should.eql(3, 'blah');
    }, 'blah: expected 4 to deeply equal 3');
  });

  it('equal(val)', function(){
    'test'.should.equal('test');
    (1).should.equal(1);

    if (typeof Symbol === 'function') {
      var sym = Symbol();
      sym.should.equal(sym);
    }

    err(function(){
      (4).should.equal(3, 'blah');
    }, 'blah: expected 4 to equal 3');

    err(function(){
      '4'.should.equal(4, 'blah');
    }, "blah: expected '4' to equal 4");
  });

  it('empty', function(){
    function FakeArgs() {};
    FakeArgs.prototype.length = 0;

    ''.should.be.empty;
    'foo'.should.not.be.empty;
    ([]).should.be.empty;
    (['foo']).should.not.be.empty;
    (new FakeArgs).should.be.empty;
    ({arguments: 0}).should.not.be.empty;
    ({}).should.be.empty;
    ({foo: 'bar'}).should.not.be.empty;

    if (typeof WeakMap === 'function') {
      err(function(){
        (new WeakMap).should.not.be.empty;
      }, ".empty was passed a weak collection");
    }

    if (typeof WeakSet === 'function') {
      err(function(){
        (new WeakSet).should.not.be.empty;
      }, ".empty was passed a weak collection");
    }

    if (typeof Map === 'function') {
      (new Map).should.be.empty;

      // Not using Map constructor args because not supported in IE 11.
      var map = new Map;
      map.set('a', 1);
      map.should.not.be.empty;

      err(function(){
        (new Map).should.not.be.empty;
      }, "expected {} not to be empty");

      map = new Map;
      map.key = 'val';
      map.should.be.empty;

      err(function(){
        map.should.not.be.empty;
      }, "expected { key: 'val' } not to be empty");
    }

    if (typeof Set === 'function') {
      (new Set).should.be.empty;

      // Not using Set constructor args because not supported in IE 11.
      var set = new Set;
      set.add(1);
      set.should.not.be.empty;

      err(function(){
        (new Set).should.not.be.empty;
      }, "expected {} not to be empty");

      set = new Set;
      set.key = 'val';
      set.should.be.empty;

      err(function(){
        set.should.not.be.empty;
      }, "expected { key: 'val' } not to be empty");
    }

    err(function(){
      ''.should.not.be.empty;
    }, "expected \'\' not to be empty");

    err(function(){
      'foo'.should.be.empty;
    }, "expected \'foo\' to be empty");

    err(function(){
      ([]).should.not.be.empty;
    }, "expected [] not to be empty");

    err(function(){
      (['foo']).should.be.empty;
    }, "expected [ \'foo\' ] to be empty");

    err(function(){
      (new FakeArgs).should.not.be.empty;
    }, "expected { length: 0 } not to be empty");

    err(function(){
      ({arguments: 0}).should.be.empty;
    }, "expected { arguments: 0 } to be empty");

    err(function(){
      ({}).should.not.be.empty;
    }, "expected {} not to be empty");

    err(function(){
      ({foo: 'bar'}).should.be.empty;
    }, "expected { foo: \'bar\' } to be empty");

    err(function(){
      (0).should.be.empty;
    }, ".empty was passed non-string primitive 0");

    err(function(){
      (1).should.be.empty;
    }, ".empty was passed non-string primitive 1");

    err(function(){
      true.should.be.empty;
    }, ".empty was passed non-string primitive true");

    err(function(){
      false.should.be.empty;
    }, ".empty was passed non-string primitive false");

    if (typeof Symbol !== 'undefined') {
      err(function(){
        Symbol().should.be.empty;
      }, ".empty was passed non-string primitive Symbol()");

      err(function(){
        Symbol.iterator.should.be.empty;
      }, ".empty was passed non-string primitive Symbol(Symbol.iterator)");
    }

    err(function(){
      (function() {}).should.be.empty;
    }, ".empty was passed a function");

    if (FakeArgs.name === 'FakeArgs') {
      err(function(){
        FakeArgs.should.be.empty;
      }, ".empty was passed a function FakeArgs");
    }
  });

  it('finite(value)', function() {
    (4).should.be.finite;
    (-10).should.be.finite;

    err(function(){
      (NaN).should.be.finite;
    }, "expected NaN to be a finite number");

    err(function(){
      (Infinity).should.be.finite;
    }, "expected Infinity to be a finite number");

    err(function(){
      ('foo').should.be.finite;
    }, "expected \'foo\' to be a finite number");

    err(function(){
      ([]).should.be.finite;
    }, "expected [] to be a finite number");

    err(function(){
      ({}).should.be.finite;
    }, "expected {} to be a finite number");
  });

  it('property(name)', function(){
    'test'.should.have.property('length');
    (4).should.not.have.property('length');
    ({ 1: 1 }).should.have.property(1);
    ({ a: 1 }).should.have.property('toString');

    err(function(){
      'asd'.should.have.property('foo');
    }, "expected 'asd' to have property 'foo'");

    err(function() {
      ({a: {b: 1}}).should.have.own.nested.property("a.b");
    }, "The \"nested\" and \"own\" flags cannot be combined.");
  });

  it('property(name, val)', function(){
    'test'.should.have.property('length', 4);
    'asd'.should.have.property('constructor', String);
    ({ 1: 1 }).should.have.property(1, 1);
    ({ a: 1 }).should.have.property('toString', Object.prototype.toString);
    'test'.should.not.have.property('length', 3);
    'test'.should.not.have.property('foo', 4);
    ({a: {b: 1}}).should.not.have.property('a', {b: 1});

    err(function(){
      'asd'.should.have.property('length', 4, 'blah');
    }, "blah: expected 'asd' to have property 'length' of 4, but got 3");

    err(function(){
      'asd'.should.not.have.property('length', 3, 'blah');
    }, "blah: expected 'asd' to not have property 'length' of 3");

    err(function(){
      'asd'.should.have.property('constructor', Number, 'blah');
    }, "blah: expected 'asd' to have property 'constructor' of [Function: Number], but got [Function: String]");

    err(function() {
      ({a: {b: 1}}).should.have.own.nested.property("a.b", 1);
    }, "The \"nested\" and \"own\" flags cannot be combined.");
  });

  it('deep.property(name, val)', function () {
    var obj = {a: {b: 1}};
    obj.should.have.deep.property('a', {b: 1});
    obj.should.not.have.deep.property('a', {b: 7});
    obj.should.not.have.deep.property('a', {z: 1});
    obj.should.not.have.deep.property('z', {b: 1});

    err(function () {
      obj.should.have.deep.property('a', {b: 7}, 'blah');
    }, "blah: expected { a: { b: 1 } } to have deep property 'a' of { b: 7 }, but got { b: 1 }");

    err(function () {
      obj.should.have.deep.property('z', {b: 1}, 'blah');
    }, "blah: expected { a: { b: 1 } } to have deep property 'z'");

    err(function () {
      obj.should.not.have.deep.property('a', {b: 1}, 'blah');
    }, "blah: expected { a: { b: 1 } } to not have deep property 'a' of { b: 1 }");
  });

  it('ownProperty(name)', function(){
    'test'.should.have.own.property('length');
    'test'.should.have.ownProperty('length');
    'test'.should.haveOwnProperty('length');
    'test'.should.not.have.own.property('iDontExist');
    'test'.should.not.have.ownProperty('iDontExist');
    'test'.should.not.haveOwnProperty('iDontExist');
    ({ a: 1 }).should.not.have.own.property('toString');
    ({ a: 1 }).should.not.have.ownProperty('toString');
    ({ a: 1 }).should.not.haveOwnProperty('toString');

    ({ length: 12 }).should.have.own.property('length');
    ({ length: 12 }).should.have.ownProperty('length');
    ({ length: 12 }).should.haveOwnProperty('length');
    ({ length: 12 }).should.not.have.own.property('iDontExist');
    ({ length: 12 }).should.not.have.ownProperty('iDontExist');
    ({ length: 12 }).should.not.haveOwnProperty('iDontExist');
    ({ 1: 1 }).should.have.ownProperty(1);

    var objNoHasOwnProperty = {hasOwnProperty: null};
    objNoHasOwnProperty.a = 'a';
    objNoHasOwnProperty.should.have.own.property('a');
    objNoHasOwnProperty.should.have.ownProperty('a');
    objNoHasOwnProperty.should.haveOwnProperty('a');

    // Chaining property's value
    'test'.should.have.own.property('length').that.is.a('number');
    'test'.should.have.ownProperty('length').that.is.a('number');
    'test'.should.haveOwnProperty('length').that.is.a('number');

    err(function(){
      ({ length: 12 }).should.have.own.property('iDontExist');
    }, "expected { length: 12 } to have own property 'iDontExist'");

    err(function(){
      ({ length: 12 }).should.not.have.own.property('length');
    }, "expected { length: 12 } to not have own property 'length'");

    err(function(){
      ({ length: 12 }).should.have.ownProperty('iDontExist');
    }, "expected { length: 12 } to have own property 'iDontExist'");

    err(function(){
      ({ length: 12 }).should.not.have.ownProperty('length');
    }, "expected { length: 12 } to not have own property 'length'");

    err(function(){
      ({ length: 12 }).should.haveOwnProperty('iDontExist');
    }, "expected { length: 12 } to have own property 'iDontExist'");

    err(function(){
      ({ length: 12 }).should.not.haveOwnProperty('length');
    }, "expected { length: 12 } to not have own property 'length'");
  });

  it('ownProperty(name, value)', function(){
    'test'.should.have.own.property('length', 4);
    'test'.should.have.ownProperty('length', 4);
    'test'.should.haveOwnProperty('length', 4);
    'test'.should.not.have.own.property('length', 1337);
    'test'.should.not.have.ownProperty('length', 1337);
    'test'.should.not.haveOwnProperty('length', 1337);
    'test'.should.not.have.own.property('toString', Object.prototype.toString);
    'test'.should.not.have.ownProperty('toString', Object.prototype.toString);
    'test'.should.not.haveOwnProperty('toString', Object.prototype.toString);
    ({a: {b: 1}}).should.not.have.own.property('a', {b: 1});
    ({a: {b: 1}}).should.not.have.ownProperty('a', {b: 1});
    ({a: {b: 1}}).should.not.haveOwnProperty('a', {b: 1});

    ({ length: 12 }).should.have.own.property('length', 12);
    ({ length: 12 }).should.have.ownProperty('length', 12);
    ({ length: 12 }).should.haveOwnProperty('length', 12);
    ({ length: 12 }).should.not.have.own.property('length', 15);
    ({ length: 12 }).should.not.have.ownProperty('length', 15);
    ({ length: 12 }).should.not.haveOwnProperty('length', 15);

    // Chaining property's value
    'test'.should.have.own.property('length', 4).that.is.a('number');
    'test'.should.have.ownProperty('length', 4).that.is.a('number');
    'test'.should.haveOwnProperty('length', 4).that.is.a('number');

    err(function(){
      ({ length: 12 }).should.have.own.property('iDontExist', 12);
    }, "expected { length: 12 } to have own property 'iDontExist'");

    err(function() {
      ({ length: 12 }).should.not.have.own.property('length', 12);
    }, "expected { length: 12 } to not have own property 'length' of 12");

    err(function() {
      ({ length: 12 }).should.have.own.property('length', 15);
    }, "expected { length: 12 } to have own property 'length' of 15, but got 12");

    err(function(){
      ({ length: 12 }).should.have.ownProperty('iDontExist', 12);
    }, "expected { length: 12 } to have own property 'iDontExist'");

    err(function() {
      ({ length: 12 }).should.not.have.ownProperty('length', 12);
    }, "expected { length: 12 } to not have own property 'length' of 12");

    err(function() {
      ({ length: 12 }).should.have.ownProperty('length', 15);
    }, "expected { length: 12 } to have own property 'length' of 15, but got 12");

    err(function(){
      ({ length: 12 }).should.haveOwnProperty('iDontExist', 12);
    }, "expected { length: 12 } to have own property 'iDontExist'");

    err(function() {
      ({ length: 12 }).should.not.haveOwnProperty('length', 12);
    }, "expected { length: 12 } to not have own property 'length' of 12");

    err(function() {
      ({ length: 12 }).should.haveOwnProperty('length', 15);
    }, "expected { length: 12 } to have own property 'length' of 15, but got 12");
  });

  it('deep.own.property(name, val)', function () {
    var obj = {a: {b: 1}};
    obj.should.have.deep.own.property('a', {b: 1});
    obj.should.have.deep.ownProperty('a', {b: 1});
    obj.should.deep.haveOwnProperty('a', {b: 1});
    obj.should.not.have.deep.own.property('a', {z: 1});
    obj.should.not.have.deep.ownProperty('a', {z: 1});
    obj.should.not.deep.haveOwnProperty('a', {z: 1});
    obj.should.not.have.deep.own.property('a', {b: 7});
    obj.should.not.have.deep.ownProperty('a', {b: 7});
    obj.should.not.deep.haveOwnProperty('a', {b: 7});
    obj.should.not.have.deep.own.property('toString', Object.prototype.toString);
    obj.should.not.have.deep.ownProperty('toString', Object.prototype.toString);
    obj.should.not.deep.haveOwnProperty('toString', Object.prototype.toString);

    err(function () {
      obj.should.have.deep.own.property('a', {z: 7}, 'blah');
    }, "blah: expected { a: { b: 1 } } to have deep own property 'a' of { z: 7 }, but got { b: 1 }");

    err(function () {
      obj.should.have.deep.own.property('z', {b: 1}, 'blah');
    }, "blah: expected { a: { b: 1 } } to have deep own property 'z'");

    err(function () {
      obj.should.not.have.deep.own.property('a', {b: 1}, 'blah');
    }, "blah: expected { a: { b: 1 } } to not have deep own property 'a' of { b: 1 }");
    err(function () {
      obj.should.have.deep.ownProperty('a', {z: 7}, 'blah');
    }, "blah: expected { a: { b: 1 } } to have deep own property 'a' of { z: 7 }, but got { b: 1 }");

    err(function () {
      obj.should.have.deep.ownProperty('z', {b: 1}, 'blah');
    }, "blah: expected { a: { b: 1 } } to have deep own property 'z'");

    err(function () {
      obj.should.not.have.deep.ownProperty('a', {b: 1}, 'blah');
    }, "blah: expected { a: { b: 1 } } to not have deep own property 'a' of { b: 1 }");

    err(function () {
      obj.should.deep.haveOwnProperty('a', {z: 7}, 'blah');
    }, "blah: expected { a: { b: 1 } } to have deep own property 'a' of { z: 7 }, but got { b: 1 }");

    err(function () {
      obj.should.deep.haveOwnProperty('z', {b: 1}, 'blah');
    }, "blah: expected { a: { b: 1 } } to have deep own property 'z'");

    err(function () {
      obj.should.not.deep.haveOwnProperty('a', {b: 1}, 'blah');
    }, "blah: expected { a: { b: 1 } } to not have deep own property 'a' of { b: 1 }");
  });

  it('nested.property(name)', function(){
    ({ 'foo.bar': 'baz'}).should.not.have.nested.property('foo.bar');
    ({ foo: { bar: 'baz' } }).should.have.nested.property('foo.bar');

    ({ 'foo': [1, 2, 3] }).should.have.nested.property('foo[1]');

    ({ 'foo.bar[]': 'baz'}).should.have.nested.property('foo\\.bar\\[\\]');

    err(function(){
      ({ 'foo.bar': 'baz' }).should.have.nested.property('foo.bar');
    }, "expected { 'foo.bar': 'baz' } to have nested property 'foo.bar'");
  });

  it('nested.property(name, val)', function(){
    ({ foo: { bar: 'baz' } }).should.have.nested.property('foo.bar', 'baz');
    ({ foo: { bar: 'baz' } }).should.not.have.nested.property('foo.bar', 'quux');
    ({ foo: { bar: 'baz' } }).should.not.have.nested.property('foo.quux', 'baz');
    ({a: {b: {c: 1}}}).should.not.have.nested.property('a.b', {c: 1});

    err(function(){
      ({ foo: { bar: 'baz' } }).should.have.nested.property('foo.bar', 'quux', 'blah');
    }, "blah: expected { foo: { bar: 'baz' } } to have nested property 'foo.bar' of 'quux', but got 'baz'");
    err(function(){
      ({ foo: { bar: 'baz' } }).should.not.have.nested.property('foo.bar', 'baz', 'blah');
    }, "blah: expected { foo: { bar: 'baz' } } to not have nested property 'foo.bar' of 'baz'");
  });

  it('deep.nested.property(name, val)', function () {
    var obj = {a: {b: {c: 1}}};
    obj.should.have.deep.nested.property('a.b', {c: 1});
    obj.should.not.have.deep.nested.property('a.b', {c: 7});
    obj.should.not.have.deep.nested.property('a.b', {z: 1});
    obj.should.not.have.deep.nested.property('a.z', {c: 1});

    err(function () {
      obj.should.have.deep.nested.property('a.b', {c: 7}, 'blah');
    }, "blah: expected { a: { b: { c: 1 } } } to have deep nested property 'a.b' of { c: 7 }, but got { c: 1 }");

    err(function () {
      obj.should.have.deep.nested.property('a.z', {c: 1}, 'blah');
    }, "blah: expected { a: { b: { c: 1 } } } to have deep nested property 'a.z'");

    err(function () {
      obj.should.not.have.deep.nested.property('a.b', {c: 1}, 'blah');
    }, "blah: expected { a: { b: { c: 1 } } } to not have deep nested property 'a.b' of { c: 1 }");
  });

  it('ownPropertyDescriptor(name)', function(){
    'test'.should.haveOwnPropertyDescriptor('length');
    'test'.should.have.ownPropertyDescriptor('length');
    'test'.should.not.have.ownPropertyDescriptor('foo');

    ({ 1: 1 }).should.have.ownPropertyDescriptor(1);

    var obj = { },
        obj2 = { };
    var descriptor = {
      configurable: false,
      enumerable: true,
      writable: true,
      value: NaN
    };
    Object.defineProperty(obj, 'test', descriptor);
    obj.should.haveOwnPropertyDescriptor('test', descriptor);

    Object.defineProperty(obj2, 1, descriptor);
    obj2.should.haveOwnPropertyDescriptor(1, descriptor);

    err(function(){
      obj.should.not.haveOwnPropertyDescriptor('test', descriptor, 'blah');
    }, /^blah: expected the own property descriptor for 'test' on \{ test: NaN \} to not match \{ [^\}]+ \}$/);
    err(function(){
      var wrongDescriptor = {
        configurable: false,
        enumerable: true,
        writable: false,
        value: NaN
      };
      obj.should.haveOwnPropertyDescriptor('test', wrongDescriptor, 'blah');
    }, /^blah: expected the own property descriptor for 'test' on \{ test: NaN \} to match \{ [^\}]+ \}, got \{ [^\}]+ \}$/);

    err(function(){
      obj.should.haveOwnPropertyDescriptor('test2', 'blah');
    }, "blah: expected { test: NaN } to have an own property descriptor for 'test2'");

    obj.should.have.ownPropertyDescriptor('test').and.have.property('enumerable', true);
  });

  it('string()', function(){
    'foobar'.should.contain.string('bar');
    'foobar'.should.contain.string('foo');
    'foobar'.should.not.contain.string('baz');

    err(function(){
      (3).should.contain.string('baz', 'blah');
    }, "blah: expected 3 to be a string");

    err(function(){
      'foobar'.should.contain.string('baz', 'blah');
    }, "blah: expected 'foobar' to contain 'baz'");

    err(function(){
      'foobar'.should.not.contain.string('bar', 'blah');
    }, "blah: expected 'foobar' to not contain 'bar'");
  });

  it('oneOf()', function(){
    'foo'.should.be.oneOf(['foo', 'bar']);
    'bar'.should.be.oneOf(['foo', 'bar']);
    'baz'.should.not.be.oneOf(['foo', 'bar']);
    'baz'.should.not.be.oneOf([]);
  });

  it('include()', function(){
    ['foo', 'bar'].should.include('foo');
    ['foo', 'bar'].should.contain('foo');
    ['foo', 'bar'].should.include('bar');
    [1,2].should.include(1);
    ['foo', 'bar'].should.not.include('baz');
    ['foo', 'bar'].should.not.include(1);

    ({a: 1}).should.include({'toString': Object.prototype.toString});

    var obj1 = {a: 1}
      , obj2 = {b: 2};
    [obj1, obj2].should.include(obj1);
    [obj1, obj2].should.not.include({a: 1});
    ({foo: obj1, bar: obj2}).should.include({foo: obj1});
    ({foo: obj1, bar: obj2}).should.include({foo: obj1, bar: obj2});
    ({foo: obj1, bar: obj2}).should.not.include({foo: {a: 1}});
    ({foo: obj1, bar: obj2}).should.not.include({foo: obj1, bar: {b: 2}});

    if (typeof Symbol === 'function') {
      var sym1 = Symbol()
        , sym2 = Symbol()
        , sym3 = Symbol();
      [sym1, sym2].should.include(sym1);
      [sym1, sym2].should.not.include(sym3);
    }

    err(function(){
      ['foo'].should.include('bar', 'blah');
    }, "blah: expected [ 'foo' ] to include 'bar'");

    err(function(){
      ['bar', 'foo'].should.not.include('foo', 'blah');
    }, "blah: expected [ 'bar', 'foo' ] to not include 'foo'");

    err(function(){
      ({a:1}).should.include({b:2});
    }, "expected { a: 1 } to have property 'b'");

    err(function () {
      [{a: 1}, {b: 2}].should.include({a: 1});
    }, "expected [ { a: 1 }, { b: 2 } ] to include { a: 1 }");

    err(function () {
      var obj1 = {a: 1}
        , obj2 = {b: 2};
      [obj1, obj2].should.not.include(obj1);
    }, "expected [ { a: 1 }, { b: 2 } ] to not include { a: 1 }");

    err(function () {
      ({foo: {a: 1}, bar: {b: 2}}).should.include({foo: {a: 1}});
    }, "expected { foo: { a: 1 }, bar: { b: 2 } } to have property 'foo' of { a: 1 }, but got { a: 1 }");

    err(function () {
      var obj1 = {a: 1}
        , obj2 = {b: 2};
      ({foo: obj1, bar: obj2}).should.not.include({foo: obj1, bar: obj2});
    }, "expected { foo: { a: 1 }, bar: { b: 2 } } to not have property 'foo' of { a: 1 }");

    err(function(){
      (true).should.include(true);
    }, "object tested must be an array, an object, or a string, but boolean given");

    err(function(){
      (42).should.include(4);
    }, "object tested must be an array, an object, or a string, but number given");

    err(function(){
      (true).should.not.include(true);
    }, "object tested must be an array, an object, or a string, but boolean given");

    err(function(){
      (42).should.not.include(4);
    }, "object tested must be an array, an object, or a string, but number given");
  });

  it('deep.include()', function () {
    var obj1 = {a: 1}
      , obj2 = {b: 2};
    [obj1, obj2].should.deep.include({a: 1});
    [obj1, obj2].should.not.deep.include({a: 9});
    [obj1, obj2].should.not.deep.include({z: 1});
    ({foo: obj1, bar: obj2}).should.deep.include({foo: {a: 1}});
    ({foo: obj1, bar: obj2}).should.deep.include({foo: {a: 1}, bar: {b: 2}});
    ({foo: obj1, bar: obj2}).should.not.deep.include({foo: {a: 9}});
    ({foo: obj1, bar: obj2}).should.not.deep.include({foo: {z: 1}});
    ({foo: obj1, bar: obj2}).should.not.deep.include({baz: {a: 1}});
    ({foo: obj1, bar: obj2}).should.not.deep.include({foo: {a: 1}, bar: {b: 9}});

    err(function () {
      [obj1, obj2].should.deep.include({a: 9});
    }, "expected [ { a: 1 }, { b: 2 } ] to deep include { a: 9 }");

    err(function () {
      [obj1, obj2].should.not.deep.include({a: 1});
    }, "expected [ { a: 1 }, { b: 2 } ] to not deep include { a: 1 }");

    err(function () {
      ({foo: obj1, bar: obj2}).should.deep.include({foo: {a: 1}, bar: {b: 9}});
    }, "expected { foo: { a: 1 }, bar: { b: 2 } } to have deep property 'bar' of { b: 9 }, but got { b: 2 }");

    err(function () {
      ({foo: obj1, bar: obj2}).should.not.deep.include({foo: {a: 1}, bar: {b: 2}});
    }, "expected { foo: { a: 1 }, bar: { b: 2 } } to not have deep property 'foo' of { a: 1 }");
  });

  it('nested.include()', function () {
    ({a: {b: ['x', 'y']}}).should.nested.include({'a.b[1]': 'y'});
    ({a: {b: ['x', 'y']}}).should.not.nested.include({'a.b[1]': 'x'});
    ({a: {b: ['x', 'y']}}).should.not.nested.include({'a.c': 'y'});

    ({a: {b: [{x: 1}]}}).should.not.nested.include({'a.b[0]': {x: 1}});

    ({'.a': {'[b]': 'x'}}).should.nested.include({'\\.a.\\[b\\]': 'x'});
    ({'.a': {'[b]': 'x'}}).should.not.nested.include({'\\.a.\\[b\\]': 'y'});

    err(function () {
      ({a: {b: ['x', 'y']}}).should.nested.include({'a.b[1]': 'x'});
    }, "expected { a: { b: [ 'x', 'y' ] } } to have nested property 'a.b[1]' of 'x', but got 'y'");

    err(function () {
      ({a: {b: ['x', 'y']}}).should.nested.include({'a.c': 'y'});
    }, "expected { a: { b: [ 'x', 'y' ] } } to have nested property 'a.c'");

    err(function () {
      ({a: {b: ['x', 'y']}}).should.not.nested.include({'a.b[1]': 'y'});
    }, "expected { a: { b: [ 'x', 'y' ] } } to not have nested property 'a.b[1]' of 'y'");
  });

  it('deep.nested.include()', function () {
    ({a: {b: [{x: 1}]}}).should.deep.nested.include({'a.b[0]': {x: 1}});
    ({a: {b: [{x: 1}]}}).should.not.deep.nested.include({'a.b[0]': {y: 2}});
    ({a: {b: [{x: 1}]}}).should.not.deep.nested.include({'a.c': {x: 1}});

    ({'.a': {'[b]': {x: 1}}})
      .should.deep.nested.include({'\\.a.\\[b\\]': {x: 1}});
    ({'.a': {'[b]': {x: 1}}})
      .should.not.deep.nested.include({'\\.a.\\[b\\]': {y: 2}});

    err(function () {
      ({a: {b: [{x: 1}]}}).should.deep.nested.include({'a.b[0]': {y: 2}});
    }, "expected { a: { b: [ [Object] ] } } to have deep nested property 'a.b[0]' of { y: 2 }, but got { x: 1 }");

    err(function () {
      ({a: {b: [{x: 1}]}}).should.deep.nested.include({'a.c': {x: 1}});
    }, "expected { a: { b: [ [Object] ] } } to have deep nested property 'a.c'");

    err(function () {
      ({a: {b: [{x: 1}]}}).should.not.deep.nested.include({'a.b[0]': {x: 1}});
    }, "expected { a: { b: [ [Object] ] } } to not have deep nested property 'a.b[0]' of { x: 1 }");
  });

  it('own.include()', function () {
    ({a: 1}).should.own.include({a: 1});
    ({a: 1}).should.not.own.include({a: 3});
    ({a: 1}).should.not.own.include({'toString': Object.prototype.toString});

    ({a: {b: 2}}).should.not.own.include({a: {b: 2}});

    err(function () {
      ({a: 1}).should.own.include({a: 3});
    }, "expected { a: 1 } to have own property 'a' of 3, but got 1");

    err(function () {
      ({a: 1}).should.own.include({'toString': Object.prototype.toString});
    }, "expected { a: 1 } to have own property 'toString'");

    err(function () {
      ({a: 1}).should.not.own.include({a: 1});
    }, "expected { a: 1 } to not have own property 'a' of 1");
  });

  it('deep.own.include()', function () {
    ({a: {b: 2}}).should.deep.own.include({a: {b: 2}});
    ({a: {b: 2}}).should.not.deep.own.include({a: {c: 3}});
    ({a: {b: 2}})
      .should.not.deep.own.include({'toString': Object.prototype.toString});

    err(function () {
      ({a: {b: 2}}).should.deep.own.include({a: {c: 3}});
    }, "expected { a: { b: 2 } } to have deep own property 'a' of { c: 3 }, but got { b: 2 }");

    err(function () {
      ({a: {b: 2}}).should.deep.own.include({'toString': Object.prototype.toString});
    }, "expected { a: { b: 2 } } to have deep own property 'toString'");

    err(function () {
      ({a: {b: 2}}).should.not.deep.own.include({a: {b: 2}});
    }, "expected { a: { b: 2 } } to not have deep own property 'a' of { b: 2 }");
  });

  it('keys(array|Object|arguments)', function(){
    ({ foo: 1 }).should.have.keys(['foo']);
    ({ foo: 1 }).should.have.keys({ 'foo': 6 });

    ({ foo: 1, bar: 2 }).should.have.keys(['foo', 'bar']);
    ({ foo: 1, bar: 2 }).should.have.keys('foo', 'bar');
    ({ foo: 1, bar: 2 }).should.have.keys({ 'foo': 6, 'bar': 7 });

    ({ foo: 1, bar: 2, baz: 3 }).should.include.keys('foo', 'bar');
    ({ foo: 1, bar: 2, baz: 3 }).should.contain.keys('bar', 'foo');
    ({ foo: 1, bar: 2, baz: 3 }).should.contain.keys('baz');

    ({ foo: 1, bar: 2 }).should.contain.keys('foo');
    ({ foo: 1, bar: 2 }).should.contain.keys('bar', 'foo');
    ({ foo: 1, bar: 2 }).should.contain.keys(['foo']);
    ({ foo: 1, bar: 2 }).should.contain.keys(['bar']);
    ({ foo: 1, bar: 2 }).should.contain.keys(['bar', 'foo']);
    ({ foo: 1, bar: 2 }).should.contain.keys({ 'foo': 6 });
    ({ foo: 1, bar: 2 }).should.contain.keys({ 'bar': 7 });
    ({ foo: 1, bar: 2 }).should.contain.keys({ 'foo': 6 });

    ({ foo: 1, bar: 2 }).should.not.have.keys('baz');
    ({ foo: 1, bar: 2 }).should.not.have.keys('foo');
    ({ foo: 1, bar: 2 }).should.not.have.keys('foo', 'baz');
    ({ foo: 1, bar: 2 }).should.not.contain.keys('baz');
    ({ foo: 1, bar: 2 }).should.not.contain.keys('foo', 'baz');
    ({ foo: 1, bar: 2 }).should.not.contain.keys('baz', 'foo');

    ({ foo: 1, bar: 2 }).should.have.any.keys('foo', 'baz');
    ({ foo: 1, bar: 2 }).should.have.any.keys('foo');
    ({ foo: 1, bar: 2 }).should.contain.any.keys('bar', 'baz');
    ({ foo: 1, bar: 2 }).should.contain.any.keys(['foo']);
    ({ foo: 1, bar: 2 }).should.have.all.keys(['bar', 'foo']);
    ({ foo: 1, bar: 2 }).should.contain.all.keys(['bar', 'foo']);
    ({ foo: 1, bar: 2 }).should.contain.any.keys({ 'foo': 6 });
    ({ foo: 1, bar: 2 }).should.have.all.keys({ 'foo': 6, 'bar': 7 });
    ({ foo: 1, bar: 2 }).should.contain.all.keys({ 'bar': 7, 'foo': 6 });

    ({ foo: 1, bar: 2 }).should.not.have.any.keys('baz', 'abc', 'def');
    ({ foo: 1, bar: 2 }).should.not.have.any.keys('baz');
    ({ foo: 1, bar: 2 }).should.not.contain.any.keys('baz');
    ({ foo: 1, bar: 2 }).should.not.have.all.keys(['baz', 'foo']);
    ({ foo: 1, bar: 2 }).should.not.contain.all.keys(['baz', 'foo']);
    ({ foo: 1, bar: 2 }).should.not.have.all.keys({ 'baz': 8, 'foo': 7 });

    ({ foo: 1, bar: 2 }).should.not.contain.all.keys({ 'baz': 8, 'foo': 7 });

    ({ 1: 1, 2: 2 }).should.have.keys(1, 2);
    ({ 1: 1, 2: 2 }).should.have.any.keys(1, 3);
    ({ 1: 1, 2: 2 }).should.contain.keys(1);

    var enumProp1 = 'enumProp1'
      , enumProp2 = 'enumProp2'
      , nonEnumProp = 'nonEnumProp'
      , obj = {};

    obj[enumProp1] = 'enumProp1';
    obj[enumProp2] = 'enumProp2';

    Object.defineProperty(obj, nonEnumProp, {
        enumerable: false,
        value: 'nonEnumProp'
    });

    obj.should.have.all.keys([enumProp1, enumProp2]);
    obj.should.not.have.all.keys([enumProp1, enumProp2, nonEnumProp]);

    if (typeof Symbol === 'function') {
      var sym1 = Symbol('sym1')
        , sym2 = Symbol('sym2')
        , sym3 = Symbol('sym3')
        , str = 'str'
        , obj = {};

      obj[sym1] = 'sym1';
      obj[sym2] = 'sym2';
      obj[str] = 'str';

      Object.defineProperty(obj, sym3, {
        enumerable: false,
        value: 'sym3'
      });

      obj.should.have.all.keys([sym1, sym2, str]);
      obj.should.not.have.all.keys([sym1, sym2, sym3, str]);
    }

    if (typeof Map !== 'undefined') {
      // Not using Map constructor args because not supported in IE 11.
      var aKey = {thisIs: 'anExampleObject'}
        , anotherKey = {doingThisBecauseOf: 'referential equality'}
        , testMap = new Map();

      testMap.set(aKey, 'aValue');
      testMap.set(anotherKey, 'anotherValue');

      testMap.should.have.any.keys(aKey);
      testMap.should.have.any.keys('thisDoesNotExist', 'thisToo', aKey);
      testMap.should.have.all.keys(aKey, anotherKey);

      testMap.should.contain.all.keys(aKey);
      testMap.should.not.contain.all.keys(aKey, 'thisDoesNotExist');
      testMap.should.not.have.any.keys({iDoNot: 'exist'});
      testMap.should.not.have.all.keys('thisDoesNotExist', 'thisToo', anotherKey);

      testMap.should.have.any.keys([aKey]);
      testMap.should.have.any.keys([20, 1, aKey]);
      testMap.should.have.all.keys([aKey, anotherKey]);

      testMap.should.not.have.any.keys([{13: 37}, 'thisDoesNotExist', 'thisToo']);
      testMap.should.not.have.any.keys([20, 1, {13: 37}]);
      testMap.should.not.have.all.keys([aKey, {'iDoNot': 'exist'}]);

      // Ensure the assertions above use strict equality
      err(function() {
        testMap.should.have.any.keys({thisIs: 'anExampleObject'});
      });

      err(function() {
        testMap.should.have.all.keys({thisIs: 'anExampleObject'}, {doingThisBecauseOf: 'referential equality'});
      });

      err(function() {
        testMap.should.contain.all.keys({thisIs: 'anExampleObject'});
      });

      err(function() {
        testMap.should.have.any.keys([{thisIs: 'anExampleObject'}]);
      });

      err(function() {
        testMap.should.have.all.keys([{thisIs: 'anExampleObject'}, {doingThisBecauseOf: 'referential equality'}]);
      });

      // Using the same assertions as above but with `.deep` flag instead of using referential equality
      testMap.should.have.any.deep.keys({thisIs: 'anExampleObject'});
      testMap.should.have.any.deep.keys('thisDoesNotExist', 'thisToo', {thisIs: 'anExampleObject'});

      testMap.should.contain.all.deep.keys({thisIs: 'anExampleObject'});
      testMap.should.not.contain.all.deep.keys({thisIs: 'anExampleObject'}, 'thisDoesNotExist');
      testMap.should.not.have.any.deep.keys({iDoNot: 'exist'});
      testMap.should.not.have.all.deep.keys('thisDoesNotExist', 'thisToo', {doingThisBecauseOf: 'referential equality'});

      testMap.should.have.any.deep.keys([{thisIs: 'anExampleObject'}]);
      testMap.should.have.any.deep.keys([20, 1, {thisIs: 'anExampleObject'}]);

      testMap.should.have.all.deep.keys([{thisIs: 'anExampleObject'}, {doingThisBecauseOf: 'referential equality'}]);

      testMap.should.not.have.any.deep.keys([{13: 37}, 'thisDoesNotExist', 'thisToo']);
      testMap.should.not.have.any.deep.keys([20, 1, {13: 37}]);

      var weirdMapKey1 = Object.create(null)
        , weirdMapKey2 = {toString: NaN}
        , weirdMapKey3 = []
        , weirdMap = new Map();

      weirdMap.set(weirdMapKey1, 'val1');
      weirdMap.set(weirdMapKey2, 'val2');

      weirdMap.should.have.all.keys([weirdMapKey1, weirdMapKey2]);
      weirdMap.should.not.have.all.keys([weirdMapKey1, weirdMapKey3]);

      if (typeof Symbol === 'function') {
        var symMapKey1 = Symbol()
          , symMapKey2 = Symbol()
          , symMapKey3 = Symbol()
          , symMap = new Map();

        symMap.set(symMapKey1, 'val1');
        symMap.set(symMapKey2, 'val2');

        symMap.should.have.all.keys(symMapKey1, symMapKey2);
        symMap.should.have.any.keys(symMapKey1, symMapKey3);
        symMap.should.contain.all.keys(symMapKey2, symMapKey1);
        symMap.should.contain.any.keys(symMapKey3, symMapKey1);

        symMap.should.not.have.all.keys(symMapKey1, symMapKey3);
        symMap.should.not.have.any.keys(symMapKey3);
        symMap.should.not.contain.all.keys(symMapKey3, symMapKey1);
        symMap.should.not.contain.any.keys(symMapKey3);
      }

      var errMap = new Map();

      errMap.set({ foo: 1 });

      err(function(){
        errMap.should.have.keys();
      }, "keys required");

      err(function(){
        errMap.should.have.keys([]);
      }, "keys required");

      err(function(){
        errMap.should.contain.keys();
      }, "keys required");

      err(function(){
        errMap.should.contain.keys([]);
      }, "keys required");

      // Uncomment these after solving https://github.com/chaijs/chai/issues/662
      // This should fail because of referential equality (this is a strict comparison)
      // err(function(){
      //   new Map([[{foo: 1}, 'bar']]).should.contain.keys({ foo: 1 });
      // }, 'expected [ [ { foo: 1 }, 'bar' ] ] to contain key { foo: 1 }');

      // err(function(){
      //   new Map([[{foo: 1}, 'bar']]).should.contain.deep.keys({ iDoNotExist: 0 });
      // }, 'expected [ { foo: 1 } ] to deeply contain key { iDoNotExist: 0 }');
    }

    if (typeof Set !== 'undefined') {
      // Not using Set constructor args because not supported in IE 11.
      var aKey = {thisIs: 'anExampleObject'}
        , anotherKey = {doingThisBecauseOf: 'referential equality'}
        , testSet = new Set();

      testSet.add(aKey);
      testSet.add(anotherKey);

      testSet.should.have.any.keys(aKey);
      testSet.should.have.any.keys('thisDoesNotExist', 'thisToo', aKey);
      testSet.should.have.all.keys(aKey, anotherKey);

      testSet.should.contain.all.keys(aKey);
      testSet.should.not.contain.all.keys(aKey, 'thisDoesNotExist');

      testSet.should.not.have.any.keys({iDoNot: 'exist'});
      testSet.should.not.have.any.keys('thisIsNotAkey', {iDoNot: 'exist'}, {33: 20});
      testSet.should.not.have.all.keys('thisDoesNotExist', 'thisToo', anotherKey);

      testSet.should.have.any.keys([aKey]);
      testSet.should.have.any.keys([20, 1, aKey]);
      testSet.should.have.all.keys([aKey, anotherKey]);

      testSet.should.not.have.any.keys([{13: 37}, 'thisDoesNotExist', 'thisToo']);
      testSet.should.not.have.any.keys([20, 1, {13: 37}]);
      testSet.should.not.have.all.keys([aKey, {'iDoNot': 'exist'}]);

      // Ensure the assertions above use strict equality
      err(function() {
        testSet.should.have.any.keys({thisIs: 'anExampleObject'});
      });

      err(function() {
        testSet.should.have.all.keys({thisIs: 'anExampleObject'}, {doingThisBecauseOf: 'referential equality'});
      });

      err(function() {
        testSet.should.contain.all.keys({thisIs: 'anExampleObject'});
      });

      err(function() {
        testSet.should.have.any.keys([{thisIs: 'anExampleObject'}]);
      });

      err(function() {
        testSet.should.have.all.keys([{thisIs: 'anExampleObject'}, {doingThisBecauseOf: 'referential equality'}]);
      });


      // Using the same assertions as above but with `.deep` flag instead of using referential equality
      testSet.should.have.any.deep.keys({thisIs: 'anExampleObject'});
      testSet.should.have.any.deep.keys('thisDoesNotExist', 'thisToo', {thisIs: 'anExampleObject'});

      testSet.should.contain.all.deep.keys({thisIs: 'anExampleObject'});
      testSet.should.not.contain.all.deep.keys({thisIs: 'anExampleObject'}, 'thisDoesNotExist');

      testSet.should.not.have.any.deep.keys({iDoNot: 'exist'});
      testSet.should.not.have.any.deep.keys('thisIsNotAkey', {iDoNot: 'exist'}, {33: 20});
      testSet.should.not.have.all.deep.keys('thisDoesNotExist', 'thisToo', {anotherObj: 'foo'});

      testSet.should.have.any.deep.keys([{thisIs: 'anExampleObject'}]);
      testSet.should.have.any.deep.keys([20, 1, {thisIs: 'anExampleObject'}]);

      testSet.should.have.all.deep.keys({thisIs: 'anExampleObject'}, {doingThisBecauseOf: 'referential equality'});

      testSet.should.not.have.any.deep.keys([{13: 37}, 'thisDoesNotExist', 'thisToo']);
      testSet.should.not.have.any.deep.keys([20, 1, {13: 37}]);
      testSet.should.not.have.all.deep.keys([{thisIs: 'anExampleObject'}, {'iDoNot': 'exist'}])

      var weirdSetKey1 = Object.create(null)
        , weirdSetKey2 = {toString: NaN}
        , weirdSetKey3 = []
        , weirdSet = new Set();

      weirdSet.add(weirdSetKey1);
      weirdSet.add(weirdSetKey2);

      weirdSet.should.have.all.keys([weirdSetKey1, weirdSetKey2]);
      weirdSet.should.not.have.all.keys([weirdSetKey1, weirdSetKey3]);

      if (typeof Symbol === 'function') {
        var symSetKey1 = Symbol()
          , symSetKey2 = Symbol()
          , symSetKey3 = Symbol()
          , symSet = new Set();

        symSet.add(symSetKey1);
        symSet.add(symSetKey2);

        symSet.should.have.all.keys(symSetKey1, symSetKey2);
        symSet.should.have.any.keys(symSetKey1, symSetKey3);
        symSet.should.contain.all.keys(symSetKey2, symSetKey1);
        symSet.should.contain.any.keys(symSetKey3, symSetKey1);

        symSet.should.not.have.all.keys(symSetKey1, symSetKey3);
        symSet.should.not.have.any.keys(symSetKey3);
        symSet.should.not.contain.all.keys(symSetKey3, symSetKey1);
        symSet.should.not.contain.any.keys(symSetKey3);
      }

      var errSet = new Set();

      errSet.add({ foo: 1 });

      err(function(){
        errSet.should.have.keys();
      }, "keys required");

      err(function(){
        errSet.should.have.keys([]);
      }, "keys required");

      err(function(){
        errSet.should.contain.keys();
      }, "keys required");

      err(function(){
        errSet.should.contain.keys([]);
      }, "keys required");

      // Uncomment these after solving https://github.com/chaijs/chai/issues/662
      // This should fail because of referential equality (this is a strict comparison)
      // err(function(){
      //   new Set([{foo: 1}]).should.contain.keys({ foo: 1 });
      // }, 'expected [ { foo: 1 } ] to contain key { foo: 1 }');

      // err(function(){
      //   new Set([{foo: 1}]).should.contain.deep.keys({ iDoNotExist: 0 });
      // }, 'expected [ { foo: 1 } ] to deeply contain key { iDoNotExist: 0 }');
    }

    err(function(){
      ({ foo: 1 }).should.have.keys();
    }, "keys required");

    err(function(){
      ({ foo: 1 }).should.have.keys([]);
    }, "keys required");

    err(function(){
      ({ foo: 1 }).should.not.have.keys([]);
    }, "keys required");

    err(function(){
      ({ foo: 1 }).should.contain.keys([]);
    }, "keys required");

    var mixedArgsMsg = 'when testing keys against an object or an array you must give a single Array|Object|String argument or multiple String arguments'

    err(function(){
      ({}).should.contain.keys(['a'], "b");
    }, mixedArgsMsg);

    err(function(){
      ({}).should.contain.keys({ 'a': 1 }, "b");
    }, mixedArgsMsg);

    err(function(){
      ({ foo: 1 }).should.have.keys(['bar']);
    }, "expected { foo: 1 } to have key 'bar'");

    err(function(){
      ({ foo: 1 }).should.have.keys(['bar', 'baz']);
    }, "expected { foo: 1 } to have keys 'bar', and 'baz'");

    err(function(){
      ({ foo: 1 }).should.have.keys(['foo', 'bar', 'baz']);
    }, "expected { foo: 1 } to have keys 'foo', 'bar', and 'baz'");

    err(function(){
      ({ foo: 1 }).should.not.have.keys(['foo']);
    }, "expected { foo: 1 } to not have key 'foo'");

    err(function(){
      ({ foo: 1 }).should.not.have.keys(['foo']);
    }, "expected { foo: 1 } to not have key 'foo'");

    err(function(){
      ({ foo: 1, bar: 2 }).should.not.have.keys(['foo', 'bar']);
    }, "expected { foo: 1, bar: 2 } to not have keys 'foo', and 'bar'");

    err(function(){
      ({ foo: 1 }).should.not.contain.keys(['foo']);
    }, "expected { foo: 1 } to not contain key 'foo'");

    err(function(){
      ({ foo: 1 }).should.contain.keys('foo', 'bar');
    }, "expected { foo: 1 } to contain keys 'foo', and 'bar'");

    err(function() {
      ({ foo: 1 }).should.have.any.keys('baz');
    }, "expected { foo: 1 } to have key 'baz'");

    err(function(){
      ({ foo: 1, bar: 2 }).should.not.have.all.keys(['foo', 'bar']);
    }, "expected { foo: 1, bar: 2 } to not have keys 'foo', and 'bar'");

    err(function(){
      ({ foo: 1, bar: 2 }).should.not.have.any.keys(['foo', 'baz']);
    }, "expected { foo: 1, bar: 2 } to not have keys 'foo', or 'baz'");

    // repeat previous tests with Object as arg.
    err(function(){
      ({ foo: 1 }).should.have.keys({ 'bar': 1 });
    }, "expected { foo: 1 } to have key 'bar'");

    err(function(){
      ({ foo: 1 }).should.have.keys({ 'bar': 1, 'baz': 1});
    }, "expected { foo: 1 } to have keys 'bar', and 'baz'");

    err(function(){
      ({ foo: 1 }).should.have.keys({ 'foo': 1, 'bar': 1, 'baz': 1});
    }, "expected { foo: 1 } to have keys 'foo', 'bar', and 'baz'");

    err(function(){
      ({ foo: 1 }).should.not.have.keys({ 'foo': 1 });
    }, "expected { foo: 1 } to not have key 'foo'");

    err(function(){
      ({ foo: 1 }).should.not.have.keys({ 'foo': 1 });
    }, "expected { foo: 1 } to not have key 'foo'");

    err(function(){
      ({ foo: 1, bar: 2 }).should.not.have.keys({ 'foo': 1, 'bar': 1});
    }, "expected { foo: 1, bar: 2 } to not have keys 'foo', and 'bar'");

    err(function(){
      ({ foo: 1 }).should.not.contain.keys({ 'foo': 1 });
    }, "expected { foo: 1 } to not contain key 'foo'");

    err(function(){
      ({ foo: 1 }).should.contain.keys('foo', 'bar');
    }, "expected { foo: 1 } to contain keys 'foo', and 'bar'");

    err(function() {
      ({ foo: 1 }).should.have.any.keys('baz');
    }, "expected { foo: 1 } to have key 'baz'");

    err(function(){
      ({ foo: 1, bar: 2 }).should.not.have.all.keys({ 'foo': 1, 'bar': 1});
    }, "expected { foo: 1, bar: 2 } to not have keys 'foo', and 'bar'");

    err(function(){
      ({ foo: 1, bar: 2 }).should.not.have.any.keys({ 'foo': 1, 'baz': 1});
    }, "expected { foo: 1, bar: 2 } to not have keys 'foo', or 'baz'");

  });

  it('keys(array) will not mutate array (#359)', function () {
      var expected = [ 'b', 'a' ];
      var original_order = [ 'b', 'a' ];
      var obj = { "b": 1, "a": 1 };
      expected.should.deep.equal(original_order);
      obj.should.keys(original_order);
      expected.should.deep.equal(original_order);
  });

  it('throw', function () {
    // See GH-45: some poorly-constructed custom errors don't have useful names
    // on either their constructor or their constructor prototype, but instead
    // only set the name inside the constructor itself.
    var PoorlyConstructedError = function () {
      this.name = 'PoorlyConstructedError';
    };
    PoorlyConstructedError.prototype = Object.create(Error.prototype);

    function CustomError(message) {
        this.name = 'CustomError';
        this.message = message;
    }
    CustomError.prototype = Error.prototype;

    var specificError = new RangeError('boo');

    var goodFn = function () { 1==1; }
      , badFn = function () { throw new Error('testing'); }
      , stringErrFn = function () { throw 'testing'; }
      , refErrFn = function () { throw new ReferenceError('hello'); }
      , ickyErrFn = function () { throw new PoorlyConstructedError(); }
      , specificErrFn = function () { throw specificError; }
      , customErrFn = function () { throw new CustomError('foo'); }
      , emptyErrFn = function () { throw new Error(); }
      , emptyStringErrFn = function () { throw new Error(''); };

    (goodFn).should.not.throw();
    (goodFn).should.not.throw(Error);
    (goodFn).should.not.throw(specificError);
    (badFn).should.throw();
    (badFn).should.throw(Error);
    (badFn).should.not.throw(ReferenceError);
    (badFn).should.not.throw(specificError);
    (stringErrFn).should.throw();
    (stringErrFn).should.not.throw(ReferenceError);
    (stringErrFn).should.not.throw(specificError);
    (refErrFn).should.throw();
    (refErrFn).should.throw(ReferenceError);
    (refErrFn).should.throw(Error);
    (refErrFn).should.not.throw(TypeError);
    (refErrFn).should.not.throw(specificError);
    (ickyErrFn).should.throw();
    (ickyErrFn).should.throw(PoorlyConstructedError);
    (ickyErrFn).should.throw(Error);
    (ickyErrFn).should.not.throw(specificError);
    (specificErrFn).should.throw(specificError);

    (goodFn).should.not.throw('testing');
    (goodFn).should.not.throw(/testing/);
    (badFn).should.throw(/testing/);
    (badFn).should.throw('testing');
    (badFn).should.not.throw(/hello/);
    (badFn).should.not.throw('hello');
    (emptyStringErrFn).should.throw('');
    (emptyStringErrFn).should.not.throw('testing');
    (badFn).should.throw('');

    (badFn).should.throw(Error, /testing/);
    (badFn).should.throw(Error, 'testing');
    (emptyErrFn).should.not.throw(Error, 'testing');

    (stringErrFn).should.throw(/testing/);
    (stringErrFn).should.throw('testing');
    (stringErrFn).should.not.throw(/hello/);
    (stringErrFn).should.not.throw('hello');

    should.throw(badFn);
    should.throw(refErrFn, ReferenceError);
    should.throw(refErrFn, Error);
    should.throw(ickyErrFn, PoorlyConstructedError);
    should.throw(specificErrFn, specificError);
    should.not.throw(goodFn);
    should.not.throw(badFn, ReferenceError);
    should.not.throw(badFn, specificError);

    should.throw(badFn, Error, /testing/);
    should.throw(badFn, Error, 'testing');

    (badFn).should.not.throw(Error, 'I am the wrong error message');
    (badFn).should.not.throw(TypeError, 'testing');

    err(function(){
      (goodFn).should.throw();
    }, /^expected \[Function(: goodFn)*\] to throw an error$/);

    err(function(){
      (goodFn).should.throw(ReferenceError);
    }, /^expected \[Function(: goodFn)*\] to throw ReferenceError$/);

    err(function(){
      (goodFn).should.throw(specificError);
    }, /^expected \[Function(: goodFn)*\] to throw 'RangeError: boo'$/);

    err(function(){
      (badFn).should.not.throw();
    }, /^expected \[Function(: badFn)*\] to not throw an error but 'Error: testing' was thrown$/);

    err(function(){
      (badFn).should.throw(ReferenceError);
    }, /^expected \[Function(: badFn)*\] to throw 'ReferenceError' but 'Error: testing' was thrown$/);

    err(function(){
      (badFn).should.throw(specificError);
    }, /^expected \[Function(: badFn)*\] to throw 'RangeError: boo' but 'Error: testing' was thrown$/);

    err(function(){
      (badFn).should.not.throw(Error);
    }, /^expected \[Function(: badFn)*\] to not throw 'Error' but 'Error: testing' was thrown$/);

    err(function(){
      (stringErrFn).should.not.throw();
    }, /^expected \[Function(: stringErrFn)*\] to not throw an error but 'testing' was thrown$/);

    err(function(){
      (stringErrFn).should.throw(ReferenceError);
    }, /^expected \[Function(: stringErrFn)*\] to throw 'ReferenceError' but 'testing' was thrown$/);

    err(function(){
      (stringErrFn).should.throw(specificError);
    }, /^expected \[Function(: stringErrFn)*\] to throw 'RangeError: boo' but 'testing' was thrown$/);

    err(function(){
      (stringErrFn).should.not.throw('testing');
    }, /^expected \[Function(: stringErrFn)*\] to throw error not including 'testing'$/);

    err(function(){
      (refErrFn).should.not.throw(ReferenceError);
    }, /^expected \[Function(: refErrFn)*\] to not throw 'ReferenceError' but 'ReferenceError: hello' was thrown$/);

    err(function(){
      (badFn).should.throw(PoorlyConstructedError);
    }, /^expected \[Function(: badFn)*\] to throw 'PoorlyConstructedError' but 'Error: testing' was thrown$/);

    err(function(){
      (ickyErrFn).should.not.throw(PoorlyConstructedError);
    }, /^(expected \[Function(: ickyErrFn)*\] to not throw 'PoorlyConstructedError' but)(.*)(PoorlyConstructedError|\{ Object \()(.*)(was thrown)$/);

    err(function(){
      (ickyErrFn).should.throw(ReferenceError);
    }, /^(expected \[Function(: ickyErrFn)*\] to throw 'ReferenceError' but)(.*)(PoorlyConstructedError|\{ Object \()(.*)(was thrown)$/);

    err(function(){
      (specificErrFn).should.throw(new ReferenceError('eek'));
    }, /^expected \[Function(: specificErrFn)*\] to throw 'ReferenceError: eek' but 'RangeError: boo' was thrown$/);

    err(function(){
      (specificErrFn).should.not.throw(specificError);
    }, /^expected \[Function(: specificErrFn)*\] to not throw 'RangeError: boo'$/);

    err(function (){
      (badFn).should.not.throw(/testing/);
    }, /^expected \[Function(: badFn)*\] to throw error not matching \/testing\/$/);

    err(function () {
      (badFn).should.throw(/hello/);
    }, /^expected \[Function(: badFn)*\] to throw error matching \/hello\/ but got \'testing\'$/);

    err(function () {
      (badFn).should.throw(Error, /hello/, 'blah');
    }, /^blah: expected \[Function(: badFn)*\] to throw error matching \/hello\/ but got 'testing'$/);

    err(function () {
      (badFn).should.throw(Error, 'hello', 'blah');
    }, /^blah: expected \[Function(: badFn)*\] to throw error including 'hello' but got 'testing'$/);

    err(function () {
      (customErrFn).should.not.throw();
    }, /^expected \[Function(: customErrFn)*\] to not throw an error but 'CustomError: foo' was thrown$/);

    err(function(){
      (badFn).should.not.throw(Error, 'testing');
    }, /^expected \[Function(: badFn)*\] to not throw 'Error' but 'Error: testing' was thrown$/);

    err(function(){
      (emptyStringErrFn).should.not.throw(Error, '');
    }, /^expected \[Function(: emptyStringErrFn)*\] to not throw 'Error' but 'Error' was thrown$/);

    err(function(){
      (emptyStringErrFn).should.not.throw('');
    }, /^expected \[Function(: emptyStringErrFn)*\] to throw error not including ''$/);
  });

  it('respondTo', function(){
    function Foo(){};
    Foo.prototype.bar = function(){};
    Foo.func = function(){};

    var bar = {};
    bar.foo = function(){};

    Foo.should.respondTo('bar');
    Foo.should.not.respondTo('foo');
    Foo.should.itself.respondTo('func');
    Foo.should.itself.not.respondTo('bar');

    bar.should.respondTo('foo');

    err(function(){
      Foo.should.respondTo('baz', 'constructor');
    }, /^(constructor: expected)(.*)(\[Function: Foo\])(.*)(to respond to \'baz\')$/);

    err(function(){
      bar.should.respondTo('baz', 'object');
    }, /^(object: expected)(.*)(\{ foo: \[Function\] \}|\{ Object \()(.*)(to respond to \'baz\')$/);
  });

  it('satisfy', function(){
    var matcher = function (num){
      return num === 1;
    };

    (1).should.satisfy(matcher);

    err(function(){
      (2).should.satisfy(matcher, 'blah');
    }, /^blah: expected 2 to satisfy \[Function(: matcher)*\]$/);
  });

  it('closeTo', function(){
    (1.5).should.be.closeTo(1.0, 0.5);

    err(function(){
      (2).should.be.closeTo(1.0, 0.5, 'blah');
    }, "blah: expected 2 to be close to 1 +/- 0.5");

    err(function() {
      [1.5].should.be.closeTo(1.0, 0.5);
    }, "expected [ 1.5 ] to be a number");

    err(function() {
      (1.5).should.be.closeTo("1.0", 0.5);
    }, "the arguments to closeTo or approximately must be numbers");

    err(function() {
      (1.5).should.be.closeTo(1.0, true);
    }, "the arguments to closeTo or approximately must be numbers");
  });

  it('approximately', function(){
    (1.5).should.be.approximately(1.0, 0.5);

    err(function(){
      (2).should.be.approximately(1.0, 0.5, 'blah');
    }, "blah: expected 2 to be close to 1 +/- 0.5");

    err(function() {
      [1.5].should.be.approximately(1.0, 0.5);
    }, "expected [ 1.5 ] to be a number");

    err(function() {
      (1.5).should.be.approximately("1.0", 0.5);
    }, "the arguments to closeTo or approximately must be numbers");

    err(function() {
      (1.5).should.be.approximately(1.0, true);
    }, "the arguments to closeTo or approximately must be numbers");
  });

  it('include.members', function() {
    [1, 2, 3].should.include.members([3]);
    [1, 2, 3].should.include.members([]);
    [1, 2, 3].should.include.members([2, 1]);
    [1, 2, 3].should.include.members([2, 1, 1]);

    [1, 2, 3].should.not.include.members([999]);
    [].should.not.include.members([23]);
    [{a: 1}].should.not.include.members([{a: 1}]);

    err(function() {
      [].should.include.members([43]);
    }, 'expected [] to be a superset of [ 43 ]');

    err(function() {
      [5, 2, 1].should.not.include.members([2]);
    }, 'expected [ 5, 2, 1 ] to not be a superset of [ 2 ]');

    err(function() {
      'foo'.should.include.members([12]);
    }, "expected 'foo' to be an array");

    err(function() {
      [1, 2, 3].should.include.members('o');
    }, "expected 'o' to be an array");
  });

  it('memberEquals', function() {
    [1, 2, 3].should.have.same.members([3, 2, 1]);
    [5, 4].should.have.same.members([5, 4]);
    [5, 4, 4].should.have.same.members([5, 4, 4]);
    [].should.have.same.members([]);

    [5, 4].should.not.have.same.members([5, 4, 4]);
    [5, 4, 4].should.not.have.same.members([5, 4]);
    [5, 4, 4].should.not.have.same.members([5, 4, 3]);
    [5, 4, 3].should.not.have.same.members([5, 4, 4]);
    [{a: 1}].should.not.have.same.members([{a: 1}]);

    err(function() {
      [1, 2, 3].should.have.same.members([]);
    }, 'expected [ 1, 2, 3 ] to have the same members as []');

    err(function() {
      [1, 2, 3].should.have.same.members(4);
    }, 'expected 4 to be an array');
  });

  it('deep.members', function() {
    [{ id: 1 }].should.have.deep.members([{ id: 1 }]);
    [{a: 1}, {b: 2}, {b: 2}].should.have.deep.members([{a: 1}, {b: 2}, {b: 2}]);

    [{ id: 2 }].should.not.have.deep.members([{ id: 1 }]);
    [{a: 1}, {b: 2}].should.not.have.deep.members([{a: 1}, {b: 2}, {b: 2}]);
    [{a: 1}, {b: 2}, {b: 2}].should.not.have.deep.members([{a: 1}, {b: 2}]);
    [{a: 1}, {b: 2}, {b: 2}].should.not.have.deep.members([{a: 1}, {b: 2}, {c: 3}]);
    [{a: 1}, {b: 2}, {c: 3}].should.not.have.deep.members([{a: 1}, {b: 2}, {b: 2}]);

    err(function(){
      [{ id: 1 }].should.have.deep.members([{ id: 2 }])
    }, 'expected [ { id: 1 } ] to have the same members as [ { id: 2 } ]');
  });

  it('include.deep.members', function() {
    [{a: 1}, {b: 2}, {c: 3}].should.include.deep.members([{b: 2}, {a: 1}]);
    [{a: 1}, {b: 2}, {c: 3}].should.include.deep.members([{b: 2}, {a: 1}, {a: 1}]);
    [{a: 1}, {b: 2}, {c: 3}].should.not.include.deep.members([{b: 2}, {a: 1}, {f: 5}]);

    err(function() {
      [{a: 1}, {b: 2}, {c: 3}].should.include.deep.members([{b: 2}, {a: 1}, {f: 5}]);
    }, 'expected [ { a: 1 }, { b: 2 }, { c: 3 } ] to be a superset of [ { b: 2 }, { a: 1 }, { f: 5 } ]');
  });

  it('ordered.members', function() {
    [1, 2, 3].should.ordered.members([1, 2, 3]);
    [1, 2, 2].should.ordered.members([1, 2, 2]);

    [1, 2, 3].should.not.ordered.members([2, 1, 3]);
    [1, 2, 3].should.not.ordered.members([1, 2]);
    [1, 2].should.not.ordered.members([1, 2, 2]);
    [1, 2, 2].should.not.ordered.members([1, 2]);
    [1, 2, 2].should.not.ordered.members([1, 2, 3]);
    [1, 2, 3].should.not.ordered.members([1, 2, 2]);

    err(function() {
      [1, 2, 3].should.ordered.members([2, 1, 3]);
    }, 'expected [ 1, 2, 3 ] to have the same ordered members as [ 2, 1, 3 ]');

    err(function() {
      [1, 2, 3].should.not.ordered.members([1, 2, 3]);
    }, 'expected [ 1, 2, 3 ] to not have the same ordered members as [ 1, 2, 3 ]');
  });

  it('include.ordered.members', function() {
    [1, 2, 3].should.include.ordered.members([1, 2]);
    [1, 2, 3].should.not.include.ordered.members([2, 1]);
    [1, 2, 3].should.not.include.ordered.members([2, 3]);
    [1, 2, 3].should.not.include.ordered.members([1, 2, 2]);

    err(function() {
      [1, 2, 3].should.include.ordered.members([2, 1]);
    }, 'expected [ 1, 2, 3 ] to be an ordered superset of [ 2, 1 ]');

    err(function() {
      [1, 2, 3].should.not.include.ordered.members([1, 2]);
    }, 'expected [ 1, 2, 3 ] to not be an ordered superset of [ 1, 2 ]');
  });

  it('deep.ordered.members', function() {
    [{a: 1}, {b: 2}, {c: 3}].should.deep.ordered.members([{a: 1}, {b: 2}, {c: 3}]);
    [{a: 1}, {b: 2}, {b: 2}].should.deep.ordered.members([{a: 1}, {b: 2}, {b: 2}]);

    [{a: 1}, {b: 2}, {c: 3}].should.not.deep.ordered.members([{b: 2}, {a: 1}, {c: 3}]);
    [{a: 1}, {b: 2}].should.not.deep.ordered.members([{a: 1}, {b: 2}, {b: 2}]);
    [{a: 1}, {b: 2}, {b: 2}].should.not.deep.ordered.members([{a: 1}, {b: 2}]);
    [{a: 1}, {b: 2}, {b: 2}].should.not.deep.ordered.members([{a: 1}, {b: 2}, {c: 3}]);
    [{a: 1}, {b: 2}, {c: 3}].should.not.deep.ordered.members([{a: 1}, {b: 2}, {b: 2}]);

    err(function() {
      [{a: 1}, {b: 2}, {c: 3}].should.deep.ordered.members([{b: 2}, {a: 1}, {c: 3}]);
    }, 'expected [ { a: 1 }, { b: 2 }, { c: 3 } ] to have the same ordered members as [ { b: 2 }, { a: 1 }, { c: 3 } ]');

    err(function() {
      [{a: 1}, {b: 2}, {c: 3}].should.not.deep.ordered.members([{a: 1}, {b: 2}, {c: 3}]);
    }, 'expected [ { a: 1 }, { b: 2 }, { c: 3 } ] to not have the same ordered members as [ { a: 1 }, { b: 2 }, { c: 3 } ]');
  });

  it('include.deep.ordered.members', function() {
    [{a: 1}, {b: 2}, {c: 3}].should.include.deep.ordered.members([{a: 1}, {b: 2}]);
    [{a: 1}, {b: 2}, {c: 3}].should.not.include.deep.ordered.members([{b: 2}, {a: 1}]);
    [{a: 1}, {b: 2}, {c: 3}].should.not.include.deep.ordered.members([{b: 2}, {c: 3}]);
    [{a: 1}, {b: 2}, {c: 3}].should.not.include.deep.ordered.members([{a: 1}, {b: 2}, {b: 2}]);

    err(function() {
      [{a: 1}, {b: 2}, {c: 3}].should.include.deep.ordered.members([{b: 2}, {a: 1}]);
    }, 'expected [ { a: 1 }, { b: 2 }, { c: 3 } ] to be an ordered superset of [ { b: 2 }, { a: 1 } ]');

    err(function() {
      [{a: 1}, {b: 2}, {c: 3}].should.not.include.deep.ordered.members([{a: 1}, {b: 2}]);
    }, 'expected [ { a: 1 }, { b: 2 }, { c: 3 } ] to not be an ordered superset of [ { a: 1 }, { b: 2 } ]');
  });

  it('change', function() {
    var obj = { value: 10, str: 'foo' },
        heroes = ['spiderman', 'superman'],
        fn     = function() { obj.value += 5 },
        sameFn = function() { obj.value += 0 },
        decFn  = function() { obj.value -= 20 },
        bangFn = function() { obj.str += '!' },
        batFn  = function() { heroes.push('batman') },
        lenFn  = function() { return heroes.length },
        noFn   = function() { return null };

    fn.should.change(obj, 'value');
    fn.should.change(obj, 'value').by(5);
    fn.should.change(obj, 'value').by(-5);
    fn.should.change(obj, 'value').but.not.by(10);

    decFn.should.change(obj, 'value');
    decFn.should.change(obj, 'value').by(20);
    decFn.should.change(obj, 'value').but.not.by(19);

    sameFn.should.not.change(obj, 'value');

    sameFn.should.not.change(obj, 'str');
    bangFn.should.change(obj, 'str');

    batFn.should.change(lenFn);
    batFn.should.change(lenFn).by(1);
    batFn.should.change(lenFn).but.not.by(2);
    noFn.should.not.change(lenFn);
  });

  it('increase, decrease', function() {
    var obj = { value: 10, noop: null },
        arr = ['one', 'two'],
        pFn   = function() { arr.push('three') },
        popFn = function() { arr.pop() },
        lenFn = function() { return arr.length },
        nFn   = function() { return null },
        incFn = function() { obj.value += 2 },
        decFn = function() { obj.value -= 3 },
        smFn  = function() { obj.value += 0 };

    smFn.should.not.increase(obj, 'value');
    decFn.should.not.increase(obj, 'value');
    incFn.should.increase(obj, 'value');
    incFn.should.increase(obj, 'value').by(2);
    incFn.should.increase(obj, 'value').but.not.by(1);

    smFn.should.not.decrease(obj, 'value');
    incFn.should.not.decrease(obj, 'value');
    decFn.should.decrease(obj, 'value');
    decFn.should.decrease(obj, 'value').by(3);
    decFn.should.decrease(obj, 'value').but.not.by(2);

    nFn.should.not.increase(lenFn);
    nFn.should.not.decrease(lenFn);

    popFn.should.decrease(lenFn);
    popFn.should.not.increase(lenFn);

    pFn.should.increase(lenFn);
    pFn.should.not.decrease(lenFn);

    pFn.should.increase(lenFn).by(1);
    pFn.should.increase(lenFn).but.not.by(2);

    popFn.should.decrease(lenFn).by(1);
    popFn.should.decrease(lenFn).but.not.by(2);

    err(function() {
      incFn.should.increase(obj, 'noop');
    }, 'expected null to be a number');
    err(function() {
      incFn.should.decrease(obj, 'noop');
    }, 'expected null to be a number');
  });

  it('extensible', function() {
     var nonExtensibleObject = Object.preventExtensions({});

     ({}).should.be.extensible;
     nonExtensibleObject.should.not.be.extensible;

     err(function() {
       nonExtensibleObject.should.be.extensible;
     }, 'expected {} to be extensible');

     err(function() {
       ({}).should.not.be.extensible;
     }, 'expected {} to not be extensible');

     // Making sure ES6-like Object.isExtensible response is respected for all primitive types

     (42).should.not.be.extensible;
     'foo'.should.not.be.extensible;
     false.should.not.be.extensible;

     if (typeof Symbol === 'function') {
       Symbol().should.not.be.extensible;
     }

     err(function() {
       (42).should.be.extensible;
     }, 'expected 42 to be extensible');

     err(function() {
       'foo'.should.be.extensible;
     }, 'expected \'foo\' to be extensible');

     err(function() {
       false.should.be.extensible;
     }, 'expected false to be extensible');

    // A bug in Safari 10 causes the below test to fail. It can be re-enabled
    // once the bug is fixed. See https://github.com/chaijs/chai/issues/855.
    /*if (typeof Proxy === 'function') {
      var proxy = new Proxy({}, {
        isExtensible: function() {
          throw new TypeError();
        }
      });

      err(function() {
        // .extensible should not suppress errors, thrown in proxy traps
        proxy.should.be.extensible;
      }, { name: 'TypeError' });
    }*/
  });

  it('sealed', function() {
    var sealedObject = Object.seal({});

    sealedObject.should.be.sealed;
    ({}).should.not.be.sealed;

    err(function() {
      ({}).should.be.sealed;
    }, 'expected {} to be sealed');

    err(function() {
      sealedObject.should.not.be.sealed;
    }, 'expected {} to not be sealed');

    // Making sure ES6-like Object.isSealed response is respected for all primitive types

    (42).should.be.sealed;
    'foo'.should.be.sealed;
    false.should.be.sealed;

    if (typeof Symbol === 'function') {
      Symbol().should.be.sealed;
    }

    err(function() {
      (42).should.not.be.sealed;
    }, 'expected 42 to not be sealed');

    err(function() {
      'foo'.should.not.be.sealed;
    }, 'expected \'foo\' to not be sealed');

    err(function() {
      false.should.not.be.sealed;
    }, 'expected false to not be sealed');

    // A bug in Safari 10 causes the below test to fail. It can be re-enabled
    // once the bug is fixed. See https://github.com/chaijs/chai/issues/855.
    /*if (typeof Proxy === 'function') {
      var proxy = new Proxy({}, {
        ownKeys: function() {
          throw new TypeError();
        }
      });

      // Object.isSealed will call ownKeys trap only if object is not extensible
      Object.preventExtensions(proxy);

      err(function() {
        // .sealed should not suppress errors, thrown in proxy traps
        proxy.should.be.sealed;
      }, { name: 'TypeError' });
    }*/
  });

  it('frozen', function() {
    var frozenObject = Object.freeze({});

    frozenObject.should.be.frozen;
    ({}).should.not.be.frozen;

    err(function() {
        ({}).should.be.frozen;
    }, 'expected {} to be frozen');

    err(function() {
        frozenObject.should.not.be.frozen;
    }, 'expected {} to not be frozen');

    // Making sure ES6-like Object.isFrozen response is respected for all primitive types

    (42).should.be.frozen;
    'foo'.should.be.frozen;
    false.should.be.frozen;

    if (typeof Symbol === 'function') {
      Symbol().should.be.frozen;
    }

    err(function() {
      (42).should.not.be.frozen;
    }, 'expected 42 to not be frozen');

    err(function() {
      'foo'.should.not.be.frozen;
    }, 'expected \'foo\' to not be frozen');

    err(function() {
      false.should.not.be.frozen;
    }, 'expected false to not be frozen');

    // A bug in Safari 10 causes the below test to fail. It can be re-enabled
    // once the bug is fixed. See https://github.com/chaijs/chai/issues/855.
    /*if (typeof Proxy === 'function') {
      var proxy = new Proxy({}, {
        ownKeys: function() {
          throw new TypeError();
        }
      });

      // Object.isFrozen will call ownKeys trap only if object is not extensible
      Object.preventExtensions(proxy);

      err(function() {
        // .frozen should not suppress errors, thrown in proxy traps
        proxy.should.be.frozen;
      }, { name: 'TypeError' });
    }*/
  });
});
