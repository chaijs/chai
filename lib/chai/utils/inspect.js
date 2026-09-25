// This is (almost) directly from Node.js utils
// https://github.com/joyent/node/blob/f8c335d0caf47f16d31413f89aa28eda3878e3aa/lib/util.js

import {inspect as _inspect} from 'loupe';
import {config} from '../config.js';

/**
 * ### .inspect(obj, [showHidden], [depth], [colors])
 *
 * Echoes the value of a value. Tries to print the value out
 * in the best way possible given the different types.
 *
 * @param {unknown} obj The object to print out.
 * @param {boolean=} showHidden Flag that shows hidden (not enumerable)
 *    properties of objects. Default is false.
 * @param {number=} depth Depth in which to descend in object. Default is 2.
 * @param {boolean=} colors Flag to turn on ANSI escape codes to color the
 *    output. Default is false (no coloring).
 * @returns {string}
 * @namespace Utils
 * @name inspect
 */
export function inspect(obj, showHidden, depth, colors) {
  let options = {
    colors: colors,
    depth: typeof depth === 'undefined' ? 2 : depth,
    showHidden: showHidden,
    truncate: config.truncateThreshold ? config.truncateThreshold : Infinity
  };

  // Loupe enumerates every own property of Node's `process`, which trips
  // deprecated accessors such as `_channel` (DEP0129) when truncating is
  // disabled (`truncateThreshold = 0` → Infinity). Cap the dump for process.
  // See https://github.com/chaijs/chai/issues/1728
  if (typeof process !== 'undefined' && obj === process && !config.truncateThreshold) {
    options.truncate = 1000;
    if (typeof depth === 'undefined') {
      options.depth = 1;
    }
  }

  return _inspect(obj, options);
}
