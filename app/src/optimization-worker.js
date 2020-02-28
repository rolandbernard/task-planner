
import * as Comlink from 'comlink';

const exp = {
    invokeOptimize(planner, n) {
        planner.optimize(n);
    },
    invokeInitialize(planner) {
        planner.initialize();
    }
}

Comlink.expose(exp);

