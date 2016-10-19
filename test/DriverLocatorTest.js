let expect = require('chai').expect;
let fs = require('fs');
let mockeryPartial = require('mockery-partial');
let DriverLocator = require('../src/Driver/DriverLocator').DriverLocator;
let ContactDriver = require('./MockDrivers/ContactDriver').ContactDriver;
let EventDriver = require('./MockDrivers/EventDriver').EventDriver;



describe('Driver Locator Module', function() {
    it('it should throw an error if no drivers are found at specified location', function() {
        let invalidDriverPath = fs.realpathSync('./test/MockDrivers/InvalidDriver.js');
        let driverLocator = new DriverLocator(fs, invalidDriverPath);
        expect(driverLocator.drivers.bind(driverLocator)).to.throw(
            'No drivers found in module: ' + invalidDriverPath +
            " drivers must have 'driver' in name"
        );
    });

    it('should read all driver files in drivers directory', function(){
        let driverLocator = new DriverLocator(fs, fs.realpathSync('./test/MockDrivers/'));
        let actualDrivers = driverLocator.drivers();
        expect(actualDrivers['contact']).to.be.an.instanceOf(ContactDriver);
        expect(actualDrivers['event']).to.be.an.instanceOf(EventDriver);
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
