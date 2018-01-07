import { assert } from 'chai';

let foo = 'bar';
let tea = { 
  flavors: [ 'Mint', 'Chai', 'Floral' ] 
};

assert.typeOf(foo, 'string');
assert.equal(foo, 'bar');
assert.lengthOf(foo, 3)
assert.property(tea, 'flavors');
assert.lengthOf(tea.flavors, 3);
