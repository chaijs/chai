module.exports = {

  /*!
   * ### config.includeStack
   *
   * User configurable property, influences whether stack trace
   * is included in Assertion error message. Default of false
   * suppresses stack trace in the error message
   *
   *     chai.config.includeStack = true;  // enable stack on error
   *
   * @api public
   */
   includeStack: false,

  /*!
   * ### config.showDiff
   *
   * User configurable property, influences whether or not
   * the `showDiff` flag should be included in the thrown
   * AssertionErrors. `false` will always be `false`; `true`
   * will be true when the assertion has requested a diff
   * be shown.
   *
   * @api public
   */
  showDiff: true

};