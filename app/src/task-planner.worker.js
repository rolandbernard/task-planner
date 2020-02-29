
import { expose } from 'comlink';

import { TaskPlanner } from './task-planner';

const planner = new TaskPlanner();

expose(planner);

