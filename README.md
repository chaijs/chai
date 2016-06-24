[![Chai Documentation](http://chaijs.com/img/chai-logo.png)](http://chaijs.com)

<br>
[![tag:?](https://img.shields.io/github/tag/chaijs/chai.svg?style=flat-square)](https://github.com/chaijs/chai/releases)
[![build:?](https://img.shields.io/travis/chaijs/chai/master.svg?style=flat-square)](https://travis-ci.org/chaijs/chai)
[![Average time to resolve an issue](http://isitmaintained.com/badge/resolution/chaijs/chai.svg)](http://isitmaintained.com/project/chaijs/chai "Average time to resolve an issue")
[![Percentage of issues still open](http://isitmaintained.com/badge/open/chaijs/chai.svg)](http://isitmaintained.com/project/chaijs/chai "Percentage of issues still open")
[![coverage:?](https://img.shields.io/coveralls/chaijs/chai/master.svg?style=flat-square)](https://coveralls.io/r/chaijs/chai)<br>
[![npm:](https://img.shields.io/npm/v/chai.svg?style=flat-square)](https://www.npmjs.com/packages/chai)
[![license:mit](https://img.shields.io/badge/license-mit-green.svg?style=flat-square)](#license)
[![dependencies:?](https://img.shields.io/npm/dm/chai.svg?style=flat-square)](https://www.npmjs.com/packages/chai)
[![devDependencies:?](https://img.shields.io/david/chaijs/chai.svg?style=flat-square)](https://david-dm.org/chaijs/chai)

[![Selenium Test Status](https://saucelabs.com/browser-matrix/chaijs.svg)](https://saucelabs.com/u/chaijs)

[![Slack Status](https://chai-slack.herokuapp.com/badge.svg)]( https://chai-slack.herokuapp.com/)
[![Join the chat at https://gitter.im/chaijs/chai](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/chaijs/chai)
[![OpenCollective](https://opencollective.com/chaijs/backers/badge.svg)](https://opencollective.com/chaijs) 


Chai is a BDD / TDD assertion library for [node](http://nodejs.org) and the browser that
can be delightfully paired with any javascript testing framework.

For more information or to download plugins, view the [documentation](http://chaijs.com).

### Plugins

Chai offers a robust Plugin architecture for extending Chai's assertions and interfaces.

- Need a plugin? View the [official plugin list](http://chaijs.com/plugins).
- Want to build a plugin? Read the [plugin api documentation](http://chaijs.com/guide/plugins/).
- Have a plugin and want it listed? Simply add the following keywords to your package.json:
  -  `chai-plugin`
  -  `browser` if your plugin works in the browser as well as Node.js
  -  `browser-only` if your plugin does not work with Node.js

### Related Projects

- [chaijs / chai-docs](https://github.com/chaijs/chai-docs): The chaijs.com website source code.
- [chaijs / assertion-error](https://github.com/chaijs/assertion-error): Custom `Error` constructor thrown upon an assertion failing.
- [chaijs / deep-eql](https://github.com/chaijs/deep-eql): Improved deep equality testing for Node.js and the browser.
- [chaijs / type-detect](https://github.com/chaijs/type-detect): Improved typeof detection for Node.js and the browser.
- [chaijs / check-error](https://github.com/chaijs/check-error): Error comparison and information related utility for Node.js and the browser.
- [chaijs / loupe](https://github.com/chaijs/loupe): Inspect utility for Node.js and browsers.
- [chaijs / pathval](https://github.com/chaijs/pathval): Object value retrieval given a string path.

### Contributing

Thank you very much for considering to contribute!

Here are a few issues other contributors frequently ran into when opening pull requests:

- Please do not commit changes to the `chai.js` build. We do it once per release.
- Before pushing your commits, please make sure you [rebase](https://github.com/chaijs/chai/blob/master/CONTRIBUTING.md#pull-requests) them.

We also strongly encourage you to read our detailed [contribution guidelines](https://github.com/chaijs/chai/blob/master/CONTRIBUTING.md).

### Contributors

Please see the full
[Contributors Graph](https://github.com/chaijs/chai/graphs/contributors) for our
list of contributors.

### Core Contributors

Feel free to reach out to any of the core contributors with your questions or
concerns. We will do our best to respond in a timely manner.

[![Jake Luer](https://avatars3.githubusercontent.com/u/58988?v=3&s=50)](https://github.com/logicalparadox)
[![Veselin Todorov](https://avatars3.githubusercontent.com/u/330048?v=3&s=50)](https://github.com/vesln)
[![Keith Cirkel](https://avatars3.githubusercontent.com/u/118266?v=3&s=50)](https://github.com/keithamus)
[![Lucas Fernandes da Costa](https://avatars3.githubusercontent.com/u/6868147?v=3&s=50)](https://github.com/lucasfcosta)
[![Grant Snodgrass](https://avatars3.githubusercontent.com/u/17260989?v=3&s=50)](https://github.com/meeber)

## License

(The MIT License)

Copyright (c) 2011-2015 Jake Luer <jake@alogicalparadox.com>

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
