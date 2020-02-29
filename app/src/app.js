
import React from 'react';
import { wrap } from 'comlink';

import './app.css';
import Worker from 'worker-loader!./task-planning-worker';

const planner = wrap(new Worker());

console.log(planner);

class App extends React.Component {
    render() {
        return (
            <div className="app">
                <div className="quarter">
                </div>
                <div className="quarter">
                </div>
                <div className="quarter">
                </div>
                <div className="quarter">
                </div>
            </div>
        );
    }
}

export default App;

