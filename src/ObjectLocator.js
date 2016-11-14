class ObjectLocator {

    constructor(fs, objectName) {
        this.fs = fs;
        this.objectName = objectName;
        this.objects = [];
        this.objectDirectoryName = "objects";
    }

    run() {
        this.loadAllObjects(this.objectName);
        return this.objects;
    }

    loadAllObjects(dependencyName) {
        let fileData = this.fs.readFileSync(process.cwd() + `/${this.objectDirectoryName}/${dependencyName}.json`);
        let fileJson = {};
        if (fileData != null || fileData.toString().length == 0) {
            fileJson = JSON.parse(fileData);
        }
        if (fileJson != null && fileJson != {}) {
            if (fileJson.dependencies == null) {
                throw new Error(`Json for the file ${dependencyName} must have a dependency array, if none provide a blank array`);
            }
            let dependencies = fileJson.dependencies;
            if (Array.isArray(dependencies)) {
                dependencies.forEach((dependency) => {
                    if (this.objects.find(x => x.name == dependency) == null) {
                        this.loadAllObjects(dependency);
                    }
                });
            } else {
                throw new Error(`Dependencies must be an array! object ${dependencyName} file dependencies is not an array`);
            }
            this.objects.push({
                name: dependencyName,
                metadata: {
                    fields: fileJson.fields,
                    dependencies: fileJson.dependencies
                }
            })
        }
    }

}

module.exports = ObjectLocator;
