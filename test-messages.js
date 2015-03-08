var Msg = require('./lib/chai/core/message')
  , debug = require('./lib/chai/utils/debug');

/*
var msg = new Msg(
  "This is [-:not ][@:[cool?:{{good_adjective}}|{{bad_adjective}}]] piece of {{this}}, " +
  "[question?:[-:is][+:isn't] it?] " +
  "Please, have [#beers:no|one|{{count}}] [#beers:beer|beers] to celebrate :{o"
);
*/

var msg = new Msg("Ha [+:but got {{act}}]")

debug("- - -   Tree   - - -");
debug(msg);

debug("- - -   Composing   - - -");

var msg = msg.compose({
  good_adjective: 'awesome',
  bad_adjective: 'poor',
  'this': 'code',
  question: true,
  cool: true,
  negate: false,
  beers: process.env.beers || 0,
  count: 'three',
   act: 3
});

console.log(msg);
