let fs = require('fs');
let objLoc = require('../src/ObjectLocator');
var expect = require('chai').expect;

describe('Object Locator Tests', () => {
    it('Should be constructed and return the correct order', () => {
        let obj = new objLoc(fs, "Item");
        let json = obj.run();
        expect(JSON.stringify(json)).to.contain('Item');
        expect(JSON.stringify(json)).to.contain('Cart');
        expect(JSON.stringify(json)).to.contain('Customer');
    });

    it('should return error on json file not existing', () => {
        let obj = new objLoc(fs, "BadItem");
        expect(obj.run).to.throw(Error);
    });

    it('should return error on json file being empty', () => {
        let obj = new objLoc(fs, "BadCustomer");
        expect(() => {
            obj.run()
        }).to.throw("Json for the file BadCustomer must have a dependency array, if none provide a blank array");
    });


    it('should return error on json file not having dependencies', () => {
        let obj = new objLoc(fs, "BadCart");
        expect(() => {
            obj.run()
        }).to.throw("Dependencies must be an array! object BadCart file" +
            " dependencies is not an array");
    });

});