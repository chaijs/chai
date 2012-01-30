
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
