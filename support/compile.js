var folio = require('folio');

folio('chai')
  .root(__dirname, '..')
  .use(folio.requires())
    .dir('./lib')
    .package('chai')
    .entry('./chai.js')
    .ignore('./chai/error.js')
    .replace('./chai/error', './chai/browser/error')
    .replace('./error', './browser/error')
    .pop()
  .use(folio.indent())
    .line('  ')
    .pop()
  .use(folio.wrapper())
    .prefix([
        '!function (name, context, definition) {'
      , '  if (typeof require === \'function\' && typeof exports === \'object\' && typeof module === \'object\') {'
      , '    module.exports = definition();'
      , '  } else if (typeof define === \'function\' && typeof define.amd  === \'object\') {'
      , '    define(function () {'
      , '      return definition();'
      , '    });'
      , '  } else {'
      , '    context[name] = definition();'
      , '  }'
      , '}(\'chai\', this, function () {\n'
    ].join('\n'))
    .suffix([
        '\n  return require(\'chai\');'
      , '});'
    ].join('\n'))
    .pop()
  .use(folio.save())
    .file('./chai.js')
    .pop()
  .compile();
