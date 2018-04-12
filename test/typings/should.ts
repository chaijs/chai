import { should } from 'chai';

should();

let foo = 'bar';
let tea = { 
  flavors: [ 'Mint', 'Chai', 'Floral' ] 
};

foo.should.be.a('string');
foo.should.equal('bar');
foo.should.have.length(3);
tea.should.have.property('flavors').with.length(3);
