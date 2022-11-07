describe('expect', function () {
  var expect = chai.expect;

  it('chai.version', function() {
    expect(chai).to.have.property('version');
  });

  it('assertion', function(){
    expect('test').to.be.a('string');
    expect('foo').to.equal('foo');
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

      it('throws when invalid property follows expect', function () {
        err(function () {
          expect(42).pizza;
        }, 'Invalid Chai property: pizza', true);
      });

      it('throws when invalid property follows language chain', function () {
        err(function () {
          expect(42).to.pizza;
        }, 'Invalid Chai property: pizza', true);
      });

      it('throws when invalid property follows property assertion', function () {
        err(function () {
          expect(42).ok.pizza;
        }, 'Invalid Chai property: pizza', true);
      });

      it('throws when invalid property follows overwritten property assertion', function () {
        err(function () {
          expect(42).tmpProperty.pizza;
        }, 'Invalid Chai property: pizza', true);
      });

      it('throws when invalid property follows uncalled method assertion', function () {
        err(function () {
          expect(42).equal.pizza;
        }, 'Invalid Chai property: equal.pizza. See docs for proper usage of "equal".', true);
      });

      it('throws when invalid property follows called method assertion', function () {
        err(function () {
          expect(42).equal(42).pizza;
        }, 'Invalid Chai property: pizza', true);
      });

      it('throws when invalid property follows uncalled overwritten method assertion', function () {
        err(function () {
          expect(42).tmpMethod.pizza;
        }, 'Invalid Chai property: tmpMethod.pizza. See docs for proper usage of "tmpMethod".', true);
      });

      it('throws when invalid property follows called overwritten method assertion', function () {
        err(function () {
          expect(42).tmpMethod().pizza;
        }, 'Invalid Chai property: pizza', true);
      });

      it('throws when invalid property follows uncalled chainable method assertion', function () {
        err(function () {
          expect(42).a.pizza;
        }, 'Invalid Chai property: pizza', true);
      });

      it('throws when invalid property follows called chainable method assertion', function () {
        err(function () {
          expect(42).a('number').pizza;
        }, 'Invalid Chai property: pizza', true);
      });

      it('throws when invalid property follows uncalled overwritten chainable method assertion', function () {
       err(function () {
          expect(42).tmpChainableMethod.pizza;
        }, 'Invalid Chai property: pizza', true);
      });

      it('throws when invalid property follows called overwritten chainable method assertion', function () {
        err(function () {
          expect(42).tmpChainableMethod().pizza;
        }, 'Invalid Chai property: pizza', true);
      });

      it('doesn\'t throw if invalid property is excluded via config', function () {
        expect(function () {
          expect(42).then;
        }).to.not.throw();
      });
    });

    describe('length guard', function () {
      var fnLengthDesc = Object.getOwnPropertyDescriptor(function () {}, 'length');
      if (!fnLengthDesc.configurable) return;

      it('doesn\'t throw when `.length` follows `.expect`', function () {
        expect(function () {
          expect('foo').length;
        }).to.not.throw();
      });

      it('doesn\'t throw when `.length` follows language chain', function () {
        expect(function () {
          expect('foo').to.length;
        }).to.not.throw();
      });

      it('doesn\'t throw when `.length` follows property assertion', function () {
        expect(function () {
          expect('foo').ok.length;
        }).to.not.throw();
      });

      it('doesn\'t throw when `.length` follows overwritten property assertion', function () {
        expect(function () {
          expect('foo').tmpProperty.length;
        }).to.not.throw();
      });

      it('throws when `.length` follows uncalled method assertion', function () {
        err(function () {
          expect('foo').equal.length;
        }, 'Invalid Chai property: equal.length. See docs for proper usage of "equal".', true);
      });

      it('doesn\'t throw when `.length` follows called method assertion', function () {
        expect(function () {
          expect('foo').equal('foo').length;
        }).to.not.throw();
      });

      it('throws when `.length` follows uncalled overwritten method assertion', function () {
        err(function () {
          expect('foo').tmpMethod.length;
        }, 'Invalid Chai property: tmpMethod.length. See docs for proper usage of "tmpMethod".', true);
      });

      it('doesn\'t throw when `.length` follows called overwritten method assertion', function () {
        expect(function () {
          expect('foo').tmpMethod().length;
        }).to.not.throw();
      });

      it('throws when `.length` follows uncalled chainable method assertion', function () {
        err(function () {
          expect('foo').a.length;
        }, 'Invalid Chai property: a.length. Due to a compatibility issue, "length" cannot directly follow "a". Use "a.lengthOf" instead.', true);
      });

      it('doesn\'t throw when `.length` follows called chainable method assertion', function () {
        expect(function () {
          expect('foo').a('string').length;
        }).to.not.throw();
      });

      it('throws when `.length` follows uncalled overwritten chainable method assertion', function () {
        err(function () {
          expect('foo').tmpChainableMethod.length;
        }, 'Invalid Chai property: tmpChainableMethod.length. Due to a compatibility issue, "length" cannot directly follow "tmpChainableMethod". Use "tmpChainableMethod.lengthOf" instead.', true);
      });

      it('doesn\'t throw when `.length` follows called overwritten chainable method assertion', function () {
        expect(function () {
          expect('foo').tmpChainableMethod().length;
        }).to.not.throw();
      });
    });
  });

  it('no-op chains', function() {
    function test(chain) {
      // tests that chain exists
      expect(expect(1)[chain]).not.undefined;

      // tests methods
      expect(1)[chain].equal(1);

      // tests properties that assert
      expect(false)[chain].false;

      // tests not
      expect(false)[chain].not.true;

      // tests chainable methods
      expect([1, 2, 3])[chain].contains(1);
    }

    [ 'to', 'be', 'been', 'is'
    , 'and', 'has', 'have', 'with'
    , 'that', 'which', 'at', 'of'
    , 'same', 'but', 'does', 'still', 'also' ].forEach(test);
  });

  describe("fail", function() {
    it('should accept a message as the 3rd argument', function () {
      err(function() {
        expect.fail(0, 1, 'this has failed');
      }, /this has failed/);
    });

    it('should accept a message as the only argument', function () {
      err(function() {
        expect.fail('this has failed');
      }, /this has failed/);
    });

    it('should produce a default message when called without any arguments', function () {
      err(function() {
        expect.fail();
      }, /expect\.fail()/);
    });
  });

  it('true', function(){
    expect(true).to.be.true;
    expect(false).to.not.be.true;
    expect(1).to.not.be.true;

    err(function(){
      expect('test', 'blah').to.be.true;
    }, "blah: expected 'test' to be true")
  });

  it('ok', function(){
    expect(true).to.be.ok;
    expect(false).to.not.be.ok;
    expect(1).to.be.ok;
    expect(0).to.not.be.ok;

    err(function(){
      expect('', 'blah').to.be.ok;
    }, "blah: expected '' to be truthy");

    err(function(){
      expect('test').to.not.be.ok;
    }, "expected 'test' to be falsy");
  });

  it('false', function(){
    expect(false).to.be.false;
    expect(true).to.not.be.false;
    expect(0).to.not.be.false;

    err(function(){
      expect('', 'blah').to.be.false;
    }, "blah: expected '' to be false")
  });

  it('null', function(){
    expect(null).to.be.null;
    expect(false).to.not.be.null;

    err(function(){
      expect('', 'blah').to.be.null;
    }, "blah: expected '' to be null")

  });

  it('undefined', function(){
    expect(undefined).to.be.undefined;
    expect(null).to.not.be.undefined;

    err(function(){
      expect('', 'blah').to.be.undefined;
    }, "blah: expected '' to be undefined")
  });

  it('exist', function(){
    var foo = 'bar'
      , bar;
    expect(foo).to.exist;
    expect(foo).to.exists;
    expect(bar).to.not.exist;
    expect(bar).to.not.exists;
    expect(0).to.exist;
    expect(false).to.exist;
    expect('').to.exist;

    err(function () {
      expect(bar, 'blah').to.exist;
    }, "blah: expected undefined to exist");

    err(function () {
      expect(foo).to.not.exist(foo);
    }, "expected 'bar' to not exist");
  });

  it('arguments', function(){
    var args = (function(){ return arguments; })(1,2,3);
    expect(args).to.be.arguments;
    expect([]).to.not.be.arguments;
    expect(args).to.be.an('arguments').and.be.arguments;
    expect([]).to.be.an('array').and.not.be.Arguments;

    err(function () {
      expect([], 'blah').to.be.arguments;
    }, "blah: expected [] to be arguments but got Array");
  });

  it('.equal()', function(){
    var foo;
    expect(undefined).to.equal(foo);

    err(function(){
      expect(undefined).to.equal(null);
    }, "expected undefined to equal null")
  });

  it('typeof', function(){
    expect('test').to.be.a('string');

    err(function(){
      expect('test').to.not.be.a('string');
    }, "expected 'test' not to be a string");

    (function () {
      expect(arguments).to.be.an('arguments');
    })(1, 2);

    expect(5).to.be.a('number');
    expect(new Number(1)).to.be.a('number');
    expect(Number(1)).to.be.a('number');
    expect(true).to.be.a('boolean');
    expect(new Array()).to.be.a('array');
    expect(new Object()).to.be.a('object');
    expect({}).to.be.a('object');
    expect([]).to.be.a('array');
    expect(function() {}).to.be.a('function');
    expect(null).to.be.a('null');

    if (typeof Symbol === 'function') {
      expect(Symbol()).to.be.a('symbol');
    }

    err(function(){
      expect(5).to.not.be.a('number', 'blah');
    }, "blah: expected 5 not to be a number");

    err(function(){
      expect(5, 'blah').to.not.be.a('number');
    }, "blah: expected 5 not to be a number");
  });

  it('instanceof', function(){
    function Foo(){}
    expect(new Foo()).to.be.an.instanceof(Foo);

    // Normally, `instanceof` requires that the constructor be a function or an
    // object with a callable `@@hasInstance`. But in some older browsers such
    // as IE11, `instanceof` also accepts DOM-related interfaces such as
    // `HTMLElement`, despite being non-callable objects in those browsers.
    // See: https://github.com/chaijs/chai/issues/1000.
    if (typeof document !== 'undefined' &&
        typeof document.createElement !== 'undefined' &&
        typeof HTMLElement !== 'undefined') {
      expect(document.createElement('div')).to.be.an.instanceof(HTMLElement);
    }

    err(function(){
      expect(new Foo()).to.an.instanceof(1, 'blah');
    }, "blah: The instanceof assertion needs a constructor but number was given.");

    err(function(){
      expect(new Foo(), 'blah').to.an.instanceof(1);
    }, "blah: The instanceof assertion needs a constructor but number was given.");

    err(function(){
      expect(new Foo()).to.an.instanceof('batman');
    }, "The instanceof assertion needs a constructor but string was given.");

    err(function(){
      expect(new Foo()).to.an.instanceof({});
    }, "The instanceof assertion needs a constructor but Object was given.");

    err(function(){
      expect(new Foo()).to.an.instanceof(true);
    }, "The instanceof assertion needs a constructor but boolean was given.");

    err(function(){
      expect(new Foo()).to.an.instanceof(null);
    }, "The instanceof assertion needs a constructor but null was given.");

    err(function(){
      expect(new Foo()).to.an.instanceof(undefined);
    }, "The instanceof assertion needs a constructor but undefined was given.");

    err(function(){
      function Thing(){};
      var t = new Thing();
      Thing.prototype = 1337;
      expect(t).to.an.instanceof(Thing);
    }, 'The instanceof assertion needs a constructor but function was given.', true)

    if (typeof Symbol !== 'undefined' && typeof Symbol.hasInstance !== 'undefined') {
        err(function(){
          expect(new Foo()).to.an.instanceof(Symbol());
        }, "The instanceof assertion needs a constructor but symbol was given.");

        err(function() {
            var FakeConstructor = {};
            var fakeInstanceB = 4;
            FakeConstructor[Symbol.hasInstance] = function (val) {
                return val === 3;
            };

            expect(fakeInstanceB).to.be.an.instanceof(FakeConstructor);
        }, 'expected 4 to be an instance of an unnamed constructor')

        err(function() {
            var FakeConstructor = {};
            var fakeInstanceB = 4;
            FakeConstructor[Symbol.hasInstance] = function (val) {
                return val === 4;
            };

            expect(fakeInstanceB).to.not.be.an.instanceof(FakeConstructor);
        }, 'expected 4 to not be an instance of an unnamed constructor')
    }

    err(function(){
      expect(3).to.an.instanceof(Foo, 'blah');
    }, "blah: expected 3 to be an instance of Foo");

    err(function(){
      expect(3, 'blah').to.an.instanceof(Foo);
    }, "blah: expected 3 to be an instance of Foo");
  });

  it('within(start, finish)', function(){
    expect(5).to.be.within(5, 10);
    expect(5).to.be.within(3, 6);
    expect(5).to.be.within(3, 5);
    expect(5).to.not.be.within(1, 3);
    expect('foo').to.have.length.within(2, 4);
    expect('foo').to.have.lengthOf.within(2, 4);
    expect([ 1, 2, 3 ]).to.have.length.within(2, 4);
    expect([ 1, 2, 3 ]).to.have.lengthOf.within(2, 4);

    err(function(){
      expect(5).to.not.be.within(4, 6, 'blah');
    }, "blah: expected 5 to not be within 4..6");

    err(function(){
      expect(5, 'blah').to.not.be.within(4, 6);
    }, "blah: expected 5 to not be within 4..6");

    err(function(){
      expect(10).to.be.within(50, 100, 'blah');
    }, "blah: expected 10 to be within 50..100");

    err(function () {
      expect('foo').to.have.length.within(5, 7, 'blah');
    }, "blah: expected \'foo\' to have a length within 5..7");

    err(function () {
      expect('foo', 'blah').to.have.length.within(5, 7);
    }, "blah: expected \'foo\' to have a length within 5..7");

    err(function () {
      expect('foo').to.have.lengthOf.within(5, 7, 'blah');
    }, "blah: expected \'foo\' to have a length within 5..7");

    err(function () {
      expect([ 1, 2, 3 ]).to.have.length.within(5, 7, 'blah');
    }, "blah: expected [ 1, 2, 3 ] to have a length within 5..7");

    err(function () {
      expect([ 1, 2, 3 ]).to.have.lengthOf.within(5, 7, 'blah');
    }, "blah: expected [ 1, 2, 3 ] to have a length within 5..7");

    err(function () {
      expect(null).to.be.within(0, 1, 'blah');
    }, "blah: expected null to be a number or a date");

    err(function () {
      expect(null, 'blah').to.be.within(0, 1);
    }, "blah: expected null to be a number or a date");

    err(function () {
      expect(1).to.be.within(null, 1, 'blah');
    }, "blah: the arguments to within must be numbers");

    err(function () {
      expect(1, 'blah').to.be.within(null, 1);
    }, "blah: the arguments to within must be numbers");

    err(function () {
      expect(1).to.be.within(0, null, 'blah');
    }, "blah: the arguments to within must be numbers");

    err(function () {
      expect(1, 'blah').to.be.within(0, null);
    }, "blah: the arguments to within must be numbers");

    err(function () {
      expect(null).to.not.be.within(0, 1, 'blah');
    }, "blah: expected null to be a number or a date");

    err(function () {
      expect(1).to.not.be.within(null, 1, 'blah');
    }, "blah: the arguments to within must be numbers");

    err(function () {
      expect(1).to.not.be.within(0, null, 'blah');
    }, "blah: the arguments to within must be numbers");

    err(function () {
      expect(1).to.have.length.within(5, 7, 'blah');
    }, "blah: expected 1 to have property 'length'");

    err(function () {
      expect(1, 'blah').to.have.length.within(5, 7);
    }, "blah: expected 1 to have property 'length'");

    err(function () {
      expect(1).to.have.lengthOf.within(5, 7, 'blah');
    }, "blah: expected 1 to have property 'length'");

    if (typeof Map === 'function') {
      expect(new Map).to.have.length.within(0, 0);
      expect(new Map).to.have.lengthOf.within(0, 0);

      var map = new Map;
      map.set('a', 1);
      map.set('b', 2);
      map.set('c', 3);

      expect(map).to.have.length.within(2, 4);
      expect(map).to.have.lengthOf.within(2, 4);

      err(function () {
        expect(map).to.have.length.within(5, 7, 'blah');
      }, "blah: expected Map{ 'a' => 1, 'b' => 2, 'c' => 3 } to have a size within 5..7");

      err(function () {
        expect(map).to.have.lengthOf.within(5, 7, 'blah');
      }, "blah: expected Map{ 'a' => 1, 'b' => 2, 'c' => 3 } to have a size within 5..7");
    }

    if (typeof Set === 'function') {
      expect(new Set).to.have.length.within(0, 0);
      expect(new Set).to.have.lengthOf.within(0, 0);

      var set = new Set;
      set.add(1);
      set.add(2);
      set.add(3);

      expect(set).to.have.length.within(2, 4);
      expect(set).to.have.lengthOf.within(2, 4);

      err(function () {
        expect(set).to.have.length.within(5, 7, 'blah');
      }, "blah: expected Set{ 1, 2, 3 } to have a size within 5..7");

      err(function () {
        expect(set).to.have.lengthOf.within(5, 7, 'blah');
      }, "blah: expected Set{ 1, 2, 3 } to have a size within 5..7");
    }
  });

  it('within(start, finish) (dates)', function(){
    var now = new Date();
    var oneSecondAgo = new Date(now.getTime() - 1000);
    var oneSecondAfter = new Date(now.getTime() + 1000);
    var nowISO = now.toISOString();
    var beforeISO = oneSecondAgo.toISOString();
    var afterISO = oneSecondAfter.toISOString();

    expect(now).to.be.within(oneSecondAgo, oneSecondAfter);
    expect(now).to.be.within(now, oneSecondAfter);
    expect(now).to.be.within(now, now);
    expect(oneSecondAgo).to.not.be.within(now, oneSecondAfter);

    err(function(){
      expect(now).to.not.be.within(now, oneSecondAfter, 'blah');
    }, "blah: expected " + nowISO + " to not be within " + nowISO + ".." + afterISO);

    err(function(){
      expect(now, 'blah').to.not.be.within(oneSecondAgo, oneSecondAfter);
    }, "blah: expected " + nowISO + " to not be within " + beforeISO + ".." + afterISO);

    err(function () {
      expect(now).to.have.length.within(5, 7, 'blah');
    }, "blah: expected " + nowISO + " to have property 'length'");

    err(function () {
      expect('foo').to.have.lengthOf.within(now, 7, 'blah');
    }, "blah: the arguments to within must be numbers");

    err(function () {
      expect(now).to.be.within(now, 1, 'blah');
    }, "blah: the arguments to within must be dates");

    err(function () {
      expect(now).to.be.within(null, now, 'blah');
    }, "blah: the arguments to within must be dates");

    err(function () {
      expect(now).to.be.within(now, undefined, 'blah');
    }, "blah: the arguments to within must be dates");

    err(function () {
      expect(now, 'blah').to.be.within(1, now);
    }, "blah: the arguments to within must be dates");

    err(function () {
      expect(now, 'blah').to.be.within(now, 1);
    }, "blah: the arguments to within must be dates");

    err(function () {
      expect(null).to.not.be.within(now, oneSecondAfter, 'blah');
    }, "blah: expected null to be a number or a date");
  });

  it('above(n)', function(){
    expect(5).to.be.above(2);
    expect(5).to.be.greaterThan(2);
    expect(5).to.not.be.above(5);
    expect(5).to.not.be.above(6);
    expect('foo').to.have.length.above(2);
    expect('foo').to.have.lengthOf.above(2);
    expect([ 1, 2, 3 ]).to.have.length.above(2);
    expect([ 1, 2, 3 ]).to.have.lengthOf.above(2);

    err(function(){
      expect(5).to.be.above(6, 'blah');
    }, "blah: expected 5 to be above 6");

    err(function(){
      expect(5, 'blah').to.be.above(6);
    }, "blah: expected 5 to be above 6");

    err(function(){
      expect(10).to.not.be.above(6, 'blah');
    }, "blah: expected 10 to be at most 6");

    err(function () {
      expect('foo').to.have.length.above(4, 'blah');
    }, "blah: expected \'foo\' to have a length above 4 but got 3");

    err(function () {
      expect('foo', 'blah').to.have.length.above(4);
    }, "blah: expected \'foo\' to have a length above 4 but got 3");

    err(function () {
      expect('foo').to.have.lengthOf.above(4, 'blah');
    }, "blah: expected \'foo\' to have a length above 4 but got 3");

    err(function () {
      expect([ 1, 2, 3 ]).to.have.length.above(4, 'blah');
    }, "blah: expected [ 1, 2, 3 ] to have a length above 4 but got 3");

    err(function () {
      expect([ 1, 2, 3 ]).to.have.lengthOf.above(4, 'blah');
    }, "blah: expected [ 1, 2, 3 ] to have a length above 4 but got 3");

    err(function () {
      expect(null).to.be.above(0, 'blah');
    }, "blah: expected null to be a number or a date");

    err(function () {
      expect(null, 'blah').to.be.above(0);
    }, "blah: expected null to be a number or a date");

    err(function () {
      expect(1).to.be.above(null, 'blah');
    }, "blah: the argument to above must be a number");

    err(function () {
      expect(1, 'blah').to.be.above(null);
    }, "blah: the argument to above must be a number");

    err(function () {
      expect(null).to.not.be.above(0, 'blah');
    }, "blah: expected null to be a number or a date");

    err(function () {
      expect(1).to.not.be.above(null, 'blah');
    }, "blah: the argument to above must be a number");

    err(function () {
      expect(1).to.have.length.above(0, 'blah');
    }, "blah: expected 1 to have property 'length'");

    err(function () {
      expect(1, 'blah').to.have.length.above(0);
    }, "blah: expected 1 to have property 'length'");

    err(function () {
      expect(1).to.have.lengthOf.above(0, 'blah');
    }, "blah: expected 1 to have property 'length'");

    if (typeof Map === 'function') {
      expect(new Map).to.have.length.above(-1);
      expect(new Map).to.have.lengthOf.above(-1);

      var map = new Map;
      map.set('a', 1);
      map.set('b', 2);
      map.set('c', 3);

      expect(map).to.have.length.above(2);
      expect(map).to.have.lengthOf.above(2);

      err(function () {
        expect(map).to.have.length.above(5, 'blah');
      }, "blah: expected Map{ 'a' => 1, 'b' => 2, 'c' => 3 } to have a size above 5 but got 3");

      err(function () {
        expect(map).to.have.lengthOf.above(5, 'blah');
      }, "blah: expected Map{ 'a' => 1, 'b' => 2, 'c' => 3 } to have a size above 5 but got 3");
    }

    if (typeof Set === 'function') {
      expect(new Set).to.have.length.above(-1);
      expect(new Set).to.have.lengthOf.above(-1);

      var set = new Set;
      set.add(1);
      set.add(2);
      set.add(3);

      expect(set).to.have.length.above(2);
      expect(set).to.have.lengthOf.above(2);

      err(function () {
        expect(set).to.have.length.above(5, 'blah');
      }, "blah: expected Set{ 1, 2, 3 } to have a size above 5 but got 3");

      err(function () {
        expect(set).to.have.lengthOf.above(5, 'blah');
      }, "blah: expected Set{ 1, 2, 3 } to have a size above 5 but got 3");
    }
  });

  it('above(n) (dates)', function(){
    var now = new Date();
    var oneSecondAgo = new Date(now.getTime() - 1000);
    var oneSecondAfter = new Date(now.getTime() + 1000);

    expect(now).to.be.above(oneSecondAgo);
    expect(now).to.be.greaterThan(oneSecondAgo);
    expect(now).to.not.be.above(now);
    expect(now).to.not.be.above(oneSecondAfter);

    err(function(){
      expect(now).to.be.above(oneSecondAfter, 'blah');
    }, "blah: expected " + now.toISOString() + " to be above " + oneSecondAfter.toISOString());

    err(function(){
      expect(10).to.not.be.above(6, 'blah');
    }, "blah: expected 10 to be at most 6");

    err(function () {
      expect(now).to.have.length.above(4, 'blah');
    }, "blah: expected " +  now.toISOString() + " to have property 'length'");

    err(function () {
      expect([ 1, 2, 3 ]).to.have.length.above(now, 'blah');
    }, "blah: the argument to above must be a number");

    err(function () {
      expect(null).to.be.above(now, 'blah');
    }, "blah: expected null to be a number or a date");

    err(function () {
      expect(now).to.be.above(null, 'blah');
    }, "blah: the argument to above must be a date");

    err(function () {
      expect(null).to.have.length.above(0, 'blah');
    }, "blah: Target cannot be null or undefined.");
  });

  it('least(n)', function(){
    expect(5).to.be.at.least(2);
    expect(5).to.be.at.least(5);
    expect(5).to.not.be.at.least(6);
    expect('foo').to.have.length.of.at.least(2);
    expect('foo').to.have.lengthOf.at.least(2);
    expect([ 1, 2, 3 ]).to.have.length.of.at.least(2);
    expect([ 1, 2, 3 ]).to.have.lengthOf.at.least(2);

    err(function(){
      expect(5).to.be.at.least(6, 'blah');
    }, "blah: expected 5 to be at least 6");

    err(function(){
      expect(5, 'blah').to.be.at.least(6);
    }, "blah: expected 5 to be at least 6");

    err(function(){
      expect(10).to.not.be.at.least(6, 'blah');
    }, "blah: expected 10 to be below 6");

    err(function () {
      expect('foo').to.have.length.of.at.least(4, 'blah');
    }, "blah: expected \'foo\' to have a length at least 4 but got 3");

    err(function () {
      expect('foo', 'blah').to.have.length.of.at.least(4);
    }, "blah: expected \'foo\' to have a length at least 4 but got 3");

    err(function () {
      expect('foo').to.have.lengthOf.at.least(4, 'blah');
    }, "blah: expected \'foo\' to have a length at least 4 but got 3");

    err(function () {
      expect([ 1, 2, 3 ]).to.have.length.of.at.least(4, 'blah');
    }, "blah: expected [ 1, 2, 3 ] to have a length at least 4 but got 3");

    err(function () {
      expect([ 1, 2, 3 ]).to.have.lengthOf.at.least(4, 'blah');
    }, "blah: expected [ 1, 2, 3 ] to have a length at least 4 but got 3");

    err(function () {
      expect([ 1, 2, 3, 4 ]).to.not.have.length.of.at.least(4, 'blah');
    }, "blah: expected [ 1, 2, 3, 4 ] to have a length below 4");

    err(function () {
      expect([ 1, 2, 3, 4 ]).to.not.have.lengthOf.at.least(4, 'blah');
    }, "blah: expected [ 1, 2, 3, 4 ] to have a length below 4");

    err(function () {
      expect(null).to.be.at.least(0, 'blah');
    }, "blah: expected null to be a number or a date");

    err(function () {
      expect(null, 'blah').to.be.at.least(0);
    }, "blah: expected null to be a number or a date");

    err(function () {
      expect(1).to.be.at.least(null, 'blah');
    }, "blah: the argument to least must be a number");

    err(function () {
      expect(1, 'blah').to.be.at.least(null);
    }, "blah: the argument to least must be a number");

    err(function () {
      expect(null).to.not.be.at.least(0, 'blah');
    }, "blah: expected null to be a number or a date");

    err(function () {
      expect(1).to.not.be.at.least(null, 'blah');
    }, "blah: the argument to least must be a number");

    err(function () {
      expect(1).to.have.length.at.least(0, 'blah');
    }, "blah: expected 1 to have property 'length'");

    err(function () {
      expect(1, 'blah').to.have.length.at.least(0);
    }, "blah: expected 1 to have property 'length'");

    err(function () {
      expect(1).to.have.lengthOf.at.least(0, 'blah');
    }, "blah: expected 1 to have property 'length'");

    if (typeof Map === 'function') {
      expect(new Map).to.have.length.of.at.least(0);
      expect(new Map).to.have.lengthOf.at.least(0);

      var map = new Map;
      map.set('a', 1);
      map.set('b', 2);
      map.set('c', 3);

      expect(map).to.have.length.of.at.least(3);
      expect(map).to.have.lengthOf.at.least(3);

      err(function () {
        expect(map).to.have.length.of.at.least(4, 'blah');
      }, "blah: expected Map{ 'a' => 1, 'b' => 2, 'c' => 3 } to have a size at least 4 but got 3");

      err(function () {
        expect(map).to.have.lengthOf.at.least(4, 'blah');
      }, "blah: expected Map{ 'a' => 1, 'b' => 2, 'c' => 3 } to have a size at least 4 but got 3");
    }

    if (typeof Set === 'function') {
      expect(new Set).to.have.length.of.at.least(0);
      expect(new Set).to.have.lengthOf.at.least(0);

      var set = new Set;
      set.add(1);
      set.add(2);
      set.add(3);

      expect(set).to.have.length.of.at.least(3);
      expect(set).to.have.lengthOf.at.least(3);

      err(function () {
        expect(set).to.have.length.of.at.least(4, 'blah');
      }, "blah: expected Set{ 1, 2, 3 } to have a size at least 4 but got 3");

      err(function () {
        expect(set).to.have.lengthOf.at.least(4, 'blah');
      }, "blah: expected Set{ 1, 2, 3 } to have a size at least 4 but got 3");
    }
  });

  it('below(n)', function(){
    expect(2).to.be.below(5);
    expect(2).to.be.lessThan(5);
    expect(2).to.not.be.below(2);
    expect(2).to.not.be.below(1);
    expect('foo').to.have.length.below(4);
    expect('foo').to.have.lengthOf.below(4);
    expect([ 1, 2, 3 ]).to.have.length.below(4);
    expect([ 1, 2, 3 ]).to.have.lengthOf.below(4);

    err(function(){
      expect(6).to.be.below(5, 'blah');
    }, "blah: expected 6 to be below 5");

    err(function(){
      expect(6, 'blah').to.be.below(5);
    }, "blah: expected 6 to be below 5");

    err(function(){
      expect(6).to.not.be.below(10, 'blah');
    }, "blah: expected 6 to be at least 10");

    err(function () {
      expect('foo').to.have.length.below(2, 'blah');
    }, "blah: expected \'foo\' to have a length below 2 but got 3");

    err(function () {
      expect('foo', 'blah').to.have.length.below(2);
    }, "blah: expected \'foo\' to have a length below 2 but got 3");

    err(function () {
      expect('foo').to.have.lengthOf.below(2, 'blah');
    }, "blah: expected \'foo\' to have a length below 2 but got 3");

    err(function () {
      expect([ 1, 2, 3 ]).to.have.length.below(2, 'blah');
    }, "blah: expected [ 1, 2, 3 ] to have a length below 2 but got 3");

    err(function () {
      expect([ 1, 2, 3 ]).to.have.lengthOf.below(2, 'blah');
    }, "blah: expected [ 1, 2, 3 ] to have a length below 2 but got 3");

    err(function () {
      expect(null).to.be.below(0, 'blah');
    }, "blah: expected null to be a number or a date");

    err(function () {
      expect(null, 'blah').to.be.below(0);
    }, "blah: expected null to be a number or a date");

    err(function () {
      expect(1).to.be.below(null, 'blah');
    }, "blah: the argument to below must be a number");

    err(function () {
      expect(1, 'blah').to.be.below(null);
    }, "blah: the argument to below must be a number");

    err(function () {
      expect(null).to.not.be.below(0, 'blah');
    }, "blah: expected null to be a number or a date");

    err(function () {
      expect(1).to.not.be.below(null, 'blah');
    }, "blah: the argument to below must be a number");

    err(function () {
      expect(1).to.have.length.below(0, 'blah');
    }, "blah: expected 1 to have property 'length'");

    err(function () {
      expect(1, 'blah').to.have.length.below(0);
    }, "blah: expected 1 to have property 'length'");

    err(function () {
      expect(1).to.have.lengthOf.below(0, 'blah');
    }, "blah: expected 1 to have property 'length'");

    if (typeof Map === 'function') {
      expect(new Map).to.have.length.below(1);
      expect(new Map).to.have.lengthOf.below(1);

      var map = new Map;
      map.set('a', 1);
      map.set('b', 2);
      map.set('c', 3);

      expect(map).to.have.length.below(4);
      expect(map).to.have.lengthOf.below(4);

      err(function () {
        expect(map).to.have.length.below(2, 'blah');
      }, "blah: expected Map{ 'a' => 1, 'b' => 2, 'c' => 3 } to have a size below 2 but got 3");

      err(function () {
        expect(map).to.have.lengthOf.below(2, 'blah');
      }, "blah: expected Map{ 'a' => 1, 'b' => 2, 'c' => 3 } to have a size below 2 but got 3");
    }

    if (typeof Set === 'function') {
      expect(new Set).to.have.length.below(1);
      expect(new Set).to.have.lengthOf.below(1);

      var set = new Set;
      set.add(1);
      set.add(2);
      set.add(3);

      expect(set).to.have.length.below(4);
      expect(set).to.have.lengthOf.below(4);

      err(function () {
        expect(set).to.have.length.below(2, 'blah');
      }, "blah: expected Set{ 1, 2, 3 } to have a size below 2 but got 3");

      err(function () {
        expect(set).to.have.lengthOf.below(2, 'blah');
      }, "blah: expected Set{ 1, 2, 3 } to have a size below 2 but got 3");
    }
  });

  it('below(n) (dates)', function(){
    var now = new Date();
    var oneSecondAgo = new Date(now.getTime() - 1000);
    var oneSecondAfter = new Date(now.getTime() + 1000);

    expect(now).to.be.below(oneSecondAfter);
    expect(oneSecondAgo).to.be.lessThan(now);
    expect(now).to.not.be.below(oneSecondAgo);
    expect(oneSecondAfter).to.not.be.below(oneSecondAgo);

    err(function(){
      expect(now).to.be.below(oneSecondAgo, 'blah');
    }, "blah: expected " + now.toISOString() + " to be below " + oneSecondAgo.toISOString());

    err(function(){
      expect(now).to.not.be.below(oneSecondAfter, 'blah');
    }, "blah: expected " + now.toISOString() + " to be at least " + oneSecondAfter.toISOString());

    err(function () {
      expect('foo').to.have.length.below(2, 'blah');
    }, "blah: expected \'foo\' to have a length below 2 but got 3");

    err(function () {
      expect(null).to.be.below(now, 'blah');
    }, "blah: expected null to be a number or a date");

    err(function () {
      expect(1).to.be.below(null, 'blah');
    }, "blah: the argument to below must be a number");

    err(function () {
      expect(now).to.not.be.below(null, 'blah');
    }, "blah: the argument to below must be a date");

    err(function () {
      expect(now).to.have.length.below(0, 'blah');
    }, "blah: expected " + now.toISOString() + " to have property 'length'");

    err(function () {
      expect('asdasd').to.have.length.below(now, 'blah');
    }, "blah: the argument to below must be a number");
  });

  it('most(n)', function(){
    expect(2).to.be.at.most(5);
    expect(2).to.be.at.most(2);
    expect(2).to.not.be.at.most(1);
    expect('foo').to.have.length.of.at.most(4);
    expect('foo').to.have.lengthOf.at.most(4);
    expect([ 1, 2, 3 ]).to.have.length.of.at.most(4);
    expect([ 1, 2, 3 ]).to.have.lengthOf.at.most(4);

    err(function(){
      expect(6).to.be.at.most(5, 'blah');
    }, "blah: expected 6 to be at most 5");

    err(function(){
      expect(6, 'blah').to.be.at.most(5);
    }, "blah: expected 6 to be at most 5");

    err(function(){
      expect(6).to.not.be.at.most(10, 'blah');
    }, "blah: expected 6 to be above 10");

    err(function () {
      expect('foo').to.have.length.of.at.most(2, 'blah');
    }, "blah: expected \'foo\' to have a length at most 2 but got 3");

    err(function () {
      expect('foo', 'blah').to.have.length.of.at.most(2);
    }, "blah: expected \'foo\' to have a length at most 2 but got 3");

    err(function () {
      expect('foo').to.have.lengthOf.at.most(2, 'blah');
    }, "blah: expected \'foo\' to have a length at most 2 but got 3");

    err(function () {
      expect([ 1, 2, 3 ]).to.have.length.of.at.most(2, 'blah');
    }, "blah: expected [ 1, 2, 3 ] to have a length at most 2 but got 3");

    err(function () {
      expect([ 1, 2, 3 ]).to.have.lengthOf.at.most(2, 'blah');
    }, "blah: expected [ 1, 2, 3 ] to have a length at most 2 but got 3");

    err(function () {
      expect([ 1, 2 ]).to.not.have.length.of.at.most(2, 'blah');
    }, "blah: expected [ 1, 2 ] to have a length above 2");

    err(function () {
      expect([ 1, 2 ]).to.not.have.lengthOf.at.most(2, 'blah');
    }, "blah: expected [ 1, 2 ] to have a length above 2");

    err(function () {
      expect(null).to.be.at.most(0, 'blah');
    }, "blah: expected null to be a number or a date");

    err(function () {
      expect(null, 'blah').to.be.at.most(0);
    }, "blah: expected null to be a number or a date");

    err(function () {
      expect(1).to.be.at.most(null, 'blah');
    }, "blah: the argument to most must be a number");

    err(function () {
      expect(1, 'blah').to.be.at.most(null);
    }, "blah: the argument to most must be a number");

    err(function () {
      expect(null).to.not.be.at.most(0, 'blah');
    }, "blah: expected null to be a number or a date");

    err(function () {
      expect(1).to.not.be.at.most(null, 'blah');
    }, "blah: the argument to most must be a number");

    err(function () {
      expect(1).to.have.length.of.at.most(0, 'blah');
    }, "blah: expected 1 to have property 'length'");

    err(function () {
      expect(1, 'blah').to.have.length.of.at.most(0);
    }, "blah: expected 1 to have property 'length'");

    err(function () {
      expect(1).to.have.lengthOf.at.most(0, 'blah');
    }, "blah: expected 1 to have property 'length'");

    if (typeof Map === 'function') {
      expect(new Map).to.have.length.of.at.most(0);
      expect(new Map).to.have.lengthOf.at.most(0);

      var map = new Map;
      map.set('a', 1);
      map.set('b', 2);
      map.set('c', 3);

      expect(map).to.have.length.of.at.most(3);
      expect(map).to.have.lengthOf.at.most(3);

      err(function () {
        expect(map).to.have.length.of.at.most(2, 'blah');
      }, "blah: expected Map{ 'a' => 1, 'b' => 2, 'c' => 3 } to have a size at most 2 but got 3");

      err(function () {
        expect(map).to.have.lengthOf.at.most(2, 'blah');
      }, "blah: expected Map{ 'a' => 1, 'b' => 2, 'c' => 3 } to have a size at most 2 but got 3");
    }

    if (typeof Set === 'function') {
      expect(new Set).to.have.length.of.at.most(0);
      expect(new Set).to.have.lengthOf.at.most(0);

      var set = new Set;
      set.add(1);
      set.add(2);
      set.add(3);

      expect(set).to.have.length.of.at.most(3);
      expect(set).to.have.lengthOf.at.most(3);

      err(function () {
        expect(set).to.have.length.of.at.most(2, 'blah');
      }, "blah: expected Set{ 1, 2, 3 } to have a size at most 2 but got 3");

      err(function () {
        expect(set).to.have.lengthOf.at.most(2, 'blah');
      }, "blah: expected Set{ 1, 2, 3 } to have a size at most 2 but got 3");
    }
  });

  it('most(n) (dates)', function(){
    var now = new Date();
    var oneSecondBefore = new Date(now.getTime() - 1000);
    var oneSecondAfter = new Date(now.getTime() + 1000);
    var nowISO = now.toISOString();
    var beforeISO = oneSecondBefore.toISOString();
    var afterISO = oneSecondAfter.toISOString();

    expect(now).to.be.at.most(oneSecondAfter);
    expect(now).to.be.at.most(now);
    expect(now).to.not.be.at.most(oneSecondBefore);

    err(function(){
      expect(now).to.be.at.most(oneSecondBefore, 'blah');
    }, "blah: expected " + nowISO + " to be at most " + beforeISO);

    err(function(){
      expect(now).to.not.be.at.most(now, 'blah');
    }, "blah: expected " + nowISO + " to be above " + nowISO);

    err(function () {
      expect(now).to.have.length.of.at.most(2, 'blah');
    }, "blah: expected " + nowISO + " to have property 'length'");

    err(function () {
      expect('foo', 'blah').to.have.length.of.at.most(now);
    }, "blah: the argument to most must be a number");

    err(function () {
      expect([ 1, 2, 3 ]).to.not.have.length.of.at.most(now, 'blah');
    }, "blah: the argument to most must be a number");

    err(function () {
      expect(null).to.be.at.most(now, 'blah');
    }, "blah: expected null to be a number or a date");

    err(function () {
      expect(now, 'blah').to.be.at.most(null);
    }, "blah: the argument to most must be a date");

    err(function () {
      expect(1).to.be.at.most(now, 'blah');
    }, "blah: the argument to most must be a number");

    err(function () {
      expect(now, 'blah').to.be.at.most(1);
    }, "blah: the argument to most must be a date");

    err(function () {
      expect(now).to.not.be.at.most(undefined, 'blah');
    }, "blah: the argument to most must be a date");
  });

  it('match(regexp)', function(){
    expect('foobar').to.match(/^foo/)
    expect('foobar').to.matches(/^foo/)
    expect('foobar').to.not.match(/^bar/)

    err(function(){
      expect('foobar').to.match(/^bar/i, 'blah')
    }, "blah: expected 'foobar' to match /^bar/i");

    err(function(){
      expect('foobar', 'blah').to.match(/^bar/i)
    }, "blah: expected 'foobar' to match /^bar/i");

    err(function(){
      expect('foobar').to.matches(/^bar/i, 'blah')
    }, "blah: expected 'foobar' to match /^bar/i");

    err(function(){
      expect('foobar').to.not.match(/^foo/i, 'blah')
    }, "blah: expected 'foobar' not to match /^foo/i");
  });

  it('lengthOf(n)', function(){
    expect('test').to.have.length(4);
    expect('test').to.have.lengthOf(4);
    expect('test').to.not.have.length(3);
    expect('test').to.not.have.lengthOf(3);
    expect([1,2,3]).to.have.length(3);
    expect([1,2,3]).to.have.lengthOf(3);

    err(function(){
      expect(4).to.have.length(3, 'blah');
    }, 'blah: expected 4 to have property \'length\'');

    err(function(){
      expect(4, 'blah').to.have.length(3);
    }, 'blah: expected 4 to have property \'length\'');

    err(function(){
      expect(4).to.have.lengthOf(3, 'blah');
    }, 'blah: expected 4 to have property \'length\'');

    err(function(){
      expect('asd').to.not.have.length(3, 'blah');
    }, "blah: expected 'asd' to not have a length of 3");

    err(function(){
      expect('asd').to.not.have.lengthOf(3, 'blah');
    }, "blah: expected 'asd' to not have a length of 3");

    if (typeof Map === 'function') {
      expect(new Map).to.have.length(0);
      expect(new Map).to.have.lengthOf(0);

      var map = new Map;
      map.set('a', 1);
      map.set('b', 2);
      map.set('c', 3);

      expect(map).to.have.length(3);
      expect(map).to.have.lengthOf(3);

      err(function(){
        expect(map).to.not.have.length(3, 'blah');
      }, "blah: expected Map{ 'a' => 1, 'b' => 2, 'c' => 3 } to not have a size of 3");

      err(function(){
        expect(map).to.not.have.lengthOf(3, 'blah');
      }, "blah: expected Map{ 'a' => 1, 'b' => 2, 'c' => 3 } to not have a size of 3");
    }

    if (typeof Set === 'function') {
      expect(new Set).to.have.length(0);
      expect(new Set).to.have.lengthOf(0);

      var set = new Set;
      set.add(1);
      set.add(2);
      set.add(3);

      expect(set).to.have.length(3);
      expect(set).to.have.lengthOf(3);

      err(function(){
        expect(set).to.not.have.length(3, 'blah');
      }, "blah: expected Set{ 1, 2, 3 } to not have a size of 3");

      err(function(){
        expect(set).to.not.have.lengthOf(3, 'blah');;
      }, "blah: expected Set{ 1, 2, 3 } to not have a size of 3");
    }
  });

  it('eql(val)', function(){
    expect('test').to.eql('test');
    expect({ foo: 'bar' }).to.eql({ foo: 'bar' });
    expect(1).to.eql(1);
    expect('4').to.not.eql(4);

    if (typeof Symbol === 'function') {
      var sym = Symbol();
      expect(sym).to.eql(sym);
    }

    err(function(){
      expect(4).to.eql(3, 'blah');
    }, 'blah: expected 4 to deeply equal 3');
  });

  if ('undefined' !== typeof Buffer) {
    it('Buffer eql()', function () {
      expect(Buffer.from([ 1 ])).to.eql(Buffer.from([ 1 ]));

      err(function () {
        expect(Buffer.from([ 0 ])).to.eql(Buffer.from([ 1 ]));
      }, 'expected Buffer[ 0 ] to deeply equal Buffer[ 1 ]');
    });
  }

  it('equal(val)', function(){
    expect('test').to.equal('test');
    expect(1).to.equal(1);

    if (typeof Symbol === 'function') {
      var sym = Symbol();
      expect(sym).to.equal(sym);
    }

    err(function(){
      expect(4).to.equal(3, 'blah');
    }, 'blah: expected 4 to equal 3');

    err(function(){
      expect(4, 'blah').to.equal(3);
    }, 'blah: expected 4 to equal 3');

    err(function(){
      expect('4').to.equal(4, 'blah');
    }, "blah: expected '4' to equal 4");
  });

  it('deep.equal(val)', function(){
    expect({ foo: 'bar' }).to.deep.equal({ foo: 'bar' });
    expect({ foo: 'bar' }).not.to.deep.equal({ foo: 'baz' });

    err(function(){
      expect({foo: 'bar'}).to.deep.equal({foo: 'baz'}, 'blah');
    }, "blah: expected { foo: 'bar' } to deeply equal { foo: 'baz' }");

    err(function(){
      expect({foo: 'bar'}, 'blah').to.deep.equal({foo: 'baz'});
    }, "blah: expected { foo: 'bar' } to deeply equal { foo: 'baz' }");

    err(function(){
      expect({foo: 'bar'}).to.not.deep.equal({foo: 'bar'}, 'blah');
    }, "blah: expected { foo: 'bar' } to not deeply equal { foo: 'bar' }");

    err(function(){
      expect({foo: 'bar'}, 'blah').to.not.deep.equal({foo: 'bar'});
    }, "blah: expected { foo: 'bar' } to not deeply equal { foo: 'bar' }");
  });

  it('deep.equal(/regexp/)', function(){
    expect(/a/).to.deep.equal(/a/);
    expect(/a/).not.to.deep.equal(/b/);
    expect(/a/).not.to.deep.equal({});
    expect(/a/g).to.deep.equal(/a/g);
    expect(/a/g).not.to.deep.equal(/b/g);
    expect(/a/i).to.deep.equal(/a/i);
    expect(/a/i).not.to.deep.equal(/b/i);
    expect(/a/m).to.deep.equal(/a/m);
    expect(/a/m).not.to.deep.equal(/b/m);
  });

  it('deep.equal(Date)', function(){
    var a = new Date(1, 2, 3)
      , b = new Date(4, 5, 6);
    expect(a).to.deep.equal(a);
    expect(a).not.to.deep.equal(b);
    expect(a).not.to.deep.equal({});
  });

  it('deep.equal(Symbol)', function () {
    var symb = Symbol('a');
    var a = { [symb]: 'b' }
      , b = { [symb]: 'b' };
    expect(a).to.deep.equal(a);
    expect(a).to.deep.equal(b);

    var symb2 = Symbol('c');
    var c = { [symb]: { [symb2]: 'c' } }
      , d = { [symb]: { [symb2]: 'b' } };
    expect(c).to.deep.equal(c);
    expect(d).to.not.deep.equal(c);

    var symb3 = Symbol('d');
    var e = { [symb]: { [symb3]: 'b' } };
    expect(d).to.not.deep.equal(e);

    var f = { [symb]: { [symb3]: 'b' } };
    expect(e).to.deep.equal(f);
  });

  it('empty', function(){
    function FakeArgs() {};
    FakeArgs.prototype.length = 0;

    expect('').to.be.empty;
    expect('foo').not.to.be.empty;
    expect([]).to.be.empty;
    expect(['foo']).not.to.be.empty;
    expect(new FakeArgs).to.be.empty;
    expect({arguments: 0}).not.to.be.empty;
    expect({}).to.be.empty;
    expect({foo: 'bar'}).not.to.be.empty;

    if (typeof WeakMap === 'function') {
      err(function(){
        expect(new WeakMap, 'blah').not.to.be.empty;
      }, "blah: .empty was passed a weak collection");
    }

    if (typeof WeakSet === 'function') {
      err(function(){
        expect(new WeakSet, 'blah').not.to.be.empty;
      }, "blah: .empty was passed a weak collection");
    }

    if (typeof Map === 'function') {
      expect(new Map).to.be.empty;

      // Not using Map constructor args because not supported in IE 11.
      var map = new Map;
      map.set('a', 1);
      expect(map).not.to.be.empty;

      err(function(){
        expect(new Map).not.to.be.empty;
      }, "expected Map{} not to be empty");

      map = new Map;
      map.key = 'val';
      expect(map).to.be.empty;

      err(function(){
        expect(map).not.to.be.empty;
      }, "expected Map{} not to be empty");
    }

    if (typeof Set === 'function') {
      expect(new Set).to.be.empty;

      // Not using Set constructor args because not supported in IE 11.
      var set = new Set;
      set.add(1);
      expect(set).not.to.be.empty;

      err(function(){
        expect(new Set).not.to.be.empty;
      }, "expected Set{} not to be empty");

      set = new Set;
      set.key = 'val';
      expect(set).to.be.empty;

      err(function(){
        expect(set).not.to.be.empty;
      }, "expected Set{} not to be empty");
    }

    err(function(){
      expect('', 'blah').not.to.be.empty;
    }, "blah: expected \'\' not to be empty");

    err(function(){
      expect('foo').to.be.empty;
    }, "expected \'foo\' to be empty");

    err(function(){
      expect([]).not.to.be.empty;
    }, "expected [] not to be empty");

    err(function(){
      expect(['foo']).to.be.empty;
    }, "expected [ \'foo\' ] to be empty");

    err(function(){
      expect(new FakeArgs).not.to.be.empty;
    }, "expected FakeArgs{} not to be empty");

    err(function(){
      expect({arguments: 0}).to.be.empty;
    }, "expected { arguments: +0 } to be empty");

    err(function(){
      expect({}).not.to.be.empty;
    }, "expected {} not to be empty");

    err(function(){
      expect({foo: 'bar'}).to.be.empty;
    }, "expected { foo: \'bar\' } to be empty");

    err(function(){
      expect(null, 'blah').to.be.empty;
    }, "blah: .empty was passed non-string primitive null");

    err(function(){
      expect(undefined).to.be.empty;
    }, ".empty was passed non-string primitive undefined");

    err(function(){
      expect().to.be.empty;
    }, ".empty was passed non-string primitive undefined");

    err(function(){
      expect(null).to.not.be.empty;
    }, ".empty was passed non-string primitive null");

    err(function(){
      expect(undefined).to.not.be.empty;
    }, ".empty was passed non-string primitive undefined");

    err(function(){
      expect().to.not.be.empty;
    }, ".empty was passed non-string primitive undefined");

    err(function(){
      expect(0).to.be.empty;
    }, ".empty was passed non-string primitive +0");

    err(function(){
      expect(1).to.be.empty;
    }, ".empty was passed non-string primitive 1");

    err(function(){
      expect(true).to.be.empty;
    }, ".empty was passed non-string primitive true");

    err(function(){
      expect(false).to.be.empty;
    }, ".empty was passed non-string primitive false");

    if (typeof Symbol !== 'undefined') {
      err(function(){
        expect(Symbol()).to.be.empty;
      }, ".empty was passed non-string primitive Symbol()");

      err(function(){
        expect(Symbol.iterator).to.be.empty;
      }, ".empty was passed non-string primitive Symbol(Symbol.iterator)");
    }

    err(function(){
      expect(function() {}, 'blah').to.be.empty;
    }, "blah: .empty was passed a function");

    if (FakeArgs.name === 'FakeArgs') {
      err(function(){
        expect(FakeArgs).to.be.empty;
      }, ".empty was passed a function FakeArgs");
    }
  });

  it('NaN', function() {
    expect(NaN).to.be.NaN;

    expect(undefined).not.to.be.NaN;
    expect(Infinity).not.to.be.NaN;
    expect('foo').not.to.be.NaN;
    expect({}).not.to.be.NaN;
    expect(4).not.to.be.NaN;
    expect([]).not.to.be.NaN;

    err(function(){
      expect(NaN, 'blah').not.to.be.NaN;
    }, "blah: expected NaN not to be NaN");

    err(function(){
      expect(undefined).to.be.NaN;
    }, "expected undefined to be NaN");

    err(function(){
      expect(Infinity).to.be.NaN;
    }, "expected Infinity to be NaN");

    err(function(){
      expect('foo').to.be.NaN;
    }, "expected 'foo' to be NaN");

    err(function(){
      expect({}).to.be.NaN;
    }, "expected {} to be NaN");

    err(function(){
      expect(4).to.be.NaN;
    }, "expected 4 to be NaN");

    err(function(){
      expect([]).to.be.NaN;
    }, "expected [] to be NaN");
  });

  it('finite', function() {
    expect(4).to.be.finite;
    expect(-10).to.be.finite;

    err(function(){
      expect(NaN, 'blah').to.be.finite;
    }, "blah: expected NaN to be a finite number");

    err(function(){
      expect(Infinity).to.be.finite;
    }, "expected Infinity to be a finite number");

    err(function(){
      expect('foo').to.be.finite;
    }, "expected \'foo\' to be a finite number");

    err(function(){
      expect([]).to.be.finite;
    }, "expected [] to be a finite number");

    err(function(){
      expect({}).to.be.finite;
    }, "expected {} to be a finite number");
  });

  it('property(name)', function(){
    expect('test').to.have.property('length');
    expect({a: 1}).to.have.property('toString');
    expect(4).to.not.have.property('length');

    expect({ 'foo.bar': 'baz' })
      .to.have.property('foo.bar');
    expect({ foo: { bar: 'baz' } })
      .to.not.have.property('foo.bar');

    // Properties with the value 'undefined' are still properties
    var obj = { foo: undefined };
    Object.defineProperty(obj, 'bar', {
      get: function() { }
    });
    expect(obj).to.have.property('foo');
    expect(obj).to.have.property('bar');

    expect({ 'foo.bar[]': 'baz'})
      .to.have.property('foo.bar[]');

    err(function(){
      expect('asd').to.have.property('foo');
    }, "expected 'asd' to have property 'foo'");

    err(function(){
      expect('asd', 'blah').to.have.property('foo');
    }, "blah: expected 'asd' to have property 'foo'");

    err(function(){
      expect({ foo: { bar: 'baz' } })
        .to.have.property('foo.bar');
    }, "expected { foo: { bar: 'baz' } } to have property 'foo.bar'");

    err(function() {
      expect({a: {b: 1}}).to.have.own.nested.property("a.b");
    }, "The \"nested\" and \"own\" flags cannot be combined.");

    err(function() {
      expect({a: {b: 1}}, 'blah').to.have.own.nested.property("a.b");
    }, "blah: The \"nested\" and \"own\" flags cannot be combined.");

    err(function () {
      expect(null, 'blah').to.have.property("a");
    }, "blah: Target cannot be null or undefined.");

    err(function () {
      expect(undefined, 'blah').to.have.property("a");
    }, "blah: Target cannot be null or undefined.");

    err(function () {
      expect({a:1}, 'blah').to.have.property(null)
    }, "blah: the argument to property must be a string, number, or symbol");
  });

  it('property(name, val)', function(){
    expect('test').to.have.property('length', 4);
    expect('asd').to.have.property('constructor', String);
    expect({a: 1}).to.have.property('toString', Object.prototype.toString);
    expect('test').to.not.have.property('length', 3);
    expect('test').to.not.have.property('foo', 4);
    expect({a: {b: 1}}).to.not.have.property('a', {b: 1});

    var deepObj = {
        green: { tea: 'matcha' }
      , teas: [ 'chai', 'matcha', { tea: 'konacha' } ]
    };
    expect(deepObj).to.have.nested.property('green.tea', 'matcha');
    expect(deepObj).to.have.nested.property('teas[1]', 'matcha');
    expect(deepObj).to.have.nested.property('teas[2].tea', 'konacha');

    expect(deepObj).to.have.property('teas')
      .that.is.an('array')
      .with.nested.property('[2]')
        .that.deep.equals({tea: 'konacha'});

    err(function(){
      expect(deepObj).to.have.nested.property('teas[3]');
    }, "expected { green: { tea: 'matcha' }, …(1) } to have nested property 'teas[3]'");
    err(function(){
      expect(deepObj).to.have.nested.property('teas[3]', 'bar');
    }, "expected { green: { tea: 'matcha' }, …(1) } to have nested property 'teas[3]'");
    err(function(){
      expect(deepObj).to.have.nested.property('teas[3].tea', 'bar');
    }, "expected { green: { tea: 'matcha' }, …(1) } to have nested property 'teas[3].tea'");

    var arr = [
        [ 'chai', 'matcha', 'konacha' ]
      , [ { tea: 'chai' }
        , { tea: 'matcha' }
        , { tea: 'konacha' } ]
    ];
    expect(arr).to.have.nested.property('[0][1]', 'matcha');
    expect(arr).to.have.nested.property('[1][2].tea', 'konacha');
    err(function(){
      expect(arr).to.have.nested.property('[2][1]');
    }, "expected [ …(2) ] to have nested property '[2][1]'");
    err(function(){
      expect(arr).to.have.nested.property('[2][1]', 'none');
    }, "expected [ …(2) ] to have nested property '[2][1]'");
    err(function(){
      expect(arr).to.have.nested.property('[0][3]', 'none');
    }, "expected [ …(2) ] to have nested property '[0][3]'");

    err(function(){
      expect('asd').to.have.property('length', 4, 'blah');
    }, "blah: expected 'asd' to have property 'length' of 4, but got 3");

    err(function(){
      expect('asd', 'blah').to.have.property('length', 4);
    }, "blah: expected 'asd' to have property 'length' of 4, but got 3");

    err(function(){
      expect('asd').to.not.have.property('length', 3, 'blah');
    }, "blah: expected 'asd' to not have property 'length' of 3");

    err(function(){
      expect('asd').to.have.property('constructor', Number, 'blah');
    }, "blah: expected 'asd' to have property 'constructor' of [Function Number], but got [Function String]");

    err(function() {
      expect({a: {b: 1}}).to.have.own.nested.property("a.b", 1, 'blah');
    }, "blah: The \"nested\" and \"own\" flags cannot be combined.");

    err(function() {
      expect({a: {b: 1}}, 'blah').to.have.own.nested.property("a.b", 1);
    }, "blah: The \"nested\" and \"own\" flags cannot be combined.");
  });

  it('deep.property(name, val)', function () {
    var obj = {a: {b: 1}};
    expect(obj).to.have.deep.property('a', {b: 1});
    expect(obj).to.not.have.deep.property('a', {b: 7});
    expect(obj).to.not.have.deep.property('a', {z: 1});
    expect(obj).to.not.have.deep.property('z', {b: 1});

    err(function () {
      expect(obj).to.have.deep.property('a', {b: 7}, 'blah');
    }, "blah: expected { a: { b: 1 } } to have deep property 'a' of { b: 7 }, but got { b: 1 }");

    err(function () {
      expect(obj).to.have.deep.property('z', {b: 1}, 'blah');
    }, "blah: expected { a: { b: 1 } } to have deep property 'z'");

    err(function () {
      expect(obj).to.not.have.deep.property('a', {b: 1}, 'blah');
    }, "blah: expected { a: { b: 1 } } to not have deep property 'a' of { b: 1 }");
  });

  it('own.property(name)', function(){
    expect('test').to.have.own.property('length');
    expect('test').to.have.ownProperty('length');
    expect('test').to.haveOwnProperty('length');
    expect('test').to.not.have.own.property('iDontExist');
    expect('test').to.not.have.ownProperty('iDontExist');
    expect('test').to.not.haveOwnProperty('iDontExist');
    expect({a: 1}).to.not.have.own.property('toString');
    expect({a: 1}).to.not.have.ownProperty('toString');
    expect({a: 1}).to.not.haveOwnProperty('toString');

    expect({ length: 12 }).to.have.own.property('length');
    expect({ length: 12 }).to.have.ownProperty('length');
    expect({ length: 12 }).to.haveOwnProperty('length');
    expect({ length: 12 }).to.not.have.own.property('iDontExist');
    expect({ length: 12 }).to.not.have.ownProperty('iDontExist');
    expect({ length: 12 }).to.not.haveOwnProperty('iDontExist');

    // Chaining property's value
    expect('test').to.have.own.property('length').that.is.a('number');
    expect('test').to.have.ownProperty('length').that.is.a('number');
    expect('test').to.haveOwnProperty('length').that.is.a('number');

    err(function(){
      expect({ length: 12 }, 'blah').to.have.own.property('iDontExist');
    }, "blah: expected { length: 12 } to have own property 'iDontExist'");

    err(function(){
      expect({ length: 12 }).to.not.have.own.property('length');
    }, "expected { length: 12 } to not have own property 'length'");

    err(function(){
      expect({ length: 12 }, 'blah').to.have.ownProperty('iDontExist');
    }, "blah: expected { length: 12 } to have own property 'iDontExist'");

    err(function(){
      expect({ length: 12 }).to.not.have.ownProperty('length');
    }, "expected { length: 12 } to not have own property 'length'");

    err(function(){
      expect({ length: 12 }, 'blah').to.haveOwnProperty('iDontExist');
    }, "blah: expected { length: 12 } to have own property 'iDontExist'");

    err(function(){
      expect({ length: 12 }).to.not.haveOwnProperty('length');
    }, "expected { length: 12 } to not have own property 'length'");
  });

  it('own.property(name, value)', function(){
    expect('test').to.have.own.property('length', 4);
    expect('test').to.have.ownProperty('length', 4);
    expect('test').to.haveOwnProperty('length', 4);
    expect('test').to.not.have.own.property('length', 1337);
    expect('test').to.not.have.ownProperty('length', 1337);
    expect('test').to.not.haveOwnProperty('length', 1337);
    expect({a: 1}).to.not.have.own.property('toString', Object.prototype.toString);
    expect({a: 1}).to.not.have.ownProperty('toString', Object.prototype.toString);
    expect({a: 1}).to.not.haveOwnProperty('toString', Object.prototype.toString);
    expect({a: {b: 1}}).to.not.have.own.property('a', {b: 1});
    expect({a: {b: 1}}).to.not.have.ownProperty('a', {b: 1});
    expect({a: {b: 1}}).to.not.haveOwnProperty('a', {b: 1});

    expect({ length: 12 }).to.have.own.property('length', 12);
    expect({ length: 12 }).to.have.ownProperty('length', 12);
    expect({ length: 12 }).to.haveOwnProperty('length', 12);
    expect({ length: 12 }).to.not.have.own.property('length', 15);
    expect({ length: 12 }).to.not.have.ownProperty('length', 15);
    expect({ length: 12 }).to.not.haveOwnProperty('length', 15);

    // Chaining property's value
    expect('test').to.have.own.property('length', 4).that.is.a('number');
    expect('test').to.have.ownProperty('length', 4).that.is.a('number');
    expect('test').to.haveOwnProperty('length', 4).that.is.a('number');

    var objNoProto = Object.create(null);
    objNoProto.a = 'a';
    expect(objNoProto).to.have.own.property('a');
    expect(objNoProto).to.have.ownProperty('a');
    expect(objNoProto).to.haveOwnProperty('a');

    err(function(){
      expect({ length: 12 }).to.have.own.property('iDontExist', 12, 'blah');
    }, "blah: expected { length: 12 } to have own property 'iDontExist'");

    err(function(){
      expect({ length: 12 }, 'blah').to.have.own.property('iDontExist', 12);
    }, "blah: expected { length: 12 } to have own property 'iDontExist'");

    err(function() {
      expect({ length: 12 }).to.not.have.own.property('length', 12);
    }, "expected { length: 12 } to not have own property 'length' of 12");

    err(function() {
      expect({ length: 12 }).to.have.own.property('length', 15);
    }, "expected { length: 12 } to have own property 'length' of 15, but got 12");

    err(function(){
      expect({ length: 12 }).to.have.ownProperty('iDontExist', 12, 'blah');
    }, "blah: expected { length: 12 } to have own property 'iDontExist'");

    err(function(){
      expect({ length: 12 }, 'blah').to.have.ownProperty('iDontExist', 12);
    }, "blah: expected { length: 12 } to have own property 'iDontExist'");

    err(function() {
      expect({ length: 12 }).to.not.have.ownProperty('length', 12);
    }, "expected { length: 12 } to not have own property 'length' of 12");

    err(function() {
      expect({ length: 12 }).to.have.ownProperty('length', 15);
    }, "expected { length: 12 } to have own property 'length' of 15, but got 12");

    err(function(){
      expect({ length: 12 }).to.haveOwnProperty('iDontExist', 12, 'blah');
    }, "blah: expected { length: 12 } to have own property 'iDontExist'");

    err(function(){
      expect({ length: 12 }, 'blah').to.haveOwnProperty('iDontExist', 12);
    }, "blah: expected { length: 12 } to have own property 'iDontExist'");

    err(function() {
      expect({ length: 12 }).to.not.haveOwnProperty('length', 12);
    }, "expected { length: 12 } to not have own property 'length' of 12");

    err(function() {
      expect({ length: 12 }).to.haveOwnProperty('length', 15);
    }, "expected { length: 12 } to have own property 'length' of 15, but got 12");
  });

  it('deep.own.property(name, val)', function () {
    var obj = {a: {b: 1}};
    expect(obj).to.have.deep.own.property('a', {b: 1});
    expect(obj).to.have.deep.ownProperty('a', {b: 1});
    expect(obj).to.deep.haveOwnProperty('a', {b: 1});
    expect(obj).to.not.have.deep.own.property('a', {z: 1});
    expect(obj).to.not.have.deep.ownProperty('a', {z: 1});
    expect(obj).to.not.deep.haveOwnProperty('a', {z: 1});
    expect(obj).to.not.have.deep.own.property('a', {b: 7});
    expect(obj).to.not.have.deep.ownProperty('a', {b: 7});
    expect(obj).to.not.deep.haveOwnProperty('a', {b: 7});
    expect(obj).to.not.have.deep.own.property('toString', Object.prototype.toString);
    expect(obj).to.not.have.deep.ownProperty('toString', Object.prototype.toString);
    expect(obj).to.not.deep.haveOwnProperty('toString', Object.prototype.toString);

    err(function () {
      expect(obj).to.have.deep.own.property('a', {z: 7}, 'blah');
    }, "blah: expected { a: { b: 1 } } to have deep own property 'a' of { z: 7 }, but got { b: 1 }");

    err(function () {
      expect(obj).to.have.deep.own.property('z', {b: 1}, 'blah');
    }, "blah: expected { a: { b: 1 } } to have deep own property 'z'");

    err(function () {
      expect(obj).to.not.have.deep.own.property('a', {b: 1}, 'blah');
    }, "blah: expected { a: { b: 1 } } to not have deep own property 'a' of { b: 1 }");

    err(function () {
      expect(obj).to.have.deep.ownProperty('a', {z: 7}, 'blah');
    }, "blah: expected { a: { b: 1 } } to have deep own property 'a' of { z: 7 }, but got { b: 1 }");

    err(function () {
      expect(obj).to.have.deep.ownProperty('z', {b: 1}, 'blah');
    }, "blah: expected { a: { b: 1 } } to have deep own property 'z'");

    err(function () {
      expect(obj).to.not.have.deep.ownProperty('a', {b: 1}, 'blah');
    }, "blah: expected { a: { b: 1 } } to not have deep own property 'a' of { b: 1 }");

    err(function () {
      expect(obj).to.deep.haveOwnProperty('a', {z: 7}, 'blah');
    }, "blah: expected { a: { b: 1 } } to have deep own property 'a' of { z: 7 }, but got { b: 1 }");

    err(function () {
      expect(obj).to.deep.haveOwnProperty('z', {b: 1}, 'blah');
    }, "blah: expected { a: { b: 1 } } to have deep own property 'z'");

    err(function () {
      expect(obj).to.not.deep.haveOwnProperty('a', {b: 1}, 'blah');
    }, "blah: expected { a: { b: 1 } } to not have deep own property 'a' of { b: 1 }");
  });

  it('nested.property(name)', function(){
    expect({ 'foo.bar': 'baz'})
      .to.not.have.nested.property('foo.bar');
    expect({ foo: { bar: 'baz' } })
      .to.have.nested.property('foo.bar');

    expect({ 'foo': [1, 2, 3] })
      .to.have.nested.property('foo[1]');

    expect({ 'foo.bar[]': 'baz'})
      .to.have.nested.property('foo\\.bar\\[\\]');

    err(function(){
      expect({ 'foo.bar': 'baz' })
        .to.have.nested.property('foo.bar');
    }, "expected { 'foo.bar': 'baz' } to have nested property 'foo.bar'");

    err(function () {
      expect({a:1}, 'blah').to.have.nested.property({'a':'1'});
    }, "blah: the argument to property must be a string when using nested syntax");
  });

  it('nested.property(name, val)', function(){
    expect({ foo: { bar: 'baz' } })
      .to.have.nested.property('foo.bar', 'baz');
    expect({ foo: { bar: 'baz' } })
      .to.not.have.nested.property('foo.bar', 'quux');
    expect({ foo: { bar: 'baz' } })
      .to.not.have.nested.property('foo.quux', 'baz');
    expect({a: {b: {c: 1}}}).to.not.have.nested.property('a.b', {c: 1});

    err(function(){
      expect({ foo: { bar: 'baz' } })
        .to.have.nested.property('foo.bar', 'quux', 'blah');
    }, "blah: expected { foo: { bar: 'baz' } } to have nested property 'foo.bar' of 'quux', but got 'baz'");
    err(function(){
      expect({ foo: { bar: 'baz' } })
        .to.not.have.nested.property('foo.bar', 'baz', 'blah');
    }, "blah: expected { foo: { bar: 'baz' } } to not have nested property 'foo.bar' of 'baz'");
  });

  it('deep.nested.property(name, val)', function () {
    var obj = {a: {b: {c: 1}}};
    expect(obj).to.have.deep.nested.property('a.b', {c: 1});
    expect(obj).to.not.have.deep.nested.property('a.b', {c: 7});
    expect(obj).to.not.have.deep.nested.property('a.b', {z: 1});
    expect(obj).to.not.have.deep.nested.property('a.z', {c: 1});

    err(function () {
      expect(obj).to.have.deep.nested.property('a.b', {c: 7}, 'blah');
    }, "blah: expected { a: { b: { c: 1 } } } to have deep nested property 'a.b' of { c: 7 }, but got { c: 1 }");

    err(function () {
      expect(obj).to.have.deep.nested.property('a.z', {c: 1}, 'blah');
    }, "blah: expected { a: { b: { c: 1 } } } to have deep nested property 'a.z'");

    err(function () {
      expect(obj).to.not.have.deep.nested.property('a.b', {c: 1}, 'blah');
    }, "blah: expected { a: { b: { c: 1 } } } to not have deep nested property 'a.b' of { c: 1 }");
  });

  it('ownPropertyDescriptor(name)', function(){
    expect('test').to.have.ownPropertyDescriptor('length');
    expect('test').to.haveOwnPropertyDescriptor('length');
    expect('test').not.to.have.ownPropertyDescriptor('foo');

    var obj = {};
    var descriptor = {
      configurable: false,
      enumerable: true,
      writable: true,
      value: NaN
    };
    Object.defineProperty(obj, 'test', descriptor);
    expect(obj).to.have.ownPropertyDescriptor('test', descriptor);

    err(function(){
      expect(obj).not.to.have.ownPropertyDescriptor('test', descriptor, 'blah');
    }, /^blah: expected the own property descriptor for 'test' on \{ test: NaN \} to not match \{ [^\}]+ \}$/);

    err(function(){
      expect(obj, 'blah').not.to.have.ownPropertyDescriptor('test', descriptor);
    }, /^blah: expected the own property descriptor for 'test' on \{ test: NaN \} to not match \{ [^\}]+ \}$/);

    err(function(){
      var wrongDescriptor = {
        configurable: false,
        enumerable: true,
        writable: false,
        value: NaN
      };
      expect(obj).to.have.ownPropertyDescriptor('test', wrongDescriptor, 'blah');
    }, /^blah: expected the own property descriptor for 'test' on \{ test: NaN \} to match \{ [^\}]+ \}, got \{ [^\}]+ \}$/);

    err(function(){
      expect(obj).to.have.ownPropertyDescriptor('test2', 'blah');
    }, "blah: expected { test: NaN } to have an own property descriptor for 'test2'");

    err(function(){
      expect(obj, 'blah').to.have.ownPropertyDescriptor('test2');
    }, "blah: expected { test: NaN } to have an own property descriptor for 'test2'");

    expect(obj).to.have.ownPropertyDescriptor('test').and.have.property('enumerable', true);
  });

  it('string()', function(){
    expect('foobar').to.have.string('bar');
    expect('foobar').to.have.string('foo');
    expect('foobar').to.not.have.string('baz');

    err(function(){
      expect(3).to.have.string('baz', 'blah');
    }, "blah: expected 3 to be a string");

    err(function(){
      expect(3, 'blah').to.have.string('baz');
    }, "blah: expected 3 to be a string");

    err(function(){
      expect('foobar').to.have.string('baz', 'blah');
    }, "blah: expected 'foobar' to contain 'baz'");

    err(function(){
      expect('foobar', 'blah').to.have.string('baz');
    }, "blah: expected 'foobar' to contain 'baz'");

    err(function(){
      expect('foobar').to.not.have.string('bar', 'blah');
    }, "blah: expected 'foobar' to not contain 'bar'");
  });

  it('include()', function(){
    expect(['foo', 'bar']).to.include('foo');
    expect(['foo', 'bar']).to.include('foo');
    expect(['foo', 'bar']).to.include('bar');
    expect([1,2]).to.include(1);
    expect(['foo', 'bar']).to.not.include('baz');
    expect(['foo', 'bar']).to.not.include(1);

    expect({a: 1}).to.include({'toString': Object.prototype.toString});

    // .include should work with Error objects and objects with a custom
    // `@@toStringTag`.
    expect(new Error('foo')).to.include({message: 'foo'});
    if (typeof Symbol !== 'undefined'
        && typeof Symbol.toStringTag !== 'undefined') {
      var customObj = {a: 1};
      customObj[Symbol.toStringTag] = 'foo';

      expect(customObj).to.include({a: 1});
    }

    var obj1 = {a: 1}
      , obj2 = {b: 2};
    expect([obj1, obj2]).to.include(obj1);
    expect([obj1, obj2]).to.not.include({a: 1});
    expect({foo: obj1, bar: obj2}).to.include({foo: obj1});
    expect({foo: obj1, bar: obj2}).to.include({foo: obj1, bar: obj2});
    expect({foo: obj1, bar: obj2}).to.not.include({foo: {a: 1}});
    expect({foo: obj1, bar: obj2}).to.not.include({foo: obj1, bar: {b: 2}});

    if (typeof Map === 'function') {
      var map = new Map();
      var val = [{a: 1}];
      map.set('a', val);
      map.set('b', 2);
      map.set('c', -0);
      map.set('d', NaN);

      expect(map).to.include(val);
      expect(map).to.not.include([{a: 1}]);
      expect(map).to.include(2);
      expect(map).to.not.include(3);
      expect(map).to.include(0);
      expect(map).to.include(NaN);
    }

    if (typeof Set === 'function') {
      var set = new Set();
      var val = [{a: 1}];
      set.add(val);
      set.add(2);
      set.add(-0);
      set.add(NaN);

      expect(set).to.include(val);
      expect(set).to.not.include([{a: 1}]);
      expect(set).to.include(2);
      expect(set).to.not.include(3);
      if (set.has(0)) {
        // This test is skipped in IE11 because (contrary to spec) IE11 uses
        // SameValue instead of SameValueZero equality for sets.
        expect(set).to.include(0);
      }
      expect(set).to.include(NaN);
    }

    if (typeof WeakSet === 'function') {
      var ws = new WeakSet();
      var val = [{a: 1}];
      ws.add(val);

      expect(ws).to.include(val);
      expect(ws).to.not.include([{a: 1}]);
      expect(ws).to.not.include({});
    }

    if (typeof Symbol === 'function') {
      var sym1 = Symbol()
        , sym2 = Symbol()
        , sym3 = Symbol();
      expect([sym1, sym2]).to.include(sym1);
      expect([sym1, sym2]).to.not.include(sym3);
    }

    err(function(){
      expect(['foo']).to.include('bar', 'blah');
    }, "blah: expected [ 'foo' ] to include 'bar'");

    err(function(){
      expect(['foo'], 'blah').to.include('bar');
    }, "blah: expected [ 'foo' ] to include 'bar'");

    err(function(){
      expect(['bar', 'foo']).to.not.include('foo', 'blah');
    }, "blah: expected [ 'bar', 'foo' ] to not include 'foo'");

    err(function(){
      expect({a: 1}).to.include({b: 2}, 'blah');
    }, "blah: expected { a: 1 } to have property 'b'");

    err(function(){
      expect({a: 1}, 'blah').to.include({b: 2});
    }, "blah: expected { a: 1 } to have property 'b'");

    err(function(){
      expect({a:1,b:2}).to.not.include({b:2});
    }, "expected { a: 1, b: 2 } to not have property 'b' of 2");

    err(function () {
      expect([{a: 1}, {b: 2}]).to.include({a: 1});
    }, "expected [ { a: 1 }, { b: 2 } ] to include { a: 1 }");

    err(function () {
      var obj1 = {a: 1}
        , obj2 = {b: 2};
      expect([obj1, obj2]).to.not.include(obj1);
    }, "expected [ { a: 1 }, { b: 2 } ] to not include { a: 1 }");

    err(function () {
      expect({foo: {a: 1}, bar: {b: 2}}).to.include({foo: {a: 1}});
    }, "expected { foo: { a: 1 }, bar: { b: 2 } } to have property 'foo' of { a: 1 }, but got { a: 1 }");

    err(function () {
      var obj1 = {a: 1}
        , obj2 = {b: 2};
      expect({foo: obj1, bar: obj2}).to.not.include({foo: obj1, bar: obj2});
    }, "expected { foo: { a: 1 }, bar: { b: 2 } } to not have property 'foo' of { a: 1 }");

    err(function(){
      expect(true).to.include(true, 'blah');
    },
      "blah: the given combination of arguments (boolean and boolean) is invalid for this assertion. " +
      "You can use an array, a map, an object, a set, a string, or a weakset instead of a boolean"
    );

    err(function(){
      expect(true, 'blah').to.include(true);
    },
      "blah: the given combination of arguments (boolean and boolean) is invalid for this assertion. " +
      "You can use an array, a map, an object, a set, a string, or a weakset instead of a boolean"
    );

    err(function(){
      expect(42.0).to.include(42);
    },
      "the given combination of arguments (number and number) is invalid for this assertion. " +
      "You can use an array, a map, an object, a set, a string, or a weakset instead of a number"
    );

    err(function(){
      expect(null).to.include(42);
    },
      "the given combination of arguments (null and number) is invalid for this assertion. " +
      "You can use an array, a map, an object, a set, a string, or a weakset instead of a number"
    );

    err(function(){
      expect(undefined).to.include(42);
    },
      "the given combination of arguments (undefined and number) is invalid for this assertion. " +
      "You can use an array, a map, an object, a set, a string, or a weakset instead of a number"
    );

    err(function(){
      expect(true).to.not.include(true);
    },
      "the given combination of arguments (boolean and boolean) is invalid for this assertion. " +
      "You can use an array, a map, an object, a set, a string, or a weakset instead of a boolean"
    );

    err(function(){
      expect(42.0).to.not.include(42);
    },
      "the given combination of arguments (number and number) is invalid for this assertion. " +
      "You can use an array, a map, an object, a set, a string, or a weakset instead of a number"
    );

    err(function(){
      expect(null).to.not.include(42);
    },
      "the given combination of arguments (null and number) is invalid for this assertion. " +
      "You can use an array, a map, an object, a set, a string, or a weakset instead of a number"
    );

    err(function(){
      expect(undefined).to.not.include(42);
    },
      "the given combination of arguments (undefined and number) is invalid for this assertion. " +
      "You can use an array, a map, an object, a set, a string, or a weakset instead of a number"
    );
  });

  it('deep.include()', function () {
    var obj1 = {a: 1}
      , obj2 = {b: 2};
    expect([obj1, obj2]).to.deep.include({a: 1});
    expect([obj1, obj2]).to.not.deep.include({a: 9});
    expect([obj1, obj2]).to.not.deep.include({z: 1});
    expect({foo: obj1, bar: obj2}).to.deep.include({foo: {a: 1}});
    expect({foo: obj1, bar: obj2}).to.deep.include({foo: {a: 1}, bar: {b: 2}});
    expect({foo: obj1, bar: obj2}).to.not.deep.include({foo: {a: 9}});
    expect({foo: obj1, bar: obj2}).to.not.deep.include({foo: {z: 1}});
    expect({foo: obj1, bar: obj2}).to.not.deep.include({baz: {a: 1}});
    expect({foo: obj1, bar: obj2}).to.not.deep.include({foo: {a: 1}, bar: {b: 9}});

    if (typeof Map === 'function') {
      var map = new Map();
      map.set(1, [{a: 1}]);

      expect(map).to.deep.include([{a: 1}]);
    }

    if (typeof Set === 'function') {
      var set = new Set();
      set.add([{a: 1}]);

      expect(set).to.deep.include([{a: 1}]);
    }

    if (typeof WeakSet === 'function') {
      err(function() {
        expect(new WeakSet()).to.deep.include({}, 'foo');
      }, 'foo: unable to use .deep.include with WeakSet');
    }

    err(function () {
      expect([obj1, obj2]).to.deep.include({a: 9}, 'blah');
    }, "blah: expected [ { a: 1 }, { b: 2 } ] to deep include { a: 9 }");

    err(function () {
      expect([obj1, obj2], 'blah').to.deep.include({a: 9});
    }, "blah: expected [ { a: 1 }, { b: 2 } ] to deep include { a: 9 }");

    err(function () {
      expect([obj1, obj2], 'blah').to.not.deep.include({a: 1});
    }, "blah: expected [ { a: 1 }, { b: 2 } ] to not deep include { a: 1 }");

    err(function () {
      expect({foo: obj1, bar: obj2}).to.deep.include({foo: {a: 1}, bar: {b: 9}});
    }, "expected { foo: { a: 1 }, bar: { b: 2 } } to have deep property 'bar' of { b: 9 }, but got { b: 2 }");

    err(function () {
      expect({foo: obj1, bar: obj2}).to.not.deep.include({foo: {a: 1}, bar: {b: 2}}, 'blah');
    }, "blah: expected { foo: { a: 1 }, bar: { b: 2 } } to not have deep property 'foo' of { a: 1 }");
  });

  it('nested.include()', function () {
    expect({a: {b: ['x', 'y']}}).to.nested.include({'a.b[1]': 'y'});
    expect({a: {b: ['x', 'y']}}).to.not.nested.include({'a.b[1]': 'x'});
    expect({a: {b: ['x', 'y']}}).to.not.nested.include({'a.c': 'y'});

    expect({a: {b: [{x: 1}]}}).to.not.nested.include({'a.b[0]': {x: 1}});

    expect({'.a': {'[b]': 'x'}}).to.nested.include({'\\.a.\\[b\\]': 'x'});
    expect({'.a': {'[b]': 'x'}}).to.not.nested.include({'\\.a.\\[b\\]': 'y'});

    err(function () {
      expect({a: {b: ['x', 'y']}}).to.nested.include({'a.b[1]': 'x'}, 'blah');
    }, "blah: expected { a: { b: [ 'x', 'y' ] } } to have nested property 'a.b[1]' of 'x', but got 'y'");

    err(function () {
      expect({a: {b: ['x', 'y']}}, 'blah').to.nested.include({'a.b[1]': 'x'});
    }, "blah: expected { a: { b: [ 'x', 'y' ] } } to have nested property 'a.b[1]' of 'x', but got 'y'");

    err(function () {
      expect({a: {b: ['x', 'y']}}).to.nested.include({'a.c': 'y'});
    }, "expected { a: { b: [ 'x', 'y' ] } } to have nested property 'a.c'");

    err(function () {
      expect({a: {b: ['x', 'y']}}).to.not.nested.include({'a.b[1]': 'y'}, 'blah');
    }, "blah: expected { a: { b: [ 'x', 'y' ] } } to not have nested property 'a.b[1]' of 'y'");

    err(function () {
      expect({a: {b: ['x', 'y']}}, 'blah').to.not.nested.include({'a.b[1]': 'y'});
    }, "blah: expected { a: { b: [ 'x', 'y' ] } } to not have nested property 'a.b[1]' of 'y'");
  });

  it('deep.nested.include()', function () {
    expect({a: {b: [{x: 1}]}}).to.deep.nested.include({'a.b[0]': {x: 1}});
    expect({a: {b: [{x: 1}]}}).to.not.deep.nested.include({'a.b[0]': {y: 2}});
    expect({a: {b: [{x: 1}]}}).to.not.deep.nested.include({'a.c': {x: 1}});

    expect({'.a': {'[b]': {x: 1}}})
      .to.deep.nested.include({'\\.a.\\[b\\]': {x: 1}});
    expect({'.a': {'[b]': {x: 1}}})
      .to.not.deep.nested.include({'\\.a.\\[b\\]': {y: 2}});

    err(function () {
      expect({a: {b: [{x: 1}]}}).to.deep.nested.include({'a.b[0]': {y: 2}}, 'blah');
    }, "blah: expected { a: { b: [ { x: 1 } ] } } to have deep nested property 'a.b[0]' of { y: 2 }, but got { x: 1 }");

    err(function () {
      expect({a: {b: [{x: 1}]}}, 'blah').to.deep.nested.include({'a.b[0]': {y: 2}});
    }, "blah: expected { a: { b: [ { x: 1 } ] } } to have deep nested property 'a.b[0]' of { y: 2 }, but got { x: 1 }");

    err(function () {
      expect({a: {b: [{x: 1}]}}).to.deep.nested.include({'a.c': {x: 1}});
    }, "expected { a: { b: [ { x: 1 } ] } } to have deep nested property 'a.c'");

    err(function () {
      expect({a: {b: [{x: 1}]}}).to.not.deep.nested.include({'a.b[0]': {x: 1}}, 'blah');
    }, "blah: expected { a: { b: [ { x: 1 } ] } } to not have deep nested property 'a.b[0]' of { x: 1 }");

    err(function () {
      expect({a: {b: [{x: 1}]}}, 'blah').to.not.deep.nested.include({'a.b[0]': {x: 1}});
    }, "blah: expected { a: { b: [ { x: 1 } ] } } to not have deep nested property 'a.b[0]' of { x: 1 }");
  });

  it('own.include()', function () {
    expect({a: 1}).to.own.include({a: 1});
    expect({a: 1}).to.not.own.include({a: 3});
    expect({a: 1}).to.not.own.include({'toString': Object.prototype.toString});

    expect({a: {b: 2}}).to.not.own.include({a: {b: 2}});

    err(function () {
      expect({a: 1}).to.own.include({a: 3}, 'blah');
    }, "blah: expected { a: 1 } to have own property 'a' of 3, but got 1");

    err(function () {
      expect({a: 1}, 'blah').to.own.include({a: 3});
    }, "blah: expected { a: 1 } to have own property 'a' of 3, but got 1");

    err(function () {
      expect({a: 1}).to.own.include({'toString': Object.prototype.toString});
    }, "expected { a: 1 } to have own property 'toString'");

    err(function () {
      expect({a: 1}).to.not.own.include({a: 1}, 'blah');
    }, "blah: expected { a: 1 } to not have own property 'a' of 1");

    err(function () {
      expect({a: 1}, 'blah').to.not.own.include({a: 1});
    }, "blah: expected { a: 1 } to not have own property 'a' of 1");
  });

  it('deep.own.include()', function () {
    expect({a: {b: 2}}).to.deep.own.include({a: {b: 2}});
    expect({a: {b: 2}}).to.not.deep.own.include({a: {c: 3}});
    expect({a: {b: 2}})
      .to.not.deep.own.include({'toString': Object.prototype.toString});

    err(function () {
      expect({a: {b: 2}}).to.deep.own.include({a: {c: 3}}, 'blah');
    }, "blah: expected { a: { b: 2 } } to have deep own property 'a' of { c: 3 }, but got { b: 2 }");

    err(function () {
      expect({a: {b: 2}}, 'blah').to.deep.own.include({a: {c: 3}});
    }, "blah: expected { a: { b: 2 } } to have deep own property 'a' of { c: 3 }, but got { b: 2 }");

    err(function () {
      expect({a: {b: 2}}).to.deep.own.include({'toString': Object.prototype.toString});
    }, "expected { a: { b: 2 } } to have deep own property 'toString'");

    err(function () {
      expect({a: {b: 2}}).to.not.deep.own.include({a: {b: 2}}, 'blah');
    }, "blah: expected { a: { b: 2 } } to not have deep own property 'a' of { b: 2 }");

    err(function () {
      expect({a: {b: 2}}, 'blah').to.not.deep.own.include({a: {b: 2}});
    }, "blah: expected { a: { b: 2 } } to not have deep own property 'a' of { b: 2 }");
  });

  it('keys(array|Object|arguments)', function(){
    expect({ foo: 1 }).to.have.keys(['foo']);
    expect({ foo: 1 }).have.keys({ 'foo': 6 });
    expect({ foo: 1, bar: 2 }).to.have.keys(['foo', 'bar']);
    expect({ foo: 1, bar: 2 }).to.have.keys('foo', 'bar');
    expect({ foo: 1, bar: 2 }).have.keys({ 'foo': 6, 'bar': 7 });
    expect({ foo: 1, bar: 2, baz: 3 }).to.contain.keys('foo', 'bar');
    expect({ foo: 1, bar: 2, baz: 3 }).to.contain.keys('bar', 'foo');
    expect({ foo: 1, bar: 2, baz: 3 }).to.contain.keys('baz');
    expect({ foo: 1, bar: 2 }).contain.keys({ 'foo': 6 });
    expect({ foo: 1, bar: 2 }).contain.keys({ 'bar': 7 });
    expect({ foo: 1, bar: 2 }).contain.keys({ 'foo': 6 });

    expect({ foo: 1, bar: 2 }).to.contain.keys('foo');
    expect({ foo: 1, bar: 2 }).to.contain.keys('bar', 'foo');
    expect({ foo: 1, bar: 2 }).to.contain.keys(['foo']);
    expect({ foo: 1, bar: 2 }).to.contain.keys(['bar']);
    expect({ foo: 1, bar: 2 }).to.contain.keys(['bar', 'foo']);
    expect({ foo: 1, bar: 2, baz: 3 }).to.contain.all.keys(['bar', 'foo']);

    expect({ foo: 1, bar: 2 }).to.not.have.keys('baz');
    expect({ foo: 1, bar: 2 }).to.not.have.keys('foo');
    expect({ foo: 1, bar: 2 }).to.not.have.keys('foo', 'baz');
    expect({ foo: 1, bar: 2 }).to.not.contain.keys('baz');
    expect({ foo: 1, bar: 2 }).to.not.contain.keys('foo', 'baz');
    expect({ foo: 1, bar: 2 }).to.not.contain.keys('baz', 'foo');

    expect({ foo: 1, bar: 2 }).to.have.any.keys('foo', 'baz');
    expect({ foo: 1, bar: 2 }).to.have.any.keys('foo');
    expect({ foo: 1, bar: 2 }).to.contain.any.keys('bar', 'baz');
    expect({ foo: 1, bar: 2 }).to.contain.any.keys(['foo']);
    expect({ foo: 1, bar: 2 }).to.have.all.keys(['bar', 'foo']);
    expect({ foo: 1, bar: 2 }).to.contain.all.keys(['bar', 'foo']);
    expect({ foo: 1, bar: 2 }).contain.any.keys({ 'foo': 6 });
    expect({ foo: 1, bar: 2 }).have.all.keys({ 'foo': 6, 'bar': 7 });
    expect({ foo: 1, bar: 2 }).contain.all.keys({ 'bar': 7, 'foo': 6 });

    expect({ foo: 1, bar: 2 }).to.not.have.any.keys('baz', 'abc', 'def');
    expect({ foo: 1, bar: 2 }).to.not.have.any.keys('baz');
    expect({ foo: 1, bar: 2 }).to.not.contain.any.keys('baz');
    expect({ foo: 1, bar: 2 }).to.not.have.all.keys(['baz', 'foo']);
    expect({ foo: 1, bar: 2 }).to.not.contain.all.keys(['baz', 'foo']);
    expect({ foo: 1, bar: 2 }).not.have.all.keys({ 'baz': 8, 'foo': 7 });
    expect({ foo: 1, bar: 2 }).not.contain.all.keys({ 'baz': 8, 'foo': 7 });

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

    expect(obj).to.have.all.keys([enumProp1, enumProp2]);
    expect(obj).to.not.have.all.keys([enumProp1, enumProp2, nonEnumProp]);

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

      expect(obj).to.have.all.keys([sym1, sym2, str]);
      expect(obj).to.not.have.all.keys([sym1, sym2, sym3, str]);
    }

    if (typeof Map !== 'undefined') {
      // Not using Map constructor args because not supported in IE 11.
      var aKey = {thisIs: 'anExampleObject'}
        , anotherKey = {doingThisBecauseOf: 'referential equality'}
        , testMap = new Map();

      testMap.set(aKey, 'aValue');
      testMap.set(anotherKey, 'anotherValue');

      expect(testMap).to.have.any.keys(aKey);
      expect(testMap).to.have.any.keys('thisDoesNotExist', 'thisToo', aKey);
      expect(testMap).to.have.all.keys(aKey, anotherKey);

      expect(testMap).to.contain.all.keys(aKey);
      expect(testMap).to.not.contain.all.keys(aKey, 'thisDoesNotExist');

      expect(testMap).to.not.have.any.keys({iDoNot: 'exist'});
      expect(testMap).to.not.have.any.keys('thisIsNotAkey', {iDoNot: 'exist'}, {33: 20});
      expect(testMap).to.not.have.all.keys('thisDoesNotExist', 'thisToo', anotherKey);

      expect(testMap).to.have.any.keys([aKey]);
      expect(testMap).to.have.any.keys([20, 1, aKey]);
      expect(testMap).to.have.all.keys([aKey, anotherKey]);

      expect(testMap).to.not.have.any.keys([{13: 37}, 'thisDoesNotExist', 'thisToo']);
      expect(testMap).to.not.have.any.keys([20, 1, {13: 37}]);
      expect(testMap).to.not.have.all.keys([aKey, {'iDoNot': 'exist'}]);

      // Ensure the assertions above use strict equality
      err(function() {
        expect(testMap).to.have.any.keys({thisIs: 'anExampleObject'});
      });

      err(function() {
        expect(testMap).to.have.all.keys({thisIs: 'anExampleObject'}, {doingThisBecauseOf: 'referential equality'});
      });

      err(function() {
        expect(testMap).to.contain.all.keys({thisIs: 'anExampleObject'});
      });

      err(function() {
        expect(testMap).to.have.any.keys([{thisIs: 'anExampleObject'}]);
      });

      err(function() {
        expect(testMap).to.have.all.keys([{thisIs: 'anExampleObject'}, {doingThisBecauseOf: 'referential equality'}]);
      });

      // Using the same assertions as above but with `.deep` flag instead of using referential equality
      expect(testMap).to.have.any.deep.keys({thisIs: 'anExampleObject'});
      expect(testMap).to.have.any.deep.keys('thisDoesNotExist', 'thisToo', {thisIs: 'anExampleObject'});

      expect(testMap).to.contain.all.deep.keys({thisIs: 'anExampleObject'});
      expect(testMap).to.not.contain.all.deep.keys({thisIs: 'anExampleObject'}, 'thisDoesNotExist');

      expect(testMap).to.not.have.any.deep.keys({iDoNot: 'exist'});
      expect(testMap).to.not.have.any.deep.keys('thisIsNotAkey', {iDoNot: 'exist'}, {33: 20});
      expect(testMap).to.not.have.all.deep.keys('thisDoesNotExist', 'thisToo', {doingThisBecauseOf: 'referential equality'});

      expect(testMap).to.have.any.deep.keys([{thisIs: 'anExampleObject'}]);
      expect(testMap).to.have.any.deep.keys([20, 1, {thisIs: 'anExampleObject'}]);

      expect(testMap).to.have.all.deep.keys({thisIs: 'anExampleObject'}, {doingThisBecauseOf: 'referential equality'});

      expect(testMap).to.not.have.any.deep.keys([{13: 37}, 'thisDoesNotExist', 'thisToo']);
      expect(testMap).to.not.have.any.deep.keys([20, 1, {13: 37}]);
      expect(testMap).to.not.have.all.deep.keys([{thisIs: 'anExampleObject'}, {'iDoNot': 'exist'}]);

      var weirdMapKey1 = Object.create(null)
        , weirdMapKey2 = {toString: NaN}
        , weirdMapKey3 = []
        , weirdMap = new Map();

      weirdMap.set(weirdMapKey1, 'val1');
      weirdMap.set(weirdMapKey2, 'val2');

      expect(weirdMap).to.have.all.keys([weirdMapKey1, weirdMapKey2]);
      expect(weirdMap).to.not.have.all.keys([weirdMapKey1, weirdMapKey3]);

      if (typeof Symbol === 'function') {
        var symMapKey1 = Symbol()
          , symMapKey2 = Symbol()
          , symMapKey3 = Symbol()
          , symMap = new Map();

        symMap.set(symMapKey1, 'val1');
        symMap.set(symMapKey2, 'val2');

        expect(symMap).to.have.all.keys(symMapKey1, symMapKey2);
        expect(symMap).to.have.any.keys(symMapKey1, symMapKey3);
        expect(symMap).to.contain.all.keys(symMapKey2, symMapKey1);
        expect(symMap).to.contain.any.keys(symMapKey3, symMapKey1);

        expect(symMap).to.not.have.all.keys(symMapKey1, symMapKey3);
        expect(symMap).to.not.have.any.keys(symMapKey3);
        expect(symMap).to.not.contain.all.keys(symMapKey3, symMapKey1);
        expect(symMap).to.not.contain.any.keys(symMapKey3);
      }

      var errMap = new Map();

      errMap.set({ foo: 1 });

      err(function(){
        expect(errMap, 'blah').to.have.keys();
      }, "blah: keys required");

      err(function(){
        expect(errMap).to.have.keys([]);
      }, "keys required");

      err(function(){
        expect(errMap).to.contain.keys();
      }, "keys required");

      err(function(){
        expect(errMap).to.contain.keys([]);
      }, "keys required");

      // Uncomment this after solving https://github.com/chaijs/chai/issues/662
      // This should fail because of referential equality (this is a strict comparison)
      // err(function(){
      //   expect(new Map([[{foo: 1}, 'bar']])).to.contain.keys({ foo: 1 });
      // }, 'expected [ [ { foo: 1 }, 'bar' ] ] to contain key { foo: 1 }');

      // err(function(){
      //   expect(new Map([[{foo: 1}, 'bar']])).to.contain.deep.keys({ iDoNotExist: 0 })
      // }, 'expected [ { foo: 1 } ] to deeply contain key { iDoNotExist: 0 }');
    }

    if (typeof Set !== 'undefined') {
      // Not using Set constructor args because not supported in IE 11.
      var aKey = {thisIs: 'anExampleObject'}
        , anotherKey = {doingThisBecauseOf: 'referential equality'}
        , testSet = new Set();

      testSet.add(aKey);
      testSet.add(anotherKey);

      expect(testSet).to.have.any.keys(aKey);
      expect(testSet).to.have.any.keys('thisDoesNotExist', 'thisToo', aKey);
      expect(testSet).to.have.all.keys(aKey, anotherKey);

      expect(testSet).to.contain.all.keys(aKey);
      expect(testSet).to.not.contain.all.keys(aKey, 'thisDoesNotExist');

      expect(testSet).to.not.have.any.keys({iDoNot: 'exist'});
      expect(testSet).to.not.have.any.keys('thisIsNotAkey', {iDoNot: 'exist'}, {33: 20});
      expect(testSet).to.not.have.all.keys('thisDoesNotExist', 'thisToo', anotherKey);

      expect(testSet).to.have.any.keys([aKey]);
      expect(testSet).to.have.any.keys([20, 1, aKey]);
      expect(testSet).to.have.all.keys([aKey, anotherKey]);

      expect(testSet).to.not.have.any.keys([{13: 37}, 'thisDoesNotExist', 'thisToo']);
      expect(testSet).to.not.have.any.keys([20, 1, {13: 37}]);
      expect(testSet).to.not.have.all.keys([aKey, {'iDoNot': 'exist'}]);

      // Ensure the assertions above use strict equality
      err(function() {
        expect(testSet).to.have.any.keys({thisIs: 'anExampleObject'});
      });

      err(function() {
        expect(testSet).to.have.all.keys({thisIs: 'anExampleObject'}, {doingThisBecauseOf: 'referential equality'});
      });

      err(function() {
        expect(testSet).to.contain.all.keys({thisIs: 'anExampleObject'});
      });

      err(function() {
        expect(testSet).to.have.any.keys([{thisIs: 'anExampleObject'}]);
      });

      err(function() {
        expect(testSet).to.have.all.keys([{thisIs: 'anExampleObject'}, {doingThisBecauseOf: 'referential equality'}]);
      });

      // Using the same assertions as above but with `.deep` flag instead of using referential equality
      expect(testSet).to.have.any.deep.keys({thisIs: 'anExampleObject'});
      expect(testSet).to.have.any.deep.keys('thisDoesNotExist', 'thisToo', {thisIs: 'anExampleObject'});

      expect(testSet).to.contain.all.deep.keys({thisIs: 'anExampleObject'});
      expect(testSet).to.not.contain.all.deep.keys({thisIs: 'anExampleObject'}, 'thisDoesNotExist');

      expect(testSet).to.not.have.any.deep.keys({iDoNot: 'exist'});
      expect(testSet).to.not.have.any.deep.keys('thisIsNotAkey', {iDoNot: 'exist'}, {33: 20});
      expect(testSet).to.not.have.all.deep.keys('thisDoesNotExist', 'thisToo', {doingThisBecauseOf: 'referential equality'});

      expect(testSet).to.have.any.deep.keys([{thisIs: 'anExampleObject'}]);
      expect(testSet).to.have.any.deep.keys([20, 1, {thisIs: 'anExampleObject'}]);

      expect(testSet).to.have.all.deep.keys([{thisIs: 'anExampleObject'}, {doingThisBecauseOf: 'referential equality'}]);

      expect(testSet).to.not.have.any.deep.keys([{13: 37}, 'thisDoesNotExist', 'thisToo']);
      expect(testSet).to.not.have.any.deep.keys([20, 1, {13: 37}]);
      expect(testSet).to.not.have.all.deep.keys([{thisIs: 'anExampleObject'}, {'iDoNot': 'exist'}]);

      var weirdSetKey1 = Object.create(null)
        , weirdSetKey2 = {toString: NaN}
        , weirdSetKey3 = []
        , weirdSet = new Set();

      weirdSet.add(weirdSetKey1);
      weirdSet.add(weirdSetKey2);

      expect(weirdSet).to.have.all.keys([weirdSetKey1, weirdSetKey2]);
      expect(weirdSet).to.not.have.all.keys([weirdSetKey1, weirdSetKey3]);

      if (typeof Symbol === 'function') {
        var symSetKey1 = Symbol()
          , symSetKey2 = Symbol()
          , symSetKey3 = Symbol()
          , symSet = new Set();

        symSet.add(symSetKey1);
        symSet.add(symSetKey2);

        expect(symSet).to.have.all.keys(symSetKey1, symSetKey2);
        expect(symSet).to.have.any.keys(symSetKey1, symSetKey3);
        expect(symSet).to.contain.all.keys(symSetKey2, symSetKey1);
        expect(symSet).to.contain.any.keys(symSetKey3, symSetKey1);

        expect(symSet).to.not.have.all.keys(symSetKey1, symSetKey3);
        expect(symSet).to.not.have.any.keys(symSetKey3);
        expect(symSet).to.not.contain.all.keys(symSetKey3, symSetKey1);
        expect(symSet).to.not.contain.any.keys(symSetKey3);
      }

      var errSet = new Set();
      errSet.add({ foo: 1});

      err(function(){
        expect(errSet, 'blah').to.have.keys();
      }, "blah: keys required");

      err(function(){
        expect(errSet).to.have.keys([]);
      }, "keys required");

      err(function(){
        expect(errSet).to.contain.keys();
      }, "keys required");

      err(function(){
        expect(errSet).to.contain.keys([]);
      }, "keys required");

      // Uncomment this after solving https://github.com/chaijs/chai/issues/662
      // This should fail because of referential equality (this is a strict comparison)
      // err(function(){
      //   expect(new Set([{foo: 1}])).to.contain.keys({ foo: 1 });
      // }, 'expected [ { foo: 1 } ] to deeply contain key { foo: 1 }');

      // err(function(){
      //   expect(new Set([{foo: 1}])).to.contain.deep.keys({ iDoNotExist: 0 });
      // }, 'expected [ { foo: 1 } ] to deeply contain key { iDoNotExist: 0 }');
    }

    err(function(){
      expect({ foo: 1 }, 'blah').to.have.keys();
    }, "blah: keys required");

    err(function(){
      expect({ foo: 1 }).to.have.keys([]);
    }, "keys required");

    err(function(){
      expect({ foo: 1 }).to.not.have.keys([]);
    }, "keys required");

    err(function(){
      expect({ foo: 1 }).to.contain.keys([]);
    }, "keys required");

    var mixedArgsMsg = 'blah: when testing keys against an object or an array you must give a single Array|Object|String argument or multiple String arguments'

    err(function(){
      expect({}, 'blah').contain.keys(['a'], "b");
    }, mixedArgsMsg);

    err(function(){
      expect({}, 'blah').contain.keys({ 'a': 1 }, "b");
    }, mixedArgsMsg);

    err(function(){
      expect({ foo: 1 }, 'blah').to.have.keys(['bar']);
    }, "blah: expected { foo: 1 } to have key 'bar'");

    err(function(){
      expect({ foo: 1 }).to.have.keys(['bar', 'baz']);
    }, "expected { foo: 1 } to have keys 'bar', and 'baz'");

    err(function(){
      expect({ foo: 1 }).to.have.keys(['foo', 'bar', 'baz']);
    }, "expected { foo: 1 } to have keys 'foo', 'bar', and 'baz'");

    err(function(){
      expect({ foo: 1 }).to.not.have.keys(['foo']);
    }, "expected { foo: 1 } to not have key 'foo'");

    err(function(){
      expect({ foo: 1 }).to.not.have.keys(['foo']);
    }, "expected { foo: 1 } to not have key 'foo'");

    err(function(){
      expect({ foo: 1, bar: 2 }).to.not.have.keys(['foo', 'bar']);
    }, "expected { foo: 1, bar: 2 } to not have keys 'foo', and 'bar'");

    err(function(){
      expect({ foo: 1, bar: 2 }).to.have.all.keys('foo');
    }, "expected { foo: 1, bar: 2 } to have key 'foo'");

    err(function(){
      expect({ foo: 1 }).to.not.contain.keys(['foo']);
    }, "expected { foo: 1 } to not contain key 'foo'");

    err(function(){
      expect({ foo: 1 }).to.contain.keys('foo', 'bar');
    }, "expected { foo: 1 } to contain keys 'foo', and 'bar'");

    err(function() {
      expect({ foo: 1 }).to.have.any.keys('baz');
    }, "expected { foo: 1 } to have key 'baz'");

    err(function(){
      expect({ foo: 1, bar: 2 }).to.not.have.all.keys(['foo', 'bar']);
    }, "expected { foo: 1, bar: 2 } to not have keys 'foo', and 'bar'");

    err(function(){
      expect({ foo: 1, bar: 2 }).to.not.have.any.keys(['foo', 'baz']);
    }, "expected { foo: 1, bar: 2 } to not have keys 'foo', or 'baz'");

    // repeat previous tests with Object as arg.
    err(function(){
      expect({ foo: 1 }, 'blah').have.keys({ 'bar': 1 });
    }, "blah: expected { foo: 1 } to have key 'bar'");

    err(function(){
      expect({ foo: 1 }).have.keys({ 'bar': 1, 'baz': 1});
    }, "expected { foo: 1 } to have keys 'bar', and 'baz'");

    err(function(){
      expect({ foo: 1 }).have.keys({ 'foo': 1, 'bar': 1, 'baz': 1});
    }, "expected { foo: 1 } to have keys 'foo', 'bar', and 'baz'");

    err(function(){
      expect({ foo: 1 }).not.have.keys({ 'foo': 1 });
    }, "expected { foo: 1 } to not have key 'foo'");

    err(function(){
      expect({ foo: 1 }).not.have.keys({ 'foo': 1 });
    }, "expected { foo: 1 } to not have key 'foo'");

    err(function(){
      expect({ foo: 1, bar: 2 }).not.have.keys({ 'foo': 1, 'bar': 1});
    }, "expected { foo: 1, bar: 2 } to not have keys 'foo', and 'bar'");

    err(function(){
      expect({ foo: 1 }).not.contain.keys({ 'foo': 1 });
    }, "expected { foo: 1 } to not contain key 'foo'");

    err(function(){
      expect({ foo: 1 }).contain.keys('foo', 'bar');
    }, "expected { foo: 1 } to contain keys 'foo', and 'bar'");

    err(function() {
      expect({ foo: 1 }).have.any.keys('baz');
    }, "expected { foo: 1 } to have key 'baz'");

    err(function(){
      expect({ foo: 1, bar: 2 }).not.have.all.keys({ 'foo': 1, 'bar': 1});
    }, "expected { foo: 1, bar: 2 } to not have keys 'foo', and 'bar'");

    err(function(){
      expect({ foo: 1, bar: 2 }).not.have.any.keys({ 'foo': 1, 'baz': 1});
    }, "expected { foo: 1, bar: 2 } to not have keys 'foo', or 'baz'");

  });

  it('keys(array) will not mutate array (#359)', function () {
      var expected = [ 'b', 'a' ];
      var original_order = [ 'b', 'a' ];
      var obj = { "b": 1, "a": 1 };
      expect(expected).deep.equal(original_order);
      expect(obj).keys(original_order);
      expect(expected).deep.equal(original_order);
  });

  it('chaining', function(){
    var tea = { name: 'chai', extras: ['milk', 'sugar', 'smile'] };
    expect(tea).to.have.property('extras').with.lengthOf(3);

    expect(tea).to.have.property('extras').which.contains('smile');

    err(function(){
      expect(tea).to.have.property('extras').with.lengthOf(4);
    }, "expected [ 'milk', 'sugar', 'smile' ] to have a length of 4 but got 3");

    expect(tea).to.be.a('object').and.have.property('name', 'chai');

    var badFn = function () { throw new Error('testing'); };

    expect(badFn).to.throw(Error).with.property('message', 'testing');
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
      , refErrFn = function () { throw new ReferenceError('hello'); }
      , ickyErrFn = function () { throw new PoorlyConstructedError(); }
      , specificErrFn = function () { throw specificError; }
      , customErrFn = function() { throw new CustomError('foo'); }
      , emptyErrFn = function () { throw new Error(); }
      , emptyStringErrFn = function () { throw new Error(''); };

    expect(goodFn).to.not.throw();
    expect(goodFn).to.not.throw(Error);
    expect(goodFn).to.not.throw(specificError);
    expect(badFn).to.throw();
    expect(badFn).to.throw(Error);
    expect(badFn).to.not.throw(ReferenceError);
    expect(badFn).to.not.throw(specificError);
    expect(refErrFn).to.throw();
    expect(refErrFn).to.throw(ReferenceError);
    expect(refErrFn).to.throw(Error);
    expect(refErrFn).to.not.throw(TypeError);
    expect(refErrFn).to.not.throw(specificError);
    expect(ickyErrFn).to.throw();
    expect(ickyErrFn).to.throw(PoorlyConstructedError);
    expect(ickyErrFn).to.throw(Error);
    expect(ickyErrFn).to.not.throw(specificError);
    expect(specificErrFn).to.throw(specificError);

    expect(goodFn).to.not.throw('testing');
    expect(goodFn).to.not.throw(/testing/);
    expect(badFn).to.throw(/testing/);
    expect(badFn).to.not.throw(/hello/);
    expect(badFn).to.throw('testing');
    expect(badFn).to.not.throw('hello');
    expect(emptyStringErrFn).to.throw('');
    expect(emptyStringErrFn).to.not.throw('testing');
    expect(badFn).to.throw('');

    expect(badFn).to.throw(Error, /testing/);
    expect(badFn).to.throw(Error, 'testing');
    expect(emptyErrFn).to.not.throw(Error, 'testing');

    expect(badFn).to.not.throw(Error, 'I am the wrong error message');
    expect(badFn).to.not.throw(TypeError, 'testing');

    err(function(){
      expect(goodFn, 'blah').to.throw();
    }, /^blah: expected \[Function( goodFn)*\] to throw an error$/);

    err(function(){
      expect(goodFn, 'blah').to.throw(ReferenceError);
    }, /^blah: expected \[Function( goodFn)*\] to throw ReferenceError$/);

    err(function(){
      expect(goodFn, 'blah').to.throw(specificError);
    }, /^blah: expected \[Function( goodFn)*\] to throw 'RangeError: boo'$/);

    err(function(){
      expect(badFn, 'blah').to.not.throw();
    }, /^blah: expected \[Function( badFn)*\] to not throw an error but 'Error: testing' was thrown$/);

    err(function(){
      expect(badFn, 'blah').to.throw(ReferenceError);
    }, /^blah: expected \[Function( badFn)*\] to throw 'ReferenceError' but 'Error: testing' was thrown$/);

    err(function(){
      expect(badFn, 'blah').to.throw(specificError);
    }, /^blah: expected \[Function( badFn)*\] to throw 'RangeError: boo' but 'Error: testing' was thrown$/);

    err(function(){
      expect(badFn, 'blah').to.not.throw(Error);
    }, /^blah: expected \[Function( badFn)*\] to not throw 'Error' but 'Error: testing' was thrown$/);

    err(function(){
      expect(refErrFn, 'blah').to.not.throw(ReferenceError);
    }, /^blah: expected \[Function( refErrFn)*\] to not throw 'ReferenceError' but 'ReferenceError: hello' was thrown$/);

    err(function(){
      expect(badFn, 'blah').to.throw(PoorlyConstructedError);
    }, /^blah: expected \[Function( badFn)*\] to throw 'PoorlyConstructedError' but 'Error: testing' was thrown$/);

    err(function(){
      expect(ickyErrFn, 'blah').to.not.throw(PoorlyConstructedError);
    }, /^blah: (expected \[Function( ickyErrFn)*\] to not throw 'PoorlyConstructedError' but)(.*)(PoorlyConstructedError|\{ Object \()(.*)(was thrown)$/);

    err(function(){
      expect(ickyErrFn, 'blah').to.throw(ReferenceError);
    }, /^blah: (expected \[Function( ickyErrFn)*\] to throw 'ReferenceError' but)(.*)(PoorlyConstructedError|\{ Object \()(.*)(was thrown)$/);

    err(function(){
      expect(specificErrFn, 'blah').to.throw(new ReferenceError('eek'));
    }, /^blah: expected \[Function( specificErrFn)*\] to throw 'ReferenceError: eek' but 'RangeError: boo' was thrown$/);

    err(function(){
      expect(specificErrFn, 'blah').to.not.throw(specificError);
    }, /^blah: expected \[Function( specificErrFn)*\] to not throw 'RangeError: boo'$/);

    err(function (){
      expect(badFn, 'blah').to.not.throw(/testing/);
    }, /^blah: expected \[Function( badFn)*\] to throw error not matching \/testing\/$/);

    err(function () {
      expect(badFn, 'blah').to.throw(/hello/);
    }, /^blah: expected \[Function( badFn)*\] to throw error matching \/hello\/ but got 'testing'$/);

    err(function () {
      expect(badFn).to.throw(Error, /hello/, 'blah');
    }, /^blah: expected \[Function( badFn)*\] to throw error matching \/hello\/ but got 'testing'$/);

    err(function () {
      expect(badFn, 'blah').to.throw(Error, /hello/);
    }, /^blah: expected \[Function( badFn)*\] to throw error matching \/hello\/ but got 'testing'$/);

    err(function () {
      expect(badFn).to.throw(Error, 'hello', 'blah');
    }, /^blah: expected \[Function( badFn)*\] to throw error including 'hello' but got 'testing'$/);

    err(function () {
      expect(badFn, 'blah').to.throw(Error, 'hello');
    }, /^blah: expected \[Function( badFn)*\] to throw error including 'hello' but got 'testing'$/);

    err(function () {
      expect(customErrFn, 'blah').to.not.throw();
    }, /^blah: expected \[Function( customErrFn)*\] to not throw an error but 'CustomError: foo' was thrown$/);

    err(function(){
      expect(badFn).to.not.throw(Error, 'testing', 'blah');
    }, /^blah: expected \[Function( badFn)*\] to not throw 'Error' but 'Error: testing' was thrown$/);

    err(function(){
      expect(badFn, 'blah').to.not.throw(Error, 'testing');
    }, /^blah: expected \[Function( badFn)*\] to not throw 'Error' but 'Error: testing' was thrown$/);

    err(function(){
      expect(emptyStringErrFn).to.not.throw(Error, '', 'blah');
    }, /^blah: expected \[Function( emptyStringErrFn)*\] to not throw 'Error' but 'Error' was thrown$/);

    err(function(){
      expect(emptyStringErrFn, 'blah').to.not.throw(Error, '');
    }, /^blah: expected \[Function( emptyStringErrFn)*\] to not throw 'Error' but 'Error' was thrown$/);

    err(function(){
      expect(emptyStringErrFn, 'blah').to.not.throw('');
    }, /^blah: expected \[Function( emptyStringErrFn)*\] to throw error not including ''$/);

    err(function () {
      expect({}, 'blah').to.throw();
    }, "blah: expected {} to be a function");

    err(function () {
      expect({}).to.throw(Error, 'testing', 'blah');
    }, "blah: expected {} to be a function");
  });

  it('respondTo', function(){
    function Foo(){};
    Foo.prototype.bar = function(){};
    Foo.func = function() {};

    var bar = {};
    bar.foo = function(){};

    expect(Foo).to.respondTo('bar');
    expect(Foo).to.not.respondTo('foo');
    expect(Foo).itself.to.respondTo('func');
    expect(Foo).itself.not.to.respondTo('bar');

    expect(bar).to.respondTo('foo');

    err(function(){
      expect(Foo).to.respondTo('baz', 'constructor');
    }, /^(constructor: expected)(.*)(\[Function Foo\])(.*)(to respond to \'baz\')$/);

    err(function(){
      expect(Foo, 'constructor').to.respondTo('baz');
    }, /^(constructor: expected)(.*)(\[Function Foo\])(.*)(to respond to \'baz\')$/);

    err(function(){
      expect(bar).to.respondTo('baz', 'object');
    }, /^(object: expected)(.*)(\{ foo: \[Function\] \}|\{ Object \()(.*)(to respond to \'baz\')$/);

    err(function(){
      expect(bar, 'object').to.respondTo('baz');
    }, /^(object: expected)(.*)(\{ foo: \[Function\] \}|\{ Object \()(.*)(to respond to \'baz\')$/);
  });

  it('satisfy', function(){
    var matcher = function (num) {
      return num === 1;
    };

    expect(1).to.satisfy(matcher);

    err(function(){
      expect(2).to.satisfy(matcher, 'blah');
    }, /^blah: expected 2 to satisfy \[Function( matcher)*\]$/);

    err(function(){
      expect(2, 'blah').to.satisfy(matcher);
    }, /^blah: expected 2 to satisfy \[Function( matcher)*\]$/);
  });

  it('closeTo', function(){
    expect(1.5).to.be.closeTo(1.0, 0.5);
    expect(10).to.be.closeTo(20, 20);
    expect(-10).to.be.closeTo(20, 30);

    err(function(){
      expect(2).to.be.closeTo(1.0, 0.5, 'blah');
    }, "blah: expected 2 to be close to 1 +/- 0.5");

    err(function(){
      expect(2, 'blah').to.be.closeTo(1.0, 0.5);
    }, "blah: expected 2 to be close to 1 +/- 0.5");

    err(function(){
      expect(-10).to.be.closeTo(20, 29, 'blah');
    }, "blah: expected -10 to be close to 20 +/- 29");

    err(function() {
      expect([1.5]).to.be.closeTo(1.0, 0.5, 'blah');
    }, "blah: expected [ 1.5 ] to be a number");

    err(function() {
      expect([1.5], 'blah').to.be.closeTo(1.0, 0.5);
    }, "blah: expected [ 1.5 ] to be a number");

    err(function() {
      expect(1.5).to.be.closeTo("1.0", 0.5, 'blah');
    }, "blah: the arguments to closeTo or approximately must be numbers");

    err(function() {
      expect(1.5, 'blah').to.be.closeTo("1.0", 0.5);
    }, "blah: the arguments to closeTo or approximately must be numbers");

    err(function() {
      expect(1.5).to.be.closeTo(1.0, true, 'blah');
    }, "blah: the arguments to closeTo or approximately must be numbers");

    err(function() {
      expect(1.5, 'blah').to.be.closeTo(1.0, true);
    }, "blah: the arguments to closeTo or approximately must be numbers");

    err(function() {
      expect(1.5, 'blah').to.be.closeTo(1.0);
    }, "blah: the arguments to closeTo or approximately must be numbers, and a delta is required");
  });

  it('approximately', function(){
    expect(1.5).to.be.approximately(1.0, 0.5);
    expect(10).to.be.approximately(20, 20);
    expect(-10).to.be.approximately(20, 30);

    err(function(){
      expect(2).to.be.approximately(1.0, 0.5, 'blah');
    }, "blah: expected 2 to be close to 1 +/- 0.5");

    err(function(){
      expect(-10).to.be.approximately(20, 29, 'blah');
    }, "blah: expected -10 to be close to 20 +/- 29");

    err(function() {
      expect([1.5]).to.be.approximately(1.0, 0.5);
    }, "expected [ 1.5 ] to be a number");

    err(function() {
      expect(1.5).to.be.approximately("1.0", 0.5);
    }, "the arguments to closeTo or approximately must be numbers");

    err(function() {
      expect(1.5).to.be.approximately(1.0, true);
    }, "the arguments to closeTo or approximately must be numbers");

    err(function() {
      expect(1.5).to.be.approximately(1.0);
    }, "the arguments to closeTo or approximately must be numbers, and a delta is required");
  });

  it('oneOf', function() {
    expect(1).to.be.oneOf([1, 2, 3]);
    expect('1').to.not.be.oneOf([1, 2, 3]);
    expect([3, [4]]).to.not.be.oneOf([1, 2, [3, 4]]);
    var threeFour = [3, [4]];
    expect(threeFour).to.be.oneOf([1, 2, threeFour]);
    expect([]).to.be.deep.oneOf([[], '']);

    expect([1, 2]).to.contain.oneOf([4,2,5]);
    expect([3, 4]).to.not.contain.oneOf([2,1,5]);

    expect('The quick brown fox jumps over the lazy dog').to.contain.oneOf(['cat', 'dog', 'bird']);
    expect('The quick brown fox jumps over the lazy dog').to.not.contain.oneOf(['elephant', 'pigeon', 'lynx']);

    err(function () {
      expect(1).to.be.oneOf([2, 3], 'blah');
    }, "blah: expected 1 to be one of [ 2, 3 ]");

    err(function () {
      expect(1, 'blah').to.be.oneOf([2, 3]);
    }, "blah: expected 1 to be one of [ 2, 3 ]");

    err(function () {
      expect(1).to.not.be.oneOf([1, 2, 3], 'blah');
    }, "blah: expected 1 to not be one of [ 1, 2, 3 ]");

    err(function () {
      expect(1, 'blah').to.not.be.oneOf([1, 2, 3]);
    }, "blah: expected 1 to not be one of [ 1, 2, 3 ]");

    err(function () {
      expect(1).to.be.oneOf({}, 'blah');
    }, "blah: expected {} to be an array");

    err(function () {
      expect(1, 'blah').to.be.oneOf({});
    }, "blah: expected {} to be an array");
  });

  it('include.members', function() {
    expect([1, 2, 3]).to.include.members([]);
    expect([1, 2, 3]).to.include.members([3, 2]);
    expect([1, 2, 3]).to.include.members([3, 2, 2]);
    expect([1, 2, 3]).to.not.include.members([8, 4]);
    expect([1, 2, 3]).to.not.include.members([1, 2, 3, 4]);
    expect([{a: 1}]).to.not.include.members([{a: 1}]);

    err(function() {
      expect([1, 2, 3]).to.include.members([2, 5], 'blah');
    }, 'blah: expected [ 1, 2, 3 ] to be a superset of [ 2, 5 ]');

    err(function() {
      expect([1, 2, 3], 'blah').to.include.members([2, 5]);
    }, 'blah: expected [ 1, 2, 3 ] to be a superset of [ 2, 5 ]');

    err(function() {
      expect([1, 2, 3]).to.not.include.members([2, 1]);
    }, 'expected [ 1, 2, 3 ] to not be a superset of [ 2, 1 ]');
  });

  it('same.members', function() {
    expect([5, 4]).to.have.same.members([4, 5]);
    expect([5, 4]).to.have.same.members([5, 4]);
    expect([5, 4, 4]).to.have.same.members([5, 4, 4]);
    expect([5, 4]).to.not.have.same.members([]);
    expect([5, 4]).to.not.have.same.members([6, 3]);
    expect([5, 4]).to.not.have.same.members([5, 4, 2]);
    expect([5, 4]).to.not.have.same.members([5, 4, 4]);
    expect([5, 4, 4]).to.not.have.same.members([5, 4]);
    expect([5, 4, 4]).to.not.have.same.members([5, 4, 3]);
    expect([5, 4, 3]).to.not.have.same.members([5, 4, 4]);
  });

  it('members', function() {
    expect([5, 4]).members([4, 5]);
    expect([5, 4]).members([5, 4]);
    expect([5, 4, 4]).members([5, 4, 4]);
    expect([5, 4]).not.members([]);
    expect([5, 4]).not.members([6, 3]);
    expect([5, 4]).not.members([5, 4, 2]);
    expect([5, 4]).not.members([5, 4, 4]);
    expect([5, 4, 4]).not.members([5, 4]);
    expect([5, 4, 4]).not.members([5, 4, 3]);
    expect([5, 4, 3]).not.members([5, 4, 4]);
    expect([{ id: 1 }]).not.members([{ id: 1 }]);

    err(function() {
      expect([1, 2, 3]).members([2, 1, 5], 'blah');
    }, 'blah: expected [ 1, 2, 3 ] to have the same members as [ 2, 1, 5 ]');

    err(function() {
      expect([1, 2, 3], 'blah').members([2, 1, 5]);
    }, 'blah: expected [ 1, 2, 3 ] to have the same members as [ 2, 1, 5 ]');

    err(function() {
      expect([1, 2, 3]).not.members([2, 1, 3]);
    }, 'expected [ 1, 2, 3 ] to not have the same members as [ 2, 1, 3 ]');

    err(function () {
      expect({}).members([], 'blah');
    }, 'blah: expected {} to be an array');

    err(function () {
      expect({}, 'blah').members([]);
    }, 'blah: expected {} to be an array');

    err(function () {
      expect([]).members({}, 'blah');
    }, 'blah: expected {} to be an array');

    err(function () {
      expect([], 'blah').members({});
    }, 'blah: expected {} to be an array');
  });

  it('deep.members', function() {
    expect([{ id: 1 }]).deep.members([{ id: 1 }]);
    expect([{a: 1}, {b: 2}, {b: 2}]).deep.members([{a: 1}, {b: 2}, {b: 2}]);

    expect([{ id: 2 }]).not.deep.members([{ id: 1 }]);
    expect([{a: 1}, {b: 2}]).not.deep.members([{a: 1}, {b: 2}, {b: 2}]);
    expect([{a: 1}, {b: 2}, {b: 2}]).not.deep.members([{a: 1}, {b: 2}]);
    expect([{a: 1}, {b: 2}, {b: 2}]).not.deep.members([{a: 1}, {b: 2}, {c: 3}]);
    expect([{a: 1}, {b: 2}, {c: 3}]).not.deep.members([{a: 1}, {b: 2}, {b: 2}]);

    err(function(){
      expect([{ id: 1 }]).deep.members([{ id: 2 }], 'blah')
    }, 'blah: expected [ { id: 1 } ] to have the same members as [ { id: 2 } ]');

    err(function(){
      expect([{ id: 1 }], 'blah').deep.members([{ id: 2 }])
    }, 'blah: expected [ { id: 1 } ] to have the same members as [ { id: 2 } ]');
  });

  it('include.deep.members', function() {
    expect([{a: 1}, {b: 2}, {c: 3}]).include.deep.members([{b: 2}, {a: 1}]);
    expect([{a: 1}, {b: 2}, {c: 3}]).include.deep.members([{b: 2}, {a: 1}, {a: 1}]);
    expect([{a: 1}, {b: 2}, {c: 3}]).not.include.deep.members([{b: 2}, {a: 1}, {f: 5}]);

    err(function() {
      expect([{a: 1}, {b: 2}, {c: 3}]).include.deep.members([{b: 2}, {a: 1}, {f: 5}], 'blah');
    }, 'blah: expected [ { a: 1 }, { b: 2 }, { c: 3 } ] to be a superset of [ { b: 2 }, { a: 1 }, { f: 5 } ]');

    err(function() {
      expect([{a: 1}, {b: 2}, {c: 3}], 'blah').include.deep.members([{b: 2}, {a: 1}, {f: 5}]);
    }, 'blah: expected [ { a: 1 }, { b: 2 }, { c: 3 } ] to be a superset of [ { b: 2 }, { a: 1 }, { f: 5 } ]');
  });

  it('ordered.members', function() {
    expect([1, 2, 3]).ordered.members([1, 2, 3]);
    expect([1, 2, 2]).ordered.members([1, 2, 2]);

    expect([1, 2, 3]).not.ordered.members([2, 1, 3]);
    expect([1, 2, 3]).not.ordered.members([1, 2]);
    expect([1, 2]).not.ordered.members([1, 2, 2]);
    expect([1, 2, 2]).not.ordered.members([1, 2]);
    expect([1, 2, 2]).not.ordered.members([1, 2, 3]);
    expect([1, 2, 3]).not.ordered.members([1, 2, 2]);

    err(function() {
      expect([1, 2, 3]).ordered.members([2, 1, 3], 'blah');
    }, 'blah: expected [ 1, 2, 3 ] to have the same ordered members as [ 2, 1, 3 ]');

    err(function() {
      expect([1, 2, 3], 'blah').ordered.members([2, 1, 3]);
    }, 'blah: expected [ 1, 2, 3 ] to have the same ordered members as [ 2, 1, 3 ]');

    err(function() {
      expect([1, 2, 3]).not.ordered.members([1, 2, 3]);
    }, 'expected [ 1, 2, 3 ] to not have the same ordered members as [ 1, 2, 3 ]');
  });

  it('include.ordered.members', function() {
    expect([1, 2, 3]).include.ordered.members([1, 2]);
    expect([1, 2, 3]).not.include.ordered.members([2, 1]);
    expect([1, 2, 3]).not.include.ordered.members([2, 3]);
    expect([1, 2, 3]).not.include.ordered.members([1, 2, 2]);

    err(function() {
      expect([1, 2, 3]).include.ordered.members([2, 1], 'blah');
    }, 'blah: expected [ 1, 2, 3 ] to be an ordered superset of [ 2, 1 ]');

    err(function() {
      expect([1, 2, 3], 'blah').include.ordered.members([2, 1]);
    }, 'blah: expected [ 1, 2, 3 ] to be an ordered superset of [ 2, 1 ]');

    err(function() {
      expect([1, 2, 3]).not.include.ordered.members([1, 2]);
    }, 'expected [ 1, 2, 3 ] to not be an ordered superset of [ 1, 2 ]');
  });

  it('deep.ordered.members', function() {
    expect([{a: 1}, {b: 2}, {c: 3}]).deep.ordered.members([{a: 1}, {b: 2}, {c: 3}]);
    expect([{a: 1}, {b: 2}, {b: 2}]).deep.ordered.members([{a: 1}, {b: 2}, {b: 2}]);

    expect([{a: 1}, {b: 2}, {c: 3}]).not.deep.ordered.members([{b: 2}, {a: 1}, {c: 3}]);
    expect([{a: 1}, {b: 2}]).not.deep.ordered.members([{a: 1}, {b: 2}, {b: 2}]);
    expect([{a: 1}, {b: 2}, {b: 2}]).not.deep.ordered.members([{a: 1}, {b: 2}]);
    expect([{a: 1}, {b: 2}, {b: 2}]).not.deep.ordered.members([{a: 1}, {b: 2}, {c: 3}]);
    expect([{a: 1}, {b: 2}, {c: 3}]).not.deep.ordered.members([{a: 1}, {b: 2}, {b: 2}]);

    err(function() {
      expect([{a: 1}, {b: 2}, {c: 3}]).deep.ordered.members([{b: 2}, {a: 1}, {c: 3}], 'blah');
    }, 'blah: expected [ { a: 1 }, { b: 2 }, { c: 3 } ] to have the same ordered members as [ { b: 2 }, { a: 1 }, { c: 3 } ]');

    err(function() {
      expect([{a: 1}, {b: 2}, {c: 3}], 'blah').deep.ordered.members([{b: 2}, {a: 1}, {c: 3}]);
    }, 'blah: expected [ { a: 1 }, { b: 2 }, { c: 3 } ] to have the same ordered members as [ { b: 2 }, { a: 1 }, { c: 3 } ]');

    err(function() {
      expect([{a: 1}, {b: 2}, {c: 3}]).not.deep.ordered.members([{a: 1}, {b: 2}, {c: 3}]);
    }, 'expected [ { a: 1 }, { b: 2 }, { c: 3 } ] to not have the same ordered members as [ { a: 1 }, { b: 2 }, { c: 3 } ]');
  });

  it('include.deep.ordered.members', function() {
    expect([{a: 1}, {b: 2}, {c: 3}]).include.deep.ordered.members([{a: 1}, {b: 2}]);
    expect([{a: 1}, {b: 2}, {c: 3}]).not.include.deep.ordered.members([{b: 2}, {a: 1}]);
    expect([{a: 1}, {b: 2}, {c: 3}]).not.include.deep.ordered.members([{b: 2}, {c: 3}]);
    expect([{a: 1}, {b: 2}, {c: 3}]).not.include.deep.ordered.members([{a: 1}, {b: 2}, {b: 2}]);

    err(function() {
      expect([{a: 1}, {b: 2}, {c: 3}]).include.deep.ordered.members([{b: 2}, {a: 1}], 'blah');
    }, 'blah: expected [ { a: 1 }, { b: 2 }, { c: 3 } ] to be an ordered superset of [ { b: 2 }, { a: 1 } ]');

    err(function() {
      expect([{a: 1}, {b: 2}, {c: 3}], 'blah').include.deep.ordered.members([{b: 2}, {a: 1}]);
    }, 'blah: expected [ { a: 1 }, { b: 2 }, { c: 3 } ] to be an ordered superset of [ { b: 2 }, { a: 1 } ]');

    err(function() {
      expect([{a: 1}, {b: 2}, {c: 3}]).not.include.deep.ordered.members([{a: 1}, {b: 2}]);
    }, 'expected [ { a: 1 }, { b: 2 }, { c: 3 } ] to not be an ordered superset of [ { a: 1 }, { b: 2 } ]');
  });

  it('change', function() {
    var obj = { value: 10, str: 'foo' },
        heroes = ['spiderman', 'superman'],
        fn     = function() { obj.value += 5 },
        decFn  = function() { obj.value -= 20 },
        sameFn = function() { 'foo' + 'bar' },
        bangFn = function() { obj.str += '!' },
        batFn  = function() { heroes.push('batman') },
        lenFn  = function() { return heroes.length };

    expect(fn).to.change(obj, 'value');
    expect(fn).to.change(obj, 'value').by(5);
    expect(fn).to.change(obj, 'value').by(-5);

    expect(decFn).to.change(obj, 'value').by(20);
    expect(decFn).to.change(obj, 'value').but.not.by(21);

    expect(sameFn).to.not.change(obj, 'value');

    expect(sameFn).to.not.change(obj, 'str');
    expect(bangFn).to.change(obj, 'str');

    expect(batFn).to.change(lenFn).by(1);
    expect(batFn).to.change(lenFn).but.not.by(2);

    err(function () {
      expect(sameFn).to.change(obj, 'value', 'blah');
    }, "blah: expected .value to change");

    err(function () {
      expect(sameFn, 'blah').to.change(obj, 'value');
    }, "blah: expected .value to change");

    err(function () {
      expect(fn).to.not.change(obj, 'value', 'blah');
    }, "blah: expected .value to not change");

    err(function () {
      expect({}).to.change(obj, 'value', 'blah');
    }, "blah: expected {} to be a function");

    err(function () {
      expect({}, 'blah').to.change(obj, 'value');
    }, "blah: expected {} to be a function");

    err(function () {
      expect(fn).to.change({}, 'badprop', 'blah');
    }, "blah: expected {} to have property 'badprop'");

    err(function () {
      expect(fn, 'blah').to.change({}, 'badprop');
    }, "blah: expected {} to have property 'badprop'");

    err(function () {
      expect(fn, 'blah').to.change({});
    }, "blah: expected {} to be a function");

    err(function () {
      expect(fn).to.change(obj, 'value').by(10, 'blah');
    }, "blah: expected .value to change by 10");

    err(function () {
      expect(fn, 'blah').to.change(obj, 'value').by(10);
    }, "blah: expected .value to change by 10");

    err(function () {
      expect(fn).to.change(obj, 'value').but.not.by(5, 'blah');
    }, "blah: expected .value to not change by 5");
  });

  it('increase, decrease', function() {
    var obj = { value: 10, noop: null },
        arr = ['one', 'two'],
        pFn   = function() { arr.push('three') },
        popFn = function() { arr.pop() },
        nFn   = function() { return null },
        lenFn = function() { return arr.length },
        incFn = function() { obj.value += 2 },
        decFn = function() { obj.value -= 3 },
        smFn  = function() { obj.value += 0 };

    expect(smFn).to.not.increase(obj, 'value');
    expect(decFn).to.not.increase(obj, 'value');
    expect(incFn).to.increase(obj, 'value');
    expect(incFn).to.increase(obj, 'value').by(2);
    expect(incFn).to.increase(obj, 'value').but.not.by(1);

    expect(smFn).to.not.decrease(obj, 'value');
    expect(incFn).to.not.decrease(obj, 'value');
    expect(decFn).to.decrease(obj, 'value');
    expect(decFn).to.decrease(obj, 'value').by(3);
    expect(decFn).to.decrease(obj, 'value').but.not.by(2);

    expect(popFn).to.not.increase(lenFn);
    expect(nFn).to.not.increase(lenFn);
    expect(pFn).to.increase(lenFn);
    expect(pFn).to.increase(lenFn).by(1);
    expect(pFn).to.increase(lenFn).but.not.by(2);

    expect(popFn).to.decrease(lenFn);
    expect(popFn).to.decrease(lenFn).by(1);
    expect(popFn).to.decrease(lenFn).but.not.by(2);
    expect(nFn).to.not.decrease(lenFn);
    expect(pFn).to.not.decrease(lenFn);

    err(function () {
      expect(smFn).to.increase(obj, 'value', 'blah');
    }, "blah: expected .value to increase");

    err(function () {
      expect(smFn, 'blah').to.increase(obj, 'value');
    }, "blah: expected .value to increase");

    err(function () {
      expect(incFn).to.not.increase(obj, 'value', 'blah');
    }, "blah: expected .value to not increase");

    err(function () {
      expect({}).to.increase(obj, 'value', 'blah');
    }, "blah: expected {} to be a function");

    err(function () {
      expect({}, 'blah').to.increase(obj, 'value');
    }, "blah: expected {} to be a function");

    err(function () {
      expect(incFn).to.increase({}, 'badprop', 'blah');
    }, "blah: expected {} to have property 'badprop'");

    err(function () {
      expect(incFn, 'blah').to.increase({}, 'badprop');
    }, "blah: expected {} to have property 'badprop'");

    err(function () {
      expect(incFn, 'blah').to.increase({});
    }, "blah: expected {} to be a function");

    err(function() {
      expect(incFn).to.increase(obj, 'noop', 'blah');
    }, 'blah: expected null to be a number');

    err(function() {
      expect(incFn, 'blah').to.increase(obj, 'noop');
    }, 'blah: expected null to be a number');

    err(function () {
      expect(incFn).to.increase(obj, 'value').by(10, 'blah');
    }, "blah: expected .value to increase by 10");

    err(function () {
      expect(incFn, 'blah').to.increase(obj, 'value').by(10);
    }, "blah: expected .value to increase by 10");

    err(function () {
      expect(incFn).to.increase(obj, 'value').but.not.by(2, 'blah');
    }, "blah: expected .value to not increase by 2");

    err(function () {
      expect(smFn).to.decrease(obj, 'value', 'blah');
    }, "blah: expected .value to decrease");

    err(function () {
      expect(smFn, 'blah').to.decrease(obj, 'value');
    }, "blah: expected .value to decrease");

    err(function () {
      expect(decFn).to.not.decrease(obj, 'value', 'blah');
    }, "blah: expected .value to not decrease");

    err(function () {
      expect({}).to.decrease(obj, 'value', 'blah');
    }, "blah: expected {} to be a function");

    err(function () {
      expect({}, 'blah').to.decrease(obj, 'value');
    }, "blah: expected {} to be a function");

    err(function () {
      expect(decFn).to.decrease({}, 'badprop', 'blah');
    }, "blah: expected {} to have property 'badprop'");

    err(function () {
      expect(decFn, 'blah').to.decrease({}, 'badprop');
    }, "blah: expected {} to have property 'badprop'");

    err(function () {
      expect(decFn, 'blah').to.decrease({});
    }, "blah: expected {} to be a function");

    err(function() {
      expect(decFn).to.decrease(obj, 'noop', 'blah');
    }, 'blah: expected null to be a number');

    err(function() {
      expect(decFn, 'blah').to.decrease(obj, 'noop');
    }, 'blah: expected null to be a number');

    err(function () {
      expect(decFn).to.decrease(obj, 'value').by(10, 'blah');
    }, "blah: expected .value to decrease by 10");

    err(function () {
      expect(decFn, 'blah').to.decrease(obj, 'value').by(10);
    }, "blah: expected .value to decrease by 10");

    err(function () {
      expect(decFn).to.decrease(obj, 'value').but.not.by(3, 'blah');
    }, "blah: expected .value to not decrease by 3");
  });

  it('extensible', function() {
    var nonExtensibleObject = Object.preventExtensions({});

    expect({}).to.be.extensible;
    expect(nonExtensibleObject).to.not.be.extensible;

    err(function() {
        expect(nonExtensibleObject, 'blah').to.be.extensible;
    }, 'blah: expected {} to be extensible');

    err(function() {
        expect({}).to.not.be.extensible;
    }, 'expected {} to not be extensible');

    // Making sure ES6-like Object.isExtensible response is respected for all primitive types

    expect(42).to.not.be.extensible;
    expect(null).to.not.be.extensible;
    expect('foo').to.not.be.extensible;
    expect(false).to.not.be.extensible;
    expect(undefined).to.not.be.extensible;

    if (typeof Symbol === 'function') {
      expect(Symbol()).to.not.be.extensible;
    }

    err(function() {
      expect(42).to.be.extensible;
    }, 'expected 42 to be extensible');

    err(function() {
      expect(null).to.be.extensible;
    }, 'expected null to be extensible');

    err(function() {
      expect('foo').to.be.extensible;
    }, 'expected \'foo\' to be extensible');

    err(function() {
      expect(false).to.be.extensible;
    }, 'expected false to be extensible');

    err(function() {
      expect(undefined).to.be.extensible;
    }, 'expected undefined to be extensible');

    if (typeof Proxy === 'function') {
      var proxy = new Proxy({}, {
        isExtensible: function() {
          throw new TypeError();
        }
      });

      err(function() {
        // .extensible should not suppress errors, thrown in proxy traps
        expect(proxy).to.be.extensible;
      }, { name: 'TypeError' }, true);
    }
  });

  it('sealed', function() {
    var sealedObject = Object.seal({});

    expect(sealedObject).to.be.sealed;
    expect({}).to.not.be.sealed;

    err(function() {
        expect({}, 'blah').to.be.sealed;
    }, 'blah: expected {} to be sealed');

    err(function() {
        expect(sealedObject).to.not.be.sealed;
    }, 'expected {} to not be sealed');

    // Making sure ES6-like Object.isSealed response is respected for all primitive types

    expect(42).to.be.sealed;
    expect(null).to.be.sealed;
    expect('foo').to.be.sealed;
    expect(false).to.be.sealed;
    expect(undefined).to.be.sealed;

    if (typeof Symbol === 'function') {
      expect(Symbol()).to.be.sealed;
    }

    err(function() {
      expect(42).to.not.be.sealed;
    }, 'expected 42 to not be sealed');

    err(function() {
      expect(null).to.not.be.sealed;
    }, 'expected null to not be sealed');

    err(function() {
      expect('foo').to.not.be.sealed;
    }, 'expected \'foo\' to not be sealed');

    err(function() {
      expect(false).to.not.be.sealed;
    }, 'expected false to not be sealed');

    err(function() {
      expect(undefined).to.not.be.sealed;
    }, 'expected undefined to not be sealed');

    if (typeof Proxy === 'function') {
      var proxy = new Proxy({}, {
        ownKeys: function() {
          throw new TypeError();
        }
      });

      // Object.isSealed will call ownKeys trap only if object is not extensible
      Object.preventExtensions(proxy);

      err(function() {
        // .sealed should not suppress errors, thrown in proxy traps
        expect(proxy).to.be.sealed;
      }, { name: 'TypeError' }, true);
    }
  });

  it('frozen', function() {
    var frozenObject = Object.freeze({});

    expect(frozenObject).to.be.frozen;
    expect({}).to.not.be.frozen;

    err(function() {
        expect({}, 'blah').to.be.frozen;
    }, 'blah: expected {} to be frozen');

    err(function() {
        expect(frozenObject).to.not.be.frozen;
    }, 'expected {} to not be frozen');

    // Making sure ES6-like Object.isFrozen response is respected for all primitive types

    expect(42).to.be.frozen;
    expect(null).to.be.frozen;
    expect('foo').to.be.frozen;
    expect(false).to.be.frozen;
    expect(undefined).to.be.frozen;

    if (typeof Symbol === 'function') {
      expect(Symbol()).to.be.frozen;
    }

    err(function() {
      expect(42).to.not.be.frozen;
    }, 'expected 42 to not be frozen');

    err(function() {
      expect(null).to.not.be.frozen;
    }, 'expected null to not be frozen');

    err(function() {
      expect('foo').to.not.be.frozen;
    }, 'expected \'foo\' to not be frozen');

    err(function() {
      expect(false).to.not.be.frozen;
    }, 'expected false to not be frozen');

    err(function() {
      expect(undefined).to.not.be.frozen;
    }, 'expected undefined to not be frozen');

    if (typeof Proxy === 'function') {
      var proxy = new Proxy({}, {
        ownKeys: function() {
          throw new TypeError();
        }
      });

      // Object.isFrozen will call ownKeys trap only if object is not extensible
      Object.preventExtensions(proxy);

      err(function() {
        // .frozen should not suppress errors, thrown in proxy traps
        expect(proxy).to.be.frozen;
      }, { name: 'TypeError' }, true);
    }
  });
});
