import {expect} from '../index.js';

describe('Fix #1384: Empty keys support', function () {
  it('should accept empty keys when the object is empty', function () {
    // Yeh test pehle fail hota tha, ab pass hona chahiye
    expect({}).to.have.all.keys([]);
  });

  it('should still throw error if object has properties but keys are empty', function () {
    // Yeh ensure karega ki humne validation poora disable nahi kiya
    expect(function () {
      expect({a: 1}).to.have.all.keys([]);
    }).to.throw('keys required');
  });
});
