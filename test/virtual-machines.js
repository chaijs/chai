import vm from 'node:vm';
import * as chai from '../index.js';

const {assert} = chai;
const vmContext = {assert};
vm.createContext(vmContext);

function runCodeInVm(code) {
  vm.runInContext(code, vmContext);
}

describe('node virtual machines', function () {
  it('throws', function() {
    const shouldNotThrow = [
      `assert.throws(function() { throw ''; }, /^$/);`,
      `assert.throws(function() { throw new Error('bleepbloop'); });`,
      `assert.throws(function() { throw new Error(''); });`,
      // TODO (43081j): enable this test once check-error supports
      // cross-vm `Error` objects
      //`assert.throws(function() { throw new Error('swoosh'); }, /swoosh/);`
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
