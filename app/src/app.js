
import React from 'react';

import './app.css';
import { TaskPlanner } from './task-planner';

console.log(TaskPlanner);

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

