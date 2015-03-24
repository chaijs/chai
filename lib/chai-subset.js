module.exports = function(chai, utils) {
	var Assertion = chai.Assertion;
	var assertionPrototype = Assertion.prototype;

	Assertion.addChainableMethod('containSubset', function (expected) {
		var actual = utils.flag(this, 'object');
		var showDiff = chai.config.showDiff;

		assertionPrototype.assert.call(this,
			compare(expected, actual),
			'expected #{act} to contain subset #{exp}',
			'expected #{act} to not contain subset #{exp}',
			expected,
			actual,
			showDiff
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
