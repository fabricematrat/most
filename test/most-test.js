require('buster').spec.expose();
var expect = require('buster').expect;

var most = require('../most');

describe('most', function() {

	describe('fromArray', function() {

		it('should not call next for empty array', function(done) {
			var next = this.spy();

			most.fromArray([]).forEach(next, function(e) {
				expect(next).not.toHaveBeenCalled();
				expect(e).not.toBeDefined();
				done();
			});
		}),
		it('should iterate over each elements', function(done) {
			var results = [];
			most.fromArray([1, 2]).forEach(function(x) {
				results.push(x);
			}, function(e) {
				expect(results).toEqual([1, 2]);
				done();
			});
		}),
		it('should iterate until reach the right number', function(done) {
			var s1 = most.fromArray([1, 2, 3, 4, 5]);
			var originalEmitter = s1._emitter;
			var count = 0;
			s1._emitter = function(next, end) {
				originalEmitter(function(x) {
					count++;
					return next(x);
				} ,end);
			};

			var results = [];
			s1.take(2).forEach(function(x) {
				results.push(x);
			}, function(e) {
				// Invoke take 3 times before stopping then
				// once more to end recursion => 4
				expect(count).toEqual(4);
				expect(results).toEqual([1, 2]);
				done();
			});
		})
	});
});