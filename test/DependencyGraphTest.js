'use strict';

var expect = require('chai').expect;
var DependencyGraph = require('../src/DependencyGraph');
describe('Dependency Graph Tests', () => {
    it('Should be constructed and return the correct order', () => {
        let objectsToSeed = [
            {
                "name": "Account",
                "metadata": {
                    'dependencies': []
                }
            },
            {
                "name": "Contact",
                "metadata": {
                    'dependencies': ['Account']
                }
            },
            {
                "name": "SalesOrder",
                "metadata": {
                    'dependencies': ['Contact', 'Account', 'Event']
                }
            },
            {
                "name": "Event",
                "metadata": {
                    'dependencies': ['Contact']
                }
            }
        ];
        let dependencyGraph = new DependencyGraph(objectsToSeed);
        expect(dependencyGraph.objectsToSeed).to.equal(objectsToSeed);
        let result = dependencyGraph.run();
        expect(result).to.deep.equal(['Account', 'Contact', 'Event', 'SalesOrder']);
    });
});