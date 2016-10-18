let DepGraph = require('dependency-graph').DepGraph;

class DependencyGraph {
    constructor(objectsToSeed) {
        this.objectsToSeed = objectsToSeed;
        this.run = this.run.bind(this);
    }

    run() {
        let graph = new DepGraph();
        //put all the nodes in the graph
        this.objectsToSeed.forEach((obj) => {
            graph.addNode(obj.name, {metadata: obj.metadata});
        });
        //get the objects names that are in the graph
        let objectKeys = Object.keys(graph.nodes);

        //for each object, get the dependencies from the meta data and add them
        objectKeys.forEach((node) => {
            graph.nodes[node].metadata.dependencies.forEach((ele) => {
                graph.addDependency(node, ele);
            });
        });
        return graph.overallOrder();
    }

}

module.exports = DependencyGraph;