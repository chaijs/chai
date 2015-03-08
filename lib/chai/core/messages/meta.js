/*!
 * chai
 * http://chaijs.com
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 *
 * @author The Blacksmith (a.k.a. Saulo Vallory <me@saulovallory.com>)
 */

var inspect = require('../../utils/inspect'),
    typeOf = require('../../utils/type');

/**
 * ## Meta Classes
 *
 * This methods allow you to better control how
 * data is displayed in messages.
 *
 * All methods below are shortcuts for creating meta elements.
 * Each of them creates an object of a class with the same name.
 * Those classes are also exported in properties with the first
 * letter capitalized. The available classes are: `List`, `Type`,
 * `Range`, `RangeDelta` and `Unquoted`
 */
var exports = module.exports = {

  /**
   * ### List
   *
   * Displays a list of elements in a more readable format.
   *
   *     console.log(new List([1,2,3]))    // 1, 2 and 3
   *
   * @class List
   * @param {Array} elements
   */
  List: List,

  /**
   * ### Type
   *
   * Displays a type name.
   *
   *     console.log(new Type("string"))    // string
   *
   * @param {String} the name of the type
   */
  Type: Type,

  /**
   * ### Range
   *
   * Displays a range of allowed numbers as `lower`..`upper`
   *
   *     console.log(new Range(3, 7))    // 3..7
   *
   * @param {Number} lower bound of the range
   * @param {Number} upper bound of the range
   */
  Range: Range,

  /**
   * ### RangeDelta
   *
   * Displays a range of allowed numbers as `ref` +/- `delta`
   *
   *     console.log(new RangeDelta(6, 1.5))    // 6 +/- 1.5
   *
   * @param {Number} the reference point
   * @param {Number} allowed variation
   */
  RangeDelta: RangeDelta,

  /**
   * ### Unquoted
   *
   * Defines a value wich, when inspected, will be presented as an unquoted
   * string.
   *
   *     var str = "test";
   *     console.log(util.inspect(s))                // 'test'
   *     console.log(util.inspect(new Unquoted(s)))  // test
   *
   * @param {String} the string to be displayed
   */
  Unquoted: Unquoted,

  /**
   * ## Shorcuts
   *
   * The meta module exports shortcut methods for creating each of these meta
   * objects. So instead of doing
   *
   *     new meta.List([1,2,3])
   *
   * you can call the `.list` method and get the same result
   *
   *     meta.list([1,2,3])
   *
   * Note the difference in the case!
   */

  /**
   * ### .list(elements)
   *
   * @constructs List
   * @param {Array} list elements
   * @returns {List}
   */
  list: function(elements) {
    return new List(elements);
  },

  /**
   * ### .type(type)
   *
   * @constructs Type
   * @param {String} the name of the type
   * @returns {Type}
   */
  type: function(type) {
    return new Type(type);
  },

  /**
   * ### .typeOf(obj)
   *
   * This shortcut uses [`utils.type`](/api/plugins/#type) method to get the type of the `obj` param.
   * It still returns a `Type` object and is the same as doing
   *
   *     new Type(utils.type(obj));
   *
   * @constructs Type
   * @param {String} the name of the type
   * @returns {Type}
   */
  typeOf: function(obj) {
    return new Type(typeOf(obj));
  },


  /**
   * ### .range(lower, upper)
   *
   * @constructs Range
   * @param {Number} lower bound of the range
   * @param {Number} upper bound of the range
   * @returns {Range}
   */
  range: function(lower, upper) {
    return new Range(lower, upper);
  },

  /**
   * ### .rangeDelta(ref, delta)
   *
   * @class RangeDelta
   * @param {Number} the reference point
   * @param {Number} allowed variation
   * @returns {RangeDelta}
   */
  rangeDelta: function(ref, delta) {
    return new RangeDelta(ref, delta);
  },

  /**
   * ### .unquoted(str)
   *
   * @constructs Unquoted
   * @param {String} str
   * @returns {Unquoted}
   */
  unquoted: function (str) {
    return new Unquoted(str);
  },
};

function Type(type) {
  this._value = type;
}

Type.prototype.inspect = Type.prototype.toString = function() { return this._value; };


function Range(lower, upper) {
  this.lower = lower;
  this.upper = upper;
}

Range.prototype.inspect = function() {
  return this.lower + '..' + this.upper;
}

function RangeDelta(ref, delta) {
  this.ref = ref;
  this.delta = delta;
}

RangeDelta.prototype.inspect = function() {
  return this.ref + ' +/- ' + this.delta;
}


function List(elements) {
  this.elements = elements || [];
}

List.prototype.inspect = function() {
  if (this.elements.length > 1) {
    var keys = this.elements.map(function(key){
      return inspect(key);
    });
    var last = keys.pop();
    return keys.join(', ') + ' and ' + last;
  } else {
    return inspect(this.elements[0]);
  }
}

function Unquoted(str) {
  this.str = value;
}

Unquoted.prototype.inspect = function() {
  return this.str;
}
