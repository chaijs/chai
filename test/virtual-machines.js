import vm from 'node:vm';
import * as chai from '../index.js';

const {assert} = chai;
const vmContext = {assert};
vm.createContext(vmContext);

/**
 * Run the code in a virtual context
 *
 * @param {string} code Code to run
 */
function runCodeInVm(code) {
  vm.runInContext(code, vmContext);
}

describe('node virtual machines', function () {
  it('throws', function() {
    const shouldNotThrow = [
      `assert.throws(function() { throw ''; }, /^$/);`,
      `assert.throws(function() { throw new Error('bleepbloop'); });`,
      `assert.throws(function() { throw new Error(''); });`,
      `assert.throws(function() { throw new Error('swoosh'); }, /swoosh/);`
    ];

    for (const code of shouldNotThrow) {
      assert.doesNotThrow(
        () => {
          runCodeInVm(code);
        }
      );
    }
  });
});
