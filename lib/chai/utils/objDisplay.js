
var inspect = require('./inspect');

module.exports = function (obj) {
  var type = Object.prototype.toString.call(obj);

  if (type === '[object Array]') {
    return '[ Array(' + obj.length + ') ]';
  } else if (type === '[object Object]') {
    var keys = Object.keys(obj)
      , kstr = keys.length > 2
        ? keys.splice(0, 2).join(', ') + ', ...'
        : keys.join(', ');
    return '{ Object (' + kstr + ') }';
  } else {
    return inspect(obj);
  }
};
