import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import '../node_modules/grommet/scss/vanilla/index.scss';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker()