# Release Notes

## 1.5.0 / 2013-02-03 

### Migration Requirements

The following changes are required if you are upgrading from the previous version:

- **Users:** 
  - No changes required.
- **Plugin Developers:** 
  - No changes required.
- **Core Contributors:** 
  - Refresh `node_modules` folder for updated developement dependencies.

### Community Contributions

- [#126](https://github.com/chaijs/chai/pull/126): Add `eqls` alias for `eql`. [@RubenVerborgh](https://github.com/RubenVerborgh)
- [#127](https://github.com/chaijs/chai/issues/127): Performance refactor for chainable methods. [@RubenVerborgh](https://github.com/RubenVerborgh)
- [#133](https://github.com/chaijs/chai/pull/133): Assertion `.throw` support for primitives. [@RubenVerborgh](https://github.com/RubenVerborgh)
- [#137](https://github.com/chaijs/chai/issues/137): Assertion `.throw` support for empty messages. [@timnew](https://github.com/timnew)
- [#136](https://github.com/chaijs/chai/pull/136): Fix backward negation messages when using `.above()` and `.below()`. [@whatthejeff](https://github.com/whatthejeff)

Thank you to all who took time to contribute!

### Other Bug Fixes

- Improve type detection of `.a()`/`.an()` to work in cross-browser scenarios.
- [#116](https://github.com/chaijs/chai/issues/116): `.throw()` has cleaner display of errors when WebKit browsers.

### Usage Updates

#### For Users

**1. Component Support:** Chai now included the proper configuration to be installed as a 
[component](https://github.com/component/component). Component users are encouraged to consult
[chaijs.com](http://chaijs.com) for the latest version number as using the master branch
does not gaurantee stability. 

```js
// relevant component.json
  devDependencies: {
    "chaijs/chai": "1.5.0"
  }
```

Alternatively, bleeding-edge is available:

    $ component install chaijs/chai

**2. Configurable showDiff:** Some test runners (such as [mocha](http://visionmedia.github.com/mocha/)) 
include support for showing the diff of strings and objects when an equality error occurs. Chai has 
already included support for this, however some users may not prefer this display behavior. To revert to 
no diff display, the following configuration is available:

```js
chai.Assertion.showDiff = false; // diff output disabled
chai.Assertion.showDiff = true; // default, diff output enabled
```

#### For Plugin Developers

**1. New Utility - type**: The new utility `.type()` is available as a better implementation of `typeof` 
that can be used cross-browser. It handles the inconsistencies of Array, `null`, and `undefined` detection.

- **@param** _{Mixed}_ object to detect type of
- **@return** _{String}_ object type

```js
chai.use(function (c, utils) {
  // some examples
  utils.type({}); // 'object'
  utils.type(null); // `null'
  utils.type(undefined); // `undefined`
  utils.type([]); // `array`
});
```

#### For Core Contributors

**1. Browser Testing**: Browser testing of the `./chai.js` file is now available in the command line 
via PhantomJS. `make test` and Travis-CI will now also rebuild and test `./chai.js`. Consequently, all 
pull requests will now be browser tested in this way. 

_Note: Contributors opening pull requests should still NOT include the browser build._

**2. SauceLabs Testing**: Early SauceLab support has been enabled with the file `./support/mocha-cloud.js`.
Those interested in trying it out should create a free [Open Sauce](https://saucelabs.com/signup/plan) account
and include their credentials in `./test/auth/sauce.json`.
