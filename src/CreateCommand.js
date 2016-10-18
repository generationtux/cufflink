class CreateCommand {
    constructor(graphBuilder, driverLocator) {
        this.graphBuilder = graphBuilder;
        this.driverLocator = driverLocator;
    }

    run() {
        return this.graphBuilder.build();
    }
}

module.exports.CreateCommand = CreateCommand;
