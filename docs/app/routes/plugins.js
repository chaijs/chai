var filtr = require('filtr')
  , highlight = require('highlight').Highlight
  , marked = require('marked')
  , plugins = require('../plugins')
  , request = require('superagent');

var site_tags = []
  , plugin_locals = {};

plugins.forEach(function (plug) {
  if (!plug.tags || !Array.isArray(plug.tags)) return;
  plug.tags.forEach(function (tag) {
    if (!~site_tags.indexOf(tag)) site_tags.push(tag);
  });
});

site_tags.sort(function (a, b) {
  var A = a.toLowerCase()
    , B = b.toLowerCase();
  if (A < B) return -1;
  else if (A > B) return 1;
  else return 0;
});

site_tags.forEach(function (tag) {
  var query = filtr({ 'tags': { $all: [ tag ] } })
    , res = query.test(plugins);
  plugin_locals[tag] = res;
});

app.get('/plugins', function (req, res) {
  res.json(plugin_locals);
});

app.get('/plugins/:id', function (req, res, next) {
  var query = filtr({ 'url': req.params.id })
    , plugin = query.test(plugins)[0];

  if (!plugin) return next();

  var pkg = null
    , html = null;

  function render () {
    if (!pkg || !html) return;
    res.end(html);
  }

  request
    .get(plugin.markdown)
    .end(function (readme) {
      html = (readme.status == 200)
        ? parseMarkdown(readme.text)
        : '<p>No information provided.</p>'
      render();
    });

  request
    .get(plugin.pkg)
    .end(function (pack) {
      if (pack.status == 200) {
        try {
          pkg = JSON.parse(pack.text);
        } catch (ex) {
          pkg = { error: 2 }
        }
      } else {
        pkg = { error: 1 };
      }
      console.log(pkg);
      render();
    });
});


function parseMarkdown (text) {
  var tokens = marked.lexer(text)
    , l = tokens.length
    , token;

  for (var i = 0; i < l; i++) {
    token = tokens[i];
    if (token.type == 'code') {
      token.text = highlight(token.text);
      token.escaped = true;
    }
  }

  text = marked.parser(tokens);
  return text;
};
