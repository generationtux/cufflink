class DriverLocator{

    constructor(fs, path){
        this.fs = fs;
        this.path = path;
    }


    drivers(){
        if (!this.fs.existsSync(this.path)){
            throw Error(this.path + ' path does not exist');
        }

        var driversList = this.fs.readdirSync(this.path);


        return driversList;
    }
}


module.exports.DriverLocator = DriverLocator;