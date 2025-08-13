/*!
 * Chai - eventEmitter utility
 * Copyright(c) 2011-2016 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

// Global EventTarget instance
const emitter = new EventTarget();

// WeakMap: handler -> { [eventName]: listener }
const listenerMap = new WeakMap();

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
  let eventMap = listenerMap.get(handler);
  if (!eventMap) {
    eventMap = {};
    listenerMap.set(handler, eventMap);
  }

  if (eventMap[event])
    return;

  eventMap[event] = (e) => {
    handler(...(e.detail || []));
  };

  emitter.addEventListener(event, eventMap[event]);
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
  const eventMap = listenerMap.get(handler);
  if (!eventMap) return;

  const listener = eventMap[event];
  if (listener) {
    emitter.removeEventListener(event, listener);
    delete eventMap[event];
  }
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
 * @param {...any} params to pass to the handlers
 * @namespace Utils
 * @name emit
 * @public
 */
export function emit(event, ...params) {
  emitter.dispatchEvent(new CustomEvent(event, { detail: params }));
}
