
1.2.0 / 2012-08-07 
==================

  * Merge branch 'feature/errmsg'
  * browser build
  * comment updates for utilities
  * tweak objDislay to only kick in if object inspection is too long
  * Merge branch 'master' into feature/errmsg
  * add display sample for error message refactor
  * first draft of error message refactor. #93
  * add `closeTo` assertion to `assert` interface. Closes #89.
  * update folio build for better require.js handling. Closes #85
  * Merge pull request #92 from paulmillr/topics/add-dom-checks
  * Add check for DOM objects.
  * browser build
  * Merge branch 'master' of github.com:chaijs/chai
  * bug - getActual not defaulting to assertion subject
  * Merge pull request #88 from pwnall/master
  * Don't inspect() assertion arguments if the assertion passes.

1.1.1 / 2012-07-09 
==================

  * improve commonjs support on browser build
  * Merge pull request #83 from tkazec/equals
  * Document .equals
  * Add .equals as an alias of .equal
  * remove unused browser prefix/suffix
  * Merge branch 'feature/folio-build'
  * browser build
  * using folio to compile
  * clean up makefile
  * early folio 0.3.x support

1.1.0 / 2012-06-26 
==================

  * browser build
  * Disable "Assertion.includeStack is false" test in IE.
  * Use `utils.getName` for all function inspections.
  * Merge pull request #80 from kilianc/closeTo
  * fixes #79
  * browser build
  * expand  docs to indicate change of subject for chaining. Closes #78
  * add `that` chain noop
  * Merge branch 'bug/74'
  * comments on how to property use `length` as chain. Closes #74
  * tests for length as chainable property. #74
  * add support for `length` as chainable prop/method.
  * Merge branch 'bug/77'
  * tests for getPathValue when working with nested arrays. Closes #77
  * add getPathValue support for nested arrays
  * browser build
  * fix bug for missing browser utils
  * compile tool aware of new folder layout
  * Merge branch 'refactor/1dot1'
  * move core assertions to own file and refactor all using utils
  * rearrange folder structure

1.0.4 / 2012-06-03 
==================

  * Merge pull request #68 from fizker/itself
  * Added itself chain.
  * simplify error inspections for cross browser compatibility
  * fix safari `addChainableMethod` errors. Closes #69

1.0.3 / 2012-05-27 
==================

  * Point Travis badge to the right place.
  * Make error message for eql/deep.equal more clear.
  * Fix .not.deep.equal.
  * contributors list

1.0.2 / 2012-05-26 
==================

  * Merge pull request #67 from chaijs/chaining-and-flags
  * Browser build.
  * Use `addChainableMethod` to get away from `__proto__` manipulation.
  * New `addChainableMethod` utility.
  * Replace `getAllFlags` with `transferFlags` utility.
  * browser build
  * test - get all flags
  * utility - get all flags
  * Add .mailmap to .npmignore.
  * Add a .mailmap file to fix my name in shortlogs.

1.0.1 / 2012-05-18 
==================

  * browser build
  * Fixing "an" vs. "a" grammar in type assertions.
  * Uniformize `assert` interface inline docs.
  * Don't use `instanceof` for `assert.isArray`.
  * Add `deep` flag for equality and property value.
  * Merge pull request #64 from chaijs/assertion-docs
  * Uniformize assertion inline docs.
  * Add npm-debug.log to .gitignore.
  * no reserved words as actuals. #62

1.0.0 / 2012-05-15 
==================

  * readme cleanup
  * browser build
  * utility comments
  * removed docs
  * update to package.json
  * docs build
  * comments / docs updates
  * plugins app cleanup
  * Merge pull request #61 from joliss/doc
  * Fix and improve documentation of assert.equal and friends
  * browser build
  * doc checkpoint - texture
  * Update chai-jquery link
  * Use defined return value of Assertion extension functions
  * Update utility docs

1.0.0-rc3 / 2012-05-09 
==================

  * Merge branch 'feature/rc3'
  * docs update
  * browser build
  * assert test conformity for minor refactor api
  * assert minor refactor
  * update util tests for new add/overwrite prop/method format
  * added chai.Assertion.add/overwrite prop/method for plugin toolbox
  * add/overwrite prop/method don't make assumptions about context
  * doc test suite
  * docs don't need coverage
  * refactor all simple chains into one forEach loop, for clean documentation
  * updated npm ignore
  * remove old docs
  * docs checkpoint - guide styled
  * Merge pull request #59 from joliss/doc
  * Document how to run the test suite
  * don't need to rebuild docs to view
  * dep update
  * docs checkpoint - api section
  * comment updates for docs
  * new doc site checkpoint - plugin directory!
  * Merge pull request #57 from kossnocorp/patch-1
  * Fix typo: devDependancies → devDependencies
  * Using message flag in `getMessage` util instead of old `msg` property.
  * Adding self to package.json contributors.
  * `getMessage` shouldn't choke on null/omitted messages.
  * `return this` not necessary in example.
  * `return this` not necessary in example.
  * Sinon–Chai has a dash
  * updated plugins list for docs

1.0.0-rc2 / 2012-05-06 
==================

  * Merge branch 'feature/test-cov'
  * browser build
  * missing assert tests for ownProperty
  * appropriate assert equivalent for expect.to.have.property(key, val)
  * reset AssertionError to include full stack
  * test for plugin utilities
  * overwrite Property and Method now ensure chain
  * version notes in readme

1.0.0-rc1 / 2012-05-04 
==================

  * browser build (rc1)
  * assert match/notMatch tests
  * assert interface - notMatch, ownProperty, notOwnProperty, ownPropertyVal, ownPropertyNotVal
  * cleaner should interface export.
  * added chai.Assertion.prototype._obj (getter) for quick access to object flag
  * moved almostEqual / almostDeepEqual to stats plugin
  * added mocha.opts
  * Add test for `utils.addMethod`
  * Fix a typo
  * Add test for `utils.overwriteMethod`
  * Fix a typo
  * Browser build
  * Add undefined assertion
  * Add null assertion
  * Fix an issue with `mocha --watch`
  * travis no longer tests on node 0.4.x
  * removing unnecissary carbon dep
  * Merge branch 'feature/plugins-app'
  * docs build
  * templates for docs express app for plugin directory
  * express app for plugin and static serving
  * added web server deps
  * Merge pull request #54 from josher19/master
  * Remove old test.assert code
  * Use util.inspect instead of inspect for deepAlmostEqual and almostEqual
  * browser build
  * Added almostEqual and deepAlmostEqual to assert test suite.
  * bug - context determinants for utils
  * dec=0 means rounding, so assert.deepAlmostEqual({pi: 3.1416}, {pi: 3}, 0) is true
  * wrong travis link
  * readme updates for version information
  * travis tests 0.5.x branch as well
  * [bug] util `addProperty` not correctly exporting
  * read me version notes
  * browser build 1.0.0alpha1
  * not using reserved words in internal assertions. #52
  * version tick
  * clean up redundant tests
  * Merge branch 'refs/heads/0.6.x'
  * update version tag in package 1.0.0alpha1
  * browser build
  * added utility tests to browser specs
  * beginning utility testing
  * updated utility comments
  * utility - overwriteMethod
  * utility - overwriteProperty
  * utility - addMethod
  * utility - addProperty
  * missing ;
  * contributors list update
  * Merge branch 'refs/heads/0.6.x-docs' into 0.6.x
  * Added guide link to docs. WIP
  * Include/contain are now both properties and methods
  * Add an alias annotation
  * Remove usless function wrapper
  * Fix a typo
  * A/an are now both properties and methods
  * [docs] new site homepage layout / color checkpoint
  * Ignore IE-specific error properties.
  * Fixing order of error message test.
  * New cross-browser `getName` util.
  * Fixing up `AssertionError` inheritance.
  * backup docs
  * Add doctypes
  * [bug] was still using `constructor.name` in `throw` assertion
  * [bug] flag Object.create(null) instead of new Object
  * [test] browser build
  * [refactor] all usage of Assertion.prototype.assert now uses template tags and flags
  * [refactor] remove Assertion.prototype.inspect for testable object inspection
  * [refactor] object to test is now stored in flag, with ssfi and custom message
  * [bug] flag util - don't return on `set`
  * [docs] comments for getMessage utility
  * [feature] getMessage
  * [feature] testing utilities
  * [refactor] flag doesn't require `call`
  * Make order of source files well-defined
  * Added support for throw(errorInstance).
  * Use a foolproof method of grabbing an error's name.
  * Removed constructor.name check from throw.
  * disabled stackTrack configuration tests until api is stable again
  * first version of line displayed error for node js (unstable)
  * refactor core Assertion to use flag utility for negation
  * added flag utility
  * tests for assert interface negatives. Closed #42
  * added assertion negatives that were missing. #42
  * Support for expected and actual parameters in assert-style error object
  * chai as promised - readme
  * Added assert.fail. Closes #40
  * better error message for assert.operator. Closes #39
  * [refactor] Assertion#property to use getPathValue property
  * added getPathValue utility helper
  * removed todo about browser build
  * version notes
  * version bumb 0.6.0
  * browser build
  * [refactor] browser compile function to replace with `require('./error')' with 'require('./browser/error')'
  * [feature] browser uses different error.js
  * [refactor] error without chai.fail
  * Assertion & interfaces use new utils helper export
  * [refactor] primary export for new plugin util usage
  * added util index.js helper
  * added 2012 to copyright headers
  * Added DeepEqual assertions

0.5.3 / 2012-04-21 
==================

  * Merge branch 'refs/heads/jgonera-oldbrowsers'
  * browser build
  * fixed reserved names for old browsers in interface/assert
  * fixed reserved names for old browsers in interface/should
  * fixed: chai.js no longer contains fail()
  * fixed reserved names for old browsers in Assertion
  * Merge pull request #49 from joliss/build-order
  * Make order of source files well-defined
  * Merge pull request #43 from zzen/patch-1
  * Support for expected and actual parameters in assert-style error object
  * chai as promised - readme

0.5.2 / 2012-03-21 
==================

  * browser build
  * Merge branch 'feature/assert-fail'
  * Added assert.fail. Closes #40
  * Merge branch 'bug/operator-msg'
  * better error message for assert.operator. Closes #39
  * version notes

0.5.1 / 2012-03-14 
==================

  * chai.fail no longer exists
  * Merge branch 'feature/assertdefined'
  * Added asset#isDefined. Closes #37.
  * dev docs update for Assertion#assert

0.5.0 / 2012-03-07 
==================

  * [bug] on inspect of reg on n 0.4.12
  * Merge branch 'bug/33-throws'
  * Merge pull request #35 from logicalparadox/empty-object
  * browser build
  * updated #throw docs
  * Assertion#throw `should` tests updated
  * Assertion#throw `expect` tests
  * Should interface supports multiple throw parameters
  * Update Assertion#throw to support strings and type checks.
  * Add more tests for `empty` in `should`.
  * Add more tests for `empty` in `expect`.
  * Merge branch 'master' into empty-object
  * don't switch act/exp
  * Merge pull request #34 from logicalparadox/assert-operator
  * Update the compiled verison.
  * Add `assert.operator`.
  * Notes on messages. #22
  * browser build
  * have been test
  * below tests
  * Merge branch 'feature/actexp'
  * browser build
  * remove unnecessary fail export
  * full support for actual/expected where relevant
  * Assertion.assert support expected value
  * clean up error
  * Update the compiled version.
  * Add object & sane arguments support to `Assertion#empty`.

0.4.2 / 2012-02-28 
==================

  * fix for `process` not available in browser when used via browserify. Closes #28
  * Merge pull request #31 from joliss/doc
  * Document that "should" works in browsers other than IE
  * Merge pull request #30 from logicalparadox/assert-tests
  * Update the browser version of chai.
  * Update `assert.doesNotThrow` test in order to check the use case when type is a string.
  * Add test for `assert.ifError`.
  * Falsey -> falsy.
  * Full coverage for `assert.throws` and `assert.doesNotThrow`.
  * Add test for `assert.doesNotThrow`.
  * Add test for `assert.throws`.
  * Add test for `assert.length`.
  * Add test for `assert.include`.
  * Add test for `assert.isBoolean`.
  * Fix the implementation of `assert.isNumber`.
  * Add test for `assert.isNumber`.
  * Add test for `assert.isString`.
  * Add test for `assert.isArray`.
  * Add test for `assert.isUndefined`.
  * Add test for `assert.isNotNull`.
  * Fix `assert.isNotNull` implementation.
  * Fix `assert.isNull` implementation.
  * Add test for `assert.isNull`.
  * Add test for `assert.notDeepEqual`.
  * Add test for `assert.deepEqual`.
  * Add test for `assert.notStrictEqual`.
  * Add test for `assert.strictEqual`.
  * Add test for `assert.notEqual`.

0.4.1 / 2012-02-26 
==================

  * Merge pull request #27 from logicalparadox/type-fix
  * Update the browser version.
  * Add should tests for type checks.
  * Add function type check test.
  * Add more type checks tests.
  * Add test for `new Number` type check.
  * Fix type of actual checks.

0.4.0 / 2012-02-25 
==================

  * docs and readme for upcoming 0.4.0
  * docs generated
  * putting coverage and tests for docs in docs/out/support
  * make docs
  * makefile copy necessary resources for tests in docs
  * rename configuration test
  * Merge pull request #21 from logicalparadox/close-to
  * Update the browser version.
  * Update `closeTo()` docs.
  * Add `Assertion.closeTo()` method.
  * Add `.closeTo()` should test.
  * Add `.closeTo()` expect test.
  * Merge pull request #20 from logicalparadox/satisfy
  * Update the browser version.
  * `..` -> `()` in `.satisfy()` should test.
  * Update example for `.satisfy()`.
  * Update the compiled browser version.
  * Add `Assertion.satisfy()` method.
  * Add `.satisfy()` should test.
  * Add `.satisfy()` expect test.
  * Merge pull request #19 from logicalparadox/respond-to
  * Update the compiled browser version.
  * Add `respondTo` Assertion.
  * Add `respondTo` should test.
  * Add `respondTo` expect test.
  * Merge branch 'feature/coverage'
  * mocha coverage support
  * doc contributors
  * README contributors

0.3.4 / 2012-02-23 
==================

  * inline comment typos for #15
  * Merge branch 'refs/heads/jeffbski-configErrorStackCompat'
  * includeStack documentation for all interfaces
  * suite name more generic
  * Update test to be compatible with browsers that do not support err.stack
  * udpated compiled chai.js and added to browser tests
  * Allow inclusion of stack trace for Assert error messages to be configurable
  * docs sharing buttons
  * sinon-chai link
  * doc updates
  * read me updates include plugins

0.3.3 / 2012-02-12 
==================

  * Merge pull request #14 from jfirebaugh/configurable_properties
  * Make Assertion.prototype properties configurable

0.3.2 / 2012-02-10 
==================

  * codex version
  * docs
  * docs cleanup

0.3.1 / 2012-02-07 
==================

  * node 0.4.x compat

0.3.0 / 2012-02-07 
==================

  * Merge branch 'feature/03x'
  * browser build
  * remove html/json/headers testign
  * regex error.message testing
  * tests for using plugins
  * Merge pull request #11 from domenic/master
  * Make `chai.use` a no-op if the function has already been used.

0.2.4 / 2012-02-02 
==================

  * added in past tense switch for `been`

0.2.3 / 2012-02-01 
==================

  * try that again

0.2.2 / 2012-02-01 
==================

  * added `been` (past of `be`) alias

0.2.1 / 2012-01-29 
==================

  * added Throw, with a capital T, as an alias to `throw` (#7)

0.2.0 / 2012-01-26 
==================

  * update gitignore for vim *.swp
  * Merge branch 'feature/plugins'
  * browser build
  * interfaces now work with use
  * simple .use function. See #9.
  * readme notice on browser compat

0.1.7 / 2012-01-25 
==================

  * added assert tests to browser test runner
  * browser update
  * `should` interface patch for primitives support in FF
  * fix isObject() Thanks @milewise
  * travis only on branch `master`
  * add instanceof alias `instanceOf`. #6
  * some tests for assert module

0.1.6 / 2012-01-02
==================

  * commenting for assert interface
  * updated codex dep

0.1.5 / 2012-01-02
==================

  * browser tests pass
  * type in should.not.equal
  * test for should (not) exist
  * added should.exist and should.not.exist
  * browser uses tdd
  * convert tests to tdd

0.1.4 / 2011-12-26
==================

  * browser lib update for new assert interface compatiblitiy
  * inspect typos
  * added strict equal + negatives and ifError
  * interface assert had doesNotThrow
  * added should tests to browser
  * new expect empty tests
  * should test browser compat
  * Fix typo for instanceof docs. Closes #3 [ci skip]

0.1.3 / 2011-12-18
==================

  * much cleaner reporting string on error.

0.1.2 / 2011-12-18
==================

  * [docs] for upcoming 0.1.2
  * browser version built with pre/suffix … all tests passing
  * make / compile now use prefix/suffix correctly
  * code clean
  * prefix/suffix to wrap browser output to prevent conflicts with other `require` methods.
  * Merge branch 'feature/should4xcompatibility'
  * compile for browser tests.. all pass
  * added header/status/html/json
  * throw tests
  * should.throw & should.not.throw shortcuts
  * improved `throw` type detection and messaging
  * contain is now `include` … keys modifier is now `contain`
  * removed object() test
  * removed #respondTo
  * Merge branch 'bug/2'
  * replaced __defineGetter__ with defineProperty for all uses
  * [docs] change mp tracking code
  * docs site updated with assert (TDD) interface
  * updated doc comments for assert interface

0.1.1 / 2011-12-16
==================

  * docs ready for upcoming 0.1.1
  * readme image fixed [ci skip]
  * more readme tweaks [ci skip]
  * réadmet image fixed [ci skip]
  * documentation
  * codex locked in version 0.0.5
  * more comments to assertions for docs
  * assertions fully commented, browser library updated
  * adding codex as doc dependancy
  * prepping for docs
  * assertion component completely commented for documentation
  * added exist test
  * var expect outside of browser if check
  * added keywords to package.json

0.1.0 / 2011-12-15
==================

  * failing on purpose successful .. back to normal
  * testing travis failure
  * assert#arguments getter
  * readme typo
  * updated README
  * added travis and npmignore
  * copyright notices … think i got them all
  * moved expect interface to own file for consistency
  * assert ui deepEqual
  * browser tests expect (all working)
  * browser version built
  * chai.fail (should ui)
  * expect tests browser compatible
  * tests for should and expect (all pass)
  * moved fail to primary export
  * should compatibility testing
  * within, greaterThan, object, keys,
  * Aliases
  * Assertion#property now correctly works with negate and undefined values
  * error message language matches should
  * Assertion#respondTo
  * Assertion now uses inspect util
  * git ignore node modules
  * should is exported
  * AssertionError __proto__ from Error.prototype
  * add should interface for should.js compatibility
  * moved eql to until folder and added inspect from (joyent/node)
  * added mocha for testing
  * browser build for current api
  * multiple .property assertions
  * added deep equal from node

0.0.2 / 2011-12-07
==================

  * cleaner output on error
  * improved exists detection
  * package remnant artifact
  * empty deep equal
  * test browser build
  * assertion cleanup
  * client compile script
  * makefile
  * most of the basic assertions
  * allow no parameters to assertion error
  * name change
  * assertion error instance
  * main exports: assert() & expect()
  * initialize
