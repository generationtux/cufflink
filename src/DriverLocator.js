class DriverLocator {

    constructor(fs, path) {
        this.fs = fs;
        this.path = path;
    }

    drivers() {
        if (!this.fs.existsSync(this.path)) {
            throw Error(this.path + ' path does not exist');
        }

        let driverModules = require(this.path);
        let driverNames = Object.keys(driverModules);
        let driversList = {};
        driverNames.forEach(function (driverName) {
            let driverKey = driverName.toLocaleLowerCase();
            if (driverKey.indexOf('driver') < 0) {
                return;
            }
            driverKey = driverKey.replace('driver', '');
            driversList[driverKey] = new driverModules[driverName]();
        });
        if (Object.keys(driversList).length <= 0) {
            throw Error(
                'No drivers found in module: ' +
                this.path +
                " drivers must have 'driver' in name"
            );
        }

        return driversList;
    }

}

module.exports = DriverLocator;