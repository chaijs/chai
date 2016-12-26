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

	it('should fail if comparing when comparing objects to dates', function () {
		expect(testedObject).to.not.containSubset({
			e: new Date()
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

describe('comparison of non objects', function () {
	it('should fail if actual subset is null', function () {
		expect(null).to.not.containSubset({a: 1});
	});

	it('should fail if expected subset is not a object', function () {
		expect({a: 1}).to.not.containSubset(null);
	});

	it('should not fail for same non-object (string) variables', function () {
		expect('string').to.containSubset('string');
	});
});

describe('assert style of test', function () {
	it('should find subset', function () {
		var assert = require('chai').assert;
		assert.containSubset({a: 1, b: 2}, {a: 1});
	});
});

describe('comparison of dates', function() {
	it('should pass for the same date', function() {
		expect(new Date('2015-11-30')).to.containSubset(new Date('2015-11-30'));
	});

	it('should pass for the same date if nested', function() {
		expect({a: new Date('2015-11-30')}).to.containSubset({a: new Date('2015-11-30')});
	});

	it('should fail for a different date', function() {
		expect(new Date('2015-11-30')).to.not.containSubset(new Date('2012-02-22'));
	});

	it('should fail for a different date if nested', function() {
		expect({a: new Date('2015-11-30')}).to.not.containSubset({a: new Date('2012-02-22')});
	});

	it('should fail for invalid expected date', function() {
		expect(new Date('2015-11-30')).to.not.containSubset(new Date('not valid date'));
	});

	it('should fail for invalid actual date', function() {
		expect(new Date('not valid actual date')).to.not.containSubset(new Date('not valid expected date'));
	});
});