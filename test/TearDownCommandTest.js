'use strict';

let expect = require('chai').expect;
let fs = require('fs');
let fsMock = require('mock-fs');

let TearDownCommand = require('../src/TearDownCommand');

describe('Tear down command tests', () => {

    after(fsMock.restore);

    it("should throw an error when a seeded data json file doesn't exist", () => {
        let drivers = {};

        let driverLocator = {
            drivers: function() {
                return drivers;
            }
        };

        let tearDownCommand = new TearDownCommand(
            driverLocator,
            fs,
            './path/to/seed.json'
        );

        expect(tearDownCommand.run.bind(tearDownCommand)).to.throw(
            'ENOENT: no such file or directory, open \'./path/to/seed.json\''
        );

    });

    it('should throw an error when there is no driver for a seeded object', () => {
        let drivers = {};

        fsMock({
            'seededData.json': JSON.stringify([{
                "data": [{
                    "type": "herpderp",
                    "properties": {
                        "name": "Bob Dole"
                    }
                }]
            }])
        });

        let driverLocator = {
            drivers: function() {
                return drivers;
            }
        };

        let tearDownCommand = new TearDownCommand(
            driverLocator,
            fs
        );

        expect(tearDownCommand.run.bind(tearDownCommand)).to.throw(
            'Seeded data file does not contain a type that you have a driver for'
        );

    });

    it('should destroy all the objects in the dependency chain', () => {
        let drivers = {
            'account': {
                type: 'account',
                tearDown: () => {
                    return new Promise((resolve) => {
                        resolve();
                    });
                }
            },
            'contact': {
                type: 'contact',
                tearDown: () => {
                    return new Promise((resolve) => {
                        resolve();
                    });
                }
            }
        };

        let driverLocator = {
            drivers: function() {
                return drivers;
            }
        };

        fsMock({
            'path/to/seed.json': JSON.stringify([{
                "data": [{
                    "type": "contact",
                    "properties": {
                        "name": "Bob Dole"
                    }
                }, {
                    "type": "account",
                    "properties": {
                        "items": [
                            "Pizza"
                        ]
                    }
                }]
            }])
        });

        let tearDownCommand = new TearDownCommand(
            driverLocator,
            fs,
            './path/to/seed.json'
        );

        tearDownCommand.run().then(() => {
            expect(tearDownCommand.recordsToTearDown.length).to.be.equal(0);
        });
    });

    it('should accept an array of object to tear down', () => {
        let drivers = {
            'account': {
                type: 'account',
                tearDown: () => {
                    return new Promise((resolve) => {
                        resolve();
                    });
                }
            },
            'contact': {
                type: 'contact',
                tearDown: () => {
                    return new Promise((resolve) => {
                        resolve();
                    });
                }
            }
        };

        let driverLocator = {
            drivers: function() {
                return drivers;
            }
        };

        let tearDownCommand = new TearDownCommand(
            driverLocator
        );

        let tearDownThese = [{
            'type': 'account',
            'properties': {
                'id': 1,
                'firstName': 'Bob',
                'lastName': 'Jones',
                'email': 'bob@jones.com'
            }
        }, {
            'type': 'contact',
            'properties': {
                'id': 1,
                'firstName': 'Bob',
                'lastName': 'Jones',
                'email': 'bob@jones.com',
                'accountId': 1
            }
        }];

        tearDownCommand.run(tearDownThese).then(() => {
            expect(tearDownCommand.recordsToTearDown.length).to.be.equal(0);
        });
    });
});
