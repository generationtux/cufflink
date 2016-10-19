class CreateCommand {

    constructor(dependencyGraph, driverLocator, fs) {
        this.dependencyGraph = dependencyGraph;
        this.driverLocator = driverLocator;
        this.fs = fs;
        this.driversToExecute = [];
        process.results = [];
        this.completed = () => {
            this.fs.writeFileSync('./seededData.json', JSON.stringify(process.results));
        }
    }

    runRecursive(promise = null) {
        if(this.driversToExecute.length == 0){
            return promise.then((results) => {
                this.completed();
            });
        }

        let driverToExecute = this.driversToExecute[0];
        promise = driverToExecute.create();
        return promise.then((results) => {
            this.driversToExecute.shift();
            process.results.push(results);
            this.runRecursive(promise);
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
        return this.runRecursive().then(() => {
            // this.fs.writeFileSync('./seededData.json', JSON.stringify(process.results));
        });
    }

}

module.exports = CreateCommand;
