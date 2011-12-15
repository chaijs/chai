# Chai [![Build Status](https://secure.travis-ci.org/logicalparadox/chai.png)](http://travis-ci.org/logicalparadox/chai)

Chai is a multi-style assert library for [node](http://nodejs.org) and the browser.
It is based on [@visionmedia's awesome should.js](https://github.com/visionmedia/should.js)
assert library and is completely API compatable.

This library was developed because, as awesome as `should.js` is, it doesn't work in the browser.
As the lines blur (and sometimes disappear) between modules that run on either side, I needed
an assert package that allowed the same tests to run on both sides.

## Installation

Chai is available for both node.js server-side and the browser.

### Node.js

Package is available through [npm](http://npmjs.org):

    npm install chai

Recommend adding it to package.json devDependancies.

### Browser

Include the chai browser build in your testing suite.

    <script src="chai.js" type="text/javascript"></script>

Chai tests itself in the browser using mocha [mocha](https://github.com/visionmedia/mocha).
Have a look at the `test/browser` folder for an example.

## Styles

### Expect

The `expect` style is server/browser BDD style assert language.

```js
var expect = require('chai').expect;

var foo = 'bar';

expect(foo).to.be.a('string');
expect(foo).to.equal('bar');
expect(foo).to.have.length(3);
```

### Should

The `should` style allows for chai to be a replacement for [should.js](https://github.com/visionmedia/should.js)
if the need arises.

```js
var should = require('chai').should(); //actually call the the function

var foo = 'bar';

foo.should.be.a('string');
foo.should.equal('bar');
foo.should.have.length(3);
```

*Should tests do not run in the browser.*

Notice that the `expect` require is just a reference to the `expect` function, whereas
with the `should` require, the function is being executed.

### Assert

The `assert` style is like the node.js included assert utility with few extras.

```js
var assert = require('chai').assert;

var foo = 'bar';

assert.typeOf(foo, 'string');
assert.equal(foo, 'bar');
assert.length(foo, 3);
```

## License

(The MIT License)

Copyright (c) 2011 Jake Luer <jake@alogicalparadox.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.