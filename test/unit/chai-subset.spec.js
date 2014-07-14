describe('plain object', function() {
	var testedObject = {
		a: 'b',
		c: 'd'
	};

	it('should pass for smaller object', function() {
		expect(testedObject).to.containSubset({
			a: 'b'
		});
	});

	it('should pass for same object', function() {
		expect(testedObject).to.containSubset({
			a: 'b',
			c: 'd'
		});
	});

	it('should pass for similar, but not the same object', function() {
		expect(testedObject).to.not.containSubset({
			a: 'notB',
			c: 'd'
		});
	});
});

describe('complex object', function() {
	var testedObject = {
		a: 'b',
		c: 'd',
		e: {
			foo: 'bar',
			baz: {
				qux: 'quux'
			}
		}
	};

	it('should pass for smaller object', function() {
		expect(testedObject).to.containSubset({
			a: 'b',
			e: {
				foo: 'bar'
			}
		});
	});

	it('should pass for smaller object', function() {
		expect(testedObject).to.containSubset({
			e: {
				foo: 'bar',
				baz: {
					qux: 'quux'
				}
			}
		});
	});

	it('should pass for same object', function() {
		expect(testedObject).to.containSubset({
			a: 'b',
			c: 'd',
			e: {
				foo: 'bar',
				baz: {
					qux: 'quux'
				}
			}
		});
	});

	it('should pass for similar, but not the same object', function() {
		expect(testedObject).to.not.containSubset({
			e: {
				foo: 'bar',
				baz: {
					qux: 'notAQuux'
				}
			}
		});
	});
});