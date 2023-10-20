module.exports = function(config) {
  config.set({
      frameworks: [ 'mocha' ]
    , files: [
        { pattern: 'chai.js', type: 'module', included: false, served: true }
      , { pattern: 'test/bootstrap/index.js', type: 'module'}
      , { pattern: 'test/*.js', type: 'module' }
      , { pattern: 'test/type-detect/*.js', type: 'module' }
      ]
    , reporters: [ 'progress' ]
    , colors: true
    , logLevel: config.LOG_INFO
    , autoWatch: false
    , browsers: [ 'HeadlessChrome' ]
    , customLaunchers: {
      HeadlessChrome: {
      base: 'ChromeHeadless'
    , flags: [ '--no-sandbox',]
    , }
    , }
    , browserDisconnectTimeout: 10000
    , browserDisconnectTolerance: 2
    , browserNoActivityTimeout: 20000
    , singleRun: true
  });

  switch (process.env.CHAI_TEST_ENV) {
    case 'sauce':
      require('./karma.sauce')(config);
      break;
    default:
      // ...
      break;
  };
};
