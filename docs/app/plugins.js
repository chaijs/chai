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
    , tags: [ 'extend' ]
    , pkg: 'https://raw.github.com/chaijs/chai-spies/master/package.json'
    , markdown: 'https://raw.github.com/chaijs/chai-spies/master/README.md' }

  , { name: 'Chai HTTP'
    , desc: 'HTTP request/response assertions.'
    , url: 'chai-http'
    , link: 'https://github.com/chaijs/chai-http'
    , tags: [ 'extend' ]
    , pkg: 'https://raw.github.com/chaijs/chai-http/master/package.json'
    , markdown: 'https://raw.github.com/chaijs/chai-http/master/README.md'
    , browser: false }

  , { name: 'Sinon Chai'
    , desc: 'Extends Chai with assertions for the Sinon.JS mocking framework.'
    , url: 'sinon-chai'
    , link: 'http://github.com/domenic/sinon-chai'
    , tags: [ 'vendor' ]
    , pkg: 'https://raw.github.com/domenic/sinon-chai/master/package.json'
    , markdown: 'https://raw.github.com/domenic/sinon-chai/master/README.md' }

  , { name: 'Chai jQuery'
    , desc: 'Function spies and assertions.'
    , url: 'chai-jquery'
    , link: 'https://github.com/chaijs/chai-spies'
    , tags: [ 'vendor' ]
    , pkg: 'https://raw.github.com/jfirebaugh/chai-jquery/master/package.json'
    , markdown: 'https://raw.github.com/jfirebaugh/chai-jquery/master/README.md' }

  , { name: 'Chai Timers'
    , desc: 'Function spies and assertions.'
    , url: 'chai-timers'
    , link: 'https://github.com/chaijs/chai-timers'
    , tags: [ 'extend' ]
    , pkg: 'https://raw.github.com/chaijs/chai-spies/master/package.json'
    , markdown: 'https://raw.github.com/chaijs/chai-timer/master/README.md' }

  , { name: 'Chai Stats'
    , desc: 'Function spies and assertions.'
    , url: 'chai-stats'
    , link: 'https://github.com/chaijs/chai-stats'
    , tags: [ 'extend' ]
    , pkg: 'https://raw.github.com/chaijs/chai-spies/master/package.json'
    , markdown: 'https://raw.github.com/chaijs/chai-stats/master/README.md' }

];
