class CreateCommand {

    constructor(dependencyGraph, driverLocator, fs) {
        this.dependencyGraph = dependencyGraph;
        this.driverLocator = driverLocator;
        this.fs = fs;
        this.driversToExecute = [];
        process.results = [];
        this.completed = () => {
            this.fs.writeFileSync('./seededData.json', JSON.stringify([{ "data" : process.results }]));
        }
    }

    runRecursive() {
        if(this.driversToExecute.length == 0){
            return new Promise((resolve) => {
                this.completed();
                resolve(true);
            });
        }
        return this.driversToExecute[0].create().then((results) => {
            this.driversToExecute.shift();
            process.results.push(results);
            this.runRecursive();
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
