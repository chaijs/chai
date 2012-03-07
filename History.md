
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
