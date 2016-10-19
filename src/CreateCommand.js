class CreateCommand {

    constructor(dependencyGraph, driverLocator, fs) {
        this.dependencyGraph = dependencyGraph;
        this.driverLocator = driverLocator;
        this.fs = fs;
        this.driversToExecute = [];
        process.results = [];
    }

    runRecursive() {
        let driverToExecute = this.driversToExcute[0];
        return driverToExecute.create().then((results) => {
            this.driversToExecute.shift();
            process.results.append(results);
            this.runRecursive();
        })
    }

    run() {
        let graph = this.dependencyGraph.run();
        let drivers = this.driverLocator.drivers();


        graph.forEach((graphElement) => {
            let lowerElement = graphElement.toLowerCase();
            let driver = drivers[lowerElement];
            this.driversToExecute.push(driver);
        });
        this.runRecursive().then(() => {
            this.fs.writeFileSync('./seededData.json', JSON.stringify(process.results));
        });
    }

}

module.exports = CreateCommand;
