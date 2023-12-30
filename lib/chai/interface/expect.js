/*!
 * chai
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
import * as chai from '../../chai.js';
import { Assertion } from '../assertion.js';
import { AssertionError } from 'assertion-error';
const expect = function expect(val, message) {
    return Assertion.create(val, message);
};
export { expect };
function expectFail(actualOrMessage, expected, message, operator) {
    let msg;
    let actual;
    if (arguments.length < 2) {
        msg = actualOrMessage;
        actual = undefined;
    }
    else {
        msg = message;
        actual = actualOrMessage;
    }
    msg = msg || 'expect.fail()';
    throw new AssertionError(msg, {
        actual: actual,
        expected: expected,
        operator: operator
    }, chai.expect.fail);
}
;
expect.fail = expectFail;
//# sourceMappingURL=expect.js.map