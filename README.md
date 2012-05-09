[![Build Status](https://secure.travis-ci.org/logicalparadox/chai.png)](http://travis-ci.org/logicalparadox/chai)

[![Chai Documentation](https://github.com/logicalparadox/chai/raw/master/docs/template/assets/img/chai-logo.png)](http://chaijs.com)

Chai is a BDD / TDD assertion library for [node](http://nodejs.org) and the browser that
can be delightfully paired with any javascript testing framework.

For more information view the [documentation](http://chaijs.com).

### Versions

The current stable version tree is the `0.5.x` branch. If you are interested in seeing 
what we have planned, or if you are a plugin developer interested in preparing your plugins for the 
next major release, see the `master` branch.

- [![Build Status](https://secure.travis-ci.org/logicalparadox/chai.png?branch=0.5.x)](http://travis-ci.org/logicalparadox/chai) Stable: 0.5.x - `0.5.x` branch
- [![Build Status](https://secure.travis-ci.org/logicalparadox/chai.png?branch=master)](http://travis-ci.org/logicalparadox/chai) Release Candidate: 1.0.0-rc2 - `master` branch

## Installation

Chai is available for both node.js and the browser using any
test framework you like. 

### Node.js

Package is available through [npm](http://npmjs.org):

    npm install chai

Recommend adding it to package.json devDependencies.

### Browser

Include the chai browser build in your testing suite.

    <script src="chai.js" type="text/javascript"></script>

Currently supports all modern browsers: IE 9+, Chrome 7+, FireFox 4+, Safari 5+. Want to know if your browser is compatible?
Run the [online test suite](http://chaijs.com/support/tests/).

## Plugins

The Chai community is growing! Plugins allow developers to expand Chai's available 
assertions. Here is what the community has come up with so far:

* [chai-spies](https://github.com/logicalparadox/chai-spies) is a basic spy implementation for chai. It's also
a good resource for building chai plugins that work in both node.js and the browser.
* [chai-jquery](https://github.com/jfirebaugh/chai-jquery) by [@jfirebaugh](https://github.com/jfirebaugh)
provides deep jQuery integration with chai's `should` and `expect`.
* [jack](https://github.com/vesln/jack) by [@vesln](https://github.com/vesln) is a mock/stub library that 
can be used as a stand-alone or with chai.
* [sinon-chai](https://github.com/domenic/sinon-chai) by [@domenic](https://github.com/domenic) extends chai with 
assertions for the Sinon.js mocking framework.
* [chai-as-promised](https://github.com/domenic/chai-as-promised) by [@domenic](https://github.com/domenic) extends
chai with assertions about promises.

## Getting Help

If you have questions or issues, please use this projects
[Github Issues](https://github.com/logicalparadox/chai/issues). You can also keep up to date
on the [Google Group](http://groups.google.com/group/chaijs) or ping [@jakeluer](http://twitter.com/jakeluer)
directly on Twitter. Chai developers can also be found on Freenode IRC in #letstest.js. 

## Contributing

To run the test suite, type `npm install && make test` (requires
[Node.js](http://nodejs.org/) to be installed on your system).

### Contributors

     project: chai
     commits: 278
     files  : 71
     authors: 
       211  Jake Luer               75.9%
        53  Veselin Todorov         19.1%
         5  Juliusz Gonera          1.8%
         3  Jeff Barczewski         1.1%
         2  Jo Liss                 0.7%
         1  Vinay Pulim             0.4%
         1  Jakub Nešetřil          0.4%
         1  John Firebaugh          0.4%
         1  Domenic Denicola        0.4%

## License

(The MIT License)

Copyright (c) 2011-2012 Jake Luer <jake@alogicalparadox.com>

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
