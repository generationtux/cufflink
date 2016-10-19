class TearDownCommand {
    constructor(pathToJsonFile, driverLocator, fs) {
        this.pathToJsonFile = pathToJsonFile;
        this.driverLocator = driverLocator;
        this.fs = fs;
    }

    run() {
        let seededData = this.fs.readFileSync(this.pathToJsonFile);

        seededData.reverse();

        let drivers = this.driverLocator.drivers();

        seededData.forEach((row) => {
            let type = row["type"];
            if(type in drivers){
                let driver = drivers[type];
                driver.tearDown();
            }else{
                throw Error("Seeded data file does not contain a type that you have a driver for");
            }
        });

    }
}

module.exports.TearDownCommand = TearDownCommand;
