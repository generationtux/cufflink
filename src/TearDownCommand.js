class TearDownCommand {

    constructor(driverLocator, fs, pathToJsonFile = './seededData.json') {
        this.pathToJsonFile = pathToJsonFile;
        this.driverLocator = driverLocator;
        this.fs = fs;
        this.recordsToTearDown = [];
    }

    runRecursive() {
        if (this.recordsToTearDown.length == 0){
            return new Promise((resolve) => {
                resolve();
            });
        }

        return this.recordsToTearDown[0].driver.tearDown(this.recordsToTearDown[0].record).then((results) => {
            this.recordsToTearDown.shift();
            this.runRecursive();
        });
    }

    readFile(path) {
        let fileContents;

        fileContents = this.fs.readFileSync(path);
        return JSON.parse(fileContents, 'utf8')[0].data;
    }

    run(seededData) {
        if (typeof seededData === 'undefined') {
            seededData = this.readFile(this.pathToJsonFile);
        }

        seededData.reverse();

        let drivers = this.driverLocator.drivers();

        seededData.forEach((record) => {
            let type = record["type"];

            if(type in drivers){
                let driver = drivers[type];
                this.recordsToTearDown.push({
                    'driver': driver,
                    'record': record
                });
            }else{
                throw Error("Seeded data file does not contain a type that you have a driver for");
            }
        });

        return this.runRecursive();
    }
}

module.exports = TearDownCommand;
