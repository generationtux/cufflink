class CreateCommand {
    constructor(dependencyGraph, driverLocator, fs) {
        this.dependencyGraph = dependencyGraph;
        this.driverLocator = driverLocator;
        this.fs = fs;
    }

    run() {
        let graph = this.dependencyGraph.run();
        let drivers = this.driverLocator.drivers();

        let result = {};

        graph.forEach((graphElement) => {
            let lowerElement = graphElement.toLowerCase();
            let driver = drivers[lowerElement];
            result[lowerElement] = driver.create();
        });

        this.fs.writeFileSync('./seededData.json', JSON.stringify(result));
    }
}

module.exports.CreateCommand = CreateCommand;
