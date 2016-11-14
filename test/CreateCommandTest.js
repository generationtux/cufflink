'use strict'

let expect = require('chai').expect;
let DepGraph = require('dependency-graph').DepGraph;

let CreateCommand = require('../src/CreateCommand');

describe('Create command tests', () => {

    let DependencyGraph = {
        run: function () {
            return [ 'Account', 'Contact' ]
        }
    };

    let AccountDriver = {
        create: function () {

            return new Promise((resolve) => {
                resolve({
                    'type': 'account',
                    'properties': {
                        'id': 1,
                        'firstName': 'Bob',
                        'lastName': 'Jones',
                        'email': 'bob@jones.com'
                    }
                });
            });
        }
    };

    let ContactDriver = {
        create: function () {

            return new Promise((resolve) => {
                resolve({
                    'type': 'contact',
                    'properties': {
                        'id': 1,
                        'firstName': 'Bob',
                        'lastName': 'Jones',
                        'email': 'bob@jones.com',
                        'accountId': 1
                    }
                });
            });
        }
    }

    let drivers = {
        'account': AccountDriver,
        'contact': ContactDriver
    };

    let DriverLocator = {
        drivers: function () {
            return drivers;
        }
    }

    let expectedResult = [
        {
            'type': 'account',
            'properties': {
                'id': 1,
                'firstName': 'Bob',
                'lastName': 'Jones',
                'email': 'bob@jones.com'
            }
        },
        {
            'type': 'contact',
            'properties': {
                'id': 1,
                'firstName': 'Bob',
                'lastName': 'Jones',
                'email': 'bob@jones.com',
                'accountId': 1
            }
        }
    ];

    it('should write results from driver to file', () => {

        let dataExpectedToBeWrittenToFile;

        let fs = {
            writeFileSync: function (fileName, data) {
                dataExpectedToBeWrittenToFile = data;
            }
        }

        let createCommand = new CreateCommand(DependencyGraph, DriverLocator, fs);

        createCommand.run().then(() => {
            expect(dataExpectedToBeWrittenToFile).to.equal(JSON.stringify(expectedResult));
        });

    });

    it('should return results as an array', () => {
        let f = (results) => { return results };

        let createCommand = new CreateCommand(DependencyGraph, DriverLocator, null, f);

        createCommand.run().then((r) => {
            expect(JSON.stringify(r)).to.equal(JSON.stringify(expectedResult));
        });
    });
});
