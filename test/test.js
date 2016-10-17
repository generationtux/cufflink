'use strict';

var expect = require('chai').expect;
var numFormatter = require('../index');

describe('#numFormatter', () => {
    it('should add 2 + 2', () => {
        var result = 2 + 2;
        expect(result).to.equal(4);
    });
});