let ObjectLocator = require('./src/ObjectLocator');
let DependencyGraph = require('./src/DependencyGraph');
let DriverLocator = require('./src/DriverLocator');
let CreateCommand = require('./src/CreateCommand');
let TearDownCommand = require('./src/TearDownCommand');
let fs = require('fs');

module.exports = {
    create: (objectName) => {

        let objectLocator = new ObjectLocator(fs, objectName);
        let objects = objectLocator.run();

        let dependencyGraph = new DependencyGraph(objects);
        let driverLocator = new DriverLocator(fs, process.cwd() + "/drivers/");
        let createCommand = new CreateCommand(dependencyGraph, driverLocator);

        return createCommand.run();
    },

    tearDown: (objects) => {

        let driverLocator = new DriverLocator(fs, process.cwd() + "/drivers/");
        let tearDownCommand = new TearDownCommand(driverLocator);

        return tearDownCommand.run(objects);
    }
}
