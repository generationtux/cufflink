'use strict'

let expect = require('chai').expect;
let DepGraph = require('dependency-graph').DepGraph;

let CreateCommand = require('../src/CreateCommand').CreateCommand;

describe('Create command tests', () => {
    it('should write results from driver to file', () => {

        let DependencyGraph = {
            run: function () {
                return ['Account', 'Contact']
            }
        };

        let AccountDriver = {
            create: function () {
                return ({
                    'id': 1,
                    'firstName': 'Bob',
                    'lastName': 'Jones',
                    'email': 'bob@jones.com',
                });
            }
        };

        let ContactDriver = {
            create: function () {
                return ({
                    'id': 1,
                    'firstName': 'Bob',
                    'lastName': 'Jones',
                    'email': 'bob@jones.com',
                    'accountId': 1
                });
            }
        };

        let drivers = {
            'Account': AccountDriver,
            'Contact': ContactDriver
        };

        let DriverLocator = {
            drivers: function () {
                return drivers;
            }
        }

        let dataExpectedToBeWrittenToFile;

        let fs = {
            writeFileSync: function (fileName, data) {
                dataExpectedToBeWrittenToFile = data;
            }
        }

        let createCommand = new CreateCommand(DependencyGraph, DriverLocator, fs);

        createCommand.run();

        expect(dataExpectedToBeWrittenToFile).to.equal(JSON.stringify({
            'account': {
                'id': 1,
                'firstName': 'Bob',
                'lastName': 'Jones',
                'email': 'bob@jones.com',
            },
            'contact': {
                'id': 1,
                'firstName': 'Bob',
                'lastName': 'Jones',
                'email': 'bob@jones.com',
                'accountId': 1
            }
        }));
    });
});
