
import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import 'typeface-roboto';
import 'material-icons';

import App from './app';
import * as serviceWorker from './service-worker';

serviceWorker.register();

ReactDOM.render(<App />, document.getElementById('root'));


