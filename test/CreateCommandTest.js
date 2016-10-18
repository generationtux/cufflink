let expect = require('chai').expect;
let DepGraph = require('dependency-graph').DepGraph;

let CreateCommand = require('../src/CreateCommand').CreateCommand;

describe('Create command tests', () => {
    it('should return graph', () => {
        let expectedGraph = new DepGraph();

        let data = {
            metaData: {

            }
        }
        expectedGraph.addNode('foo', data);

        let graphBuilder =  {
            build: function () {
                return expectedGraph;
            }
        }

        let fooDriver = {
            create: function () {

            }
        }

        let expectedDrivers = [
            {
                foo: fooDriver
            }
        ];

        let driverLocator = {
            drivers: function () {
                return expectedDrivers;
            }
        }

        let createCommand = new CreateCommand(graphBuilder, driverLocator);

        let actualGraph = createCommand.run();

        expect(actualGraph).to.equal(expectedGraph);
    });
});
