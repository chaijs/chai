import { expect } from 'chai';

let foo = 'bar';
let tea = { 
  flavors: [ 'Mint', 'Chai', 'Floral' ] 
};

expect(foo).to.be.a('string');
expect(foo).to.equal('bar');
expect(foo).to.have.length(3);
expect(tea).to.have.property('flavors').with.length(3);
