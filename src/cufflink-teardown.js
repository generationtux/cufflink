let ObjectLocator = require('./ObjectLocator');
let DependencyGraph = require('./DependencyGraph');
let DriverLocator = require('./DriverLocator');
let TearDownCommand = require('./TearDownCommand');
let fs = require('fs');
let filePath = process.argv[2];

let driverLocator = new DriverLocator(fs, process.cwd() + "/drivers/");
let tearDownCommand = new TearDownCommand(driverLocator, fs, filePath);

tearDownCommand.run().then(() => {

});
