'use strict'

let chai = require('chai');
let spies = require('chai-spies');

chai.use(spies);

let should = chai.should();
let expect = chai.expect;

let TearDownCommand = require('../src/TearDownCommand').TearDownCommand;

describe('Tear down command tests', () => {
    it('should destroy all the objects in the dependency chain',() => {

        let accountDriverSpy = chai.spy.object(['tearDown']);
        let contactDriverSpy = chai.spy.object(['tearDown']);

        let drivers = {
            'account': accountDriverSpy,
            'contact': contactDriverSpy
        };

        let driverLocator = {
            drivers: function () {
                return drivers;
            }
        };

        let fs = {};

        let tearDownCommand = new TearDownCommand(
            './path/to/seed.json',
            driverLocator,
            fs
        );

        tearDownCommand.run();

        accountDriverSpy.should.have.been.called.once;
        contactDriverSpy.should.have.been.called.once;
    });
});
