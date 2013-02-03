/*!
 * Mocha Cloud (SauceLabs) Test Runner
 */

/*!
 * Module dependencies
 */

var Cloud = require('mocha-cloud')
  , connect = require('connect')
  , http = require('http')
  , resolve = require('path').resolve
  , auth;

/*!
 * Attempt to load saucelabs authentication
 */

try {
  auth = require('../test/auth/sauce.json');
} catch (ex) {
  console.error('Error loading SauceLabs authentication at "./test/auth/sauce.json"');
  process.exit(1);
}

/*!
 * Create cloud and test server
 */

var app = connect()
  , cloud = new Cloud('chai.js', auth.username, auth.key)
  , server = http.createServer(app);

/*!
 * Connect Middleware
 */

app.use(connect.static(resolve(__dirname, '..')))

/*!
 * SauceLabs configuration
 */

cloud.url('http://localhost:3000/test/browser/sauce.html');

/*!
 * Chrome
 */

cloud.browser('chrome', null, 'Mac 10.6');
cloud.browser('chrome', null, 'Mac 10.8');

/*!
 * Firefox
 */

//cloud.browser('firefox', '17', 'Windows 2012');
//cloud.browser('firefox', '18', 'Windows 2012');

/*!
 * Safari
 */

// osx
cloud.browser('safari', '5', 'Mac 10.6');
cloud.browser('safari', '6', 'Mac 10.8');

// win
//cloud.browser('safari', '5', 'Windows 2008');

/*!
 * Internet Explorer
 */

//cloud.browser('iexplore', '10', 'Windows 2012');

/*!
 * iPad
 */

cloud.browser('ipad', '4.3', 'Mac 10.6');
cloud.browser('ipad', '5', 'Mac 10.6');
cloud.browser('ipad', '5.1', 'Mac 10.8');
cloud.browser('ipad', '6', 'Mac 10.8');

/*!
 * iPhone
 */

cloud.browser('iphone', '4.3', 'Mac 10.6');
cloud.browser('iphone', '5', 'Mac 10.6');
cloud.browser('iphone', '5.1', 'Mac 10.8');
cloud.browser('iphone', '6', 'Mac 10.8');

/*!
 * SauceLabs events
 */

cloud.on('init', function (browser) {
  console.log('  init : %s %s', browser.browserName, browser.version);
});

cloud.on('start', function (browser) {
  console.log('  start : %s %s', browser.browserName, browser.version);
});

cloud.on('end', function (browser, res) {
  console.log('  end : %s %s : %d failures', browser.browserName, browser.version, res.failures);
});

/*!
 * Start server
 */

server.listen(3000, function () {
  cloud.start(function () {
    console.log('done');
    server.close();
  });
});
