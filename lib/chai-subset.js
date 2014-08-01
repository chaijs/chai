module.exports = function(chai) {
	chai.Assertion.addChainableMethod('containSubset', function (expected) {
		var actual = this.__flags.object;
		var msg = "\n" + JSON.stringify(actual, null, "\t") + "\n";
		this.assert(
			compare(expected, actual),
				'expected' + msg + 'to contain subset \n#{exp}',
				'expected' + msg + 'not to contain subset \n#{exp}',
			expected
		);
	});
};

function compare(expected, actual) {
	if (typeof(actual) !== typeof(expected)) {
		return false;
	}
	if (typeof(expected) !== 'object' || expected === null) {
		return expected === actual;
	}
	if (!!expected && !actual) {
		return false;
	}

	if (Array.isArray(expected)) {
		if (typeof(actual.length) !== 'number') {
			return false;
		}
		var aa = Array.prototype.slice.call(actual);
		return expected.every(function (exp) {
			return aa.some(function (act) {
				return compare(exp, act);
			});
		});
	}

	return Object.keys(expected).every(function (key) {
		var eo = expected[key];
		var ao = actual[key];
		if (typeof(eo) === 'object' && eo !== null && ao !== null) {
			return compare(eo, ao);
		}
		return ao === eo;
	});
}