/**
 * Please add your plugin information here. Data will be automatically
 * pulled from the references sources and used to display on the site.
 *
 * @param {String} `name` required
 * @param {String} `url` plugin page will be located at http://chaijs.com/plugins/{{url}}
 * @param {String} `repo` path on github required
 * @param {String} `pkg` url to json package.js
 * @param {String} `markdown` markdown file to use for content.
 * @param {Boolean} `node` supports node.js. defaults to true
 * @param {Boolean} `browser` supports browser. defaults to true
 */

module.exports = [

    { name: 'Chai Spies'
    , desc: 'Function spies and assertions.'
    , url: 'chai-spies'
    , link: 'https://github.com/chaijs/chai-spies'
    , tags: [ 'mocks-and-spies' ]
    , pkg: 'https://raw.github.com/chaijs/chai-spies/master/package.json'
    , markdown: 'https://raw.github.com/chaijs/chai-spies/master/README.md' }

  , { name: 'Chai HTTP'
    , desc: 'HTTP request/response assertions.'
    , url: 'chai-http'
    , link: 'https://github.com/chaijs/chai-http'
    , tags: [ 'http' ]
    , pkg: 'https://raw.github.com/chaijs/chai-http/master/package.json'
    , markdown: 'https://raw.github.com/chaijs/chai-http/master/README.md'
    , browser: false }

  , { name: 'Sinon–Chai'
    , desc: 'Extend Chai with assertions for the Sinon.JS mocking framework.'
    , url: 'sinon-chai'
    , link: 'http://github.com/domenic/sinon-chai'
    , tags: [ 'vendor', 'mocks-and-spies' ]
    , pkg: 'https://raw.github.com/domenic/sinon-chai/master/package.json'
    , markdown: 'https://raw.github.com/domenic/sinon-chai/master/README.md'
    , browser:
      { 'sinon-chai.js': 'https://raw.github.com/domenic/sinon-chai/master/lib/sinon-chai.js' }
    }

  , { name: 'Chai jQuery'
    , desc: 'Extend Chai with assertions for the DOM and jQuery.'
    , url: 'chai-jquery'
    , link: 'https://github.com/chaijs/chai-spies'
    , tags: [ 'vendor', 'dom' ]
    , pkg: 'https://raw.github.com/chaijs/chai-jquery/master/package.json'
    , markdown: 'https://raw.github.com/chaijs/chai-jquery/master/README.md'
    , node: false
    , browser:
      { 'chai-jquery.js': 'https://raw.github.com/chaijs/chai-jquery/master/chai-jquery.js' }
    }

  , { name: 'Chai Timers'
    , desc: 'Function spies and assertions.'
    , url: 'chai-timers'
    , link: 'https://github.com/chaijs/chai-timers'
    , tags: [ 'math' ]
    , pkg: 'https://raw.github.com/chaijs/chai-spies/master/package.json'
    , markdown: 'https://raw.github.com/chaijs/chai-timer/master/README.md' }

  , { name: 'Chai Stats'
    , desc: 'Function spies and assertions.'
    , url: 'chai-stats'
    , link: 'https://github.com/chaijs/chai-stats'
    , tags: [ 'math' ]
    , pkg: 'https://raw.github.com/chaijs/chai-spies/master/package.json'
    , markdown: 'https://raw.github.com/chaijs/chai-stats/master/README.md' }

  , { name: 'Chai Null'
    , desc: 'Null Object Pattern implmentation for Chai.'
    , url: 'chai-null'
    , link: 'https://github.com/chaijs/chai-null'
    , tags: [ 'object-constructors' ]
    , pkg: 'https://raw.github.com/chaijs/chai-null/master/package.json'
    , markdown: 'https://raw.github.com/chaijs/chai-null/master/Readme.md'
    , browser:
      { 'chai-null.js': 'https://raw.github.com/chaijs/chai-null/master/chai-null.js' }
    }

  , { name: 'Chai Factories'
    , desc: 'A simple &amp; straight-forward factory builder for your awesome tests.'
    , url: 'chai-factories'
    , link: 'https://github.com/chaijs/chai-factories'
    , tags: [ 'object-constructors' ]
    , pkg: 'https://raw.github.com/chaijs/chai-factories/master/package.json'
    , markdown: 'https://raw.github.com/chaijs/chai-factories/master/Readme.md'
    , browser:
      { 'chai-factories.js': 'https://raw.github.com/chaijs/chai-null/master/chai-factories.js' }
    }
];
