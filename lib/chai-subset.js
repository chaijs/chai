(function() {
	(function(chaiSubset) {
		if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
			return module.exports = chaiSubset;
		} else if (typeof define === 'function' && define.amd) {
			return define(function() {
				return chaiSubset;
			});
		} else {
			return chai.use(chaiSubset);
		}
	})(function(chai, utils) {
		var Assertion = chai.Assertion;
		var assertionPrototype = Assertion.prototype;

		Assertion.addMethod('containSubset', function (expected) {
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

		chai.assert.containSubset = function(val, exp, msg) {
			new chai.Assertion(val, msg).to.be.containSubset(exp);
		};

		function compare(expected, actual) {
			if (expected === actual) {
				return true;
			}
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

			if (expected instanceof Date) {
				if (actual instanceof Date) {
					return expected.getTime() === actual.getTime();
				} else {
					return false;
				}
			}

			return Object.keys(expected).every(function (key) {
				var eo = expected[key];
				var ao = actual[key];
				if (typeof(eo) === 'object' && eo !== null && ao !== null) {
					return compare(eo, ao);
				}
				if (typeof(eo) === 'function') {
					return eo(ao);
				}
				return ao === eo;
			});
		}
	});

}).call(this);

