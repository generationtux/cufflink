let fs = require('fs');
let objLoc = require('../src/ObjectLocator');
var expect = require('chai').expect;

describe('Dependency Graph Tests', () => {
    it('Should be constructed and return the correct order', () => {
        let obj = new objLoc(fs, "Item");
        let json = obj.run();
        expect(JSON.stringify(json)).to.contain('Item');
        expect(JSON.stringify(json)).to.contain('Cart');
        expect(JSON.stringify(json)).to.contain('Customer');

    });
});