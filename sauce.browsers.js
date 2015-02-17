
/*!
 * Chrome
 */

exports['SL_Chrome'] = {
    base: 'SauceLabs'
  , browserName: 'chrome'
};

/*!
 * Firefox
 */

/*!
 * TODO: Karma doesn't seem to like this, though sauce boots its up
 *

exports['SL_Firefox_23'] = {
    base: 'SauceLabs'
  , browserName: 'firefox'
  , platform: 'Windows XP'
  , version: '23'
};

*/

exports['SL_Firefox'] = {
    base: 'SauceLabs'
  , browserName: 'firefox'
  , platform: 'Windows 7'
};

/*!
 * Opera
 */

exports['SL_Opera'] = {
    base: 'SauceLabs'
  , browserName: 'opera'
  , platform: 'Windows 7'
};


/*!
 * Internet Explorer
 */

exports['SL_IE_10'] = {
    base: 'SauceLabs'
  , browserName: 'internet explorer'
  , platform: 'Windows 2012'
  , version: '10'
};

exports['SL_IE_11'] = {
    base: 'SauceLabs'
  , browserName: 'internet explorer'
  , platform: 'Windows 2012'
  , version: '11'
};

/*!
 * Safari
 */

exports['SL_Safari_8'] = {
    base: 'SauceLabs'
  , browserName: 'safari'
  , version: '8'
};
 
exports['SL_Safari_7'] = {
    base: 'SauceLabs'
  , browserName: 'safari'
  , version: '7'
};

exports['SL_Safari_6'] = {
    base: 'SauceLabs'
  , browserName: 'safari'
  , version: '6'
};

exports['SL_Safari_5'] = {
    base: 'SauceLabs'
  , browserName: 'safari'
  , version: '5'
};

/*!
 * iPhone
 */

/*!
 * TODO: These take forever to boot or shut down. Causes timeout.
 *

exports['SL_iPhone_6'] = {
    base: 'SauceLabs'
  , browserName: 'iphone'
  , platform: 'Mac 10.8'
  , version: '6'
};

exports['SL_iPhone_5-1'] = {
    base: 'SauceLabs'
  , browserName: 'iphone'
  , platform: 'Mac 10.8'
  , version: '5.1'
};

exports['SL_iPhone_5'] = {
    base: 'SauceLabs'
  , browserName: 'iphone'
  , platform: 'Mac 10.6'
  , version: '5'
};

*/

/*!
 * Android
 */

/*!
 * TODO: fails because of error serialization
 *

exports['SL_Android_4'] = {
    base: 'SauceLabs'
  , browserName: 'android'
  , platform: 'Linux'
  , version: '4'
};

*/
