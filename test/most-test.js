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
			var next = this.spy();

			most.fromArray([1,2]).forEach(next, function(e) {
				expect(next).toHaveBeenCalledTwice();
				done();
			});
		})
	});
});