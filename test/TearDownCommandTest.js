'use strict'

let chai = require('chai');
let spies = require('chai-spies');

chai.use(spies);

let should = chai.should();
let expect = chai.expect;

let TearDownCommand = require('../src/TearDownCommand').TearDownCommand;

describe('Tear down command tests', () => {
    it("should throw an error when a seeded data json file doesn't exist", () =>{
        let drivers = {};

        let driverLocator = {
            drivers: function () {
                return drivers;
            }
        };

        let fsMock = {
            readFileSync: function(){
                return [
                    {
                        "type": "herpderp",
                        "properties": {
                            "name": "Bob Dole"
                        }
                    }
                ];
            }
        };

        let tearDownCommand = new TearDownCommand(
            './path/to/seed.json',
            driverLocator,
            fsMock
        );

        expect(tearDownCommand.run.bind(tearDownCommand)).to.throw(
            "Seeded data file does not contain a type that you have a driver for"
        );

    });

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

        let fsMock = {
            readFileSync: function(){
                return [
                    {
                        "type": "contact",
                        "properties": {
                            "name": "Bob Dole"
                        }
                    },
                    {
                        "type": "account",
                        "properties": {
                            "items": [
                                "Pizza"
                            ]
                        }
                    }
                ];
            }
        };

        let tearDownCommand = new TearDownCommand(
            './path/to/seed.json',
            driverLocator,
            fsMock
        );

        tearDownCommand.run();

        accountDriverSpy.tearDown.should.have.been.called.once;
        contactDriverSpy.tearDown.should.have.been.called.once;
    });
});
