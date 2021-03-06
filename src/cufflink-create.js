let ObjectLocator = require('./ObjectLocator');
let DependencyGraph = require('./DependencyGraph');
let DriverLocator = require('./DriverLocator');
let CreateCommand = require('./CreateCommand');
let fs = require('fs');
let objectName = process.argv[2];

let objectLocator = new ObjectLocator(fs, objectName );
let objects = objectLocator.run();

let dependencyGraph = new DependencyGraph(objects);
let driverLocator = new DriverLocator(fs, process.cwd() + "/drivers/");
let createCommand = new CreateCommand(dependencyGraph, driverLocator, fs);

createCommand.run().then(() => {
});
