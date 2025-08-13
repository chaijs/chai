/*!
 * Chai - eventEmitter utility
 * Copyright(c) 2011-2016 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

// Global EventTarget instance
const emitter = new EventTarget();

class PluginEvent extends Event {
  constructor(type, name, fn) {
    super(type);
    this.name = String(name)
    this.fn = fn
  }
}

/**
 * ### .on(event, handler)
 *
 * Adds a handler to an event.
 *
 *     utils.on('addProperty', function (name, getter) {
 *         var obj = utils.flag(this, 'object');
 *         new chai.Assertion(obj).to.be.equal(str);
 *     });
 *
 * The events emitted by chai are 'addProperty' and 'addMethod'.
 *
 * @param {string} event to listen to
 * @param {Function} handler function to handle the event
 * @namespace Utils
 * @name on
 * @public
 */
export function on(event, handler) {
  emitter.addEventListener(event, handler);
}

/**
 * ### .off(event, handler)
 *
 * Removes a handler to an event added via `on`.
 *
 *     utils.on('addMethod', handler);
 *     utils.off('addMethod', handler);
 *
 * @param {string} event to listen to
 * @param {Function} handler function to handle the event
 * @namespace Utils
 * @name off
 * @public
 */
export function off(event, handler) {
  emitter.removeEventListener(event, handler);
}

/**
 * ### .emit(event, ...params)
 *
 * Emits events registered via `on`.
 *
 *     utils.on('addMethod', handler);
 *     utils.emit('addMethod', "foo", "bar");
 *
 * @param {string} event to emit
 * @param {string} name of the added method or property
 * @param {Function} fn the added method or getter
 * @namespace Utils
 * @name emit
 * @public
 */
export function emit(event, name, fn) {
  emitter.dispatchEvent(new PluginEvent(event, name, fn));
}
