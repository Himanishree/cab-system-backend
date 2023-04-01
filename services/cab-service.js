const { DijkstraCalculator } = require('dijkstra-calculator');
const Cab = require('../models/cab-model');

const graph = new DijkstraCalculator();
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addVertex('E');
graph.addVertex('F');

graph.addEdge('A', 'B', 5);
graph.addEdge('A', 'C', 7);
graph.addEdge('B', 'E', 20);
graph.addEdge('B', 'D', 15);
graph.addEdge('C', 'D', 5);
graph.addEdge('C', 'E', 35);
graph.addEdge('D', 'F', 20);
graph.addEdge('E', 'F', 10);

function addWeight(path) {
    let weight = 0;
    for (let i = 0; i < path.length - 1; i++) {
        weight += Number(graph.adjacencyList[path[i]].filter(item => item.id === path[i + 1])[0].weight);
    }
    return weight;
}

function addArrivingTime(cabList) {
    const cabListWithArrivingTime = cabList.map((e) => {
        return { arrivingTime: Math.floor(Math.random() * 10), ...e }
    })

    return cabListWithArrivingTime;
}

class CabServices {
    getShortestDistance(pickup, destination) {
        const path = graph.calculateShortestPath(pickup, destination);
        return path
    }

    getShortestPathWeight(pickup, destination) {
        const path = graph.calculateShortestPath(pickup, destination);
        return addWeight(path);
    }

    async getAllCabs() {
        let cabList = await Cab.find()
            .select('cab driver pricePerMinute rating avatar')
            .lean();
        cabList = addArrivingTime(cabList);
        return cabList;
    }

    async addCab(cab, driver, pricePerMinute, rating, avatar) {
        const generatedCab = await Cab.create({ cab, driver, pricePerMinute, rating, avatar })
        return generatedCab;
    }
}



module.exports = new CabServices();