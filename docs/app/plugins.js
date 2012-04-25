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
    , tags: [ 'spies' ]
    , pkg: 'https://raw.github.com/chaijs/chai-spies/master/package.json'
    , markdown: 'https://raw.github.com/chaijs/chai-spies/master/README.md' }

  , { name: 'Chai HTTP'
    , desc: 'HTTP request/response assertions.'
    , url: 'chai-http'
    , link: 'https://github.com/chaijs/chai-http'
    , tags: [ 'server', 'http' ]
    , pkg: 'https://raw.github.com/chaijs/chai-http/master/package.json'
    , markdown: 'https://raw.github.com/chaijs/chai-http/master/README.md'
    , browser: false }

];
