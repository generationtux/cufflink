class CreateCommand {

    constructor(dependencyGraph, driverLocator, fs, onCompletion) {
        this.dependencyGraph = dependencyGraph;
        this.driverLocator = driverLocator;
        this.fs = fs;
        this.driversToExecute = [];
        process.results = [];

        if (typeof onCompletion === 'undefined') {
            this.completed = this.writeResultsToFile;
        } else {
            this.completed = onCompletion;
        }
    }

    writeResultsToFile(results) {
        return this.fs.writeFileSync('./seededData.json', JSON.stringify(results));
    }

    runRecursive() {
        if(this.driversToExecute.length === 0){
            return new Promise((resolve) => {
                resolve(this.completed(process.results));
            });
        }

        return this.driversToExecute[0].create().then((results) => {
            this.driversToExecute.shift();
            process.results.push(results);
            return this.runRecursive();
        });
    }

    run() {
        let graph = this.dependencyGraph.run();
        let drivers = this.driverLocator.drivers();

        graph.forEach((graphElement) => {
            let lowerElement = graphElement.toLowerCase();
            let driver = drivers[lowerElement];
            this.driversToExecute.push(driver);
        });

        return this.runRecursive();
    }

}

module.exports = CreateCommand;
