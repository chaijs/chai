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

describe('circular objects', function() {
	var object = {};

	before(function() {
		object.arr = [
			object, object
		];
		object.arr.push(object.arr);
		object.obj = object;
	});

	it('should contain subdocument', function() {
		expect(object).to.containSubset({
			arr: [
				{arr: []},
				{arr: []},
				[
					{arr: []},
					{arr: []}
				]
			]
		});
	});

	it('should not contain similar object', function() {
		expect(object).to.not.containSubset({
			arr: [
				{arr: ['just random field']},
				{arr: []},
				[
					{arr: []},
					{arr: []}
				]
			]
		});
	});
});