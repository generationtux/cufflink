var expect = require('chai').expect;
var fs = require('fs');
var mockeryPartial = require('mockery-partial');
var DriverLocator = require('../src/Driver/DriverLocator').DriverLocator;


describe('Driver Locator Module', function() {
    it('should exist', function() {
        var driverLocator = new DriverLocator();

        expect(driverLocator).to.not.be.undefined;
    });

    it('should read all driver files in drivers directory', function(){
        var fsMock = fs;

        var driverMock = {
            'MongoDB': {},
            'MySql': {},
            'Redis': {}
        }

        var driverLocator = new DriverLocator(fsMock, 'test/MockDrivers/');
        
        expect(driverLocator.drivers.bind(driverLocator))
    });

    it('should throw exception if path doesnt exist', function(){
        var fsMock = {
            existsSync: function (path) {

                //show that the path given does not exist
                return false;
            }
        };
        var driverLocator = new DriverLocator(fsMock, '/drivers');

        expect(driverLocator.drivers.bind(driverLocator)).to.throw('/drivers path does not exist');
    })
});
