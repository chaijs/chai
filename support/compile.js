var fs = require('fs')
  , join = require('path').join;

var args = process.argv.slice(2)
  , pending = args.length
  , files = {};

args.forEach(function(file){
  var mod = file.replace('lib/', '');
  fs.readFile(file, 'utf8', function(err, js){
    if (err) throw err;
    console.log('  \033[90mcompile : \033[0m\033[36m%s\033[0m', file);
    files[file] = js;
    --pending || compile();
  });
});


function compile() {
  var buf = '';
  buf += '\n// CommonJS require()\n\n';
  buf += browser.require + '\n\n';
  buf += 'require.modules = {};\n\n';
  buf += 'require.resolve = ' + browser.resolve + ';\n\n';
  buf += 'require.register = ' + browser.register + ';\n\n';
  buf += 'require.relative = ' + browser.relative + ';\n\n';

  args.forEach(function(file){
    var js = files[file];
    file = file.replace('lib/', '');
    buf += '\nrequire.register("' + file + '", function(module, exports, require){\n';
    buf += js;
    buf += '\n}); // module: ' + file + '\n';
  });

  var prefix = fs.readFileSync(join(__dirname, 'prefix.js'), 'utf8')
    , suffix = fs.readFileSync(join(__dirname, 'suffix.js'), 'utf8');

  buf = prefix + '\n' + buf + '\n' + suffix;

  fs.writeFile('chai.js', buf, function(err){
    if (err) throw err;
    console.log('  \033[90m create : \033[0m\033[36m%s\033[0m', 'chai.js');
    console.log();
  });
}


// Mocha Browser Require
// (The MIT License)
// Copyright (c) 2011 TJ Holowaychuk <tj@vision-media.ca>

var browser = {

  /**
   * Require a module.
   */

  require: function require(p){
    var path = require.resolve(p)
      , mod = require.modules[path];
    if (!mod) throw new Error('failed to require "' + p + '"');
    if (!mod.exports) {
      mod.exports = {};
      mod.call(mod.exports, mod, mod.exports, require.relative(path));
    }
    return mod.exports;
  },

  /**
   * Resolve module path.
   */

  resolve: function(path){
    var orig = path
      , reg = path + '.js'
      , index = path + '/index.js';
    return require.modules[reg] && reg
      || require.modules[index] && index
      || orig;
  },

  /**
   * Return relative require().
   */

  relative: function(parent) {
    return function(p){
      if ('.' != p[0]) return require(p);

      var path = parent.split('/')
        , segs = p.split('/');
      path.pop();

      for (var i = 0; i < segs.length; i++) {
        var seg = segs[i];
        if ('..' == seg) path.pop();
        else if ('.' != seg) path.push(seg);
      }

      return require(path.join('/'));
    };
  },

  /**
   * Register a module.
   */

  register: function(path, fn){
    require.modules[path] = fn;
  }
};