import * as chai from '../../index.js';

function assert (expr, msg) {
  if (!expr) {
    throw new Error(msg || 'Assertion Failed');
  }
}

const type = chai.util.type

describe('Generic', () => {

  it('array', () => {
    assert(type([]) === 'Array');
    assert(type(new Array()) === 'Array');
  });

  it('regexp', () => {
    assert(type(/a-z/gi) === 'RegExp');
    assert(type(new RegExp('a-z')) === 'RegExp');
  });

  it('function', () => {
    assert(type(() => {}) === 'Function');
  });

  it('arguments', function () {
    assert(type(arguments) === 'Arguments');
  });

  it('date', () => {
    assert(type(new Date()) === 'Date');
  });

  it('number', () => {
    assert(type(1) === 'Number');
    assert(type(1.234) === 'Number');
    assert(type(-1) === 'Number');
    assert(type(-1.234) === 'Number');
    assert(type(Infinity) === 'Number');
    assert(type(NaN) === 'Number');
  });

  it('number objects', () => {
    assert(type(new Number(2)) === 'Number');
  });

  it('string', () => {
    assert(type('hello world') === 'String');
  });

  it('string objects', () => {
    assert(type(new String('hello')) === 'String');
  });

  it('null', () => {
    assert(type(null) === 'null');
    assert(type(undefined) !== 'null');
  });

  it('undefined', () => {
    assert(type(undefined) === 'undefined');
    assert(type(null) !== 'undefined');
  });

  it('object', () => {
    function Noop() {}
    assert(type({}) === 'Object');
    assert(type(Noop) !== 'Object');
    assert(type(new Noop()) === 'Object');
    assert(type(new Object()) === 'Object');
    assert(type(Object.create(null)) === 'Object');
    assert(type(Object.create(Object.prototype)) === 'Object');
  });

  // See: https://github.com/chaijs/type-detect/pull/25
  it('object with .undefined property getter', () => {
    const foo = {};
    Object.defineProperty(foo, 'undefined', {
      get() {
        throw Error('Should never happen');
      },
    });
    assert(type(foo) === 'Object');
  });

  it('boolean', () => {
    assert(type(true) === 'Boolean');
    assert(type(false) === 'Boolean');
    assert(type(!0) === 'Boolean');
  });

  it('boolean object', () => {
    assert(type(new Boolean()) === 'Boolean');
  });

  it('error', () => {
    assert(type(new Error()) === 'Error');
    assert(type(new TypeError()) === 'Error');
    assert(type(new EvalError()) === 'Error');
    assert(type(new RangeError()) === 'Error');
    assert(type(new ReferenceError()) === 'Error');
    assert(type(new SyntaxError()) === 'Error');
    assert(type(new TypeError()) === 'Error');
    assert(type(new URIError()) === 'Error');
  });

  it('Math', () => {
    assert(type(Math) === 'Math');
  });

  it('JSON', () => {
    assert(type(JSON) === 'JSON');
  });

  describe('Stubbed ES2015 Types', () => {
    const originalObjectToString = Object.prototype.toString;
    function stubObjectToStringOnce(staticValue) {
      Object.prototype.toString = function () { // eslint-disable-line no-extend-native
        Object.prototype.toString = originalObjectToString; // eslint-disable-line no-extend-native
        return staticValue;
      };
    }
    function Thing() {}

    it('map', () => {
      stubObjectToStringOnce('[object Map]');
      assert(type(new Thing()) === 'Map');
    });

    it('weakmap', () => {
      stubObjectToStringOnce('[object WeakMap]');
      assert(type(new Thing()) === 'WeakMap');
    });

    it('set', () => {
      stubObjectToStringOnce('[object Set]');
      assert(type(new Thing()) === 'Set');
    });

    it('weakset', () => {
      stubObjectToStringOnce('[object WeakSet]');
      assert(type(new Thing()) === 'WeakSet');
    });

    it('symbol', () => {
      stubObjectToStringOnce('[object Symbol]');
      assert(type(new Thing()) === 'Symbol');
    });

    it('promise', () => {
      stubObjectToStringOnce('[object Promise]');
      assert(type(new Thing()) === 'Promise');
    });

    it('int8array', () => {
      stubObjectToStringOnce('[object Int8Array]');
      assert(type(new Thing()) === 'Int8Array');
    });

    it('uint8array', () => {
      stubObjectToStringOnce('[object Uint8Array]');
      assert(type(new Thing()) === 'Uint8Array');
    });

    it('uint8clampedarray', () => {
      stubObjectToStringOnce('[object Uint8ClampedArray]');
      assert(type(new Thing()) === 'Uint8ClampedArray');
    });

    it('int16array', () => {
      stubObjectToStringOnce('[object Int16Array]');
      assert(type(new Thing()) === 'Int16Array');
    });

    it('uint16array', () => {
      stubObjectToStringOnce('[object Uint16Array]');
      assert(type(new Thing()) === 'Uint16Array');
    });

    it('int32array', () => {
      stubObjectToStringOnce('[object Int32Array]');
      assert(type(new Thing()) === 'Int32Array');
    });

    it('uint32array', () => {
      stubObjectToStringOnce('[object Uint32Array]');
      assert(type(new Thing()) === 'Uint32Array');
    });

    it('float32array', () => {
      stubObjectToStringOnce('[object Float32Array]');
      assert(type(new Thing()) === 'Float32Array');
    });

    it('float64array', () => {
      stubObjectToStringOnce('[object Float64Array]');
      assert(type(new Thing()) === 'Float64Array');
    });

    it('dataview', () => {
      stubObjectToStringOnce('[object DataView]');
      assert(type(new Thing()) === 'DataView');
    });

    it('arraybuffer', () => {
      stubObjectToStringOnce('[object ArrayBuffer]');
      assert(type(new Thing()) === 'ArrayBuffer');
    });

    it('generatorfunction', () => {
      stubObjectToStringOnce('[object GeneratorFunction]');
      assert(type(new Thing()) === 'GeneratorFunction');
    });

    it('generator', () => {
      stubObjectToStringOnce('[object Generator]');
      assert(type(new Thing()) === 'Generator');
    });

    it('string iterator', () => {
      stubObjectToStringOnce('[object String Iterator]');
      assert(type(new Thing()) === 'String Iterator');
    });

    it('array iterator', () => {
      stubObjectToStringOnce('[object Array Iterator]');
      assert(type(new Thing()) === 'Array Iterator');
    });

    it('map iterator', () => {
      stubObjectToStringOnce('[object Map Iterator]');
      assert(type(new Thing()) === 'Map Iterator');
    });

    it('set iterator', () => {
      stubObjectToStringOnce('[object Set Iterator]');
      assert(type(new Thing()) === 'Set Iterator');
    });

  });

  describe('@@toStringTag Sham', () => {
    const originalObjectToString = Object.prototype.toString;
    before(() => {
      const globalObject = typeof self === 'object' ? self : global;
      globalObject.Symbol = globalObject.Symbol || {};
      if (!Symbol.toStringTag) {
        Symbol.toStringTag = '__@@toStringTag__';
      }
      const test = {};
      test[Symbol.toStringTag] = function () {
        return 'foo';
      };
      if (Object.prototype.toString(test) !== '[object foo]') {
        Object.prototype.toString = function () { // eslint-disable-line no-extend-native
          if (typeof this === 'object' && typeof this[Symbol.toStringTag] === 'function') {
            return `[object ${ this[Symbol.toStringTag]() }]`;
          }
          return originalObjectToString.call(this);
        };
      }
    });

    after(() => {
      Object.prototype.toString = originalObjectToString; // eslint-disable-line no-extend-native
    });

    it('plain object', () => {
      const obj = {};
      obj[Symbol.toStringTag] = function () {
        return 'Foo';
      };
      assert(type(obj) === 'Foo', 'type(obj) === "Foo"');
    });

  });

});
