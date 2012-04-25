
var express = require('express')
  , join = require('path').join;


app.use(express.static(join(__dirname, '..', '..', 'out')));
