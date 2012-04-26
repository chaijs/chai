var http = require('http')
  , express = require('express');

app = express();

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.use(express.bodyParser());
app.use(app.router);

require('./routes');

var server = module.exports = http.createServer(app);

if (require.main == module) {
  server.listen(3441);
  console.log('chai.js server listening on port %d', server.address().port);
}
