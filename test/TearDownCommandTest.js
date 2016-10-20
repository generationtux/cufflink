'use strict'

let Buffer = require('buffer').Buffer;
let expect = require('chai').expect;
let fs = require('fs');
let fsMock = require('mock-fs');

let TearDownCommand = require('../src/TearDownCommand');

describe('Tear down command tests', () => {
    it("should throw an error when a seeded data json file doesn't exist", () =>{
        let drivers = {};

        let driverLocator = {
            drivers: function () {
                return drivers;
            }
        };

        fsMock({
            'seededData.json': JSON.stringify([
                {
                    "type": "herpderp",
                    "properties": {
                        "name": "Bob Dole"
                    }
                }
            ])
        })

        let tearDownCommand = new TearDownCommand(
            driverLocator,
            fs,
            './path/to/seed.json'
        );

        expect(tearDownCommand.run.bind(tearDownCommand)).to.throw(
            'Error: ENOENT, no such file or directory \'./path/to/seed.json\''
        );

    });

    it('should destroy all the objects in the dependency chain',() => {

        let drivers = {
            'account': {
                type: 'account',
                tearDown: () => {
                    return new Promise((resolve) => { resolve(); });
                }
            },
            'contact': {
                type: 'contact',
                tearDown: () => {
                    return new Promise((resolve) => { resolve(); });
                }
            }
        };

        let driverLocator = {
            drivers: function () {
                return drivers;
            }
        };

        fsMock({
            'path/to/seed.json': JSON.stringify([
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
            ])
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
});
