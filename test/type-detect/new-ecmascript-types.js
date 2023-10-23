import * as chai from '../../index.js';

function assert (expr, msg) {
  if (!expr) {
    throw new Error(msg || 'Assertion Failed');
  }
}

const type = chai.util.type

const symbolExists = typeof Symbol === 'function';
const setExists = typeof Set === 'function';
const mapExists = typeof Map === 'function';
let supportArrows = false;
let supportGenerators = false;
try {
  eval('function * foo () {}; foo'); // eslint-disable-line no-eval
  supportGenerators = true;
} catch (error) {
  supportGenerators = false;
}
try {
  eval('() => {}'); // eslint-disable-line no-eval
  supportArrows = true;
} catch (error) {
  supportArrows = false;
}
function itIf(condition) {
  return condition ? it : it.skip;
}

describe('ES2015 Specific', () => {
  itIf(symbolExists && typeof String.prototype[Symbol.iterator] === 'function')('string iterator', () => {
    assert(type(''[Symbol.iterator]()) === 'String Iterator');
  });

  itIf(symbolExists && typeof Array.prototype[Symbol.iterator] === 'function')('array iterator', () => {
    assert(type([][Symbol.iterator]()) === 'Array Iterator');
  });

  itIf(typeof Array.prototype.entries === 'function')('array iterator (entries)', () => {
    assert(type([].entries()) === 'Array Iterator');
  });

  itIf(mapExists)('map', () => {
    assert(type(new Map()) === 'Map');
  });

  itIf(symbolExists && mapExists && typeof Map.prototype[Symbol.iterator] === 'function')('map iterator', () => {
    assert(type(new Map()[Symbol.iterator]()) === 'Map Iterator');
  });

  itIf(mapExists && typeof Map.prototype.entries === 'function')('map iterator (entries)', () => {
    assert(type(new Map().entries()) === 'Map Iterator');
  });

  itIf(typeof WeakMap === 'function')('weakmap', () => {
    assert(type(new WeakMap()) === 'WeakMap');
  });

  itIf(setExists)('set', () => {
    assert(type(new Set()) === 'Set');
  });

  itIf(symbolExists && setExists && typeof Set.prototype[Symbol.iterator] === 'function')('set iterator', () => {
    assert(type(new Set()[Symbol.iterator]()) === 'Set Iterator');
  });

  itIf(setExists && typeof Set.prototype.entries === 'function')('set iterator', () => {
    assert(type(new Set().entries()) === 'Set Iterator');
  });

  itIf(typeof WeakSet === 'function')('weakset', () => {
    assert(type(new WeakSet()) === 'WeakSet');
  });

  itIf(typeof Symbol === 'function')('symbol', () => {
    assert(type(Symbol('foo')) === 'Symbol');
  });

  itIf(typeof Promise === 'function')('promise', () => {
    function noop() {}
    assert(type(new Promise(noop)) === 'Promise');
  });

  itIf(typeof Int8Array === 'function')('int8array', () => {
    assert(type(new Int8Array()) === 'Int8Array');
  });

  itIf(typeof Uint8Array === 'function')('uint8array', () => {
    assert(type(new Uint8Array()) === 'Uint8Array');
  });

  itIf(typeof Uint8ClampedArray === 'function')('uint8clampedarray', () => {
    assert(type(new Uint8ClampedArray()) === 'Uint8ClampedArray');
  });

  itIf(typeof Int16Array === 'function')('int16array', () => {
    assert(type(new Int16Array()) === 'Int16Array');
  });

  itIf(typeof Uint16Array === 'function')('uint16array', () => {
    assert(type(new Uint16Array()) === 'Uint16Array');
  });

  itIf(typeof Int32Array === 'function')('int32array', () => {
    assert(type(new Int32Array()) === 'Int32Array');
  });

  itIf(typeof Uint32Array === 'function')('uint32array', () => {
    assert(type(new Uint32Array()) === 'Uint32Array');
  });

  itIf(typeof Float32Array === 'function')('float32array', () => {
    assert(type(new Float32Array()) === 'Float32Array');
  });

  itIf(typeof Float64Array === 'function')('float64array', () => {
    assert(type(new Float64Array()) === 'Float64Array');
  });

  itIf(typeof DataView === 'function')('dataview', () => {
    const arrayBuffer = new ArrayBuffer(1);
    assert(type(new DataView(arrayBuffer)) === 'DataView');
  });

  itIf(typeof ArrayBuffer === 'function')('arraybuffer', () => {
    assert(type(new ArrayBuffer(1)) === 'ArrayBuffer');
  });

  itIf(supportArrows)('arrow function', () => {
    assert(type(eval('() => {}')) === 'Function'); // eslint-disable-line no-eval
  });

  itIf(supportGenerators)('generator function', () => {
    assert(type(eval('function * foo () {}; foo')) === 'GeneratorFunction'); // eslint-disable-line no-eval
  });

  itIf(supportGenerators)('generator', () => {
    assert(type(eval('(function * foo () {}())')) === 'Generator'); // eslint-disable-line no-eval
  });

});
