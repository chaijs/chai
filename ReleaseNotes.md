# Release Notes

## 1.6.1 / 2013-06-05 

The following changes are required if you are upgrading from the previous version:

- **Users:**
  - No changes required.
- **Plugin Developers:** 
  - No changes required.
- **Core Contributors:** 
  - Refresh `node_modules` folder for updated developement dependencies. 

### Deep Equality

Regular Expressions are now tested as part of all deep equality assertions. In previous versions
they silently passed for all scenarios. Thanks to [@katsgeorgeek](https://github.com/katsgeorgeek) for the contribution.

### Community Contributions

- [#161](https://github.com/chaijs/chai/pull/161) Fix documented name for assert interface's isDefined method. [@brandonpayton](https://github.com/brandonpayton)
- [#168](https://github.com/chaijs/chai/pull/168) Fix comparison equality of two regexps for when using deep equality. [@katsgeorgeek](https://github.com/katsgeorgeek)

Thank you to all who took the time to contribute!

### Additional Notes

- Mocha has been locked at version `1.8.x` to ensure `mocha-phantomjs` compatibility.

## 1.6.0 / 2013-04-29 

The following changes are required if you are upgrading from the previous version:

- **Users:**
  - No changes required.
- **Plugin Developers:** 
  - No changes required.
- **Core Contributors:** 
  - Refresh `node_modules` folder for updated developement dependencies. 

### New Assertions

#### Array Members Inclusion

Asserts that the target is a superset of `set`, or that the target and `set` have the same members.
Order is not taken into account. Thanks to [@NickHeiner](https://github.com/NickHeiner) for the contribution.

```js
// (expect/should) full set
expect([4, 2]).to.have.members([2, 4]);
expect([5, 2]).to.not.have.members([5, 2, 1]);

// (expect/should) inclusion
expect([1, 2, 3]).to.include.members([3, 2]);
expect([1, 2, 3]).to.not.include.members([3, 2, 8]);

// (assert) full set
assert.sameMembers([ 1, 2, 3 ], [ 2, 1, 3 ], 'same members');

// (assert) inclusion 
assert.includeMembers([ 1, 2, 3 ], [ 2, 1 ], 'include members');

```

#### Non-inclusion for Assert Interface

Most `assert` functions have a negative version, like `instanceOf()` has a corresponding `notInstaceOf()`. 
However `include()` did not have a corresponding `notInclude()`. This has been added.

```js
assert.notInclude([ 1, 2, 3 ], 8);
assert.notInclude('foobar', 'baz');
```

### Community Contributions

- [#140](https://github.com/chaijs/chai/pull/140) Restore `call`/`apply` methods for plugin interface. [@RubenVerborgh](https://github.com/RubenVerborgh)
- [#148](https://github.com/chaijs/chai/issues/148)/[#153](https://github.com/chaijs/chai/pull/153) Add `members` and `include.members` assertions. [#NickHeiner](https://github.com/NickHeiner)

Thank you to all who took time to contribute!

### Other Bug Fixes

- [#142](https://github.com/chaijs/chai/issues/142) `assert#include` will no longer silently pass on wrong-type haystack.
- [#158](https://github.com/chaijs/chai/issues/158) `assert#notInclude` has been added.
- Travis-CI now tests Node.js `v0.10.x`. Support for `v0.6.x` has been removed. `v0.8.x` is still tested as before.

## 1.5.0 / 2013-02-03 

### Migration Requirements

The following changes are required if you are upgrading from the previous version:

- **Users:** 
  - _Update [2013-02-04]:_ Some users may notice a small subset of deep equality assertions will no longer pass. This is the result of 
  [#120](https://github.com/chaijs/chai/issues/120), an improvement to our deep equality algorithm. Users will need to revise their assertions
  to be more granular should this occur. Further information: [#139](https://github.com/chaijs/chai/issues/139).
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
- [#120](https://github.com/chaijs/chai/issues/120): `.eql()` now works to compare dom nodes in browsers.


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
