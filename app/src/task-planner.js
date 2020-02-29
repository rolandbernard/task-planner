
import Optimizer from './optimizer';
import { getCoordinatedForAddress } from './nominatim';
import { getDistanceMatrix } from './osrm';

let module_initialized = false;
let optimizer_callbacks = [];
const optimizer_module = Optimizer({
    locateFile(path) {
        if(path.endsWith('.wasm')) {
            return process.env.PUBLIC_URL + "/optimizer.wasm";
        }
        return path;
    },
    onRuntimeInitialized: () => {
        module_initialized = true;
        optimizer_callbacks.forEach(fn => fn());
    }
});

function vectorToArray(vector) {
    let ret = [];
    for(let i = 0; i < vector.size(); i++) {
        ret.push(vector.get(i));
    }
    return ret;
}

function arrayToVectorOfClient(array) {
    let ret = new optimizer_module.VectorOfClient();
    for(let i = 0; i < array.length; i++) {
        ret.push_back(array[i]);
    }
    return ret;
}

function arrayToVectorOfWorker(array) {
    let ret = new optimizer_module.VectorOfWorker();
    for(let i = 0; i < array.length; i++) {
        ret.push_back(array[i]);
    }
    return ret;
}

function arrayToVectorOfVectorOfLong(array) {
    let ret = new optimizer_module.VectorOfVectorOfLong();
    for(let i = 0; i < array.length; i++) {
        let rett = new optimizer_module.VectorOfLong();
        for(let j = 0; j < array[i].length; j++) {
            rett.push_back(array[i][j]);
        }
        ret.push_back(rett);
    }
    return ret;
}

export class TaskPlanner {
    constructor() {
        if(module_initialized) {
            this.task_planner = new optimizer_module.TaskPlanner();
        } else {
            optimizer_callbacks.push(() => {
                this.task_planner = new optimizer_module.TaskPlanner();
            });
        }
    }

    async setWorkersAndClients(workers, clients) {
        await Promise.all(workers.map(async worker => {
            if(worker.lon === undefined || worker.lat === undefined) {
                const [lon, lat] = await getCoordinatedForAddress(worker.address);
                worker.lon = lon;
                worker.lat = lat;
            }
        }));
        await Promise.all(clients.map(async client => {
            if(client.lon === undefined || client.lat === undefined) {
                const [lon, lat] = await getCoordinatedForAddress(client.address);
                client.lon = lon;
                client.lat = lat;
            }
        }));
        const coordinates = workers.map(worker => [worker.lon, worker.lat]).concat(clients.map(client => [client.lon, client.lat]));
        const durations = (await getDistanceMatrix(coordinates)).map(el => el.map(e => Math.trunc(e / 60)));
        this.task_planner.setWorkers(arrayToVectorOfWorker(workers));
        this.task_planner.setClients(arrayToVectorOfClient(clients));
        this.task_planner.setDurations(arrayToVectorOfVectorOfLong(durations));
        this.task_planner.initialize();
    }

    async optimize(n) {
        this.task_planner.optimize(n);
    }

    getPlan() {
        return vectorToArray(this.task_planner.getPlan());
    }

    getPlanPerWorkerPerDay() {
        return vectorToArray(this.task_planner.getPlanPerWorkerPerDay()).map(el => vectorToArray(el).map(vectorToArray));
    }
}


