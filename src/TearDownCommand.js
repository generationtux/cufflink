class TearDownCommand {
    constructor(pathToJsonFile, driverLocator, fs) {
        this.pathToJsonFile = pathToJsonFile;
        this.driverLocator = driverLocator;
        this.fs = fs;
        this.driversToExecute = [];
    }

    runRecursive() {
        if (this.driversToExecute.length == 0){
            return new Promise((resolve) => {
                resolve();
            });
        }

        return this.driversToExecute[0].tearDown().then((results) => {
            this.driversToExecute.shift();
            this.runRecursive();
        });
    }

    run() {
        let seededData = this.fs.readFileSync(this.pathToJsonFile);
        seededData.reverse();

        let drivers = this.driverLocator.drivers();

        seededData.forEach((row) => {
            let type = row["type"];
            if(type in drivers){
                let driver = drivers[type];
                this.driversToExecute.push(driver);
            }else{
                throw Error("Seeded data file does not contain a type that you have a driver for");
            }
        });

        return this.runRecursive();
    }
}

module.exports = TearDownCommand;
