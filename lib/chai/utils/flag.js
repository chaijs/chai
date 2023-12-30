/*!
 * Chai - flag utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
function flag(obj, key, value) {
    const objWithFlags = obj;
    const flags = objWithFlags.__flags || (objWithFlags.__flags = Object.create(null));
    if (arguments.length === 3) {
        flags[key] = value;
    }
    else {
        return flags[key];
    }
}
export { flag };
//# sourceMappingURL=flag.js.map